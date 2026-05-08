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
  const concurrency = 20; // parallel downloads at once

  return new Promise((resolve) => {
    let currentIndex = 0;

    const loadNext = () => {
      if (currentIndex >= total) return;

      const index = currentIndex++;
      const img = new Image();

      const onDone = () => {
        loadedCount++;
        if (onProgress) onProgress(Math.floor((loadedCount / total) * 100), loadedCount, images[index], index);

        // Early resolve — show site while rest loads in background
        if (!earlyResolved && loadedCount >= earlyResolveCount) {
          earlyResolved = true;
          resolve({ images, allLoaded: false });
        }

        // All done
        if (loadedCount === total) {
          if (!earlyResolved) resolve({ images, allLoaded: true });
        }

        // Start next download
        loadNext();
      };

      img.onload = () => {
        if ('decode' in img) {
          img.decode().then(() => {
            images[index] = img;
            onDone();
          }).catch(() => {
            images[index] = img;
            onDone();
          });
        } else {
          images[index] = img;
          onDone();
        }
      };

      img.onerror = () => {
        console.error(`Failed to load: ${urls[index]}`);
        onDone();
      };

      img.src = urls[index];
    };

    // Kick off initial batch
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
