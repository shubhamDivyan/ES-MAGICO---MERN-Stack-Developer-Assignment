import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, User } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center gap-2 font-bold text-xl text-blue-600 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                    <LayoutDashboard size={20} />
                </div>
                <span>Esmagico</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-slate-600 text-sm font-medium">
                    <User size={16} /> Profile
                </div>
                <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg transition font-medium"
                >
                    <LogOut size={18} /> Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;