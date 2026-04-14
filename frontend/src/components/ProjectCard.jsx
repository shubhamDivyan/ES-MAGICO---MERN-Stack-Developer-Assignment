import { Folder, Users, Calendar, ArrowRight } from 'lucide-react';

const ProjectCard = ({ project, onClick }) => {
   
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div 
            onClick={onClick}
            className="group bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer relative overflow-hidden"
        >
            {/* Background Decor (Subtle Gradient) */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />

            <div className="relative z-10">
                {/* Icon & Category */}
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-100">
                        <Folder size={24} />
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                        <Calendar size={14} />
                        {formatDate(project.createdAt || Date.now())}
                    </div>
                </div>

                {/* Project Info */}
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {project.name}
                </h3>
                
                <p className="text-slate-500 text-sm mb-6 line-clamp-2">
                    Manage tasks, track progress and collaborate with your team members in real-time.
                </p>

                {/* Footer Info */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                           
                            {[1, 2].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                    U{i}
                                </div>
                            ))}
                        </div>
                        <span className="text-xs font-medium text-slate-500">
                            {project.members?.length || 1} Members
                        </span>
                    </div>

                    <div className="text-blue-600 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        <ArrowRight size={20} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;