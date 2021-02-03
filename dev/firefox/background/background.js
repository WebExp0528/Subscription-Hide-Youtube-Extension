/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/index.js":
/*!*********************************!*\
  !*** ./src/background/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "background": () => (/* binding */ background)
/* harmony export */ });
/* harmony import */ var utils_ext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/ext */ "./src/utils/ext.js");
/* harmony import */ var utils_ext__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(utils_ext__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }


/**
 * Define content script functions
 * @type {class}
 */

var Background = function Background() {
  var _this = this;

  _classCallCheck(this, Background);

  this.init = function () {
    console.log("loaded Background Scripts"); //When extension installed

    utils_ext__WEBPACK_IMPORTED_MODULE_0___default().runtime.onInstalled.addListener(function () {
      return _this.onInstalled();
    }); //Add message listener in Browser.

    utils_ext__WEBPACK_IMPORTED_MODULE_0___default().runtime.onMessage.addListener(function (message, sender, reply) {
      return _this.onMessage(message, sender, reply);
    }); //Add message listener from Extension

    utils_ext__WEBPACK_IMPORTED_MODULE_0___default().extension.onConnect.addListener(function (port) {
      return _this.onConnect(port);
    }); //Add Update listener for tab

    utils_ext__WEBPACK_IMPORTED_MODULE_0___default().tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
      return _this.onUpdatedTab(tabId, changeInfo, tab);
    }); //Add New tab create listener

    utils_ext__WEBPACK_IMPORTED_MODULE_0___default().tabs.onCreated.addListener(function (tab) {
      return _this.onCreatedTab(tab);
    });
  };

  this.onInstalled = function () {
    console.log("~~~~~Installed Extension!");
  };

  this.onMessage = function (message, sender, reply) {
    console.log("~~~~~Received message", message);

    switch (message.type) {}

    return true;
  };

  this.onConnect = function (port) {
    _this._port = port;
    console.log("~~~~~Connected .....");

    _this._port.onMessage.addListener(function (msg) {
      return _this.onMessageFromExtension(msg);
    });
  };

  this.onMessageFromExtension = function (msg) {
    console.log("~~~~Recieved message from Popup:" + msg);
  };

  this.onCreatedTab = function (tab) {
    console.log("~~~~~Created new tab", tab);
  };

  this.onUpdatedTab = function (tabId, changeInfo, tab) {
    console.log("~~~~~Changed tab", tabId);
  };

  this.getURLFromTab = function (tabid) {
    return new Promise(function (resolve, reject) {
      utils_ext__WEBPACK_IMPORTED_MODULE_0___default().tabs.get(tabid, function (tab) {
        resolve(tab.url ? tab.url : "");
      });
    });
  };

  this.openNewTab = function (url) {
    return new Promise(function (resolve, reject) {
      return utils_ext__WEBPACK_IMPORTED_MODULE_0___default().tabs.create({
        url: url
      }, function (tab) {
        resolve(tab);
      });
    });
  };

  this.closeTab = function (tab) {
    return new Promise(function (resolve, reject) {
      return utils_ext__WEBPACK_IMPORTED_MODULE_0___default().tabs.remove(tab.id, function () {
        resolve();
      });
    });
  };

  this.updateTab = function (tab, options) {
    return new Promise(function (resolve, reject) {
      utils_ext__WEBPACK_IMPORTED_MODULE_0___default().tabs.update(tab.id, options, function (updateTab) {
        resolve(updateTab);
      });
    });
  };

  this.getTab = function (tab) {
    return new Promise(function (resolve) {
      utils_ext__WEBPACK_IMPORTED_MODULE_0___default().tabs.get(tab.id, function (newTab) {
        resolve(newTab);
      });
    });
  };

  this.sendMessage = function (tab, msg) {
    return new Promise(function (resolve, reject) {
      return utils_ext__WEBPACK_IMPORTED_MODULE_0___default().tabs.sendMessage(tab.id, msg, function (response) {
        resolve(response);
      });
    });
  };

  this.init();
}
/**
 * Document Ready
 * @returns {void}
 */
;

var background = new Background();

/***/ }),

/***/ "./src/utils/ext.js":
/*!**************************!*\
  !*** ./src/utils/ext.js ***!
  \**************************/
/***/ ((module) => {

/* global browser, window, chrome */
var apis = ["alarms", "bookmarks", "browserAction", "commands", "contextMenus", "cookies", "downloads", "events", "extension", "extensionTypes", "history", "i18n", "idle", "notifications", "pageAction", "runtime", "storage", "tabs", "webNavigation", "webRequest", "windows"];

function Extension() {
  var self = this;
  apis.forEach(function (api) {
    self[api] = null;

    try {
      if (chrome[api]) {
        self[api] = chrome[api];
      }
    } catch (e) {
      return;
    }

    try {
      if (window[api]) {
        self[api] = window[api];
      }
    } catch (e) {
      return;
    }

    try {
      if (browser[api]) {
        self[api] = browser[api];
      }
    } catch (e) {
      return;
    }

    try {
      self.api = browser.extension[api];
    } catch (e) {// I want application to not crush, but don't care about the message
    }
  });

  try {
    if (browser && browser.runtime) {
      this.runtime = browser.runtime;
    }
  } catch (e) {
    return;
  }

  try {
    if (browser && browser.browserAction) {
      this.browserAction = browser.browserAction;
    }
  } catch (e) {// I want application to not crush, but don't care about the message
  }
}

module.exports = new Extension();

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/background/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=background.js.map