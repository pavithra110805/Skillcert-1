import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Upload, User, CheckCircle, FileText, LogOut, LayoutGrid } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('issue'); // 'issue' or 'manage'

    // Issue Certificate State
    const [file, setFile] = useState(null);
    const [recipient, setRecipient] = useState('');
    const [isIssuing, setIsIssuing] = useState(false);
    const [issuedData, setIssuedData] = useState(null);

    // Issued Certificates State
    const [issuedCertificates, setIssuedCertificates] = useState([
        { id: 1, cid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco', recipient: '0x123...abc', date: '2024-01-15' },
        { id: 2, cid: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG', recipient: '0x456...def', date: '2024-01-20' },
    ]);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleIssue = async (e) => {
        e.preventDefault();
        if (!file || !recipient) return;

        setIsIssuing(true);

        setTimeout(() => {
            const mockCid = 'Qm' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const mockTxHash = '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            const newCert = {
                cid: mockCid,
                recipient: recipient,
                txHash: mockTxHash,
                timestamp: new Date().toISOString()
            };

            setIssuedData(newCert);
            setIssuedCertificates([...issuedCertificates, {
                id: Date.now(),
                cid: mockCid,
                recipient,
                date: new Date().toISOString().split('T')[0]
            }]);
            setIsIssuing(false);
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
                            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
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

            {/* Tabs */}
            <div className="bg-slate-900/50 border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveTab('issue')}
                            className={`px-6 py-4 font-medium transition-colors border-b-2 ${activeTab === 'issue'
                                    ? 'border-mint-500 text-mint-500'
                                    : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            Issue Certificate
                        </button>
                        <button
                            onClick={() => setActiveTab('manage')}
                            className={`px-6 py-4 font-medium transition-colors border-b-2 ${activeTab === 'manage'
                                    ? 'border-mint-500 text-mint-500'
                                    : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            Manage Certificates
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {activeTab === 'issue' && (
                    <div className="max-w-2xl mx-auto bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Issue New Certificate</h2>

                        {!issuedData ? (
                            <form onSubmit={handleIssue} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Recipient Wallet Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="text-gray-500" size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            value={recipient}
                                            onChange={(e) => setRecipient(e.target.value)}
                                            className="block w-full pl-10 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-mint-500 focus:border-transparent"
                                            placeholder="0x..."
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">
                                        Certificate File (PDF/Image)
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-700 border-dashed rounded-lg hover:border-mint-500 transition-colors cursor-pointer relative group">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400 group-hover:text-mint-500 transition-colors" />
                                            <div className="flex text-sm text-gray-400">
                                                <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-mint-500 hover:text-mint-400">
                                                    <span>Upload a file</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} required />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {file ? file.name : 'PNG, JPG, PDF up to 10MB'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isIssuing}
                                    className={`w-full py-3 px-4 bg-mint-500 hover:bg-mint-600 text-slate-900 font-bold rounded-lg transition-colors ${isIssuing ? 'opacity-75 cursor-not-allowed' : ''
                                        }`}
                                >
                                    {isIssuing ? 'Issuing on Blockchain...' : 'Issue Certificate'}
                                </button>
                            </form>
                        ) : (
                            <div className="text-center space-y-6">
                                <div className="flex justify-center">
                                    <div className="p-3 bg-mint-500/10 rounded-full">
                                        <CheckCircle className="text-mint-500 h-10 w-10" />
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white">Certificate Issued Successfully!</h3>

                                <div className="bg-slate-800 p-4 rounded-lg text-left space-y-2 text-sm text-gray-300">
                                    <p><span className="text-gray-500">Recipient:</span> {issuedData.recipient}</p>
                                    <p><span className="text-gray-500">CID:</span> {issuedData.cid}</p>
                                    <p><span className="text-gray-500">TX Hash:</span> {issuedData.txHash}</p>
                                </div>

                                <div className="flex justify-center p-4 bg-white rounded-lg w-fit mx-auto">
                                    <QRCodeSVG
                                        value={`https://skillcertchain.vercel.app/verify/${issuedData.cid}`}
                                        size={200}
                                        level={"H"}
                                    />
                                </div>

                                <button
                                    onClick={() => {
                                        setIssuedData(null);
                                        setFile(null);
                                        setRecipient('');
                                    }}
                                    className="w-full py-3 bg-mint-500 text-slate-900 rounded-lg font-bold hover:bg-mint-600 transition-colors"
                                >
                                    Issue Another Certificate
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'manage' && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                <LayoutGrid className="text-mint-500" />
                                Issued Certificates
                            </h2>
                            <span className="text-gray-400">{issuedCertificates.length} total</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {issuedCertificates.map((cert) => (
                                <div key={cert.id} className="bg-slate-900 rounded-xl border border-slate-800 p-6 hover:border-mint-500/50 transition-colors">
                                    <div className="flex items-center justify-center h-32 bg-slate-800 rounded-lg mb-4">
                                        <FileText size={48} className="text-slate-600" />
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <p className="text-gray-400">Recipient: <span className="text-white font-mono">{cert.recipient}</span></p>
                                        <p className="text-gray-400">CID: <span className="text-mint-500 font-mono text-xs">{cert.cid.substring(0, 12)}...</span></p>
                                        <p className="text-gray-400">Date: <span className="text-white">{cert.date}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
