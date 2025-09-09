import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Membuat satu instance audio untuk menjaga konsistensi di seluruh navigasi
let audioInstance: HTMLAudioElement | null = null;
if (typeof window !== 'undefined') {
    audioInstance = new Audio('/This is Elevator Music.mp3');
    audioInstance.loop = true;
    audioInstance.volume = 0.3; // Mengatur volume agar tidak terlalu keras
}

const BGMPlayer = () => {
  const location = useLocation();
  const hasPlayed = useRef(false);

  useEffect(() => {
    const playPaths = ['/how-to-play', '/pujasera-rush'];

    const canPlay = playPaths.includes(location.pathname);

    if (canPlay && audioInstance && !hasPlayed.current) {
      // Mencoba memutar audio. Ini mungkin memerlukan interaksi pengguna pertama kali.
      const playPromise = audioInstance.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          hasPlayed.current = true;
        }).catch(error => {
          console.warn("Pemutaran BGM gagal dimulai secara otomatis:", error);
          // Menambahkan event listener untuk memulai pada interaksi pengguna pertama jika pemutaran otomatis gagal
          const playOnFirstInteraction = () => {
            audioInstance?.play().then(() => {
              hasPlayed.current = true;
            });
            window.removeEventListener('click', playOnFirstInteraction);
            window.removeEventListener('keydown', playOnFirstInteraction);
          };
          window.addEventListener('click', playOnFirstInteraction, { once: true });
          window.addEventListener('keydown', playOnFirstInteraction, { once: true });
        });
      }
    } else if (!canPlay && audioInstance && hasPlayed.current) {
      // Menghentikan musik dan mereset untuk pemutaran di masa mendatang
      audioInstance.pause();
      audioInstance.currentTime = 0;
      hasPlayed.current = false;
    }
  }, [location.pathname]);

  return null; // Komponen ini tidak merender apa pun yang terlihat
};

export default BGMPlayer;