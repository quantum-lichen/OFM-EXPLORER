import React, { useEffect, useRef, useState } from 'react';
import { Particle } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';

const RS = 100; // Schwarzschild radius in pixels (relative)
const CANVAS_SIZE = 600;
const CENTER = CANVAS_SIZE / 2;

// Generate graph data based on OFM equations
const generateGraphData = () => {
  const data = [];
  // From r = 0 to r = 200 (where 100 is Rs)
  for (let r = 1; r <= 200; r += 2) {
    if (Math.abs(r - RS) < 2) continue; // Skip singularity divergence for graph cleanliness

    const F_r = (r - RS) / 50; // Simple linear approximation normalized
    // dS/dr = k/F(r) -> S ~ ln|F(r)|. But prompt says entropy *diverges* as F->0.
    // Let's model Entropy intensity roughly as 1 / |F(r)|
    const Entropy = Math.min(10, 1 / Math.abs(F_r + 0.001)); 

    data.push({
      r: r,
      Fr: F_r,
      Entropy: Entropy,
    });
  }
  return data;
};

export const FlipSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const requestRef = useRef<number>(0);
  const graphData = generateGraphData();

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      r: Math.random() * (CENTER - RS) + RS + 50, // Start outside
      theta: Math.random() * Math.PI * 2,
      v: 0.5 + Math.random(),
      state: 'normal'
    }));
    setParticles(initialParticles);
  }, []);

  const animate = () => {
    setParticles(prevParticles => {
      return prevParticles.map(p => {
        // Attractor dynamics: r_dot = - alpha / (r - rs)
        // To avoid infinite velocity in sim, we cap it.
        const distToRs = p.r - RS;
        let newR = p.r;
        let newState = p.state;

        if (p.state === 'normal') {
            // Attraction towards Rs
            const attraction = 20 / (Math.max(1, Math.abs(distToRs)));
            const velocity = Math.min(p.v + attraction * 0.1, 5); // Cap velocity
            newR -= velocity;

            if (newR <= RS) {
               // The FLIP happens here
               newR = RS - 1; // Push to other side
               newState = 'flipped';
            }
        } else if (p.state === 'flipped') {
            // In flipped reality, physics might be inverted or they move away/towards singularity differently.
            // Let's assume they continue inward but are now "flipped" particles
            newR -= 0.5; 
            if (newR < 0) {
                // Respawn outside
                newR = CENTER;
                newState = 'normal';
            }
        }

        return {
          ...p,
          r: newR,
          state: newState
        };
      });
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Draw Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw Void/Event Horizon
    ctx.beginPath();
    ctx.arc(CENTER, CENTER, RS, 0, Math.PI * 2);
    ctx.strokeStyle = '#64748b'; // Slate 500
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Label for Rs
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px JetBrains Mono';
    ctx.fillText('Rs (Flip Boundary)', CENTER - 60, CENTER - RS - 10);

    // Draw Particles
    particles.forEach(p => {
      const x = CENTER + p.r * Math.cos(p.theta);
      const y = CENTER + p.r * Math.sin(p.theta);

      ctx.beginPath();
      ctx.arc(x, y, p.state === 'normal' ? 3 : 2, 0, Math.PI * 2);
      
      if (p.state === 'normal') {
        ctx.fillStyle = '#0ea5e9'; // Cyan
        // Add trail/glow based on proximity
        const proximity = Math.max(0, 1 - (p.r - RS) / 100);
        ctx.shadowBlur = proximity * 10;
        ctx.shadowColor = '#0ea5e9';
      } else {
        ctx.fillStyle = '#f43f5e'; // Rose (Flipped)
        ctx.shadowBlur = 0;
      }
      
      ctx.fill();
      ctx.shadowBlur = 0; // Reset
    });

  }, [particles]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Visualization Panel */}
        <div className="flex flex-col items-center bg-slate-900/50 border border-slate-800 rounded-xl p-4 shadow-2xl">
          <h2 className="text-xl font-bold text-slate-200 mb-4 font-mono">
            Topological Particle Projection
          </h2>
          <div className="relative">
             <canvas 
              ref={canvasRef} 
              width={CANVAS_SIZE} 
              height={CANVAS_SIZE} 
              className="w-full max-w-[400px] h-auto rounded-full bg-slate-950 border border-slate-800"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-slate-500 font-mono pointer-events-none">
              VOID
            </div>
          </div>
          <div className="flex gap-4 mt-4 text-sm font-mono">
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-500"></span>
                <span className="text-slate-300">Ω = +1 (Normal)</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="text-slate-300">Ω = -1 (Flipped)</span>
             </div>
          </div>
        </div>

        {/* Graph Panel */}
        <div className="flex flex-col bg-slate-900/50 border border-slate-800 rounded-xl p-6 shadow-xl h-full">
           <h2 className="text-xl font-bold text-slate-200 mb-6 font-mono">
            Metrics: Entropy & Flip Function
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="r" 
                  stroke="#64748b" 
                  label={{ value: 'Radial Distance (r)', position: 'insideBottomRight', offset: -10, fill: '#64748b' }} 
                  domain={[0, 200]}
                />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }}
                  itemStyle={{ fontFamily: 'monospace' }}
                />
                <ReferenceLine x={100} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: "Rs", fill: "#94a3b8", position: 'insideTopLeft' }} />
                
                <Line 
                  type="monotone" 
                  dataKey="Fr" 
                  stroke="#0ea5e9" 
                  strokeWidth={2} 
                  dot={false}
                  name="F(r) Orientation" 
                />
                <Line 
                  type="monotone" 
                  dataKey="Entropy" 
                  stroke="#f43f5e" 
                  strokeWidth={2} 
                  dot={false} 
                  name="S(r) Entropy"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 space-y-2 text-sm text-slate-400 font-mono">
            <p>
              <span className="text-cyan-500 font-bold">F(r):</span> The scalar flip function. Crosses zero at Rs. Positive means normal space, negative means flipped.
            </p>
            <p>
              <span className="text-rose-500 font-bold">S(r):</span> Entropy. Diverges as F(r) approaches zero. <br/>
              <code>dS/dr = k / F(r)</code>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
