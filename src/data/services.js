import {
  Wind, Boxes, ClipboardCheck, Lightbulb, PencilRuler, Building2,
  Zap, Droplets, Network, Flame, BatteryCharging, Cctv, Megaphone, Antenna,
  PenTool, FileText, CheckCircle2, Combine,
  TreePine, LampCeiling, Store, Hospital, Home, Dumbbell, Factory, Music, Trophy,
} from 'lucide-react'

const img = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

// One source of truth for the Services grid and each /services/:slug page.
// `sections` is an ordered list of typed blocks the detail page renders:
//   quote    { text }
//   featured { paragraphs[], image, caption? }
//   prose    { heading?, paragraphs[] }
//   features { heading, subtitle?, items: [{icon, title, desc?}] }
//   lists    { heading, subtitle?, groups?: [{title, items[]}], items?[] }
//   projects { heading, items: [{title, meta?, desc?}] }
//   chips    { heading, subtitle?, items[] }
export const services = [
  {
    slug: 'mep',
    icon: Wind,
    title: 'MEP Solutions',
    tagline: 'Ensuring seamless functionality and efficiency in every project.',
    image: img('photo-1504328345606-18bbc8c9d7d1'),
    hero: img('photo-1581092160562-40aa08e78837'),
    intro:
      'Mechanical, Electrical and Plumbing engineering for energy-efficient modern construction — coordinated across every system and buildable to the last connection.',
    sections: [
      {
        type: 'prose',
        heading: 'Overview',
        paragraphs: [
          'Mechanical, Electrical and Plumbing needs are the key requirements for an energy-efficient modern commercial construction. As buildings are a major energy consumer, MEP engineering makes an enormous difference in meeting the performance expectations of lean construction.',
          'These solutions cover air-conditioning, power and lighting, water supply and drainage, fire-fighting, building management, and telephone and data systems — for commercial, residential and industrial projects where reliable services and facilities are required.',
        ],
      },
      {
        type: 'features',
        heading: 'Our Services on MEP',
        subtitle: 'End-to-end building systems, designed and coordinated as one.',
        items: [
          { icon: Wind, title: 'Air-conditioning systems', desc: 'HVAC design sized for comfort, air quality and efficiency.' },
          { icon: Zap, title: 'Power & lighting systems', desc: 'Distribution, backup and lighting infrastructure at any scale.' },
          { icon: Droplets, title: 'Water supply & drainage', desc: 'Plumbing and drainage for safe, sustainable water management.' },
          { icon: Network, title: 'Voice & data systems', desc: 'Structured cabling and communication backbones.' },
          { icon: Flame, title: 'Fire protection & alarm', desc: 'Detection, suppression and life-safety systems.' },
          { icon: BatteryCharging, title: 'UPS & backup power', desc: 'Uninterruptible power supply for critical loads.' },
          { icon: Cctv, title: 'Security & surveillance', desc: 'Access control and CCTV surveillance systems.' },
          { icon: Megaphone, title: 'Public address systems', desc: 'PA and emergency announcement networks.' },
          { icon: Antenna, title: 'Master antenna TV', desc: 'MATV distribution across the building.' },
        ],
      },
      {
        type: 'prose',
        heading: 'Mechanical works',
        paragraphs: [
          'Mechanical systems regulate temperature and humidity within a range that ensures comfort, health and protection. Mechanical ventilation guarantees adequate fresh air and keeps contaminants at low, healthy levels. Right-sized machinery works at its best — over-engineering, such as oversized chillers and boilers, causes room-temperature swings and premature wear.',
        ],
      },
      {
        type: 'prose',
        heading: 'Electrical works',
        paragraphs: [
          'Electrical works cover power and illumination plus transformer substations, emergency power, UPS and central batteries, voice/data, CCTV surveillance, access control, public address, building management systems, fire alarm, surge protection and lightning protection. A key challenge in high-rise buildings is determining the best conduit and wiring paths — mapping them with MEP modelling tools minimises circuit lengths and prevents clashes on site.',
        ],
      },
      {
        type: 'prose',
        heading: 'Plumbing works',
        paragraphs: [
          'Plumbing covers every mechanism that moves fluid — tubing, fixtures, reservoirs and more. Coordinating plumbing design with electrical and mechanical systems early is essential. Water service pumps and tanks, sewerage, gas and rainwater-collection pipes make up the domestic plumbing system, and a well-built plumbing system is a major consideration for resident safety and healthy living.',
        ],
      },
    ],
  },
  {
    slug: 'bim',
    icon: Boxes,
    title: 'BIM',
    tagline: 'Integrating intelligent design and precision for smarter execution.',
    image: img('photo-1486406146926-c627a92ad1ab'),
    hero: img('photo-1511818966892-d7d671e672a2'),
    intro:
      'Building Information Modelling that turns drawings into a coordinated, data-rich digital model — a single source of truth every discipline builds from.',
    sections: [
      {
        type: 'quote',
        text: 'Building Information Modelling is assisted by numerous devices, software and workflows that develop and maintain digital representations of physical and functional features — files that can be extracted, shared and networked to support decisions about a built asset.',
      },
      {
        type: 'featured',
        image: img('photo-1587440871875-191322ee64b0'),
        paragraphs: [
          'BIM is the process of generating and managing building data across its complete lifecycle, from conceptual design through the operation of the building. It streamlines the design process from pre-construction to commissioning to post-construction.',
          'It is the intelligent 3D-based method that gives architecture, engineering and construction (AEC) teams the insight and tools to plan, develop, create and maintain buildings and facilities more effectively.',
        ],
      },
      {
        type: 'lists',
        heading: 'Our Services on BIM',
        groups: [
          {
            title: 'Modelling (LOD 100 to LOD 500)',
            items: [
              'Architecture, Structure & MEP modelling for commercial, residential and industrial projects',
              'Modelling and positioning of assets in structures from given data, in existing and new projects',
              'Component modelling for Architecture, Structure & MEP services',
              'Parametric & non-parametric family modelling in Revit',
              '2D CAD / PDF to 3D models',
              'Point Cloud to 3D models (architecture, MEP or other structures)',
              'Developing shop models and as-built models',
            ],
          },
          {
            title: 'Quality Check & Coordination',
            items: [
              'Clash checks in CAD drawings',
              'Clash check and coordination in models of existing and new projects',
              'Quality and consistency checks in family models (parametric & non-parametric)',
            ],
          },
          {
            title: 'Documentation',
            items: [
              'Preparation of sheets from the model — as-built drawings, shop drawings and more',
              'Schedules and quantification of models',
              'Data extraction from existing and new projects',
            ],
          },
        ],
      },
      {
        type: 'projects',
        heading: 'Our Projects on BIM',
        items: [
          { title: 'Casino, New York City', desc: 'Steel modelling, asset management and data extraction.' },
          { title: 'Warehouse building, 12 lakh sq ft+', desc: 'Architecture, structure and MEP modelling.' },
          { title: 'Industrial buildings, 15,000 sq ft+', desc: 'Shop drawings for industrial structures.' },
          { title: 'Residential & commercial, 75,000 sq ft+', desc: 'MEP modelling across mixed-use buildings.' },
          { title: 'Residential buildings, Texas, US', desc: 'Architectural and MEP design drawings.' },
          { title: 'Mechanical equipment families', desc: 'Parametric component family modelling and fabrication drawings.' },
        ],
      },
      {
        type: 'chips',
        heading: 'Our Technologies in BIM',
        items: [
          'Autodesk Revit', 'Revit MEP', 'Navisworks', 'AutoCAD', 'MicroStation', 'BricsCAD',
          'Tekla Structures', 'STAAD.Pro', 'ETABS', 'SAP2000', 'SAFE', 'Dynamo',
          'Lumion', 'Enscape', 'Twinmotion', 'Solibri', 'SketchUp', 'Photoshop',
        ],
      },
      {
        type: 'chips',
        heading: 'Our BIM Design Standards',
        items: [
          'NFPA', 'Uniform Plumbing Code (UPC)', 'National Electrical Code (NEC)', 'ISHRAE',
          'LEED (USGBC)', 'Indian Green Building Council (IGBC)', 'Energy Conservation Building Code (ECBC)', 'Bureau of Indian Standards (BIS)',
        ],
      },
      {
        type: 'lists',
        heading: 'Why choose Sumanam?',
        items: [
          'Our core team comprises specialists across key disciplines — a talent mix that evolves precise solutions matched to each customer’s needs.',
          'A proven track record of delivering projects on time, on cost and to quality.',
          'We treat client relationships as long-term associations, not single transactions.',
        ],
      },
    ],
  },
  {
    slug: 'pmc',
    icon: ClipboardCheck,
    title: 'PMC',
    tagline: 'Delivering strategic project management with precision, quality & on-time execution.',
    image: img('photo-1541888946425-d81bb19240f5'),
    hero: img('photo-1503387762-592deb58ef4e'),
    intro:
      'Project & construction management consultancy that holds scope, cost, quality and time on a single thread — from the first drawing to handover.',
    sections: [
      {
        type: 'quote',
        text: 'The multi-disciplinary expertise and wide exposure of our team across diverse projects over the past three decades make Sumanam Engineering Services a leader in comprehensive project and construction management.',
      },
      {
        type: 'featured',
        image: img('photo-1600880292203-757bb62b4baf'),
        paragraphs: [
          'Sumanam Engineering Services is one of India’s leading multidisciplinary engineering companies specialising in project and construction management. We serve both public and private-sector clients across a wide range of services.',
          'We are a quality-assured company driven by the concept of creating excellence. Uncompromising quality in the delivery of project management, engineering and construction services is the key to the success of our projects and our business.',
        ],
      },
      {
        type: 'prose',
        heading: 'Our Approach & Methodology',
        paragraphs: [
          'Our approach is structured to control the time, cost and quality of a project while optimising resources and ensuring success. We apply systematic development and management tools to determine the optimum plan for construction, commissioning, operation and maintenance, and we are accountable for using allocated resources appropriately.',
          'A variety of stakeholders are involved — clients, policymakers, administrators, financial and legal advisors, designers, and specialist consultants and tenants. We engage in constructive collaboration to understand and respect the goals of every member while completing the project within budget and on schedule, protecting the client’s interests at every stage.',
        ],
      },
      {
        type: 'prose',
        heading: 'As the project manager',
        paragraphs: [
          'We endeavour to establish a strong team spirit with the client so that their best interests are at the forefront of every decision. Although our approach to each challenge is unique, it is designed to always achieve the client’s objectives. All of our strategies share one common denominator: client satisfaction.',
        ],
      },
    ],
  },
  {
    slug: 'drafting',
    icon: PencilRuler,
    title: 'Drafting',
    tagline: 'Transforming concepts into detailed, accurate, and build-ready designs.',
    image: img('photo-1503387837-b154d5074bd2'),
    hero: img('photo-1541976590-713941681591'),
    intro:
      'Precision drafting that turns a vision into build-ready documentation — clean, consistent and detailed enough to build from without a second guess.',
    sections: [
      {
        type: 'prose',
        heading: 'Overview',
        paragraphs: [
          'Drafting is necessary to construct any building or structure, residential or industrial. As a visual representation of the final structure, it is a crucial first stage of construction — a plan for how a vision becomes reality. Drafting gives homeowners, developers, engineers and investors a clear indication of what a structure will look like and how the project will progress through each phase to completion.',
        ],
      },
      {
        type: 'prose',
        heading: 'Drafting offers construction strategies',
        paragraphs: [
          'Constructing a structure involves visual representation — you can’t build from words alone. Drafting provides a comprehensive plan of a project’s proportions and size, and the most significant sketches are the building details used on site. It helps builders understand the construction layout and how components fit precisely. As the plan delivered to consumers, developers, architects and engineers, it becomes the focal point for choices and negotiations, and encourages the team to build plans that make the project successful.',
        ],
      },
      {
        type: 'prose',
        heading: 'Drafting helps the team understand the general design',
        paragraphs: [
          'Drafting captures a structure’s size, altitude and elevations, giving the whole team a shared reference. Architects, engineers, staff and foremen reach a common understanding of materials and available space. Structural drawings outline the reinforcement and strength required, and plumbing and sanitation sketches indicate where pipes and fixtures run — so every discipline is on the same page.',
        ],
      },
      {
        type: 'prose',
        heading: 'A draft prevents delays',
        paragraphs: [
          'A strong draft outlines how a complex plan will be implemented, giving foremen and staff the design knowledge they need. Plans are carefully reviewed before a blueprint is assigned to site, establishing a standardised process everyone can follow. Insufficient detail leads to delays and constant back-and-forth between teams — which costs money every day and pushes a project past both its timeline and its budget.',
        ],
      },
      {
        type: 'lists',
        heading: 'Drafting across a wide range of services',
        groups: [
          {
            title: 'Conversion',
            items: [
              'PDF to CAD',
              'Hand sketches and ideas to CAD',
              'Generating 2D drawings and views from 3D models (Inventor, Fusion, CAD 3D, SAT, DXF, BIM models and more)',
              'Shop drawings and fabrication from design and construction-issue drawings',
              'Point Cloud to CAD conversion',
              'Isometric or orthographic drawings from 3D models (CAD, Inventor, Revit, Fusion, etc.)',
            ],
          },
          {
            title: 'Preparation',
            items: [
              'Construction-issue drawings',
              'As-built drawings',
              'Shop drawings',
              'Fabrication drawings — architecture (incl. landscape), structure and MEP',
            ],
          },
        ],
      },
      {
        type: 'prose',
        paragraphs: [
          'Note: we revise existing drawings in PDF, CAD or any format as per your requirements and changes. Output files can be delivered as DWG, PDF or image formats.',
        ],
      },
    ],
  },
  {
    slug: 'lighting',
    icon: Lightbulb,
    title: 'Lighting',
    tagline: 'Creating ambiance and functionality through innovative illumination.',
    image: img('photo-1524758631624-e2822e304c36'),
    hero: img('photo-1444723121867-7a241cacace9'),
    intro:
      'Lighting design that balances mood, function and efficiency — illumination engineered for the space and the people in it.',
    sections: [
      {
        type: 'prose',
        heading: 'Overview',
        paragraphs: [
          'Sumanam Engineering Services has worked in lighting design consultancy for 30 years, based in Trivandrum with offices in Chennai, Kochi, Bangalore and Calicut. We address client requirements through a team of creative designers and lighting professionals, with expertise across shopping malls, high-rise buildings, outdoor landscapes, building façades and commercial interiors including IT spaces — following global best practices with an emphasis on green norms and exemplary project execution.',
        ],
      },
      {
        type: 'prose',
        heading: 'Our Services on Lighting',
        paragraphs: [
          'We deliver lighting services for interior and exterior applications from concept design to project completion. An experienced team uses the latest lighting calculations and DIALux design software to provide optimum solutions, following the National Electrical Code (NEC), National Building Code (NBC) and Bureau of Indian Standards (BIS).',
        ],
      },
      {
        type: 'features',
        heading: 'Lighting disciplines',
        items: [
          { icon: TreePine, title: 'Landscape lighting', desc: 'Outdoor and public-realm illumination.' },
          { icon: LampCeiling, title: 'Interior lighting', desc: 'Layered schemes for mood and task.' },
          { icon: Building2, title: 'Exterior façade lighting', desc: 'Architectural façade and feature lighting.' },
        ],
      },
      {
        type: 'lists',
        heading: 'Our designs are based on',
        items: [
          'Visual performance',
          'Visual comfort',
          'Energy efficiency & conservation',
          'Cost effectiveness',
          'Maintenance factor',
        ],
      },
      {
        type: 'features',
        heading: 'Interior Lighting',
        items: [
          { icon: Store, title: 'Commercial lighting' },
          { icon: Hospital, title: 'Hospital lighting' },
          { icon: Home, title: 'Residential lighting' },
          { icon: Dumbbell, title: 'Indoor sports arena' },
          { icon: Factory, title: 'Industrial lighting' },
          { icon: Music, title: 'Auditorium lighting' },
        ],
      },
      {
        type: 'features',
        heading: 'Exterior Lighting',
        items: [
          { icon: TreePine, title: 'Landscape lighting' },
          { icon: Building2, title: 'Façade lighting' },
          { icon: Trophy, title: 'Sports stadium' },
        ],
      },
      {
        type: 'projects',
        heading: 'Our Projects on Lighting',
        items: [
          { title: 'Tennis Court', meta: 'Trivandrum Tennis Club' },
          { title: 'C-DAC IT Office Space', meta: 'Trivandrum' },
          { title: 'KLA Conference Hall', meta: 'Trivandrum' },
        ],
      },
      {
        type: 'lists',
        heading: 'How we work',
        groups: [
          { title: 'Schematic design', items: ['Exclusive site visit and design concept shared with the core architecture team, with schematic drawings, preliminary budget, fixtures and sustainability targets.'] },
          { title: 'Design development', items: ['BOQ, lighting schedule and load calculations, fixture specification and light-control drawings prepared.'] },
          { title: 'Execution', items: ['Coordination with architect and contractor to ensure specification integrity, with a checklist to record anomalies and recommend corrective measures.'] },
        ],
      },
      {
        type: 'chips',
        heading: 'Standards we follow',
        items: ['National Electrical Code (NEC)', 'National Building Code (NBC)', 'Bureau of Indian Standards (BIS)', 'DIALux'],
      },
      {
        type: 'lists',
        heading: 'Why choose Sumanam?',
        items: [
          'A core team of specialists across disciplines that evolves precise solutions matched to customer needs.',
          'A proven record of delivering on time, cost and quality — backed by over 200 engineer-years of experience.',
          'Client relationships seen as long-term associations rather than single transactions.',
        ],
      },
    ],
  },
  {
    slug: 'architecture',
    icon: Building2,
    title: 'Architecture',
    tagline: 'Crafting timeless spaces that blend creativity, purpose & structural excellence.',
    image: img('photo-1487958449943-2429e8be8625'),
    hero: img('photo-1449157291145-7efd050a4d0e'),
    intro:
      'Architectural design that unites form, function and feasibility — spaces that are as buildable as they are beautiful.',
    sections: [
      {
        type: 'quote',
        text: 'Design gives an opportunity not only to add beauty and structure to the world, but to significantly improve the conditions of individuals, communities, society, businesses and the environment.',
      },
      {
        type: 'featured',
        image: img('photo-1564013799919-ab600027ffc6'),
        paragraphs: [
          'Design has the power to inspire joy, uplift lives and strengthen the spirit of community. We believe high-performance design is good design, and our range of in-house expertise lets us work in a way that is holistic, integrative and data-driven.',
          'Our goal is to design places that make a positive difference — which is why people are at the heart of everything we do. We use software tools to inform our design decisions and thrive on complex projects that demand depth of experience and cross-discipline collaboration.',
        ],
      },
      {
        type: 'features',
        heading: 'CAD drafting & design solutions we provide',
        items: [
          { icon: PenTool, title: 'Architectural drafts', desc: 'Created from freehand sketches.' },
          { icon: FileText, title: 'PDF / paper to CAD', desc: 'Mark-up based CAD conversion.' },
          { icon: CheckCircle2, title: 'CAD standards check', desc: 'Checking and correction to standards.' },
          { icon: Combine, title: 'Platform conversion', desc: 'CAD to other platforms and vice versa.' },
        ],
      },
      {
        type: 'lists',
        heading: 'Support across all design stages',
        items: [
          'Concept planning & development',
          'Schematics preparation',
          'Design development',
          'Tender',
          'Construction stages',
        ],
      },
      {
        type: 'lists',
        heading: 'How we work',
        items: [
          'Understand owners’ requirements & specifications',
          'Focus on detail — completion within schedule and budget',
          'Bring functional expertise for delivering results to clients',
          'Blend human capital and technology for an affordable delivery model',
          'Concept & design drawings, flow charts and graphs',
          'Patent drafting, drawings & consulting',
          'PCT (Patent Cooperation Treaty) drawings',
          'Utility patent drawings and photo correction',
        ],
      },
      {
        type: 'chips',
        heading: 'Technologies for architectural drafting & design',
        items: ['AutoCAD', 'Autodesk Revit', 'MicroStation', 'BricsCAD', 'SketchUp', 'SolidWorks'],
      },
    ],
  },
]

export const getService = (slug) => services.find((s) => s.slug === slug)
