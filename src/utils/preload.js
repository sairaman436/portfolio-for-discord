/**
 * Batch-load images in controlled concurrency to avoid 
 * overwhelming the browser's connection pool (max ~6 per domain).
 * 
 * Loads in parallel batches of `concurrency` images at a time.
 * Resolves early after `earlyResolveCount` frames so the site 
 * can display while remaining frames load in background.
 */
export const preloadImages = (urls, onProgress, earlyResolveCount = 300) => {
  const total = urls.length;
  const images = new Array(total);
  let loadedCount = 0;
  let earlyResolved = false;
  const concurrency = 25; // Slightly increased concurrency for faster initial burst

  return new Promise((resolve) => {
    let currentIndex = 0;

    const loadNext = () => {
      if (currentIndex >= total) return;

      const item = urls[currentIndex++];
      const url = typeof item === 'string' ? item : item.url;
      const targetIndex = typeof item === 'string' ? (currentIndex - 1) : item.index;
      
      const img = new Image();

      const onDone = () => {
        loadedCount++;
        if (onProgress) onProgress(Math.floor((loadedCount / total) * 100), loadedCount, images[targetIndex], targetIndex);

        if (!earlyResolved && loadedCount >= earlyResolveCount) {
          earlyResolved = true;
          resolve({ images, allLoaded: false });
        }

        if (loadedCount === total) {
          if (!earlyResolved) resolve({ images, allLoaded: true });
        }

        loadNext();
      };

      img.onload = () => {
        if ('decode' in img) {
          img.decode().then(() => {
            images[targetIndex] = img;
            onDone();
          }).catch(() => {
            images[targetIndex] = img;
            onDone();
          });
        } else {
          images[targetIndex] = img;
          onDone();
        }
      };

      img.onerror = () => {
        console.error(`Failed to load: ${url}`);
        onDone();
      };

      img.src = url;
    };

    const initialBatch = Math.min(concurrency, total);
    for (let i = 0; i < initialBatch; i++) {
      loadNext();
    }
  });
};

export const getFrameUrl = (index) => {
  const pad = String(index).padStart(5, '0');
  return `/frames_881/frame_${pad}.webp`;
};

export const TOTAL_FRAMES = 888;
