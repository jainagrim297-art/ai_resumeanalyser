import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInterviewHistory } from '../../services/interview.api';
import "./style/home.scss";

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getInterviewHistory();
                setHistory(data.history || []);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="bg-background text-on-background font-body-md selection:bg-primary-fixed min-h-screen flex flex-col">
            {/* TopNavBar */}
            <header className="bg-surface dark:bg-surface-container-high border-b border-outline-variant dark:border-outline shadow-sm sticky top-0 z-50">
                <nav className="flex justify-between items-center w-full px-lg md:px-xl max-w-container-max mx-auto h-16">
                    <div className="flex items-center gap-xl">
                        <Link to="/" className="text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed">ResumeAI</Link>
                        <div className="hidden md:flex gap-lg">
                            <Link to="/my-resumes" className="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1 hover:text-primary dark:hover:text-primary-fixed transition-colors">My Resumes</Link>
                            <a className="text-secondary dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Templates</a>
                            <a className="text-secondary dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Pricing</a>
                        </div>
                    </div>
                    <div className="flex items-center gap-md">
                        <button className="material-symbols-outlined text-secondary hover:text-primary transition-all duration-200 active:scale-95">notifications</button>
                        <button className="material-symbols-outlined text-secondary hover:text-primary transition-all duration-200 active:scale-95">help_outline</button>
                        <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant">
                            <img className="w-full h-full object-cover" alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADODBXWujItBXBksDZR28lP_lpBML3UEYW3Ild2hk9s43gTmr3cvGzhE0MTwQ3UlScqnr1lTp_1yBbLK9MRtiNI_ZL_ftW7pKbDD2twxtyw9w08TGUDdfCewAuF8dQ-bUurmpFhWT1VatslEMvtjjbEu-Yq5EAVPGBLj_y2adsvdd3DJbHsnDFRZJUavb8_w-J0PU9hDjRQ_x0EvcZIM9292d7RxoE680ThNJSJV8Gs-b9ule99rGyNflwqK8jpifeMTzSpB0WH56I"/>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow max-w-container-max mx-auto px-lg py-xl flex flex-col gap-xl w-full">
                <section>
                    <div className="flex justify-between items-end mb-lg">
                        <div>
                            <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary">My Resumes</h1>
                            <p className="text-body-lg text-secondary">Your past AI analysis reports</p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-24">
                            <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center text-center py-24 border-2 border-dashed border-outline-variant rounded-xl text-secondary bg-surface-container-lowest">
                            <span className="material-symbols-outlined text-4xl mb-md">history</span>
                            <h3 className="font-headline-md text-primary mb-sm">No Past Resumes</h3>
                            <p className="text-body-md max-w-md">You haven't generated any AI analysis reports yet. Head back to the Command Center to analyze your first resume!</p>
                            <Link to="/" className="mt-md bg-primary text-on-primary px-lg py-sm rounded-lg font-label-sm hover:opacity-90 transition-all active:scale-95">Go to Command Center</Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                            {history.map((item, index) => (
                                <div key={index} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg hover:shadow-md transition-shadow group flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-md">
                                            <div className="p-sm bg-primary-container/10 rounded">
                                                <span className="material-symbols-outlined text-primary-container">description</span>
                                            </div>
                                            <span className="bg-on-tertiary-container/10 text-on-tertiary-container text-label-xs px-sm py-xs rounded-full">
                                                {item.score} Match
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-primary mb-xs line-clamp-1">{item.jobDescription.split('\n')[0] || "Analysis Report"}</h3>
                                        <p className="text-label-xs text-secondary mb-lg">
                                            {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>
                                    <div className="flex gap-sm mt-auto">
                                        <button className="flex-1 bg-surface-container-high text-primary font-label-sm py-sm rounded hover:bg-surface-variant transition-colors" onClick={() => alert('View detailed report popup coming soon!')}>View Details</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default History;
