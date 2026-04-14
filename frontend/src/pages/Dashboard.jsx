import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, UserPlus, Loader2 } from 'lucide-react';
import API from '../api';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import CreateProjectModal from '../components/CreateProjectModal';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inviteToken, setInviteToken] = useState('');
    const navigate = useNavigate();

   
const fetchProjects = async () => {
    try {
        setLoading(true); 
        const { data } = await API.get('/projects'); 
        setProjects(data);
    } catch (err) {
        console.log("Error details:", err.response);
    } finally {
        setLoading(false); 
    }
};

    useEffect(() => { fetchProjects(); }, []);

    const handleJoinProject = async () => {
        if (!inviteToken) return alert("Please enter a token");
        try {
            await API.post(`/projects/join/${inviteToken}`);
            setInviteToken('');
            fetchProjects();
            alert("Successfully joined the project!");
        } catch (err) {
            alert(err.response?.data?.msg || "Invalid or Expired Token");
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            
            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Project Dashboard</h1>
                        <p className="text-slate-500 mt-2 text-lg">Manage your team and track your workspace activities.</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="flex bg-white border border-slate-200 p-1.5 rounded-2xl shadow-sm">
                            {/* <input 
                                type="text" 
                                placeholder="Enter Invite Token..." 
                                className="bg-transparent px-4 py-2 outline-none text-sm w-48"
                                value={inviteToken}
                                onChange={(e) => setInviteToken(e.target.value)}
                            /> */}
                            {/* <button 
                                onClick={handleJoinProject}
                                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition"
                            >
                                <UserPlus size={16} className="inline mr-2" /> Join
                            </button> */}
                        </div>
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
                        >
                            <Plus size={20} /> New Project
                        </button>
                    </div>
                </div>

                {/* Projects Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <ProjectCard 
                                key={project._id} 
                                project={project} 
                                onClick={() => navigate(`/project/${project._id}`)} 
                            />
                        ))}
                        {projects.length === 0 && (
                            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                                <p className="text-slate-400 font-medium text-lg">No projects found. Create one to get started!</p>
                            </div>
                        )}
                    </div>
                )}
            </main>

            <CreateProjectModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                refreshProjects={fetchProjects} 
            />
        </div>
    );
};

export default Dashboard;