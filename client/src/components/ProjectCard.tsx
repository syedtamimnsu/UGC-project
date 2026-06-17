import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { Project } from '../types'

const ProjectCard = ({ gen, setGenerations, forCommunity = false }: {
    gen: Project,
    setGenerations: React.Dispatch<React.SetStateAction<Project[]>>,
    forCommunity?: boolean
}) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <div className="mb-4 break-inside-avoid">
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition group">

                {/* Preview - parent needs relative + height for absolute img to work */}
                <div className={`${gen?.aspectRatio === '9:16' ? 'aspect-9/16' : 'aspect-video'} relative overflow-hidden`}>
                    {gen.generatedImage && (
                        <img
                            src={gen.generatedImage}
                            alt={gen.productName}
                            className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${gen.generatedVideo ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
                        />
                    )}
                </div>

                {/* Details */}
                <div className="p-3">
                    <p className="text-sm font-medium text-white truncate">{gen.productName}</p>
                </div>

            </div>
        </div>
    )
}

export default ProjectCard