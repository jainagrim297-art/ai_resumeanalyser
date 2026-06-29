import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const navigate = useNavigate();
    const { handleRegister } = useAuth();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleRegister({ username, email, password });
            navigate('/');
        } catch (error) {
            console.error(error);
            alert("Error: " + (error.message || error || "Failed to register"));
        }
    };

    return (
        <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md">
            {/* TopNavBar */}
            <header className="bg-surface border-b border-outline-variant h-16 sticky top-0 z-50">
                <div className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-full">
                    <div className="flex items-center gap-md">
                        <span className="text-headline-md font-headline-md font-bold text-primary">ResumeAI</span>
                        <nav className="hidden md:flex gap-lg items-center ml-xl">
                            <a className="text-secondary font-label-sm text-label-sm hover:text-primary transition-colors" href="#">My Resumes</a>
                            <a className="text-secondary font-label-sm text-label-sm hover:text-primary transition-colors" href="#">Templates</a>
                            <a className="text-secondary font-label-sm text-label-sm hover:text-primary transition-colors" href="#">Pricing</a>
                        </nav>
                    </div>
                    <div className="flex items-center gap-md">
                        <Link to="/login" className="hidden sm:block text-secondary font-label-sm text-label-sm hover:text-primary transition-colors">Sign In</Link>
                        <button className="bg-primary text-on-primary px-lg py-sm font-label-sm text-label-sm rounded-lg active:opacity-80 active:scale-95 transition-all">Get Started</button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow w-full flex items-center bg-gradient-to-br from-surface to-surface-container-low">
                <div className="w-full max-w-container-max mx-auto px-gutter py-xl grid grid-cols-1 lg:grid-cols-2 gap-xl">
                    
                    {/* Left Side: Copy & Branding */}
                    <div className="flex flex-col justify-center pr-lg">
                        <div className="inline-flex items-center gap-xs px-sm py-xs bg-primary-fixed rounded-full mb-lg w-max">
                            <span className="material-symbols-outlined text-primary text-[14px]">auto_awesome</span>
                            <span className="text-primary font-label-xs text-label-xs uppercase tracking-wider">AI-POWERED PRECISION</span>
                        </div>
                        <h1 className="font-display-lg text-display-lg text-on-background mb-md leading-tight">
                            Join the future of<br/>professional hiring.
                        </h1>
                        <p className="text-on-surface-variant font-body-lg text-body-lg mb-xl max-w-md">
                            "Since using ResumeAI, my interview callback rate increased by 70%. The AI insights are pinpoint accurate."
                        </p>
                        
                        <div className="flex items-center gap-md">
                            <div className="flex -space-x-4">
                                <img className="w-10 h-10 rounded-full border-2 border-surface object-cover" src="https://i.pravatar.cc/100?img=1" alt="User" />
                                <img className="w-10 h-10 rounded-full border-2 border-surface object-cover" src="https://i.pravatar.cc/100?img=11" alt="User" />
                                <img className="w-10 h-10 rounded-full border-2 border-surface object-cover" src="https://i.pravatar.cc/100?img=5" alt="User" />
                            </div>
                            <span className="text-on-surface-variant font-label-sm text-label-sm">
                                <strong className="text-primary">2,500+</strong> professionals joined today
                            </span>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div className="flex items-center justify-center">
                        <div className="bg-surface-container-lowest p-xl rounded-xl shadow-lg border border-outline-variant w-full max-w-md relative overflow-hidden">
                            {/* Decorative Top Border */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-tertiary-fixed-dim"></div>
                            
                            <h2 className="font-headline-md text-headline-md text-primary mb-sm">Create Your Account</h2>
                            <p className="text-on-surface-variant font-label-sm text-label-sm mb-lg">
                                Join thousands of candidates getting shortlisted by top companies with AI-powered resume insights.
                            </p>

                            <button type="button" className="w-full flex items-center justify-center gap-sm border border-outline-variant rounded-lg py-sm font-label-sm text-label-sm hover:bg-surface-container transition-colors mb-lg">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                                Sign up with Google
                            </button>

                            <div className="flex items-center mb-lg">
                                <div className="flex-grow h-px bg-outline-variant"></div>
                                <span className="px-sm text-outline font-label-xs text-label-xs tracking-wider">OR WITH EMAIL</span>
                                <div className="flex-grow h-px bg-outline-variant"></div>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                                <div className="flex flex-col gap-xs">
                                    <label className="font-label-sm text-label-sm text-primary" htmlFor="username">Full Name</label>
                                    <input 
                                        className="border border-outline-variant rounded-lg px-md py-sm font-body-md bg-surface-container-lowest focus:outline-none focus:border-primary transition-colors"
                                        type="text" 
                                        id="username" 
                                        name="username" 
                                        placeholder="John Doe" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-xs">
                                    <label className="font-label-sm text-label-sm text-primary" htmlFor="email">Email</label>
                                    <input 
                                        className="border border-outline-variant rounded-lg px-md py-sm font-body-md bg-surface-container-lowest focus:outline-none focus:border-primary transition-colors"
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        placeholder="john@example.com" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-xs">
                                    <label className="font-label-sm text-label-sm text-primary" htmlFor="password">Password</label>
                                    <input 
                                        className="border border-outline-variant rounded-lg px-md py-sm font-body-md bg-surface-container-lowest focus:outline-none focus:border-primary transition-colors"
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        placeholder="••••••••" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required
                                    />
                                </div>

                                <button type="submit" className="mt-sm w-full bg-primary text-on-primary py-md rounded-lg font-label-sm text-label-sm hover:opacity-90 active:scale-[0.98] transition-all">
                                    GET STARTED
                                </button>
                            </form>

                            <p className="mt-xl text-center text-on-surface-variant font-label-sm text-label-sm">
                                Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-surface-container border-t border-outline-variant mt-auto">
                <div className="flex flex-col md:flex-row justify-between items-center w-full px-gutter py-xl max-w-container-max mx-auto gap-md">
                    <div className="flex flex-col md:items-start items-center gap-xs">
                        <span className="text-label-sm font-label-sm font-bold text-primary">ResumeAI</span>
                        <p className="text-secondary font-label-xs text-label-xs text-center md:text-left">© 2024 ResumeAI. Precision in every pixel.</p>
                    </div>
                    <div className="flex gap-lg">
                        <a className="text-secondary font-label-xs text-label-xs hover:text-primary transition-colors" href="#">Privacy Policy</a>
                        <a className="text-secondary font-label-xs text-label-xs hover:text-primary transition-colors" href="#">Terms of Service</a>
                        <a className="text-secondary font-label-xs text-label-xs hover:text-primary transition-colors" href="#">Help Center</a>
                        <a className="text-secondary font-label-xs text-label-xs hover:text-primary transition-colors" href="#">Career Advice</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Register;
