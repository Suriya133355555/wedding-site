export interface GalleryPhoto {
  src: string
  title: string
  caption: string
  tag: string
  aspectRatio: 'landscape' | 'portrait' | 'square'
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: '/gallery/courtyard.webp',
    title: 'The Heritage Courtyard',
    caption: 'Adorned with fragrant marigold garlands and ancestral brass lanterns in the golden morning light.',
    tag: 'HERITAGE COURTYARD',
    aspectRatio: 'landscape',
  },
  {
    src: '/gallery/hands.webp',
    title: 'Sacred Promise',
    caption: 'Intertwined hands adorned in champagne silk, heirloom gold bangles, and auspicious turmeric blessings.',
    tag: 'THE SACRED VOW',
    aspectRatio: 'portrait',
  },
  {
    src: '/gallery/temple.webp',
    title: 'Sanctum Auspices',
    caption: 'Under the towering Dravidian temple gopuram, surrounded by centuries of sacred rituals and prayers.',
    tag: 'DRAVIDIAN HERITAGE',
    aspectRatio: 'portrait',
  },
  {
    src: '/gallery/garlands.webp',
    title: 'Maalai Maatral',
    caption: 'Vibrant wedding garlands woven with fresh jasmine, lotus petals, and deep crimson roses.',
    tag: 'GARLAND EXCHANGE',
    aspectRatio: 'landscape',
  },
  {
    src: '/gallery/mehendi.webp',
    title: 'Henna Whispers',
    caption: 'Delicate botanical patterns woven across hands, accompanied by familiar songs and soft laughter.',
    tag: 'MEHENDI AFTERNOON',
    aspectRatio: 'square',
  },
  {
    src: '/gallery/lamps.webp',
    title: 'Kutthu Vilakku',
    caption: 'The warm, timeless glow of traditional brass oil lamps dispelling darkness and welcoming prosperity.',
    tag: 'SACRED LIGHT',
    aspectRatio: 'square',
  },
  {
    src: '/gallery/sangeet.webp',
    title: 'Melodies of Joy',
    caption: 'An unforgettable evening of rhythm, music, and two families stepping into forever with dancing shoes.',
    tag: 'SANGEET CELEBRATION',
    aspectRatio: 'landscape',
  },
  {
    src: '/gallery/car.webp',
    title: 'The Journey Begins',
    caption: 'The vintage celebration car draped in fresh jasmine buds, arriving for the grand baraat.',
    tag: 'THE PROCESSION',
    aspectRatio: 'portrait',
  },
]
