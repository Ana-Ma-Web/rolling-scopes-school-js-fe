import expl from "./../assets/sounds/expl.mp3";
import win from "./../assets/sounds/win.mp3";
import a01 from "./../assets/sounds/01.mp3";
import a02 from "./../assets/sounds/02.mp3";
import a03 from "./../assets/sounds/03.mp3";
import a04 from "./../assets/sounds/04.mp3";
import a05 from "./../assets/sounds/05.mp3";
import a06 from "./../assets/sounds/06.mp3";
import a07 from "./../assets/sounds/07.mp3";
import a08 from "./../assets/sounds/08.mp3";
import a09 from "./../assets/sounds/09.mp3";
import a10 from "./../assets/sounds/10.mp3";
import a11 from "./../assets/sounds/11.mp3";

const soundAudio = (isOpen, isSoundOn) => {
  if (isSoundOn) {
    if (!isOpen) {
      const sounds = [a01, a02, a03, a04, a05, a06, a07, a08, a09, a10, a11];
      let audio = new Audio();
      const index = Math.floor(Math.random() * 11);
      audio.src = sounds[index];
      audio.autoplay = true;
    } else if (isOpen === "expl") {
      let audio = new Audio();
      audio.src = expl;
      audio.autoplay = true;
    } else if (isOpen === "win") {
      let audio = new Audio();
      audio.src = win;
      audio.autoplay = true;
    }
  }
};
export default soundAudio;
