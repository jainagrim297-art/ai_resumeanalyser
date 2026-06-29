import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { generateInterviewReport } from '../../services/interview.api';
import "./style/home.scss";

const Home = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState('');
    const [selfDescription, setSelfDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [reportData, setReportData] = useState(null);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleBrowseClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmit = async () => {
        if (!file || !jobDescription) {
            alert('Please provide both a resume file and a job description.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);
        formData.append('jobDescription', jobDescription);
        if (selfDescription) formData.append('selfDescription', selfDescription);

        setLoading(true);
        try {
            const data = await generateInterviewReport(formData);
            setReportData(data.report);
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

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
                {/* Hero: Quick Upload Area */}
                <section className="w-full">
                    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl shadow-sm flex flex-col gap-xl">
                        <div className="flex flex-col md:flex-row items-center gap-xl">
                            <div className="flex-1 space-y-md text-center md:text-left">
                                <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg text-primary">Elevate Your Career</h1>
                                <p className="text-body-lg text-secondary max-w-lg">Upload your current resume and paste the job description to see an instant AI analysis and professional match score against global industry standards.</p>
                            </div>
                            <div className="w-full md:w-[400px]">
                                <div 
                                    className={`border-2 border-dashed ${isDragging ? 'border-primary bg-primary-container' : 'border-primary-container/20'} rounded-xl p-xl flex flex-col items-center justify-center gap-md bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer group`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={handleBrowseClick}
                                >
                                    <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                                        <span className="material-symbols-outlined text-4xl">upload_file</span>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-label-sm text-primary">{file ? file.name : "Drag & drop your PDF or DOCX"}</p>
                                        <p className="text-label-xs text-secondary mt-xs">Maximum file size: 10MB</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx"
                                    />
                                    <button 
                                        className="mt-md bg-primary text-on-primary px-lg py-sm rounded-lg font-label-sm hover:opacity-90 transition-all active:scale-95"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBrowseClick();
                                        }}
                                    >
                                        Browse Files
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Input Fields (Added back in to complete the flow) */}
                        <div className="flex flex-col gap-md pt-lg border-t border-outline-variant">
                            <h2 className="font-headline-md text-primary mb-xs">Job Details</h2>
                            <textarea 
                                className="w-full bg-surface-container rounded-xl p-md text-body-md text-on-surface border border-outline focus:border-primary outline-none resize-y" 
                                rows="3" 
                                placeholder="Paste Job Description Here (Required)"
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                            <textarea 
                                className="w-full bg-surface-container rounded-xl p-md text-body-md text-on-surface border border-outline focus:border-primary outline-none resize-y" 
                                rows="2" 
                                placeholder="Add Self Description or Extra Context (Optional)"
                                value={selfDescription}
                                onChange={(e) => setSelfDescription(e.target.value)}
                            />
                            <button 
                                className="w-full bg-primary text-on-primary py-md rounded-xl font-label-md text-label-md hover:bg-primary/90 transition-all shadow-md disabled:opacity-50 mt-sm"
                                onClick={handleSubmit}
                                disabled={loading || !file || !jobDescription}
                            >
                                {loading ? "Analyzing Document with Gemini AI..." : "Generate AI Report"}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
                    {/* Left Column: Analysis Results */}
                    <div className="lg:col-span-8 flex flex-col gap-xl">
                        {reportData ? (
                            <section>
                                <div className="flex justify-between items-end mb-lg">
                                    <div>
                                        <h2 className="text-headline-md font-headline-md text-primary">AI Analysis Report</h2>
                                        <p className="text-label-sm text-secondary">Your personalized skill gap analysis</p>
                                    </div>
                                </div>
                                <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg hover:shadow-md transition-shadow group mb-lg">
                                    <h3 className="font-bold text-primary mb-md">Identified Skill Gaps</h3>
                                    <div className="flex flex-wrap gap-sm">
                                        {reportData.skillGaps?.map((gap, idx) => (
                                            <span key={idx} className="px-md py-sm bg-error-container text-on-error-container text-label-xs font-label-xs rounded-full flex items-center gap-xs">
                                                <span className="material-symbols-outlined text-[14px]">close</span> {gap.skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg hover:shadow-md transition-shadow group">
                                    <h3 className="font-bold text-primary mb-md">Preparation Plan</h3>
                                    <div className="flex flex-col gap-md">
                                        {reportData.preperationPlan?.map((plan, idx) => (
                                            <div key={idx} className="border-l-4 border-tertiary-fixed-dim pl-4 py-2">
                                                <h4 className="font-bold text-primary text-label-sm">{plan.skill} ({plan.severity} Severity)</h4>
                                                <p className="text-body-md text-secondary mt-1">{plan.explanation}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <section className="flex flex-col items-center justify-center text-center py-24 border-2 border-dashed border-outline-variant rounded-xl text-secondary bg-surface-container-lowest">
                                <span className="material-symbols-outlined text-4xl mb-md">analytics</span>
                                <h3 className="font-headline-md text-primary mb-sm">Awaiting Analysis</h3>
                                <p className="text-body-md max-w-md">Upload your resume and provide a job description to generate your personalized AI insights here.</p>
                            </section>
                        )}
                    </div>

                    {/* Right Column: Quick Stats */}
                    <aside className="lg:col-span-4">
                        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-lg sticky top-24">
                            <h2 className="text-label-sm font-bold text-primary uppercase tracking-tight">Quick Stats</h2>
                            <div className="space-y-md">
                                {/* Stat: Average Match Score */}
                                <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant/30">
                                    <div className="flex justify-between items-center mb-xs">
                                        <span className="text-label-xs text-secondary">Overall Match Score</span>
                                        <span className="material-symbols-outlined text-primary text-[18px]">star</span>
                                    </div>
                                    <p className="text-headline-md font-bold text-primary">
                                        {reportData ? reportData.score : "--%"}
                                    </p>
                                    <div className="w-full bg-outline-variant h-1 rounded-full mt-sm overflow-hidden">
                                        <div className="bg-on-tertiary-container h-1 rounded-full transition-all duration-1000" style={{ width: reportData ? reportData.score : "0%" }}></div>
                                    </div>
                                </div>
                                {/* Technical Questions Count */}
                                <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant/30">
                                    <div className="flex justify-between items-center mb-xs">
                                        <span className="text-label-xs text-secondary">Technical Prep</span>
                                        <span className="material-symbols-outlined text-primary text-[18px]">code</span>
                                    </div>
                                    <p className="text-headline-md font-bold text-primary">
                                        {reportData?.technicalQuestions?.length || 0}
                                    </p>
                                    <p className="text-label-xs text-secondary mt-xs">Questions Generated</p>
                                </div>
                                {/* Behavioral Questions Count */}
                                <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant/30">
                                    <div className="flex justify-between items-center mb-xs">
                                        <span className="text-label-xs text-secondary">Behavioral Prep</span>
                                        <span className="material-symbols-outlined text-primary text-[18px]">psychology</span>
                                    </div>
                                    <p className="text-headline-md font-bold text-primary">
                                        {reportData?.behavioralQuestions?.length || 0}
                                    </p>
                                    <p className="text-label-xs text-secondary mt-xs">Questions Generated</p>
                                </div>
                            </div>
                            <div className="mt-md">
                                <div className="p-md bg-secondary-container/30 rounded-lg">
                                    <div className="flex gap-sm items-start">
                                        <span className="material-symbols-outlined text-on-secondary-container">lightbulb</span>
                                        <div className="flex-1">
                                            <p className="text-label-xs font-bold text-on-secondary-container mb-xs">AI Tip of the Day</p>
                                            <p className="text-label-xs text-secondary leading-relaxed">Using "Led" or "Spearheaded" instead of "Managed" increases impact score by 12% on average.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-surface-container-low dark:bg-surface-container-lowest border-t border-outline-variant dark:border-outline mt-xl">
                <div className="flex flex-col md:flex-row justify-between items-center w-full px-lg py-md max-w-container-max mx-auto gap-md">
                    <span className="text-label-sm font-label-sm font-bold text-primary dark:text-primary-fixed">ResumeAI</span>
                    <span className="text-secondary dark:text-on-secondary-fixed-variant text-label-xs font-label-xs">© 2024 ResumeAI. Precision in every pixel.</span>
                    <div className="flex gap-lg">
                        <a className="text-label-xs font-label-xs text-secondary dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed underline transition-opacity duration-200 hover:opacity-80" href="#">Privacy Policy</a>
                        <a className="text-label-xs font-label-xs text-secondary dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed underline transition-opacity duration-200 hover:opacity-80" href="#">Terms of Service</a>
                        <a className="text-label-xs font-label-xs text-secondary dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-primary-fixed underline transition-opacity duration-200 hover:opacity-80" href="#">Contact Support</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;