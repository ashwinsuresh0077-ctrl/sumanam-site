// Individual project case-study pages, transcribed from the live Sumanam
// site (sumanam.co.in). Each entry powers a /project/:slug detail page and
// the /projects showcase grid.
//
// Images are themed Unsplash placeholders keyed by `type` until the real
// project renders are dropped into the repo. Swap `typeImages` (or add a
// per-project `images: [...]` override) to use real assets later.

import { projectRecords } from './projectRecords'
import { getImages } from './projectImages'

const img = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

// 3 placeholder shots per project type — [0] is the hero, all three feed the
// gallery thumbnail strip.
const typeImages = {
  industrial: ['photo-1565043666747-69f6646db940', 'photo-1581091226825-a6a2a5aee158', 'photo-1504917595217-d4dc5ebe6122'],
  itpark: ['photo-1486406146926-c627a92ad1ab', 'photo-1497366216548-37526070297c', 'photo-1497366811353-6870744d04b2'],
  commercial: ['photo-1497366754035-f200968a6e72', 'photo-1431540015161-0bf868a2d407', 'photo-1554469384-e58fac16e23a'],
  hospital: ['photo-1519494026892-80bbd2d6fd0d', 'photo-1586773860418-d37222d8fce3', 'photo-1538108149393-fbbd81895907'],
  residential: ['photo-1460317442991-0ec209397118', 'photo-1545324418-cc1a3fa10c00', 'photo-1512917774080-9991f1c4c750'],
  hospitality: ['photo-1566073771259-6a8506099945', 'photo-1551882547-ff40c63fe5fa', 'photo-1520250497591-112f2f40a3f4'],
}

// Raw project records. `type` selects placeholder imagery; `categorySlug`
// links back to the matching sector on /work/:slug (also used for "related").
// `aliases` lists the exact row text in data/work.js tables that should
// deep-link to this page from the sector table.
const raw = [
  {
    slug: '110-kv-substation-technopark',
    title: '110 KV Substation',
    headline: '110 KV Substation – Powering Techno Park, Trivandrum',
    location: 'Techno Park, Trivandrum',
    category: 'Factory & Industry',
    categorySlug: 'factory-industry',
    type: 'industrial',
    meta: [
      { label: 'Load Capacity', value: '25 MVA' },
      { label: 'Voltage', value: '110 KV' },
      { label: 'Location', value: 'Techno Park' },
    ],
    overview:
      'The 110 KV Substation at Techno Park, Trivandrum, is a high-capacity electrical infrastructure project designed to provide uninterrupted and efficient power distribution to one of India’s largest IT hubs. With a load capacity of 25 MVA, this substation plays a critical role in supporting the energy demands of businesses and industries operating within the Techno Park campus.',
    role:
      'Sumanam Engineering Services was responsible for delivering Total Engineering Solutions, ensuring the substation’s design, implementation, and operational efficiency met the highest standards.',
    scope: [
      { label: 'Power Distribution', text: 'Efficient and reliable energy transmission to meet the growing demands of IT and commercial establishments.' },
      { label: 'Electrical Infrastructure', text: 'Advanced switchgear, transformers, and protection systems to ensure seamless power management.' },
      { label: 'Load Management', text: 'Optimized 25 MVA–110 KV power handling capacity for stable and consistent electricity supply.' },
      { label: 'Architectural Collaboration', text: 'Designed in association with JMA, ensuring a balance of functionality and structural integrity.' },
    ],
    closing:
      'With our expertise, the 110 KV Substation at Techno Park stands as a high-performance power infrastructure, ensuring reliability, energy efficiency, and long-term sustainability for the region’s IT sector.',
  },
  {
    slug: 'accel-infinium-it-park',
    title: 'Accel Infinium 1 IT Park',
    headline: 'Accel Infinium 1 IT Park, Kazhakuttam',
    location: 'Kazhakuttam, Trivandrum',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'itpark',
    meta: [
      { label: 'Built-up Area', value: '1,62,000 sq.ft' },
      { label: 'Project Cost', value: '₹38 Crores' },
      { label: 'Services', value: 'PMC + MEP' },
    ],
    overview:
      'Part of the growing IT hub in Kazhakuttam, Accel Infinium 1 is aimed at providing top-tier infrastructure for businesses in the technology sector. The building covers an expansive area of 1,62,000 square feet, offering ample space for IT operations and business activities with a flexible design that accommodates modern infrastructure needs.',
    role:
      'M/s Sumanam Engineering Services supported the project by providing both Project Management Consultancy (PMC) and Mechanical, Electrical, and Plumbing (MEP) Consultancy Services, ensuring the project was executed efficiently and adhered to high standards of design and construction quality.',
    scope: [
      { label: 'Project Management Consultancy', text: 'End-to-end oversight ensuring the project met schedule, budget, and quality targets.' },
      { label: 'MEP Consultancy', text: 'Mechanical, electrical, and plumbing design tailored to flexible, tech-driven office space.' },
      { label: 'Project Cost', text: 'Overall completion cost estimated at ₹38 Crores, covering construction, development, and consultancy with the latest facilities.' },
    ],
  },
  {
    slug: 'adtech-kanjirampara',
    title: 'Adtech Kanjirampara',
    headline: 'Adtech, Kanjirampara – A Cutting-Edge Commercial Space',
    location: 'Kanjirampara, Trivandrum',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'commercial',
    overview:
      'Adtech, located in Kanjirampara, Trivandrum, is a modern commercial building designed to support business efficiency and sustainability. Developed with a focus on innovation and high-performance infrastructure, the project blends functionality with advanced engineering solutions. The architectural vision, led by Ms. Keerthi, ensures a contemporary and future-ready workspace.',
    role:
      'Sumanam Engineering Services played a key role in this project by delivering MEP (Mechanical, Electrical, and Plumbing) and PMC (Project Management Consultancy) solutions, ensuring smooth execution, energy efficiency, and long-term operational reliability.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC and ventilation for a comfortable and energy-efficient work environment.' },
      { label: 'Electrical Systems', text: 'Smart power distribution, energy-efficient lighting, and backup solutions for uninterrupted business operations.' },
      { label: 'Plumbing Systems', text: 'Reliable water supply, sanitation, and drainage systems designed for high-occupancy commercial use.' },
      { label: 'Project Management Consultancy', text: 'Comprehensive planning, execution, and quality control to ensure timely and efficient project completion.' },
    ],
    closing:
      'With our expertise, Adtech, Kanjirampara stands as a modern, well-equipped commercial space, designed to meet the needs of dynamic business operations with sustainability and efficiency at its core.',
  },
  {
    slug: 'annai-hospital-tiruchengode',
    title: 'Annai Hospital',
    headline: 'Annai Hospital, Tiruchengode – A State-of-the-Art Healthcare Facility',
    location: 'Tiruchengode',
    category: 'Hospitals',
    categorySlug: 'hospitals',
    type: 'hospital',
    overview:
      'Annai Hospital, located in Tiruchengode, is a premier healthcare facility designed to offer world-class medical services with cutting-edge infrastructure. As a trusted healthcare provider, the hospital is built to ensure patient safety, operational efficiency, and sustainability in all its systems.',
    role:
      'As a leading engineering consultancy, Sumanam Engineering Services delivered MEP (Mechanical, Electrical, and Plumbing) and Total Engineering Solutions, ensuring the hospital meets the highest standards of healthcare infrastructure.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC for sterile and comfortable environments, essential for patient care and medical operations.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, emergency backup, and energy-efficient lighting to ensure uninterrupted healthcare services.' },
      { label: 'Plumbing Systems', text: 'Efficient water supply, sanitation, and medical gas pipeline systems for hospital safety and hygiene.' },
      { label: 'Total Engineering Solutions', text: 'End-to-end engineering expertise covering safety, fire protection, and energy optimization.' },
    ],
    closing:
      'With our expertise, Annai Hospital is designed to provide a safe, efficient, and sustainable healthcare environment, supporting medical professionals in delivering the best patient care.',
  },
  {
    slug: 'apartment-numgambakkam',
    title: 'Apartment at Numgambakkam',
    headline: 'Premium Apartment at Nungambakkam – Modern Living with Advanced MEP Solutions',
    location: 'Nungambakkam, Chennai',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    meta: [{ label: 'Built-up Area', value: '9,000 sq.ft' }],
    overview:
      'Located in the prestigious Nungambakkam area of Chennai, this 9,000 sq.ft. residential development is designed for contemporary urban living. Combining luxury, comfort, and efficiency, the apartment offers high-end amenities with a focus on sustainability and smart engineering.',
    role:
      'As a leading engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring a seamless and energy-efficient living environment.',
    scope: [
      { label: 'Mechanical Systems', text: 'Efficient HVAC and ventilation systems for superior indoor air quality and climate control.' },
      { label: 'Electrical Systems', text: 'Smart lighting, power distribution, and backup solutions for uninterrupted living.' },
      { label: 'Plumbing Systems', text: 'Reliable water supply, drainage, and sanitation systems designed for sustainability and convenience.' },
    ],
    closing:
      'With our expertise, the Nungambakkam apartment is built to offer a high-quality residential experience, integrating modern MEP solutions for safety, efficiency, and comfort.',
  },
  {
    slug: 'apartment-trivandrum-heera-residency',
    title: 'Heera Residency',
    headline: 'Apartment at Trivandrum – A Modern Residential Community',
    location: 'Trivandrum',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    meta: [{ label: 'Built-up Area', value: '150,000 sq.ft' }],
    overview:
      'This 150,000 sq.ft. apartment complex, developed in collaboration with the Residence Association, is designed to offer comfortable and efficient urban living in Trivandrum. The project integrates smart infrastructure, energy efficiency, and high-quality amenities to create a premium residential experience.',
    role:
      'Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) and PMC (Project Management Consultancy) solutions, ensuring streamlined execution, high safety standards, and sustainable living conditions.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC and ventilation for climate control and air quality optimization.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup solutions for uninterrupted living.' },
      { label: 'Plumbing Systems', text: 'High-efficiency water supply, sanitation, and drainage systems to support a sustainable community.' },
      { label: 'Project Management Consultancy', text: 'End-to-end project planning, execution, and quality assurance to ensure timely delivery and efficiency.' },
    ],
    closing:
      'With our expertise, this Apartment at Trivandrum stands as a well-engineered, modern residential community, offering sustainability, comfort, and a high standard of living.',
  },
  {
    slug: 'arakkal-apartments-kochi',
    title: 'Arakkal Apartments',
    headline: 'Arakkal Apartments, Thevara, Kochi – A Premium Residential Space',
    location: 'Thevara, Kochi',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    overview:
      'Arakkal Apartments, located in Thevara, Kochi, is a modern residential development designed to provide a comfortable, efficient, and sustainable living environment. With high-quality infrastructure and thoughtfully planned spaces, the project ensures a premium lifestyle for its residents.',
    role:
      'Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring efficient building operations, energy optimization, and long-term sustainability.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC and ventilation for superior indoor air quality and climate control.' },
      { label: 'Electrical Systems', text: 'Smart power distribution, energy-efficient lighting, and backup solutions for uninterrupted living.' },
      { label: 'Plumbing Systems', text: 'High-efficiency water supply, sanitation, and drainage systems for sustainable water management.' },
    ],
    closing:
      'With our expertise, Arakkal Apartments is designed to be a modern and well-engineered residential community, offering sustainability, comfort, and a high standard of living.',
  },
  {
    slug: 'balusseri-taluk-hospital',
    title: 'Balusseri Taluk Hospital',
    headline: 'Balusseri Taluk Hospital, Kozhikode – Advancing Healthcare Infrastructure',
    location: 'Kozhikode',
    category: 'Hospitals',
    categorySlug: 'hospitals',
    type: 'hospital',
    meta: [
      { label: 'Built-up Area', value: '43,760 sq.ft' },
      { label: 'Client', value: 'Government of Kerala' },
    ],
    overview:
      'The Balusseri Taluk Hospital in Kozhikode, developed by the Government of Kerala, is a state-of-the-art healthcare facility designed to enhance medical services for the community. Spanning 43,760 sq.ft., this hospital is built to provide modern healthcare solutions while ensuring operational efficiency and patient comfort. Designed by HOME TECH, the architecture seamlessly integrates functionality with patient-centric design.',
    role:
      'Sumanam Engineering Services was responsible for delivering MEP (Mechanical, Electrical, and Plumbing) and Total Engineering Solutions, ensuring a high-performance medical facility with reliable infrastructure and energy-efficient systems.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC and ventilation for maintaining air quality and infection control.' },
      { label: 'Electrical Systems', text: 'Uninterrupted power supply, smart lighting, and emergency backup solutions for critical hospital operations.' },
      { label: 'Plumbing Systems', text: 'Efficient water supply, sanitation, and drainage to meet the hospital’s high-demand requirements.' },
      { label: 'Total Engineering Solutions', text: 'Comprehensive design and execution ensuring safety, sustainability, and seamless hospital operations.' },
    ],
    closing:
      'With our expertise, Balusseri Taluk Hospital is designed to be a modern, efficient, and patient-friendly healthcare facility, supporting advanced medical care and community well-being.',
  },
  {
    slug: 'blm-geon-it-building-infopark',
    title: 'BLM Geon IT Building',
    headline: 'BLM – Geon IT Building at Infopark',
    location: 'Infopark, Kochi',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'itpark',
    meta: [
      { label: 'Built-up Area', value: '5,95,685 sq.ft' },
      { label: 'Project Cost', value: '₹260 Crores' },
      { label: 'Structure', value: 'Basement + G + 9' },
    ],
    overview:
      'The Geon IT Building at Infopark is a prime example of modern infrastructure designed to meet the needs of the technology sector, offering a flexible, efficient, and safe working environment. The building spans an impressive 5,95,685 square feet across Basement + Ground + 9 Floors, providing ample vertical space for commercial offices, recreational areas, and specialized zones.',
    role:
      'The project is supported by both Project Management Consultancy (PMC) and MEP Consultancy Services, ensuring a comprehensive approach to design, execution, and management of the building’s infrastructure and systems.',
    scope: [
      { label: 'Fully Air-Conditioned', text: 'State-of-the-art HVAC system for an optimal working environment throughout the year.' },
      { label: 'Building Management Systems (BMS)', text: 'Advanced automation for monitoring and controlling lighting, HVAC, security, and energy usage.' },
      { label: '10 High-Speed MRL Lifts', text: 'Machine-room-less technology enhancing vertical transportation efficiency and reducing energy consumption.' },
      { label: 'Incubation & Plug-and-Play Units', text: 'Fully built-up office units and specialized zones ready for immediate use by startups and emerging businesses.' },
      { label: 'High Security & Safe Zone', text: 'Surveillance systems, access control, and safety protocols for a secure environment for all tenants and visitors.' },
    ],
    closing:
      'The approximate cost of the entire development is around ₹260 Crores, reflecting the scale and quality of the construction, design, and services implemented.',
  },
  {
    slug: 'commercial-building-ayurveda-college',
    title: 'Building at Ayurveda College',
    headline: 'Commercial Building at Ayurveda College, Thiruvananthapuram – A Modern Business Hub',
    location: 'Ayurveda College, Thiruvananthapuram',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'commercial',
    overview:
      'The Commercial building at Ayurveda College, Thiruvananthapuram, is a contemporary business space designed to support commercial activities in a prime location. This project combines modern infrastructure with energy-efficient solutions, ensuring a sustainable and functional environment for businesses.',
    role:
      'Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) and PMC (Project Management Consultancy) solutions, ensuring high-quality execution, seamless operations, and long-term sustainability.',
    scope: [
      { label: 'Mechanical Systems', text: 'Efficient HVAC and ventilation solutions for a comfortable indoor environment.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup solutions for uninterrupted operations.' },
      { label: 'Plumbing Systems', text: 'High-efficiency water supply, drainage, and sanitation systems to meet commercial needs.' },
      { label: 'Project Management Consultancy', text: 'Comprehensive planning, execution, and quality control for smooth and timely project completion.' },
    ],
    closing:
      'With our expertise, this Commercial Building at Ayurveda College is set to be a well-equipped, sustainable, and efficient business hub, catering to various commercial needs while maintaining high engineering standards.',
  },
  {
    slug: 'carnival-infopark-cochin',
    title: 'Carnival Infopark',
    headline: 'Carnival Infopark, Cochin – A Landmark IT Hub',
    location: 'Cochin',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'itpark',
    meta: [
      { label: 'Built-up Area', value: '1,000,000 sq.ft' },
      { label: 'Developer', value: 'Carnival Group' },
    ],
    overview:
      'Carnival Infopark, developed by Carnival Group, is a massive 1,000,000 sq.ft. IT campus located in Cochin. Designed by Habitat, this state-of-the-art infrastructure serves as a dynamic hub for leading technology firms, offering cutting-edge workspace solutions with a strong focus on innovation, efficiency, and sustainability.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services contributed to the success of Carnival Infopark by delivering advanced MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring optimal functionality, energy efficiency, and a world-class working environment.',
    scope: [
      { label: 'Mechanical Systems', text: 'High-efficiency HVAC and ventilation systems to maintain superior indoor air quality and climate control.' },
      { label: 'Electrical Systems', text: 'Smart power distribution, energy-efficient lighting, and robust backup solutions to support 24/7 IT operations.' },
      { label: 'Plumbing Systems', text: 'Advanced water management, sanitation, and drainage systems designed for high-occupancy office environments.' },
    ],
    closing:
      'With our expertise, Carnival Infopark stands as a premier IT infrastructure, offering a seamless blend of technology, sustainability, and modern workspace solutions for businesses of all sizes.',
  },
  {
    slug: 'chandragiri-industrial-block-technopark',
    title: 'Chandragiri Industrial Block',
    headline: 'Chandragiri, Industrial Block, Technopark',
    location: 'Thiruvananthapuram',
    category: 'Factory & Industry',
    categorySlug: 'factory-industry',
    type: 'industrial',
    meta: [{ label: 'Built-up Area', value: '120,000 sq.ft' }],
    overview:
      'The Chandragiri Industrial Block in Thiruvananthapuram is a state-of-the-art 120,000 sq.ft. industrial facility designed to support large-scale operations with efficiency and sustainability. This project is built to accommodate modern industrial needs, ensuring smooth workflow and operational excellence.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring seamless functionality, energy efficiency, and adherence to industry standards.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced ventilation, HVAC, and industrial cooling solutions.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, heavy-duty wiring, and energy-efficient lighting.' },
      { label: 'Plumbing Systems', text: 'Robust water supply, drainage, and fire safety systems for industrial operations.' },
    ],
    closing:
      'With our expertise, Chandragiri Industrial Block stands as a model for industrial efficiency, integrating cutting-edge MEP systems to enhance productivity and sustainability.',
  },
  {
    slug: 'corporate-guest-house-chennai',
    title: 'Corporate Guest House',
    headline: 'Corporate Guest House – Premium Hospitality with Advanced MEP Solutions',
    location: 'Chennai',
    category: 'Hospitality',
    categorySlug: 'hospitality',
    type: 'hospitality',
    overview:
      'Located in Chennai, the Corporate Guest House is a high-end accommodation facility designed to offer business travelers a comfortable and luxurious stay. Combining modern amenities with efficient engineering solutions, this guest house provides a seamless hospitality experience.',
    role:
      'As a leading engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring energy efficiency, safety, and superior guest comfort.',
    scope: [
      { label: 'Mechanical Systems', text: 'High-performance HVAC for climate control and air quality enhancement.' },
      { label: 'Electrical Systems', text: 'Smart lighting, reliable power distribution, and backup solutions for uninterrupted service.' },
      { label: 'Plumbing Systems', text: 'Efficient water supply, drainage, and sanitation systems tailored for hospitality needs.' },
    ],
    closing:
      'With our expertise, the Corporate Guest House is equipped with cutting-edge MEP solutions that enhance the guest experience while maintaining sustainability and operational efficiency.',
  },
  {
    slug: 'dongsung-korean-automotive-factory',
    aliases: ['Dong Sung'],
    title: 'Dongsung Korean Automotive Factory',
    headline: 'Dongsung Korean Automotive Factory – Precision Engineering for Industrial Excellence',
    location: 'Sriperumbudur, Chennai',
    category: 'Factory & Industry',
    categorySlug: 'factory-industry',
    type: 'industrial',
    meta: [{ label: 'Electrical Load', value: '630 KVA' }],
    overview:
      'The Dongsung Korean Automotive Factory, located in Chennai, is a cutting-edge manufacturing facility designed to support high-performance automotive production. As a global leader in the automotive sector, Dongsung required a highly efficient and reliable infrastructure to ensure seamless industrial operations.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring optimal energy efficiency, safety, and uninterrupted operations for this large-scale factory.',
    scope: [
      { label: 'Mechanical Systems', text: 'Industrial-grade HVAC and ventilation systems for maintaining optimal working conditions.' },
      { label: 'Electrical Systems', text: '630 KVA load capacity power distribution, high-efficiency lighting, and backup solutions to support heavy-duty manufacturing operations.' },
      { label: 'Plumbing Systems', text: 'Advanced water supply, drainage, and fire safety systems tailored for industrial requirements.' },
    ],
    closing:
      'With our expertise, the Dongsung Korean Automotive Factory is designed to meet international standards in energy efficiency, safety, and operational excellence, ensuring a smooth and sustainable manufacturing process.',
  },
  {
    slug: 'four-points-sheraton-alappuzha',
    title: 'Four Points by Sheraton',
    headline: 'Four Points by Sheraton, Alappuzha – A Luxurious Hospitality Experience',
    location: 'Alappuzha',
    category: 'Hospitality',
    categorySlug: 'hospitality',
    type: 'hospitality',
    meta: [{ label: 'Built-up Area', value: '1,55,700 sq.ft' }],
    overview:
      'The Four Points by Sheraton in Alappuzha is a premium hospitality project designed to offer world-class luxury, comfort, and convenience. Spanning 1,55,700 sq.ft., this upscale hotel is crafted to deliver an exceptional guest experience with state-of-the-art amenities and infrastructure.',
    role:
      'Sumanam Engineering Services was entrusted with providing MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring seamless hotel operations, guest comfort, and energy efficiency.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC and ventilation for optimal indoor air quality and climate control.' },
      { label: 'Electrical Systems', text: 'Smart lighting, power distribution, and backup solutions for an uninterrupted guest experience.' },
      { label: 'Plumbing Systems', text: 'Efficient water supply, drainage, and sanitation systems designed to meet the high demands of a luxury hotel.' },
    ],
    closing:
      'With our expertise, Four Points by Sheraton, Alappuzha is engineered to provide a world-class hospitality experience, ensuring comfort, efficiency, and sustainability in every aspect of its operations.',
  },
  {
    slug: 'gayathri-industrial-block-technopark',
    title: 'Gayathri Industrial Block',
    headline: 'Gayathri, Industrial Block, Technopark',
    location: 'Thiruvananthapuram',
    category: 'Factory & Industry',
    categorySlug: 'factory-industry',
    type: 'industrial',
    meta: [{ label: 'Built-up Area', value: '150,000 sq.ft' }],
    overview:
      'The Gayathri Industrial Block in Thiruvananthapuram is a cutting-edge 150,000 sq.ft. IT infrastructure designed to support high-tech operations with efficiency and sustainability. Built to accommodate the dynamic needs of the IT sector, this facility ensures a seamless working environment with modern engineering solutions.',
    role:
      'As a leading engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring a robust, energy-efficient, and future-ready workspace.',
    scope: [
      { label: 'Mechanical Systems', text: 'High-efficiency HVAC for climate control and air quality management.' },
      { label: 'Electrical Systems', text: 'Advanced power distribution, energy-efficient lighting, and backup power solutions.' },
      { label: 'Plumbing Systems', text: 'Integrated water supply, drainage, and fire protection systems for safety and operational efficiency.' },
    ],
    closing:
      'With our expertise, Gayathri Industrial Block is now a benchmark in IT infrastructure, combining innovation and sustainability to support the evolving needs of the technology sector.',
  },
  {
    slug: 'hotel-new-victoria-chennai',
    title: 'Hotel New Victoria',
    headline: 'Hotel New Victoria – Excellence in Hospitality with Advanced MEP Solutions',
    location: 'Chennai',
    category: 'Hospitality',
    categorySlug: 'hospitality',
    type: 'hospitality',
    meta: [{ label: 'Electrical Load', value: '315 KVA' }],
    overview:
      'Hotel New Victoria, located in Chennai, is a premium hospitality destination designed to provide guests with an exceptional stay experience. With modern amenities and a focus on efficiency, this hotel seamlessly blends comfort and sustainability.',
    role:
      'As an expert engineering consultancy, Sumanam Engineering Solutions provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring seamless operations, energy efficiency, and enhanced guest comfort.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC solutions for optimal temperature and air quality control.' },
      { label: 'Electrical Systems', text: 'Reliable 315 KVA load capacity power distribution, backup solutions, and energy-efficient lighting.' },
      { label: 'Plumbing Systems', text: 'High-performance water supply, drainage, and sanitation systems to meet hotel industry standards.' },
    ],
    closing:
      'With our expertise, Hotel New Victoria is designed to deliver a superior guest experience, backed by sustainable and high-performance MEP solutions.',
  },
  {
    slug: 'influence-spa-chennai',
    aliases: ['Influence Spa at Chennai'],
    title: 'Influence Spa',
    headline: 'Influence Spa – A Luxurious Wellness Retreat with Advanced MEP Solutions',
    location: 'Chennai',
    category: 'Hospitality',
    categorySlug: 'hospitality',
    type: 'hospitality',
    overview:
      'Influence Spa, located in Chennai, is a premium wellness destination designed to offer a tranquil and rejuvenating experience. As part of a high-end hotel, this spa is built to provide the perfect balance of luxury, comfort, and functionality.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services delivered MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring a seamless and energy-efficient spa environment that enhances guest comfort and operational efficiency.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC for climate control, air purification, and optimal indoor air quality.' },
      { label: 'Electrical Systems', text: 'Energy-efficient lighting, power distribution, and backup solutions for uninterrupted operations.' },
      { label: 'Plumbing Systems', text: 'Premium water supply, drainage, and sanitation solutions for spa and wellness facilities.' },
    ],
    closing:
      'With our expertise, Influence Spa is designed to deliver a serene and luxurious wellness experience, supported by cutting-edge MEP solutions that prioritize sustainability and efficiency.',
  },
  {
    slug: 'vit-homeland-2-chennai',
    title: 'Vellore Institute of Technology – Homeland 2',
    headline: 'Vellore Institute of Technology, Homeland 2 – A Modern Residential Facility',
    location: 'Chennai',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    meta: [{ label: 'Built-up Area', value: '220,000 sq.ft' }],
    overview:
      'Homeland 2, developed for Vellore Institute of Technology (VIT) in Chennai, is a large-scale residential facility spanning 220,000 sq.ft. Designed to provide a comfortable and energy-efficient living space for students and faculty, this apartment complex integrates cutting-edge engineering solutions for safety, sustainability, and convenience.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring a well-optimized, safe, and sustainable living environment.',
    scope: [
      { label: 'Mechanical Systems', text: 'Efficient HVAC and ventilation systems for enhanced indoor air quality and climate control.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup power solutions for uninterrupted living.' },
      { label: 'Plumbing Systems', text: 'Advanced water supply, drainage, and sanitation systems to meet high-occupancy residential needs.' },
    ],
    closing:
      'With our expertise, Homeland 2 at VIT Chennai is built to provide a modern, comfortable, and technologically advanced residential experience, ensuring a seamless and sustainable lifestyle for its occupants.',
  },
  {
    slug: 'kgk-arista-sriperumbudur',
    aliases: ['KGK Arista (Service Apartments/Commercial)'],
    title: 'KGK Arista',
    headline: 'KGK Arista, Sriperumbudur – A Modern Commercial Landmark',
    location: 'Sriperumbudur, Chennai',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'commercial',
    meta: [
      { label: 'Built-up Area', value: '52,000 sq.ft' },
      { label: 'Developer', value: 'KG Builders' },
    ],
    overview:
      'KGK Arista, developed by KG Builders, is a premium commercial building located in Sriperumbudur, Chennai, spanning 52,000 sq.ft. Designed to meet the needs of modern businesses, this commercial space integrates cutting-edge engineering solutions for efficiency, sustainability, and seamless operations.',
    role:
      'As a leading engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring a high-performance, energy-efficient, and future-ready infrastructure.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC and ventilation for superior indoor air quality and climate control.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup solutions to support uninterrupted business operations.' },
      { label: 'Plumbing Systems', text: 'High-efficiency water supply, drainage, and sanitation systems tailored for commercial needs.' },
    ],
    closing:
      'With our expertise, KGK Arista stands as a state-of-the-art commercial hub, offering businesses a modern and efficient working environment with sustainability at its core.',
  },
  {
    slug: 'kirans-residence-trivandrum',
    title: 'Kiran’s Residence',
    headline: 'Kiran’s Residence, Trivandrum – A Modern Living Space',
    location: 'Trivandrum',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    meta: [{ label: 'Built-up Area', value: '1,500 sq.ft' }],
    overview:
      'Kiran’s Residence is a 1,500 sq.ft. private home in Trivandrum, designed to offer a perfect blend of comfort, efficiency, and modern living. This thoughtfully planned residence integrates advanced engineering solutions to ensure a seamless and sustainable lifestyle.',
    role:
      'Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring a well-optimized, energy-efficient, and comfortable living environment.',
    scope: [
      { label: 'Mechanical Systems', text: 'Efficient ventilation and climate control for enhanced indoor comfort.' },
      { label: 'Electrical Systems', text: 'Smart power distribution, energy-efficient lighting, and backup solutions for uninterrupted functionality.' },
      { label: 'Plumbing Systems', text: 'Reliable water supply, drainage, and sanitation systems for a sustainable and hassle-free home experience.' },
    ],
    closing:
      'With our expertise, Kiran’s Residence is designed to be a modern, functional, and sustainable living space, offering a balance of aesthetics and engineering excellence.',
  },
  {
    slug: 'leela-it-park-mangalore',
    title: 'Leela IT Park',
    headline: 'Leela IT Park – A Premier IT Hub by Leela Group',
    location: 'Mangalore',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'itpark',
    meta: [
      { label: 'Built-up Area', value: '1,800,000 sq.ft' },
      { label: 'Developer', value: 'Leela Group' },
    ],
    overview:
      'Leela IT Park, developed by Leela Group, is a world-class IT infrastructure project located in Mangalore. Spanning an expansive 1,800,000 sq.ft., this cutting-edge facility is designed to accommodate the growing needs of the IT sector, offering a high-performance workspace with modern engineering solutions.',
    role:
      'As a leading engineering consultancy, Sumanam Engineering Services was entrusted with delivering MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring maximum efficiency, sustainability, and seamless operations for this large-scale development.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC solutions for temperature regulation and superior air quality.' },
      { label: 'Electrical Systems', text: 'High-capacity power distribution, energy-efficient lighting, and backup power solutions.' },
      { label: 'Plumbing Systems', text: 'Comprehensive water supply, drainage, and fire protection systems for operational safety.' },
    ],
    closing:
      'With our expertise, Leela IT Park stands as a benchmark in IT infrastructure, providing a sustainable, efficient, and future-ready work environment.',
  },
  {
    slug: 'marg-tapovan-pavanchur',
    title: 'MARG – Tapovan, Pavanchur',
    headline: 'MARG Tapovan, Pavanchur – A Sustainable Residential Haven',
    location: 'Pavanchur, Chennai',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    overview:
      'MARG Tapovan, developed by Marg Constructions, is a premium residential project located in Pavanchur, Chennai. Designed to offer a serene and eco-friendly living experience, this community integrates modern infrastructure with sustainability-driven solutions for long-term efficiency and comfort.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, along with Public Health Engineering, ensuring a well-optimized, safe, and environmentally sustainable residential development.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC and ventilation systems for superior air quality and climate control.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup solutions for uninterrupted living.' },
      { label: 'Plumbing & Public Health Engineering', text: 'Sustainable water supply, drainage, and sanitation systems designed for a high-quality residential experience.' },
    ],
    closing:
      'With our expertise, MARG Tapovan is built to provide a modern, efficient, and sustainable living environment, ensuring a comfortable and future-ready residential community.',
  },
  {
    slug: 'm-squared-technopark',
    title: 'M-Squared',
    headline: 'M-Squared – A Modern IT Facility at Technopark, Trivandrum',
    location: 'Technopark, Trivandrum',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'itpark',
    meta: [{ label: 'Built-up Area', value: '50,000 sq.ft' }],
    overview:
      'M-Squared is a modern IT facility located in Technopark, Trivandrum, designed to support the evolving needs of the technology sector. Spanning 50,000 sq.ft., this project integrates advanced infrastructure to enhance operational efficiency and sustainability.',
    role:
      'Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) engineering solutions, ensuring a seamless, energy-efficient, and future-ready workspace for IT professionals.',
    scope: [
      { label: 'Mechanical Systems', text: 'Efficient HVAC and ventilation for a comfortable and productive work environment.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup solutions.' },
      { label: 'Plumbing Systems', text: 'Well-designed water supply, drainage, and sanitation systems.' },
    ],
    closing:
      'With a focus on innovation and sustainability, our MEP solutions for M-Squared contribute to a highly efficient and comfortable work environment.',
  },
  {
    slug: 'nila-block-technopark',
    title: 'Nila Block',
    headline: 'Nila Block, Technopark – A Benchmark in IT Infrastructure',
    location: 'Technopark, Trivandrum',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'itpark',
    meta: [{ label: 'Built-up Area', value: '400,000 sq.ft' }],
    overview:
      'Nila Block is one of the largest IT infrastructure projects in Technopark, Trivandrum, covering an impressive 400,000 sq.ft. Designed to support the growing demands of the technology sector, this facility is built for efficiency, scalability, and sustainability.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services was responsible for delivering MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring seamless operations, energy efficiency, and long-term reliability.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC systems for optimal temperature control and air quality.' },
      { label: 'Electrical Systems', text: 'High-capacity power distribution, energy-efficient lighting, and backup solutions.' },
      { label: 'Plumbing Systems', text: 'Integrated water supply, drainage, and fire suppression systems for safety and efficiency.' },
    ],
    closing:
      'With our expertise, Nila Block stands as a benchmark in IT infrastructure, offering a robust and sustainable environment for businesses to thrive.',
  },
  {
    slug: 'palmera-garden-thoraipakkam',
    aliases: ['The Palmera Gardens'],
    title: 'Palmera Garden',
    headline: 'Palmera Garden, Thoraipakkam – Luxury Living with Advanced MEP Solutions',
    location: 'Thoraipakkam, Chennai',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    meta: [
      { label: 'Built-up Area', value: '110,000 sq.ft' },
      { label: 'Developer', value: 'Elegant Constructions' },
    ],
    overview:
      'Palmera Garden, developed by Elegant Constructions, is a premium residential project located in Thoraipakkam, Chennai, spanning 110,000 sq.ft. Designed for modern urban living, this apartment complex offers a perfect blend of luxury, sustainability, and efficiency, providing residents with a comfortable and future-ready living space.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring seamless functionality, energy efficiency, and a high standard of safety for residents.',
    scope: [
      { label: 'Mechanical Systems', text: 'High-performance HVAC and ventilation systems for superior air quality and climate control.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup solutions for uninterrupted living.' },
      { label: 'Plumbing Systems', text: 'Advanced water supply, drainage, and sanitation systems for a sustainable and convenient lifestyle.' },
    ],
    closing:
      'With our expertise, Palmera Garden is built to offer an exceptional residential experience, integrating advanced engineering solutions for safety, comfort, and sustainability.',
  },
  {
    slug: 'bhavani-building-technopark',
    title: 'Bhavani Building',
    headline: 'Bhavani Building, Technopark – A State-of-the-Art IT Infrastructure',
    location: 'Technopark, Thiruvananthapuram',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'itpark',
    overview:
      'The Bhavani Building at Technopark, Thiruvananthapuram, stands as a premier IT infrastructure, designed to support dynamic workspaces with cutting-edge technology and modern amenities. Developed in collaboration with Jayachandran Associates, this project enhances the efficiency and functionality of the Technopark ecosystem, offering an ideal environment for IT professionals.',
    role:
      'As a leading engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring seamless operation, energy efficiency, and long-term sustainability for this high-tech workspace.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC and ventilation solutions for climate control and air quality optimization.' },
      { label: 'Electrical Systems', text: 'High-performance power distribution, energy-efficient lighting, and backup solutions to support continuous IT operations.' },
      { label: 'Plumbing Systems', text: 'Efficient water supply, drainage, and sanitation systems tailored for high-occupancy office spaces.' },
    ],
    closing:
      'With our expertise, Bhavani Building at Technopark is designed to meet the highest standards of efficiency, sustainability, and technological advancement, providing an ideal workspace for innovation and business growth.',
  },
  {
    slug: 'doshi-nakshathra-tambaram',
    aliases: ['Nakshathra, Tambaram'],
    title: 'Doshi Nakshathra',
    headline: 'Doshi Nakshathra, Tambaram – A Grand Residential Development',
    location: 'Tambaram, Chennai',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    meta: [
      { label: 'Built-up Area', value: '356,000 sq.ft' },
      { label: 'Developer', value: 'Doshi Housing Ltd.' },
    ],
    overview:
      'Doshi Nakshathra, developed by Doshi Housing Ltd., is a large-scale residential project located in Tambaram, Chennai, spanning 356,000 sq.ft. Designed for modern urban living, this community integrates comfort, sustainability, and advanced engineering solutions to provide a superior living experience.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, with a special focus on Electrical Systems & Public Health Engineering, ensuring a well-optimized, safe, and energy-efficient infrastructure.',
    scope: [
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup solutions for uninterrupted residential operations.' },
      { label: 'Public Health Engineering', text: 'Advanced water supply, sanitation, and drainage systems for sustainable and hygienic living.' },
      { label: 'Mechanical Systems', text: 'Efficient HVAC and ventilation to enhance indoor air quality and comfort.' },
    ],
    closing:
      'With our expertise, Doshi Nakshathra stands as a well-engineered residential community, offering a safe, sustainable, and future-ready living environment.',
  },
  {
    slug: 'kg-centre-point-pazhanjur',
    aliases: ['KG Centre Point, Palanjur'],
    title: 'KG Centre Point',
    headline: 'KG Centre Point, Pazhanjur – A Premier Residential Community',
    location: 'Pazhanjur, Chennai',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    meta: [
      { label: 'Built-up Area', value: '425,000 sq.ft' },
      { label: 'Developer', value: 'KG Builders' },
    ],
    overview:
      'KG Centre Point, developed by KG Builders, is a large-scale residential project located in Pazhanjur, Chennai, spanning 425,000 sq.ft. Designed for modern living, this development combines smart engineering, sustainability, and comfort to create an efficient and future-ready residential community.',
    role:
      'As a leading engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, with a specialized focus on Electrical Systems & Public Health Engineering, ensuring safety, reliability, and sustainability in all aspects of infrastructure.',
    scope: [
      { label: 'Electrical Systems', text: 'Efficient power distribution, energy-saving lighting, and backup power solutions for uninterrupted functionality.' },
      { label: 'Public Health Engineering', text: 'Advanced water supply, sanitation, and drainage systems for a hygienic and eco-friendly living environment.' },
      { label: 'Mechanical Systems', text: 'Optimized HVAC and ventilation for improved air quality and climate control.' },
    ],
    closing:
      'With our expertise, KG Centre Point is designed to be a well-equipped and sustainable residential development, offering modern amenities, energy efficiency, and a high standard of living.',
  },
  {
    slug: 'primex-kolappakkam',
    aliases: ['Verterra, Kolappakkom'],
    title: 'Primex',
    headline: 'Primex, Kolappakkam – A Modern Residential Hub with Advanced Engineering Solutions',
    location: 'Kolappakkam, Chennai',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    meta: [
      { label: 'Built-up Area', value: '400,000 sq.ft' },
      { label: 'Developer', value: 'Primex Infrastructures' },
    ],
    overview:
      'Primex, developed by Primex Infrastructures, is a large-scale residential project located in Kolappakkam, Chennai, covering 400,000 sq.ft. Designed for contemporary urban living, this development integrates cutting-edge infrastructure and sustainable solutions to provide a high-quality residential experience.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, with a specialized focus on Electrical Systems & Public Health Engineering, ensuring efficiency, safety, and sustainability throughout the development.',
    scope: [
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup power solutions for uninterrupted living.' },
      { label: 'Public Health Engineering', text: 'Advanced water supply, sanitation, and drainage systems to support a clean and sustainable residential environment.' },
      { label: 'Mechanical Systems', text: 'High-performance HVAC and ventilation for improved air quality and climate control.' },
    ],
    closing:
      'With our expertise, Primex, Kolappakkam stands as a well-engineered residential community, offering a blend of comfort, safety, and energy efficiency.',
  },
  {
    slug: 'sidharth-natura-medavakkam',
    aliases: ['Natura, Medavakkom'],
    title: 'Sidharth Natura',
    headline: 'Sidharth Natura, Medavakkam – Premium Living with Advanced MEP Solutions',
    location: 'Medavakkam, Chennai',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    meta: [
      { label: 'Built-up Area', value: '158,000 sq.ft' },
      { label: 'Developer', value: 'Sidharth Housing Ltd.' },
    ],
    overview:
      'Sidharth Natura, developed by Sidharth Housing Ltd., is a modern residential project located in Medavakkam, Chennai, covering 158,000 sq.ft. This thoughtfully designed apartment complex offers residents a perfect blend of comfort, sustainability, and efficiency, with cutting-edge infrastructure to enhance the living experience.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring optimal safety, energy efficiency, and seamless functionality throughout the development.',
    scope: [
      { label: 'Mechanical Systems', text: 'High-performance HVAC and ventilation systems for enhanced indoor air quality and climate control.' },
      { label: 'Electrical Systems', text: 'Smart lighting, reliable power distribution, and backup power solutions for uninterrupted living.' },
      { label: 'Plumbing Systems', text: 'Efficient water supply, advanced drainage, and sanitation systems for sustainable living.' },
    ],
    closing:
      'With our expertise, Sidharth Natura is designed to deliver a modern and comfortable residential experience, integrating top-tier MEP solutions for safety, efficiency, and convenience.',
  },
  {
    slug: 'the-palm-medavakkam',
    title: 'The Palm',
    headline: 'The Palm, Medavakkam – A Modern Residential Retreat',
    location: 'Medavakkam, Chennai',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    meta: [{ label: 'Developer', value: 'Ramky Wavoo Developers' }],
    overview:
      'The Palm, developed by Ramky Wavoo Developers, is a premium residential project located in Medavakkam, Chennai. Designed for contemporary living, this development offers a blend of comfort, sustainability, and efficiency, ensuring a superior lifestyle for residents.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring optimal safety, energy efficiency, and seamless functionality across the development.',
    scope: [
      { label: 'Mechanical Systems', text: 'High-performance HVAC and ventilation for superior air quality and comfort.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup solutions for uninterrupted living.' },
      { label: 'Plumbing Systems', text: 'Advanced water supply, drainage, and sanitation systems for sustainable and efficient resource management.' },
    ],
    closing:
      'With our expertise, The Palm is designed to provide a high-quality residential experience, integrating top-tier MEP solutions to enhance safety, sustainability, and comfort.',
  },
  {
    slug: 'scm-garments-sathyamangalam',
    title: 'SCM Garments',
    headline: 'SCM Garments, Sathyamangalam – A High-Performance Industrial Facility',
    location: 'Sathyamangalam',
    category: 'Factory & Industry',
    categorySlug: 'factory-industry',
    type: 'industrial',
    overview:
      'SCM Garments, located in Sathyamangalam, is a state-of-the-art industrial facility designed to support large-scale textile and garment manufacturing operations. Built with efficiency, sustainability, and operational excellence in mind, the facility ensures seamless production workflows with advanced infrastructure.',
    role:
      'As a leading engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring optimal energy efficiency, safety, and long-term operational reliability.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced ventilation and HVAC solutions to maintain optimal working conditions for textile production.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, high-efficiency lighting, and backup solutions to support continuous manufacturing operations.' },
      { label: 'Plumbing Systems', text: 'Industrial-grade water supply, drainage, and sanitation systems tailored for large-scale garment production.' },
    ],
    closing:
      'With our expertise, SCM Garments is designed to be a high-performance industrial facility, ensuring operational efficiency, worker safety, and sustainable manufacturing practices.',
  },
  {
    slug: 'yamuna-restaurant-mount-road',
    title: 'Yamuna Restaurant',
    headline: 'Yamuna Restaurant, Mount Road – Superior Dining with Advanced MEP Solutions',
    location: 'Mount Road, Chennai',
    category: 'Hospitality',
    categorySlug: 'hospitality',
    type: 'hospitality',
    meta: [{ label: 'Built-up Area', value: '4,000 sq.ft' }],
    overview:
      'Located on Mount Road, Chennai, Yamuna Restaurant is a premier dining destination designed to offer a seamless blend of comfort, ambiance, and operational efficiency. Spanning 4,000 sq.ft., the restaurant is equipped with state-of-the-art infrastructure to ensure an exceptional dining experience.',
    role:
      'As a leading engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, ensuring energy efficiency, safety, and uninterrupted restaurant operations.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced ventilation and HVAC solutions for optimal indoor air quality and temperature control.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup solutions for smooth operations.' },
      { label: 'Plumbing Systems', text: 'High-quality water supply, drainage, and sanitation systems tailored for the restaurant industry.' },
    ],
    closing:
      'With our expertise, Yamuna Restaurant is designed to provide a world-class dining experience, ensuring comfort for guests and efficiency for operations.',
  },
  {
    slug: 'trans-tower-vazhuthacaud',
    aliases: ['Trans Towers- Trivandrum'],
    title: 'Trans Tower',
    headline: 'Trans Tower, Vazhuthacaud – A Landmark Commercial Building',
    location: 'Vazhuthacaud, Thiruvananthapuram',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'commercial',
    meta: [{ label: 'Built-up Area', value: '66,000 sq.ft' }],
    overview:
      'Trans Tower is a state-of-the-art commercial building located in the heart of Vazhuthacaud, Thiruvananthapuram. Spanning 66,000 sq.ft., this landmark structure is designed to accommodate modern business needs with efficiency, sustainability, and functionality at its core.',
    role:
      'As part of our commitment to delivering cutting-edge engineering solutions, Sumanam Engineering Services provided comprehensive MEP (Mechanical, Electrical, and Plumbing) services for Trans Tower. Our expertise ensured that the building meets the highest standards of safety, energy efficiency, and operational reliability.',
    scope: [
      { label: 'Mechanical Systems', text: 'Efficient HVAC and ventilation solutions for optimal indoor comfort.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup solutions.' },
      { label: 'Plumbing Systems', text: 'High-performance water supply, drainage, and sanitation systems.' },
    ],
    closing:
      'Through our expertise, Trans Tower is now a well-integrated commercial space that supports seamless business operations while maintaining a sustainable and efficient infrastructure.',
  },
  {
    slug: 'tower-at-bengaluru',
    title: 'Tower at Bengaluru',
    headline: 'Tower at Bengaluru – A Modern Commercial Landmark',
    location: 'Bengaluru',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'commercial',
    overview:
      'The Tower at Bengaluru is a premium commercial building designed to meet the evolving needs of modern businesses. Strategically located in the bustling city of Bangalore, this high-rise structure is set to redefine workspace efficiency with cutting-edge Building Information Modeling (BIM) solutions, ensuring precision, sustainability, and seamless execution.',
    role:
      'As a leading engineering consultancy, Sumanam Engineering Services provided BIM (Building Information Modeling) solutions, enabling a highly efficient design, streamlined construction processes, and enhanced operational performance.',
    scope: [
      { label: 'BIM Modeling', text: 'High-precision digital representation for better project visualization and coordination.' },
      { label: 'Clash Detection & Resolution', text: 'Identifying and eliminating conflicts before construction for cost and time savings.' },
      { label: 'Sustainability Optimization', text: 'Integrating energy-efficient designs and materials to enhance building performance.' },
    ],
    closing:
      'With our expertise in BIM technology, the Tower at Bengaluru is designed for maximum efficiency, innovation, and long-term sustainability, setting a new benchmark in commercial architecture.',
  },
  {
    slug: 'tcs-training-centre-technopark',
    title: 'TCS Training Centre',
    headline: 'TCS – Advanced Lighting Solutions for a Leading IT Hub',
    location: 'Technopark, Thiruvananthapuram',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'commercial',
    overview:
      'Located in Technopark, Thiruvananthapuram, the TCS facility is a state-of-the-art IT workspace designed to meet the evolving demands of the technology sector. As a global leader in IT services, TCS required a lighting solution that enhances productivity, energy efficiency, and workplace comfort.',
    role:
      'Sumanam Engineering Services provided specialized lighting solutions, ensuring optimal illumination, energy savings, and a modern work environment that aligns with international standards.',
    scope: [
      { label: 'Energy-Efficient Lighting', text: 'LED systems designed for maximum brightness with minimal power consumption.' },
      { label: 'Smart Lighting Controls', text: 'Automated and sensor-based lighting solutions for improved energy management.' },
      { label: 'Workplace Comfort', text: 'Balanced lighting to reduce glare and enhance employee productivity.' },
    ],
    closing:
      'With our expertise, the TCS Technopark facility now benefits from an advanced lighting system that optimizes energy usage while creating a well-lit, comfortable workspace for IT professionals.',
  },
  {
    slug: 'tata-elxsi-ltd',
    title: 'TATA Elxsi Ltd',
    headline: 'TATA ELXSI LTD – Comprehensive PMC & MEP Consultancy',
    location: 'Trivandrum',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'itpark',
    meta: [
      { label: 'Total Area', value: '2,12,338 sq.ft' },
      { label: 'MEP Cost', value: '₹12.71 Crores' },
      { label: 'Services', value: 'PMC + MEP' },
    ],
    overview:
      'M/s Sumanam Engineering Services played a pivotal role in providing both Project Management Consultancy (PMC) and MEP Consultancy Services for this comprehensive project. Their involvement covered the entire scope of MEP services, ensuring seamless integration and execution across various technical domains. The total area of the project was 2,12,338 square feet, requiring meticulous planning and design to meet the project’s technical, operational, and safety requirements.',
    role:
      'The project included a complete vetting of the existing infrastructure, followed by the design and implementation of all MEP (Mechanical, Electrical, and Plumbing) services. Sumanam also served as the Project Management Consultant, overseeing the entire project, managing budgets, and ensuring quality and safety of all works.',
    scope: [
      { label: 'Electrical Systems', text: 'Design and installation of power distribution, lighting, and backup power solutions.' },
      { label: 'Fire Detection & Fighting', text: 'Comprehensive fire alarm systems, fire suppression mechanisms, and firefighting systems.' },
      { label: 'Gas Suppression & Clean Agent', text: 'Advanced fire suppression technology using gas-based systems for safety and minimal damage to sensitive equipment.' },
      { label: 'ELV & Data Systems', text: 'Low-voltage electrical systems including security, access control, automation, networking, and telecommunication.' },
      { label: 'HVAC', text: 'Efficient climate control systems to maintain optimal working conditions.' },
    ],
    closing:
      'The total completion cost for the MEP services was ₹12.71 Crores, covering the entire scope of services and ensuring the integration of all necessary systems to deliver a high-functioning, safe, and efficient facility.',
  },
  {
    slug: 'sunrise-hospital-cochin',
    aliases: ['Sunrise Hospital, Cochin'],
    title: 'Sunrise Hospital',
    headline: 'Sunrise Hospital, Cochin – Complete MEP Consultancy',
    location: 'Cochin',
    category: 'Hospitals',
    categorySlug: 'hospitals',
    type: 'hospital',
    meta: [{ label: 'Project Cost', value: '₹495 Lakhs' }],
    overview:
      'Sumanam Engineering Services successfully completed MEP consultancy services for Sunrise Hospital, Cochin, ensuring all aspects of the hospital’s mechanical, electrical, and plumbing systems were efficiently designed and implemented.',
    role:
      'Our team managed the installation and integration of the hospital’s critical infrastructure, from high-tension power distribution to real-time building management, ensuring reliability, safety, and patient care across the facility.',
    scope: [
      { label: 'HT & MV Installations', text: 'Managed the installation and integration of HT and MV electrical systems for reliable power distribution.' },
      { label: 'Diesel Generator Backup', text: 'Ensured synchronization and smooth functioning of the hospital’s diesel generator backup system for uninterrupted power supply.' },
      { label: 'Chiller System Integration', text: 'Oversaw the electrics related to the chiller system to maintain optimal cooling for hospital operations.' },
      { label: 'Firefighting System', text: 'Designed and integrated comprehensive firefighting systems in accordance with safety protocols.' },
      { label: 'Building Management System (BMS)', text: 'Installed and configured a robust BMS for real-time monitoring and control of building systems.' },
      { label: 'CCTV, Nurse Call & Low Voltage', text: 'Deployed CCTV and security systems, an efficient nurse call system, and low-voltage services including data cabling.' },
    ],
    closing:
      'The total project cost was approximately ₹495 Lakhs.',
  },
  {
    slug: 'stanzpart-it-kelambakkam',
    title: 'Stanzpart-IT',
    headline: 'Stanzpart-IT, Kelambakkam – A Future-Ready IT Hub with Advanced MEP Solutions',
    location: 'Kelambakkam, Chennai',
    category: 'Commercial Buildings',
    categorySlug: 'commercial-buildings',
    type: 'itpark',
    meta: [
      { label: 'Built-up Area', value: '110,000 sq.ft' },
      { label: 'Developer', value: 'Akshaya Homes Pvt. Ltd.' },
    ],
    overview:
      'Stanzpart-IT, developed by Akshaya Homes Pvt. Ltd., is a cutting-edge IT building located in Kelambakkam, Chennai, spanning 110,000 sq.ft. Designed to meet the evolving demands of the IT sector, this facility is equipped with high-efficiency engineering solutions to ensure safety, sustainability, and uninterrupted business operations.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services provided comprehensive MEP (Mechanical, Electrical, and Plumbing) solutions, along with Public Health Engineering & Fire Fighting Systems, ensuring a safe, efficient, and high-performance work environment.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC and ventilation for climate control and enhanced indoor air quality.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, energy-efficient lighting, and backup solutions for 24/7 IT operations.' },
      { label: 'Plumbing & Public Health Engineering', text: 'High-quality water supply, drainage, and sanitation systems designed for commercial IT infrastructure.' },
      { label: 'Fire Fighting Systems', text: 'Cutting-edge fire detection, suppression, and emergency response systems to ensure workplace safety.' },
    ],
    closing:
      'With our expertise, Stanzpart-IT is designed to be a sustainable, energy-efficient, and safety-compliant IT workspace, offering businesses a future-proof infrastructure for seamless operations.',
  },
  {
    slug: 'sreshta-euphoria-koyembedu',
    title: 'Sreshta Euphoria',
    headline: 'Sreshta Euphoria at Koyembedu – Modern Living with Advanced MEP Solutions',
    location: 'Koyembedu, Chennai',
    category: 'Apartments',
    categorySlug: 'apartments',
    type: 'residential',
    meta: [{ label: 'Built-up Area', value: '46,000 sq.ft' }],
    overview:
      'Sreshta Euphoria is a premium residential development in Chennai, spanning 46,000 sq.ft. Designed to provide a sophisticated and comfortable living experience, this apartment complex is built with state-of-the-art infrastructure to ensure efficiency, sustainability, and convenience.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services delivered MEP Electrical & Plumbing solutions, ensuring seamless functionality, energy efficiency, and a high standard of living for residents.',
    scope: [
      { label: 'Electrical Systems', text: 'Smart power distribution, energy-efficient lighting, and backup solutions for uninterrupted living.' },
      { label: 'Plumbing Systems', text: 'Reliable water supply, advanced drainage, and sanitation systems for sustainability and convenience.' },
      { label: 'Mechanical Systems', text: 'Optimized ventilation and air circulation for superior indoor air quality.' },
    ],
    closing:
      'With our expertise, Sreshta Euphoria offers a future-ready residential experience, combining modern engineering solutions with sustainability and comfort.',
  },
  {
    slug: 'siva-hospital-nagarcoil',
    aliases: ['Siva Hospital (Chennai)'],
    title: 'Siva Hospital',
    headline: 'Siva Hospital, Nagarcoil – Advanced Healthcare Infrastructure with MEP Excellence',
    location: 'Nagarcoil, Chennai',
    category: 'Hospitals',
    categorySlug: 'hospitals',
    type: 'hospital',
    meta: [
      { label: 'Capacity', value: '50-bed' },
      { label: 'Developer', value: 'Akshaya Homes Pvt. Ltd.' },
    ],
    overview:
      'Siva Hospital, developed by Akshaya Homes Pvt. Ltd., is a state-of-the-art healthcare facility located in Chennai. With a 50-bed capacity, this hospital is designed to provide high-quality medical care, integrating modern infrastructure for patient safety, operational efficiency, and sustainability.',
    role:
      'As a trusted engineering consultancy, Sumanam Engineering Services provided MEP (Mechanical, Electrical, and Plumbing) solutions, along with Public Health Engineering & Fire Fighting Systems, ensuring a safe, efficient, and patient-friendly healthcare environment.',
    scope: [
      { label: 'Mechanical Systems', text: 'Advanced HVAC and air filtration systems to maintain sterile and temperature-controlled environments.' },
      { label: 'Electrical Systems', text: 'Reliable power distribution, backup solutions, and energy-efficient lighting for uninterrupted medical operations.' },
      { label: 'Plumbing & Public Health Engineering', text: 'Safe water supply, sanitation, and drainage systems designed to meet hospital hygiene standards.' },
      { label: 'Fire Fighting Systems', text: 'State-of-the-art fire detection, suppression, and emergency response systems to ensure patient and staff safety.' },
    ],
    closing:
      'With our expertise, Siva Hospital is built to deliver world-class healthcare services, supported by cutting-edge MEP and safety solutions.',
  },
]

export const featuredProjects = raw.map((p) => {
  // Real photography from the company's own site when we have it; themed
  // placeholders only as a fallback for anything not yet shot.
  const real = getImages(p.slug)
  if (real) {
    return {
      ...p,
      kind: 'case-study',
      image: real.hero,
      card: real.card,
      gallery: real.gallery,
      hasRealImages: true,
    }
  }
  const ids = typeImages[p.type] || typeImages.commercial
  return {
    ...p,
    kind: 'case-study',
    image: img(ids[0]),
    card: img(ids[0], 900),
    gallery: ids.map((id) => img(id, 900)),
    hasRealImages: false,
  }
})

export const getProject = (slug) => featuredProjects.find((p) => p.slug === slug)

// ---------------------------------------------------------------------------
// Sector-level capability copy.
//
// Used by project pages that have no hand-written case study. This describes
// what Sumanam's practice covers in that sector — it is deliberately written as
// capability, NOT as a claim about what was delivered on a specific project,
// because the sector tables only record project name and client.
// ---------------------------------------------------------------------------
export const sectorProfiles = {
  'factory-industry': {
    label: 'Factory & Industry',
    type: 'industrial',
    intro:
      'Sumanam’s industrial practice delivers MEP and total engineering solutions for production plants, warehouses and manufacturing facilities, engineered around uptime, worker safety and process continuity.',
    disciplines: [
      { label: 'Mechanical', text: 'Industrial-grade HVAC, process ventilation and cooling sized for plant loads.' },
      { label: 'Electrical', text: 'Heavy-duty power distribution, HT/LT systems, standby generation and energy-efficient industrial lighting.' },
      { label: 'Plumbing & Fire', text: 'Process water supply, effluent and drainage, and fire detection and suppression to industrial standards.' },
    ],
  },
  hospitality: {
    label: 'Hospitality',
    type: 'hospitality',
    intro:
      'Sumanam’s hospitality practice covers hotels, restaurants and service apartments, balancing guest comfort and ambiance against the back-of-house demands of a 24/7 operation.',
    disciplines: [
      { label: 'Mechanical', text: 'Guest-room and public-area HVAC, kitchen and laundry ventilation, and heat recovery.' },
      { label: 'Electrical', text: 'Power distribution, standby generation, and lighting design tuned for ambiance and efficiency.' },
      { label: 'Plumbing', text: 'Hot and cold water systems, drainage, and treatment plant design for high-occupancy service.' },
    ],
  },
  hospitals: {
    label: 'Hospitals',
    type: 'hospital',
    intro:
      'Sumanam’s healthcare practice engineers hospitals and medical facilities around infection control, clinical reliability and uninterrupted critical care.',
    disciplines: [
      { label: 'Mechanical', text: 'HVAC and filtration for sterile and temperature-controlled environments, including OT and ICU zones.' },
      { label: 'Electrical', text: 'Essential and emergency power, UPS backup, medical-grade earthing and energy-efficient lighting.' },
      { label: 'Plumbing & Specialist', text: 'Medical gas pipelines, hygienic water supply and drainage, firefighting, nurse call and building management systems.' },
    ],
  },
  resorts: {
    label: 'Resorts',
    type: 'hospitality',
    intro:
      'Sumanam’s resort practice supports leisure and getaway destinations where engineering has to disappear into the landscape while still carrying full hospitality loads.',
    disciplines: [
      { label: 'Mechanical', text: 'Distributed HVAC and ventilation suited to villa, cottage and low-rise layouts.' },
      { label: 'Electrical', text: 'Site-wide power distribution, landscape and facade lighting, and standby generation.' },
      { label: 'Plumbing & Water', text: 'Water supply, pool and water-feature systems, drainage and on-site treatment.' },
    ],
  },
  airports: {
    label: 'Airports',
    type: 'commercial',
    intro:
      'Sumanam’s aviation experience covers terminal and technical buildings, where passenger flow, high occupancy and stringent safety codes drive every system.',
    disciplines: [
      { label: 'Mechanical', text: 'High-capacity HVAC and ventilation for large-volume terminal spaces.' },
      { label: 'Electrical', text: 'Resilient power distribution, standby supply and high-bay lighting design.' },
      { label: 'Plumbing & Fire', text: 'Water supply, drainage and fire detection and suppression to aviation authority standards.' },
    ],
  },
  'amusement-parks': {
    label: 'Amusement Parks',
    type: 'commercial',
    intro:
      'Sumanam’s parks and recreation work covers venues built for footfall, outdoor exposure and public safety.',
    disciplines: [
      { label: 'Mechanical', text: 'Ventilation and cooling for enclosed attractions and support buildings.' },
      { label: 'Electrical', text: 'Outdoor-rated power distribution, ride and attraction supply, and landscape lighting.' },
      { label: 'Plumbing & Water', text: 'Water supply, filtration and treatment for water features, and site drainage.' },
    ],
  },
  apartments: {
    label: 'Apartments',
    type: 'residential',
    intro:
      'Sumanam’s residential practice covers apartment towers and housing complexes, engineered for day-to-day liveability, running cost and long-term maintainability.',
    disciplines: [
      { label: 'Mechanical', text: 'Ventilation, climate control and car-park smoke management.' },
      { label: 'Electrical', text: 'Power distribution, DG backup, lift supply and energy-efficient common-area lighting.' },
      { label: 'Plumbing & Public Health', text: 'Water supply, drainage, sewage treatment and rainwater harvesting.' },
    ],
  },
  auditorium: {
    label: 'Auditorium',
    type: 'commercial',
    intro:
      'Sumanam’s auditorium work covers performance and assembly halls, where acoustics, air movement and crowd safety have to be resolved together.',
    disciplines: [
      { label: 'Mechanical', text: 'Low-noise HVAC and air distribution designed around acoustic requirements.' },
      { label: 'Electrical', text: 'Stage and house lighting, power distribution and standby supply.' },
      { label: 'Plumbing & Fire', text: 'Sanitary provision sized for peak occupancy, plus detection and evacuation systems.' },
    ],
  },
  banks: {
    label: 'Banks',
    type: 'commercial',
    intro:
      'Sumanam’s banking and financial sector work is built around security, continuity of service and the standards these institutions operate to.',
    disciplines: [
      { label: 'Mechanical', text: 'HVAC for banking halls, server rooms and secure areas.' },
      { label: 'Electrical', text: 'Clean power, UPS and standby generation for continuous operation.' },
      { label: 'Plumbing & Security Systems', text: 'Water supply and drainage, plus fire protection, access control and surveillance integration.' },
    ],
  },
  'commercial-buildings': {
    label: 'Commercial Buildings',
    type: 'commercial',
    intro:
      'Sumanam’s commercial practice covers offices, retail and mixed-use developments, engineered for tenant flexibility, operating efficiency and building performance.',
    disciplines: [
      { label: 'Mechanical', text: 'Central and split HVAC, ventilation and smoke management.' },
      { label: 'Electrical', text: 'Power distribution, standby generation, and lighting design with automated controls.' },
      { label: 'Plumbing & Systems', text: 'Water supply and drainage, firefighting, and building management systems.' },
    ],
  },
}

// Records (no case study) normalized into the same shape the page renders.
const recordProjects = projectRecords.map((r) => {
  const profile = sectorProfiles[r.categorySlug] || sectorProfiles['commercial-buildings']
  const ids = typeImages[profile.type] || typeImages.commercial
  return {
    ...r,
    kind: 'record',
    category: profile.label,
    type: profile.type,
    image: img(ids[0]),
    card: img(ids[0], 900),
    gallery: ids.map((id) => img(id, 900)),
  }
})

export const allProjects = [...featuredProjects, ...recordProjects]

export const getAnyProject = (slug) => allProjects.find((p) => p.slug === slug)

// Normalized-title lookup so sector tables in data/work.js can deep-link to a
// case study when their row text (or a declared alias) matches a project.
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

const titleMap = (() => {
  const m = new Map()
  for (const p of featuredProjects) {
    m.set(norm(p.title), p)
    if (p.headline) m.set(norm(p.headline.split('–')[0]), p)
    for (const a of p.aliases || []) m.set(norm(a), p)
  }
  return m
})()

export const getProjectByRow = (rowText) => titleMap.get(norm(rowText)) || null

// Sector tables can repeat a project name across sectors and clients
// ("Canteen Building" for both IOC and CPCL), so records are indexed by the
// full row identity rather than title alone.
const recordIndex = (() => {
  const m = new Map()
  for (const p of recordProjects) {
    m.set(`${p.categorySlug}||${norm(p.title)}||${norm(p.client || '')}`, p)
  }
  return m
})()

/** Resolve a sector-table row to its page: case study if one exists, else record. */
export const getProjectForRow = (categorySlug, project, client) =>
  getProjectByRow(project) ||
  recordIndex.get(`${categorySlug}||${norm(project)}||${norm(client || '')}`) ||
  null
