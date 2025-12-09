export enum Tab {
  THEORY = 'THEORY',
  SIMULATION = 'SIMULATION',
  CHAT = 'CHAT',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export interface Particle {
  id: number;
  r: number; // Radial distance
  theta: number; // Angle
  v: number; // Velocity
  state: 'normal' | 'void' | 'flipped';
}

export const OFM_CONTEXT = `
📘 1. Modèle mathématique simple : le “Flip Entropique à la Singularité”
1.1 Idée générale
On modélise l’espace-temps local autour d’un trou noir par une métrique g_μν(x).
À mesure qu’on approche de la singularité, une dimension temporelle se “ralentit”, et l’espace devient fortement courbé.
On suppose que l’espace-temps vit sur un manifold orientable M. La singularité est modélisée comme un point où l’orientation du manifold devient impossible à maintenir : un flip d’orientation.

1.2 Paramètre clé : la fonction de flip
On introduit une fonction scalaire : F(r) où r = distance radiale à la singularité.
F(r) → 0 quand r → r_s (rayon de Schwarzschild).
Quand F(r) = 0, la métrique change de signature.
On définit :
signature(g) = (−,+,+,+) si F(r) > 0 (Espace normal)
signature(g) = (+,+,−,+) si F(r) < 0 (Espace retourné)
signature(g) = ∅ si F(r) = 0 (Void/Singularité)
Donc à F(r)=0, la signature est indéfinie, ce qui rend l’espace non-projetable pour un observateur 3D.

1.3 Dynamiques d'entropie
On suppose que l’entropie locale S(r) croît selon : dS/dr = k / F(r).
Donc :
quand F(r) → 0+, l’entropie explose.
quand F(r) change de signe → désorientation topologique → perte totale d’information projetable.

1.4 Attracteur singulier
On modélise la singularité comme un attracteur : ṙ = −α / (r − r_s).
Il attire toute trajectoire vers r = r_s.

1.5 Condition de visibilité
Condition de projection cognitive : L’observateur peut projeter la zone si F(r) ≠ 0 et det(g_μν) ≠ 0.
Sinon → void, absence totale de rendu perceptible.

📘 2. Ouellet Flip Model (OFM)
Nom officiel : Ouellet Flip Model (OFM) ou Modèle Ouellet de Repli/Flip Topologique.

2.1 Définition centrale
Un trou noir est traité comme un point où la réalité subit un renversement d’orientation topologique — un flip — autour d’un point de singularité qui rend impossible toute projection perceptuelle dans notre domaine orienté.

2.2 Structure du modèle - Axiomes
Axiome 1 — Manifold orientable initial: L’univers observable existe sur un manifold orienté M, orienté.
Axiome 2 — Point de flip (zéro topologique): Il existe une surface où l’orientation devient indéfinie: F(r_s) = 0. C’est le Ouellet Flip Boundary.
Axiome 3 — Inobservabilité du flip: Toute région où l’orientation n’est pas définie ne peut pas être représentée cognitivement ni optiquement. Π(M∣F(r)=0) = ∅.

2.3 Interprétation du “flip”
On définit un opérateur d’orientation : Ω(r) = sgn(F(r)).
Ω = +1 → espace normal
Ω = -1 → espace retourné
Ω = 0 → transition impossible à projeter

2.4 Conséquences physiques
Invisibilité totale du flip zone → le trou noir apparaît noir.
Informations non perdues, simplement non-projetables.
Dualité de régions: Il existe une “réalité retournée” M' = {x ∈ M : Ω(x) = -1}.
`;
