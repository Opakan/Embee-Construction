import { useEffect, useRef, useState } from 'react';

interface CinematicBackgroundProps {
  intensity?: number;
  rainEnabled?: boolean;
  ambientColor?: string; // e.g. 'rgba(217, 119, 6, 0.08)' warm amber
}

export default function CinematicBackground({
  intensity = 1,
  rainEnabled = true,
  ambientColor = 'rgba(217, 160, 91, 0.05)' // subtle elegant gold shadow
}: CinematicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Handle active audio rain mood if desired (pure visual focus is standard)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle Classes
    class RainDrop {
      x: number;
      y: number;
      length: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.length = 15 + Math.random() * 20;
        this.speed = 12 + Math.random() * 8;
        this.opacity = 0.15 + Math.random() * 0.25;
      }

      update() {
        this.y += this.speed;
        this.x += 1; // slight wind angle
        if (this.y > height) {
          this.y = Math.random() * -50;
          this.x = Math.random() * width;
          this.speed = 12 + Math.random() * 8;
          // Trigger a ripple when hitting the bottom reflective surface
          ripples.push(new RainRipple(this.x, height - Math.random() * 120));
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.strokeStyle = `rgba(180, 200, 220, ${this.opacity * intensity})`;
        c.lineWidth = 1;
        c.moveTo(this.x, this.y);
        c.lineTo(this.x + 0.5, this.y + this.length);
        c.stroke();
      }
    }

    class RainRipple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      opacity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = 1;
        this.maxRadius = 15 + Math.random() * 25;
        this.speed = 0.4 + Math.random() * 0.4;
        this.opacity = 0.3;
      }

      update() {
        this.radius += this.speed;
        this.opacity -= 0.006;
      }

      draw(c: CanvasRenderingContext2D) {
        if (this.opacity <= 0) return;
        c.beginPath();
        // Soft golden/silver reflections from the warm luxury lights
        c.strokeStyle = `rgba(217, 160, 91, ${this.opacity * intensity})`;
        c.lineWidth = 0.5;
        // Make it an ellipse for horizontal wet reflection perspective
        c.ellipse(this.x, this.y, this.radius * 2.5, this.radius * 0.4, 0, 0, Math.PI * 2);
        c.stroke();
      }
    }

    class DustParticle {
      x: number;
      y: number;
      radius: number;
      vX: number;
      vY: number;
      opacity: number;
      pulseSpeed: number;
      pulseVal: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = 0.6 + Math.random() * 1.5;
        this.vX = (Math.random() - 0.5) * 0.3;
        this.vY = -0.1 - Math.random() * 0.4; // slowly drift upwards
        this.opacity = 0.1 + Math.random() * 0.4;
        this.pulseSpeed = 0.01 + Math.random() * 0.02;
        this.pulseVal = Math.random();
      }

      update() {
        this.x += this.vX;
        this.y += this.vY;
        this.pulseVal += this.pulseSpeed;

        // gentle boundary looping
        if (this.y < 0) this.y = height;
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
      }

      draw(c: CanvasRenderingContext2D) {
        const pulsingOpacity = this.opacity * (0.6 + 0.4 * Math.sin(this.pulseVal));
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // luxury warm elegant gold dust
        c.fillStyle = `rgba(217, 160, 91, ${pulsingOpacity * intensity})`;
        c.fill();
        
        // Ambient soft golden glow outline on close hover
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          c.beginPath();
          c.arc(this.x, this.y, this.radius * 3, 0, Math.PI * 2);
          c.fillStyle = `rgba(217, 160, 91, ${(1 - dist / 180) * 0.15 * intensity})`;
          c.fill();
        }
      }
    }

    class ArchitecturalBeam {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
      pulseVal: number;
      pulseSpeed: number;

      constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.opacity = 0.03 + Math.random() * 0.05;
        this.pulseVal = Math.random() * Math.PI;
        this.pulseSpeed = 0.005 + Math.random() * 0.008;
      }

      update() {
        this.pulseVal += this.pulseSpeed;
      }

      draw(c: CanvasRenderingContext2D) {
        const dOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulseVal));
        c.beginPath();
        c.strokeStyle = `rgba(192, 138, 74, ${dOpacity * intensity})`;
        c.lineWidth = 0.8;
        c.moveTo(this.x1, this.y1);
        c.lineTo(this.x2, this.y2);
        c.stroke();
      }
    }

    // Initialize pools
    const raindrops: RainDrop[] = [];
    const ripples: RainRipple[] = [];
    const dust: DustParticle[] = [];
    const beams: ArchitecturalBeam[] = [];

    const initScene = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Populate raindrops
      raindrops.length = 0;
      if (rainEnabled) {
        const count = Math.min(65, Math.floor(width / 20));
        for (let i = 0; i < count; i++) {
          raindrops.push(new RainDrop());
        }
      }

      // Populate dust
      dust.length = 0;
      const dustCount = Math.min(80, Math.floor(width / 15));
      for (let i = 0; i < dustCount; i++) {
        dust.push(new DustParticle());
      }

      // Populate architectural grid wireframe lines
      beams.length = 0;
      // Draw standard blueprint style line arrays
      const segmentCount = 12;
      for (let i = 0; i <= segmentCount; i++) {
        const pct = i / segmentCount;
        // Diagonal perspective projection lines (simulating blueprint vectors)
        beams.push(new ArchitecturalBeam(0, height * pct, width, height * (pct - 0.2)));
        beams.push(new ArchitecturalBeam(width * pct, 0, width * (pct - 0.4), height));
      }
    };

    initScene();

    // Resize handling
    const resizeObserver = new ResizeObserver((entries) => {
      initScene();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw volumetric background lighting gradients (Atmosphere)
      // Top corner luxury amber/gold glow
      const topAmberGradient = ctx.createRadialGradient(width * 0.8, 50, 0, width * 0.8, 50, width * 0.7);
      topAmberGradient.addColorStop(0, 'rgba(217, 160, 91, 0.09)'); // glowing elegant gold spotlight
      topAmberGradient.addColorStop(0.5, 'rgba(217, 160, 91, 0.02)');
      topAmberGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = topAmberGradient;
      ctx.fillRect(0, 0, width, height);

      // Left corner slow warm elegant gold spotlight
      const leftAmberGradient = ctx.createRadialGradient(width * 0.15, height * 0.4, 0, width * 0.15, height * 0.4, width * 0.5);
      leftAmberGradient.addColorStop(0, 'rgba(217, 160, 91, 0.04)');
      leftAmberGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = leftAmberGradient;
      ctx.fillRect(0, 0, width, height);

      // Bottom wet mirror surface reflection overlay
      const reflectingOverlay = ctx.createLinearGradient(0, height * 0.5, 0, height);
      reflectingOverlay.addColorStop(0, 'rgba(10, 10, 10, 0)');
      reflectingOverlay.addColorStop(1, 'rgba(12, 12, 12, 0.6)');
      ctx.fillStyle = reflectingOverlay;
      ctx.fillRect(0, height * 0.5, width, height * 0.5);

      // 2. Draw blueprint lines
      beams.forEach((beam) => {
        beam.update();
        beam.draw(ctx);
      });

      // 3. Draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.update();
        if (rip.opacity <= 0) {
          ripples.splice(i, 1);
        } else {
          rip.draw(ctx);
        }
      }

      // 4. Draw dust
      dust.forEach((d) => {
        d.update();
        d.draw(ctx);
      });

      // 5. Draw raindrops
      raindrops.forEach((r) => {
        r.update();
        r.draw(ctx);
      });

      // 6. Draw dynamic spotlight tracking mouse
      const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
      mouseGrad.addColorStop(0, 'rgba(217, 160, 91, 0.04)');
      mouseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = mouseGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity, rainEnabled, ambientColor, mouse.x, mouse.y]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 overflow-hidden"
      id="cinematic-canvas-wrapper"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-85 transition-opacity duration-1000"
        id="cinematic-effects-canvas"
      />
    </div>
  );
}
