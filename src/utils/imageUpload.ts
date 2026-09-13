/**
 * Image processing utilities for client-side compression and direct photo uploads
 */

export const processImageFile = (file: File, maxDim = 1200, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(e.target?.result as string);
        }
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const processMultipleImageFiles = async (files: FileList | File[]): Promise<string[]> => {
  const fileArray = Array.from(files);
  const results: string[] = [];
  for (const file of fileArray) {
    if (file.type.startsWith('image/')) {
      try {
        const dataUrl = await processImageFile(file);
        results.push(dataUrl);
      } catch (err) {
        console.error('Error processing image:', err);
      }
    }
  }
  return results;
};
