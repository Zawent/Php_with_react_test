import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface InventoryItem {
    id: number;
    nombre: string;
    stock: number;
}

interface Props {
    items: InventoryItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inventario',
        href: '/inventory',
    },
];

export default function InventoryIndex({ items }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventario" />

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Inventario</h1>

                <div className="bg-white rounded-xl shadow">
                    {items.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No hay productos en inventario.
                            <div className="mt-2 text-sm">
                                Crea tu primer producto para comenzar.
                            </div>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="border-b">
                                <tr>
                                    <th className="p-4">Producto</th>
                                    <th className="p-4">Stock</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id} className="border-b last:border-0">
                                        <td className="p-4">{item.nombre}</td>
                                        <td className="p-4">{item.stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
