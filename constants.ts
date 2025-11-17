
import { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate-grey',
    name: 'Corporate Grey',
    prompt: 'A professional corporate headshot with a clean, solid light grey backdrop. The lighting should be soft and even, creating a friendly yet professional look.',
    imageUrl: 'https://picsum.photos/seed/corporate/300/200',
  },
  {
    id: 'tech-office',
    name: 'Modern Tech Office',
    prompt: 'A professional headshot set in a modern tech office environment. The background should be slightly blurred (bokeh effect) showing a contemporary workspace with glass walls and minimalist furniture.',
    imageUrl: 'https://picsum.photos/seed/tech/300/200',
  },
  {
    id: 'outdoor-natural',
    name: 'Outdoor Natural Light',
    prompt: 'A professional headshot taken outdoors with natural lighting. The background should be a pleasant, out-of-focus natural setting like a park or modern architecture. The lighting should be warm and flattering.',
    imageUrl: 'https://picsum.photos/seed/outdoor/300/200',
  },
  {
    id: 'studio-dramatic',
    name: 'Studio Dramatic',
    prompt: 'A dramatic studio headshot with a dark, textured backdrop. Use chiaroscuro lighting to create strong contrasts, highlighting facial features for a powerful and confident look.',
    imageUrl: 'https://picsum.photos/seed/studio/300/200'
  }
];
