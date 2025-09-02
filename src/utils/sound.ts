export const playClickSound = () => {
  const audio = new Audio('/attibute_click.mp3');
  audio.play().catch(error => {
    console.log("Sound play was prevented by the browser:", error);
  });
};