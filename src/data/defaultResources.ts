import { EducationalResource } from '../types/resource';

export const defaultResources: EducationalResource[] = [
  {
    id: 'clinical-evaluation',
    title: 'Preparing for a professional evaluation',
    description:
      'Learn what kinds of notes, examples, and life history details may be useful when speaking with a qualified professional.',
    source: 'Spiral Spectrum',
    url: 'https://www.cdc.gov/autism/signs-symptoms/index.html',
  },
  {
    id: 'screening-vs-diagnosis',
    title: 'Screening is not the same as diagnosis',
    description:
      'Understand the difference between personal reflection tools, screening questionnaires, and formal clinical assessment.',
    source: 'Spiral Spectrum',
    url: 'https://www.nimh.nih.gov/health/topics/autism-spectrum-disorders-asd',
  },
  {
    id: 'support-needs',
    title: 'Thinking about support needs',
    description:
      'A result can be more useful when paired with real examples of sensory, social, communication, or routine-related needs.',
    source: 'Spiral Spectrum',
    url: 'https://autisticadvocacy.org/resources/',
  },
  {
    id: 'self-advocacy',
    title: 'Self-advocacy and accommodations',
    description:
      'Explore how people describe their needs, request support, and build environments that work better for them.',
    source: 'Spiral Spectrum',
    url: 'https://askjan.org/disabilities/Autism-Spectrum.cfm',
  },
];