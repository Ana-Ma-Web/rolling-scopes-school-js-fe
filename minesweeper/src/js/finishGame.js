import soundAudio from "./soundAudio";

const finishGame = (isWin, isSoundOn) => {
  if (isWin) {
    soundAudio("win", isSoundOn);
  } else {
    soundAudio("expl", isSoundOn);
  }
};

export default finishGame;
