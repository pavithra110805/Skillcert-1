import { useState, useEffect } from 'react';
import CertificateCard from '../components/CertificateCard';
import { LayoutGrid, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

// Mock Data
const MOCK_CERTIFICATES = [
    { id: 1, cid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco', date: '2023-10-15' },
    { id: 2, cid: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG', date: '2023-11-20' },
    { id: 3, cid: 'QmZ4tDuvesj1qceGLq2Su98M46s2xonq4y5S5P9r8L1234', date: '2023-12-05' },
];

const Dashboard = () => {
    const [certificates, setCertificates] = useState([]);
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        // Simulate fetching from blockchain
        setTimeout(() => {
            setCertificates(MOCK_CERTIFICATES);
        }, 1000);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                    <LayoutGrid className="text-mint-500" />
                    My Certificates
                </h2>
                <Link
                    to="/issue"
                    className="px-4 py-2 bg-mint-500 hover:bg-mint-600 text-slate-900 font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                    <Plus size={18} />
                    Issue New
                </Link>
            </div>

            {certificates.length === 0 ? (
                <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
                    <p className="text-gray-400 mb-4">No certificates found for this wallet.</p>
                    <Link to="/issue" className="text-mint-500 hover:underline">Issue your first certificate</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert) => (
                        <CertificateCard
                            key={cert.id}
                            certificate={cert}
                            onViewQR={setSelectedCert}
                        />
                    ))}
                </div>
            )}

            {/* QR Modal */}
            {selectedCert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedCert(null)}>
                    <div className="bg-slate-900 p-8 rounded-2xl max-w-sm w-full border border-slate-700 shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedCert(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h3 className="text-xl font-bold text-white mb-6 text-center">Certificate QR Code</h3>

                        <div className="flex justify-center bg-white p-4 rounded-xl mb-6">
                            <QRCodeSVG
                                value={`https://skillcertchain.vercel.app/verify/${selectedCert.cid}`}
                                size={200}
                                level={"H"}
                            />
                        </div>

                        <p className="text-center text-gray-400 text-sm break-all font-mono mb-6">
                            CID: {selectedCert.cid}
                        </p>

                        <button
                            className="w-full py-3 bg-mint-500 hover:bg-mint-600 text-slate-900 font-bold rounded-lg transition-colors"
                            onClick={() => setSelectedCert(null)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
