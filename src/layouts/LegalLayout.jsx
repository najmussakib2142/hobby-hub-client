import { Link } from "react-router";
import { FaArrowLeft, FaClock } from "react-icons/fa";

const LegalLayout = ({ title, lastUpdated, children }) => {
    return (
        <div className="bg-base-100 min-h-screen">
            {/* Minimal Progress/Top Bar */}
            <div className="sticky top-0 z-50 w-full bg-base-100/80 backdrop-blur-md border-b border-base-200">
                <div className="max-w-x6l mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity">
                        <FaArrowLeft className="text-xs" /> Back to HobbyHub
                    </Link>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <FaClock />
                        <span>Ver. 2026.1.0</span>
                    </div>
                </div>
            </div>

            <main className="max-w-6xl mx-auto px-6 py-12  flex flex-col lg:flex-row gap-12">
                
                {/* Sidebar Navigation - Professional Touch */}
                <aside className="lg:w-1/4">
                    <div className="sticky top-28 space-y-6">
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Legal Directory</h4>
                            <nav className="flex flex-col gap-3">
                                <Link to="/privacy" className="text-sm font-medium hover:text-primary transition-colors">Privacy Policy</Link>
                                <Link to="/terms" className="text-sm font-medium hover:text-primary transition-colors text-gray-500">Terms of Service</Link>
                                <Link to="/cookies" className="text-sm font-medium hover:text-primary transition-colors text-gray-500">Cookie Policy</Link>
                            </nav>
                        </div>
                        <div className="p-4 bg-base-200 rounded-xl">
                            <p className="text-xs text-gray-500 leading-relaxed">
                                Need a physical copy? Contact <span className="text-primary underline">legal@hobbyhub.com</span> for a PDF version.
                            </p>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <article className="lg:w-3/4">
                    <header className="mb-12">
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-base-content tracking-tight mb-4">
                            {title}
                        </h1>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">Official</span>
                            <p className="text-sm text-gray-500 italic">Last Updated: {lastUpdated}</p>
                        </div>
                    </header>

                    <div className="prose prose-lg max-w-none 
                        prose-headings:text-base-content prose-headings:font-bold
                        prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed
                        prose-strong:text-base-content
                        prose-li:text-gray-600 dark:prose-li:text-gray-400
                        prose-h2:border-b prose-h2:border-base-200 prose-h2:pb-2 prose-h2:mt-12">
                        {children}
                    </div>

                    {/* Trust Footer */}
                    <div className="mt-16 pt-8 border-t border-base-200">
                        <p className="text-sm text-gray-500">
                            HobbyHub is committed to transparency. If you have questions regarding these terms, please reach out to our support team.
                        </p>
                    </div>
                </article>
            </main>
        </div>
    );
};

export default LegalLayout;