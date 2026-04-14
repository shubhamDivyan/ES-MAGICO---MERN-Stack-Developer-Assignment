import { useState } from 'react';
import API from '../api'; // Path check kar lena agar api/index.js hai toh '../api' chalega
import { X } from 'lucide-react';

const CreateProjectModal = ({ isOpen, onClose, refreshProjects }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/projects/create', { name });
            setName('');
            onClose();
            refreshProjects();
        } catch (err) {
            alert("Error creating project");
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
                        className="w-full border border-slate-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                        placeholder="e.g. Portfolio Website"
                        required
                    />
                    <div className="mt-8 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-3 font-semibold text-slate-600 bg-slate-100 rounded-xl">Cancel</button>
                        <button type="submit" className="flex-1 py-3 font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;