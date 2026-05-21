import { motion } from 'motion/react';

interface ServiceAnimatedIconProps {
  type: 'architectural' | 'structural' | 'construction' | 'consultation';
  isHovered: boolean;
}

export default function ServiceAnimatedIcon({ type, isHovered }: ServiceAnimatedIconProps) {
  // SVG Variant configurations for drawing path animations
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0.1 },
    visible: { 
      pathLength: [0, 1], 
      opacity: [0.2, 0.9],
      transition: { 
        duration: 2, 
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse" as const
      } 
    },
    hovered: {
      pathLength: 1,
      opacity: 1,
      stroke: "#f59e0b", // gorgeous warm amber
      transition: { duration: 0.6 }
    }
  };

  const nodeVariants = {
    idle: { scale: 1, opacity: 0.4 },
    pulsing: {
      scale: [1, 1.4, 1],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const liftVariants = {
    down: { y: 15, opacity: 0.4 },
    up: {
      y: [15, -15, 15],
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  switch (type) {
    case 'architectural':
      // BLUEPRINT WIREFRAME HOLOGRAM
      return (
        <div className="relative w-40 h-40 flex items-center justify-center overflow-hidden bg-black/35 rounded-xl border border-amber-500/10 backdrop-blur-sm">
          {/* Blueprint Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />
          
          <svg className="w-28 h-28 text-amber-500/70" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            {/* Base Blueprint ground line */}
            <line x1="10" y1="85" x2="90" y2="85" strokeWidth="1" strokeDasharray="3,3" />
            
            {/* Wireframe Villa structure */}
            <motion.polygon 
              points="15,85 15,50 50,25 85,50 85,85" 
              strokeWidth="1.5"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            
            {/* Center column & window grid */}
            <motion.line 
              x1="50" y1="25" x2="50" y2="85" 
              strokeWidth="1.2"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            <motion.rect 
              x="25" y="58" width="12" height="12" 
              strokeWidth="1"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            <motion.rect 
              x="63" y="58" width="12" height="12" 
              strokeWidth="1.2"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            <motion.polygon 
              points="40,85 40,65 60,65 60,85" 
              strokeWidth="1.2"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />

            {/* Glowing active measuring rules */}
            <motion.circle 
              cx="50" cy="25" r="3" 
              fill="#f59e0b"
              variants={nodeVariants}
              animate="pulsing"
            />
            <motion.circle 
              cx="15" cy="50" r="2.5" 
              fill="#f59e0b"
              variants={nodeVariants}
              animate="pulsing"
            />
            <motion.circle 
              cx="85" cy="50" r="2.5" 
              fill="#f59e0b"
              variants={nodeVariants}
              animate="pulsing"
            />
          </svg>
          
          {/* Subtle hologram glow projection beam */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-1/2 bg-gradient-to-t from-amber-500/10 to-transparent pointer-events-none blur-sm rounded-full" />
        </div>
      );

    case 'structural':
      // STEEL STRUCTURE ASSEMBLED DYNAMICALLY
      return (
        <div className="relative w-40 h-40 flex items-center justify-center overflow-hidden bg-black/35 rounded-xl border border-amber-500/10 backdrop-blur-sm">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.03)_0%,transparent_70%)]" />
          
          <svg className="w-28 h-28 text-white/40" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            {/* Heavy foundation slab */}
            <rect x="15" y="80" width="70" height="8" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1" />
            
            {/* Core structural Columns */}
            <motion.line 
              x1="30" y1="80" x2="30" y2="20" 
              stroke="#f59e0b" 
              strokeWidth="2.5"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            <motion.line 
              x1="70" y1="80" x2="70" y2="20" 
              stroke="#f59e0b" 
              strokeWidth="2.5"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            
            {/* Horizontal Beams */}
            <motion.line 
              x1="30" y1="40" x2="70" y2="40" 
              stroke="#f59e0b" 
              strokeWidth="2" 
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            <motion.line 
              x1="30" y1="20" x2="70" y2="20" 
              stroke="#f59e0b" 
              strokeWidth="2" 
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            <motion.line 
              x1="30" y1="60" x2="70" y2="60" 
              stroke="#f59e0b" 
              strokeWidth="2" 
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            
            {/* Crossed steel brace members */}
            <motion.line 
              x1="30" y1="80" x2="70" y2="60" 
              stroke="white" 
              strokeWidth="1" 
              strokeDasharray="2,2"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            <motion.line 
              x1="70" y1="80" x2="30" y2="60" 
              stroke="white" 
              strokeWidth="1" 
              strokeDasharray="2,2"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            <motion.line 
              x1="30" y1="60" x2="70" y2="40" 
              stroke="white" 
              strokeWidth="1"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            <motion.line 
              x1="70" y1="60" x2="30" y2="40" 
              stroke="white" 
              strokeWidth="1"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            <motion.line 
              x1="30" y1="40" x2="70" y2="20" 
              stroke="white" 
              strokeWidth="1" 
              strokeDasharray="2,2"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
            <motion.line 
              x1="70" y1="40" x2="30" y2="20" 
              stroke="white" 
              strokeWidth="1" 
              strokeDasharray="2,2"
              variants={pathVariants}
              initial="hidden"
              animate={isHovered ? "hovered" : "visible"}
            />
          </svg>
        </div>
      );

    case 'construction':
      // LUXURY BUILDING STRUCTURES RISING (CRANE ACTION)
      return (
        <div className="relative w-40 h-40 flex items-center justify-center overflow-hidden bg-black/35 rounded-xl border border-amber-500/10 backdrop-blur-sm">
          <svg className="w-28 h-28 text-amber-500/60" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            {/* Ground */}
            <line x1="10" y1="85" x2="90" y2="85" stroke="currentColor" strokeWidth="1.5" />
            
            {/* Base block foundations */}
            <rect x="25" y="65" width="40" height="20" stroke="currentColor" strokeWidth="1.2" fill="rgba(245,158,11,0.05)" />
            <rect x="30" y="45" width="30" height="20" stroke="currentColor" strokeWidth="1" />
            
            {/* Construction Crane Tower */}
            <g className="text-amber-500">
              <line x1="75" y1="85" x2="75" y2="25" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
              <line x1="75" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="1.5" />
              <line x1="75" y1="30" x2="85" y2="30" stroke="currentColor" strokeWidth="1" />
              
              {/* Crane Tension cables */}
              <line x1="75" y1="25" x2="55" y2="30" stroke="currentColor" strokeWidth="0.8" />
              <line x1="75" y1="25" x2="82" y2="30" stroke="currentColor" strokeWidth="0.8" />
              
              {/* Lifting cable hoisting a component */}
              <motion.g variants={liftVariants} animate={isHovered ? "up" : "down"}>
                <line x1="50" y1="30" x2="50" y2="52" stroke="#ffffff" strokeWidth="0.8" />
                <rect x="42" y="52" width="16" height="8" fill="#f59e0b" rx="1" />
              </motion.g>
            </g>
          </svg>
        </div>
      );

    case 'consultation':
      // FUTURISTIC ARCHITECTURAL SCHEMATIC NODES & PLANNING
      return (
        <div className="relative w-40 h-40 flex items-center justify-center overflow-hidden bg-black/35 rounded-xl border border-amber-500/10 backdrop-blur-sm">
          <svg className="w-28 h-28 text-white/50" viewBox="0 0 100 100" fill="none" stroke="currentColor">
            {/* Circle of consultation / design brainstorm cycle */}
            <motion.circle 
              cx="50" cy="50" r="32" 
              stroke="#f59e0b" 
              strokeWidth="1" 
              strokeDasharray="4,8"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
            />
            
            {/* Planning connection cluster nodes */}
            <line x1="50" y1="18" x2="22" y2="40" stroke="currentColor" strokeWidth="0.8" />
            <line x1="22" y1="40" x2="32" y2="72" stroke="currentColor" strokeWidth="0.8" />
            <line x1="32" y1="72" x2="68" y2="72" stroke="currentColor" strokeWidth="0.8" />
            <line x1="68" y1="72" x2="78" y2="40" stroke="currentColor" strokeWidth="0.8" />
            <line x1="78" y1="40" x2="50" y2="18" stroke="currentColor" strokeWidth="0.8" />
            
            {/* Center core target */}
            <line x1="50" y1="18" x2="50" y2="82" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="1,1" />
            <line x1="18" y1="50" x2="82" y2="50" stroke="#f59e0b" strokeWidth="0.5" strokeDasharray="1,1" />
            
            {/* Glow dots on vertex parameters */}
            <circle cx="50" cy="18" r="3" fill="#f59e0b" />
            <circle cx="22" cy="40" r="3" fill="#ffffff" />
            <circle cx="32" cy="72" r="3" fill="#ffffff" />
            <circle cx="68" cy="72" r="3" fill="#ffffff" />
            <circle cx="78" cy="40" r="3" fill="#f59e0b" />
            
            {/* Interactive brainstorming magnifying lens or compass dial */}
            <motion.g
              animate={{ 
                x: [0, 8, -5, 0],
                y: [0, -5, 4, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="50" cy="50" r="10" stroke="#f59e0b" strokeWidth="1.5" fill="rgba(245,158,11,0.15)" />
              <line x1="57" y1="57" x2="66" y2="66" stroke="#f59e0b" strokeWidth="1.5" />
            </motion.g>
          </svg>
        </div>
      );

    default:
      return null;
  }
}
