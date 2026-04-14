import { useState } from 'react';
import API from '../api'; 
import { X } from 'lucide-react';

const CreateProjectModal = ({ isOpen, onClose, refreshProjects }) => {
    const [name, setName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        try {
            setIsSubmitting(true);
           
            await API.post('/projects/create', { name });
            setName('');
            onClose();
            refreshProjects(); 
        } catch (err) {
            console.error("Project Create Error:", err.response?.data);
            alert(err.response?.data?.msg || "Error creating project");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800">New Project</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Project Name</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900" // text-slate-900 added for visibility
                        placeholder="e.g. Portfolio Website"
                        required
                        disabled={isSubmitting}
                    />
                    <div className="mt-8 flex gap-3">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="flex-1 py-3 font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`flex-1 py-3 font-semibold text-white rounded-xl shadow-lg transition-all ${isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;