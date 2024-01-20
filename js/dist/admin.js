/******/ (() => { // webpackBootstrap
/******/ 	// runtime can't be in strict mode because a global variable is assign and maybe created.
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/admin/app */ "flarum/admin/app");
/* harmony import */ var flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_admin_app__WEBPACK_IMPORTED_MODULE_0__);

flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().initializers.add('datlechin/flarum-birthdays', function () {
  flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().extensionData["for"]('datlechin-birthdays').registerSetting({
    setting: 'datlechin-birthdays.set_on_registration',
    type: 'boolean',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('datlechin-birthdays.admin.settings.set_on_registration_label')
  }).registerSetting({
    setting: 'datlechin-birthdays.required',
    type: 'boolean',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('datlechin-birthdays.admin.settings.required_label'),
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('datlechin-birthdays.admin.settings.required_help')
  }).registerSetting({
    setting: 'datlechin-birthdays.min_age',
    type: 'number',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('datlechin-birthdays.admin.settings.min_age_label'),
    help: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('datlechin-birthdays.admin.settings.min_age_help')
  }).registerSetting({
    setting: 'datlechin-birthdays.date_format',
    type: 'text',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('datlechin-birthdays.admin.settings.date_format_label'),
    placeholder: 'LL'
  }).registerSetting({
    setting: 'datlechin-birthdays.date_none_year_format',
    type: 'text',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('datlechin-birthdays.admin.settings.date_none_year_label'),
    placeholder: 'DD MMMM'
  }).registerSetting(function () {
    return m("div", {
      className: "Form-group"
    }, m("p", {
      className: "helpText"
    }, flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('datlechin-birthdays.admin.settings.date_format_help', {
      a: m("a", {
        href: "https://day.js.org/docs/en/display/format",
        target: "_blank"
      })
    })));
  }).registerPermission({
    icon: 'fas fa-user-tag',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('datlechin-birthdays.admin.permissions.edit_own_birthday_label'),
    permission: 'user.editOwnBirthday'
  }, 'start').registerPermission({
    icon: 'fas fa-eye',
    label: flarum_admin_app__WEBPACK_IMPORTED_MODULE_0___default().translator.trans('datlechin-birthdays.admin.permissions.view_birthday_label'),
    permission: 'user.viewBirthday',
    allowGuest: true
  }, 'view');
});

/***/ }),

/***/ "flarum/admin/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['admin/app']" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = flarum.core.compat['admin/app'];

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=admin.js.map