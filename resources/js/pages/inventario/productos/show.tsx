import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Package, ImageIcon } from 'lucide-react';

interface Proveedor {
    id: number;
    nombre: string;
}

interface Bodega {
    id: number;
    nombre: string;
    stock?: number;
}

interface Producto {
    id: number;
    nombre: string;
    sku?: string;
    descripcion?: string;
    imagen?: string;
    imagen_url?: string;
    activo: boolean;
    proveedores: Proveedor[];
    bodegas: Bodega[];
}

interface Props {
    producto: Producto;
}

const breadcrumbs = (id: number): BreadcrumbItem[] => [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Inventario', href: '/inventario' },
    { title: 'Productos', href: '/inventario/productos' },
    { title: 'Detalle', href: `/inventario/productos/${id}` },
];

export default function ProductoShow({ producto }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(producto.id)}>
            <Head title={`Producto: ${producto.nombre}`} />

            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex justify-between items-start gap-6">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-foreground">
                            {producto.nombre}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            SKU: {producto.sku || 'Sin SKU'}
                        </p>
                        {producto.descripcion && (
                            <p className="text-sm text-muted-foreground mt-1">
                                {producto.descripcion}
                            </p>
                        )}
                        <div className="mt-2">
                            <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    producto.activo
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                                }`}
                            >
                                {producto.activo ? 'Activo' : 'Inactivo'}
                            </span>
                        </div>
                    </div>

                    {/* Imagen del producto */}
                    <div className="flex-shrink-0">
                        {producto.imagen_url ? (
                            <div className="relative group">
                                <img
                                    src={producto.imagen_url}
                                    alt={producto.nombre}
                                    className="w-48 h-48 object-cover rounded-2xl border-2 border-border shadow-lg"
                                />
                                {/* Overlay para ver en grande */}
                                <a
                                    href={producto.imagen_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 bg-black/0 hover:bg-black/50 rounded-2xl transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                                >
                                    <ImageIcon className="w-8 h-8 text-white" />
                                </a>
                            </div>
                        ) : (
                            <div className="w-48 h-48 bg-muted rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center">
                                <ImageIcon className="w-12 h-12 text-muted-foreground mb-2" />
                                <p className="text-xs text-muted-foreground">Sin imagen</p>
                            </div>
                        )}
                    </div>

                    {/* Botón editar */}
                    <Link
                        href={`/inventario/productos/${producto.id}/edit`}
                        className="px-4 py-2 bg-lime-500 text-white border border-lime-600 rounded-xl font-bold hover:bg-lime-600"
                    >
                        Editar
                    </Link>
                </div>

                {/* Proveedores */}
                <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                    <div className="flex items-center gap-2 px-6 py-4 border-b border-border">
                        <Package className="w-5 h-5 text-indigo-600" />
                        <h2 className="font-bold text-foreground">
                            Proveedores del producto
                        </h2>
                    </div>

                    {producto.proveedores.length === 0 ? (
                        <div className="px-6 py-12 text-center text-muted-foreground">
                            Este producto no tiene proveedores asociados.
                            <div className="mt-4">
                                <Link
                                    href="/inventario/proveedores/create"
                                    className="text-lime-600 font-bold hover:underline"
                                >
                                    Crear proveedor
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-muted/50">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold uppercase text-muted-foreground">
                                            Nombre
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {producto.proveedores.map((prov) => (
                                        <tr key={prov.id} className="hover:bg-muted/50">
                                            <td className="px-6 py-4 font-medium">
                                                <Link
                                                    href={`/inventario/proveedores/${prov.id}`}
                                                    className="text-lime-600 hover:underline"
                                                >
                                                    {prov.nombre}
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}