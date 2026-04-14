import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, ChevronLeft, Trash2, Tag, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import API from '../api';
import Navbar from '../components/Navbar';
import TaskModal from '../components/TaskModal';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    const fetchTasks = async () => {
        try {
            const { data } = await API.get(`/tasks/${id}`); 
            setTasks(data);
        } catch (err) { console.error("Error fetching tasks"); }
    };

    useEffect(() => { fetchTasks(); }, [id]);

    const handleUpdateStatus = async (taskId, newStatus) => {
        try {
            await API.put(`/tasks/update/${taskId}`, { status: newStatus });
            fetchTasks(); 
        } catch (err) { alert("Failed to update status"); }
    };

    const handleDeleteTask = async (taskId) => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await API.delete(`/tasks/${taskId}`);
            fetchTasks();
        } catch (err) { alert("Delete failed"); }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-emerald-100 text-emerald-700';
            case 'Running': return 'bg-blue-100 text-blue-700';
            case 'Failed': return 'bg-red-100 text-red-700';
            case 'Blocked': return 'bg-amber-100 text-amber-700';
            default: return 'bg-slate-100 text-slate-700';
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-6 py-8">
                <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-semibold transition">
                    <ChevronLeft size={20} /> Back to Dashboard
                </button>

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Task Board</h1>
                        <p className="text-slate-500">Project ID: <span className="text-xs font-mono bg-slate-200 px-2 py-1 rounded">{id}</span></p>
                    </div>
                    <button onClick={() => setIsTaskModalOpen(true)} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition">
                        <Plus size={20} /> Add New Task
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {tasks.map((task) => (
                        <div key={task._id} className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm hover:shadow-md transition">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-md border ${task.priority >= 4 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-600'}`}>
                                        PRIORITY {task.priority}
                                    </span>
                                    <h3 className="font-bold text-lg text-slate-800">{task.title}</h3>
                                </div>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-1">{task.description}</p>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                                        <Tag size={14} /> {task.resourceTag || 'General'}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs font-bold text-slate-400">
                                        <Clock size={14} /> {task.estimatedHours} hrs
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <select 
                                    value={task.status} 
                                    onChange={(e) => handleUpdateStatus(task._id, e.target.value)}
                                    className={`text-xs font-black py-2 px-4 rounded-xl border-none outline-none cursor-pointer ${getStatusColor(task.status)}`}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Running">Running</option>
                                    <option value="Completed">Completed</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Blocked">Blocked</option>
                                </select>

                                <button onClick={() => handleDeleteTask(task._id)} className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition">
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {tasks.length === 0 && (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                            <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
                            <p className="text-slate-400 font-medium">No tasks found. Start by adding a new task!</p>
                        </div>
                    )}
                </div>
            </main>

            <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} projectId={id} refreshTasks={fetchTasks} />
        </div>
    );
};

export default ProjectDetails;