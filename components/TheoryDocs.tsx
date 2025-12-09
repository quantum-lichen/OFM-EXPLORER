import React from 'react';

export const TheoryDocs: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 text-slate-300">
      
      {/* Header */}
      <div className="border-b border-cyan-900/50 pb-6">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Ouellet Flip Model (OFM)</h1>
        <p className="text-xl text-cyan-400 font-mono">Le Flip Entropique à la Singularité</p>
      </div>

      {/* Intro */}
      <section className="bg-slate-900/40 p-6 rounded-lg border border-slate-800">
        <h2 className="text-2xl font-bold text-white mb-4">1. Abstract</h2>
        <p className="leading-relaxed">
          Le OFM propose que la surface d’un trou noir ne soit pas une frontière physique d'absorption, 
          mais un point de changement d’orientation topologique du manifold espace-temps. 
          À cette frontière, définie par la nullité d’une fonction scalaire <code className="text-cyan-400">F(r)</code>, 
          la signature métrique devient indéfinie, l’entropie diverge, et toute projection perceptuelle devient impossible.
        </p>
      </section>

      {/* Grid for Axioms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-5 rounded-lg border-t-2 border-cyan-500 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-2">Axiome 1</h3>
          <h4 className="text-sm font-mono text-cyan-500 mb-2">Manifold Orienté</h4>
          <p className="text-sm text-slate-400">
            L’univers observable existe sur un manifold orienté <code className="bg-slate-800 px-1 rounded">M</code>.
            L'orientation est une propriété fondamentale pour la perception.
          </p>
        </div>
        <div className="bg-slate-900 p-5 rounded-lg border-t-2 border-rose-500 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-2">Axiome 2</h3>
          <h4 className="text-sm font-mono text-rose-500 mb-2">Le Flip (Zéro Topologique)</h4>
          <p className="text-sm text-slate-400">
            Il existe une surface où l’orientation devient indéfinie: <code className="bg-slate-800 px-1 rounded">F(r_s) = 0</code>.
            C'est le "Ouellet Flip Boundary".
          </p>
        </div>
        <div className="bg-slate-900 p-5 rounded-lg border-t-2 border-violet-500 shadow-lg">
          <h3 className="text-lg font-bold text-white mb-2">Axiome 3</h3>
          <h4 className="text-sm font-mono text-violet-500 mb-2">Inobservabilité</h4>
          <p className="text-sm text-slate-400">
            Une région sans orientation définie ne peut être projetée cognitivement.
            <br/>
            <code className="bg-slate-800 px-1 rounded text-xs mt-2 block">Π(M | F(r)=0) = ∅</code>
          </p>
        </div>
      </div>

      {/* Mathematics Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-l-4 border-cyan-500 pl-4">Modèle Mathématique</h2>
        
        <div className="space-y-4">
          <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-sm overflow-x-auto">
             <p className="text-slate-500 mb-1">// Signature de la métrique selon F(r)</p>
             <p>signature(g) = (-,+,+,+)  si F(r) &gt; 0 <span className="text-cyan-500 ml-2">/* Espace Normal */</span></p>
             <p>signature(g) = (+,+,+,+)  si F(r) &lt; 0 <span className="text-rose-500 ml-2">/* Espace Retourné */</span></p>
             <p>signature(g) = ∅          si F(r) = 0 <span className="text-slate-500 ml-2">/* Void */</span></p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-white">Entropie</h3>
              <p>
                L'entropie locale <code className="text-rose-400">S(r)</code> est inversement proportionnelle à la fonction de flip.
                Plus on approche du flip, plus l'entropie augmente vers l'infini, marquant la perte d'information structurée.
              </p>
              <div className="bg-slate-800/50 p-3 rounded text-center font-mono text-lg text-rose-300 mt-2">
                dS/dr = k / F(r)
              </div>
            </div>

            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-white">L'Attracteur</h3>
              <p>
                La singularité agit comme un attracteur dynamique pour toutes les trajectoires spatio-temporelles.
              </p>
              <div className="bg-slate-800/50 p-3 rounded text-center font-mono text-lg text-cyan-300 mt-2">
                ṙ = -α / (r - r_s)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Metaphor */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-xl border border-slate-700">
         <h3 className="text-lg font-bold text-white mb-3">Interprétation: L'Opérateur Ω</h3>
         <p className="mb-4">
           Le flip est le passage de <code className="font-mono font-bold text-cyan-400">Ω = +1</code> à <code className="font-mono font-bold text-rose-400">Ω = -1</code>.
         </p>
         <div className="flex items-center justify-between text-center font-mono text-xs md:text-sm">
            <div className="flex-1 text-cyan-400">
              RÉALITÉ ORIENTÉE
              <div className="text-2xl mt-1">Ω = +1</div>
            </div>
            <div className="px-4 text-slate-500">
              F(r) → 0
              <div className="h-0.5 w-full bg-slate-600 my-2"></div>
              VOID
            </div>
            <div className="flex-1 text-rose-400">
              RÉALITÉ RETOURNÉE
              <div className="text-2xl mt-1">Ω = -1</div>
            </div>
         </div>
      </section>
    </div>
  );
};
