import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { Calendar, MapPin, Layers, ChevronRight, X, ArrowUpRight } from 'lucide-react';

interface ProjectShowcaseProps {
  projects: Project[];
}

export default function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="w-full text-white" id="project-showcase-container">
      {/* Immersive Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            id={`project-card-${project.id}`}
            className="group relative h-[480px] rounded-2xl overflow-hidden border border-white/5 bg-[#0a0a0a] cursor-pointer"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => setSelectedProject(project)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            {/* Absolute Ambient Background Shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 transition-colors duration-500 group-hover:bg-gradient-to-t group-hover:from-black group-hover:via-black/25" />
            
            {/* Dark light sweep overlay beam */}
            <div className="absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />

            {/* Glowing active outline border effect on hover */}
            <div className="absolute inset-0 border border-amber-500/0 group-hover:border-amber-500/30 rounded-2xl transition-all duration-500 z-20 pointer-events-none" />

            {/* 3D Slow Zoom-in Luxury Architectural Render */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-105 transition-all duration-1000 transform"
                style={{
                  scale: hoveredIdx === idx ? 1.08 : 1,
                }}
              />
            </div>

            {/* Light Sweep flash animation */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-15 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-40 group-hover:animate-shine pointer-events-none" />

            {/* Top architectural label tag */}
            <div className="absolute top-5 left-5 z-20">
              <span className="text-[10px] font-mono tracking-wider uppercase text-amber-500 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/10">
                {project.category}
              </span>
            </div>

            {/* Bottom Content HUD details */}
            <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end h-1/2">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-amber-500/80 mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{project.location}</span>
              </div>
              
              <h4 className="text-xl font-bold tracking-tight text-white group-hover:text-amber-400 transition-colors duration-300">
                {project.title}
              </h4>
              
              {/* Collapsed short description, smoothly transitions height on hover */}
              <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed opacity-85 group-hover:opacity-100 group-hover:text-gray-200 transition-colors duration-300">
                {project.description}
              </p>

              {/* Action Button Indicator */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber-500 font-medium group-hover:text-white transition-colors">
                <span className="font-mono text-[10px] text-gray-500">YEAR: {project.completionYear}</span>
                <span className="flex items-center gap-1">
                  Blueprint Analysis
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Light Sweep CSS styles added below inside Tailwind or standard block */}

      {/* Dynamic Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="project-detail-modal">
            {/* Backdrop shadow blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/98 backdrop-blur-xl"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="relative w-full max-w-4xl bg-[#0c0c0c] rounded-3xl overflow-hidden border border-amber-500/15 shadow-2xl z-10 flex flex-col md:flex-row h-auto md:h-[600px]"
            >
              {/* Large Image Showcase Half */}
              <div className="relative w-full md:w-1/2 h-[260px] md:h-full bg-black overflow-hidden border-r border-white/5">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
                <div className="absolute bottom-6 left-6">
                  <span className="text-xs font-mono tracking-widest uppercase text-amber-500 bg-black/85 px-3.5 py-2 rounded-lg border border-amber-500/20">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              {/* Information Half */}
              <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between overflow-y-auto h-[340px] md:h-full">
                {/* Close Button Trigger */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 bg-black/50 border border-white/10 text-gray-400 hover:text-white rounded-full hover:bg-amber-500 hover:text-black transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-500 mb-2">
                    <MapPin className="w-4 h-4 animate-bounce" />
                    <span>{selectedProject.location}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    {selectedProject.title}
                  </h3>

                  <div className="h-[2px] w-12 bg-amber-500 my-4" />

                  <p className="text-gray-300 text-sm leading-relaxed mb-6 font-sans">
                    {selectedProject.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="mb-6">
                    <h5 className="text-xs font-mono uppercase text-gray-400 tracking-wider mb-3">Key Technical Highlights</h5>
                    <ul className="space-y-2.5">
                      {selectedProject.highlights.map((hlt, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                          <span>{hlt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sub-Technical specs bar */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 bg-black/20 p-4 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-500/80" />
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-mono">Commissioned</div>
                      <div className="text-xs font-bold text-white">{selectedProject.completionYear}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-500/80" />
                    <div>
                      <div className="text-[10px] text-gray-500 uppercase font-mono">Scope Standard</div>
                      <div className="text-xs font-bold text-white">Luxury Structural</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
