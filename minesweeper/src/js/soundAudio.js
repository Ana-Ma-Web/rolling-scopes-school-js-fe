import win from "./../assets/sounds/win.mp3";
import o11 from "./../assets/sounds/11.mp3";
import o01 from "./../assets/sounds/01.mp3";
import o02 from "./../assets/sounds/02.mp3";
import o03 from "./../assets/sounds/03.mp3";
import o04 from "./../assets/sounds/04.mp3";
import o05 from "./../assets/sounds/05.mp3";
import o06 from "./../assets/sounds/06.mp3";
import o07 from "./../assets/sounds/07.mp3";
import o08 from "./../assets/sounds/08.mp3";
import o09 from "./../assets/sounds/09.mp3";
import o10 from "./../assets/sounds/10.mp3";
import e01 from "./../assets/sounds/e01.mp3";
import e02 from "./../assets/sounds/e02.mp3";
import e03 from "./../assets/sounds/e03.mp3";
import e04 from "./../assets/sounds/e04.mp3";
import e05 from "./../assets/sounds/e05.mp3";
import e06 from "./../assets/sounds/e06.mp3";
import e07 from "./../assets/sounds/e07.mp3";
import e08 from "./../assets/sounds/e08.mp3";
import e09 from "./../assets/sounds/e09.mp3";

const soundAudio = (soundType, isSoundOn) => {
  if (isSoundOn) {
    if (!soundType) {
      const openCellSounds = [
        o01,
        o02,
        o03,
        o04,
        o05,
        o06,
        o07,
        o08,
        o09,
        o10,
        o11,
      ];
      let audio = new Audio();
      const index = Math.floor(Math.random() * 10);
      audio.src = openCellSounds[index];
      audio.autoplay = true;
    } else if (soundType === "lose") {
      const explCellSounds = [e01, e02, e03, e04, e05, e06, e07, e08, e09];
      const index = Math.floor(Math.random() * 9);
      let audio = new Audio();
      audio.src = explCellSounds[index];
      audio.autoplay = true;
    } else if (soundType === "win") {
      let audio = new Audio();
      audio.src = win;
      audio.autoplay = true;
    }
  }
};
export default soundAudio;
