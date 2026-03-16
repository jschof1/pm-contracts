const projectOne = new URL('../assets/pm-contracts/image0.webp', import.meta.url).href;
const projectTwo = new URL('../assets/pm-contracts/image1.webp', import.meta.url).href;
const projectThree = new URL('../assets/pm-contracts/image10.webp', import.meta.url).href;
const projectFour = new URL('../assets/pm-contracts/image14.webp', import.meta.url).href;
const projectFive = new URL('../assets/pm-contracts/image21.webp', import.meta.url).href;
const projectSix = new URL('../assets/pm-contracts/image22.webp', import.meta.url).href;

export interface Project {
  title: string;
  slug: string;
  location: string;
  style: string;
  description: string;
  image: string;
  features: string[];
  gallery?: string[];
  beforeImage?: string;
  afterImage?: string;
  testimonial?: {
    text: string;
    author: string;
  };
}

export const projects: Project[] = [
  {
    title: 'Full Roof Replacement',
    slug: 'full-roof-replacement',
    location: 'Glasgow',
    style: 'Roof Replacement',
    description:
      'A full roof replacement completed for a Glasgow property where the existing roof had reached the end of its serviceable life.',
    image: projectOne,
    features: ['Full strip and re-cover', 'Weatherproof finish', 'Tidy site management', 'Clear staged communication'],
    afterImage: projectOne,
    beforeImage: projectTwo,
    testimonial: {
      text: "Peter talked us through the whole process clearly and the new roof has completely changed the look of the house.",
      author: "PM Contract customer, Glasgow"
    }
  },
  {
    title: 'Emergency Leak Repair',
    slug: 'emergency-leak-repair',
    location: 'Greenock',
    style: 'Emergency Roof Repair',
    description:
      'Rapid emergency roof work to make the property safe after an active leak and visible storm-related damage.',
    image: projectTwo,
    features: ['Urgent inspection', 'Temporary make-safe', 'Permanent repair follow-up', 'Fast communication'],
    beforeImage: projectThree,
    afterImage: projectTwo,
    testimonial: {
      text: "They got to us quickly, explained what had failed, and sorted the roof before the damage spread any further.",
      author: "PM Contract customer, Greenock"
    }
  },
  {
    title: 'Leadwork and Chimney Repair',
    slug: 'leadwork-and-chimney-repair',
    location: 'Paisley',
    style: 'Leadwork',
    description:
      'A roofing repair package combining chimney attention and leadwork updates to stop recurring water ingress.',
    image: projectThree,
    features: ['Lead flashing work', 'Chimney detail repairs', 'Leak prevention', 'Roofline improvement'],
    beforeImage: projectFour,
    afterImage: projectThree,
    testimonial: {
      text: "We had ongoing problems around the chimney and they fixed the issue properly rather than patching over it.",
      author: "PM Contract customer, Paisley"
    }
  },
  {
    title: 'Roofline and Gutter Upgrade',
    slug: 'roofline-and-gutter-upgrade',
    location: 'Cumbernauld',
    style: 'UPVC Gutters',
    description:
      'Replacement guttering and roofline improvement work completed to improve drainage and refresh the frontage of the property.',
    image: projectFive,
    features: ['New guttering', 'Improved drainage', 'Cleaner roofline finish', 'Exterior refresh'],
    beforeImage: projectSix,
    afterImage: projectFive,
    testimonial: {
      text: "The house looks smarter and the water now runs away properly. Really easy team to deal with.",
      author: "PM Contract customer, Cumbernauld"
    }
  }
];

export const getProjectData = (slug: string): Project | undefined => {
  return projects.find(p => p.slug === slug);
};
