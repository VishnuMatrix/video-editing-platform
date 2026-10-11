const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const isCloudinaryConfigured = Boolean(cloudName && uploadPreset);

export async function uploadToCloudinary(file, resourceType) {
  if (!isCloudinaryConfigured) {
    throw new Error('Cloudinary is not configured. Add the cloud name and unsigned upload preset to your environment.');
  }

  if (!file) throw new Error('Choose a file before uploading.');
  if (!['image', 'video'].includes(resourceType)) throw new Error('Unsupported media type.');

  const maxBytes = resourceType === 'video' ? 100 * 1024 * 1024 : 20 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(`Choose a ${resourceType} smaller than ${resourceType === 'video' ? '100 MB' : '20 MB'}.`);
  }

  const expectedType = resourceType === 'image' ? 'image/' : 'video/';
  if (!file.type.startsWith(expectedType)) {
    throw new Error(`Choose a ${resourceType} file to upload.`);
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: 'POST',
    body: formData,
  });
  const result = await response.json();

  if (!response.ok || !result.secure_url) {
    throw new Error(result.error?.message || 'Cloudinary could not upload this file.');
  }

  return result.secure_url;
}
