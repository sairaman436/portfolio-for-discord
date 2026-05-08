import { useEffect } from 'react';

const AntiScrape = () => {
  useEffect(() => {
    // ─── Console Warning ───
    const warningStyle = 'color: #FF4444; font-size: 20px; font-weight: bold;';
    const infoStyle = 'color: #5865F2; font-size: 14px;';
    console.log('%c⚠ STOP!', warningStyle);
    console.log('%cThis browser feature is intended for developers.', infoStyle);
    console.log('%cIf someone told you to copy-paste something here, it is a scam.', infoStyle);
    console.log('%c© AXZR — All content is protected.', 'color: #949BA4; font-size: 11px;');

    // ─── Block Right Click ───
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // ─── Block Dev Tools & Source View Shortcuts ───
    const handleKeyDown = (e) => {
      // F12
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }

      // Ctrl+Shift+I (Inspect), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element picker)
      if (e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key)) {
        e.preventDefault();
        return false;
      }

      // Ctrl+U (View Source)
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+S (Save Page)
      if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+A (Select All)
      if (e.ctrlKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+C (Copy)
      if (e.ctrlKey && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        return false;
      }

      // Ctrl+P (Print)
      if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        return false;
      }
    };

    // ─── Block Drag ───
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // ─── Block Copy ───
    const handleCopy = (e) => {
      e.preventDefault();
      return false;
    };

    // ─── Block Cut ───
    const handleCut = (e) => {
      e.preventDefault();
      return false;
    };

    // ─── DevTools Detection (basic) ───
    let devToolsOpen = false;
    const detectDevTools = () => {
      const threshold = 160;
      const widthDiff = window.outerWidth - window.innerWidth > threshold;
      const heightDiff = window.outerHeight - window.innerHeight > threshold;

      if (widthDiff || heightDiff) {
        if (!devToolsOpen) {
          devToolsOpen = true;
          document.body.classList.add('devtools-open');
        }
      } else {
        if (devToolsOpen) {
          devToolsOpen = false;
          document.body.classList.remove('devtools-open');
        }
      }
    };

    const devToolsInterval = setInterval(detectDevTools, 1000);

    // ─── Attach Listeners ───
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCut);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCut);
      clearInterval(devToolsInterval);
      document.body.classList.remove('devtools-open');
    };
  }, []);

  return null; // No UI — pure behavior shield
};

export default AntiScrape;
