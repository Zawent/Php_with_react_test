import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Package, 
    FileText, 
    Receipt, 
    BarChart3, 
    Settings,
    Rocket 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mainNavItems: NavItem[] = [
    {
        title: 'Panel Principal',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Inventario',
        href: '/inventory',
        icon: Package,
    },
    {
        title: 'Contratos',
        href: '/contracts',
        icon: FileText,
    },
    {
        title: 'Facturación',
        href: '/billing',
        icon: Receipt,
    },
    {
        title: 'Reportes',
        href: '/reports',
        icon: BarChart3,
    },
    {
        title: 'Configuración',
        href: '/settings',
        icon: Settings,
    },
];

export function AppSidebar() {
    const { url } = usePage();
    
    return (
        <Sidebar 
            collapsible="icon" 
            className="border-r-0 bg-[#0a1439]"
        >
            {/* Header con Logo */}
            <SidebarHeader className="border-b-0 p-8">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton 
                            size="lg" 
                            asChild 
                            className="hover:bg-transparent data-[state=collapsed]:p-0"
                        >
                            <Link href={dashboard()} className="flex items-center gap-3">
                                <div className="bg-[#e58346] p-2 rounded-xl shadow-lg shadow-[#e58346]/20 shrink-0">
                                    <Rocket className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-white text-2xl font-bold tracking-tight group-data-[collapsible=icon]:hidden">
                                    Gesto<span className="text-[#acc55f]">Agile</span>
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="px-4 mt-4">
                <SidebarMenu className="space-y-2">
                    {mainNavItems.map((item) => {
                        const isActive = url === item.href || url.startsWith(item.href + '/');
                        const Icon = item.icon;
                        
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton 
                                    asChild 
                                    tooltip={item.title}
                                    className={cn(
                                        "px-4 py-3.5 rounded-xl transition-all h-auto",
                                        isActive 
                                            ? "bg-white/10 text-white font-semibold hover:bg-white/10" 
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <Link href={item.href}>
                                        {Icon && <Icon className="w-6 h-6 shrink-0" />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            {/* Footer con Usuario */}
            <SidebarFooter className="p-6 border-t border-white/5 mt-auto">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}