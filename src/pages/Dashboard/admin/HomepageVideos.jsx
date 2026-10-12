import { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { DEFAULT_ARCHIVE_VIDEOS, DEFAULT_FRAME_IMAGES, DEFAULT_GALLERY_VIDEOS, DEFAULT_HERO_VIDEO } from '../../../data/homepageVideos';
import { getHomepageContent, saveHomepageContent } from '../../../services/firestore/homepage';
import { isCloudinaryConfigured, uploadToCloudinary } from '../../../services/cloudinary';

const navItems = [
  { label: 'Overview', path: '/dashboard/admin', key: 'overview' },
  { label: 'Clients', path: '/dashboard/admin/clients', key: 'clients' },
  { label: 'Projects', path: '/dashboard/admin/projects', key: 'projects' },
  { label: 'Project Reviews', path: '/dashboard/admin/reviews', key: 'reviews' },
  { label: 'Homepage Videos', path: '/dashboard/admin/homepage-videos', key: 'homepage' },
  { label: 'Profile', path: '/dashboard/admin/profile', key: 'profile' },
  { label: 'Settings', path: '/dashboard/admin/settings', key: 'settings' },
];

const initialContent = {
  heroVideo: DEFAULT_HERO_VIDEO,
  frameImages: DEFAULT_FRAME_IMAGES,
  galleryVideos: DEFAULT_GALLERY_VIDEOS,
  archiveVideos: DEFAULT_ARCHIVE_VIDEOS,
};

const isValidMediaPath = (value) => {
  if (!value.trim()) return false;
  if (value.startsWith('/')) return !value.startsWith('//');
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
};

const makeId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

function CloudinaryUploadButton({ resourceType, onUploaded }) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    setIsUploading(true);
    setError('');
    try {
      const secureUrl = await uploadToCloudinary(file, resourceType);
      onUploaded(secureUrl);
    } catch (uploadError) {
      setError(uploadError.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="cloudinary-upload-control">
      <label className={`cloudinary-upload-button ${isUploading ? 'is-disabled' : ''}`}>
        <input
          type="file"
          accept={resourceType === 'video' ? 'video/*' : 'image/*'}
          onChange={handleFileChange}
          disabled={isUploading}
        />
        <span aria-hidden="true">↑</span>
        {isUploading ? 'Uploading...' : `Upload ${resourceType}`}
      </label>
      {error && <span className="cloudinary-upload-error" role="alert">{error}</span>}
    </div>
  );
}

function VideoEditorSection({ title, description, videos, type, onChange }) {
  const isArchive = type === 'archive';
  const updateVideo = (id, field, value) => {
    onChange(videos.map((video) => (video.id === id ? { ...video, [field]: value } : video)));
  };

  const moveVideo = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= videos.length) return;
    const reordered = [...videos];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    onChange(reordered);
  };

  const addVideo = () => {
    const item = isArchive
      ? { id: makeId('archive'), index: String(videos.length + 1).padStart(2, '0'), title: 'NEW PROJECT', subtitle: 'STUDIO FILM', tag: 'FEATURED', src: '' }
      : { id: makeId('gallery'), video: '', poster: '', category: 'VIDEO EDITING', title: 'New project' };
    onChange([...videos, item]);
  };

  return (
    <section className="section-card homepage-video-section">
      <div className="homepage-video-section-head">
        <div>
          <span className="profile-eyebrow">{isArchive ? '02 / ARCHIVE CAROUSEL' : '01 / SELECTED WORK'}</span>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <span className="homepage-video-count">{String(videos.length).padStart(2, '0')} ITEMS</span>
      </div>

      {videos.length ? (
        <div className="homepage-video-list">
          {videos.map((video, index) => (
            <article className="homepage-video-editor" key={video.id}>
              <div className="homepage-video-editor-top">
                <span className="homepage-video-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="homepage-video-reorder" aria-label={`Reorder ${video.title || 'video'}`}>
                  <button type="button" onClick={() => moveVideo(index, -1)} disabled={index === 0} aria-label="Move video up">↑</button>
                  <button type="button" onClick={() => moveVideo(index, 1)} disabled={index === videos.length - 1} aria-label="Move video down">↓</button>
                </div>
                <button
                  className="homepage-video-remove"
                  type="button"
                  onClick={() => onChange(videos.filter((item) => item.id !== video.id))}
                >
                  Remove
                </button>
              </div>

              <div className="homepage-video-editor-grid">
                <div className="homepage-video-preview">
                  {video[isArchive ? 'src' : 'video'] ? (
                    <video
                      src={video[isArchive ? 'src' : 'video']}
                      poster={!isArchive ? video.poster || undefined : undefined}
                      controls
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <span>ADD A VIDEO URL TO PREVIEW</span>
                  )}
                </div>

                <div className="homepage-video-fields">
                  <div className="dashboard-form-grid">
                    <div className="form-field">
                      <label htmlFor={`${video.id}-title`}>Project title</label>
                      <input id={`${video.id}-title`} className="form-input" value={video.title || ''} onChange={(event) => updateVideo(video.id, 'title', event.target.value)} maxLength={80} />
                    </div>
                    <div className="form-field">
                      <label htmlFor={`${video.id}-${isArchive ? 'tag' : 'category'}`}>{isArchive ? 'Archive tag' : 'Category'}</label>
                      <input
                        id={`${video.id}-${isArchive ? 'tag' : 'category'}`}
                        className="form-input"
                        value={video[isArchive ? 'tag' : 'category'] || ''}
                        onChange={(event) => updateVideo(video.id, isArchive ? 'tag' : 'category', event.target.value)}
                        maxLength={40}
                      />
                    </div>
                  </div>
                  {isArchive ? (
                    <div className="form-field">
                      <label htmlFor={`${video.id}-subtitle`}>Subtitle / client</label>
                      <input id={`${video.id}-subtitle`} className="form-input" value={video.subtitle || ''} onChange={(event) => updateVideo(video.id, 'subtitle', event.target.value)} maxLength={60} />
                    </div>
                  ) : (
                    <div className="form-field">
                      <label htmlFor={`${video.id}-poster`}>Poster image URL (optional)</label>
                      <input id={`${video.id}-poster`} className="form-input" value={video.poster || ''} onChange={(event) => updateVideo(video.id, 'poster', event.target.value)} placeholder="/images/poster.jpg or https://..." />
                      <CloudinaryUploadButton resourceType="image" onUploaded={(url) => updateVideo(video.id, 'poster', url)} />
                    </div>
                  )}
                  <div className="form-field">
                    <label htmlFor={`${video.id}-source`}>Video URL</label>
                    <input
                      id={`${video.id}-source`}
                      className="form-input"
                      value={video[isArchive ? 'src' : 'video'] || ''}
                      onChange={(event) => updateVideo(video.id, isArchive ? 'src' : 'video', event.target.value)}
                      placeholder="/videos/demo.mp4 or https://..."
                    />
                    <CloudinaryUploadButton resourceType="video" onUploaded={(url) => updateVideo(video.id, isArchive ? 'src' : 'video', url)} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="homepage-video-empty">No videos in this section. Add a video to show work on the homepage.</div>
      )}

      <button className="homepage-video-add" type="button" onClick={addVideo}><span aria-hidden="true">＋</span> Add video</button>
    </section>
  );
}

function FrameImageEditor({ images, onChange }) {
  const updateImage = (id, image) => {
    onChange(images.map((item) => (item.id === id ? { ...item, image } : item)));
  };

  const moveImage = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const nextImages = [...images];
    [nextImages[index], nextImages[target]] = [nextImages[target], nextImages[index]];
    onChange(nextImages);
  };

  return (
    <section className="section-card homepage-video-section">
      <div className="homepage-video-section-head">
        <div>
          <span className="profile-eyebrow">01 / FRAME VIEWER</span>
          <h3>Frame images</h3>
          <p>Upload and arrange the still images displayed in the homepage frame viewer.</p>
        </div>
        <span className="homepage-video-count">{String(images.length).padStart(2, '0')} IMAGES</span>
      </div>
      <div className="homepage-frame-image-list">
        {images.map((item, index) => (
          <article className="homepage-frame-image-editor" key={item.id}>
            <div className="homepage-frame-image-preview">
              {item.image ? <img src={item.image} alt={`Frame ${index + 1} preview`} /> : <span>UPLOAD AN IMAGE</span>}
            </div>
            <div className="homepage-frame-image-controls">
              <span className="homepage-video-index">FRAME {String(index + 1).padStart(2, '0')}</span>
              <div className="homepage-video-reorder">
                <button type="button" onClick={() => moveImage(index, -1)} disabled={index === 0} aria-label="Move image up">↑</button>
                <button type="button" onClick={() => moveImage(index, 1)} disabled={index === images.length - 1} aria-label="Move image down">↓</button>
              </div>
              <button
                className="homepage-video-remove"
                type="button"
                disabled={images.length <= 1}
                onClick={() => onChange(images.filter((image) => image.id !== item.id))}
              >
                Remove
              </button>
              <div className="form-field">
                <label htmlFor={`${item.id}-image`}>Image URL</label>
                <input id={`${item.id}-image`} className="form-input" value={item.image || ''} onChange={(event) => updateImage(item.id, event.target.value)} placeholder="Cloudinary URL or local path" />
                <CloudinaryUploadButton resourceType="image" onUploaded={(url) => updateImage(item.id, url)} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <button className="homepage-video-add" type="button" onClick={() => onChange([...images, { id: makeId('frame-image'), image: '' }])}>
        <span aria-hidden="true">＋</span> Add frame image
      </button>
    </section>
  );
}

export default function HomepageVideos() {
  const [content, setContent] = useState(initialContent);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    let isCurrent = true;
    getHomepageContent()
      .then((saved) => {
        if (!isCurrent || !saved) return;
        setContent({
          heroVideo: saved.heroVideo || DEFAULT_HERO_VIDEO,
          frameImages: Array.isArray(saved.frameImages) && saved.frameImages.length ? saved.frameImages : DEFAULT_FRAME_IMAGES,
          galleryVideos: Array.isArray(saved.galleryVideos) ? saved.galleryVideos : DEFAULT_GALLERY_VIDEOS,
          archiveVideos: Array.isArray(saved.archiveVideos) ? saved.archiveVideos : DEFAULT_ARCHIVE_VIDEOS,
        });
      })
      .catch((loadError) => {
        console.error('Failed to load homepage video content:', loadError);
        if (isCurrent) setError('Saved homepage videos could not be loaded. Defaults are shown.');
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const handleSave = async () => {
    setError('');
    setSuccess('');
    const allVideos = [...content.galleryVideos, ...content.archiveVideos];
    if (!isValidMediaPath(content.heroVideo)) {
      setError('Add a valid local path or http(s) URL for the hero background video.');
      return;
    }
    const incomplete = allVideos.find((video) => (
      !video.title?.trim() || !isValidMediaPath(video.video || video.src || '')
    ));
    if (incomplete) {
      setError('Every video needs a title and a valid local path or http(s) video URL.');
      return;
    }
    const invalidPoster = content.galleryVideos.some((video) => (
      video.poster && !isValidMediaPath(video.poster)
    ));
    if (invalidPoster) {
      setError('Poster images must use a local path or an http(s) URL.');
      return;
    }
    if (!content.frameImages.length || content.frameImages.some((item) => !isValidMediaPath(item.image || ''))) {
      setError('Every frame image needs a valid local path or http(s) image URL.');
      return;
    }

    const galleryVideos = content.galleryVideos.map((video, index) => ({
      ...video,
      id: video.id || makeId('gallery'),
      number: String(index + 1).padStart(2, '0'),
    }));
    const archiveVideos = content.archiveVideos.map((video, index) => ({
      ...video,
      id: video.id || makeId('archive'),
      index: String(index + 1).padStart(2, '0'),
    }));

    setIsSaving(true);
    try {
      await saveHomepageContent({ heroVideo: content.heroVideo, frameImages: content.frameImages, galleryVideos, archiveVideos });
      setContent({ heroVideo: content.heroVideo, frameImages: content.frameImages, galleryVideos, archiveVideos });
      setSuccess('Homepage video selections are live.');
    } catch (saveError) {
      console.error('Failed to publish homepage videos:', saveError);
      setError('Homepage videos could not be saved. Check your admin access and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout
      role="admin"
      title="Homepage videos"
      description="Curate the selected-work slider and the studio archive."
      navItems={navItems}
    >
      <section className="homepage-video-hero">
        <div>
          <span className="profile-eyebrow">FRONT PAGE / VIDEO CURATION</span>
          <h2>Put the best work in motion.</h2>
          <p>Edit the titles, categories, media links, posters, and order seen by every homepage visitor.</p>
        </div>
        <button className="form-submit-btn homepage-publish-button" type="button" onClick={handleSave} disabled={isSaving || isLoading}>
          {isSaving ? 'Publishing...' : 'Publish changes'}
        </button>
      </section>

      <section className="section-card homepage-hero-video-card">
        <div className="homepage-video-section-head">
          <div>
            <span className="profile-eyebrow">00 / HERO BACKGROUND</span>
            <h3>Opening frame</h3>
            <p>The full-width background video at the top of the homepage.</p>
          </div>
        </div>
        <div className="homepage-hero-video-grid">
          <div className="homepage-video-preview homepage-hero-preview">
            {content.heroVideo ? (
              <video src={content.heroVideo} controls muted playsInline preload="metadata" />
            ) : (
              <span>ADD A VIDEO URL TO PREVIEW</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="homepage-hero-video">Hero video URL</label>
            <input
              id="homepage-hero-video"
              className="form-input"
              value={content.heroVideo}
              onChange={(event) => {
                setContent((current) => ({ ...current, heroVideo: event.target.value }));
                setSuccess('');
              }}
              placeholder="/videos/hero.mp4 or https://..."
            />
            <CloudinaryUploadButton resourceType="video" onUploaded={(url) => {
              setContent((current) => ({ ...current, heroVideo: url }));
              setSuccess('');
            }} />
            <span className="homepage-video-help">Accepts a site path or a public http(s) video URL.</span>
          </div>
        </div>
      </section>

      {isLoading && <p className="homepage-editor-state">Loading saved homepage content...</p>}
      {error && <p className="form-error homepage-editor-message" role="alert">{error}</p>}
      {success && <p className="form-success homepage-editor-message" role="status">{success}</p>}

      {!isCloudinaryConfigured && (
        <div className="cloudinary-setup-message" role="status">
          Cloudinary uploads are not configured yet. Set <code>VITE_CLOUDINARY_CLOUD_NAME</code> and <code>VITE_CLOUDINARY_UPLOAD_PRESET</code> to enable uploads; URL editing remains available.
        </div>
      )}

      <FrameImageEditor
        images={content.frameImages}
        onChange={(frameImages) => {
          setContent((current) => ({ ...current, frameImages }));
          setSuccess('');
        }}
      />

      <VideoEditorSection
        title="Selected work slider"
        description="These video cards appear in the horizontal work gallery."
        videos={content.galleryVideos}
        type="gallery"
        onChange={(galleryVideos) => {
          setContent((current) => ({ ...current, galleryVideos }));
          setSuccess('');
        }}
      />
      <VideoEditorSection
        title="Studio archive carousel"
        description="These projects appear in the rotating archive carousel."
        videos={content.archiveVideos}
        type="archive"
        onChange={(archiveVideos) => {
          setContent((current) => ({ ...current, archiveVideos }));
          setSuccess('');
        }}
      />
    </DashboardLayout>
  );
}
