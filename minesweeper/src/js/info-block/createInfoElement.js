import data from "../data/data";
import countTime from "./countTime";
import restCellsCount from "./restCellsCount";
import restMinesCount from "./restMinesCount";

const createInfoElement = () => {
  const info = document.createElement("div");
  info.classList.add("info");

  const infoButtons = document.createElement("div");
  infoButtons.classList.add("info__buttons");

  const infoList = document.createElement("div");
  infoList.classList.add("info__list");

  const btnVolume = document.createElement("button");
  btnVolume.classList.add("btn", "btn_line", "btn_volume");
  if (data.isSoundOn) btnVolume.classList.add("btn_active");

  const btnTheme = document.createElement("button");
  btnTheme.classList.add("btn", "btn_line", "btn_theme");
  if (!data.isDarkTheme) btnTheme.classList.add("btn_active");

  btnVolume.innerHTML = `<svg
  width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_di_1925_9)">
      <path
        class="path-bg"
        d="M2 16.0001H5.88889L11.1834 20.3319C11.2727 20.405 11.3846 20.4449 11.5 20.4449C11.7761 20.4449 12 20.2211 12 19.9449V4.05519C12 3.93977 11.9601 3.8279 11.887 3.73857C11.7121 3.52485 11.3971 3.49335 11.1834 3.66821L5.88889 8.00007H2C1.44772 8.00007 1 8.44778 1 9.00007V15.0001C1 15.5524 1.44772 16.0001 2 16.0001ZM23 12C23 14.957 21.8332 17.6416 19.9348 19.6184C19.5721 19.9961 18.974 19.9739 18.6037 19.6036V19.6036C18.1943 19.1943 18.225 18.5256 18.6174 18.1001C20.0965 16.4964 21 14.3537 21 12C21 9.64628 20.0965 7.5036 18.6174 5.89987C18.225 5.47433 18.1943 4.80572 18.6037 4.39637V4.39637C18.974 4.02603 19.5721 4.00389 19.9348 4.38162C21.8332 6.35834 23 9.0429 23 12ZM18 12C18 10.3984 17.3725 8.94335 16.3499 7.86735C16.0111 7.51087 15.4513 7.54875 15.1035 7.8965V7.8965C14.6764 8.3236 14.75 9.03336 15.127 9.50528C15.6733 10.1893 16 11.0565 16 12C16 12.9435 15.6733 13.8107 15.127 14.4947C14.75 14.9666 14.6764 15.6763 15.1035 16.1034V16.1034C15.4513 16.4512 16.0111 16.4891 16.3499 16.1326C17.3725 15.0566 18 13.6016 18 12Z"
        fill="#D6CFC7"
      />
      <path
        d="M5.92055 15.9614L5.90674 15.9501H5.88889H2C1.47533 15.9501 1.05 15.5248 1.05 15.0001V9.00007C1.05 8.47539 1.47533 8.05007 2 8.05007H5.88889H5.90674L5.92055 8.03877L11.2151 3.70691C11.4074 3.54954 11.6909 3.57788 11.8483 3.77023C11.9141 3.85062 11.95 3.9513 11.95 4.05519V19.9449C11.95 20.1935 11.7485 20.3949 11.5 20.3949C11.3961 20.3949 11.2954 20.359 11.2151 20.2932L11.1834 20.3319L11.2151 20.2932L5.92055 15.9614ZM22.95 12C22.95 14.9436 21.7886 17.6159 19.8988 19.5837C19.5573 19.9393 18.9915 19.9208 18.639 19.5683C18.2513 19.1805 18.2773 18.5426 18.6542 18.134C20.1415 16.5214 21.05 14.3667 21.05 12C21.05 9.63323 20.1415 7.47857 18.6542 5.86597C18.2773 5.45733 18.2513 4.8195 18.639 4.43172C18.9915 4.0792 19.5573 4.0607 19.8988 4.41626C21.7886 6.38404 22.95 9.05632 22.95 12ZM16.3137 7.9018C17.3278 8.96888 17.95 10.4117 17.95 12C17.95 13.5882 17.3278 15.0311 16.3137 16.0982C15.9975 16.4309 15.4702 16.3994 15.1389 16.0681C14.7356 15.6648 14.7992 14.9851 15.166 14.5259C15.7192 13.8334 16.05 12.9553 16.05 12C16.05 11.0447 15.7192 10.1666 15.166 9.47408C14.7992 9.01487 14.7356 8.33513 15.1389 7.93185C15.4702 7.60054 15.9975 7.56906 16.3137 7.9018Z"
        stroke="#79654E"
        stroke-opacity="0.7"
        stroke-width="0.1"
      />
    </g>
    <defs>
      <filter
        id="filter0_di_1925_9"
        x="0"
        y="3.55518"
        width="24"
        height="18.8897"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="0.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5127 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1925_9"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1925_9"
          result="shape"
        />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite
          in2="hardAlpha"
          operator="arithmetic"
          k2="-1"
          k3="1"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.47451 0 0 0 0 0.396078 0 0 0 0 0.305882 0 0 0 0.6 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_1925_9"
        />
      </filter>
    </defs>
  </svg>
  `;

  btnTheme.innerHTML = `<svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1935_15)">
      <g filter="url(#filter0_di_1935_15)">
        <path
          class="path-bg"
          d="M12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12C18 15.3137 15.3137 18 12 18ZM11 2C11 1.44772 11.4477 1 12 1V1C12.5523 1 13 1.44772 13 2V3C13 3.55228 12.5523 4 12 4V4C11.4477 4 11 3.55228 11 3V2ZM11 21C11 20.4477 11.4477 20 12 20V20C12.5523 20 13 20.4477 13 21V22C13 22.5523 12.5523 23 12 23V23C11.4477 23 11 22.5523 11 22V21ZM4.22183 5.63603C3.8313 5.24551 3.8313 4.61235 4.22182 4.22182V4.22182C4.61235 3.8313 5.24551 3.8313 5.63603 4.22183L6.34314 4.92894C6.73367 5.31946 6.73367 5.95262 6.34315 6.34315V6.34315C5.95262 6.73367 5.31946 6.73367 4.92894 6.34314L4.22183 5.63603ZM17.6568 19.0711C17.2663 18.6806 17.2663 18.0474 17.6568 17.6568V17.6568C18.0474 17.2663 18.6806 17.2663 19.0711 17.6568L19.7782 18.364C20.1687 18.7545 20.1687 19.3877 19.7782 19.7782V19.7782C19.3877 20.1687 18.7545 20.1687 18.364 19.7782L17.6568 19.0711ZM18.364 4.2218C18.7545 3.83129 19.3877 3.8313 19.7782 4.22182V4.22182C20.1687 4.61235 20.1687 5.24551 19.7782 5.63603L19.0711 6.34316C18.6806 6.73368 18.0474 6.73368 17.6569 6.34317V6.34317C17.2663 5.95265 17.2663 5.31944 17.6569 4.92891L18.364 4.2218ZM4.92891 17.6569C5.31944 17.2663 5.95265 17.2663 6.34317 17.6569V17.6569C6.73368 18.0474 6.73368 18.6806 6.34316 19.0711L5.63603 19.7782C5.24551 20.1687 4.61235 20.1687 4.22182 19.7782V19.7782C3.8313 19.3877 3.83129 18.7545 4.2218 18.364L4.92891 17.6569ZM22 11C22.5523 11 23 11.4477 23 12V12C23 12.5523 22.5523 13 22 13H21C20.4477 13 20 12.5523 20 12V12C20 11.4477 20.4477 11 21 11H22ZM3 11C3.55228 11 4 11.4477 4 12V12C4 12.5523 3.55228 13 3 13H2C1.44772 13 1 12.5523 1 12V12C1 11.4477 1.44772 11 2 11H3Z"
          fill="#D6CFC7"
        />
        <path
          d="M12 17.95C8.7139 17.95 6.05 15.2861 6.05 12C6.05 8.7139 8.7139 6.05 12 6.05C15.2861 6.05 17.95 8.7139 17.95 12C17.95 15.2861 15.2861 17.95 12 17.95ZM12.95 2V3C12.95 3.52467 12.5247 3.95 12 3.95C11.4753 3.95 11.05 3.52467 11.05 3V2C11.05 1.47533 11.4753 1.05 12 1.05C12.5247 1.05 12.95 1.47533 12.95 2ZM12.95 21V22C12.95 22.5247 12.5247 22.95 12 22.95C11.4753 22.95 11.05 22.5247 11.05 22V21C11.05 20.4753 11.4753 20.05 12 20.05C12.5247 20.05 12.95 20.4753 12.95 21ZM5.60068 4.25718L6.30779 4.96429C6.67879 5.33529 6.67879 5.93679 6.30779 6.30779C5.93679 6.67879 5.33529 6.67879 4.96429 6.30779L4.25718 5.60068C3.88618 5.22968 3.88618 4.62818 4.25718 4.25718C4.62818 3.88618 5.22968 3.88618 5.60068 4.25718ZM19.0358 17.6922L19.7429 18.3993C20.1139 18.7703 20.1138 19.3719 19.7428 19.7428C19.3719 20.1138 18.7703 20.1139 18.3993 19.7429L17.6922 19.0357C17.3212 18.6648 17.3212 18.0632 17.6922 17.6922C18.0632 17.3212 18.6648 17.3212 19.0358 17.6922ZM19.7428 5.60068L19.0357 6.3078C18.6647 6.6788 18.0632 6.6788 17.6922 6.30782C17.3212 5.93682 17.3212 5.33527 17.6922 4.96427L18.3993 4.25716C18.7703 3.88617 19.3718 3.88618 19.7428 4.25718C20.1138 4.62818 20.1138 5.22968 19.7428 5.60068ZM6.3078 19.0357L5.60068 19.7428C5.22968 20.1138 4.62818 20.1138 4.25718 19.7428C3.88618 19.3718 3.88617 18.7703 4.25716 18.3993L4.96427 17.6922C5.33527 17.3212 5.93682 17.3212 6.30782 17.6922C6.6788 18.0632 6.6788 18.6647 6.3078 19.0357ZM22 12.95H21C20.4753 12.95 20.05 12.5247 20.05 12C20.05 11.4753 20.4753 11.05 21 11.05H22C22.5247 11.05 22.95 11.4753 22.95 12C22.95 12.5247 22.5247 12.95 22 12.95ZM3 12.95H2C1.47533 12.95 1.05 12.5247 1.05 12C1.05 11.4753 1.47533 11.05 2 11.05H3C3.52467 11.05 3.95 11.4753 3.95 12C3.95 12.5247 3.52467 12.95 3 12.95Z"
          stroke="#79654E"
          stroke-opacity="0.7"
          stroke-width="0.1"
        />
      </g>
    </g>
    <defs>
      <filter
        class="color-matrix"
        id="filter0_di_1935_15"
        x="0"
        y="1"
        width="24"
        height="24"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          class="color-matrix"
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5127 0"
          result="hardAlpha"
        />
        <feOffset dy="1" />
        <feGaussianBlur stdDeviation="0.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5127 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_1935_15"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1935_15"
          result="shape"
        />
        <feColorMatrix
          class="color-matrix"
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5127 0"
          result="hardAlpha"
        />
        <feOffset dy="2" />
        <feGaussianBlur stdDeviation="1" />
        <feComposite
          in2="hardAlpha"
          operator="arithmetic"
          k2="-1"
          k3="1"
        />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.5 0 0 0 0 0.4 0 0 0 0 0.3 0 0 0 0.5127 0"
        />
        <feBlend
          mode="normal"
          in2="shape"
          result="effect2_innerShadow_1935_15"
        />
      </filter>
      <clipPath id="clip0_1935_15">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
  `;

  const flagCount = restMinesCount();

  const infoTime = document.createElement("div");
  infoTime.classList.add("info__time");
  infoTime.classList.add("subtitle");
  infoTime.innerHTML = `Time: ${countTime(data.time)}`;

  const infoClicks = document.createElement("div");
  infoClicks.classList.add("info__clicks");
  infoClicks.classList.add("subtitle");
  infoClicks.innerHTML = `Clicks: ${data.clicks}`;

  const infoFlags = document.createElement("div");
  infoFlags.classList.add("info__rest-flags");
  infoFlags.classList.add("subtitle");
  infoFlags.innerHTML = `Flags: ${flagCount}`;

  const infoMines = document.createElement("div");
  infoMines.classList.add("info__rest-mines");
  infoMines.classList.add("subtitle");
  infoMines.innerHTML = `Mines: ${flagCount > 0 ? flagCount : 0}`;

  infoButtons.append(btnVolume, btnTheme);
  infoList.append(infoTime, infoClicks, infoFlags, infoMines);
  info.append(infoButtons, infoList);

  return info;
};

export default createInfoElement;
