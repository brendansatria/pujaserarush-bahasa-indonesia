import { useCallback } from 'react';

// Instance audio tunggal untuk menghindari pembuatan beberapa elemen audio
let audioInstance: HTMLAudioElement | null = null;

const getAudioInstance = (soundSrc: string) => {
  if (typeof window === 'undefined') {
    return null;
  }
  if (!audioInstance) {
    audioInstance = new Audio(soundSrc);
    audioInstance.preload = 'auto';
  }
  return audioInstance;
};

export const useClickSound = (soundSrc: string = '/attribute_click.mp3') => {
  const playSound = useCallback(() => {
    const audio = getAudioInstance(soundSrc);
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(error => {
        console.warn(`Pemutaran audio gagal untuk ${soundSrc}:`, error);
      });
    }
  }, [soundSrc]);

  return playSound;
};