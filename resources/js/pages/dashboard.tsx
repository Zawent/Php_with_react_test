import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
    FileText,
    Wallet,
    TrendingUp,
    AlertCircle
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    const stats = [
        {
            title: 'Contratos Activos',
            value: '1,240',
            change: '+12%',
            icon: FileText,
            color: 'lime',
            trend: [40, 60, 50, 90]
        },
        {
            title: 'Facturas Pendientes',
            value: '48',
            icon: AlertCircle,
            color: 'orange',
            progress: 68,
            label: 'Atención'
        },
        {
            title: 'Ingresos Mensuales',
            value: '$12,500',
            icon: Wallet,
            color: 'teal',
            trend: [30, 70, 50, 100, 60, 80]
        },
        {
            title: 'Tasa de Retención',
            value: '98%',
            icon: TrendingUp,
            color: 'lime',
            subtitle: '+2.4% que el mes pasado'
        }
    ];

    const contracts = [
        { client: 'Tech Solutions S.A.', initials: 'TS', id: '#CN-2023-084', date: '14 Oct, 2023', amount: '$4,250.00', status: 'Firmado', color: 'indigo' },
        { client: 'Media Loft Group', initials: 'ML', id: '#CN-2023-085', date: '12 Oct, 2023', amount: '$1,800.00', status: 'Pendiente', color: 'amber' },
        { client: 'Bright Capital', initials: 'BC', id: '#CN-2023-082', date: '08 Oct, 2023', amount: '$7,100.00', status: 'Expirado', color: 'rose' },
        { client: 'Green Energy Ltd.', initials: 'GE', id: '#CN-2023-087', date: '05 Oct, 2023', amount: '$2,400.00', status: 'Firmado', color: 'emerald' }
    ];

    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO'];
    const chartData = [
        { income: 140, expense: 24 },
        { income: 144, expense: 32 },
        { income: 136, expense: 20 },
        { income: 148, expense: 28 },
        { income: 156, expense: 16 },
        { income: 152, expense: 36 },
        { income: 144, expense: 24 },
        { income: 140, expense: 20 }
    ];

    const getColorClasses = (color: string, type: 'bg' | 'text' | 'border') => {
        const colors: Record<string, Record<string, string>> = {
            lime: {
                bg: 'bg-lime-500',
                text: 'text-lime-600',
                border: 'border-lime-500'
            },
            orange: {
                bg: 'bg-orange-500',
                text: 'text-orange-600',
                border: 'border-orange-500'
            },
            teal: {
                bg: 'bg-teal-500',
                text: 'text-teal-600',
                border: 'border-teal-500'
            },
            indigo: {
                bg: 'bg-indigo-100',
                text: 'text-indigo-600',
                border: 'border-indigo-500'
            },
            amber: {
                bg: 'bg-amber-100',
                text: 'text-amber-600',
                border: 'border-amber-500'
            },
            rose: {
                bg: 'bg-rose-100',
                text: 'text-rose-600',
                border: 'border-rose-500'
            },
            emerald: {
                bg: 'bg-emerald-100',
                text: 'text-emerald-600',
                border: 'border-emerald-500'
            }
        };
        return colors[color]?.[type] || '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-8 overflow-x-auto p-6">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col justify-between group hover:shadow-md transition-all">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-muted-foreground text-sm font-medium mb-2">{stat.title}</p>
                                    <p className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
                                </div>
                                <div className={`${stat.color === 'lime' ? 'bg-lime-500/10 text-lime-600' : stat.color === 'orange' ? 'bg-orange-500/10 text-orange-600' : 'bg-teal-500/10 text-teal-600'} p-2 rounded-lg`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                            </div>
                            
                            {stat.change && stat.trend && (
                                <div className="mt-6 flex items-end gap-1 h-10">
                                    <span className="text-xs font-bold text-lime-600 mb-1">{stat.change}</span>
                                    <div className="flex-1 flex items-end gap-1 h-full ml-2">
                                        {stat.trend.map((height, i) => (
                                            <div 
                                                key={i} 
                                                className={`w-full rounded-sm ${i === stat.trend.length - 1 ? 'bg-lime-500' : 'bg-lime-500/20'}`} 
                                                style={{ height: `${height}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            
                            {stat.progress !== undefined && (
                                <div className="mt-6 flex items-center gap-3">
                                    <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                                        <div className="bg-orange-500 h-full" style={{ width: `${stat.progress}%` }}></div>
                                    </div>
                                    <span className="text-xs font-bold text-orange-600">{stat.label}</span>
                                </div>
                            )}
                            
                            {stat.subtitle && (
                                <p className="mt-6 text-xs text-muted-foreground font-medium">{stat.subtitle}</p>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contracts and Billing */}
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 xl:col-span-8">
                        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
                            <div className="px-6 py-5 border-b border-border flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-bold text-foreground">Gestión de Contratos</h2>
                                    <p className="text-sm text-muted-foreground">Listado de actividades recientes</p>
                                </div>
                                <button className="px-4 py-2 bg-muted text-foreground text-sm font-bold rounded-xl border border-border hover:bg-muted/80 transition-colors">
                                    Ver todos
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-muted/50">
                                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Cliente</th>
                                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">ID</th>
                                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Fecha</th>
                                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Monto</th>
                                            <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-widest text-center">Estado</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {contracts.map((contract, index) => (
                                            <tr key={index} className="hover:bg-muted/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-9 h-9 rounded-lg ${getColorClasses(contract.color, 'bg')} ${getColorClasses(contract.color, 'text')} flex items-center justify-center font-bold text-xs uppercase`}>
                                                            {contract.initials}
                                                        </div>
                                                        <span className="text-sm font-bold text-foreground">{contract.client}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-muted-foreground font-medium">{contract.id}</td>
                                                <td className="px-6 py-4 text-sm text-muted-foreground">{contract.date}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-foreground">{contract.amount}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-block px-3 py-1 text-[11px] font-bold rounded-full border ${
                                                        contract.status === 'Firmado' ? 'bg-lime-500/10 text-lime-600 border-lime-500/20' :
                                                        contract.status === 'Pendiente' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' :
                                                        'bg-muted text-muted-foreground border-border'
                                                    }`}>
                                                        {contract.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-12 xl:col-span-4">
                        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 h-full">
                            <h2 className="text-lg font-bold text-foreground mb-6">Estado de Facturación</h2>
                            
                            <div className="flex justify-center mb-6 relative">
                                <div className="w-40 h-40 rounded-full border-[16px] border-teal-500/10 relative">
                                    <div className="absolute inset-0 rounded-full border-[16px] border-transparent border-t-teal-500 border-r-teal-500 rotate-[30deg]"></div>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-bold text-foreground">75%</span>
                                        <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Cerradas</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-muted border border-border">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                                        <span className="text-sm font-bold text-foreground">Facturas Cerradas</span>
                                    </div>
                                    <span className="text-sm font-bold text-foreground">$45,200</span>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-muted border border-border">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                        <span className="text-sm font-bold text-foreground">Facturas Abiertas</span>
                                    </div>
                                    <span className="text-sm font-bold text-foreground">$12,800</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cash Flow Chart */}
                <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-lg font-bold text-foreground">Flujo de Caja</h2>
                            <p className="text-sm text-muted-foreground">Tendencia mensual de ingresos y egresos</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                                <span className="text-xs font-bold text-muted-foreground">Ingresos</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-teal-500/40"></span>
                                <span className="text-xs font-bold text-muted-foreground">Egresos</span>
                            </div>
                            <select className="bg-muted border-border text-xs font-bold rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-ring transition-all">
                                <option>Últimos 12 meses</option>
                                <option>Año 2023</option>
                            </select>
                        </div>
                    </div>

                    <div className="h-64 flex items-end gap-4 relative px-4">
                        <div className="absolute inset-0 flex flex-col justify-between">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className={`border-t ${i === 3 ? 'border-border' : 'border-border/50'} w-full h-0`}></div>
                            ))}
                        </div>
                        {months.map((month, index) => (
                            <div key={month} className="flex-1 flex flex-col justify-end gap-1 group relative">
                                <div 
                                    className="w-full bg-teal-500/20 rounded-t-lg group-hover:bg-teal-500/40 transition-all"
                                    style={{ height: `${chartData[index].expense}px` }}
                                ></div>
                                <div 
                                    className="w-full bg-teal-500 rounded-t-lg"
                                    style={{ height: `${chartData[index].income}px` }}
                                ></div>
                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-bold text-muted-foreground">
                                    {month}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="h-10"></div>
                </div>
            </div>
        </AppLayout>
    );
}