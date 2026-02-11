import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Search, ExternalLink, Calendar, User } from 'lucide-react';

const VerifyCertificate = () => {
    const { cid } = useParams();
    const navigate = useNavigate();
    const [inputCid, setInputCid] = useState('');
    const [verificationStatus, setVerificationStatus] = useState('idle'); // idle, verifying, valid, invalid
    const [certificateData, setCertificateData] = useState(null);

    useEffect(() => {
        if (cid) {
            verifyCertificate(cid);
        }
    }, [cid]);

    const verifyCertificate = async (certificateCid) => {
        setVerificationStatus('verifying');

        // Simulate Blockchain verification
        setTimeout(() => {
            // Mock validation logic
            const isValid = certificateCid.startsWith('Qm');

            if (isValid) {
                setCertificateData({
                    recipient: '0x123...abc',
                    issuer: '0xAdmin...Issuer',
                    issueDate: new Date().toISOString(),
                    cid: certificateCid
                });
                setVerificationStatus('valid');
            } else {
                setVerificationStatus('invalid');
            }
        }, 2000);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (inputCid) {
            navigate(`/verify/${inputCid}`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Verify Certificate</h2>

                {/* Search Box */}
                <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800 mb-8">
                    <form onSubmit={handleSearch} className="flex gap-4">
                        <input
                            type="text"
                            value={inputCid}
                            onChange={(e) => setInputCid(e.target.value)}
                            placeholder="Enter Certificate CID"
                            className="flex-1 bg-slate-800 border-slate-700 rounded-lg text-white focus:ring-mint-500 focus:border-mint-500 px-4 py-3"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-mint-500 hover:bg-mint-600 text-slate-900 font-bold rounded-lg transition-colors flex items-center gap-2"
                        >
                            <Search size={20} />
                            Verify
                        </button>
                    </form>
                </div>

                {/* Verification Result */}
                {verificationStatus === 'verifying' && (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint-500 mx-auto mb-4"></div>
                        <p className="text-gray-400">Verifying certificate on blockchain...</p>
                    </div>
                )}

                {verificationStatus === 'valid' && certificateData && (
                    <div className="bg-slate-900 rounded-2xl shadow-xl border border-mint-500 overflow-hidden">
                        <div className="bg-mint-500/10 p-6 border-b border-mint-500/20 flex items-center gap-4">
                            <CheckCircle className="text-mint-500 h-8 w-8" />
                            <div>
                                <h3 className="text-xl font-bold text-white">Valid Certificate</h3>
                                <p className="text-mint-500 text-sm">Verified on SkillCertChain</p>
                            </div>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-800/50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                                        <User size={16} />
                                        <span className="text-sm">Issued To</span>
                                    </div>
                                    <p className="text-white font-mono">{certificateData.recipient}</p>
                                </div>

                                <div className="bg-slate-800/50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                                        <User size={16} />
                                        <span className="text-sm">Issued By</span>
                                    </div>
                                    <p className="text-white font-mono">{certificateData.issuer}</p>
                                </div>

                                <div className="bg-slate-800/50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                                        <Calendar size={16} />
                                        <span className="text-sm">Issue Date</span>
                                    </div>
                                    <p className="text-white">{new Date(certificateData.issueDate).toLocaleDateString()}</p>
                                </div>

                                <div className="bg-slate-800/50 p-4 rounded-lg">
                                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                                        <Search size={16} />
                                        <span className="text-sm">Certificate ID (CID)</span>
                                    </div>
                                    <p className="text-white font-mono text-sm truncate" title={certificateData.cid}>{certificateData.cid}</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-800">
                                <a
                                    href={`https://ipfs.io/ipfs/${certificateData.cid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors border border-slate-700"
                                >
                                    <ExternalLink size={18} />
                                    View Original Document on IPFS
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                {verificationStatus === 'invalid' && (
                    <div className="bg-slate-900 rounded-2xl shadow-xl border border-red-500 overflow-hidden">
                        <div className="bg-red-500/10 p-6 border-b border-red-500/20 flex items-center gap-4">
                            <XCircle className="text-red-500 h-8 w-8" />
                            <div>
                                <h3 className="text-xl font-bold text-white">Invalid Certificate</h3>
                                <p className="text-red-400 text-sm">This certificate could not be verified.</p>
                            </div>
                        </div>
                        <div className="p-8 text-center text-gray-400">
                            <p>The certificate ID provided does not exist on the blockchain or has been tampered with.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyCertificate;
