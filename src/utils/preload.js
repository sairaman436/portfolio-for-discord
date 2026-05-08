export const preloadImages = (urls, onProgress, priorityCount = 200) => {
  let loadedCount = 0;
  const total = urls.length;
  const images = [];
  let priorityResolved = false;

  return new Promise((resolve) => {
    const checkCompletion = () => {
      if (!priorityResolved && loadedCount >= priorityCount) {
        priorityResolved = true;
        resolve({ images, allLoaded: false });
      }
      if (loadedCount === total) {
        resolve({ images, allLoaded: true });
      }
    };

    urls.forEach((url, index) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        onProgress(Math.floor((loadedCount / total) * 100), loadedCount);
        images[index] = img;
        checkCompletion();
      };
      img.onerror = () => {
        loadedCount++;
        onProgress(Math.floor((loadedCount / total) * 100), loadedCount);
        console.error(`Failed to load image: ${url}`);
        checkCompletion();
      };
    });
  });
};

export const getFrameUrl = (index) => {
  const pad = String(index).padStart(5, '0');
  return `/frames_1778240314947/frame_${pad}.jpg`;
};

export const TOTAL_FRAMES = 881;
