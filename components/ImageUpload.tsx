import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  projectId: string | number;
  section?: string;
  onUpload: (url: string) => void;
  currentImage?: string;
  className?: string;
}

export default function ImageUpload({ projectId, section, onUpload, currentImage, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentImage);
  const [error, setError] = useState('');

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset state
    setError('');
    setIsUploading(true);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId.toString());
    if (section) {
      formData.append('section', section);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onUpload(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setPreviewUrl(currentImage); // Revert to current image
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className={`relative aspect-video border-2 border-dashed rounded-lg overflow-hidden
          ${isUploading ? 'opacity-50' : ''} 
          ${error ? 'border-red-500' : 'border-gray-300'}`}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm opacity-50">
              {isUploading ? 'Uploading...' : 'Click to upload image'}
            </p>
          </div>
        )}
        
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleUpload}
          disabled={isUploading}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
