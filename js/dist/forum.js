module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.ts":
/*!******************!*\
  !*** ./forum.ts ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  Object(_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _setPrototypeOf; });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./src/forum/components/ChangeBirthdayModal.js":
/*!*****************************************************!*\
  !*** ./src/forum/components/ChangeBirthdayModal.js ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ChangeBirthdayModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Modal */ "flarum/common/components/Modal");
/* harmony import */ var flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Switch */ "flarum/common/components/Switch");
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_4__);






var ChangeBirthdayModal = /*#__PURE__*/function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ChangeBirthdayModal, _Modal);

  function ChangeBirthdayModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = ChangeBirthdayModal.prototype;

  _proto.oninit = function oninit(vnode) {
    _Modal.prototype.oninit.call(this, vnode);

    this.birthday = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_4___default()(app.session.user.birthday());
  };

  _proto.className = function className() {
    return 'ChangeBirthdayModal Modal--small';
  };

  _proto.title = function title() {
    return app.translator.trans('datlechin-birthdays.forum.change_dob.title');
  };

  _proto.content = function content() {
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form"
    }, m("div", {
      className: "Form-group"
    }, m("label", null, app.translator.trans('datlechin-birthdays.forum.change_dob.date_of_birth_text')), m("input", {
      type: "date",
      name: "birthday",
      className: "FormControl",
      bidi: this.birthday,
      disabled: this.loading
    })), m("div", {
      className: "Form-group"
    }, flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      className: 'Button Button--primary',
      type: 'submit',
      loading: this.loading
    }, app.translator.trans('datlechin-birthdays.forum.change_dob.submit_button')))));
  };

  _proto.onsubmit = function onsubmit(e) {
    var _this = this;

    e.preventDefault(); // If the user hasn't actually entered a different email address, we don't
    // need to do anything. Woot!

    if (this.birthday() === app.session.user.birthday()) {
      this.hide();
      return;
    }

    this.loading = true;
    this.alertAttrs = null;
    app.session.user.save({
      birthday: this.birthday()
    }, {
      errorHandler: this.onerror.bind(this)
    }).then(function () {
      _this.success = true;

      _this.hide();
    })["catch"](function () {}).then(this.loaded.bind(this));
  };

  _proto.onerror = function onerror(error) {
    _Modal.prototype.onerror.call(this, error);
  };

  return ChangeBirthdayModal;
}(flarum_common_components_Modal__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/models/User */ "flarum/common/models/User");
/* harmony import */ var flarum_common_models_User__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_User__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_forum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/forum/components/SignUpModal */ "flarum/forum/components/SignUpModal");
/* harmony import */ var flarum_forum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_common_components_EditUserModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/components/EditUserModal */ "flarum/common/components/EditUserModal");
/* harmony import */ var flarum_common_components_EditUserModal__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_EditUserModal__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var flarum_forum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! flarum/forum/components/SettingsPage */ "flarum/forum/components/SettingsPage");
/* harmony import */ var flarum_forum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var flarum_common_components_FieldSet__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! flarum/common/components/FieldSet */ "flarum/common/components/FieldSet");
/* harmony import */ var flarum_common_components_FieldSet__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_FieldSet__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! flarum/common/components/Switch */ "flarum/common/components/Switch");
/* harmony import */ var flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! flarum/common/utils/Stream */ "flarum/common/utils/Stream");
/* harmony import */ var flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! flarum/forum/components/UserCard */ "flarum/forum/components/UserCard");
/* harmony import */ var flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! flarum/common/helpers/icon */ "flarum/common/helpers/icon");
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _components_ChangeBirthdayModal__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/ChangeBirthdayModal */ "./src/forum/components/ChangeBirthdayModal.js");














flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializers.add('datlechin/flarum-birthdays', function () {
  flarum_common_models_User__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.birthday = flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('birthday');
  flarum_common_models_User__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.showDobDate = flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('showDobDate');
  flarum_common_models_User__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.showDobYear = flarum_common_Model__WEBPACK_IMPORTED_MODULE_3___default.a.attribute('showDobYear');
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_11___default.a.prototype, 'infoItems', function (items) {
    var _user$preferences;

    var user = this.attrs.user;
    var userLocale = ((_user$preferences = user.preferences()) == null ? void 0 : _user$preferences.locale) || flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.formatter.locale;
    var birthday = user.birthday();
    var age;
    var date = new Date(birthday);
    var options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    };
    if (birthday === '0000-00-00' || birthday === '') return;

    if (user.showDobDate() && user.showDobYear()) {
      age = new Date().getFullYear() - new Date(birthday).getFullYear();
      birthday = date.toLocaleDateString(userLocale, options);
    } else if (user.showDobDate() === true && user.showDobYear() === false) {
      birthday = date.toLocaleDateString(userLocale, options);
      birthday = birthday.split(',')[0];
    } else {
      return;
    }

    items.add('birthday', m('[', null, flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_12___default()('fas fa-birthday-cake'), m("span", {
      className: "birthday"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.trans('datlechin-birthdays.forum.user.birthday_text', {
      date: birthday
    })), user.showDobYear() ? m("span", {
      className: "age"
    }, "(", flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.trans('datlechin-birthdays.forum.user.age_text', {
      age: age
    }), ")") : null));
  });
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_common_components_EditUserModal__WEBPACK_IMPORTED_MODULE_5___default.a.prototype, 'oninit', function () {
    this.birthday = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_10___default()(this.attrs.user.birthday());
  });
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_common_components_EditUserModal__WEBPACK_IMPORTED_MODULE_5___default.a.prototype, 'fields', function (items) {
    items.add('birthday', m("div", {
      className: "Form-group"
    }, m("label", null, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.trans('datlechin-birthdays.forum.edit_user.dob_heading')), m("input", {
      className: "FormControl",
      type: "date",
      bidi: this.birthday
    })), 30);
  });
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_common_components_EditUserModal__WEBPACK_IMPORTED_MODULE_5___default.a.prototype, 'data', function (data) {
    if (this.birthday() !== this.attrs.user.birthday()) {
      data.birthday = this.birthday();
    }
  });
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_forum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_4___default.a.prototype, 'oninit', function () {
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('setBirthdayOnRegistration')) {
      this.birthday = flarum_common_utils_Stream__WEBPACK_IMPORTED_MODULE_10___default()(this.attrs.birthday || '');
    }
  });
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_forum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_4___default.a.prototype, 'fields', function (items) {
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('setBirthdayOnRegistration')) {
      items.add('birthday', m("div", {
        className: "Form-group"
      }, m("input", {
        className: "FormControl birthday",
        name: "birthday",
        type: "date",
        bidi: this.birthday,
        disabled: this.loading
      })), 20);
    }
  });
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_forum_components_SignUpModal__WEBPACK_IMPORTED_MODULE_4___default.a.prototype, 'submitData', function (data) {
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('setBirthdayOnRegistration')) {
      data.birthday = this.birthday();
    }
  });
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_forum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_7___default.a.prototype, 'settingsItems', function (items) {
    var _this = this;

    items.add('birthday', m(flarum_common_components_FieldSet__WEBPACK_IMPORTED_MODULE_8___default.a, {
      className: "Settings-birthday",
      label: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.trans("datlechin-birthdays.forum.settings.dob_heading")
    }, m(flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_9___default.a, {
      state: this.user.showDobDate(),
      onchange: function onchange(value) {
        _this.showDobDateLoading = true;

        _this.user.save({
          showDobDate: value
        }).then(function () {
          _this.showDobDateLoading = false;
          m.redraw();
        });
      },
      loading: this.showDobDateLoading
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.trans('datlechin-birthdays.forum.settings.show_dob_date_label')), m(flarum_common_components_Switch__WEBPACK_IMPORTED_MODULE_9___default.a, {
      state: this.user.showDobDate() && this.user.showDobYear(),
      onchange: function onchange(value) {
        _this.showDobYearLoading = true;

        _this.user.save({
          showDobYear: value
        }).then(function () {
          _this.showDobYearLoading = false;
          m.redraw();
        });
      },
      loading: this.showDobYearLoading
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.trans('datlechin-birthdays.forum.settings.show_dob_year_label')), m("span", {
      className: "helpText"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.trans('datlechin-birthdays.forum.settings.show_dob_year_help'))));
  });
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_forum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_7___default.a.prototype, 'accountItems', function (items) {
    items.add('changeBirthday', m(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_6___default.a, {
      className: "Button",
      onclick: function onclick() {
        return flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.modal.show(_components_ChangeBirthdayModal__WEBPACK_IMPORTED_MODULE_13__["default"]);
      }
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.trans('datlechin-birthdays.forum.settings.change_dob_label')));
  });
});

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/EditUserModal":
/*!************************************************************************!*\
  !*** external "flarum.core.compat['common/components/EditUserModal']" ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/EditUserModal'];

/***/ }),

/***/ "flarum/common/components/FieldSet":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['common/components/FieldSet']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/FieldSet'];

/***/ }),

/***/ "flarum/common/components/Modal":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Modal']" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Modal'];

/***/ }),

/***/ "flarum/common/components/Switch":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Switch']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Switch'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/helpers/icon":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/icon']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/helpers/icon'];

/***/ }),

/***/ "flarum/common/models/User":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['common/models/User']" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/models/User'];

/***/ }),

/***/ "flarum/common/utils/Stream":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/utils/Stream']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/utils/Stream'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/SettingsPage":
/*!**********************************************************************!*\
  !*** external "flarum.core.compat['forum/components/SettingsPage']" ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['forum/components/SettingsPage'];

/***/ }),

/***/ "flarum/forum/components/SignUpModal":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['forum/components/SignUpModal']" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['forum/components/SignUpModal'];

/***/ }),

/***/ "flarum/forum/components/UserCard":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/UserCard']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['forum/components/UserCard'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map