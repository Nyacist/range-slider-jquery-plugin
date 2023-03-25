/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./style.scss":
/*!********************!*\
  !*** ./style.scss ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./controller.ts":
/*!***********************!*\
  !*** ./controller.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RangeSliderController = void 0;
const model_1 = __webpack_require__(/*! ./model */ "./model.ts");
class RangeSliderController {
    constructor() {
        this.model = new model_1.RangeSliderModel();
    }
    handleGetOptions() {
        return this.model.getOptions();
    }
    handleSetOptions(props) {
        this.model.setOptions(props);
    }
}
exports.RangeSliderController = RangeSliderController;


/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js"));
const jquery_2 = __importDefault(__webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js"));
__webpack_require__(/*! ./style.scss */ "./style.scss");
const view_1 = __webpack_require__(/*! ./view */ "./view.ts");
(function ($) {
    $.fn.myPlugin = function (props) {
        const rangeView = new view_1.RangeSliderView(this, props);
        rangeView.mount();
    };
})(jquery_2.default);
(0, jquery_1.default)('#root').myPlugin({
    max: 1000,
    min: 100,
    type: 'range',
});
(0, jquery_1.default)('#root2').myPlugin({
    max: 1000,
    min: 100,
    type: 'one',
});
// const slider = document.querySelector<HTMLElement>('#slider');
// const thumb = document.querySelector<HTMLElement>('.thumb');
//
// if (thumb && slider) {
//     thumb.onmousedown = function(event) {
//         event.preventDefault(); // предотвратить запуск выделения (действие браузера)
//
//         let shiftX = event.clientX - thumb.getBoundingClientRect().left;
//         // shiftY здесь не нужен, слайдер двигается только по горизонтали
//
//         document.addEventListener('mousemove', onMouseMove);
//         document.addEventListener('mouseup', onMouseUp);
//         //console.log(event)
//
//         function onMouseMove(event: any) {
//             if (thumb && slider) {
//                 let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
//
//                 // курсор вышел из слайдера => оставить бегунок в его границах.
//                 if (newLeft < 0) {
//                     newLeft = 0;
//                 }
//                 let rightEdge = slider.offsetWidth - thumb.offsetWidth;
//                 if (newLeft > rightEdge) {
//                     newLeft = rightEdge;
//                 }
//
//                 thumb.style.left = newLeft + 'px';
//             }
//         }
//
//         function onMouseUp() {
//             document.removeEventListener('mouseup', onMouseUp);
//             document.removeEventListener('mousemove', onMouseMove);
//         }
//
//     };
//
//     thumb.addEventListener('dragstart', function() {
//         return false;
//     });
// }


/***/ }),

/***/ "./model.ts":
/*!******************!*\
  !*** ./model.ts ***!
  \******************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RangeSliderModel = void 0;
class RangeSliderModel {
    constructor() {
        this.defaultOptions = {
            min: 0,
            max: 100,
            type: 'one',
            color: 'gray',
            position: 'vertically', // 'horizontally' or 'vertically'
            //this.value = (this.min + this.max)/2
        };
        this.options = Object.assign({}, this.defaultOptions);
        if (false)
            {}
        if (false)
            {}
    }
    setValue(name) {
        var _a;
        if (this.options.min !== undefined && this.options.max !== undefined) {
            switch (name) {
                case 'leftPointerValue': {
                    this.options.leftPointerValue = (((_a = this.options) === null || _a === void 0 ? void 0 : _a.min) + this.options.max) / 4;
                }
                case 'rightPointerValue': {
                    this.options.rightPointerValue = this.options.max - (this.options.min + this.options.max) / 4;
                }
                // case 'value': {
                //     this.options.value = (this.options.min + this.options.max)/2
                // }
            }
        }
    }
    getOptions() {
        return this.options;
    }
    setOptions(props) {
        this.options = Object.assign(Object.assign({}, this.defaultOptions), props);
        //console.log(this.options)
    }
}
exports.RangeSliderModel = RangeSliderModel;


/***/ }),

/***/ "./view.ts":
/*!*****************!*\
  !*** ./view.ts ***!
  \*****************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RangeSliderView = void 0;
const jquery_1 = __importDefault(__webpack_require__(/*! jquery */ "../node_modules/jquery/dist/jquery.js"));
const controller_1 = __webpack_require__(/*! ./controller */ "./controller.ts");
class Thumb {
    constructor(props) {
        this.onMouseDown = function (e) {
            e.preventDefault();
            const root = e.data.root;
            const position = e.data.position;
            const onMouseMove = (e) => {
                var _a;
                let thumbPosition = e.clientX - (((_a = (0, jquery_1.default)('.slider', root).offset()) === null || _a === void 0 ? void 0 : _a.left) || 0);
                const sliderWidth = (0, jquery_1.default)('.slider', root).width() || 1;
                // курсор вышел из слайдера => оставить бегунок в его границах.
                if (thumbPosition < 0) {
                    thumbPosition = 0;
                }
                if (thumbPosition > sliderWidth) {
                    thumbPosition = sliderWidth;
                }
                const thumbPercentageValue = Math.round(thumbPosition / sliderWidth * 100);
                if (position == 'left') {
                    (0, jquery_1.default)('.progress', root).css('left', thumbPercentageValue + '%');
                }
                if (position == 'right') {
                    (0, jquery_1.default)('.progress', root).css('right', 100 - thumbPercentageValue + '%');
                }
            };
            const onMouseUp = () => {
                (0, jquery_1.default)(document).off('mousemove', onMouseMove);
                (0, jquery_1.default)(document).off('mouseup', onMouseUp);
            };
            (0, jquery_1.default)(document).on('mousemove', onMouseMove);
            (0, jquery_1.default)(document).on('mouseup', onMouseUp);
        };
        this.thumb = (0, jquery_1.default)(`<div class='thumb thumb_${props.positionClass}'></div>`);
        (0, jquery_1.default)(this.thumb).on('mousedown', { root: props.root, position: props.positionClass }, this.onMouseDown);
        (0, jquery_1.default)(this.thumb).on('dragstart', () => false);
    }
}
class RangeSliderView {
    constructor(root, props) {
        this.controller = new controller_1.RangeSliderController();
        this.root = root;
        //костыль, получать из модели
        if (props.type === 'one') {
            this.type = 'one';
        }
        else {
            this.type = 'range';
        }
        this.slider = (0, jquery_1.default)('<div class="slider"></div>');
        this.progressBar = (0, jquery_1.default)('<div class="progress"></div>');
        this.thumbs = [new Thumb({
                positionClass: "right",
                root: this.root
            })];
        if (this.type === 'range') {
            this.thumbs.unshift(new Thumb({
                positionClass: "left",
                root: this.root
            }));
        }
        this.setOptions(props);
        this.onClickProgress();
    }
    setOptions(props) {
        this.controller.handleSetOptions(props);
    }
    getOptions() {
        return this.controller.handleGetOptions(); // actual options from model
    }
    onClickProgress() {
        this.slider.on('click', (e) => {
            var _a;
            const progressBar = (0, jquery_1.default)('.progress', this.root);
            const thumbsPosition = [];
            thumbsPosition.push(+progressBar.css('right').replace(/[^0-9,.]/g, ''));
            if (this.type === 'range') {
                thumbsPosition.push(+progressBar.css('left').replace(/[^0-9,.]/g, ''));
            }
            const clickPosition = e.clientX - (((_a = (0, jquery_1.default)('.slider', this.root).offset()) === null || _a === void 0 ? void 0 : _a.left) || 0);
            const sliderWidth = (0, jquery_1.default)('.slider', this.root).width() || 1;
            const clickValue = Math.round(clickPosition / sliderWidth * 100);
            const progressBarOffset = thumbsPosition.map((element) => {
                return Math.round(element / sliderWidth * 100);
            });
            const distanceRight = Math.abs(100 - progressBarOffset[0] - clickValue);
            const distanceLeft = Math.abs(progressBarOffset[1] - clickValue);
            if (distanceLeft < distanceRight) {
                progressBar.css('left', clickValue + '%');
            }
            else {
                progressBar.css('right', 100 - clickValue + '%');
            }
        });
    }
    mount() {
        let progress = this.progressBar;
        this.thumbs.forEach((element) => {
            progress.append(element.thumb);
        });
        const slider = this.slider.append(progress);
        (0, jquery_1.default)(this.root).append(slider);
    }
}
exports.RangeSliderView = RangeSliderView;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
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
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
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
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_jquery_dist_jquery_js"], () => (__webpack_require__("./index.ts")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=main.bundle.js.map