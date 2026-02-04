import { useRef, useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';

interface ImageUploaderProps {
    value: File | string | null;
    onChange: (file: File | null) => void;
    error?: string;
}

export default function ImageUploader({ value, onChange, error }: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | null>(
        typeof value === 'string' ? value : null
    );
    const [isDragging, setIsDragging] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    // Manejar la selección de archivo
    const handleFileChange = (file: File | null) => {
        if (!file) {
            setPreview(null);
            onChange(null);
            return;
        }

        // Validar que sea una imagen
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona una imagen válida');
            return;
        }

        // Validar tamaño (5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen debe ser menor a 5MB');
            return;
        }

        // Crear preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        onChange(file);
    };

    // Drag & Drop handlers
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileChange(file);
        }
    };

    // Abrir cámara
    const openCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            
            streamRef.current = stream;
            setShowCamera(true);
            
            // Esperar a que el video esté listo
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }, 100);
        } catch (error) {
            console.error('Error al acceder a la cámara:', error);
            alert('No se pudo acceder a la cámara');
        }
    };

    // Capturar foto
    const capturePhoto = () => {
        if (!videoRef.current) return;

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.drawImage(videoRef.current, 0, 0);
            
            canvas.toBlob((blob) => {
                if (blob) {
                    const file = new File([blob], 'foto.jpg', { type: 'image/jpeg' });
                    handleFileChange(file);
                    closeCamera();
                }
            }, 'image/jpeg', 0.9);
        }
    };

    // Cerrar cámara
    const closeCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setShowCamera(false);
    };

    // Limpiar al desmontar
    const handleRemove = () => {
        setPreview(null);
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-bold mb-1">
                Imagen del Producto
            </label>

            {/* Vista previa de la imagen */}
            {preview && (
                <div className="relative inline-block">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full max-w-sm h-48 object-cover rounded-lg border border-border"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1 bg-rose-500 text-white rounded-full hover:bg-rose-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Área de carga */}
            {!preview && (
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                        border-2 border-dashed rounded-xl p-8 text-center transition-colors
                        ${isDragging 
                            ? 'border-lime-500 bg-lime-50 dark:bg-lime-950' 
                            : 'border-border bg-muted'
                        }
                    `}
                >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-2">
                        Arrastra una imagen aquí
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                        o elige una opción:
                    </p>

                    <div className="flex gap-2 justify-center flex-wrap">
                        {/* Botón para explorar archivos */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-4 py-2 bg-lime-500 text-white rounded-lg font-bold hover:bg-lime-600 inline-flex items-center gap-2"
                        >
                            <Upload className="w-4 h-4" />
                            Explorar archivos
                        </button>

                        {/* Botón para abrir cámara */}
                        <button
                            type="button"
                            onClick={openCamera}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 inline-flex items-center gap-2"
                        >
                            <Camera className="w-4 h-4" />
                            Tomar foto
                        </button>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                        className="hidden"
                    />

                    <p className="text-xs text-muted-foreground mt-4">
                        Formatos: JPG, PNG, WebP (Máx. 5MB)
                    </p>
                </div>
            )}

            {/* Error */}
            {error && (
                <p className="text-sm text-rose-500">{error}</p>
            )}

            {/* Modal de cámara */}
            {showCamera && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-card rounded-2xl p-6 max-w-2xl w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Tomar Foto</h3>
                            <button
                                type="button"
                                onClick={closeCamera}
                                className="p-2 hover:bg-muted rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full rounded-lg mb-4 bg-black"
                        />

                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                onClick={closeCamera}
                                className="px-4 py-2 bg-muted border border-border rounded-lg font-bold"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={capturePhoto}
                                className="px-4 py-2 bg-lime-500 text-white rounded-lg font-bold hover:bg-lime-600 inline-flex items-center gap-2"
                            >
                                <Camera className="w-4 h-4" />
                                Capturar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}