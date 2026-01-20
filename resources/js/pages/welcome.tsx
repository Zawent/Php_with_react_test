import React, { useState, useEffect, useRef } from 'react';
// IMPORTACIONES CRÍTICAS DE INERTIA
import { Head, Link, usePage } from '@inertiajs/react';

// Componente auxiliar para animaciones al hacer scroll
const FadeInSection = ({ children }: { children: React.ReactNode }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            });
        });
        if (domRef.current) observer.observe(domRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div 
            ref={domRef} 
            className={`transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
            {children}
        </div>
    );
};

export default function Welcome({ canRegister = true }: { canRegister?: boolean }) {
    // Obtenemos los props de autenticación reales de Inertia
    const { auth } = usePage().props as any;
    const [email, setEmail] = useState('');

    const scrollToSection = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');
                
                body {
                    font-family: 'Plus Jakarta Sans', sans-serif;
                }
                
                .font-heading {
                    font-family: 'Space Grotesk', sans-serif;
                }
                
                .glass {
                    background: rgba(27, 46, 88, 0.4);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }

                .glass2 {
                    background: rgba(27, 46, 88, 0.4);
                }
                
                .dark .glass {
                    background: rgba(27, 46, 88, 0.4);
                }
                
                .glass {
                    background: rgba(255, 255, 255, 0.7);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                }
                
                .marquee {
                    display: flex;
                    overflow: hidden;
                    user-select: none;
                    gap: 2rem;
                }
                
                .marquee-content {
                    flex-shrink: 0;
                    display: flex;
                    justify-content: space-around;
                    min-width: 100%;
                    gap: 2rem;
                    animation: scroll 30s linear infinite;
                }
                
                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                }
                
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            
            <div className="bg-[#fdfdfc] dark:bg-[#0A1439] text-slate-900 dark:text-white min-h-screen">
                {/* HEADER */}
                <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
                    <nav className="w-full max-w-7xl glass rounded-2xl px-6 py-3 flex items-center justify-between shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="bg-[#acc55f] p-2 rounded-lg text-[#0A1439]">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                                </svg>
                            </div>
                            <h2 className="text-xl font-heading font-bold tracking-tight">
                                Gesto<span className="text-[#acc55f]">Agile</span>
                            </h2>
                        </div>
                        
                        <div className="hidden md:flex items-center gap-8">
                            <a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="text-sm font-medium hover:text-[#acc55f] transition-colors">Servicios</a>
                            <a href="#impacto" onClick={(e) => scrollToSection(e, 'impacto')} className="text-sm font-medium hover:text-[#acc55f] transition-colors">Impacto</a>
                            <a href="#testimonios" onClick={(e) => scrollToSection(e, 'testimonios')} className="text-sm font-medium hover:text-[#acc55f] transition-colors">Testimonios</a>
                            <a href="#precios" onClick={(e) => scrollToSection(e, 'precios')} className="text-sm font-medium hover:text-[#acc55f] transition-colors">Precios</a>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <a href="/dashboard" className="rounded-lg border border-zinc-200 dark:border-zinc-700 px-5 py-1.5 text-sm font-medium">Dashboard</a>
                            ) : (
                                <>
                                    <a href="/login" className="hidden sm:block text-sm font-semibold px-4 py-2 hover:bg-white/10 rounded-xl transition-all">Log In</a>
                                    {canRegister && (
                                        <a href="/register" className="bg-[#acc55f] hover:bg-[#acc55f]/90 text-[#0A1439] px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-[#acc55f]/20 transition-all hover:scale-105 active:scale-95">
                                            Prueba Gratuita
                                        </a>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <main className="w-full">
                    {/* HERO SECTION */}
                    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-[#acc55f]/10 to-transparent blur-3xl opacity-50"></div>
                        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/2 bg-gradient-to-tr from-[#79b4c2]/10 to-transparent blur-3xl opacity-50"></div>
                        
                        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="flex flex-col gap-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#acc55f]/10 border border-[#acc55f]/20 text-[#acc55f] text-xs font-bold uppercase tracking-widest w-fit">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#acc55f] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#acc55f]"></span>
                                    </span>
                                    Nuevas Funciones ERP Disponibles
                                </div>
                                
                                <h1 className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] tracking-tight">
                                    Tu inventario más <br/>
                                    <span className="text-[#acc55f] italic">inteligente.</span>
                                </h1>
                                
                                <p className="text-lg text-slate-700 dark:text-slate-400 max-w-xl leading-relaxed">
                                    Aliado estratégico para la optimización de activos y trazabilidad con identidad lagarto. Simplificamos lo complejo para que tu logística fluya sin fricciones.
                                </p>
                                
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button className="bg-[#acc55f] text-[#0A1439] px-8 py-4 rounded-2xl text-lg font-bold shadow-xl shadow-[#acc55f]/20 hover:bg-white transition-all flex items-center justify-center gap-2 group">
                                        Empezar Prueba Gratuita
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </button>
                                    <button className="glass px-8 py-4 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                        Ver Demo
                                        <span>▶</span>
                                    </button>
                                </div>
                                
                                <div className="flex items-center gap-6 pt-4">
                                    <div className="flex -space-x-3">
                                        <img src="images/person1.png" alt="" className="w-10 h-10 rounded-full border-2 border-[#0A1439] bg-slate-800"/>
                                        <img src="images/person2.png" alt="" className="w-10 h-10 rounded-full border-2 border-[#0A1439] bg-slate-800"/>
                                        <img src="images/person3.png" alt="" className="w-10 h-10 rounded-full border-2 border-[#0A1439] bg-slate-800"/>
                                        <div className="w-10 h-10 rounded-full border-2 border-[#0A1439] bg-[#acc55f] flex items-center justify-center text-xs font-bold text-[#0A1439]">+2k</div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-400 font-medium">Confían en nosotros para su logística</p>
                                </div>
                            </div>
                            
                            <div className="relative">
                                <div className="absolute -inset-4 bg-[#acc55f]/20 blur-3xl rounded-full"></div>
                                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                    <div className="w-full aspect-[4/3] bg-[#1B2E58]/50 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-32 h-32 mx-auto bg-[#acc55f]/20 rounded-2xl flex items-center justify-center mb-4">
                                                <svg className="w-16 h-16 text-[#acc55f]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                                                </svg>
                                            </div>
                                            <p className="text-slate-500 dark:text-slate-400">Dashboard Preview</p>
                                        </div>
                                    </div>
                                    <div className="absolute top-4 right-4 glass p-4 rounded-2xl flex flex-col gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#e58346]">📈</span>
                                            <span className="text-xs font-bold">Eficiencia +42%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* MARQUEE */}
                    <section className="py-12 border-y border-white/5 bg-[#0A1439]/50 overflow-hidden">
                        <p className="text-center text-[#acc55f] text-s font-bold uppercase tracking-[0.2em] mb-8">Empresas que confían en GestoAgile</p>
                        <div className="marquee">
                            <div className="marquee-content">
                                {['LOGISTIX', 'TECHFLOW', 'CARGOCO', 'GLOBALNET', 'SMARTMOVE', 'VELOCITY'].map((company, i) => (
                                    <div key={i} className="h-12 w-40 bg-slate-800/20 rounded-lg flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                                        <span className="font-heading font-bold text-xl">{company}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="marquee-content">
                                {['LOGISTIX', 'TECHFLOW', 'CARGOCO', 'GLOBALNET', 'SMARTMOVE', 'VELOCITY'].map((company, i) => (
                                    <div key={`dup-${i}`} className="h-12 w-40 bg-slate-800/20 rounded-lg flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                                        <span className="font-heading font-bold text-xl">{company}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* SERVICIOS */}
                    <section className="py-24 px-6 max-w-7xl mx-auto" id="servicios">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-[#acc55f] font-bold text-sm uppercase tracking-widest">Nuestros Servicios</h2>
                            <h3 className="text-4xl md:text-5xl font-heading font-bold">Soluciones Estratégicas</h3>
                            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Combinamos tecnología de vanguardia con procesos optimizados para transformar tu cadena de suministro.</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { icon: '📦', color: '#acc55f', title: 'Control de Inventarios', desc: 'Gestión dinámica en tiempo real. Reduce mermas y optimiza el stock disponible automáticamente.' },
                                { icon: '🔗', color: '#e58346', title: 'Trazabilidad Total', desc: 'Seguimiento punto a punto con tecnología QR y RFID para visibilidad completa de la cadena.' },
                                { icon: '📊', color: '#79b4c2', title: 'Optimización Logística', desc: 'Algoritmos inteligentes para rutas eficientes y reducción de costos operativos en transporte.' },
                                { icon: '✨', color: '#f1b65a', title: 'Automatización de Reportes', desc: 'Informes ejecutivos automáticos. Recibe KPIs clave directamente en tu bandeja de entrada.' },
                                { icon: '🔄', color: '#fff', title: 'Integración ERP', desc: 'Conexión nativa con SAP, Oracle y Microsoft Dynamics. Sincronización de datos bidireccional.' },
                                { icon: '💬', color: '#acc55f', title: 'Soporte 24/7', desc: 'Equipo de expertos disponible siempre. Asistencia técnica personalizada en tiempo récord.' }
                            ].map((service, i) => (
                                <FadeInSection key={i}>
                                    <div className="glass p-8 rounded-3xl hover:border-[#acc55f]/50 transition-all group hover:-translate-y-2">
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform" style={{ backgroundColor: `${service.color}20` }}>
                                            {service.icon}
                                        </div>
                                        <h4 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{service.title}</h4>
                                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{service.desc}</p>
                                    </div>
                                </FadeInSection>
                            ))}
                        </div>
                    </section>

                    {/* IMPACTO */}
                    <section className="bg-[#acc55f] py-20 px-6 overflow-hidden" id="impacto">
                        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-[#0A1439] text-center">
                            {[
                                { value: '+40%', label: 'Eficiencia Operativa' },
                                { value: '10k+', label: 'Usuarios Activos' },
                                { value: '99.9%', label: 'Disponibilidad' },
                                { value: '-25%', label: 'Costos de Inventario' }
                            ].map((stat, i) => (
                                <FadeInSection key={i}>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-5xl md:text-6xl font-heading font-bold">{stat.value}</span>
                                        <span className="text-sm font-bold uppercase tracking-widest opacity-80">{stat.label}</span>
                                    </div>
                                </FadeInSection>
                            ))}
                        </div>
                    </section>

                    {/* TESTIMONIOS */}
                    <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden" id="testimonios">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                            <div className="space-y-4">
                                <h2 className="text-[#79b4c2] font-bold text-sm uppercase tracking-widest">Testimonios</h2>
                                <h3 className="text-4xl font-heading font-bold">Lo que dicen nuestros clientes</h3>
                            </div>
                            <div className="flex gap-4">
                                <button className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-[#acc55f] hover:text-[#0A1439] transition-all">
                                    ←
                                </button>
                                <button className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-[#acc55f] hover:text-[#0A1439] transition-all">
                                    →
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar">
                            {[
                                { name: 'Carlos Mendoza', role: 'Director de Operaciones, TechFlow', text: 'GestoAgile transformó por completo nuestra gestión de almacén. La integración con nuestro ERP fue impecable y ahora tenemos visibilidad real de cada palet.' },
                                { name: 'Ana Rodríguez', role: 'Gerente de Logística, GlobalNet', text: 'Los reportes automáticos nos ahorran más de 15 horas semanales de trabajo administrativo. Es la mejor inversión que hemos hecho este año.' },
                                { name: 'Jorge Perales', role: 'CTO, SmartMove', text: 'El soporte 24/7 es real. Nos ayudaron con una incidencia un domingo a las 11 PM en menos de 10 minutos. Altamente recomendados.' }
                            ].map((testimonial, i) => (
                                <div key={i} className="min-w-[350px] md:min-w-[450px] glass p-10 rounded-3xl snap-center flex flex-col gap-6">
                                    <div className="flex text-[#f1b65a]">
                                        {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                                    </div>
                                    <p className="text-lg italic leading-relaxed text-slate-700 dark:text-white">"{testimonial.text}"</p>
                                    <div className="flex items-center gap-4 pt-4 border-t border-white/10 dark:border-white/10">
                                        <img src={`images/person${i + 1}.png`} alt={testimonial.name} className="w-12 h-12 rounded-full bg-slate-300 dark:bg-slate-700"/>
                                        <div>
                                            <h5 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h5>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA FINAL */}
                    <section className="py-24 px-6" id="precios">
                        <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#acc55f]/20 blur-[100px] -z-10"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#e58346]/20 blur-[100px] -z-10"></div>
                            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 text-slate-900 dark:text-white">¿Listo para transformar tu logística?</h2>
                            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">Únete a cientos de empresas que ya están optimizando su cadena de suministro con GestoAgile.</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <button className="w-full sm:w-auto bg-[#acc55f] text-[#0A1439] px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl shadow-[#acc55f]/30 hover:scale-105 transition-all">
                                    Empieza Gratis Hoy
                                </button>
                                <button className="w-full sm:w-auto border border-white/20 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-white/10 transition-all">
                                    Hablar con un Experto
                                </button>
                            </div>
                            <p className="mt-8 text-sm text-slate-500">Sin tarjeta de crédito. Prueba completa de 14 días.</p>
                        </div>
                    </section>
                </main>

                {/* FOOTER */}
                <footer className="bg-[#0A1439] border-t border-white/5 pt-20 pb-10 px-6">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-[#acc55f] p-2 rounded-lg text-[#0A1439]">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z"/>
                                    </svg>
                                </div>
                                <h2 className="text-xl font-heading font-bold text-gray-300 tracking-tight">Gesto<span className="text-[#acc55f]">Agile</span></h2>
                            </div>
                            <p className="text-gray-300 dark:text-slate-400 text-sm leading-relaxed">
                                Especialistas en digitalización de procesos logísticos y trazabilidad inteligente. Tecnología lagarto para empresas ágiles.
                            </p>
                            <div className="flex gap-4">
                                {['📱', '🌐', '✉️'].map((icon, i) => (
                                    <a key={i} href="#" className="w-10 h-10 rounded-full glass2 flex items-center justify-center hover:text-[#acc55f] transition-all">
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <h4 className="font-bold mb-6 text-gray-300 dark:text-white">Plataforma</h4>
                            <ul className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400">
                                {['Características', 'Integraciones', 'Precios', 'Casos de Éxito'].map((item, i) => (
                                    <li key={i}><a href="#" className="text-gray-400 hover:text-[#acc55f] transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                        
                        <div>
                            <h4 className="font-bold mb-6 text-gray-300 dark:text-white">Compañía</h4>
                            <ul className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-400">
                                {['Sobre Nosotros', 'Blog', 'Carreras', 'Contacto'].map((item, i) => (
                                    <li key={i}><a href="#" className="text-gray-400 hover:text-[#acc55f] transition-colors">{item}</a></li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="flex flex-col gap-6">
                            <h4 className="font-bold mb-2 text-gray-300 dark:text-white">Newsletter</h4>
                            <p className="text-xs text-gray-400 dark:text-slate-400">Recibe las últimas novedades en logística y trazabilidad.</p>
                            <div className="flex flex-col gap-3">
                                <input 
                                    className=" dark:bg-[#1B2E58] bg-slate-100 border dark:border-white/10 border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:ring-[#acc55f] focus:border-[#acc55f] outline-none" 
                                    placeholder="tu@email.com" 
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button 
                                    onClick={handleNewsletterSubmit}
                                    className="bg-[#acc55f]/20 text-[#acc55f] border border-[#acc55f]/30 py-3 rounded-xl font-bold hover:bg-[#acc55f] hover:text-[#0A1439] transition-all text-sm"
                                >
                                    Suscribirse
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-slate-500">© 2024 GestoAgile. Todos los derechos reservados.</p>
                        <div className="flex gap-8 text-xs text-slate-500">
                            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
                            <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}