import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { usePage, Link } from '@inertiajs/react';
import { LogOut, ChevronsUpDown, User, Settings } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function NavUser() {
    const { auth } = usePage().props as any;
    const { isMobile, state } = useSidebar();
    
    const userName = auth?.user?.name || 'Usuario';
    const userEmail = auth?.user?.email || 'email@example.com';
    const userAvatar = auth?.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=e58346&color=fff`;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="bg-white/5 hover:bg-white/10 data-[state=open]:bg-white/10 rounded-2xl p-4 border-0 h-auto"
                        >
                            <div className="flex items-center gap-4 w-full min-w-0">
                                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#e58346]/40 p-0.5 shrink-0">
                                    <img 
                                        src={userAvatar}
                                        alt={userName}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                {state !== 'collapsed' && (
                                    <>
                                        <div className="flex flex-col flex-1 text-left min-w-0">
                                            <span className="text-white text-sm font-bold truncate">
                                                {userName}
                                            </span>
                                            <span className="text-gray-400 text-xs truncate">
                                                {userEmail}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4 text-gray-400 shrink-0" />
                                    </>
                                )}
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56 rounded-xl bg-[#1B2E58] border-white/10 shadow-xl"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-3 px-3 py-3 text-left text-sm">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#e58346]/40 p-0.5 shrink-0">
                                    <img 
                                        src={userAvatar}
                                        alt={userName}
                                        className="w-full h-full rounded-full object-cover"
                                    />
                                </div>
                                <div className="grid flex-1 text-left leading-tight min-w-0">
                                    <span className="truncate font-semibold text-white">
                                        {userName}
                                    </span>
                                    <span className="truncate text-xs text-gray-400">
                                        {userEmail}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer rounded-lg mx-1">
                            <Link href="/profile" className="flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                Mi Perfil
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="text-gray-300 hover:text-white hover:bg-white/5 cursor-pointer rounded-lg mx-1">
                            <Link href="/settings" className="flex items-center">
                                <Settings className="w-4 h-4 mr-2" />
                                Configuración
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem asChild className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer rounded-lg mx-1">
                            <Link href="/logout" method="post" as="button" className="w-full flex items-center">
                                <LogOut className="w-4 h-4 mr-2" />
                                Cerrar Sesión
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}