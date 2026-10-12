import img1 from '../assets/images/img1.png';
import img2 from '../assets/images/img2.png';
import archiveVideo from '../animations/video1.mp4';

export const DEFAULT_HERO_VIDEO = archiveVideo;
export const DEFAULT_FRAME_IMAGES = [
  { id: 'frame-image-1', image: img1 },
  { id: 'frame-image-2', image: img2 },
  { id: 'frame-image-3', image: img1 },
  { id: 'frame-image-4', image: img2 },
  { id: 'frame-image-5', image: img1 },
];

export const DEFAULT_GALLERY_VIDEOS = [
  { id: 'gallery-1', video: '/videos/video1.mp4', poster: img1, category: 'VIDEO EDITING', title: 'Creative Storytelling' },
  { id: 'gallery-2', video: '/videos/video2.mp4', poster: img2, category: 'MOTION DESIGN', title: 'Visual Identity' },
  { id: 'gallery-3', video: '/videos/video3.mp4', poster: img1, category: 'SHORT FORM', title: 'Social Content' },
  { id: 'gallery-4', video: '/videos/video4.mp4', poster: img2, category: 'CINEMATIC EDIT', title: 'Brand Film' },
  { id: 'gallery-5', video: '/videos/video5.mp4', poster: img1, category: 'REELS', title: 'Product Launch' },
];

export const DEFAULT_ARCHIVE_VIDEOS = [
  { id: 'archive-1', index: '01', title: 'ALLY', subtitle: 'NORTHLINE FILM', tag: 'NARRATIVE', src: archiveVideo },
  { id: 'archive-2', index: '02', title: 'SIGNAL / NOISE', subtitle: 'NORTHLINE FILM', tag: 'COMMERCIAL', src: archiveVideo },
  { id: 'archive-3', index: '03', title: 'VELOUR', subtitle: 'NORTHLINE FILM', tag: 'VFX', src: archiveVideo },
  { id: 'archive-4', index: '04', title: 'NOCTURNE', subtitle: 'NORTHLINE FILM', tag: 'NARRATIVE', src: archiveVideo },
  { id: 'archive-5', index: '05', title: 'OVERHEAD', subtitle: 'NORTHLINE FILM', tag: 'AUTOMOTIVE', src: archiveVideo },
  { id: 'archive-6', index: '06', title: 'FRAME', subtitle: 'NORTHLINE FILM', tag: 'EDITORIAL', src: archiveVideo },
  { id: 'archive-7', index: '07', title: 'BLOOM', subtitle: 'NORTHLINE FILM', tag: 'TITLE SEQUENCE', src: archiveVideo },
  { id: 'archive-8', index: '08', title: 'MERIDIAN', subtitle: 'NORTHLINE FILM', tag: 'COMMERCIAL', src: archiveVideo },
  { id: 'archive-9', index: '09', title: 'GRID CITY', subtitle: 'NORTHLINE FILM', tag: 'BRAND FILM', src: archiveVideo },
];
