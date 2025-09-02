export const playClickSound = () => {
  try {
    // Constructing the path with BASE_URL for robustness
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/attribute_click.mp3`);
    audio.play();
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};