import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner'; // Usando el Spinner consistente con tu Login
import { login } from '@/routes';
import { email } from '@/routes/password';
import { Form, Head, Link } from '@inertiajs/react'; // Importamos Link de Inertia
import { ArrowLeft } from 'lucide-react'; // Icono para el botón de regreso

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');
                body { font-family: 'Plus Jakarta Sans', sans-serif; }
                .font-heading { font-family: 'Space Grotesk', sans-serif; }
            `}</style>

            <Head title="Recuperar contraseña" />
                
            <div className="min-h-screen bg-[#fdfdfc] dark:bg-[#0A1439] text-slate-900 dark:text-white flex items-center justify-center p-4 relative overflow-hidden">
                {/* Fondo con gradientes idéntico al Login */}
                <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-[#acc55f]/10 to-transparent blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/2 bg-gradient-to-tr from-[#79b4c2]/10 to-transparent blur-3xl opacity-50"></div>
                {/* BOTÓN VOLVER AL INICIO */}
                <div className="absolute top-6 left-6 z-20">
                    <Link 
                        href="/" 
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-sm font-medium hover:bg-[#acc55f] hover:text-[#acc55f] transition-all duration-300 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Volver al inicio
                    </Link>
                </div>
                <div className="w-full max-w-md">
                    {/* Logo y Encabezado */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <div className="bg-[#acc55f] p-3 rounded-xl text-[#0A1439]">
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                                </svg>
                            </div>
                            <h2 className="text-2xl font-heading font-bold tracking-tight">
                                Gesto<span className="text-[#acc55f]">Agile</span>
                            </h2>
                        </div>
                        <h1 className="text-3xl font-heading font-bold mb-2 text-slate-900 dark:text-white">
                            ¿Olvidaste tu clave?
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            No te preocupes, dinos tu email y te enviaremos un enlace de recuperación.
                        </p>
                    </div>

                    {/* Tarjeta de Formulario */}
                    <div className="bg-white/70 dark:bg-[#1B2E58]/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
                        
                        {/* Mensaje de éxito si el email se envió */}
                        {status && (
                            <div className="mb-6 p-4 rounded-xl bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-center text-sm font-medium text-green-800 dark:text-green-300">
                                {status}
                            </div>
                        )}

                        <Form {...email.form()} className="flex flex-col gap-6">
                            {({ processing, errors }) => (
                                <>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Correo electrónico</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autoFocus
                                            autoComplete="email"
                                            placeholder="tu@email.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full mt-2"
                                        disabled={processing}
                                    >
                                        {processing && <Spinner />}
                                        Enviar enlace de recuperación
                                    </Button>

                                    <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                                        ¿Recordaste tu contraseña?{' '}
                                        <TextLink href={login()} className="text-[#acc55f] font-semibold">
                                            Volver al inicio
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>

                    {/* Footer decorativo */}
                    <div className="text-center mt-8">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Soporte técnico: <span className="text-slate-700 dark:text-slate-300">soporte@gestoagile.com</span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}