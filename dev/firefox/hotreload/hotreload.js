/******/ (() => { // webpackBootstrap
/*!*********************************!*\
  !*** ./src/utils/hot-reload.js ***!
  \*********************************/
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* global chrome */
var filesInDirectory = function filesInDirectory(dir) {
  return new Promise(function (resolve) {
    return dir.createReader().readEntries(function (entries) {
      return Promise.all(entries.filter(function (e) {
        return e.name[0] !== ".";
      }).map(function (e) {
        return e.isDirectory ? filesInDirectory(e) : new Promise(function (resolvePromise) {
          return e.file(resolvePromise);
        });
      })).then(function (files) {
        var _ref;

        return (_ref = []).concat.apply(_ref, _toConsumableArray(files));
      }).then(resolve);
    });
  });
};

var timestampForFilesInDirectory = function timestampForFilesInDirectory(dir) {
  return filesInDirectory(dir).then(function (files) {
    return files.map(function (f) {
      return f.name + f.lastModifiedDate;
    }).join();
  });
};

var reload = function reload() {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (tabs[0]) {
      chrome.tabs.reload(tabs[0].id);
    }

    chrome.runtime.reload();
  });
};

var watchChanges = function watchChanges(dir, lastTimestamp) {
  timestampForFilesInDirectory(dir).then(function (timestamp) {
    if (!lastTimestamp || lastTimestamp === timestamp) {
      setTimeout(function () {
        return watchChanges(dir, timestamp);
      }, 1000);
    } else {
      reload();
    }
  });
};

if (chrome) {
  chrome.management.getSelf(function (self) {
    if (self.installType === "development") {
      chrome.runtime.getPackageDirectoryEntry(function (dir) {
        return watchChanges(dir);
      });
    }
  });
}
/******/ })()
;
//# sourceMappingURL=hotreload.js.map