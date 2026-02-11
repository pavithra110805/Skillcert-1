import { Link } from 'react-router-dom';
import { Menu, X, LogOut, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, isAuthenticated, isAdmin, isVerifier } = useAuth();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    return (
        <nav className="bg-slate-900 border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0">
                            <span className="text-mint-500 font-bold text-xl">SkillCertChain</span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>

                                {isAuthenticated ? (
                                    <>
                                        {isAdmin && (
                                            <Link to="/admin/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                                        )}
                                        {isVerifier && (
                                            <Link to="/verifier/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                                        )}
                                    </>
                                ) : (
                                    <Link to="/verify" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Verify</Link>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:block">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-gray-300">
                                    <UserCircle size={20} />
                                    <span className="text-sm">{user?.name}</span>
                                    <span className="text-xs bg-mint-500/20 text-mint-500 px-2 py-1 rounded">
                                        {user?.role}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded flex items-center gap-2 transition-colors border border-slate-700"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-sm font-medium"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-mint-500 hover:bg-mint-600 text-slate-900 font-bold py-2 px-4 rounded transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Home</Link>

                        {isAuthenticated ? (
                            <>
                                {isAdmin && (
                                    <Link to="/admin/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                )}
                                {isVerifier && (
                                    <Link to="/verifier/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                )}

                                <div className="px-3 py-2 text-gray-400 text-sm">
                                    Logged in as <span className="text-white font-medium">{user?.name}</span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-3 rounded-md flex items-center gap-2 mt-4"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/verify" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Verify</Link>
                                <Link to="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                                <Link
                                    to="/register"
                                    className="w-full text-left bg-mint-500 hover:bg-mint-600 text-slate-900 font-bold py-2 px-3 rounded-md flex items-center gap-2 mt-4"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;

