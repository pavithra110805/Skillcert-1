import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Search, LogOut, CheckCircle, XCircle, Calendar, User, ExternalLink, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VerifierDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchCid, setSearchCid] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('idle'); // idle, verifying, valid, invalid
    const [certificateData, setCertificateData] = useState(null);
    const [verificationHistory, setVerificationHistory] = useState([
        { id: 1, cid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco', status: 'valid', date: '2024-01-15' },
        { id: 2, cid: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG', status: 'valid', date: '2024-01-20' },
    ]);

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!searchCid) return;

        setVerificationStatus('verifying');
        setCertificateData(null);

        // Simulate blockchain verification
        setTimeout(() => {
            const isValid = searchCid.startsWith('Qm');

            if (isValid) {
                const certData = {
                    recipient: '0x123...abc',
                    issuer: '0xAdmin...Issuer',
                    issueDate: new Date().toISOString(),
                    cid: searchCid
                };
                setCertificateData(certData);
                setVerificationStatus('valid');

                // Add to history
                setVerificationHistory([
                    { id: Date.now(), cid: searchCid, status: 'valid', date: new Date().toISOString().split('T')[0] },
                    ...verificationHistory
                ]);
            } else {
                setVerificationStatus('invalid');
            }
        }, 2000);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header */}
            <div className="bg-slate-900 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-white">Verifier Dashboard</h1>
                            <p className="text-sm text-gray-400 mt-1">Welcome back, {user?.name}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Verification Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-8">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Shield className="text-mint-500" />
                                Verify Certificate
                            </h2>

                            <form onSubmit={handleVerify} className="mb-6">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={searchCid}
                                        onChange={(e) => setSearchCid(e.target.value)}
                                        placeholder="Enter Certificate CID"
                                        className="flex-1 bg-slate-800 border border-slate-700 rounded-lg text-white px-4 py-3 focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-mint-500 hover:bg-mint-600 text-slate-900 font-bold rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <Search size={20} />
                                        Verify
                                    </button>
                                </div>
                            </form>

                            {/* Verification Result */}
                            {verificationStatus === 'verifying' && (
                                <div className="text-center py-12">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500 mx-auto mb-4"></div>
                                    <p className="text-gray-400">Verifying certificate on blockchain...</p>
                                </div>
                            )}

                            {verificationStatus === 'valid' && certificateData && (
                                <div className="bg-slate-800/50 rounded-xl border border-mint-500/50 overflow-hidden">
                                    <div className="bg-mint-500/10 p-4 border-b border-mint-500/20 flex items-center gap-3">
                                        <CheckCircle className="text-mint-500 h-6 w-6" />
                                        <div>
                                            <h3 className="font-bold text-white">Valid Certificate</h3>
                                            <p className="text-mint-500 text-sm">Verified on SkillCertChain</p>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-slate-800 p-3 rounded-lg">
                                                <div className="flex items-center gap-2 text-gray-400 mb-1 text-sm">
                                                    <User size={14} />
                                                    <span>Issued To</span>
                                                </div>
                                                <p className="text-white font-mono text-sm">{certificateData.recipient}</p>
                                            </div>

                                            <div className="bg-slate-800 p-3 rounded-lg">
                                                <div className="flex items-center gap-2 text-gray-400 mb-1 text-sm">
                                                    <User size={14} />
                                                    <span>Issued By</span>
                                                </div>
                                                <p className="text-white font-mono text-sm">{certificateData.issuer}</p>
                                            </div>

                                            <div className="bg-slate-800 p-3 rounded-lg">
                                                <div className="flex items-center gap-2 text-gray-400 mb-1 text-sm">
                                                    <Calendar size={14} />
                                                    <span>Issue Date</span>
                                                </div>
                                                <p className="text-white text-sm">{new Date(certificateData.issueDate).toLocaleDateString()}</p>
                                            </div>

                                            <div className="bg-slate-800 p-3 rounded-lg">
                                                <div className="flex items-center gap-2 text-gray-400 mb-1 text-sm">
                                                    <Search size={14} />
                                                    <span>Certificate ID</span>
                                                </div>
                                                <p className="text-white font-mono text-xs truncate" title={certificateData.cid}>{certificateData.cid}</p>
                                            </div>
                                        </div>

                                        <a
                                            href={`https://ipfs.io/ipfs/${certificateData.cid}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
                                        >
                                            <ExternalLink size={16} />
                                            View on IPFS
                                        </a>
                                    </div>
                                </div>
                            )}

                            {verificationStatus === 'invalid' && (
                                <div className="bg-slate-800/50 rounded-xl border border-red-500/50 overflow-hidden">
                                    <div className="bg-red-500/10 p-4 border-b border-red-500/20 flex items-center gap-3">
                                        <XCircle className="text-red-500 h-6 w-6" />
                                        <div>
                                            <h3 className="font-bold text-white">Invalid Certificate</h3>
                                            <p className="text-red-400 text-sm">Could not be verified</p>
                                        </div>
                                    </div>
                                    <div className="p-6 text-center text-gray-400">
                                        <p>The certificate ID provided does not exist on the blockchain.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Verification History */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-6 sticky top-6">
                            <h3 className="text-lg font-bold text-white mb-4">Recent Verifications</h3>
                            <div className="space-y-3">
                                {verificationHistory.slice(0, 5).map((item) => (
                                    <div key={item.id} className="bg-slate-800 p-3 rounded-lg">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-gray-400">{item.date}</span>
                                            {item.status === 'valid' ? (
                                                <CheckCircle size={16} className="text-mint-500" />
                                            ) : (
                                                <XCircle size={16} className="text-red-500" />
                                            )}
                                        </div>
                                        <p className="text-white font-mono text-xs truncate">{item.cid}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifierDashboard;
