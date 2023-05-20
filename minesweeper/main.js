/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/cell-field-block/countClosestMines.js":
/*!**************************************************!*\
  !*** ./js/cell-field-block/countClosestMines.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const countClosestMines = (x, y, cellsAtField, fieldSize) => {
  let count = 0;
  const size = +fieldSize.slice(-2);
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i >= 0 && j >= 0 && i < size && j < size) {
        if (cellsAtField[i][j].isMine) count++;
      }
    }
  }
  return count;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countClosestMines);

/***/ }),

/***/ "./js/cell-field-block/createFieldElement.js":
/*!***************************************************!*\
  !*** ./js/cell-field-block/createFieldElement.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createFieldElement = data => {
  const fieldSize = +data.fieldInGameSize.slice(-2);
  const sizeClass = "game-field_size-" + fieldSize;
  const gameField = document.createElement("div");
  gameField.className = "game-field " + sizeClass;
  for (let i = 0; i < fieldSize; i++) {
    for (let j = 0; j < fieldSize; j++) {
      const cellNode = document.createElement("button");
      const cellObj = data.cellsAtField[i][j];
      cellNode.classList.add("cell", "btn", "btn_fill");
      if (cellObj.isFlag) {
        cellNode.classList.add("cell_flag");
      }
      if (cellObj.isOpen) {
        cellNode.classList.add("cell_open");
        cellNode.innerHTML = cellObj.text ? cellObj.text : "";
        cellNode.dataset.num = +cellObj.text;
      }
      if (data.isDisabled) {
        if (cellObj.isMine) {
          cellNode.classList.add("cell_mine");
        }
        if (cellObj.isExpl) {
          cellNode.classList.add("cell_expl");
        }
      }
      cellNode.dataset.ij = i + "-" + j;
      gameField.append(cellNode);
    }
  }
  return gameField;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createFieldElement);

/***/ }),

/***/ "./js/cell-field-block/flagAllMineCells.js":
/*!*************************************************!*\
  !*** ./js/cell-field-block/flagAllMineCells.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/data */ "./js/data/data.js");

const flagAllMineCells = () => {
  const cellsArr = document.querySelectorAll(".cell");
  cellsArr.forEach(curNode => {
    const ijArr = curNode.dataset.ij.split("-");
    const x = +ijArr[0];
    const y = +ijArr[1];
    const curCellObj = _data_data__WEBPACK_IMPORTED_MODULE_0__["default"].cellsAtField[x][y];
    if (curCellObj.isMine) {
      curCellObj.isFlag = true;
      curNode.classList.add("cell_flag");
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (flagAllMineCells);

/***/ }),

/***/ "./js/cell-field-block/openCell.js":
/*!*****************************************!*\
  !*** ./js/cell-field-block/openCell.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _info_block_updateInfoMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../info-block/updateInfoMenu */ "./js/info-block/updateInfoMenu.js");
/* harmony import */ var _countClosestMines__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./countClosestMines */ "./js/cell-field-block/countClosestMines.js");


const openCell = (x, y, data) => {
  const count = (0,_countClosestMines__WEBPACK_IMPORTED_MODULE_1__["default"])(x, y, data.cellsAtField, data.fieldInGameSize);
  const cellObj = data.cellsAtField[x][y];
  const cellNode = document.querySelector(`[data-ij="${x}-${y}"]`);
  const size = +data.fieldInGameSize.slice(-2);
  if (!cellNode.classList.contains("cell_open")) {
    data.openCellCount++;
    (0,_info_block_updateInfoMenu__WEBPACK_IMPORTED_MODULE_0__["default"])(data.isSoundOn, data.clicks, data.time);
    cellObj.isOpen = true;
    cellNode.classList.add("cell_open");
    cellNode.innerHTML = count > 0 ? count : "";
    cellNode.dataset.num = count;
    cellObj.text = count;
  }
  if (!count) {
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (i >= 0 && j >= 0 && i < size && j < size) {
          const foundCell = document.querySelector(`[data-ij="${i}-${j}"]`);
          if (!foundCell.classList.contains("cell_open") && !foundCell.classList.contains("cell_flag")) {
            openCell(i, j, data);
          }
        }
      }
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (openCell);

/***/ }),

/***/ "./js/cell-field-block/printMines.js":
/*!*******************************************!*\
  !*** ./js/cell-field-block/printMines.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/data */ "./js/data/data.js");

const printMines = () => {
  const cellsArr = document.querySelectorAll(".cell");
  cellsArr.forEach(curNode => {
    const ijArr = curNode.dataset.ij.split("-");
    const x = +ijArr[0];
    const y = +ijArr[1];
    const curCellObj = _data_data__WEBPACK_IMPORTED_MODULE_0__["default"].cellsAtField[x][y];
    if (curCellObj.isMine) {
      curNode.classList.add("cell_mine");
    }
    if (curCellObj.isExpl) {
      curNode.classList.add("cell_expl");
    }
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (printMines);

/***/ }),

/***/ "./js/cell-field-block/setMines.js":
/*!*****************************************!*\
  !*** ./js/cell-field-block/setMines.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const setMines = (data, ij) => {
  let size = +data.fieldInGameSize.slice(-2);
  let minesCount = data.minesInGameNumber;
  const ijArr = ij.split("-");
  const curX = +ijArr[0];
  const curY = +ijArr[1];
  while (minesCount > 0) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    data.cellsAtField.forEach((elX, indexX) => {
      if (indexX === x) {
        elX.forEach((elY, indexY) => {
          if (indexY === y && !(curX === x && curY === y)) {
            if (elY.isMine === false) {
              elY.isMine = true;
              minesCount--;
            }
          }
        });
      }
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setMines);

/***/ }),

/***/ "./js/cell-field-block/updateField.js":
/*!********************************************!*\
  !*** ./js/cell-field-block/updateField.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createFieldElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createFieldElement */ "./js/cell-field-block/createFieldElement.js");

const updateField = data => {
  const field = document.querySelector(".game-field");
  field.replaceWith((0,_createFieldElement__WEBPACK_IMPORTED_MODULE_0__["default"])(data));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateField);

/***/ }),

/***/ "./js/data/addLastGamesElement.js":
/*!****************************************!*\
  !*** ./js/data/addLastGamesElement.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./js/data/data.js");

const addLastGamesElement = () => {
  const obj = {
    date: new Date(),
    time: _data__WEBPACK_IMPORTED_MODULE_0__["default"].time,
    clicks: _data__WEBPACK_IMPORTED_MODULE_0__["default"].clicks,
    fieldSize: _data__WEBPACK_IMPORTED_MODULE_0__["default"].fieldInGameSize,
    minesNumber: _data__WEBPACK_IMPORTED_MODULE_0__["default"].minesInGameNumber
  };
  if (_data__WEBPACK_IMPORTED_MODULE_0__["default"].latestResults.length > 9) _data__WEBPACK_IMPORTED_MODULE_0__["default"].latestResults.shift();
  _data__WEBPACK_IMPORTED_MODULE_0__["default"].latestResults.push(obj);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addLastGamesElement);

/***/ }),

/***/ "./js/data/createDefaultCells.js":
/*!***************************************!*\
  !*** ./js/data/createDefaultCells.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createDefaultCells = size => {
  const defaultCells = [];
  for (let i = 0; i < size; i++) {
    defaultCells.push([]);
    for (let j = 0; j < size; j++) {
      const defaultCell = {
        isOpen: false,
        isFlag: false,
        isMine: false,
        isExpl: false,
        ij: i + "-" + j,
        text: ""
      };
      defaultCells[i].push(defaultCell);
    }
  }
  return defaultCells;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDefaultCells);

/***/ }),

/***/ "./js/data/createDefaultData.js":
/*!**************************************!*\
  !*** ./js/data/createDefaultData.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createDefaultCells__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDefaultCells */ "./js/data/createDefaultCells.js");

const createDefaultData = () => {
  const data = {
    minesCurNumber: 10,
    minesInGameNumber: 10,
    fieldCurSize: "easy 10x10",
    fieldInGameSize: "easy 10x10",
    isCellClicked: false,
    isSoundOn: true,
    isDarkTheme: false,
    openCellCount: 0,
    setFlagCount: 0,
    time: 0,
    clicks: 0,
    isDisabled: false,
    isLose: false,
    isPaused: false,
    cellsAtField: [],
    timer: () => {},
    latestResults: []
  };
  const size = +data.fieldInGameSize.slice(-2);
  data.cellsAtField = (0,_createDefaultCells__WEBPACK_IMPORTED_MODULE_0__["default"])(size);
  return data;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createDefaultData);

/***/ }),

/***/ "./js/data/createMessage.js":
/*!**********************************!*\
  !*** ./js/data/createMessage.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _info_block_countTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../info-block/countTime */ "./js/info-block/countTime.js");
/* harmony import */ var _info_block_restCellsCount__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../info-block/restCellsCount */ "./js/info-block/restCellsCount.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data */ "./js/data/data.js");



const createMessage = () => {
  const count = (0,_info_block_restCellsCount__WEBPACK_IMPORTED_MODULE_1__["default"])(_data__WEBPACK_IMPORTED_MODULE_2__["default"].fieldInGameSize, _data__WEBPACK_IMPORTED_MODULE_2__["default"].openCellCount, _data__WEBPACK_IMPORTED_MODULE_2__["default"].minesInGameNumber);
  const time = (0,_info_block_countTime__WEBPACK_IMPORTED_MODULE_0__["default"])(_data__WEBPACK_IMPORTED_MODULE_2__["default"].time);
  return {
    win: `🎊&nbsp;Hooray!&nbsp;🥳 
    You&nbsp;found&nbsp;all&nbsp;mines in&nbsp;${time}&nbsp;seconds 
    and&nbsp;${_data__WEBPACK_IMPORTED_MODULE_2__["default"].clicks}&nbsp;moves! 🎉`,
    lose: `🚨&nbsp;Game&nbsp;over <button class="btn btn_text btn_start-new-game subtitle">
    🎃<span>Try again</span>⚠️</button>`,
    default: `You have to open ${count}&nbsp;more&nbsp;cells&nbsp;👀`
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createMessage);

/***/ }),

/***/ "./js/data/data.js":
/*!*************************!*\
  !*** ./js/data/data.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createDefaultData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDefaultData */ "./js/data/createDefaultData.js");

let data = localStorage.getItem("minesweeper-data") ? JSON.parse(localStorage.getItem("minesweeper-data")) : (0,_createDefaultData__WEBPACK_IMPORTED_MODULE_0__["default"])();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (data);

/***/ }),

/***/ "./js/finishGame.js":
/*!**************************!*\
  !*** ./js/finishGame.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cell_field_block_flagAllMineCells__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell-field-block/flagAllMineCells */ "./js/cell-field-block/flagAllMineCells.js");
/* harmony import */ var _cell_field_block_printMines__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cell-field-block/printMines */ "./js/cell-field-block/printMines.js");
/* harmony import */ var _data_addLastGamesElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data/addLastGamesElement */ "./js/data/addLastGamesElement.js");
/* harmony import */ var _data_createMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data/createMessage */ "./js/data/createMessage.js");
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/data */ "./js/data/data.js");
/* harmony import */ var _latest_results_block_updateLastGames__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./latest-results-block/updateLastGames */ "./js/latest-results-block/updateLastGames.js");
/* harmony import */ var _soundAudio__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./soundAudio */ "./js/soundAudio.js");







const finishGame = (isWin, isSoundOn) => {
  const infoMessage = document.querySelector(".message");
  const messageText = (0,_data_createMessage__WEBPACK_IMPORTED_MODULE_3__["default"])();
  if (isWin) {
    (0,_data_addLastGamesElement__WEBPACK_IMPORTED_MODULE_2__["default"])();
    (0,_latest_results_block_updateLastGames__WEBPACK_IMPORTED_MODULE_5__["default"])();
    (0,_soundAudio__WEBPACK_IMPORTED_MODULE_6__["default"])("win", isSoundOn);
    (0,_cell_field_block_flagAllMineCells__WEBPACK_IMPORTED_MODULE_0__["default"])();
    infoMessage.innerHTML = messageText.win;
  } else {
    _data_data__WEBPACK_IMPORTED_MODULE_4__["default"].isLose = true;
    (0,_soundAudio__WEBPACK_IMPORTED_MODULE_6__["default"])("lose", isSoundOn);
    infoMessage.innerHTML = messageText.lose;
    (0,_cell_field_block_printMines__WEBPACK_IMPORTED_MODULE_1__["default"])();
  }
  _data_data__WEBPACK_IMPORTED_MODULE_4__["default"].isDisabled = true;
  _data_data__WEBPACK_IMPORTED_MODULE_4__["default"].isPaused = true;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (finishGame);

/***/ }),

/***/ "./js/firstHandlers.js":
/*!*****************************!*\
  !*** ./js/firstHandlers.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _handlers_cellHandler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./handlers/cellHandler */ "./js/handlers/cellHandler.js");
/* harmony import */ var _handlers_radioInputHandler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers/radioInputHandler */ "./js/handlers/radioInputHandler.js");
/* harmony import */ var _handlers_rangeArrowsHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./handlers/rangeArrowsHandler */ "./js/handlers/rangeArrowsHandler.js");
/* harmony import */ var _handlers_rangeInputHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handlers/rangeInputHandler */ "./js/handlers/rangeInputHandler.js");
/* harmony import */ var _cell_field_block_setMines__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cell-field-block/setMines */ "./js/cell-field-block/setMines.js");
/* harmony import */ var _updateLocalStorage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./updateLocalStorage */ "./js/updateLocalStorage.js");
/* harmony import */ var _soundAudio__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./soundAudio */ "./js/soundAudio.js");
/* harmony import */ var _handlers_startNewGameHandler__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./handlers/startNewGameHandler */ "./js/handlers/startNewGameHandler.js");
/* harmony import */ var _info_block_updateInfoMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./info-block/updateInfoMenu */ "./js/info-block/updateInfoMenu.js");









const firstHandlers = data => {
  const body = document.querySelector("body");
  const clickHandler = () => {
    body.addEventListener("click", e => {
      // input range
      if (e.target.closest("button")?.classList.contains("range-input__arrow-left") || e.target.closest("button")?.classList.contains("range-input__arrow-right")) {
        (0,_handlers_rangeArrowsHandler__WEBPACK_IMPORTED_MODULE_2__["default"])(e.target.closest("button"), data);
      }

      // input radio
      if (e.target.classList.contains("radio-input__input")) {
        (0,_handlers_radioInputHandler__WEBPACK_IMPORTED_MODULE_1__["default"])(e.target, data);
      }

      // new game
      if (e.target.closest("button")?.classList.contains("btn_start-new-game")) {
        (0,_handlers_startNewGameHandler__WEBPACK_IMPORTED_MODULE_7__["default"])(data);
      }

      // volume
      if (e.target.closest(".btn_volume")) {
        data.isSoundOn = !data.isSoundOn;
        e.target.closest(".btn_volume").classList.toggle("btn_active");
      }

      // theme
      if (e.target.closest(".btn_theme")) {
        data.isDarkTheme = !data.isDarkTheme;
        body.classList.toggle("dark-theme");
        e.target.closest(".btn_theme").classList.toggle("btn_active");
      }

      //cells
      if (!data.isDisabled) {
        if (e.target.classList.contains("cell") && !e.target.classList.contains("cell_flag")) {
          if (!data.isCellClicked) {
            (0,_cell_field_block_setMines__WEBPACK_IMPORTED_MODULE_4__["default"])(data, e.target.dataset.ij);
            data.isCellClicked = true;
          }
          (0,_handlers_cellHandler__WEBPACK_IMPORTED_MODULE_0__["default"])(e.target.dataset.ij, data);
        }
      }
      (0,_updateLocalStorage__WEBPACK_IMPORTED_MODULE_5__["default"])();
    });
  };
  const keyDownHandler = () => {
    body.addEventListener("input", e => {
      if (e.target.classList.contains("range-input__field")) {
        (0,_handlers_rangeInputHandler__WEBPACK_IMPORTED_MODULE_3__["default"])(e.target.value, data);
      }
      (0,_updateLocalStorage__WEBPACK_IMPORTED_MODULE_5__["default"])();
    });
  };
  const rightClickHandler = () => {
    body.addEventListener("contextmenu", e => {
      e.preventDefault();
      if (e.target.classList.contains("cell")) {
        if (!data.isDisabled) {
          const ijArr = e.target.dataset.ij.split("-");
          const x = +ijArr[0];
          const y = +ijArr[1];
          if (!data.cellsAtField[x][y].isOpen) {
            if (data.cellsAtField[x][y].isFlag) {
              data.cellsAtField[x][y].isFlag = false;
              e.target.classList.remove("cell_flag");
              data.setFlagCount--;
              (0,_soundAudio__WEBPACK_IMPORTED_MODULE_6__["default"])(false, data.isSoundOn);
            } else {
              data.cellsAtField[x][y].isFlag = true;
              e.target.classList.add("cell_flag");
              data.setFlagCount++;
              (0,_soundAudio__WEBPACK_IMPORTED_MODULE_6__["default"])(false, data.isSoundOn);
            }
          } else {
            data.cellsAtField[x][y].isFlag = false;
            e.target.classList.remove("cell_flag");
          }
        }
      }
      (0,_info_block_updateInfoMenu__WEBPACK_IMPORTED_MODULE_8__["default"])(data.isSoundOn, data.clicks, data.time);
      (0,_updateLocalStorage__WEBPACK_IMPORTED_MODULE_5__["default"])();
    }, false);
  };
  clickHandler();
  keyDownHandler();
  rightClickHandler();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (firstHandlers);

/***/ }),

/***/ "./js/firstRender.js":
/*!***************************!*\
  !*** ./js/firstRender.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _latest_results_block_createLastGamesElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./latest-results-block/createLastGamesElement */ "./js/latest-results-block/createLastGamesElement.js");
/* harmony import */ var _info_block_createInfoElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./info-block/createInfoElement */ "./js/info-block/createInfoElement.js");
/* harmony import */ var _settings_block_createSettingsElement__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings-block/createSettingsElement */ "./js/settings-block/createSettingsElement.js");
/* harmony import */ var _cell_field_block_updateField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cell-field-block/updateField */ "./js/cell-field-block/updateField.js");
/* harmony import */ var _data_createMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/createMessage */ "./js/data/createMessage.js");





const firstRender = data => {
  data.isPaused = true;
  const body = document.querySelector("body");
  if (data.isDarkTheme) body.classList.add("dark-theme");
  body.innerHTML = "";
  const messageText = (0,_data_createMessage__WEBPACK_IMPORTED_MODULE_4__["default"])();
  const title = document.createElement("h1");
  title.classList.add("title");
  title.innerHTML = "Minesweeper";
  const mainBlock = document.createElement("div");
  mainBlock.classList.add("main");
  const menuBlock = document.createElement("div");
  menuBlock.classList.add("menu");
  const gameField = document.createElement("div");
  gameField.classList.add("game-field");
  const settings = (0,_settings_block_createSettingsElement__WEBPACK_IMPORTED_MODULE_2__["default"])(data.minesCurNumber, data.fieldCurSize);
  const newGameButton = document.createElement("button");
  newGameButton.classList.add("btn", "btn_new-game", "btn_start-new-game");
  newGameButton.innerHTML = "Start new game";
  const message = document.createElement("div");
  message.classList.add("message", "subtitle");
  if (data.isDisabled) {
    if (data.isLose) {
      message.innerHTML = messageText.lose;
    } else {
      message.innerHTML = messageText.win;
    }
  } else {
    message.innerHTML = messageText.default;
  }
  const info = (0,_info_block_createInfoElement__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const lastGames = (0,_latest_results_block_createLastGamesElement__WEBPACK_IMPORTED_MODULE_0__["default"])(data.latestResults);
  menuBlock.append(settings, newGameButton);
  mainBlock.append(menuBlock, message, gameField, info, lastGames);
  body.append(title, mainBlock);
  (0,_cell_field_block_updateField__WEBPACK_IMPORTED_MODULE_3__["default"])(data);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (firstRender);

/***/ }),

/***/ "./js/handlers/cellHandler.js":
/*!************************************!*\
  !*** ./js/handlers/cellHandler.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _finishGame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../finishGame */ "./js/finishGame.js");
/* harmony import */ var _soundAudio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../soundAudio */ "./js/soundAudio.js");
/* harmony import */ var _cell_field_block_openCell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cell-field-block/openCell */ "./js/cell-field-block/openCell.js");
/* harmony import */ var _info_block_startTimer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../info-block/startTimer */ "./js/info-block/startTimer.js");




const cellHandler = (ij, data) => {
  const ijArr = ij.split("-");
  const x = +ijArr[0];
  const y = +ijArr[1];
  if (data.isPaused) {
    (0,_info_block_startTimer__WEBPACK_IMPORTED_MODULE_3__["default"])();
  }
  data.isPaused = false;
  if (data.cellsAtField[x][y].isMine) {
    data.cellsAtField[x][y].isExpl = true;
    (0,_finishGame__WEBPACK_IMPORTED_MODULE_0__["default"])(false, data.isSoundOn);
  } else {
    const curCell = document.querySelector(`[data-ij="${x}-${y}"]`);
    if (!data.cellsAtField[x][y].isOpen) {
      (0,_soundAudio__WEBPACK_IMPORTED_MODULE_1__["default"])(false, data.isSoundOn);
      data.clicks++;
      (0,_cell_field_block_openCell__WEBPACK_IMPORTED_MODULE_2__["default"])(x, y, data);
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cellHandler);

/***/ }),

/***/ "./js/handlers/radioInputHandler.js":
/*!******************************************!*\
  !*** ./js/handlers/radioInputHandler.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const radioInputHandler = (target, data) => {
  const titleRadioInput = document.querySelector(".settings__title_radio-input");
  switch (target.value) {
    case "easy":
      if (data.fieldCurSize !== "easy 10x10") {
        data.fieldCurSize = "easy 10x10";
        titleRadioInput.innerHTML = `Field size: ${data.fieldCurSize}`;
      }
      break;
    case "medium":
      if (data.fieldCurSize !== "medium 15x15") {
        data.fieldCurSize = "medium 15x15";
        titleRadioInput.innerHTML = `Field size: ${data.fieldCurSize}`;
      }
      break;
    case "hard":
      if (data.fieldCurSize !== "hard 25x25") {
        data.fieldCurSize = "hard 25x25";
        titleRadioInput.innerHTML = `Field size: ${data.fieldCurSize}`;
      }
      break;
    default:
      break;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (radioInputHandler);

/***/ }),

/***/ "./js/handlers/rangeArrowsHandler.js":
/*!*******************************************!*\
  !*** ./js/handlers/rangeArrowsHandler.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const rangeArrowsHandler = (button, data) => {
  const titleRangeInput = document.querySelector(".settings__title_range-input");
  const rangeInputField = document.querySelector(".range-input__field");
  if (button.classList.contains("range-input__arrow-right")) {
    if (data.minesCurNumber < 99) {
      data.minesCurNumber += 1;
      rangeInputField.value = data.minesCurNumber;
      titleRangeInput.innerHTML = `Choose mines: ${data.minesCurNumber}`;
    }
  } else {
    if (data.minesCurNumber > 10) {
      data.minesCurNumber -= 1;
      rangeInputField.value = data.minesCurNumber;
      titleRangeInput.innerHTML = `Choose mines: ${data.minesCurNumber}`;
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rangeArrowsHandler);

/***/ }),

/***/ "./js/handlers/rangeInputHandler.js":
/*!******************************************!*\
  !*** ./js/handlers/rangeInputHandler.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const rangeInputHandler = (value, data) => {
  const titleRangeInput = document.querySelector(".settings__title_range-input");
  data.minesCurNumber = +value;
  titleRangeInput.innerHTML = `Choose mines: ${data.minesCurNumber}`;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rangeInputHandler);

/***/ }),

/***/ "./js/handlers/startNewGameHandler.js":
/*!********************************************!*\
  !*** ./js/handlers/startNewGameHandler.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cell_field_block_updateField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../cell-field-block/updateField */ "./js/cell-field-block/updateField.js");
/* harmony import */ var _data_createDefaultCells__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/createDefaultCells */ "./js/data/createDefaultCells.js");
/* harmony import */ var _info_block_updateInfoMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../info-block/updateInfoMenu */ "./js/info-block/updateInfoMenu.js");
/* harmony import */ var _updateLocalStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../updateLocalStorage */ "./js/updateLocalStorage.js");




const startNewGameHandler = data => {
  data.minesInGameNumber = data.minesCurNumber;
  data.fieldInGameSize = data.fieldCurSize;
  data.isCellClicked = false;
  data.openCellCount = 0;
  data.setFlagCount = 0;
  data.time = 0;
  data.clicks = 0;
  data.isDisabled = false;
  data.isLose = false;
  data.isPaused = true;
  data.cellsAtField = (0,_data_createDefaultCells__WEBPACK_IMPORTED_MODULE_1__["default"])(+data.fieldInGameSize.slice(-2));
  (0,_cell_field_block_updateField__WEBPACK_IMPORTED_MODULE_0__["default"])(data);
  (0,_updateLocalStorage__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_info_block_updateInfoMenu__WEBPACK_IMPORTED_MODULE_2__["default"])(data.isSoundOn, data.clicks, data.time);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startNewGameHandler);

/***/ }),

/***/ "./js/info-block/countTime.js":
/*!************************************!*\
  !*** ./js/info-block/countTime.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function countTime(time) {
  const fullSeconds = time;
  if (fullSeconds === 0) {
    return "0s";
  }
  const fullMinutes = Math.floor(fullSeconds / 60);
  const fullHours = Math.floor(fullMinutes / 60);
  const seconds = Math.floor(fullSeconds % 60);
  const minutes = Math.floor(fullMinutes % 60);
  const hours = Math.floor(fullHours % 24);
  let result = "";
  if (hours > 0) {
    result += hours + "h ";
  }
  if (minutes > 0) {
    result += minutes + "m ";
  }
  if (seconds > 0) {
    result += seconds + "s ";
  }
  return result;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countTime);

/***/ }),

/***/ "./js/info-block/createInfoElement.js":
/*!********************************************!*\
  !*** ./js/info-block/createInfoElement.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/data */ "./js/data/data.js");
/* harmony import */ var _countTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./countTime */ "./js/info-block/countTime.js");
/* harmony import */ var _restCellsCount__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./restCellsCount */ "./js/info-block/restCellsCount.js");
/* harmony import */ var _restMinesCount__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./restMinesCount */ "./js/info-block/restMinesCount.js");




const createInfoElement = () => {
  const info = document.createElement("div");
  info.classList.add("info");
  const infoButtons = document.createElement("div");
  infoButtons.classList.add("info__buttons");
  const infoList = document.createElement("div");
  infoList.classList.add("info__list");
  const btnVolume = document.createElement("button");
  btnVolume.classList.add("btn", "btn_line", "btn_volume");
  if (_data_data__WEBPACK_IMPORTED_MODULE_0__["default"].isSoundOn) btnVolume.classList.add("btn_active");
  const btnTheme = document.createElement("button");
  btnTheme.classList.add("btn", "btn_line", "btn_theme");
  if (!_data_data__WEBPACK_IMPORTED_MODULE_0__["default"].isDarkTheme) btnTheme.classList.add("btn_active");
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
  const flagCount = (0,_restMinesCount__WEBPACK_IMPORTED_MODULE_3__["default"])();
  const infoTime = document.createElement("div");
  infoTime.classList.add("info__time");
  infoTime.classList.add("subtitle");
  infoTime.innerHTML = `Time: ${(0,_countTime__WEBPACK_IMPORTED_MODULE_1__["default"])(_data_data__WEBPACK_IMPORTED_MODULE_0__["default"].time)}`;
  const infoClicks = document.createElement("div");
  infoClicks.classList.add("info__clicks");
  infoClicks.classList.add("subtitle");
  infoClicks.innerHTML = `Clicks: ${_data_data__WEBPACK_IMPORTED_MODULE_0__["default"].clicks}`;
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createInfoElement);

/***/ }),

/***/ "./js/info-block/restCellsCount.js":
/*!*****************************************!*\
  !*** ./js/info-block/restCellsCount.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const restCellsCount = (fieldInGameSize, openCellCount, minesInGameNumber) => {
  const maxCellsCount = +fieldInGameSize.slice(-2) * +fieldInGameSize.slice(-2);
  const restCellsCount = maxCellsCount - openCellCount - minesInGameNumber;
  return restCellsCount;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (restCellsCount);

/***/ }),

/***/ "./js/info-block/restMinesCount.js":
/*!*****************************************!*\
  !*** ./js/info-block/restMinesCount.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/data */ "./js/data/data.js");

const restMinesCount = () => {
  return _data_data__WEBPACK_IMPORTED_MODULE_0__["default"].minesInGameNumber - _data_data__WEBPACK_IMPORTED_MODULE_0__["default"].setFlagCount;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (restMinesCount);

/***/ }),

/***/ "./js/info-block/startTimer.js":
/*!*************************************!*\
  !*** ./js/info-block/startTimer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/data */ "./js/data/data.js");
/* harmony import */ var _updateLocalStorage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../updateLocalStorage */ "./js/updateLocalStorage.js");
/* harmony import */ var _updateTime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateTime */ "./js/info-block/updateTime.js");



const startTimer = () => {
  clearInterval(_data_data__WEBPACK_IMPORTED_MODULE_0__["default"].timer);
  _data_data__WEBPACK_IMPORTED_MODULE_0__["default"].timer = setInterval(() => {
    if (!_data_data__WEBPACK_IMPORTED_MODULE_0__["default"].isPaused) {
      _data_data__WEBPACK_IMPORTED_MODULE_0__["default"].time++;
      (0,_updateTime__WEBPACK_IMPORTED_MODULE_2__["default"])(_data_data__WEBPACK_IMPORTED_MODULE_0__["default"].time);
      (0,_updateLocalStorage__WEBPACK_IMPORTED_MODULE_1__["default"])();
    }
  }, 1000);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (startTimer);

/***/ }),

/***/ "./js/info-block/updateClicks.js":
/*!***************************************!*\
  !*** ./js/info-block/updateClicks.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const updateClicks = clicks => {
  const targetElement = document.querySelector(".info__clicks");
  targetElement.innerHTML = `Clicks: ${clicks}`;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateClicks);

/***/ }),

/***/ "./js/info-block/updateInfoMenu.js":
/*!*****************************************!*\
  !*** ./js/info-block/updateInfoMenu.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _updateClicks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateClicks */ "./js/info-block/updateClicks.js");
/* harmony import */ var _updateTime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateTime */ "./js/info-block/updateTime.js");
/* harmony import */ var _updateRestCells__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateRestCells */ "./js/info-block/updateRestCells.js");
/* harmony import */ var _updateRestMines__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./updateRestMines */ "./js/info-block/updateRestMines.js");




const updateInfoMenu = (isSoundOn, clicks, time) => {
  (0,_updateTime__WEBPACK_IMPORTED_MODULE_1__["default"])(time);
  (0,_updateClicks__WEBPACK_IMPORTED_MODULE_0__["default"])(clicks);
  (0,_updateRestCells__WEBPACK_IMPORTED_MODULE_2__["default"])(isSoundOn);
  (0,_updateRestMines__WEBPACK_IMPORTED_MODULE_3__["default"])();
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateInfoMenu);

/***/ }),

/***/ "./js/info-block/updateRestCells.js":
/*!******************************************!*\
  !*** ./js/info-block/updateRestCells.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_createMessage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/createMessage */ "./js/data/createMessage.js");
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../data/data */ "./js/data/data.js");
/* harmony import */ var _finishGame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../finishGame */ "./js/finishGame.js");
/* harmony import */ var _restCellsCount__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./restCellsCount */ "./js/info-block/restCellsCount.js");




const updateRestCells = isSoundOn => {
  const infoMessage = document.querySelector(".message");
  const messageText = (0,_data_createMessage__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const count = (0,_restCellsCount__WEBPACK_IMPORTED_MODULE_3__["default"])(_data_data__WEBPACK_IMPORTED_MODULE_1__["default"].fieldInGameSize, _data_data__WEBPACK_IMPORTED_MODULE_1__["default"].openCellCount, _data_data__WEBPACK_IMPORTED_MODULE_1__["default"].minesInGameNumber);
  if (_data_data__WEBPACK_IMPORTED_MODULE_1__["default"].isDisabled) {
    if (_data_data__WEBPACK_IMPORTED_MODULE_1__["default"].isLose) {
      infoMessage.innerHTML = messageText.lose;
    } else {
      infoMessage.innerHTML = messageText.win;
    }
  } else {
    infoMessage.innerHTML = messageText.default;
  }
  if (count === 0) {
    (0,_finishGame__WEBPACK_IMPORTED_MODULE_2__["default"])("win", isSoundOn);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateRestCells);

/***/ }),

/***/ "./js/info-block/updateRestMines.js":
/*!******************************************!*\
  !*** ./js/info-block/updateRestMines.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _restMinesCount__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restMinesCount */ "./js/info-block/restMinesCount.js");

const updateRestMines = () => {
  const flagCount = (0,_restMinesCount__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const flagCountElement = document.querySelector(".info__rest-flags");
  const mineCountElement = document.querySelector(".info__rest-mines");
  mineCountElement.innerHTML = `Mines: ${flagCount > 0 ? flagCount : 0}`;
  flagCountElement.innerHTML = `Flags: ${flagCount}`;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateRestMines);

/***/ }),

/***/ "./js/info-block/updateTime.js":
/*!*************************************!*\
  !*** ./js/info-block/updateTime.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _countTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./countTime */ "./js/info-block/countTime.js");

const updateTime = time => {
  const targetElement = document.querySelector(".info__time");
  targetElement.innerHTML = `Time: ${(0,_countTime__WEBPACK_IMPORTED_MODULE_0__["default"])(time)}`;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateTime);

/***/ }),

/***/ "./js/latest-results-block/convertDateToString.js":
/*!********************************************************!*\
  !*** ./js/latest-results-block/convertDateToString.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const convertDateToString = date => {
  let time = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "short"
  }).format(date);
  return time;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (convertDateToString);

/***/ }),

/***/ "./js/latest-results-block/createLastGamesElement.js":
/*!***********************************************************!*\
  !*** ./js/latest-results-block/createLastGamesElement.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _info_block_countTime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../info-block/countTime */ "./js/info-block/countTime.js");
/* harmony import */ var _convertDateToString__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./convertDateToString */ "./js/latest-results-block/convertDateToString.js");


const createLastGamesElement = latestResults => {
  const latestResultsBlock = document.createElement("div");
  latestResultsBlock.classList.add("last-games");
  const latestResultsList = document.createElement("ul");
  latestResultsList.classList.add("last-games__list");
  latestResults.forEach(item => {
    const latestResultsItem = document.createElement("li");
    latestResultsItem.classList.add("last-games__item");
    const latestResultsDate = document.createElement("div");
    latestResultsDate.classList.add("last-games__date");
    console.log(typeof Date.parse(item.date));
    latestResultsDate.innerHTML = (0,_convertDateToString__WEBPACK_IMPORTED_MODULE_1__["default"])(Date.parse(item.date));
    const latestResultsTime = document.createElement("div");
    latestResultsTime.classList.add("last-games__time");
    latestResultsTime.innerHTML = `Time: ${(0,_info_block_countTime__WEBPACK_IMPORTED_MODULE_0__["default"])(item.time)}`;
    const latestResultsClicks = document.createElement("div");
    latestResultsClicks.classList.add("last-games__clicks");
    latestResultsClicks.innerHTML = `Clicks: ${item.clicks}`;
    const latestResultsFieldSize = document.createElement("div");
    latestResultsFieldSize.classList.add("last-games__field-size");
    latestResultsFieldSize.innerHTML = `Field size: 
    ${item.fieldSize.slice(-2)}`;
    const latestResultsMinesNumber = document.createElement("div");
    latestResultsMinesNumber.classList.add("last-games__mines-number");
    latestResultsMinesNumber.innerHTML = `Mines number: ${item.minesNumber}`;
    latestResultsItem.append(latestResultsDate, latestResultsTime, latestResultsClicks, latestResultsFieldSize, latestResultsMinesNumber);
    latestResultsList.append(latestResultsItem);
  });
  latestResultsBlock.append(latestResultsList);
  console.log(latestResultsBlock, "latestResultsBlock");
  return latestResultsBlock;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createLastGamesElement);

/***/ }),

/***/ "./js/latest-results-block/updateLastGames.js":
/*!****************************************************!*\
  !*** ./js/latest-results-block/updateLastGames.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../data/data */ "./js/data/data.js");
/* harmony import */ var _createLastGamesElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createLastGamesElement */ "./js/latest-results-block/createLastGamesElement.js");


const updateLastGames = () => {
  const targetBlock = document.querySelector(".last-games");
  targetBlock.replaceWith((0,_createLastGamesElement__WEBPACK_IMPORTED_MODULE_1__["default"])(_data_data__WEBPACK_IMPORTED_MODULE_0__["default"].latestResults));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateLastGames);

/***/ }),

/***/ "./js/settings-block/createRadioInput.js":
/*!***********************************************!*\
  !*** ./js/settings-block/createRadioInput.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createRadioInput = fieldCurSize => {
  const radioInputBlock = document.createElement("div");
  radioInputBlock.classList.add("radio-input-block");
  const radioInputTitle = document.createElement("h2");
  radioInputTitle.classList.add("settings__title", "subtitle", "settings__title_radio-input");
  radioInputTitle.innerHTML = `Field size: ${fieldCurSize}`;
  const radioInput = document.createElement("div");
  radioInput.classList.add("radio-input");
  for (let i = 0; i < 3; i++) {
    switch (i) {
      case 0:
        const itemLeft = document.createElement("input");
        itemLeft.classList.add("radio-input__input");
        itemLeft.type = "radio";
        itemLeft.name = "size";
        itemLeft.value = "easy";
        itemLeft.checked = fieldCurSize === "easy 10x10" ? true : false;
        radioInput.append(itemLeft);
        break;
      case 1:
        const itemCenter = document.createElement("input");
        itemCenter.classList.add("radio-input__input");
        itemCenter.type = "radio";
        itemCenter.name = "size";
        itemCenter.value = "medium";
        itemCenter.checked = fieldCurSize === "medium 15x15" ? true : false;
        radioInput.append(itemCenter);
        break;
      case 2:
        const itemRight = document.createElement("input");
        itemRight.classList.add("radio-input__input");
        itemRight.type = "radio";
        itemRight.name = "size";
        itemRight.value = "hard";
        itemRight.checked = fieldCurSize === "hard 25x25" ? true : false;
        radioInput.append(itemRight);
        break;
      default:
        break;
    }
  }
  radioInputBlock.append(radioInputTitle, radioInput);
  return radioInputBlock;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createRadioInput);

/***/ }),

/***/ "./js/settings-block/createRangeInput.js":
/*!***********************************************!*\
  !*** ./js/settings-block/createRangeInput.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const createRangeInput = minesNumber => {
  const rangeInputBlock = document.createElement("div");
  rangeInputBlock.classList.add("range-input-block");
  const rangeInputTitle = document.createElement("h2");
  rangeInputTitle.classList.add("settings__title", "subtitle", "settings__title_range-input");
  rangeInputTitle.innerHTML = `Choose mines: ${minesNumber}`;
  const arrowLeftBtn = document.createElement("button");
  arrowLeftBtn.classList.add("btn", "btn_line", "range-input__arrow-left");
  arrowLeftBtn.innerHTML = `<svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="path-bg"
      d="M8.5 6.00006L3.68885 1.62624C3.32737 1.29761 3.34548 0.723624 
      3.72697 0.418446V0.418446C4.02912 0.176732 4.4615 0.187961 4.7507 
      0.445032L10.1592 5.25265C10.6067 5.65044 10.6067 6.34968 10.1592 
      6.74747L4.7507 11.555C4.4615 11.812 4.02913 11.8233 3.72698 
      11.5816V11.5816C3.34549 11.2764 3.32738 10.7024 3.68887 
      10.3738L8.5 6.00006Z"
      fill="black"
    />
  </svg>`;
  const arrowRightBtn = document.createElement("button");
  arrowRightBtn.classList.add("btn", "btn_line", "range-input__arrow-right");
  arrowRightBtn.innerHTML = `<svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="path-bg"
      d="M8.5 6.00006L3.68885 1.62624C3.32737 1.29761 3.34548 0.723624 
      3.72697 0.418446V0.418446C4.02912 0.176732 4.4615 0.187961 4.7507 
      0.445032L10.1592 5.25265C10.6067 5.65044 10.6067 6.34968 10.1592 
      6.74747L4.7507 11.555C4.4615 11.812 4.02913 11.8233 3.72698 
      11.5816V11.5816C3.34549 11.2764 3.32738 10.7024 3.68887 10.3738L8.5 
      6.00006Z"
      fill="black"
    />
  </svg>`;
  const rangeInputField = document.createElement("input");
  rangeInputField.classList.add("range-input__field");
  rangeInputField.type = "range";
  rangeInputField.min = 10;
  rangeInputField.max = 99;
  rangeInputField.value = minesNumber;
  const rangeInput = document.createElement("div");
  rangeInput.classList.add("range-input");
  rangeInput.append(arrowLeftBtn, rangeInputField, arrowRightBtn);
  rangeInputBlock.append(rangeInputTitle, rangeInput);
  return rangeInputBlock;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createRangeInput);

/***/ }),

/***/ "./js/settings-block/createSettingsElement.js":
/*!****************************************************!*\
  !*** ./js/settings-block/createSettingsElement.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _createRadioInput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createRadioInput */ "./js/settings-block/createRadioInput.js");
/* harmony import */ var _createRangeInput__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createRangeInput */ "./js/settings-block/createRangeInput.js");


const createSettingsElement = (minesNumber, fieldCurSize) => {
  const settings = document.createElement("div");
  settings.classList.add("settings");
  settings.append((0,_createRangeInput__WEBPACK_IMPORTED_MODULE_1__["default"])(minesNumber), (0,_createRadioInput__WEBPACK_IMPORTED_MODULE_0__["default"])(fieldCurSize));
  return settings;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createSettingsElement);

/***/ }),

/***/ "./js/soundAudio.js":
/*!**************************!*\
  !*** ./js/soundAudio.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_sounds_win_mp3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../assets/sounds/win.mp3 */ "./assets/sounds/win.mp3");
/* harmony import */ var _assets_sounds_11_mp3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../assets/sounds/11.mp3 */ "./assets/sounds/11.mp3");
/* harmony import */ var _assets_sounds_01_mp3__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../assets/sounds/01.mp3 */ "./assets/sounds/01.mp3");
/* harmony import */ var _assets_sounds_02_mp3__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../assets/sounds/02.mp3 */ "./assets/sounds/02.mp3");
/* harmony import */ var _assets_sounds_03_mp3__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../assets/sounds/03.mp3 */ "./assets/sounds/03.mp3");
/* harmony import */ var _assets_sounds_04_mp3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../assets/sounds/04.mp3 */ "./assets/sounds/04.mp3");
/* harmony import */ var _assets_sounds_05_mp3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../assets/sounds/05.mp3 */ "./assets/sounds/05.mp3");
/* harmony import */ var _assets_sounds_06_mp3__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../assets/sounds/06.mp3 */ "./assets/sounds/06.mp3");
/* harmony import */ var _assets_sounds_07_mp3__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../assets/sounds/07.mp3 */ "./assets/sounds/07.mp3");
/* harmony import */ var _assets_sounds_08_mp3__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../assets/sounds/08.mp3 */ "./assets/sounds/08.mp3");
/* harmony import */ var _assets_sounds_09_mp3__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../assets/sounds/09.mp3 */ "./assets/sounds/09.mp3");
/* harmony import */ var _assets_sounds_10_mp3__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../assets/sounds/10.mp3 */ "./assets/sounds/10.mp3");
/* harmony import */ var _assets_sounds_e01_mp3__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../assets/sounds/e01.mp3 */ "./assets/sounds/e01.mp3");
/* harmony import */ var _assets_sounds_e02_mp3__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../assets/sounds/e02.mp3 */ "./assets/sounds/e02.mp3");
/* harmony import */ var _assets_sounds_e03_mp3__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../assets/sounds/e03.mp3 */ "./assets/sounds/e03.mp3");
/* harmony import */ var _assets_sounds_e04_mp3__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../assets/sounds/e04.mp3 */ "./assets/sounds/e04.mp3");
/* harmony import */ var _assets_sounds_e05_mp3__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./../assets/sounds/e05.mp3 */ "./assets/sounds/e05.mp3");
/* harmony import */ var _assets_sounds_e06_mp3__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./../assets/sounds/e06.mp3 */ "./assets/sounds/e06.mp3");
/* harmony import */ var _assets_sounds_e07_mp3__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./../assets/sounds/e07.mp3 */ "./assets/sounds/e07.mp3");
/* harmony import */ var _assets_sounds_e08_mp3__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./../assets/sounds/e08.mp3 */ "./assets/sounds/e08.mp3");
/* harmony import */ var _assets_sounds_e09_mp3__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./../assets/sounds/e09.mp3 */ "./assets/sounds/e09.mp3");
/* harmony import */ var _assets_sounds_e10_mp3__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./../assets/sounds/e10.mp3 */ "./assets/sounds/e10.mp3");
/* harmony import */ var _assets_sounds_e11_mp3__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./../assets/sounds/e11.mp3 */ "./assets/sounds/e11.mp3");
/* harmony import */ var _assets_sounds_e12_mp3__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./../assets/sounds/e12.mp3 */ "./assets/sounds/e12.mp3");
/* harmony import */ var _assets_sounds_e13_mp3__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./../assets/sounds/e13.mp3 */ "./assets/sounds/e13.mp3");

























const soundAudio = (soundType, isSoundOn) => {
  if (isSoundOn) {
    if (!soundType) {
      const openCellSounds = [_assets_sounds_01_mp3__WEBPACK_IMPORTED_MODULE_2__["default"], _assets_sounds_02_mp3__WEBPACK_IMPORTED_MODULE_3__["default"], _assets_sounds_03_mp3__WEBPACK_IMPORTED_MODULE_4__["default"], _assets_sounds_04_mp3__WEBPACK_IMPORTED_MODULE_5__["default"], _assets_sounds_05_mp3__WEBPACK_IMPORTED_MODULE_6__["default"], _assets_sounds_06_mp3__WEBPACK_IMPORTED_MODULE_7__["default"], _assets_sounds_07_mp3__WEBPACK_IMPORTED_MODULE_8__["default"], _assets_sounds_08_mp3__WEBPACK_IMPORTED_MODULE_9__["default"], _assets_sounds_09_mp3__WEBPACK_IMPORTED_MODULE_10__["default"], _assets_sounds_10_mp3__WEBPACK_IMPORTED_MODULE_11__["default"], _assets_sounds_11_mp3__WEBPACK_IMPORTED_MODULE_1__["default"]];
      let audio = new Audio();
      const index = Math.floor(Math.random() * 10);
      audio.src = openCellSounds[index];
      audio.autoplay = true;
    } else if (soundType === "lose") {
      const explCellSounds = [_assets_sounds_e01_mp3__WEBPACK_IMPORTED_MODULE_12__["default"], _assets_sounds_e02_mp3__WEBPACK_IMPORTED_MODULE_13__["default"], _assets_sounds_e03_mp3__WEBPACK_IMPORTED_MODULE_14__["default"], _assets_sounds_e04_mp3__WEBPACK_IMPORTED_MODULE_15__["default"], _assets_sounds_e05_mp3__WEBPACK_IMPORTED_MODULE_16__["default"], _assets_sounds_e06_mp3__WEBPACK_IMPORTED_MODULE_17__["default"], _assets_sounds_e07_mp3__WEBPACK_IMPORTED_MODULE_18__["default"], _assets_sounds_e08_mp3__WEBPACK_IMPORTED_MODULE_19__["default"], _assets_sounds_e09_mp3__WEBPACK_IMPORTED_MODULE_20__["default"], _assets_sounds_e10_mp3__WEBPACK_IMPORTED_MODULE_21__["default"], _assets_sounds_e11_mp3__WEBPACK_IMPORTED_MODULE_22__["default"], _assets_sounds_e12_mp3__WEBPACK_IMPORTED_MODULE_23__["default"], _assets_sounds_e13_mp3__WEBPACK_IMPORTED_MODULE_24__["default"]];
      const index = Math.floor(Math.random() * 12);
      let audio = new Audio();
      audio.src = explCellSounds[index];
      audio.autoplay = true;
    } else if (soundType === "win") {
      let audio = new Audio();
      audio.src = _assets_sounds_win_mp3__WEBPACK_IMPORTED_MODULE_0__["default"];
      audio.autoplay = true;
    }
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (soundAudio);

/***/ }),

/***/ "./js/updateLocalStorage.js":
/*!**********************************!*\
  !*** ./js/updateLocalStorage.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _data_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/data */ "./js/data/data.js");

const updateLocalStorage = () => {
  localStorage.setItem("minesweeper-data", JSON.stringify(_data_data__WEBPACK_IMPORTED_MODULE_0__["default"]));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateLocalStorage);

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./scss/main.scss":
/*!*******************************************************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./scss/main.scss ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "../node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "../node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "../node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! @img/bg.png */ "./assets/img/bg.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;600;700&family=Roboto&display=swap);"]);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  --backlight-color: #ffffff;\n  --lightest-color: #ffffff;\n  --darkest-color: #2a2013;\n  --darkest-shadow: #5b4e3e;\n  --bg-light-color: #eae6df;\n  --bg-dark-color: #d8cfc0;\n  --text-color: #79654e;\n  --title-shadow-color: #d6cfc7; }\n\n.dark-theme {\n  --backlight-color: #e0dee1;\n  --lightest-color: #515051;\n  --darkest-color: #0b0b0b;\n  --darkest-shadow: #00000000;\n  --bg-light-color: #3b393c;\n  --bg-dark-color: #2f2f2f;\n  --text-color: #000000;\n  --title-shadow-color: #898785; }\n\n.body {\n  font-family: \"Quicksand\";\n  color: var(--title-shadow-color); }\n\n.title {\n  color: var(--text-color);\n  font-weight: bold;\n  font-size: 44px; }\n  .title::after {\n    content: \"Minesweeper\";\n    color: var(--title-shadow-color);\n    opacity: 0.1; }\n  .title::before {\n    content: \"Minesweeper\";\n    color: var(--title-shadow-color);\n    opacity: 0.1; }\n\n.subtitle {\n  color: var(--text-color);\n  font-size: 16px;\n  text-shadow: 0 1px 1px var(--lightest-color);\n  font-weight: 600; }\n\n.message {\n  font-size: 24px;\n  text-align: center; }\n\n.last-games {\n  color: var(--text-color);\n  font-size: 16px;\n  text-shadow: 0 1px 1px var(--lightest-color);\n  font-weight: 600; }\n\n.cell {\n  font-size: 14px;\n  font-weight: 300;\n  text-shadow: 0 1px 1px var(--lightest-color), -0.5px -1px 1px var(--text-color); }\n\n.cell[data-num=\"1\"] {\n  color: #498ec0; }\n\n.cell[data-num=\"2\"] {\n  color: #4bae67; }\n\n.cell[data-num=\"3\"] {\n  color: #e77588; }\n\n.cell[data-num=\"4\"] {\n  color: #9676ed; }\n\n.cell[data-num=\"5\"] {\n  color: #dd89f0; }\n\n.cell[data-num=\"6\"] {\n  color: #36b0b0; }\n\n.cell[data-num=\"7\"] {\n  color: var(--darkest-color); }\n\n.cell[data-num=\"8\"] {\n  color: var(--backlight-color); }\n\n@media (max-width: 480px) {\n  .message {\n    font-size: 18px; } }\n\n.settings__title {\n  position: relative;\n  text-align: center;\n  margin: 20px auto 0; }\n  .settings__title_range-input {\n    margin: 20px auto 5px; }\n\n.game-field {\n  display: grid;\n  padding: 2px;\n  gap: 2px;\n  background: var(--bg-dark-color);\n  outline: none;\n  -webkit-transition: 0.2s;\n  transition: opacity 0.2s;\n  border-radius: 5px;\n  box-shadow: inset 0px 2px 5px var(--text-color), 0px 1px 2px var(--lightest-color);\n  width: fit-content;\n  margin: 20px auto; }\n  .game-field_size-10 {\n    grid-template-columns: repeat(10, auto);\n    border-radius: 8px;\n    padding: 4px;\n    gap: 4px; }\n    .game-field_size-10 .cell {\n      width: 40px;\n      height: 40px;\n      border-radius: 8px; }\n  .game-field_size-15 {\n    grid-template-columns: repeat(15, auto);\n    border-radius: 3px;\n    padding: 3px;\n    gap: 3px; }\n    .game-field_size-15 .cell {\n      width: 26px;\n      height: 26px;\n      border-radius: 3px; }\n  .game-field_size-25 {\n    grid-template-columns: repeat(25, auto);\n    border-radius: 3px;\n    padding: 2px;\n    gap: 2px; }\n    .game-field_size-25 .cell {\n      width: 16px;\n      height: 16px;\n      border-radius: 2px; }\n\n@media (max-width: 480px) {\n  .game-field {\n    display: grid;\n    padding: 2px;\n    gap: 2px;\n    border-radius: 5px;\n    margin: 20px auto; }\n    .game-field_size-10 {\n      border-radius: 4px;\n      padding: 1px;\n      gap: 1px; }\n      .game-field_size-10 .cell {\n        width: 30px;\n        height: 30px;\n        border-radius: 4px; }\n    .game-field_size-15 {\n      border-radius: 2px;\n      padding: 1px;\n      gap: 1px; }\n      .game-field_size-15 .cell {\n        width: 18px;\n        height: 18px;\n        border-radius: 2px; }\n    .game-field_size-25 {\n      border-radius: 2px;\n      padding: 1px;\n      gap: 1px; }\n      .game-field_size-25 .cell {\n        width: 18px;\n        height: 18px;\n        border-radius: 2px; } }\n\n.last-games {\n  margin: 0 auto;\n  width: fit-content; }\n  .last-games__list {\n    display: flex;\n    flex-direction: column;\n    border-radius: 5px;\n    box-shadow: inset 0px 2px 5px var(--text-color), 0px 1px 2px var(--lightest-color);\n    padding: 6px;\n    gap: 6px;\n    background: var(--bg-dark-color); }\n  .last-games__item {\n    display: flex;\n    gap: 15px;\n    justify-content: space-between; }\n\n.info {\n  display: flex;\n  gap: 10px;\n  flex-direction: column;\n  align-items: center; }\n\n.info__list {\n  display: flex;\n  gap: 15px; }\n\n.info__buttons {\n  display: flex;\n  gap: 20px; }\n\n.btn {\n  background-color: transparent;\n  font-family: \"Quicksand\";\n  padding: 0;\n  border: none;\n  opacity: 0.8;\n  cursor: pointer;\n  display: block; }\n  .btn svg {\n    display: block;\n    align-self: center; }\n  .btn .path-bg {\n    transition: 0.3s; }\n  .btn_line .path-bg {\n    fill: var(--text-color); }\n  .btn_line:hover .path-bg {\n    opacity: 0.5; }\n  .btn_fill {\n    background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + "), linear-gradient(180deg, var(--bg-light-color) 0%, var(--bg-dark-color) 100%);\n    box-shadow: 0px 2px 5px var(--darkest-color), inset 0px 2px 2px var(--bg-light-color); }\n  .btn_text {\n    font-size: inherit;\n    text-align: center;\n    display: inline;\n    font-weight: 600; }\n    .btn_text span {\n      text-decoration: underline; }\n  .btn_new-game {\n    font-size: 35px;\n    font-weight: bold;\n    margin: 10px auto;\n    display: block;\n    color: var(--text-color);\n    position: relative; }\n    .btn_new-game:hover {\n      color: var(--darkest-color); }\n    .btn_new-game:before, .btn_new-game:after {\n      content: \"Start new game\";\n      color: var(--title-shadow-color);\n      position: absolute;\n      width: 272px;\n      opacity: 0.1; }\n    .btn_new-game:before {\n      top: 1px;\n      left: 1px; }\n    .btn_new-game:after {\n      top: 2px;\n      left: 2px; }\n\n.radio-input {\n  gap: 5px;\n  margin: 0 auto;\n  display: flex;\n  align-items: center;\n  width: fit-content; }\n  .radio-input__input {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    appearance: none;\n    border-radius: 50%;\n    padding: 5px;\n    cursor: pointer;\n    width: 12px;\n    height: 12px;\n    background-color: var(--bg-dark-color);\n    box-shadow: inset 0px 1px 2px var(--text-color), 0px 1px 2px var(--lightest-color);\n    transition: 0.2s all linear;\n    outline: none;\n    margin-right: 5px;\n    position: relative;\n    top: 4px; }\n    .radio-input__input__label {\n      padding-top: -10px; }\n    .radio-input__input:checked {\n      background-color: var(--backlight-color); }\n    .radio-input__input:hover {\n      opacity: 0.6; }\n\n.range-input {\n  width: 200px;\n  margin: 0 auto;\n  display: flex;\n  gap: 5px;\n  align-items: center; }\n  .range-input__arrow-left {\n    transform: rotate(180deg); }\n  .range-input__field {\n    -webkit-appearance: none;\n    appearance: none;\n    width: 100%;\n    height: 10px;\n    background: var(--bg-dark-color);\n    outline: none;\n    opacity: 0.7;\n    -webkit-transition: 0.2s;\n    transition: opacity 0.2s;\n    border-radius: 5px;\n    box-shadow: inset 0px 2px 5px var(--text-color), 0px 1px 2px var(--lightest-color); }\n    .range-input__field::-webkit-slider-thumb {\n      -webkit-appearance: none;\n      appearance: none;\n      width: 20px;\n      height: 20px;\n      cursor: pointer;\n      border-radius: 50%;\n      background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + "), linear-gradient(180deg, var(--bg-light-color) 0%, var(--bg-dark-color) 100%);\n      box-shadow: 0px 2px 5px var(--darkest-color), inset 0px 2px 2px var(--bg-light-color);\n      transition: 0.3s; }\n      .range-input__field::-webkit-slider-thumb:hover {\n        box-shadow: 0px 2px 5px var(--darkest-color), inset 0px 2px 2px var(--lightest-color);\n        transition: 0.3s; }\n      .range-input__field::-webkit-slider-thumb:active {\n        background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + "), linear-gradient(180deg, var(--bg-dark-color) 0%, var(--bg-light-color) 100%); }\n\n.title {\n  position: relative;\n  display: block;\n  width: fit-content;\n  margin: 20px auto; }\n  .title::before {\n    position: absolute;\n    top: 1px;\n    left: 1px; }\n  .title::after {\n    position: absolute;\n    top: 2px;\n    left: 2px; }\n\n.cell:active {\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + "), linear-gradient(180deg, var(--bg-dark-color) 0%, var(--bg-light-color) 100%); }\n\n.cell:hover {\n  box-shadow: 0px 2px 5px var(--darkest-color), inset 0px 2px 2px var(--lightest-color);\n  transition: 0.3s; }\n\n.cell_open {\n  cursor: default;\n  background: transparent;\n  box-shadow: none; }\n\n.cell_open {\n  cursor: default; }\n  .cell_open:hover {\n    box-shadow: none; }\n  .cell_open:active {\n    background: none; }\n\n.cell_mine {\n  position: relative; }\n  .cell_mine::after {\n    position: absolute;\n    content: \"\";\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 12px;\n    height: 12px;\n    background-color: var(--backlight-color);\n    background-color: var(--darkest-color);\n    border-radius: 50%;\n    box-shadow: inset 0px 1px 2px var(--text-color), 0px 1px 2px var(--lightest-color); }\n\n.cell_expl::after {\n  background-color: #ae1a1a; }\n\n.cell_flag {\n  position: relative; }\n  .cell_flag::after {\n    position: absolute;\n    content: \"\";\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 12px;\n    height: 12px;\n    background-color: var(--backlight-color);\n    background-color: white;\n    border-radius: 50%;\n    box-shadow: inset 0px 1px 2px var(--text-color), 0px 1px 2px var(--lightest-color); }\n\n.game-field_easy .cell::after {\n  width: 16px;\n  height: 16px; }\n\n.game-field_medium .cell::after {\n  width: 12px;\n  height: 12px; }\n\n.game-field_hard .cell::after {\n  width: 8px;\n  height: 8px; }\n\n.html {\n  min-height: 100vh;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none; }\n\n.body {\n  margin: 0;\n  padding: 0;\n  background: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + "), linear-gradient(180deg, var(--bg-light-color) 0%, var(--bg-dark-color) 100%); }\n\n.btn_active .path-bg {\n  fill: var(--backlight-color);\n  transition: 0.3s; }\n\n.btn_active svg {\n  filter: drop-shadow(0px -1px 1px var(--darkest-shadow)); }\n", "",{"version":3,"sources":["webpack://./scss/abstracts/_variables.scss","webpack://./scss/themes/_dark-theme.scss","webpack://./scss/base/_typography.scss","webpack://./scss/layout/_settings.scss","webpack://./scss/layout/_game-field.scss","webpack://./scss/layout/_last-games.scss","webpack://./scss/layout/_info.scss","webpack://./scss/components/_buttons.scss","webpack://./scss/components/_radio-input.scss","webpack://./scss/components/_range-input.scss","webpack://./scss/components/_titles.scss","webpack://./scss/components/_cell.scss","webpack://./scss/pages/_home.scss","webpack://./scss/base/_helpers.scss"],"names":[],"mappings":"AAAA;EACE,0BAAkB;EAClB,yBAAiB;EACjB,wBAAgB;EAChB,yBAAiB;EAEjB,yBAAiB;EACjB,wBAAgB;EAEhB,qBAAa;EACb,6BAAqB,EAAA;;ACVvB;EACE,0BAAkB;EAClB,yBAAiB;EACjB,wBAAgB;EAChB,2BAAiB;EAGjB,yBAAiB;EACjB,wBAAgB;EAEhB,qBAAa;EACb,6BAAqB,EAAA;;ACXvB;EACE,wBAAwB;EACxB,gCAAgC,EAAA;;AAGlC;EACE,wBAAwB;EACxB,iBAAiB;EACjB,eAAe,EAAA;EAHjB;IAMI,sBAAsB;IACtB,gCAAgC;IAChC,YAAY,EAAA;EARhB;IAWI,sBAAsB;IACtB,gCAAgC;IAChC,YAAY,EAAA;;AAIhB;EACE,wBAAwB;EACxB,eAAe;EACf,4CAA4C;EAC5C,gBAAgB,EAAA;;AAGlB;EACE,eAAe;EACf,kBAAkB,EAAA;;AAGpB;EACE,wBAAwB;EACxB,eAAe;EACf,4CAA4C;EAC5C,gBAAgB,EAAA;;AAGlB;EACE,eAAe;EACf,gBAAgB;EAChB,+EACmC,EAAA;;AAErC;EACE,cAAwB,EAAA;;AAE1B;EACE,cAAwB,EAAA;;AAE1B;EACE,cAAyB,EAAA;;AAE3B;EACE,cAAyB,EAAA;;AAE3B;EACE,cAAyB,EAAA;;AAE3B;EACE,cAAwB,EAAA;;AAE1B;EACE,2BAA2B,EAAA;;AAE7B;EACE,6BAA6B,EAAA;;AAK/B;EACE;IACE,eAAe,EAAA,EAEhB;;AC7ED;EACE,kBAAkB;EAClB,kBAAkB;EAClB,mBAAmB,EAAA;EAEnB;IACE,qBAAqB,EAAA;;ACP3B;EACE,aAAa;EACb,YAAY;EACZ,QAAQ;EACR,gCAAgC;EAChC,aAAa;EACb,wBAAwB;EACxB,wBAAwB;EACxB,kBAAkB;EAClB,kFACmC;EACnC,kBAAkB;EAClB,iBAAiB,EAAA;EAEjB;IACE,uCAAuC;IACvC,kBAAkB;IAClB,YAAY;IACZ,QAAQ,EAAA;IAJT;MAOG,WAAW;MACX,YAAY;MACZ,kBAAkB,EAAA;EAGtB;IACE,uCAAuC;IACvC,kBAAkB;IAClB,YAAY;IACZ,QAAQ,EAAA;IAJT;MAMG,WAAW;MACX,YAAY;MACZ,kBAAkB,EAAA;EAGtB;IACE,uCAAuC;IACvC,kBAAkB;IAClB,YAAY;IACZ,QAAQ,EAAA;IAJT;MAMG,WAAW;MACX,YAAY;MACZ,kBAAkB,EAAA;;AAKxB;EACE;IACE,aAAa;IACb,YAAY;IACZ,QAAQ;IACR,kBAAkB;IAClB,iBAAiB,EAAA;IAEjB;MACE,kBAAkB;MAClB,YAAY;MACZ,QAAQ,EAAA;MAHT;QAMG,WAAW;QACX,YAAY;QACZ,kBAAkB,EAAA;IAGtB;MACE,kBAAkB;MAClB,YAAY;MACZ,QAAQ,EAAA;MAHT;QAKG,WAAW;QACX,YAAY;QACZ,kBAAkB,EAAA;IAGtB;MACE,kBAAkB;MAClB,YAAY;MACZ,QAAQ,EAAA;MAHT;QAKG,WAAW;QACX,YAAY;QACZ,kBAAkB,EAAA,EACnB;;ACvFP;EACE,cAAc;EACd,kBAAkB,EAAA;EAElB;IACE,aAAa;IACb,sBAAsB;IACtB,kBAAkB;IAClB,kFACmC;IACnC,YAAY;IACZ,QAAQ;IACR,gCAAgC,EAAA;EAGlC;IACE,aAAa;IACb,SAAS;IACT,8BAA8B,EAAA;;AClBlC;EACE,aAAa;EACb,SAAS;EACT,sBAAsB;EACtB,mBAAmB,EAAA;;AAGrB;EACE,aAAa;EACb,SAAS,EAAA;;AAGX;EACE,aAAa;EACb,SAAS,EAAA;;ACdX;EACE,6BAA6B;EAC7B,wBAAwB;EAExB,UAAU;EACV,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,cAAc,EAAA;EARhB;IAWI,cAAc;IACd,kBAAkB,EAAA;EAZtB;IAgBI,gBAAgB,EAAA;EAGjB;IAEG,uBAAuB,EAAA;EAF1B;IAOK,YAAY,EAAA;EAKlB;IACE,iIAKG;IACH,qFACyC,EAAA;EAG3C;IACE,kBAAkB;IAClB,kBAAkB;IAClB,eAAe;IAEf,gBAAgB,EAAA;IALjB;MAOG,0BAA0B,EAAA;EAI9B;IACE,eAAe;IACf,iBAAiB;IACjB,iBAAiB;IACjB,cAAc;IACd,wBAAwB;IACxB,kBAAkB,EAAA;IANnB;MASG,2BAA2B,EAAA;IAT9B;MAcG,yBAAyB;MACzB,gCAAgC;MAChC,kBAAkB;MAClB,YAAY;MACZ,YAAY,EAAA;IAlBf;MAqBG,QAAQ;MACR,SAAS,EAAA;IAtBZ;MAyBG,QAAQ;MACR,SAAS,EAAA;;AC/Ef;EACE,QAAQ;EACR,cAAc;EACd,aAAa;EACb,mBAAmB;EACnB,kBAAkB,EAAA;EAElB;IACE,wBAAwB;IACxB,qBAAqB;IACrB,gBAAgB;IAEhB,kBAAkB;IAClB,YAAY;IACZ,eAAe;IACf,WAAW;IACX,YAAY;IACZ,sCAAsC;IACtC,kFAAkF;IAElF,2BAA2B;IAC3B,aAAa;IACb,iBAAiB;IAEjB,kBAAkB;IAClB,QAAQ,EAAA;IAER;MACE,kBAAkB,EAAA;IArBrB;MAyBG,wCAAwC,EAAA;IAzB3C;MA6BG,YAAY,EAAA;;ACpClB;EACE,YAAY;EACZ,cAAc;EACd,aAAa;EACb,QAAQ;EACR,mBAAmB,EAAA;EAEnB;IACE,yBAAyB,EAAA;EAG3B;IACE,wBAAwB;IACxB,gBAAgB;IAChB,WAAW;IACX,YAAY;IACZ,gCAAgC;IAChC,aAAa;IACb,YAAY;IACZ,wBAAwB;IACxB,wBAAwB;IACxB,kBAAkB;IAClB,kFACmC,EAAA;IAZpC;MAeG,wBAAwB;MACxB,gBAAgB;MAChB,WAAW;MACX,YAAY;MACZ,eAAe;MACf,kBAAkB;MAClB,iIAKG;MACH,qFACyC;MACzC,gBAAgB,EAAA;MA7BnB;QAgCK,qFACyC;QACzC,gBAAgB,EAAA;MAlCrB;QAsCK,iIAKG,EAAA;;ACtDX;EACE,kBAAkB;EAClB,cAAc;EACd,kBAAkB;EAClB,iBAAiB,EAAA;EAJnB;IAOI,kBAAkB;IAClB,QAAQ;IACR,SAAS,EAAA;EATb;IAaI,kBAAkB;IAClB,QAAQ;IACR,SAAS,EAAA;;ACfb;EAEI,iIAKG,EAAA;;AAPP;EAWI,qFACyC;EACzC,gBAAgB,EAAA;;AAGlB;EACE,eAAe;EACf,uBAAuB;EACvB,gBAAgB,EAAA;;AAGlB;EACE,eAAe,EAAA;EADhB;IAGG,gBAAgB,EAAA;EAHnB;IAMG,gBAAgB,EAAA;;AAIpB;EACE,kBAAkB,EAAA;EADnB;IAIG,kBAAkB;IAClB,WAAW;IACX,QAAQ;IACR,SAAS;IACT,gCAAgC;IAChC,WAAW;IACX,YAAY;IACZ,wCAAwC;IACxC,sCAAsC;IACtC,kBAAkB;IAClB,kFACmC,EAAA;;AAItC;EAEG,yBAAkC,EAAA;;AAItC;EACE,kBAAkB,EAAA;EADnB;IAIG,kBAAkB;IAClB,WAAW;IACX,QAAQ;IACR,SAAS;IACT,gCAAgC;IAChC,WAAW;IACX,YAAY;IACZ,wCAAwC;IACxC,uBAAuB;IACvB,kBAAkB;IAClB,kFACmC,EAAA;;AAKzC;EAEI,WAAW;EACX,YAAY,EAAA;;AAIhB;EAEI,WAAW;EACX,YAAY,EAAA;;AAIhB;EAEI,UAAU;EACV,WAAW,EAAA;;AC9Ff;EACE,iBAAiB;EACjB,yBAAyB;EACzB,sBAAsB;EACtB,qBAAqB,EAAA;;AAGvB;EACE,SAAS;EACT,UAAU;EACV,iIAC8E,EAAA;;ACXhF;EAEI,4BAA4B;EAC5B,gBAAgB,EAAA;;AAHpB;EAOI,uDAAuD,EAAA","sourcesContent":["body {\r\n  --backlight-color: #ffffff;\r\n  --lightest-color: #ffffff;\r\n  --darkest-color: #2a2013;\r\n  --darkest-shadow: #5b4e3e;\r\n\r\n  --bg-light-color: #eae6df;\r\n  --bg-dark-color: #d8cfc0;\r\n\r\n  --text-color: #79654e;\r\n  --title-shadow-color: #d6cfc7;\r\n}",".dark-theme {\r\n  --backlight-color: #e0dee1;\r\n  --lightest-color: #515051;\r\n  --darkest-color: #0b0b0b;\r\n  --darkest-shadow: #00000000;\r\n\r\n\r\n  --bg-light-color: #3b393c;\r\n  --bg-dark-color: #2f2f2f;\r\n\r\n  --text-color: #000000;\r\n  --title-shadow-color: #898785;\r\n}\r\n",".body {\r\n  font-family: \"Quicksand\";\r\n  color: var(--title-shadow-color);\r\n}\r\n\r\n.title {\r\n  color: var(--text-color);\r\n  font-weight: bold;\r\n  font-size: 44px;\r\n\r\n  &::after {\r\n    content: \"Minesweeper\";\r\n    color: var(--title-shadow-color);\r\n    opacity: 0.1;\r\n  }\r\n  &::before {\r\n    content: \"Minesweeper\";\r\n    color: var(--title-shadow-color);\r\n    opacity: 0.1;\r\n  }\r\n}\r\n\r\n.subtitle {\r\n  color: var(--text-color);\r\n  font-size: 16px;\r\n  text-shadow: 0 1px 1px var(--lightest-color);\r\n  font-weight: 600;\r\n}\r\n\r\n.message {\r\n  font-size: 24px;\r\n  text-align: center;\r\n}\r\n\r\n.last-games {\r\n  color: var(--text-color);\r\n  font-size: 16px;\r\n  text-shadow: 0 1px 1px var(--lightest-color);\r\n  font-weight: 600;\r\n}\r\n\r\n.cell {\r\n  font-size: 14px;\r\n  font-weight: 300;\r\n  text-shadow: 0 1px 1px var(--lightest-color),\r\n    -0.5px -1px 1px var(--text-color);\r\n}\r\n.cell[data-num=\"1\"] {\r\n  color: rgb(73, 142, 192);\r\n}\r\n.cell[data-num=\"2\"] {\r\n  color: rgb(75, 174, 103);\r\n}\r\n.cell[data-num=\"3\"] {\r\n  color: rgb(231, 117, 136);\r\n}\r\n.cell[data-num=\"4\"] {\r\n  color: rgb(150, 118, 237);\r\n}\r\n.cell[data-num=\"5\"] {\r\n  color: rgb(221, 137, 240);\r\n}\r\n.cell[data-num=\"6\"] {\r\n  color: rgb(54, 176, 176);\r\n}\r\n.cell[data-num=\"7\"] {\r\n  color: var(--darkest-color);\r\n}\r\n.cell[data-num=\"8\"] {\r\n  color: var(--backlight-color);\r\n}\r\n\r\n\r\n\r\n@media (max-width: 480px) {\r\n  .message {\r\n    font-size: 18px;\r\n\r\n  }\r\n}",".settings {\r\n  &__title {\r\n    position: relative;\r\n    text-align: center;\r\n    margin: 20px auto 0;\r\n\r\n    &_range-input {\r\n      margin: 20px auto 5px;\r\n    }\r\n  }\r\n}\r\n",".game-field {\r\n  display: grid;\r\n  padding: 2px;\r\n  gap: 2px;\r\n  background: var(--bg-dark-color);\r\n  outline: none;\r\n  -webkit-transition: 0.2s;\r\n  transition: opacity 0.2s;\r\n  border-radius: 5px;\r\n  box-shadow: inset 0px 2px 5px var(--text-color),\r\n    0px 1px 2px var(--lightest-color);\r\n  width: fit-content;\r\n  margin: 20px auto;\r\n\r\n  &_size-10 {\r\n    grid-template-columns: repeat(10, auto);\r\n    border-radius: 8px;\r\n    padding: 4px;\r\n    gap: 4px;\r\n\r\n    & .cell {\r\n      width: 40px;\r\n      height: 40px;\r\n      border-radius: 8px;\r\n    }\r\n  }\r\n  &_size-15 {\r\n    grid-template-columns: repeat(15, auto);\r\n    border-radius: 3px;\r\n    padding: 3px;\r\n    gap: 3px;\r\n    & .cell {\r\n      width: 26px;\r\n      height: 26px;\r\n      border-radius: 3px;\r\n    }\r\n  }\r\n  &_size-25 {\r\n    grid-template-columns: repeat(25, auto);\r\n    border-radius: 3px;\r\n    padding: 2px;\r\n    gap: 2px;\r\n    & .cell {\r\n      width: 16px;\r\n      height: 16px;\r\n      border-radius: 2px;\r\n    }\r\n  }\r\n}\r\n\r\n@media (max-width: 480px) {\r\n  .game-field {\r\n    display: grid;\r\n    padding: 2px;\r\n    gap: 2px;\r\n    border-radius: 5px;\r\n    margin: 20px auto;\r\n  \r\n    &_size-10 {\r\n      border-radius: 4px;\r\n      padding: 1px;\r\n      gap: 1px;\r\n  \r\n      & .cell {\r\n        width: 30px;\r\n        height: 30px;\r\n        border-radius: 4px;\r\n      }\r\n    }\r\n    &_size-15 {\r\n      border-radius: 2px;\r\n      padding: 1px;\r\n      gap: 1px;\r\n      & .cell {\r\n        width: 18px;\r\n        height: 18px;\r\n        border-radius: 2px;\r\n      }\r\n    }\r\n    &_size-25 {\r\n      border-radius: 2px;\r\n      padding: 1px;\r\n      gap: 1px;\r\n      & .cell {\r\n        width: 18px;\r\n        height: 18px;\r\n        border-radius: 2px;\r\n      }\r\n    }\r\n  }}\r\n\r\n",".last-games {\n  margin: 0 auto;\n  width: fit-content;\n\n  &__list {\n    display: flex;\n    flex-direction: column;\n    border-radius: 5px;\n    box-shadow: inset 0px 2px 5px var(--text-color),\n      0px 1px 2px var(--lightest-color);\n    padding: 6px;\n    gap: 6px;\n    background: var(--bg-dark-color);\n  }\n\n  &__item {\n    display: flex;\n    gap: 15px;\n    justify-content: space-between;\n  }\n}\n",".info {\r\n  display: flex;\r\n  gap: 10px;\r\n  flex-direction: column;\r\n  align-items: center;\r\n}\r\n\r\n.info__list {\r\n  display: flex;\r\n  gap: 15px;\r\n}\r\n\r\n.info__buttons {\r\n  display: flex;\r\n  gap: 20px;\r\n}",".btn {\r\n  background-color: transparent;\r\n  font-family: \"Quicksand\";\r\n\r\n  padding: 0;\r\n  border: none;\r\n  opacity: 0.8;\r\n  cursor: pointer;\r\n  display: block;\r\n\r\n  & svg {\r\n    display: block;\r\n    align-self: center;\r\n  }\r\n\r\n  & .path-bg {\r\n    transition: 0.3s;\r\n  }\r\n\r\n  &_line {\r\n    & .path-bg {\r\n      fill: var(--text-color);\r\n    }\r\n\r\n    &:hover {\r\n      & .path-bg {\r\n        opacity: 0.5;\r\n      }\r\n    }\r\n  }\r\n\r\n  &_fill {\r\n    background: url(@img/bg.png),\r\n      linear-gradient(\r\n        180deg,\r\n        var(--bg-light-color) 0%,\r\n        var(--bg-dark-color) 100%\r\n      );\r\n    box-shadow: 0px 2px 5px var(--darkest-color),\r\n      inset 0px 2px 2px var(--bg-light-color);\r\n  }\r\n\r\n  &_text {\r\n    font-size: inherit;\r\n    text-align: center;\r\n    display: inline;\r\n    // color: var(--text-color);\r\n    font-weight: 600;\r\n    & span {\r\n      text-decoration: underline;\r\n    }\r\n  }\r\n\r\n  &_new-game {\r\n    font-size: 35px;\r\n    font-weight: bold;\r\n    margin: 10px auto;\r\n    display: block;\r\n    color: var(--text-color);\r\n    position: relative;\r\n\r\n    &:hover {\r\n      color: var(--darkest-color);\r\n    }\r\n\r\n    &:before,\r\n    &:after {\r\n      content: \"Start new game\";\r\n      color: var(--title-shadow-color);\r\n      position: absolute;\r\n      width: 272px;\r\n      opacity: 0.1;\r\n    }\r\n    &:before {\r\n      top: 1px;\r\n      left: 1px;\r\n    }\r\n    &:after {\r\n      top: 2px;\r\n      left: 2px;\r\n    }\r\n  }\r\n}\r\n",".radio-input {\r\n  gap: 5px;\r\n  margin: 0 auto;\r\n  display: flex;\r\n  align-items: center;\r\n  width: fit-content;\r\n\r\n  &__input {\r\n    -webkit-appearance: none;\r\n    -moz-appearance: none;\r\n    appearance: none;\r\n\r\n    border-radius: 50%;\r\n    padding: 5px;\r\n    cursor: pointer;\r\n    width: 12px;\r\n    height: 12px;\r\n    background-color: var(--bg-dark-color);\r\n    box-shadow: inset 0px 1px 2px var(--text-color), 0px 1px 2px var(--lightest-color); \r\n\r\n    transition: 0.2s all linear;\r\n    outline: none;\r\n    margin-right: 5px;\r\n\r\n    position: relative;\r\n    top: 4px;\r\n\r\n    &__label {\r\n      padding-top: -10px;\r\n    }\r\n\r\n    &:checked {\r\n      background-color: var(--backlight-color);\r\n    }\r\n\r\n    &:hover {\r\n      opacity: 0.6;\r\n    }\r\n  }\r\n}\r\n",".range-input {\r\n  width: 200px;\r\n  margin: 0 auto;\r\n  display: flex;\r\n  gap: 5px;\r\n  align-items: center;\r\n\r\n  &__arrow-left {\r\n    transform: rotate(180deg);\r\n  }\r\n\r\n  &__field {\r\n    -webkit-appearance: none;\r\n    appearance: none;\r\n    width: 100%;\r\n    height: 10px;\r\n    background: var(--bg-dark-color);\r\n    outline: none;\r\n    opacity: 0.7;\r\n    -webkit-transition: 0.2s;\r\n    transition: opacity 0.2s;\r\n    border-radius: 5px;\r\n    box-shadow: inset 0px 2px 5px var(--text-color),\r\n      0px 1px 2px var(--lightest-color);\r\n\r\n    &::-webkit-slider-thumb {\r\n      -webkit-appearance: none;\r\n      appearance: none;\r\n      width: 20px;\r\n      height: 20px;\r\n      cursor: pointer;\r\n      border-radius: 50%;\r\n      background: url(@img/bg.png),\r\n        linear-gradient(\r\n          180deg,\r\n          var(--bg-light-color) 0%,\r\n          var(--bg-dark-color) 100%\r\n        );\r\n      box-shadow: 0px 2px 5px var(--darkest-color),\r\n        inset 0px 2px 2px var(--bg-light-color);\r\n      transition: 0.3s;\r\n\r\n      &:hover {\r\n        box-shadow: 0px 2px 5px var(--darkest-color),\r\n          inset 0px 2px 2px var(--lightest-color);\r\n        transition: 0.3s;\r\n      }\r\n\r\n      &:active {\r\n        background: url(@img/bg.png),\r\n          linear-gradient(\r\n            180deg,\r\n            var(--bg-dark-color) 0%,\r\n            var(--bg-light-color) 100%\r\n          );\r\n      }\r\n    }\r\n  }\r\n}\r\n",".title {\r\n  position: relative;\r\n  display: block;\r\n  width: fit-content;\r\n  margin: 20px auto;\r\n\r\n  &::before {\r\n    position: absolute;\r\n    top: 1px;\r\n    left: 1px;\r\n  }\r\n\r\n  &::after {\r\n    position: absolute;\r\n    top: 2px;\r\n    left: 2px;\r\n  }\r\n}\r\n",".cell {\r\n  &:active {\r\n    background: url(@img/bg.png),\r\n      linear-gradient(\r\n        180deg,\r\n        var(--bg-dark-color) 0%,\r\n        var(--bg-light-color) 100%\r\n      );\r\n  }\r\n\r\n  &:hover {\r\n    box-shadow: 0px 2px 5px var(--darkest-color),\r\n      inset 0px 2px 2px var(--lightest-color);\r\n    transition: 0.3s;\r\n  }\r\n\r\n  &_open {\r\n    cursor: default;\r\n    background: transparent;\r\n    box-shadow: none;\r\n  }\r\n\r\n  &_open {\r\n    cursor: default;\r\n    &:hover {\r\n      box-shadow: none;\r\n    }\r\n    &:active {\r\n      background: none;\r\n    }\r\n  }\r\n\r\n  &_mine {\r\n    position: relative;\r\n\r\n    &::after {\r\n      position: absolute;\r\n      content: \"\";\r\n      top: 50%;\r\n      left: 50%;\r\n      transform: translate(-50%, -50%);\r\n      width: 12px;\r\n      height: 12px;\r\n      background-color: var(--backlight-color);\r\n      background-color: var(--darkest-color);\r\n      border-radius: 50%;\r\n      box-shadow: inset 0px 1px 2px var(--text-color),\r\n        0px 1px 2px var(--lightest-color);\r\n    }\r\n  }\r\n\r\n  &_expl {\r\n    &::after {\r\n      background-color: rgb(174, 26, 26);\r\n    }\r\n  }\r\n\r\n  &_flag {\r\n    position: relative;\r\n\r\n    &::after {\r\n      position: absolute;\r\n      content: \"\";\r\n      top: 50%;\r\n      left: 50%;\r\n      transform: translate(-50%, -50%);\r\n      width: 12px;\r\n      height: 12px;\r\n      background-color: var(--backlight-color);\r\n      background-color: white;\r\n      border-radius: 50%;\r\n      box-shadow: inset 0px 1px 2px var(--text-color),\r\n        0px 1px 2px var(--lightest-color);\r\n    }\r\n  }\r\n}\r\n\r\n.game-field_easy {\r\n  & .cell::after {\r\n    width: 16px;\r\n    height: 16px;\r\n  }\r\n}\r\n\r\n.game-field_medium {\r\n  & .cell::after {\r\n    width: 12px;\r\n    height: 12px;\r\n  }\r\n}\r\n\r\n.game-field_hard {\r\n  & .cell::after {\r\n    width: 8px;\r\n    height: 8px;\r\n  }\r\n}\r\n",".html {\r\n  min-height: 100vh;\r\n  -webkit-user-select: none;\r\n  -moz-user-select: none;\r\n  -ms-user-select: none;\r\n}\r\n\r\n.body {\r\n  margin: 0;\r\n  padding: 0;\r\n  background: url(@img/bg.png),\r\n    linear-gradient(180deg, var(--bg-light-color) 0%, var(--bg-dark-color) 100%);\r\n}\r\n",".btn_active {\r\n  & .path-bg {\r\n    fill: var(--backlight-color);\r\n    transition: 0.3s;\r\n  }\r\n\r\n  & svg {\r\n    filter: drop-shadow(0px -1px 1px var(--darkest-shadow));\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!*************************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \*************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./assets/sounds/01.mp3":
/*!******************************!*\
  !*** ./assets/sounds/01.mp3 ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "2ab55fe94978927684954a0142e658fc.mp3");

/***/ }),

/***/ "./assets/sounds/02.mp3":
/*!******************************!*\
  !*** ./assets/sounds/02.mp3 ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "3e3549ec4c5ec0c29ac800003967e3b5.mp3");

/***/ }),

/***/ "./assets/sounds/03.mp3":
/*!******************************!*\
  !*** ./assets/sounds/03.mp3 ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "03e7ce8bb014755ff897c3b206af9ea0.mp3");

/***/ }),

/***/ "./assets/sounds/04.mp3":
/*!******************************!*\
  !*** ./assets/sounds/04.mp3 ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "42a22eb3c99c158a770c30aba96b5282.mp3");

/***/ }),

/***/ "./assets/sounds/05.mp3":
/*!******************************!*\
  !*** ./assets/sounds/05.mp3 ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "1cdcbc2aa51dc873d39677a525f4bdd7.mp3");

/***/ }),

/***/ "./assets/sounds/06.mp3":
/*!******************************!*\
  !*** ./assets/sounds/06.mp3 ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "39841746d0db2d92092a6cf709f28386.mp3");

/***/ }),

/***/ "./assets/sounds/07.mp3":
/*!******************************!*\
  !*** ./assets/sounds/07.mp3 ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "66010c1885ed88287758a38f52335a2d.mp3");

/***/ }),

/***/ "./assets/sounds/08.mp3":
/*!******************************!*\
  !*** ./assets/sounds/08.mp3 ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "acc3d50d02e71b82563ab6a820ba876b.mp3");

/***/ }),

/***/ "./assets/sounds/09.mp3":
/*!******************************!*\
  !*** ./assets/sounds/09.mp3 ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "9768625952cb6f04ccb62847fa29e2c4.mp3");

/***/ }),

/***/ "./assets/sounds/10.mp3":
/*!******************************!*\
  !*** ./assets/sounds/10.mp3 ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "ce7a453d184a4676be720291521ecf55.mp3");

/***/ }),

/***/ "./assets/sounds/11.mp3":
/*!******************************!*\
  !*** ./assets/sounds/11.mp3 ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "8c10af72a144646df608b6673be7a15e.mp3");

/***/ }),

/***/ "./assets/sounds/e01.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e01.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "bd2a8e2bb6e67899ad6a5aa1f4a1fd44.mp3");

/***/ }),

/***/ "./assets/sounds/e02.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e02.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "0a683bc1d5431dc58a7b5738befc9089.mp3");

/***/ }),

/***/ "./assets/sounds/e03.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e03.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "077e326649a1b26da5cf2c56485b563a.mp3");

/***/ }),

/***/ "./assets/sounds/e04.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e04.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "d4822022c22b7a0b3e2eb684c48741c6.mp3");

/***/ }),

/***/ "./assets/sounds/e05.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e05.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "8321d25e226d6211dd4d7400bf3ee43b.mp3");

/***/ }),

/***/ "./assets/sounds/e06.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e06.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "afb1785a5e52022a50a948a454dea539.mp3");

/***/ }),

/***/ "./assets/sounds/e07.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e07.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "5727e16770eb1c18a7a9292d17412462.mp3");

/***/ }),

/***/ "./assets/sounds/e08.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e08.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "556e9926c7eee2eec85322d3b4ade066.mp3");

/***/ }),

/***/ "./assets/sounds/e09.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e09.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "fc1ffc286881668c2593d1becb59f432.mp3");

/***/ }),

/***/ "./assets/sounds/e10.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e10.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "e26ebb1baf0a69ba92907c6278b1a675.mp3");

/***/ }),

/***/ "./assets/sounds/e11.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e11.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "5c0f040b8e204744ffedcc00b8e2f77f.mp3");

/***/ }),

/***/ "./assets/sounds/e12.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e12.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "928c31eb0a1d5273beaa7850fb37bf4c.mp3");

/***/ }),

/***/ "./assets/sounds/e13.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/e13.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "76a3a80d15380c27d19349c0ba3dea2a.mp3");

/***/ }),

/***/ "./assets/sounds/win.mp3":
/*!*******************************!*\
  !*** ./assets/sounds/win.mp3 ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + "b7efee8c9bae64dd15b27d44183e676c.mp3");

/***/ }),

/***/ "./scss/main.scss":
/*!************************!*\
  !*** ./scss/main.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "../node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "../node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "../node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "../node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./scss/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!*********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \*********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!***********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \***********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!***********************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!****************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \****************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!**********************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./assets/img/bg.png":
/*!***************************!*\
  !*** ./assets/img/bg.png ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "00a0f7f2a040d01425a9.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scss/main.scss */ "./scss/main.scss");
/* harmony import */ var _js_data_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/data/data */ "./js/data/data.js");
/* harmony import */ var _js_firstRender_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/firstRender.js */ "./js/firstRender.js");
/* harmony import */ var _js_firstHandlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/firstHandlers */ "./js/firstHandlers.js");




window.onload = function () {
  (0,_js_firstRender_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_js_data_data__WEBPACK_IMPORTED_MODULE_1__["default"]);
  (0,_js_firstHandlers__WEBPACK_IMPORTED_MODULE_3__["default"])(_js_data_data__WEBPACK_IMPORTED_MODULE_1__["default"]);
};
})();

/******/ })()
;
//# sourceMappingURL=main.js.map