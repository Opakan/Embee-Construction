import { Project, Service } from './types';

// Let's bind the real generated paths from AI Studio asset generation
export const ASSETS = {
  heroArchitecture: '/src/assets/images/hero_architecture_1779381848940.png',
  projectCommercial: '/src/assets/images/project_commercial_1779381867689.png',
  blueprintDraft: '/src/assets/images/blueprint_draft_1779381890678.png',
};

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Architectural Design',
    description: 'Bespoke conceptual modeling where functional layouts converge with luxurious aesthetics. We refine plans from rough blueprints into detailed responsive designs.',
    features: ['3D Photorealistic Modeling', 'Spatial Planning & Layouts', 'Sustainable Green Building', 'Interior Detailing'],
    visualID: 'architectural',
  },
  {
    id: 's2',
    title: 'Structural Works',
    description: 'Precision engineering of robust steel frameworks, pre-stressed composite slabs, and load-bearing concrete cores. Optimized for structural lifespan safety.',
    features: ['Steel Frame Engineering', 'Reinforced Concrete Foundations', 'Retaining Walls Specialists', 'Load-Bearing Analysis'],
    visualID: 'structural',
  },
  {
    id: 's3',
    title: 'Building Construction',
    description: 'Premium turn-key residential, commercial, and industrial construction. Executed by master craftsmen employing material-grade quality checks.',
    features: ['Premium Residential Estates', 'Commercial Office Facades', 'On-Site Quality Supervision', 'Post-Construction Audits'],
    visualID: 'construction',
  },
  {
    id: 's4',
    title: 'Project Consultation',
    description: 'High-level feasibility assessments, building compliance checks, structural integrity reviews, and accurate bill-of-quantities forecasting.',
    features: ['Cost Estimation & Costing', 'Building Permits Guidance', 'Integrity Assessments', 'Procurement Supervision'],
    visualID: 'consultation',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'The Amber Crown Penthouse',
    category: 'Residential Design & Build',
    description: 'A spectacular luxury residence in Ibadan. Features a cantilevered raw steel superstructure paired with panoramic bronze insulated glass walls.',
    image: ASSETS.heroArchitecture,
    location: 'Felele Hilltops, Ibadan',
    completionYear: '2025',
    highlights: ['Multi-level cantilevered deck', 'Smart structural lighting automation', 'Board-formed exposed concrete styling'],
  },
  {
    id: 'p2',
    title: 'Bronze Glass Corporate Plaza',
    category: 'Commercial Architecture',
    description: 'An flagship commercial corporate headquarters with structured energy-efficient glass panels and reinforced architectural columns.',
    image: ASSETS.projectCommercial,
    location: 'Challenge District, Ibadan',
    completionYear: '2026',
    highlights: ['Double-glazed tinted exterior shell', 'Open-concept structural atrium', 'Advanced concrete parking design'],
  },
  {
    id: 'p3',
    title: 'The Felele Brutalist Pavilion',
    category: 'Structural Engineering Showcase',
    description: 'A structural masterpiece emphasizing the raw beauty of structural steel beams, pre-stressed concrete, and custom high-contrast warm timber highlights.',
    image: ASSETS.blueprintDraft,
    location: 'Ganiyu Bello Street Area, Ibadan',
    completionYear: '2024',
    highlights: ['Precast structural elements', 'Integrated amber lighting tracks', 'Zero-tolerance horizontal alignment'],
  },
];

export const COMPANY_STATS = [
  { value: '142+', label: 'Projects Completed' },
  { value: '95+', label: 'Structural Achievements' },
  { value: '12+', label: 'Years of Experience' },
  { value: '100%', label: 'Precision Rating' },
];

export const CLIENT_TESTIMONIALS = [
  {
    quote: "Embee Consult elevated our commercial block into a literal masterpiece. Their commitment to structural integrity is absolute, and their attention to aesthetic lighting details is phenomenal.",
    author: "Chief Olumide Alao",
    role: "MD, Alao Holdings Ltd",
    project: "Bronze Glass Plaza Client"
  },
  {
    quote: "Unlike developers who rely on cheap tricks, Embee handled concrete work with mathematical precision. The rain reflection effects and night views on our custom villa are exactly as simulated.",
    author: "Arch. Fola Ademola",
    role: "Senior Consultant",
    project: "Felele Brutalist Pavilion Lead"
  }
];
