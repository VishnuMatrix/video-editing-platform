import { useEffect, useState } from 'react';
import Navbar from "../../components/navbar/Navbar";
import Hero from "./sections/Hero";
import Showcase from "./sections/Showcase";
import Footer from "../../components/footer/Footer";
import { DEFAULT_ARCHIVE_VIDEOS, DEFAULT_FRAME_IMAGES, DEFAULT_GALLERY_VIDEOS, DEFAULT_HERO_VIDEO } from "../../data/homepageVideos";
import { subscribeToHomepageContent } from "../../services/firestore/homepage";
import FloatingBookingButton from "../../components/common/FloatingBookingButton";

function Home() {
  const [homepageVideos, setHomepageVideos] = useState({
    heroVideo: DEFAULT_HERO_VIDEO,
    frameImages: DEFAULT_FRAME_IMAGES,
    galleryVideos: DEFAULT_GALLERY_VIDEOS,
    archiveVideos: DEFAULT_ARCHIVE_VIDEOS,
  });

  useEffect(() => subscribeToHomepageContent((content) => {
    if (!content) return;
    setHomepageVideos((current) => ({
      heroVideo: content.heroVideo || current.heroVideo,
      frameImages: Array.isArray(content.frameImages) && content.frameImages.length ? content.frameImages : current.frameImages,
      galleryVideos: Array.isArray(content.galleryVideos) ? content.galleryVideos : current.galleryVideos,
      archiveVideos: Array.isArray(content.archiveVideos) ? content.archiveVideos : current.archiveVideos,
    }));
  }, (error) => console.error('Failed to load homepage video content:', error)), []);

  return (
    <main className="home-page">
      <Navbar />
      <Hero videoSrc={homepageVideos.heroVideo} />
      <Showcase
        galleryVideos={homepageVideos.galleryVideos}
        archiveVideos={homepageVideos.archiveVideos}
        frameImages={homepageVideos.frameImages}
      />
      <Footer />
      <FloatingBookingButton/>
    </main>
  );
}

export default Home;
