import { ExternalLink, QrCode, Calendar, FileText } from 'lucide-react';

const CertificateCard = ({ certificate, onViewQR }) => {
    return (
        <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-mint-500/50 transition-all duration-300 shadow-lg hover:shadow-mint-500/10 group">
            <div className="h-48 bg-slate-800 relative overflow-hidden">
                {/* Placeholder for certificate preview */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-800 group-hover:bg-slate-700 transition-colors">
                    <FileText size={64} className="text-slate-600 group-hover:text-mint-500/50 transition-colors" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-4">
                    <h3 className="text-white font-bold truncate">Certificate #{certificate.id}</h3>
                </div>
            </div>

            <div className="p-5 space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400 flex items-center gap-1"><Calendar size={14} /> Date</span>
                        <span className="text-white">{certificate.date}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">CID</span>
                        <span className="text-mint-500 font-mono truncate w-24" title={certificate.cid}>
                            {certificate.cid.substring(0, 6)}...{certificate.cid.substring(certificate.cid.length - 4)}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                        onClick={() => onViewQR(certificate)}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm rounded-lg transition-colors border border-slate-700"
                    >
                        <QrCode size={16} />
                        View QR
                    </button>

                    <a
                        href={`https://ipfs.io/ipfs/${certificate.cid}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-mint-500 hover:bg-mint-600 text-slate-900 text-sm font-bold rounded-lg transition-colors"
                    >
                        <ExternalLink size={16} />
                        View File
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CertificateCard;
