export const playClickSound = () => {
  try {
    // Using a direct absolute path to the asset in the public folder.
    const audio = new Audio('/sounds/attribute_click.mp3');
    
    // play() returns a promise which can be rejected.
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error("Error playing audio:", error);
      });
    }
  } catch (error) {
    console.error("Error creating or playing sound:", error);
  }
};