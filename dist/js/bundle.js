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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(8)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var eventBus = new Vue();

exports.default = eventBus;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(5);

var _app2 = _interopRequireDefault(_app);

var _store = __webpack_require__(41);

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// store暂时没用到

// // 生产环境下去注释
// Vue.config.productionTip = false;

new Vue({
    el: '#app',
    store: _store2.default,
    template: '<App/>',
    components: { App: _app2.default }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_app_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_app_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_app_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_bced26ea_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_app_vue__ = __webpack_require__(40);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(6)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_app_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_bced26ea_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_app_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\app.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bced26ea", Component.options)
  } else {
    hotAPI.reload("data-v-bced26ea", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("115f35fa", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bced26ea\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./app.vue", function() {
     var newContent = require("!!../node_modules/_css-loader@0.28.7@css-loader/index.js!../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-bced26ea\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./app.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\nbody {\n\tfont-family: \"Microsoft YaHei\";\n\tmargin: 0 0;\n\tpadding: 0 0;\n}\n#app {\n\twidth: 500px;\n\theight: 500px;\n\tborder: 1px solid #aaa;\n\toverflow: auto;\n\tposition: relative;\n}\n.box-fade-enter-active {\n\ttransition: all .6s ease;\n}\n.box-fade-enter {\n\topacity: 0;\n}\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _json = __webpack_require__(42);

var _json2 = _interopRequireDefault(_json);

var _eventBus = __webpack_require__(3);

var _eventBus2 = _interopRequireDefault(_eventBus);

var _tree = __webpack_require__(10);

var _tree2 = _interopRequireDefault(_tree);

var _delete_node_box = __webpack_require__(25);

var _delete_node_box2 = _interopRequireDefault(_delete_node_box);

var _add_child_box = __webpack_require__(30);

var _add_child_box2 = _interopRequireDefault(_add_child_box);

var _modify_node_box = __webpack_require__(35);

var _modify_node_box2 = _interopRequireDefault(_modify_node_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
	components: {
		'tree': _tree2.default,
		'delete-box': _delete_node_box2.default,
		'add-box': _add_child_box2.default,
		'modify-box': _modify_node_box2.default
	},
	data: function data() {
		return {
			treeData: _json2.default,
			showDeleteBox: false,
			idDelete: '',
			nameDelete: '',
			showAddBox: false,
			parentChildren: [],
			parentInfo: [],
			showModifyBox: false,
			modifyModel: {}
		};
	},
	mounted: function mounted() {
		// 监听各种事件
		var self = this; // 注意这里如果不修改this的话，则this是eventBus中的this！！
		_eventBus2.default.$on('deleteNodeBox', function (name, id) {
			self.showDeleteBox = true;
			self.idDelete = id;
			self.nameDelete = name;
		});
		_eventBus2.default.$on('addChildBox', function (name, id, children) {
			self.showAddBox = true;
			self.parentInfo.splice(0, 2); // 先清空旧数据
			self.parentInfo.push(name, id);
			self.parentChildren = children;
		});
		_eventBus2.default.$on('modifyNodeBox', function (model) {
			self.showModifyBox = true;
			self.modifyModel = model;
		});
		_eventBus2.default.$on('cancel', function () {
			self.showDeleteBox = false;
			self.showAddBox = false;
			self.showModifyBox = false;
		});
	}
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_tree_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_tree_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_tree_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_275422e4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_tree_vue__ = __webpack_require__(24);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(11)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_tree_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_275422e4_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_tree_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\tree.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-275422e4", Component.options)
  } else {
    hotAPI.reload("data-v-275422e4", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("a41c8e4a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-275422e4\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./tree.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-275422e4\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./tree.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\nul {\n\tline-height: 1.4em;\n\tlist-style-type: none;\n\t/*border: 1px solid #000;*/\n}\nli {\n\tmargin: 10px 0;\n}\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _item = __webpack_require__(14);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	name: 'tree',
	components: {
		"item": _item2.default
	},
	props: {
		treeData: {}
	}
}; //
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_item_vue__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_item_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_item_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_403398fa_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_item_vue__ = __webpack_require__(23);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(15)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_item_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_403398fa_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_item_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\item.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-403398fa", Component.options)
  } else {
    hotAPI.reload("data-v-403398fa", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("4c8ad843", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-403398fa\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./item.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-403398fa\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./item.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* 后期需考虑浏览器前缀问题 */\n.bold {\n\tfont-weight: bold;\n}\n.el-icon-caret-right {\n\tcolor: #aaa;\n}\n.el-icon-caret-right,\n.model-name {\n\tcursor: pointer;\n}\n.rotate-down {\n\ttransform-origin: center center;\n\ttransform: rotate(90deg);\n\ttransition: transform .2s;\n}\n.rotate-back {\n\ttransform-origin: center center;\n\ttransition: transform .2s;\n}\n.slide-from-left-enter-active {\n\ttransition: all .3s ease;\n}\n.slide-from-left-enter {\n\tmargin-left: -20px;\n\topacity: 0;\n}\n.fade-in-enter-active {\n\ttransition: all .5s ease;\n}\n.fade-in-enter {\n\topacity: 0;\n}\n", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tools = __webpack_require__(18);

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: 'item',
    components: {
        "tools": _tools2.default
    },
    props: {
        model: {}
    },
    data: function data() {
        return {
            open: false,
            modelFocus: false
        };
    },
    computed: {
        hasChild: function hasChild() {
            return this.model.children && this.model.children.length;
        },
        isFolder: function isFolder() {
            return this.model.fileType === 'folder';
        }
    },
    methods: {
        toggle: function toggle() {
            this.open = !this.open;
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_tools_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_tools_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_tools_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_f13f8aca_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_tools_vue__ = __webpack_require__(22);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(19)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_tools_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_f13f8aca_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_tools_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\tools.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f13f8aca", Component.options)
  } else {
    hotAPI.reload("data-v-f13f8aca", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("a94c87dc", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f13f8aca\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./tools.vue", function() {
     var newContent = require("!!../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f13f8aca\",\"scoped\":false,\"hasInlineConfig\":false}!../../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./tools.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* 后期需考虑浏览器前缀问题 */\n.tools {\n\tfloat: right;\n}\n.el-icon {\n\tmargin: 0 10px;\n\tcursor: pointer;\n}\n.el-icon:hover {\n\ttransform: scale(1.2);\n}\n.el-icon:active {\n\ttransform: scale(1.2) translateY(1px);\n}\n", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _eventBus = __webpack_require__(3);

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	props: {
		model: {}
	},
	computed: {
		isNotRoot: function isNotRoot() {
			return this.model.id !== '0';
		},
		hasChild: function hasChild() {
			return this.model.children && this.model.children.length;
		},
		isFolder: function isFolder() {
			return this.model.fileType === 'folder';
		}
	},
	methods: {
		deleteNodeBox: function deleteNodeBox() {
			// 弹出框再次确认
			// 触发删除事件到事件总线
			// id用于搜索删除项，name用于弹出框展示
			_eventBus2.default.$emit('deleteNodeBox', this.model.name, this.model.id);
		},
		addChildBox: function addChildBox() {
			// 这里必须先判断有没有子节点
			if (!this.model.children) {
				Vue.set(this.model, 'children', []);
			}

			_eventBus2.default.$emit('addChildBox', this.model.name, this.model.id, this.model.children);
		},
		modifyNode: function modifyNode() {
			_eventBus2.default.$emit('modifyNodeBox', this.model);
		}
	}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("span", { staticClass: "tools" }, [
    _vm.isFolder || !_vm.isNotRoot
      ? _c("span", {
          key: "add-child",
          staticClass: "el-icon el-icon-circle-plus-outline",
          on: { click: _vm.addChildBox }
        })
      : _vm._e(),
    _vm._v(" "),
    _c("span", {
      key: "modify-node",
      staticClass: "el-icon el-icon-edit",
      on: { click: _vm.modifyNode }
    }),
    _vm._v(" "),
    _vm.isNotRoot
      ? _c("span", {
          key: "delete-node",
          staticClass: "el-icon el-icon-delete",
          on: { click: _vm.deleteNodeBox }
        })
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-f13f8aca", esExports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "li",
    [
      _c(
        "div",
        [
          _c("span", [
            _vm.isFolder
              ? _c("span", {
                  staticClass: "el-icon-caret-right",
                  class: { "rotate-down": _vm.open, "rotate-back": !_vm.open },
                  on: { click: _vm.toggle }
                })
              : _vm._e(),
            _vm._v(" "),
            _c(
              "span",
              {
                class: [{ "model-name": true }, { bold: _vm.isFolder }],
                on: { click: _vm.toggle }
              },
              [_vm._v("\n\t\t\t\t" + _vm._s(_vm.model.name) + "\n\t\t\t")]
            )
          ]),
          _vm._v(" "),
          _c(
            "transition",
            { attrs: { name: "fade-in" } },
            [_c("tools", { attrs: { model: _vm.model } })],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("transition", { attrs: { name: "slide-from-left" } }, [
        _vm.hasChild
          ? _c(
              "ul",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.open,
                    expression: "open"
                  }
                ]
              },
              _vm._l(_vm.model.children, function(childModel) {
                return _c("item", {
                  key: childModel.id,
                  staticClass: "item",
                  attrs: { model: childModel }
                })
              })
            )
          : _vm._e()
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-403398fa", esExports)
  }
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "ul-wrapper" }, [
    _c(
      "ul",
      [_c("item", { staticClass: "item", attrs: { model: _vm.treeData } })],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-275422e4", esExports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_delete_node_box_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_delete_node_box_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_delete_node_box_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_5825099a_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_delete_node_box_vue__ = __webpack_require__(29);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(26)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_delete_node_box_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_5825099a_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_delete_node_box_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\messagebox\\delete_node_box.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5825099a", Component.options)
  } else {
    hotAPI.reload("data-v-5825099a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("751c53a2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5825099a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./delete_node_box.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5825099a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./delete_node_box.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.box-wrapper {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\tz-index: 100;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: rgba(0, 0, 0, .6);\n\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}\n.delete-child-box {\n\twidth: 300px;\n\theight: 100px;\n\tbackground-color: #f1c7ca;\n\tborder: 1px solid #ccc;\n\tborder-radius: 5px;\n\tbox-shadow: 0 0 15px #d4acac;\n}\n.title-message {\n\tmargin: 18px 0 5px 30px;\n\tcolor: #000;\n\tfont-family: \"Mircosoft YaHei\";\n\tfont-size: 1em;\n}\n.delete-confirm {\n\tmargin-left: 170px;\n\twidth: 50px;\n\theight: 30px;\n\tbackground-color: #e22;\n\tborder: none;\n\tborder-radius: 4px;\n\tfont-size: .6em;\n\tcolor: #fdd;\n\toutline: none;\n}\n.delete-confirm:hover {\n\tbackground-color: #d22;\n\tcursor: pointer;\n}\n.delete-confirm:active {\n\tbackground-color: #c22;\n\tcursor: pointer;\n}\n.delete-cancel {\n\tmargin: 10px 10px;\n\twidth: 50px;\n\theight: 30px;\n\tbackground-color: #fff;\n\tborder: 1px solid #ccc;\n\tborder-radius: 4px;\n\tfont-size: .6em;\n\tcolor: #000;\n\toutline: none;\n}\n.delete-cancel:hover {\n\tcursor: pointer;\n\tbackground-color: #eee;\n}\n.delete-cancel:active {\n\tcursor: pointer;\n\tbackground-color: #ddd;\n}\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _eventBus = __webpack_require__(3);

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	props: {
		model: {},
		idDelete: '',
		nameDelete: ''
	},
	methods: {
		deleteNode: function deleteNode() {
			// 递归搜索id并删除匹配id的项
			return function fn(data, id) {
				for (var i = 0; i < data.length; i++) {
					if (data[i].id === id) {
						data.splice(i, 1);
						_eventBus2.default.$emit('cancel');
						return;
					}
				}
				for (var _i = 0; _i < data.length; _i++) {
					if (data[_i].children) {
						if (data[_i].children.length !== 0) {
							fn(data[_i].children, id);
						}
					}
				}
			}(this.model.children, this.idDelete);
		},
		cancel: function cancel() {
			_eventBus2.default.$emit('cancel');
		}
	},
	directives: {
		focus: {
			inserted: function inserted(el) {
				el.focus();
			}
		}
	}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "box-wrapper" }, [
    _c("div", { staticClass: "delete-child-box" }, [
      _c("div", { staticClass: "title-message" }, [
        _vm._v("要删除“" + _vm._s(_vm.nameDelete) + "”吗？")
      ]),
      _vm._v(" "),
      _c(
        "button",
        {
          directives: [
            {
              name: "focus",
              rawName: "v-focus",
              value: true,
              expression: "true"
            }
          ],
          staticClass: "delete-confirm",
          on: {
            click: _vm.deleteNode,
            keyup: function($event) {
              if (
                !("button" in $event) &&
                _vm._k($event.keyCode, "enter", 13, $event.key)
              ) {
                return null
              }
              _vm.deleteNode($event)
            }
          }
        },
        [_vm._v("确定")]
      ),
      _vm._v(" "),
      _c(
        "button",
        { staticClass: "delete-cancel", on: { click: _vm.cancel } },
        [_vm._v("取消")]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-5825099a", esExports)
  }
}

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_add_child_box_vue__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_add_child_box_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_add_child_box_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_5e4e0cfc_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_add_child_box_vue__ = __webpack_require__(34);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(31)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_add_child_box_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_5e4e0cfc_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_add_child_box_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\messagebox\\add_child_box.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e4e0cfc", Component.options)
  } else {
    hotAPI.reload("data-v-5e4e0cfc", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("5e338700", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5e4e0cfc\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./add_child_box.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-5e4e0cfc\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./add_child_box.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.box-wrapper {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\tz-index: 100;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: rgba(0, 0, 0, .6);\n\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}\n.add-child-box {\n\twidth: 300px;\n\theight: 195px;\n\tbackground-color: #baefbd;\n\tborder: 1px solid #ccc;\n\tborder-radius: 5px;\n\tbox-shadow: 0 0 15px #afceb0;\n\tcolor: #555;\n}\n.inputID {\n\tmargin: 8px 0 7px 25px;\n}\n.inputName {\n\tmargin: 7px 0 0 25px;\n}\n.inputID input,\n.inputName input {\n\tborder: 1px solid #ccc;\n\tborder-radius: 5px;\n\tpadding: 3px 8px;\n\tfont-family: \"Mircosoft YaHei\";\n\toutline: none;\n}\n.inputID input:focus,\n.inputName input:focus {\n\tbox-shadow: 0 0 10px #4fa053;\n}\n.emptyName input,\n.emptyId input {\n\tbox-shadow: 0 0 10px #ffaeae;\n}\n.title-message {\n\tmargin: 18px 0 5px 30px;\n\tfont-family: \"Mircosoft YaHei\";\n\tfont-size: 1em;\n\tcolor: #000;\n}\n.selector {\n\tdisplay: flex;\n\tjustify-content: center;\n}\n.selector span {\n\tline-height: 34px;\n\tmargin-left: 5px;\n\tfont-size: .3em;\n}\n.selector button {\n\twidth: 50px;\n\theight: 30px;\n\tmargin-top: 4px;\n\tbackground-color: #fff;\n\tborder: none;\n\tborder-radius: 4px;\n\tfont-size: .9em;\n\tcolor: #000;\n\toutline: none;\n}\n.selector button:hover {\n\tcursor: pointer;\n}\n.selector button:active {\n\tbackground-color: #f6f6f6;\n}\n.add-confirm {\n\tmargin-left: 170px;\n\twidth: 50px;\n\theight: 30px;\n\tbackground-color: #27ca1b;\n\tborder: none;\n\tborder-radius: 4px;\n\tfont-size: .6em;\n\tcolor: #e6f7ea;\n\toutline: none;\n}\n.add-confirm:hover {\n\tbackground-color: #22b117;\n\tcursor: pointer;\n}\n.add-confirm:active {\n\tbackground-color: #22a117;\n\tcursor: pointer;\n}\n.add-cancel {\n\tmargin: 10px 10px;\n\twidth: 50px;\n\theight: 30px;\n\tbackground-color: #fff;\n\tborder: 1px solid #ccc;\n\tborder-radius: 4px;\n\tfont-size: .6em;\n\tcolor: #000;\n\toutline: none;\n}\n.add-cancel:hover {\n\tcursor: pointer;\n\tbackground-color: #eee;\n}\n.add-cancel:active {\n\tcursor: pointer;\n\tbackground-color: #ddd;\n}\n", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _eventBus = __webpack_require__(3);

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	props: {
		model: {},
		parentChildren: Array,
		parentInfo: Array
	},
	data: function data() {
		return {
			idAdd: '',
			nameAdd: '',
			parentName: this.parentInfo.shift(),
			parentId: this.parentInfo.shift(),
			emptyName: false,
			emptyId: false,
			fileType: 'file'
		};
	},

	methods: {
		addChild: function addChild() {
			/*
   * 这里后续可改为更丰富的validate验证
   */
			if (this.nameAdd === '' && this.idAdd === '') {
				this.emptyName = true;
				this.emptyId = true;
				return;
			} else if (this.nameAdd === '') {
				this.emptyName = true;
				this.emptyId = false;
				return;
			} else if (this.idAdd === '') {
				this.emptyName = false;
				this.emptyId = true;
				return;
			} else {}

			// 注意：非目录节点本身就没有添加按钮

			/*
   * 注意：后续此处要添加id重复判断！
   */
			this.parentChildren.push({
				name: this.nameAdd,
				id: this.idAdd,
				fileType: this.fileType
			});

			_eventBus2.default.$emit('cancel');
		},
		cancel: function cancel() {
			_eventBus2.default.$emit('cancel');
		},
		isFolder: function isFolder() {
			this.fileType = this.fileType === 'file' ? 'folder' : 'file';
		}
	},
	directives: {
		focus: {
			inserted: function inserted(el) {
				el.focus();
			}
		}
	}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "box-wrapper" }, [
    _c("div", { staticClass: "add-child-box" }, [
      _c("div", { staticClass: "title-message" }, [
        _vm._v("在“" + _vm._s(_vm.parentName) + "”内添加：")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "selector" }, [
        _c("button", { on: { click: _vm.isFolder } }, [
          _vm._v(_vm._s(_vm.fileType))
        ]),
        _vm._v(" "),
        _c("span", [_vm._v("(点击切换)")])
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "inputName", class: { emptyName: _vm.emptyName } },
        [
          _c("span", [_vm._v("Name：")]),
          _vm._v(" "),
          _c("input", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.nameAdd,
                expression: "nameAdd"
              },
              {
                name: "focus",
                rawName: "v-focus",
                value: true,
                expression: "true"
              }
            ],
            domProps: { value: _vm.nameAdd },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.nameAdd = $event.target.value
              }
            }
          })
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "inputID", class: { emptyId: _vm.emptyId } }, [
        _c("span", [_vm._v("\n\t\t\t   ID   ：\n\t\t\t")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.idAdd,
              expression: "idAdd"
            }
          ],
          domProps: { value: _vm.idAdd },
          on: {
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.idAdd = $event.target.value
            }
          }
        })
      ]),
      _vm._v(" "),
      _c(
        "button",
        { staticClass: "add-confirm", on: { click: _vm.addChild } },
        [_vm._v("确定")]
      ),
      _vm._v(" "),
      _c("button", { staticClass: "add-cancel", on: { click: _vm.cancel } }, [
        _vm._v("取消")
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-5e4e0cfc", esExports)
  }
}

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_modify_node_box_vue__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_modify_node_box_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_modify_node_box_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_05bc722a_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_modify_node_box_vue__ = __webpack_require__(39);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(36)
}
var normalizeComponent = __webpack_require__(2)
/* script */

/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_script_index_0_bustCache_modify_node_box_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_13_5_0_vue_loader_lib_template_compiler_index_id_data_v_05bc722a_hasScoped_false_buble_transforms_node_modules_vue_loader_13_5_0_vue_loader_lib_selector_type_template_index_0_bustCache_modify_node_box_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\messagebox\\modify_node_box.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05bc722a", Component.options)
  } else {
    hotAPI.reload("data-v-05bc722a", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(1)("039235f8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-05bc722a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./modify_node_box.vue", function() {
     var newContent = require("!!../../../node_modules/_css-loader@0.28.7@css-loader/index.js!../../../node_modules/_vue-loader@13.5.0@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-05bc722a\",\"scoped\":false,\"hasInlineConfig\":false}!../../../node_modules/_vue-loader@13.5.0@vue-loader/lib/selector.js?type=styles&index=0&bustCache!./modify_node_box.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "\n.box-wrapper {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\tz-index: 100;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: rgba(0, 0, 0, .6);\n\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}\n.modify-child-box {\n\twidth: 300px;\n\theight: 160px;\n\tbackground-color: #f5dc89;\n\tborder: 1px solid #ccc;\n\tborder-radius: 5px;\n\tbox-shadow: 0 0 15px #ffb51e;\n\tcolor: #555;\n}\n.inputID {\n\tmargin: 8px 0 7px 16px;\n}\n.inputName {\n\tmargin: 7px 0 0 16px;\n}\n.inputID input,\n.inputName input {\n\tborder: 1px solid #ccc;\n\tborder-radius: 5px;\n\tpadding: 3px 8px;\n\tfont-family: \"Mircosoft YaHei\";\n\toutline: none;\n}\n.emptyName input,\n.emptyId input {\n\tbox-shadow: 0 0 10px #ffaeae;\n}\n.notice {\n\tfont-size: .3em;\n}\n.title-message {\n\tmargin: 18px 0 5px 30px;\n\tfont-family: \"Mircosoft YaHei\";\n\tfont-size: 1em;\n\tcolor: #000;\n}\n.modify-confirm {\n\tmargin-left: 170px;\n\twidth: 50px;\n\theight: 30px;\n\tbackground-color: #f59b00;\n\tborder: none;\n\tborder-radius: 4px;\n\tfont-size: .6em;\n\tcolor: #f6f7fa;\n\toutline: none;\n}\n.modify-confirm:hover {\n\tbackground-color: #e08e02;\n\tcursor: pointer;\n}\n.modify-confirm:active {\n\tbackground-color: #ce8302;\n\tcursor: pointer;\n}\n.modify-cancel {\n\tmargin: 10px 10px;\n\twidth: 50px;\n\theight: 30px;\n\tbackground-color: #fff;\n\tborder: 1px solid #ccc;\n\tborder-radius: 4px;\n\tfont-size: .6em;\n\tcolor: #000;\n\toutline: none;\n}\n.modify-cancel:hover {\n\tcursor: pointer;\n\tbackground-color: #eee;\n}\n.modify-cancel:active {\n\tcursor: pointer;\n\tbackground-color: #ddd;\n}\n", ""]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _eventBus = __webpack_require__(3);

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	props: {
		model: {}
	},
	data: function data() {
		return {
			idAdd: '',
			nameAdd: ''
		};
	},

	methods: {
		modifyNode: function modifyNode() {
			/*
   * 注意：后续此处要添加id重复判断！
   */
			if (this.nameAdd !== '') {
				this.model.name = this.nameAdd;
			}
			if (this.idAdd !== '') {
				this.model.id = this.idAdd;
			}

			_eventBus2.default.$emit('cancel');
		},
		cancel: function cancel() {
			_eventBus2.default.$emit('cancel');
		}
	},
	directives: {
		focus: {
			inserted: function inserted(el) {
				el.focus();
			}
		}
	}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "box-wrapper" }, [
    _c("div", { staticClass: "modify-child-box" }, [
      _c("div", { staticClass: "title-message" }, [
        _vm._v("修改“" + _vm._s(_vm.model.name) + "”：")
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "inputName" }, [
        _c("span", [_vm._v("Name：")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.nameAdd,
              expression: "nameAdd"
            },
            {
              name: "focus",
              rawName: "v-focus",
              value: true,
              expression: "true"
            }
          ],
          domProps: { value: _vm.nameAdd },
          on: {
            keyup: function($event) {
              if (
                !("button" in $event) &&
                _vm._k($event.keyCode, "enter", 13, $event.key)
              ) {
                return null
              }
              _vm.modifyNode($event)
            },
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.nameAdd = $event.target.value
            }
          }
        }),
        _vm._v(" "),
        _c("span", { staticClass: "notice" }, [_vm._v("(选填)")])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "inputID" }, [
        _c("span", [_vm._v("\n\t\t\t   ID   ：\n\t\t\t")]),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.idAdd,
              expression: "idAdd"
            }
          ],
          domProps: { value: _vm.idAdd },
          on: {
            keyup: function($event) {
              if (
                !("button" in $event) &&
                _vm._k($event.keyCode, "enter", 13, $event.key)
              ) {
                return null
              }
              _vm.modifyNode($event)
            },
            input: function($event) {
              if ($event.target.composing) {
                return
              }
              _vm.idAdd = $event.target.value
            }
          }
        }),
        _vm._v(" "),
        _c("span", { staticClass: "notice" }, [_vm._v("(选填)")])
      ]),
      _vm._v(" "),
      _c(
        "button",
        { staticClass: "modify-confirm", on: { click: _vm.modifyNode } },
        [_vm._v("确定")]
      ),
      _vm._v(" "),
      _c(
        "button",
        { staticClass: "modify-cancel", on: { click: _vm.cancel } },
        [_vm._v("取消")]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-05bc722a", esExports)
  }
}

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [
      _c("tree", { attrs: { treeData: _vm.treeData } }),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { name: "box-fade" } },
        [
          _vm.showDeleteBox
            ? _c("delete-box", {
                attrs: {
                  model: _vm.treeData,
                  idDelete: _vm.idDelete,
                  nameDelete: _vm.nameDelete
                }
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { name: "box-fade" } },
        [
          _vm.showAddBox
            ? _c("add-box", {
                attrs: {
                  model: _vm.treeData,
                  parentChildren: _vm.parentChildren,
                  parentInfo: _vm.parentInfo
                }
              })
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "transition",
        { attrs: { name: "box-fade" } },
        [
          _vm.showModifyBox
            ? _c("modify-box", { attrs: { model: _vm.modifyModel } })
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-bced26ea", esExports)
  }
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
Vue.use(Vuex);

// 此模块暂时没什么用处，只是埋个store在这里，以备后用
exports.default = new Vuex.Store({
	state: {
		clicked: false
	},
	mutations: {
		clickToggle: function clickToggle(state) {
			state.clicked = !state.clicked;
		}
	}
});

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// 后台Json数据入口

var data = {
    name: '一级目录',
    id: '0',
    fileType: 'folder',
    children: [{ name: '二级节点', id: '1', fileType: 'file' }, { name: '二级节点', id: '2', fileType: 'file' }, {
        name: '二级目录',
        id: '3',
        fileType: 'folder',
        children: [{
            name: '三级目录',
            id: '3-1',
            fileType: 'folder',
            children: [{ name: '四级节点', id: '3-1-1', fileType: 'file' }, { name: '四级节点', id: '3-1-2', fileType: 'file' }]
        }, { name: '三级节点', id: '3-2', fileType: 'file' }, { name: '三级节点', id: '3-3', fileType: 'file' }, {
            name: '三级目录',
            id: '3-4',
            fileType: 'folder',
            children: [{ name: '四级节点', id: '3-4-1', fileType: 'file' }, { name: '四级节点', id: '3-4-2', fileType: 'file' }]
        }]
    }, { name: '二级空目录', id: '4', fileType: 'folder' }]
};

exports.default = data;

/***/ })
/******/ ]);