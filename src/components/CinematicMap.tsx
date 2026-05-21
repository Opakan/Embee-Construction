import { useState, useEffect, useRef } from 'react';
import { MapPin, Navigation, Map, Globe, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CinematicMap() {
  const [activeTab, setActiveTab] = useState<'3d' | 'interactive'>('3d');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render a dark-themed cinematic architectural layout on the 3D grid
  useEffect(() => {
    if (activeTab !== '3d') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = 420);

    let pulseRadius = 0;
    let angle = 0;

    const draw3DGrid = () => {
      ctx.fillStyle = '#121212';
      ctx.fillRect(0, 0, width, height);

      // 1. Draw architectural contour lines (Isometric landscape)
      ctx.strokeStyle = '#222222';
      ctx.lineWidth = 0.5;
      
      const gridSpacing = 40;
      const isoOffset = -50;

      // Draw isometric grid lines
      for (let x = -width; x < width * 2; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + height, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, height);
        ctx.lineTo(x + height, 0);
        ctx.stroke();
      }

      // Draw glowing radial topography wave
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.08)'; // golden outline
      ctx.lineWidth = 1;
      for (let r = 80; r < 350; r += 60) {
        ctx.beginPath();
        ctx.ellipse(width / 2, height / 2, r, r * 0.45, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 2. Draw mock city sector shapes (architectural structural plans)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.15)';
      ctx.lineWidth = 0.8;

      // Draw some blocks
      const blocks = [
        { x: width * 0.2, y: height * 0.3, w: 90, h: 45 },
        { x: width * 0.65, y: height * 0.2, w: 110, h: 60 },
        { x: width * 0.1, y: height * 0.65, w: 120, h: 50 },
        { x: width * 0.7, y: height * 0.65, w: 100, h: 50 }
      ];

      blocks.forEach(b => {
        ctx.beginPath();
        ctx.ellipse(b.x + b.w/2, b.y + b.h/2, b.w * 0.6, b.h * 0.4, -0.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });

      // 3. Main Center Marker radar pulse
      pulseRadius += 0.8;
      if (pulseRadius > 70) pulseRadius = 0;
      
      ctx.beginPath();
      ctx.strokeStyle = `rgba(245, 158, 11, ${1 - pulseRadius / 70})`;
      ctx.lineWidth = 2;
      ctx.ellipse(width / 2, height / 2 + 10, pulseRadius * 2, pulseRadius * 0.8, -0.1, 0, Math.PI * 2);
      ctx.stroke();

      // Outer second pulse
      let secondPulse = pulseRadius + 35;
      if (secondPulse > 70) secondPulse -= 70;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(245, 158, 11, ${(1 - secondPulse / 70) * 0.6})`;
      ctx.lineWidth = 1.3;
      ctx.ellipse(width / 2, height / 2 + 10, secondPulse * 2, secondPulse * 0.8, -0.1, 0, Math.PI * 2);
      ctx.stroke();

      // Connecting coordinate targeting lines
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.lineWidth = 0.4;
      ctx.beginPath();
      ctx.moveTo(width / 4, height / 2 + 10);
      ctx.lineTo(width * 0.75, height / 2 + 10);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(width / 2, height / 5);
      ctx.lineTo(width / 2, height * 0.85);
      ctx.stroke();

      // 4. Draw marker Pin structure in 3D perspective
      angle += 0.015;
      const bobbingY = Math.sin(angle) * 8;

      const pinX = width / 2;
      const pinY = height / 2 + bobbingY;

      // Glowing marker aura on ground
      const groundGlow = ctx.createRadialGradient(width/2, height/2 + 12, 0, width/2, height/2 + 12, 45);
      groundGlow.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
      groundGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = groundGlow;
      ctx.fillRect(width/2 - 50, height/2 - 20, 100, 60);

      // Floating gold pin head outline
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 15;
      
      // Draw pin vector
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(pinX, pinY - 14, 10, 0, Math.PI * 2);
      ctx.fill();

      // Sharp pin pointer baseline
      ctx.beginPath();
      ctx.moveTo(pinX - 8, pinY - 10);
      ctx.lineTo(pinX, height / 2 + 10); // goes to anchor point
      ctx.lineTo(pinX + 8, pinY - 10);
      ctx.closePath();
      ctx.fill();

      // Inner glass core of pin
      ctx.fillStyle = '#0a0a0a';
      ctx.beginPath();
      ctx.arc(pinX, pinY - 14, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0; // reset

      // Draw compass element
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(width - 50, 50, 25, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.fillStyle = '#ffffff';
      ctx.font = '9px monospace';
      ctx.fillText('N', width - 53, 35);
      ctx.fillText('S', width - 53, 73);
      ctx.fillText('E', width - 33, 53);
      ctx.fillText('W', width - 73, 53);

      // Dial pointer rotating slowly
      ctx.beginPath();
      ctx.strokeStyle = '#f59e0b';
      ctx.moveTo(width - 50, 50);
      const dialAngle = angle * 0.2;
      ctx.lineTo(width - 50 + Math.cos(dialAngle) * 18, 50 + Math.sin(dialAngle) * 18);
      ctx.stroke();

      animId = requestAnimationFrame(draw3DGrid);
    };

    draw3DGrid();

    // Handle resize
    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 600;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeTab]);

  return (
    <div className="w-full bg-[#121212] rounded-2xl overflow-hidden border border-amber-500/10 shadow-2xl relative" id="cinematic-map-root">
      
      {/* Top Header Map Selector */}
      <div className="flex items-center justify-between p-4 bg-black/40 border-b border-amber-500/10 backdrop-blur-sm z-10 relative">
        <div className="flex items-center gap-2">
          <div className="p-1 px-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded text-xs font-mono">
            Oyo State, NG
          </div>
          <span className="text-sm font-medium text-white tracking-wide">Felele Challenge Sector</span>
        </div>
        <div className="flex bg-black/50 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setActiveTab('3d')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
              activeTab === '3d'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Architectural 3D
          </button>
          
          <button
            onClick={() => setActiveTab('interactive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ${
              activeTab === 'interactive'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            Satellite Frame
          </button>
        </div>
      </div>

      {/* Main Map Content Frame */}
      <div className="relative h-[420px] w-full bg-[#111]">
        <AnimatePresence mode="wait">
          {activeTab === '3d' ? (
            <motion.div
              key="3d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full relative"
            >
              <canvas ref={canvasRef} className="w-full h-full block" />
              
              {/* Overlay Holographic Info Panel */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/75 backdrop-blur-md rounded-xl p-4 border border-amber-500/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20 mt-0.5">
                    <MapPin className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h5 className="text-white text-sm font-bold tracking-tight">Embee Head Office</h5>
                    <p className="text-gray-400 text-xs mt-0.5">13 Ganiyu Bello Street, Felele Challenge, Ibadan</p>
                    <div className="flex gap-2.5 mt-2">
                      <span className="text-[10px] text-amber-500/80 font-mono bg-amber-500/5 px-1.5 py-0.5 border border-amber-500/10 rounded">
                        COORD: 7.33° N, 3.88° E
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono bg-white/5 px-1.5 py-0.5 rounded">
                        SECTOR: CHALLENGE CORE
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=13+Ganiyu+Bello+Street,+Felele+Challenge,+Ibadan"
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs rounded-lg transition-all shadow-lg hover:shadow-amber-500/10 shrink-0"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  Launch Route
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="interactive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              {/* Embedded Luxury Google Maps widget frame */}
              <iframe
                title="Embee Construction Nig Ltd Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.1706173595563!2d3.8814769!3d7.3346944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10398dd0ef4b2dfd%3A0xe54df44c0cb87eb7!2sGaniyu%20Bello%20St%2C%20Challenge%2C%20Ibadan%2C%20Nigeria!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(100%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-amber-500 text-black font-semibold text-[10px] px-2 py-0.5 rounded tracking-wider uppercase font-mono shadow">
                Live Frame Loaded
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Blueprint footer bar */}
      <div className="bg-black/80 px-4 py-2.5 border-t border-amber-500/10 flex items-center justify-between text-[10px] text-gray-500 font-mono">
        <span className="flex items-center gap-1.5 text-amber-500/65">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
          SYS_GPS_FEED_ONLINE_OK
        </span>
        <span>RADIAL_RANGE: 1.5KM CHALLENGE_GRID</span>
      </div>
    </div>
  );
}
