export const playClickSound = () => {
  try {
    // The sound file is in the public directory
    const audio = new Audio('/sounds/attibute_click.mp3');
    audio.play();
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};