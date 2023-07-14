/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./components/app/app.ts":
/*!*******************************!*\
  !*** ./components/app/app.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _controller_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controller/controller */ "./components/controller/controller.ts");
/* harmony import */ var _view_appView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../view/appView */ "./components/view/appView.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class App {
    constructor() {
        this.controller = new _controller_controller__WEBPACK_IMPORTED_MODULE_0__.AppController();
        this.view = new _view_appView__WEBPACK_IMPORTED_MODULE_1__.AppView();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield this.controller.getCars();
            this.view.print(cars);
        });
    }
}


/***/ }),

/***/ "./components/controller/controller.ts":
/*!*********************************************!*\
  !*** ./components/controller/controller.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppController: () => (/* binding */ AppController)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class AppController {
    getCar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `http://127.0.0.1:3000/garage/${id}`;
            const response = yield fetch(url);
            const json = yield response.json();
            return json;
        });
    }
    getCars() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `http://127.0.0.1:3000/garage/`;
            return (yield fetch(url)).json();
        });
    }
    started(status) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `http://127.0.0.1:3000/engine/?id=1&status=${status}`;
            const response = yield fetch(url, { method: 'PATCH' });
            if (response.ok) {
                const json = yield response.json();
                console.log(json);
            }
            else {
                console.log(`Error HTTP: ${response.status}`);
            }
            console.log(response);
        });
    }
}


/***/ }),

/***/ "./components/view/appView.ts":
/*!************************************!*\
  !*** ./components/view/appView.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppView: () => (/* binding */ AppView)
/* harmony export */ });
class AppView {
    print(cars) {
        cars.forEach((e) => {
            const el = document.createElement('div');
            el.textContent = e.name;
            document.body.append(el);
            console.log(e.name);
        });
    }
}


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
/******/ 			// no module.id needed
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
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_app_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/app/app */ "./components/app/app.ts");

const app = new _components_app_app__WEBPACK_IMPORTED_MODULE_0__.App();
app.start();

})();

/******/ })()
;
//# sourceMappingURL=index.js.map