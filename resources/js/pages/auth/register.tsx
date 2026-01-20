import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head, Link } from '@inertiajs/react'; // Importamos Link de Inertia
import { ArrowLeft } from 'lucide-react'; // Icono para el botón de regreso

export default function Register() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');
                body { font-family: 'Plus Jakarta Sans', sans-serif; }
                .font-heading { font-family: 'Space Grotesk', sans-serif; }
            `}</style>

            <Head title="Crear cuenta" />

            <div className="min-h-screen bg-[#fdfdfc] dark:bg-[#0A1439] text-slate-900 dark:text-white flex items-center justify-center p-4 relative overflow-hidden">
                {/* Background gradients */}
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
                <div className="w-full max-w-md my-8">
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
                            Crea tu cuenta
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Únete a la gestión inteligente de inventarios
                        </p>
                    </div>

                    {/* Card de Formulario */}
                    <div className="bg-white/70 dark:bg-[#1B2E58]/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
                        <Form
                            {...store.form()}
                            resetOnSuccess={['password', 'password_confirmation']}
                            disableWhileProcessing
                            className="flex flex-col gap-5"
                        >
                            {({ processing, errors }) => (
                                <>
                                    {/* Nombre */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Nombre completo</Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            name="name"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            placeholder="Ej. Juan Pérez"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    {/* Email */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Correo electrónico</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            placeholder="tu@email.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Password */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                        />
                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Confirmar Password */}
                                    <div className="grid gap-2">
                                        <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            placeholder="••••••••"
                                        />
                                        <InputError message={errors.password_confirmation} />
                                    </div>

                                    <Button
                                        type="submit"
                                        className="mt-2 w-full"
                                        tabIndex={5}
                                        disabled={processing}
                                    >
                                        {processing && <Spinner />}
                                        Empezar ahora
                                    </Button>

                                    <div className="text-center text-sm text-slate-600 dark:text-slate-400">
                                        ¿Ya tienes una cuenta?{' '}
                                        <TextLink href={login()} tabIndex={6} className="text-[#acc55f] font-semibold">
                                            Inicia sesión
                                        </TextLink>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Al registrarte, aceptas nuestros <a href="#" className="underline">Términos</a> y <a href="#" className="underline">Privacidad</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}