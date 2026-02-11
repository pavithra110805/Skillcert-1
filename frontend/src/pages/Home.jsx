import { Link } from 'react-router-dom';
import { ShieldCheck, FileCheck, Search } from 'lucide-react';

const Home = () => {
    return (
        <div className="relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-mint-500/20 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-50"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
                <div className="mx-auto max-w-3xl">
                    <div className="flex justify-center mb-8">
                        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
                            <ShieldCheck size={48} className="text-mint-500" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl mb-6">
                        <span className="block">Verify Trust.</span>
                        <span className="block text-mint-500">Securely & Instantly.</span>
                    </h1>

                    <p className="mt-4 max-w-xl mx-auto text-xl text-gray-300 mb-10">
                        Issue, manage, and verify certificates on the blockchain.
                        Immutable, decentralized, and tamper-proof credentialing for the modern world.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                        <Link
                            to="/register"
                            className="px-8 py-4 bg-mint-500 hover:bg-mint-600 text-slate-900 font-bold rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-mint-500/20"
                        >
                            <FileCheck size={20} />
                            Get Started
                        </Link>
                        <Link
                            to="/verify"
                            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg border border-slate-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                        >
                            <Search size={20} />
                            Verify Certificate
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon={<FileCheck className="text-mint-500" size={32} />}
                        title="Tamper-Proof"
                        description="Certificates are stored on IPFS and anchored to the blockchain, ensuring they cannot be altered."
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="text-mint-500" size={32} />}
                        title="Instant Verification"
                        description="Verify any certificate instantly using a simple QR code scan or by entering the certificate ID."
                    />
                    <FeatureCard
                        icon={<Search className="text-mint-500" size={32} />}
                        title="Global Access"
                        description="Access your certificates from anywhere in the world, anytime. No central authority needed."
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-xl hover:border-mint-500/50 transition-colors">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);

export default Home;
