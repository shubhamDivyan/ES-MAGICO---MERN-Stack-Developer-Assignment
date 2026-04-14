import { useState } from 'react';
import API from '../api';
import { X, CheckCircle } from 'lucide-react';

const TaskModal = ({ isOpen, onClose, projectId, refreshTasks }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 3, 
        estimatedHours: 0,
        status: 'Pending',
        resourceTag: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
           
            await API.post(`/tasks/create/${projectId}`, formData);
            onClose();
            refreshTasks(); 
        } catch (err) {
            alert("Failed to create task");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
                        <CheckCircle className="text-blue-600" /> New Task
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition"><X /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Task Title</label>
                        <input type="text" className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
                        placeholder="e.g. Setup Auth API" onChange={(e) => setFormData({...formData, title: e.target.value})} required />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                        <textarea className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" 
                        placeholder="Task details..." onChange={(e) => setFormData({...formData, description: e.target.value})} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Priority (1-5)</label>
                            <input type="number" min="1" max="5" className="w-full border border-slate-200 p-3 rounded-xl" 
                            value={formData.priority} onChange={(e) => setFormData({...formData, priority: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Est. Hours</label>
                            <input type="number" className="w-full border border-slate-200 p-3 rounded-xl" 
                            onChange={(e) => setFormData({...formData, estimatedHours: e.target.value})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Status</label>
                            <select className="w-full border border-slate-200 p-3 rounded-xl bg-white" 
                            onChange={(e) => setFormData({...formData, status: e.target.value})}>
                                <option value="Pending">Pending</option>
                                <option value="Running">Running</option>
                                <option value="Completed">Completed</option>
                                <option value="Failed">Failed</option>
                                <option value="Blocked">Blocked</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Resource Tag</label>
                            <input type="text" className="w-full border border-slate-200 p-3 rounded-xl text-sm" 
                            placeholder="e.g. Backend, UI" onChange={(e) => setFormData({...formData, resourceTag: e.target.value})} />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 transition-all active:scale-95">
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;