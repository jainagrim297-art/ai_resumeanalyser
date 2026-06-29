import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin({ email, password });
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Error: " + (error.message || error || "Failed to login"));
        }
    };

    return (
        <div className="bg-surface text-on-surface flex flex-col min-h-screen">
            <nav className="fixed top-0 w-full z-50 bg-surface dark:bg-surface-container-low border-b border-outline-variant dark:border-outline">
                <div className="flex justify-between items-center px-lg py-sm max-w-container-max mx-auto h-16">
                    <div className="font-headline-md text-headline-md font-bold text-primary dark:text-on-primary-fixed">ResumeAI</div>
                    <div className="hidden md:flex items-center gap-lg">
                        <a className="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-on-primary-fixed transition-colors" href="#">My Resumes</a>
                        <a className="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-on-primary-fixed transition-colors" href="#">Templates</a>
                        <a className="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-on-primary-fixed transition-colors" href="#">Pricing</a>
                    </div>
                    <div className="flex items-center gap-md">
                        <Link className="font-body-md text-body-md text-primary dark:text-on-primary-fixed font-bold border-b-2 border-primary dark:border-on-primary-fixed pb-1" to="/login">Sign In</Link>
                        <button className="bg-primary text-on-primary px-lg py-sm font-label-sm text-label-sm rounded-lg hover:opacity-90 transition-all">Get Started</button>
                    </div>
                </div>
            </nav>

            <main className="flex-grow pt-16 flex items-center justify-center">
                <div className="w-full max-w-container-max mx-auto px-lg lg:px-0 h-[calc(100vh-140px)] min-h-[600px] flex overflow-hidden">
                    <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-primary-container">
                        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
                            <div className="absolute top-0 -left-1/4 w-full h-full bg-gradient-to-br from-tertiary-fixed-dim via-transparent to-transparent opacity-20"></div>
                            <div className="absolute bottom-0 -right-1/4 w-full h-full bg-gradient-to-tl from-primary-fixed via-transparent to-transparent opacity-20"></div>
                        </div>
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDidx3ZqsD-TK2E9lxqrHFgstPxpQ7YONqvDQitG2-kXfWVPS_2M9vYOMWNVgkC5AN9KWXx_30ZYwZk6KU7QORXHPq06qfGbVV6Zre2CNZ1lbg5GkpDBQOvpUVsDL8dPTSwY5U1_cX9gG_fAjWmZfu6ob3NHil8pIUPKpnL9WiwgB36Db7aYYD821OKSidxmFuHACi9TA1s_EIa3l_1TclUcsxuu0neFxVtwBGcR0LCbeIBzpF7OSk5VZQtjq0yqN-yfgYOrbkfkPf1')" }}>
                        </div>
                        <div className="relative z-10 p-xl flex flex-col justify-end h-full bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                            <div className="max-w-md">
                                <div className="flex items-center gap-sm mb-md">
                                    <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                                    <span className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-widest">Success Awaits</span>
                                </div>
                                <h2 className="font-display-lg text-display-lg text-white mb-md">Unlock the door to top-tier companies.</h2>
                                <p className="font-body-lg text-body-lg text-secondary-fixed opacity-90">Our AI identifies the exact skills recruiters are searching for. Secure your shortlist position today.</p>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 bg-surface-container-lowest flex items-center justify-center p-lg md:p-xl relative auth-grid-bg">
                        <div className="w-full max-w-[400px] bg-white p-xl rounded-xl shadow-sm border border-outline-variant">
                            <div className="mb-xl">
                                <h1 className="font-headline-md text-headline-md text-primary mb-sm">Welcome Back</h1>
                                <p className="font-body-md text-body-md text-secondary">Sign in to continue optimizing your resume for top company shortlists.</p>
                            </div>
                            <form className="space-y-md" onSubmit={handleSubmit}>
                                <button className="w-full flex items-center justify-center gap-sm border border-outline-variant bg-white py-sm px-md rounded-lg font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low transition-colors group" type="button">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                                    </svg>
                                    <span>Sign in with Google</span>
                                </button>
                                <div className="relative flex items-center py-base">
                                    <div className="flex-grow border-t border-outline-variant"></div>
                                    <span className="flex-shrink mx-md font-label-xs text-label-xs text-secondary bg-white px-base">OR EMAIL</span>
                                    <div className="flex-grow border-t border-outline-variant"></div>
                                </div>

                                <div className="space-y-sm">
                                    <label className="block font-label-sm text-label-sm text-secondary" htmlFor="email">Email Address</label>
                                    <input 
                                        className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
                                        id="email" 
                                        placeholder="name@company.com" 
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-sm">
                                    <div className="flex justify-between items-center">
                                        <label className="block font-label-sm text-label-sm text-secondary" htmlFor="password">Password</label>
                                        <a className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors" href="#">Forgot Password?</a>
                                    </div>
                                    <div className="relative">
                                        <input 
                                            className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-sm font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" 
                                            id="password" 
                                            placeholder="••••••••" 
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button 
                                            className="absolute right-md top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors" 
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            <span className="material-symbols-outlined text-[20px]">
                                                {showPassword ? "visibility_off" : "visibility"}
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <button className="w-full bg-primary text-on-primary py-sm font-label-sm text-label-sm rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-sm" type="submit">
                                    <span>Sign In</span>
                                    <span className="material-symbols-outlined text-[18px]">login</span>
                                </button>

                                <p className="text-center font-body-md text-body-md text-secondary mt-xl">
                                    Don't have an account? 
                                    <Link className="text-primary font-bold hover:underline ml-1" to="/register">Sign Up</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="w-full py-lg mt-auto bg-surface-container-lowest dark:bg-surface-container-low border-t border-outline-variant dark:border-outline">
                <div className="flex flex-col md:flex-row justify-between items-center px-lg max-w-container-max mx-auto gap-md">
                    <div className="font-headline-md text-headline-md text-primary dark:text-on-primary-fixed">ResumeAI</div>
                    <div className="flex flex-wrap justify-center gap-md">
                        <a className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-on-primary-fixed transition-colors" href="#">Privacy Policy</a>
                        <a className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-on-primary-fixed transition-colors" href="#">Terms of Service</a>
                        <a className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-on-primary-fixed transition-colors" href="#">Help Center</a>
                        <a className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim hover:text-primary dark:hover:text-on-primary-fixed transition-colors" href="#">Career Advice</a>
                    </div>
                    <div className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim">
                        © 2024 ResumeAI. Precision in every pixel.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Login;