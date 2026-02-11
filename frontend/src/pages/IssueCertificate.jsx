import { useState } from 'react';
import { Upload, User, CheckCircle, FileText } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const IssueCertificate = () => {
    const [file, setFile] = useState(null);
    const [recipient, setRecipient] = useState('');
    const [isIssuing, setIsIssuing] = useState(false);
    const [issuedData, setIssuedData] = useState(null); // { cid, recipient, txHash }

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleIssue = async (e) => {
        e.preventDefault();
        if (!file || !recipient) return;

        setIsIssuing(true);

        // Simulate IPFS upload and Blockchain transaction
        setTimeout(() => {
            const mockCid = 'Qm' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const mockTxHash = '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

            setIssuedData({
                cid: mockCid,
                recipient: recipient,
                txHash: mockTxHash,
                timestamp: new Date().toISOString()
            });
            setIsIssuing(false);
        }, 2000);
    };

    const downloadQR = () => {
        const canvas = document.getElementById('cert-qr');
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = `cert-${issuedData.cid}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl mx-auto bg-slate-900 rounded-2xl shadow-xl border border-slate-800 p-8">
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Issue New Certificate</h2>

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
                                    className="block w-full pl-10 bg-slate-800 border-slate-700 rounded-lg text-white focus:ring-mint-500 focus:border-mint-500"
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
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-mint-500 hover:text-mint-400 focus-within:outline-none">
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
                            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-slate-900 bg-mint-500 hover:bg-mint-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-mint-500 ${isIssuing ? 'opacity-75 cursor-not-allowed' : ''}`}
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
                                id="cert-qr"
                                value={`https://skillcertchain.vercel.app/verify/${issuedData.cid}`}
                                size={200}
                                level={"H"}
                                includeMargin={true}
                            />
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={downloadQR}
                                className="px-4 py-2 border border-slate-600 rounded-lg text-white hover:bg-slate-800 transition-colors"
                            >
                                Download QR
                            </button>
                            <button
                                onClick={() => {
                                    setIssuedData(null);
                                    setFile(null);
                                    setRecipient('');
                                }}
                                className="px-4 py-2 bg-mint-500 text-slate-900 rounded-lg font-bold hover:bg-mint-600 transition-colors"
                            >
                                Issue Another
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IssueCertificate;
