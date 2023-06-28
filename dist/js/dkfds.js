(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DKFDS", [], factory);
	else if(typeof exports === 'object')
		exports["DKFDS"] = factory();
	else
		root["DKFDS"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9084:
/***/ ((module) => {

"use strict";
/**
 * array-foreach
 *   Array#forEach ponyfill for older browsers
 *   (Ponyfill: A polyfill that doesn't overwrite the native method)
 * 
 * https://github.com/twada/array-foreach
 *
 * Copyright (c) 2015-2016 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/twada/array-foreach/blob/master/MIT-LICENSE
 */


module.exports = function forEach (ary, callback, thisArg) {
    if (ary.forEach) {
        ary.forEach(callback, thisArg);
        return;
    }
    for (var i = 0; i < ary.length; i+=1) {
        callback.call(thisArg, ary[i], i, ary);
    }
};


/***/ }),

/***/ 3241:
/***/ (() => {

/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in window.self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) 
	|| document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
	  classListProp = "classList"
	, protoProp = "prototype"
	, elemCtrProto = view.Element[protoProp]
	, objCtr = Object
	, strTrim = String[protoProp].trim || function () {
		return this.replace(/^\s+|\s+$/g, "");
	}
	, arrIndexOf = Array[protoProp].indexOf || function (item) {
		var
			  i = 0
			, len = this.length
		;
		for (; i < len; i++) {
			if (i in this && this[i] === item) {
				return i;
			}
		}
		return -1;
	}
	// Vendors: please allow content code to instantiate DOMExceptions
	, DOMEx = function (type, message) {
		this.name = type;
		this.code = DOMException[type];
		this.message = message;
	}
	, checkTokenAndGetIndex = function (classList, token) {
		if (token === "") {
			throw new DOMEx(
				  "SYNTAX_ERR"
				, "An invalid or illegal string was specified"
			);
		}
		if (/\s/.test(token)) {
			throw new DOMEx(
				  "INVALID_CHARACTER_ERR"
				, "String contains an invalid character"
			);
		}
		return arrIndexOf.call(classList, token);
	}
	, ClassList = function (elem) {
		var
			  trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
			, classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
			, i = 0
			, len = classes.length
		;
		for (; i < len; i++) {
			this.push(classes[i]);
		}
		this._updateClassName = function () {
			elem.setAttribute("class", this.toString());
		};
	}
	, classListProto = ClassList[protoProp] = []
	, classListGetter = function () {
		return new ClassList(this);
	}
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
	return this[i] || null;
};
classListProto.contains = function (token) {
	token += "";
	return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
	;
	do {
		token = tokens[i] + "";
		if (checkTokenAndGetIndex(this, token) === -1) {
			this.push(token);
			updated = true;
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.remove = function () {
	var
		  tokens = arguments
		, i = 0
		, l = tokens.length
		, token
		, updated = false
		, index
	;
	do {
		token = tokens[i] + "";
		index = checkTokenAndGetIndex(this, token);
		while (index !== -1) {
			this.splice(index, 1);
			updated = true;
			index = checkTokenAndGetIndex(this, token);
		}
	}
	while (++i < l);

	if (updated) {
		this._updateClassName();
	}
};
classListProto.toggle = function (token, force) {
	token += "";

	var
		  result = this.contains(token)
		, method = result ?
			force !== true && "remove"
		:
			force !== false && "add"
	;

	if (method) {
		this[method](token);
	}

	if (force === true || force === false) {
		return force;
	} else {
		return !result;
	}
};
classListProto.toString = function () {
	return this.join(" ");
};

if (objCtr.defineProperty) {
	var classListPropDesc = {
		  get: classListGetter
		, enumerable: true
		, configurable: true
	};
	try {
		objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	} catch (ex) { // IE 8 doesn't support enumerable:true
		// adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
		// modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
		if (ex.number === undefined || ex.number === -0x7FF5EC54) {
			classListPropDesc.enumerable = false;
			objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
		}
	}
} else if (objCtr[protoProp].__defineGetter__) {
	elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(window.self));

}

// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
	"use strict";

	var testElement = document.createElement("_");

	testElement.classList.add("c1", "c2");

	// Polyfill for IE 10/11 and Firefox <26, where classList.add and
	// classList.remove exist but support only one argument at a time.
	if (!testElement.classList.contains("c2")) {
		var createMethod = function(method) {
			var original = DOMTokenList.prototype[method];

			DOMTokenList.prototype[method] = function(token) {
				var i, len = arguments.length;

				for (i = 0; i < len; i++) {
					token = arguments[i];
					original.call(this, token);
				}
			};
		};
		createMethod('add');
		createMethod('remove');
	}

	testElement.classList.toggle("c3", false);

	// Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	// support the second argument.
	if (testElement.classList.contains("c3")) {
		var _toggle = DOMTokenList.prototype.toggle;

		DOMTokenList.prototype.toggle = function(token, force) {
			if (1 in arguments && !this.contains(token) === !force) {
				return force;
			} else {
				return _toggle.call(this, token);
			}
		};

	}

	testElement = null;
}());

}


/***/ }),

/***/ 4814:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(9115);
__webpack_require__(522);
module.exports = __webpack_require__(5645).Array.from;


/***/ }),

/***/ 1632:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(5115);
module.exports = __webpack_require__(5645).Object.assign;


/***/ }),

/***/ 4963:
/***/ ((module) => {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ 7007:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(5286);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ 9315:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(2110);
var toLength = __webpack_require__(875);
var toAbsoluteIndex = __webpack_require__(2337);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ 1488:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(2032);
var TAG = __webpack_require__(6314)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ 2032:
/***/ ((module) => {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 5645:
/***/ ((module) => {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 2811:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $defineProperty = __webpack_require__(9275);
var createDesc = __webpack_require__(681);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ 741:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// optional / simple context binding
var aFunction = __webpack_require__(4963);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 1355:
/***/ ((module) => {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ 7057:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(4253)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 2457:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(5286);
var document = (__webpack_require__(3816).document);
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ 4430:
/***/ ((module) => {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ 2985:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(3816);
var core = __webpack_require__(5645);
var hide = __webpack_require__(7728);
var redefine = __webpack_require__(7234);
var ctx = __webpack_require__(741);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ 4253:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ 18:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(3825)('native-function-to-string', Function.toString);


/***/ }),

/***/ 3816:
/***/ ((module) => {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ 9181:
/***/ ((module) => {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ 7728:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var dP = __webpack_require__(9275);
var createDesc = __webpack_require__(681);
module.exports = __webpack_require__(7057) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 639:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var document = (__webpack_require__(3816).document);
module.exports = document && document.documentElement;


/***/ }),

/***/ 1734:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = !__webpack_require__(7057) && !__webpack_require__(4253)(function () {
  return Object.defineProperty(__webpack_require__(2457)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 9797:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(2032);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ 6555:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// check on default Array iterator
var Iterators = __webpack_require__(2803);
var ITERATOR = __webpack_require__(6314)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ 5286:
/***/ ((module) => {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 8851:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(7007);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ 9988:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var create = __webpack_require__(2503);
var descriptor = __webpack_require__(681);
var setToStringTag = __webpack_require__(2943);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(7728)(IteratorPrototype, __webpack_require__(6314)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ 2923:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var LIBRARY = __webpack_require__(4461);
var $export = __webpack_require__(2985);
var redefine = __webpack_require__(7234);
var hide = __webpack_require__(7728);
var Iterators = __webpack_require__(2803);
var $iterCreate = __webpack_require__(9988);
var setToStringTag = __webpack_require__(2943);
var getPrototypeOf = __webpack_require__(468);
var ITERATOR = __webpack_require__(6314)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ 7462:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ITERATOR = __webpack_require__(6314)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ 2803:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 4461:
/***/ ((module) => {

module.exports = false;


/***/ }),

/***/ 5345:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(7057);
var getKeys = __webpack_require__(7184);
var gOPS = __webpack_require__(4548);
var pIE = __webpack_require__(4682);
var toObject = __webpack_require__(508);
var IObject = __webpack_require__(9797);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(4253)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ 2503:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(7007);
var dPs = __webpack_require__(5588);
var enumBugKeys = __webpack_require__(4430);
var IE_PROTO = __webpack_require__(9335)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(2457)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  (__webpack_require__(639).appendChild)(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ 9275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var anObject = __webpack_require__(7007);
var IE8_DOM_DEFINE = __webpack_require__(1734);
var toPrimitive = __webpack_require__(1689);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7057) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 5588:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var dP = __webpack_require__(9275);
var anObject = __webpack_require__(7007);
var getKeys = __webpack_require__(7184);

module.exports = __webpack_require__(7057) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ 4548:
/***/ ((__unused_webpack_module, exports) => {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 468:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(9181);
var toObject = __webpack_require__(508);
var IE_PROTO = __webpack_require__(9335)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ 189:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(9181);
var toIObject = __webpack_require__(2110);
var arrayIndexOf = __webpack_require__(9315)(false);
var IE_PROTO = __webpack_require__(9335)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 7184:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(189);
var enumBugKeys = __webpack_require__(4430);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ 4682:
/***/ ((__unused_webpack_module, exports) => {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ 681:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 7234:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(3816);
var hide = __webpack_require__(7728);
var has = __webpack_require__(9181);
var SRC = __webpack_require__(3953)('src');
var $toString = __webpack_require__(18);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

(__webpack_require__(5645).inspectSource) = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ 2943:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var def = (__webpack_require__(9275).f);
var has = __webpack_require__(9181);
var TAG = __webpack_require__(6314)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ 9335:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(3825)('keys');
var uid = __webpack_require__(3953);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ 3825:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var core = __webpack_require__(5645);
var global = __webpack_require__(3816);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(4461) ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 4496:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(1467);
var defined = __webpack_require__(1355);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ 2337:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(1467);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ 1467:
/***/ ((module) => {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ 2110:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(9797);
var defined = __webpack_require__(1355);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ 875:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.15 ToLength
var toInteger = __webpack_require__(1467);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ 508:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(1355);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ 1689:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5286);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3953:
/***/ ((module) => {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ 6314:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var store = __webpack_require__(3825)('wks');
var uid = __webpack_require__(3953);
var Symbol = (__webpack_require__(3816).Symbol);
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ 9002:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(1488);
var ITERATOR = __webpack_require__(6314)('iterator');
var Iterators = __webpack_require__(2803);
module.exports = (__webpack_require__(5645).getIteratorMethod) = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ 522:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ctx = __webpack_require__(741);
var $export = __webpack_require__(2985);
var toObject = __webpack_require__(508);
var call = __webpack_require__(8851);
var isArrayIter = __webpack_require__(6555);
var toLength = __webpack_require__(875);
var createProperty = __webpack_require__(2811);
var getIterFn = __webpack_require__(9002);

$export($export.S + $export.F * !__webpack_require__(7462)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ 5115:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(2985);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(5345) });


/***/ }),

/***/ 9115:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $at = __webpack_require__(4496)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(2923)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 2924:
/***/ (() => {

// element-closest | CC0-1.0 | github.com/jonathantneal/closest

(function (ElementProto) {
	if (typeof ElementProto.matches !== 'function') {
		ElementProto.matches = ElementProto.msMatchesSelector || ElementProto.mozMatchesSelector || ElementProto.webkitMatchesSelector || function matches(selector) {
			var element = this;
			var elements = (element.document || element.ownerDocument).querySelectorAll(selector);
			var index = 0;

			while (elements[index] && elements[index] !== element) {
				++index;
			}

			return Boolean(elements[index]);
		};
	}

	if (typeof ElementProto.closest !== 'function') {
		ElementProto.closest = function closest(selector) {
			var element = this;

			while (element && element.nodeType === 1) {
				if (element.matches(selector)) {
					return element;
				}

				element = element.parentNode;
			}

			return null;
		};
	}
})(window.Element.prototype);


/***/ }),

/***/ 1764:
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* global define, KeyboardEvent, module */

(function () {

  var keyboardeventKeyPolyfill = {
    polyfill: polyfill,
    keys: {
      3: 'Cancel',
      6: 'Help',
      8: 'Backspace',
      9: 'Tab',
      12: 'Clear',
      13: 'Enter',
      16: 'Shift',
      17: 'Control',
      18: 'Alt',
      19: 'Pause',
      20: 'CapsLock',
      27: 'Escape',
      28: 'Convert',
      29: 'NonConvert',
      30: 'Accept',
      31: 'ModeChange',
      32: ' ',
      33: 'PageUp',
      34: 'PageDown',
      35: 'End',
      36: 'Home',
      37: 'ArrowLeft',
      38: 'ArrowUp',
      39: 'ArrowRight',
      40: 'ArrowDown',
      41: 'Select',
      42: 'Print',
      43: 'Execute',
      44: 'PrintScreen',
      45: 'Insert',
      46: 'Delete',
      48: ['0', ')'],
      49: ['1', '!'],
      50: ['2', '@'],
      51: ['3', '#'],
      52: ['4', '$'],
      53: ['5', '%'],
      54: ['6', '^'],
      55: ['7', '&'],
      56: ['8', '*'],
      57: ['9', '('],
      91: 'OS',
      93: 'ContextMenu',
      144: 'NumLock',
      145: 'ScrollLock',
      181: 'VolumeMute',
      182: 'VolumeDown',
      183: 'VolumeUp',
      186: [';', ':'],
      187: ['=', '+'],
      188: [',', '<'],
      189: ['-', '_'],
      190: ['.', '>'],
      191: ['/', '?'],
      192: ['`', '~'],
      219: ['[', '{'],
      220: ['\\', '|'],
      221: [']', '}'],
      222: ["'", '"'],
      224: 'Meta',
      225: 'AltGraph',
      246: 'Attn',
      247: 'CrSel',
      248: 'ExSel',
      249: 'EraseEof',
      250: 'Play',
      251: 'ZoomOut'
    }
  };

  // Function keys (F1-24).
  var i;
  for (i = 1; i < 25; i++) {
    keyboardeventKeyPolyfill.keys[111 + i] = 'F' + i;
  }

  // Printable ASCII characters.
  var letter = '';
  for (i = 65; i < 91; i++) {
    letter = String.fromCharCode(i);
    keyboardeventKeyPolyfill.keys[i] = [letter.toLowerCase(), letter.toUpperCase()];
  }

  function polyfill () {
    if (!('KeyboardEvent' in window) ||
        'key' in KeyboardEvent.prototype) {
      return false;
    }

    // Polyfill `key` on `KeyboardEvent`.
    var proto = {
      get: function (x) {
        var key = keyboardeventKeyPolyfill.keys[this.which || this.keyCode];

        if (Array.isArray(key)) {
          key = key[+this.shiftKey];
        }

        return key;
      }
    };
    Object.defineProperty(KeyboardEvent.prototype, 'key', proto);
    return proto;
  }

  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (keyboardeventKeyPolyfill),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}

})();


/***/ }),

/***/ 7418:
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 6647:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: () => (/* binding */ date_picker)
});

// EXTERNAL MODULE: ./node_modules/keyboardevent-key-polyfill/index.js
var keyboardevent_key_polyfill = __webpack_require__(1764);
;// CONCATENATED MODULE: ./node_modules/receptor/src/keymap.js


// these are the only relevant modifiers supported on all platforms,
// according to MDN:
// <https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState>
const MODIFIERS = {
  Alt: 'altKey',
  Control: 'ctrlKey',
  Ctrl: 'ctrlKey',
  Shift: 'shiftKey'
}

const MODIFIER_SEPARATOR = '+'

function getEventKey(event, hasModifiers) {
  let key = event.key
  if (hasModifiers) {
    for (const modifier in MODIFIERS) {
      if (event[MODIFIERS[modifier]] === true) {
        key = [modifier, key].join(MODIFIER_SEPARATOR)
      }
    }
  }
  return key
}

function keymap(keys) {
  const hasModifiers = Object.keys(keys).some(key => {
    return key.indexOf(MODIFIER_SEPARATOR) > -1
  })
  return function keymapper(event) {
    const key = getEventKey(event, hasModifiers)
    return [key, key.toLowerCase()].reduce((result, _key) => {
      if (_key in keys) {
        return keys[key].call(this, event)
      }
      return result
    })
  }
}



// EXTERNAL MODULE: ./node_modules/object-assign/index.js
var object_assign = __webpack_require__(7418);
var object_assign_default = /*#__PURE__*/__webpack_require__.n(object_assign);
// EXTERNAL MODULE: ./node_modules/element-closest/element-closest.js
var element_closest = __webpack_require__(2924);
;// CONCATENATED MODULE: ./node_modules/receptor/src/delegate.js
// polyfill Element.prototype.closest


function delegate(selector, fn) {
  return event => {
    const target = event.target.closest(selector)
    if (target) {
      return fn.call(target, event)
    }
  }
}

;// CONCATENATED MODULE: ./node_modules/receptor/src/compose.js
function compose(functions) {
  return function(e) {
    return functions.some(fn => {
      return fn.call(this, e) === false
    })
  }
}

;// CONCATENATED MODULE: ./node_modules/receptor/src/delegateAll.js



const SPLAT = '*'

function delegateAll(selectors) {
  const keys = Object.keys(selectors)

  // XXX optimization: if there is only one handler and it applies to
  // all elements (the "*" CSS selector), then just return that
  // handler
  if (keys.length === 1 && keys[0] === SPLAT) {
    return selectors[SPLAT]
  }

  const delegates = keys.reduce(function(memo, selector) {
    memo.push(delegate(selector, selectors[selector]))
    return memo
  }, [])
  return compose(delegates)
}

;// CONCATENATED MODULE: ./node_modules/receptor/src/behavior.js




const DELEGATE_PATTERN = /^(.+):delegate\((.+)\)$/
const SPACE = ' '

const getListeners = (type, handler) => {
  const match = type.match(DELEGATE_PATTERN)
  let selector
  if (match) {
    type = match[1]
    selector = match[2]
  }

  let options
  if (typeof handler === 'object') {
    options = {
      capture: popKey(handler, 'capture'),
      passive: popKey(handler, 'passive')
    }
  }

  const listener = {
    selector,
    options,
    delegate: typeof handler === 'object' ? delegateAll(handler) : selector ? delegate(selector, handler) : handler
  }

  if (type.indexOf(SPACE) > -1) {
    return type.split(SPACE).map(_type => {
      return object_assign_default()({type: _type}, listener)
    })
  } else {
    listener.type = type
    return [listener]
  }
}

const popKey = (obj, key) => {
  const value = obj[key]
  delete obj[key]
  return value
}

function behavior(events, props) {
  const listeners = Object.keys(events).reduce((memo, type) => {
    const listeners = getListeners(type, events[type])
    return memo.concat(listeners)
  }, [])

  return object_assign_default()(
    {
      add: element => {
        for (const listener of listeners) {
          element.addEventListener(listener.type, listener.delegate, listener.options)
        }
      },
      remove: element => {
        for (const listener of listeners) {
          element.removeEventListener(listener.type, listener.delegate, listener.options)
        }
      }
    },
    props
  )
}

;// CONCATENATED MODULE: ./src/js/utils/behavior.js



/**
 * @name sequence
 * @param {...Function} seq an array of functions
 * @return { closure } callHooks
 */
// We use a named function here because we want it to inherit its lexical scope
// from the behavior props object, not from the module
const sequence = (...seq) =>
  function callHooks(target = document.body) {
    seq.forEach((method) => {
      if (typeof this[method] === "function") {
        this[method].call(this, target);
      }
    });
  };

/**
 * @name behavior
 * @param {object} events
 * @param {object?} props
 * @return {receptor.behavior}
 */
/* harmony default export */ const utils_behavior = ((events, props) =>
  behavior(
    events,
    object_assign_default()(
      {
        on: sequence("init", "add"),
        off: sequence("teardown", "remove"),
      },
      props
    )
  ));

// EXTERNAL MODULE: ./src/js/utils/select.js
var utils_select = __webpack_require__(4231);
;// CONCATENATED MODULE: ./src/js/utils/active-element.js
/* harmony default export */ const active_element = ((htmlDocument = document) => htmlDocument.activeElement);

;// CONCATENATED MODULE: ./src/js/utils/is-ios-device.js
// iOS detection from: http://stackoverflow.com/a/9039885/177710
function isIosDevice() {
  return (
    typeof navigator !== "undefined" &&
    (navigator.userAgent.match(/(iPod|iPhone|iPad)/g) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)) &&
    !window.MSStream
  );
}

/* harmony default export */ const is_ios_device = (isIosDevice);

;// CONCATENATED MODULE: ./src/js/components/date-picker.js





const CLICK = 'click';

const DATE_PICKER_CLASS = `date-picker`;
const DATE_PICKER_WRAPPER_CLASS = `${DATE_PICKER_CLASS}__wrapper`;
const DATE_PICKER_INITIALIZED_CLASS = `${DATE_PICKER_CLASS}--initialized`;
const DATE_PICKER_ACTIVE_CLASS = `${DATE_PICKER_CLASS}--active`;
const DATE_PICKER_INTERNAL_INPUT_CLASS = `${DATE_PICKER_CLASS}__internal-input`;
const DATE_PICKER_EXTERNAL_INPUT_CLASS = `${DATE_PICKER_CLASS}__external-input`;
const DATE_PICKER_BUTTON_CLASS = `${DATE_PICKER_CLASS}__button`;
const DATE_PICKER_CALENDAR_CLASS = `${DATE_PICKER_CLASS}__calendar`;
const DATE_PICKER_STATUS_CLASS = `${DATE_PICKER_CLASS}__status`;
const DATE_PICKER_GUIDE_CLASS = `${DATE_PICKER_CLASS}__guide`;
const CALENDAR_DATE_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__date`;

const DIALOG_WRAPPER_CLASS = `dialog-wrapper`;
const DATE_PICKER_DIALOG_WRAPPER = `.${DIALOG_WRAPPER_CLASS}`;

const CALENDAR_DATE_FOCUSED_CLASS = `${CALENDAR_DATE_CLASS}--focused`;
const CALENDAR_DATE_SELECTED_CLASS = `${CALENDAR_DATE_CLASS}--selected`;
const CALENDAR_DATE_PREVIOUS_MONTH_CLASS = `${CALENDAR_DATE_CLASS}--previous-month`;
const CALENDAR_DATE_CURRENT_MONTH_CLASS = `${CALENDAR_DATE_CLASS}--current-month`;
const CALENDAR_DATE_NEXT_MONTH_CLASS = `${CALENDAR_DATE_CLASS}--next-month`;
const CALENDAR_DATE_RANGE_DATE_CLASS = `${CALENDAR_DATE_CLASS}--range-date`;
const CALENDAR_DATE_TODAY_CLASS = `${CALENDAR_DATE_CLASS}--today`;
const CALENDAR_DATE_RANGE_DATE_START_CLASS = `${CALENDAR_DATE_CLASS}--range-date-start`;
const CALENDAR_DATE_RANGE_DATE_END_CLASS = `${CALENDAR_DATE_CLASS}--range-date-end`;
const CALENDAR_DATE_WITHIN_RANGE_CLASS = `${CALENDAR_DATE_CLASS}--within-range`;
const CALENDAR_PREVIOUS_YEAR_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__previous-year`;
const CALENDAR_PREVIOUS_MONTH_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__previous-month`;
const CALENDAR_NEXT_YEAR_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__next-year`;
const CALENDAR_NEXT_MONTH_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__next-month`;
const CALENDAR_MONTH_SELECTION_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__month-selection`;
const CALENDAR_YEAR_SELECTION_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__year-selection`;
const CALENDAR_MONTH_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__month`;
const CALENDAR_MONTH_FOCUSED_CLASS = `${CALENDAR_MONTH_CLASS}--focused`;
const CALENDAR_MONTH_SELECTED_CLASS = `${CALENDAR_MONTH_CLASS}--selected`;
const CALENDAR_YEAR_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__year`;
const CALENDAR_YEAR_FOCUSED_CLASS = `${CALENDAR_YEAR_CLASS}--focused`;
const CALENDAR_YEAR_SELECTED_CLASS = `${CALENDAR_YEAR_CLASS}--selected`;
const CALENDAR_PREVIOUS_YEAR_CHUNK_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__previous-year-chunk`;
const CALENDAR_NEXT_YEAR_CHUNK_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__next-year-chunk`;
const CALENDAR_DATE_PICKER_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__date-picker`;
const CALENDAR_MONTH_PICKER_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__month-picker`;
const CALENDAR_YEAR_PICKER_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__year-picker`;
const CALENDAR_TABLE_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__table`;
const CALENDAR_ROW_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__row`;
const CALENDAR_CELL_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__cell`;
const CALENDAR_CELL_CENTER_ITEMS_CLASS = `${CALENDAR_CELL_CLASS}--center-items`;
const CALENDAR_MONTH_LABEL_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__month-label`;
const CALENDAR_DAY_OF_WEEK_CLASS = `${DATE_PICKER_CALENDAR_CLASS}__day-of-week`;

const DATE_PICKER = `.${DATE_PICKER_CLASS}`;
const DATE_PICKER_BUTTON = `.${DATE_PICKER_BUTTON_CLASS}`;
const DATE_PICKER_INTERNAL_INPUT = `.${DATE_PICKER_INTERNAL_INPUT_CLASS}`;
const DATE_PICKER_EXTERNAL_INPUT = `.${DATE_PICKER_EXTERNAL_INPUT_CLASS}`;
const DATE_PICKER_CALENDAR = `.${DATE_PICKER_CALENDAR_CLASS}`;
const DATE_PICKER_STATUS = `.${DATE_PICKER_STATUS_CLASS}`;
const DATE_PICKER_GUIDE = `.${DATE_PICKER_GUIDE_CLASS}`;
const CALENDAR_DATE = `.${CALENDAR_DATE_CLASS}`;
const CALENDAR_DATE_FOCUSED = `.${CALENDAR_DATE_FOCUSED_CLASS}`;
const CALENDAR_DATE_CURRENT_MONTH = `.${CALENDAR_DATE_CURRENT_MONTH_CLASS}`;
const CALENDAR_PREVIOUS_YEAR = `.${CALENDAR_PREVIOUS_YEAR_CLASS}`;
const CALENDAR_PREVIOUS_MONTH = `.${CALENDAR_PREVIOUS_MONTH_CLASS}`;
const CALENDAR_NEXT_YEAR = `.${CALENDAR_NEXT_YEAR_CLASS}`;
const CALENDAR_NEXT_MONTH = `.${CALENDAR_NEXT_MONTH_CLASS}`;
const CALENDAR_YEAR_SELECTION = `.${CALENDAR_YEAR_SELECTION_CLASS}`;
const CALENDAR_MONTH_SELECTION = `.${CALENDAR_MONTH_SELECTION_CLASS}`;
const CALENDAR_MONTH = `.${CALENDAR_MONTH_CLASS}`;
const CALENDAR_YEAR = `.${CALENDAR_YEAR_CLASS}`;
const CALENDAR_PREVIOUS_YEAR_CHUNK = `.${CALENDAR_PREVIOUS_YEAR_CHUNK_CLASS}`;
const CALENDAR_NEXT_YEAR_CHUNK = `.${CALENDAR_NEXT_YEAR_CHUNK_CLASS}`;
const CALENDAR_DATE_PICKER = `.${CALENDAR_DATE_PICKER_CLASS}`;
const CALENDAR_MONTH_PICKER = `.${CALENDAR_MONTH_PICKER_CLASS}`;
const CALENDAR_YEAR_PICKER = `.${CALENDAR_YEAR_PICKER_CLASS}`;
const CALENDAR_MONTH_FOCUSED = `.${CALENDAR_MONTH_FOCUSED_CLASS}`;
const CALENDAR_YEAR_FOCUSED = `.${CALENDAR_YEAR_FOCUSED_CLASS}`;

let date_picker_text = {
  "open_calendar": "Åbn kalender",
  "choose_a_date": "Vælg en dato",
  "choose_a_date_between": "Vælg en dato mellem {minDay}. {minMonthStr} {minYear} og {maxDay}. {maxMonthStr} {maxYear}",
  "choose_a_date_before": "Vælg en dato. Der kan vælges indtil {maxDay}. {maxMonthStr} {maxYear}.",
  "choose_a_date_after": "Vælg en dato. Der kan vælges fra {minDay}. {minMonthStr} {minYear} og fremad.",
  "aria_label_date": "{dayStr} den {day}. {monthStr} {year}",
  "current_month_displayed": "Viser {monthLabel} {focusedYear}",
  "first_possible_date": "Første valgbare dato",
  "last_possible_date": "Sidste valgbare dato",
  "previous_year": "Navigér ét år tilbage",
  "previous_month": "Navigér én måned tilbage",
  "next_month": "Navigér én måned frem",
  "next_year": "Navigér ét år frem",
  "select_month": "Vælg måned",
  "select_year": "Vælg år",
  "previous_years": "Navigér {years} år tilbage",
  "next_years": "Navigér {years} år frem",
  "guide": "Navigerer du med tastatur, kan du skifte dag med højre og venstre piletaster, uger med op og ned piletaster, måneder med page up og page down-tasterne og år med shift-tasten plus page up eller page down. Home og end-tasten navigerer til start eller slutning af en uge.",
  "months_displayed": "Vælg en måned",
  "years_displayed": "Viser år {start} til {end}. Vælg et år.",
  "january": "januar",
  "february": "februar",
  "march": "marts",
  "april": "april",
  "may": "maj",
  "june": "juni",
  "july": "juli",
  "august": "august",
  "september": "september",
  "october": "oktober",
  "november": "november",
  "december": "december",
  "monday": "mandag",
  "tuesday": "tirsdag",
  "wednesday": "onsdag",
  "thursday": "torsdag",
  "friday": "fredag",
  "saturday": "lørdag",
  "sunday": "søndag"
}

const VALIDATION_MESSAGE = "Indtast venligst en gyldig dato";

let MONTH_LABELS = [
  date_picker_text.january,
  date_picker_text.february,
  date_picker_text.march,
  date_picker_text.april,
  date_picker_text.may,
  date_picker_text.june,
  date_picker_text.july,
  date_picker_text.august,
  date_picker_text.september,
  date_picker_text.october,
  date_picker_text.november,
  date_picker_text.december
];

let DAY_OF_WEEK_LABELS = [
  date_picker_text.monday,
  date_picker_text.tuesday,
  date_picker_text.wednesday,
  date_picker_text.thursday,
  date_picker_text.friday,
  date_picker_text.saturday,
  date_picker_text.sunday
];

const ENTER_KEYCODE = 13;

const YEAR_CHUNK = 12;

const DEFAULT_MIN_DATE = "0000-01-01";
const DATE_FORMAT_OPTION_1 = "DD/MM/YYYY";
const DATE_FORMAT_OPTION_2 = "DD-MM-YYYY";
const DATE_FORMAT_OPTION_3 = "DD.MM.YYYY";
const DATE_FORMAT_OPTION_4 = "DD MM YYYY";
const DATE_FORMAT_OPTION_5 = "DD/MM-YYYY";
const INTERNAL_DATE_FORMAT = "YYYY-MM-DD";

const NOT_DISABLED_SELECTOR = ":not([disabled])";

const processFocusableSelectors = (...selectors) =>
  selectors.map((query) => query + NOT_DISABLED_SELECTOR).join(", ");

const DATE_PICKER_FOCUSABLE = processFocusableSelectors(
  CALENDAR_PREVIOUS_YEAR,
  CALENDAR_PREVIOUS_MONTH,
  CALENDAR_YEAR_SELECTION,
  CALENDAR_MONTH_SELECTION,
  CALENDAR_NEXT_YEAR,
  CALENDAR_NEXT_MONTH,
  CALENDAR_DATE_FOCUSED
);

const MONTH_PICKER_FOCUSABLE = processFocusableSelectors(
  CALENDAR_MONTH_FOCUSED
);

const YEAR_PICKER_FOCUSABLE = processFocusableSelectors(
  CALENDAR_PREVIOUS_YEAR_CHUNK,
  CALENDAR_NEXT_YEAR_CHUNK,
  CALENDAR_YEAR_FOCUSED
);

// #region Date Manipulation Functions

/**
 * Keep date within month. Month would only be over by 1 to 3 days
 *
 * @param {Date} dateToCheck the date object to check
 * @param {number} month the correct month
 * @returns {Date} the date, corrected if needed
 */
const keepDateWithinMonth = (dateToCheck, month) => {
  if (month !== dateToCheck.getMonth()) {
    dateToCheck.setDate(0);
  }

  return dateToCheck;
};

/**
 * Set date from month day year
 *
 * @param {number} year the year to set
 * @param {number} month the month to set (zero-indexed)
 * @param {number} date the date to set
 * @returns {Date} the set date
 */
const setDate = (year, month, date) => {
  const newDate = new Date(0);
  newDate.setFullYear(year, month, date);
  return newDate;
};

/**
 * todays date
 *
 * @returns {Date} todays date
 */
const today = () => {
  const newDate = new Date();
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  return setDate(year, month, day);
};

/**
 * Set date to first day of the month
 *
 * @param {number} date the date to adjust
 * @returns {Date} the adjusted date
 */
const startOfMonth = (date) => {
  const newDate = new Date(0);
  newDate.setFullYear(date.getFullYear(), date.getMonth(), 1);
  return newDate;
};

/**
 * Set date to last day of the month
 *
 * @param {number} date the date to adjust
 * @returns {Date} the adjusted date
 */
const lastDayOfMonth = (date) => {
  const newDate = new Date(0);
  newDate.setFullYear(date.getFullYear(), date.getMonth() + 1, 0);
  return newDate;
};

/**
 * Add days to date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numDays the difference in days
 * @returns {Date} the adjusted date
 */
const addDays = (_date, numDays) => {
  const newDate = new Date(_date.getTime());
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
};

/**
 * Subtract days from date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numDays the difference in days
 * @returns {Date} the adjusted date
 */
const subDays = (_date, numDays) => addDays(_date, -numDays);

/**
 * Add weeks to date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numWeeks the difference in weeks
 * @returns {Date} the adjusted date
 */
const addWeeks = (_date, numWeeks) => addDays(_date, numWeeks * 7);

/**
 * Subtract weeks from date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numWeeks the difference in weeks
 * @returns {Date} the adjusted date
 */
const subWeeks = (_date, numWeeks) => addWeeks(_date, -numWeeks);

/**
 * Set date to the start of the week (Monday)
 *
 * @param {Date} _date the date to adjust
 * @returns {Date} the adjusted date
 */
const startOfWeek = (_date) => {
  let dayOfWeek = _date.getDay()-1;
  if(dayOfWeek === -1){
    dayOfWeek = 6;
  }
  return subDays(_date, dayOfWeek);
};

/**
 * Set date to the end of the week (Sunday)
 *
 * @param {Date} _date the date to adjust
 * @param {number} numWeeks the difference in weeks
 * @returns {Date} the adjusted date
 */
const endOfWeek = (_date) => {
  const dayOfWeek = _date.getDay();
  return addDays(_date, 7 - dayOfWeek);
};

/**
 * Add months to date and keep date within month
 *
 * @param {Date} _date the date to adjust
 * @param {number} numMonths the difference in months
 * @returns {Date} the adjusted date
 */
const addMonths = (_date, numMonths) => {
  const newDate = new Date(_date.getTime());

  const dateMonth = (newDate.getMonth() + 12 + numMonths) % 12;
  newDate.setMonth(newDate.getMonth() + numMonths);
  keepDateWithinMonth(newDate, dateMonth);

  return newDate;
};

/**
 * Subtract months from date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numMonths the difference in months
 * @returns {Date} the adjusted date
 */
const subMonths = (_date, numMonths) => addMonths(_date, -numMonths);

/**
 * Add years to date and keep date within month
 *
 * @param {Date} _date the date to adjust
 * @param {number} numYears the difference in years
 * @returns {Date} the adjusted date
 */
const addYears = (_date, numYears) => addMonths(_date, numYears * 12);

/**
 * Subtract years from date
 *
 * @param {Date} _date the date to adjust
 * @param {number} numYears the difference in years
 * @returns {Date} the adjusted date
 */
const subYears = (_date, numYears) => addYears(_date, -numYears);

/**
 * Set months of date
 *
 * @param {Date} _date the date to adjust
 * @param {number} month zero-indexed month to set
 * @returns {Date} the adjusted date
 */
const setMonth = (_date, month) => {
  const newDate = new Date(_date.getTime());

  newDate.setMonth(month);
  keepDateWithinMonth(newDate, month);

  return newDate;
};

/**
 * Set year of date
 *
 * @param {Date} _date the date to adjust
 * @param {number} year the year to set
 * @returns {Date} the adjusted date
 */
const setYear = (_date, year) => {
  const newDate = new Date(_date.getTime());

  const month = newDate.getMonth();
  newDate.setFullYear(year);
  keepDateWithinMonth(newDate, month);

  return newDate;
};

/**
 * Return the earliest date
 *
 * @param {Date} dateA date to compare
 * @param {Date} dateB date to compare
 * @returns {Date} the earliest date
 */
const min = (dateA, dateB) => {
  let newDate = dateA;

  if (dateB < dateA) {
    newDate = dateB;
  }

  return new Date(newDate.getTime());
};

/**
 * Return the latest date
 *
 * @param {Date} dateA date to compare
 * @param {Date} dateB date to compare
 * @returns {Date} the latest date
 */
const max = (dateA, dateB) => {
  let newDate = dateA;

  if (dateB > dateA) {
    newDate = dateB;
  }

  return new Date(newDate.getTime());
};

/**
 * Check if dates are the in the same year
 *
 * @param {Date} dateA date to compare
 * @param {Date} dateB date to compare
 * @returns {boolean} are dates in the same year
 */
const isSameYear = (dateA, dateB) => {
  return dateA && dateB && dateA.getFullYear() === dateB.getFullYear();
};

/**
 * Check if dates are the in the same month
 *
 * @param {Date} dateA date to compare
 * @param {Date} dateB date to compare
 * @returns {boolean} are dates in the same month
 */
const isSameMonth = (dateA, dateB) => {
  return isSameYear(dateA, dateB) && dateA.getMonth() === dateB.getMonth();
};

/**
 * Check if dates are the same date
 *
 * @param {Date} dateA the date to compare
 * @param {Date} dateB the date to compare
 * @returns {boolean} are dates the same date
 */
const isSameDay = (dateA, dateB) => {
  return isSameMonth(dateA, dateB) && dateA.getDate() === dateB.getDate();
};

/**
 * return a new date within minimum and maximum date
 *
 * @param {Date} date date to check
 * @param {Date} minDate minimum date to allow
 * @param {Date} maxDate maximum date to allow
 * @returns {Date} the date between min and max
 */
const keepDateBetweenMinAndMax = (date, minDate, maxDate) => {
  let newDate = date;

  if (date < minDate) {
    newDate = minDate;
  } else if (maxDate && date > maxDate) {
    newDate = maxDate;
  }

  return new Date(newDate.getTime());
};

/**
 * Check if dates is valid.
 *
 * @param {Date} date date to check
 * @param {Date} minDate minimum date to allow
 * @param {Date} maxDate maximum date to allow
 * @return {boolean} is there a day within the month within min and max dates
 */
const isDateWithinMinAndMax = (date, minDate, maxDate) =>
  date >= minDate && (!maxDate || date <= maxDate);

/**
 * Check if dates month is invalid.
 *
 * @param {Date} date date to check
 * @param {Date} minDate minimum date to allow
 * @param {Date} maxDate maximum date to allow
 * @return {boolean} is the month outside min or max dates
 */
const isDatesMonthOutsideMinOrMax = (date, minDate, maxDate) => {
  return (
    lastDayOfMonth(date) < minDate || (maxDate && startOfMonth(date) > maxDate)
  );
};

/**
 * Check if dates year is invalid.
 *
 * @param {Date} date date to check
 * @param {Date} minDate minimum date to allow
 * @param {Date} maxDate maximum date to allow
 * @return {boolean} is the month outside min or max dates
 */
const isDatesYearOutsideMinOrMax = (date, minDate, maxDate) => {
  return (
    lastDayOfMonth(setMonth(date, 11)) < minDate ||
    (maxDate && startOfMonth(setMonth(date, 0)) > maxDate)
  );
};

/**
 * Parse a date with format D-M-YY
 *
 * @param {string} dateString the date string to parse
 * @param {string} dateFormat the format of the date string
 * @param {boolean} adjustDate should the date be adjusted
 * @returns {Date} the parsed date
 */
const parseDateString = (
  dateString,
  dateFormat = INTERNAL_DATE_FORMAT,
  adjustDate = false
) => {
  let date;
  let month;
  let day;
  let year;
  let parsed;

  if (dateString) {
    let monthStr, dayStr, yearStr;
    if (dateFormat === DATE_FORMAT_OPTION_1 || dateFormat === DATE_FORMAT_OPTION_2 || dateFormat === DATE_FORMAT_OPTION_3 || dateFormat === DATE_FORMAT_OPTION_4 || dateFormat === DATE_FORMAT_OPTION_5) {
      [dayStr, monthStr, yearStr] = dateString.split(/-|\.|\/|\s/);
    } else {
      [yearStr, monthStr, dayStr] = dateString.split("-");
    }

    if (yearStr) {
      parsed = parseInt(yearStr, 10);
      if (!Number.isNaN(parsed)) {
        year = parsed;
        if (adjustDate) {
          year = Math.max(0, year);
          if (yearStr.length < 3) {
            const currentYear = today().getFullYear();
            const currentYearStub =
              currentYear - (currentYear % 10 ** yearStr.length);
            year = currentYearStub + parsed;
          }
        }
      }
    }

    if (monthStr) {
      parsed = parseInt(monthStr, 10);
      if (!Number.isNaN(parsed)) {
        month = parsed;
        if (adjustDate) {
          month = Math.max(1, month);
          month = Math.min(12, month);
        }
      }
    }

    if (month && dayStr && year != null) {
      parsed = parseInt(dayStr, 10);
      if (!Number.isNaN(parsed)) {
        day = parsed;
        if (adjustDate) {
          const lastDayOfTheMonth = setDate(year, month, 0).getDate();
          day = Math.max(1, day);
          day = Math.min(lastDayOfTheMonth, day);
        }
      }
    }

    if (month && day && year != null) {
      date = setDate(year, month - 1, day);
    }
  }

  return date;
};

/**
 * Format a date to format DD-MM-YYYY
 *
 * @param {Date} date the date to format
 * @param {string} dateFormat the format of the date string
 * @returns {string} the formatted date string
 */
const formatDate = (date, dateFormat = INTERNAL_DATE_FORMAT) => {
  const padZeros = (value, length) => {
    return `0000${value}`.slice(-length);
  };

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  if (dateFormat === DATE_FORMAT_OPTION_1) {
    return [padZeros(day, 2), padZeros(month, 2), padZeros(year, 4)].join("/");
  }
  else if (dateFormat === DATE_FORMAT_OPTION_2) {
    return [padZeros(day, 2), padZeros(month, 2), padZeros(year, 4)].join("-");
  }
  else if (dateFormat === DATE_FORMAT_OPTION_3) {
    return [padZeros(day, 2), padZeros(month, 2), padZeros(year, 4)].join(".");
  }
  else if (dateFormat === DATE_FORMAT_OPTION_4) {
    return [padZeros(day, 2), padZeros(month, 2), padZeros(year, 4)].join(" ");
  }
  else if (dateFormat === DATE_FORMAT_OPTION_5) {
    let tempDayMonth = [padZeros(day, 2), padZeros(month, 2)].join("/");
    return [tempDayMonth, padZeros(year, 4)].join("-");
  }

  return [padZeros(year, 4), padZeros(month, 2), padZeros(day, 2)].join("-");
};

// #endregion Date Manipulation Functions

/**
 * Create a grid string from an array of html strings
 *
 * @param {string[]} htmlArray the array of html items
 * @param {number} rowSize the length of a row
 * @returns {string} the grid string
 */
const listToGridHtml = (htmlArray, rowSize) => {
  const grid = [];
  let row = [];

  let i = 0;
  while (i < htmlArray.length) {
    row = [];
    while (i < htmlArray.length && row.length < rowSize) {
      row.push(`<td>${htmlArray[i]}</td>`);
      i += 1;
    }
    grid.push(`<tr>${row.join("")}</tr>`);
  }

  return grid.join("");
};

/**
 * set the value of the element and dispatch a change event
 *
 * @param {HTMLInputElement} el The element to update
 * @param {string} value The new value of the element
 */
const changeElementValue = (el, value = "") => {
  const elementToChange = el;
  elementToChange.value = value;


  var event = new Event('change');
  elementToChange.dispatchEvent(event);
};

/**
 * The properties and elements within the date picker.
 * @typedef {Object} DatePickerContext
 * @property {HTMLDivElement} calendarEl
 * @property {HTMLElement} datePickerEl
 * @property {HTMLDivElement} dialogEl
 * @property {HTMLInputElement} internalInputEl
 * @property {HTMLInputElement} externalInputEl
 * @property {HTMLDivElement} statusEl
 * @property {HTMLDivElement} guideEl
 * @property {HTMLDivElement} firstYearChunkEl
 * @property {Date} calendarDate
 * @property {Date} minDate
 * @property {Date} maxDate
 * @property {Date} selectedDate
 * @property {Date} rangeDate
 * @property {Date} defaultDate
 */

/**
 * Get an object of the properties and elements belonging directly to the given
 * date picker component.
 *
 * @param {HTMLElement} el the element within the date picker
 * @returns {DatePickerContext} elements
 */
const getDatePickerContext = (el) => {
  const datePickerEl = el.closest(DATE_PICKER);

  if (!datePickerEl) {
    throw new Error(`Element is missing outer ${DATE_PICKER}`);
  }

  const internalInputEl = datePickerEl.querySelector(
    DATE_PICKER_INTERNAL_INPUT
  );
  const externalInputEl = datePickerEl.querySelector(
    DATE_PICKER_EXTERNAL_INPUT
  );
  const calendarEl = datePickerEl.querySelector(DATE_PICKER_CALENDAR);
  const toggleBtnEl = datePickerEl.querySelector(DATE_PICKER_BUTTON);
  const statusEl = datePickerEl.querySelector(DATE_PICKER_STATUS);
  const guideEl = datePickerEl.querySelector(DATE_PICKER_GUIDE);
  const firstYearChunkEl = datePickerEl.querySelector(CALENDAR_YEAR);
  const dialogEl = datePickerEl.querySelector(DATE_PICKER_DIALOG_WRAPPER);

  // Set date format
  let selectedDateFormat = DATE_FORMAT_OPTION_1;
  if (datePickerEl.hasAttribute("data-dateformat")) {
    switch (datePickerEl.dataset.dateformat) {
      case DATE_FORMAT_OPTION_1:
        selectedDateFormat = DATE_FORMAT_OPTION_1;
        break;
      case DATE_FORMAT_OPTION_2:
        selectedDateFormat = DATE_FORMAT_OPTION_2;
        break;
      case DATE_FORMAT_OPTION_3:
        selectedDateFormat = DATE_FORMAT_OPTION_3;
        break;
      case DATE_FORMAT_OPTION_4:
        selectedDateFormat = DATE_FORMAT_OPTION_4;
        break;
      case DATE_FORMAT_OPTION_5:
        selectedDateFormat = DATE_FORMAT_OPTION_5;
    }
  }
  const dateFormatOption = selectedDateFormat; 

  const inputDate = parseDateString(
    externalInputEl.value,
    dateFormatOption,
    true
  );
  const selectedDate = parseDateString(internalInputEl.value);

  const calendarDate = parseDateString(calendarEl.dataset.value);
  const minDate = parseDateString(datePickerEl.dataset.minDate);
  const maxDate = parseDateString(datePickerEl.dataset.maxDate);
  const rangeDate = parseDateString(datePickerEl.dataset.rangeDate);
  const defaultDate = parseDateString(datePickerEl.dataset.defaultDate);

  if (minDate && maxDate && minDate > maxDate) {
    throw new Error("Minimum date cannot be after maximum date");
  }

  return {
    calendarDate,
    minDate,
    toggleBtnEl,
    dialogEl,
    selectedDate,
    maxDate,
    firstYearChunkEl,
    datePickerEl,
    inputDate,
    internalInputEl,
    externalInputEl,
    calendarEl,
    rangeDate,
    defaultDate,
    statusEl,
    guideEl,
    dateFormatOption
  };
};

/**
 * Disable the date picker component
 *
 * @param {HTMLElement} el An element within the date picker component
 */
const disable = (el) => {
  const { externalInputEl, toggleBtnEl } = getDatePickerContext(el);

  toggleBtnEl.disabled = true;
  externalInputEl.disabled = true;
};

/**
 * Enable the date picker component
 *
 * @param {HTMLElement} el An element within the date picker component
 */
const enable = (el) => {
  const { externalInputEl, toggleBtnEl } = getDatePickerContext(el);

  toggleBtnEl.disabled = false;
  externalInputEl.disabled = false;
};

// #region Validation

/**
 * Validate the value in the input as a valid date of format D/M/YYYY
 *
 * @param {HTMLElement} el An element within the date picker component
 */
const isDateInputInvalid = (el) => {
  const { externalInputEl, minDate, maxDate } = getDatePickerContext(el);

  const dateString = externalInputEl.value;
  let isInvalid = false;

  if (dateString) {
    isInvalid = true;

    const dateStringParts = dateString.split(/-|\.|\/|\s/);
    const [day, month, year] = dateStringParts.map((str) => {
      let value;
      const parsed = parseInt(str, 10);
      if (!Number.isNaN(parsed)) value = parsed;
      return value;
    });

    if (month && day && year != null) {
      const checkDate = setDate(year, month - 1, day);

      if (
        checkDate.getMonth() === month - 1 &&
        checkDate.getDate() === day &&
        checkDate.getFullYear() === year &&
        dateStringParts[2].length === 4 &&
        isDateWithinMinAndMax(checkDate, minDate, maxDate)
      ) {
        isInvalid = false;
      }
    }
  }

  return isInvalid;
};

/**
 * Validate the value in the input as a valid date of format M/D/YYYY
 *
 * @param {HTMLElement} el An element within the date picker component
 */
const validateDateInput = (el) => {
  const { externalInputEl } = getDatePickerContext(el);
  const isInvalid = isDateInputInvalid(externalInputEl);

  if (isInvalid && !externalInputEl.validationMessage) {
    externalInputEl.setCustomValidity(VALIDATION_MESSAGE);
  }

  if (!isInvalid && externalInputEl.validationMessage === VALIDATION_MESSAGE) {
    externalInputEl.setCustomValidity("");
  }
};

// #endregion Validation

/**
 * Enable the date picker component
 *
 * @param {HTMLElement} el An element within the date picker component
 */
const reconcileInputValues = (el) => {
  const { internalInputEl, inputDate } = getDatePickerContext(el);
  let newValue = "";

  if (inputDate && !isDateInputInvalid(el)) {
    newValue = formatDate(inputDate);
  }

  if (internalInputEl.value !== newValue) {
    changeElementValue(internalInputEl, newValue);
  }
};

/**
 * Select the value of the date picker inputs.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 * @param {string} dateString The date string to update in YYYY-MM-DD format
 */
const setCalendarValue = (el, dateString) => {
  const parsedDate = parseDateString(dateString);

  if (parsedDate) {
    
    const {
      datePickerEl,
      internalInputEl,
      externalInputEl,
      dateFormatOption
    } = getDatePickerContext(el);

    const formattedDate = formatDate(parsedDate, dateFormatOption);

    changeElementValue(internalInputEl, dateString);
    changeElementValue(externalInputEl, formattedDate);

    validateDateInput(datePickerEl);
  }
};

/**
 * Enhance an input with the date picker elements
 *
 * @param {HTMLElement} el The initial wrapping element of the date picker component
 */
const enhanceDatePicker = (el) => {
  const datePickerEl = el.closest(DATE_PICKER);
  const defaultValue = datePickerEl.dataset.defaultValue;

  const internalInputEl = datePickerEl.querySelector(`input`);

  if (!internalInputEl) {
    throw new Error(`${DATE_PICKER} is missing inner input`);
  }

  const minDate = parseDateString(
    datePickerEl.dataset.minDate || internalInputEl.getAttribute("min")
  );
  datePickerEl.dataset.minDate = minDate
    ? formatDate(minDate)
    : DEFAULT_MIN_DATE;

  const maxDate = parseDateString(
    datePickerEl.dataset.maxDate || internalInputEl.getAttribute("max")
  );
  if (maxDate) {
    datePickerEl.dataset.maxDate = formatDate(maxDate);
  }

  const calendarWrapper = document.createElement("div");
  calendarWrapper.classList.add(DATE_PICKER_WRAPPER_CLASS);
  calendarWrapper.tabIndex = "-1";

  const externalInputEl = internalInputEl.cloneNode();
  externalInputEl.classList.add(DATE_PICKER_EXTERNAL_INPUT_CLASS);
  externalInputEl.type = "text";
  externalInputEl.name = "";

  let dialogTitle = date_picker_text.choose_a_date;
  const hasMinDate = minDate !== undefined && minDate !== "";
  const isDefaultMinDate =  minDate !== undefined && minDate !== "" && parseDateString(DEFAULT_MIN_DATE).getTime() === minDate.getTime();
  const hasMaxDate = maxDate !== undefined && maxDate !== "";
  
  if (hasMinDate && !isDefaultMinDate && hasMaxDate) {
    const minDay = minDate.getDate();
    const minMonth = minDate.getMonth();
    const minMonthStr = MONTH_LABELS[minMonth];
    const minYear = minDate.getFullYear();
    const maxDay = maxDate.getDate();
    const maxMonth = maxDate.getMonth();
    const maxMonthStr = MONTH_LABELS[maxMonth];
    const maxYear = maxDate.getFullYear();
    dialogTitle = date_picker_text.choose_a_date_between.replace(/{minDay}/, minDay).replace(/{minMonthStr}/, minMonthStr).replace(/{minYear}/, minYear).replace(/{maxDay}/, maxDay).replace(/{maxMonthStr}/, maxMonthStr).replace(/{maxYear}/, maxYear);
  }
  else if (hasMinDate && !isDefaultMinDate && !hasMaxDate) {
    const minDay = minDate.getDate();
    const minMonth = minDate.getMonth();
    const minMonthStr = MONTH_LABELS[minMonth];
    const minYear = minDate.getFullYear();
    dialogTitle = date_picker_text.choose_a_date_after.replace(/{minDay}/, minDay).replace(/{minMonthStr}/, minMonthStr).replace(/{minYear}/, minYear);
  }
  else if (hasMaxDate) {
    const maxDay = maxDate.getDate();
    const maxMonth = maxDate.getMonth();
    const maxMonthStr = MONTH_LABELS[maxMonth];
    const maxYear = maxDate.getFullYear();
    dialogTitle = date_picker_text.choose_a_date_before.replace(/{maxDay}/, maxDay).replace(/{maxMonthStr}/, maxMonthStr).replace(/{maxYear}/, maxYear);
  }

  const guideID = externalInputEl.getAttribute("id") + "-guide";

  calendarWrapper.appendChild(externalInputEl);
  calendarWrapper.insertAdjacentHTML(
    "beforeend",
    [
      `<button type="button" class="${DATE_PICKER_BUTTON_CLASS}" aria-haspopup="true" aria-label="${date_picker_text.open_calendar}">&nbsp;</button>`,
      `<div class="${DIALOG_WRAPPER_CLASS}" role="dialog" aria-modal="true" aria-label="${dialogTitle}" aria-describedby="${guideID}" hidden><div role="application"><div class="${DATE_PICKER_CALENDAR_CLASS}" hidden></div></div></div>`,
      `<div class="sr-only ${DATE_PICKER_STATUS_CLASS}" role="status" aria-live="polite"></div>`,
      `<div class="sr-only ${DATE_PICKER_GUIDE_CLASS}" id="${guideID}" hidden>${date_picker_text.guide}</div>`
    ].join("")
  );

  internalInputEl.setAttribute("aria-hidden", "true");
  internalInputEl.setAttribute("tabindex", "-1");
  internalInputEl.classList.add(
    "sr-only",
    DATE_PICKER_INTERNAL_INPUT_CLASS
  );
  internalInputEl.removeAttribute('id');
  internalInputEl.required = false;

  datePickerEl.appendChild(calendarWrapper);
  datePickerEl.classList.add(DATE_PICKER_INITIALIZED_CLASS);

  if (defaultValue) {
    setCalendarValue(datePickerEl, defaultValue);
  }

  if (internalInputEl.disabled) {
    disable(datePickerEl);
    internalInputEl.disabled = false;
  }
  
  if (externalInputEl.value) {
    validateDateInput(externalInputEl);
  }
};

// #region Calendar - Date Selection View

/**
 * render the calendar.
 *
 * @param {HTMLElement} el An element within the date picker component
 * @param {Date} _dateToDisplay a date to render on the calendar
 * @returns {HTMLElement} a reference to the new calendar element
 */
const renderCalendar = (el, _dateToDisplay) => {
  const {
    datePickerEl,
    calendarEl,
    statusEl,
    selectedDate,
    maxDate,
    minDate,
    rangeDate,
    dialogEl,
    guideEl
  } = getDatePickerContext(el);
  const todaysDate = today();
  let dateToDisplay = _dateToDisplay || todaysDate;

  const calendarWasHidden = calendarEl.hidden;

  const focusedDate = addDays(dateToDisplay, 0);
  const focusedMonth = dateToDisplay.getMonth();
  const focusedYear = dateToDisplay.getFullYear();

  const prevMonth = subMonths(dateToDisplay, 1);
  const nextMonth = addMonths(dateToDisplay, 1);

  const currentFormattedDate = formatDate(dateToDisplay);

  const firstOfMonth = startOfMonth(dateToDisplay);
  const prevButtonsDisabled = isSameMonth(dateToDisplay, minDate);
  const nextButtonsDisabled = isSameMonth(dateToDisplay, maxDate);

  const rangeConclusionDate = selectedDate || dateToDisplay;
  const rangeStartDate = rangeDate && min(rangeConclusionDate, rangeDate);
  const rangeEndDate = rangeDate && max(rangeConclusionDate, rangeDate);

  const withinRangeStartDate = rangeDate && addDays(rangeStartDate, 1);
  const withinRangeEndDate = rangeDate && subDays(rangeEndDate, 1);

  const monthLabel = MONTH_LABELS[focusedMonth];

  const generateDateHtml = (dateToRender) => {
    const classes = [CALENDAR_DATE_CLASS];
    const day = dateToRender.getDate();
    const month = dateToRender.getMonth();
    const year = dateToRender.getFullYear();
    let dayOfWeek = dateToRender.getDay() - 1;
    if (dayOfWeek === -1) {
      dayOfWeek = 6;
    }

    const formattedDate = formatDate(dateToRender);

    let tabindex = "-1";

    const isDisabled = !isDateWithinMinAndMax(dateToRender, minDate, maxDate);
    const isSelected = isSameDay(dateToRender, selectedDate);

    if (isSameMonth(dateToRender, prevMonth)) {
      classes.push(CALENDAR_DATE_PREVIOUS_MONTH_CLASS);
    }

    if (isSameMonth(dateToRender, focusedDate)) {
      classes.push(CALENDAR_DATE_CURRENT_MONTH_CLASS);
    }

    if (isSameMonth(dateToRender, nextMonth)) {
      classes.push(CALENDAR_DATE_NEXT_MONTH_CLASS);
    }

    if (isSelected) {
      classes.push(CALENDAR_DATE_SELECTED_CLASS);
    }

    if (isSameDay(dateToRender, todaysDate)) {
      classes.push(CALENDAR_DATE_TODAY_CLASS);
    }

    if (rangeDate) {
      if (isSameDay(dateToRender, rangeDate)) {
        classes.push(CALENDAR_DATE_RANGE_DATE_CLASS);
      }

      if (isSameDay(dateToRender, rangeStartDate)) {
        classes.push(CALENDAR_DATE_RANGE_DATE_START_CLASS);
      }

      if (isSameDay(dateToRender, rangeEndDate)) {
        classes.push(CALENDAR_DATE_RANGE_DATE_END_CLASS);
      }

      if (
        isDateWithinMinAndMax(
          dateToRender,
          withinRangeStartDate,
          withinRangeEndDate
        )
      ) {
        classes.push(CALENDAR_DATE_WITHIN_RANGE_CLASS);
      }
    }

    if (isSameDay(dateToRender, focusedDate)) {
      tabindex = "0";
      classes.push(CALENDAR_DATE_FOCUSED_CLASS);
    }

    const monthStr = MONTH_LABELS[month];
    const dayStr = DAY_OF_WEEK_LABELS[dayOfWeek];
    const ariaLabelDate = date_picker_text.aria_label_date.replace(/{dayStr}/, dayStr).replace(/{day}/, day).replace(/{monthStr}/, monthStr).replace(/{year}/, year);

    return `<button
      type="button"
      tabindex="${tabindex}"
      class="${classes.join(" ")}" 
      data-day="${day}" 
      data-month="${month + 1}" 
      data-year="${year}" 
      data-value="${formattedDate}"
      aria-label="${ariaLabelDate}"
      aria-current="${isSelected ? "date" : "false"}"
      ${isDisabled ? `disabled="disabled"` : ""}
    >${day}</button>`;
  };
  // set date to first rendered day
  dateToDisplay = startOfWeek(firstOfMonth);

  const days = [];

  while (
    days.length < 28 ||
    dateToDisplay.getMonth() === focusedMonth ||
    days.length % 7 !== 0
  ) {
    days.push(generateDateHtml(dateToDisplay));
    dateToDisplay = addDays(dateToDisplay, 1);    
  }
  const datesHtml = listToGridHtml(days, 7);

  const newCalendar = calendarEl.cloneNode();
  newCalendar.dataset.value = currentFormattedDate;
  newCalendar.style.top = `${datePickerEl.offsetHeight}px`;
  newCalendar.hidden = false;
  let content = `<div tabindex="-1" class="${CALENDAR_DATE_PICKER_CLASS}">
      <div class="${CALENDAR_ROW_CLASS}">
        <div class="${CALENDAR_CELL_CLASS} ${CALENDAR_CELL_CENTER_ITEMS_CLASS}">
          <button 
            type="button"
            class="${CALENDAR_PREVIOUS_YEAR_CLASS}"
            aria-label="${date_picker_text.previous_year}"
            ${prevButtonsDisabled ? `disabled="disabled"` : ""}
          >&nbsp;</button>
        </div>
        <div class="${CALENDAR_CELL_CLASS} ${CALENDAR_CELL_CENTER_ITEMS_CLASS}">
          <button 
            type="button"
            class="${CALENDAR_PREVIOUS_MONTH_CLASS}"
            aria-label="${date_picker_text.previous_month}"
            ${prevButtonsDisabled ? `disabled="disabled"` : ""}
          >&nbsp;</button>
        </div>
        <div class="${CALENDAR_CELL_CLASS} ${CALENDAR_MONTH_LABEL_CLASS}">
          <button 
            type="button"
            class="${CALENDAR_MONTH_SELECTION_CLASS}" aria-label="${monthLabel}. ${date_picker_text.select_month}."
          >${monthLabel}</button>
          <button 
            type="button"
            class="${CALENDAR_YEAR_SELECTION_CLASS}" aria-label="${focusedYear}. ${date_picker_text.select_year}."
          >${focusedYear}</button>
        </div>
        <div class="${CALENDAR_CELL_CLASS} ${CALENDAR_CELL_CENTER_ITEMS_CLASS}">
          <button 
            type="button"
            class="${CALENDAR_NEXT_MONTH_CLASS}"
            aria-label="${date_picker_text.next_month}"
            ${nextButtonsDisabled ? `disabled="disabled"` : ""}
          >&nbsp;</button>
        </div>
        <div class="${CALENDAR_CELL_CLASS} ${CALENDAR_CELL_CENTER_ITEMS_CLASS}">
          <button 
            type="button"
            class="${CALENDAR_NEXT_YEAR_CLASS}"
            aria-label="${date_picker_text.next_year}"
            ${nextButtonsDisabled ? `disabled="disabled"` : ""}
          >&nbsp;</button>
        </div>
      </div>
      <table class="${CALENDAR_TABLE_CLASS}" role="presentation">
        <thead>
          <tr>`;
  for(let d in DAY_OF_WEEK_LABELS){
    content += `<th class="${CALENDAR_DAY_OF_WEEK_CLASS}" scope="col" aria-label="${DAY_OF_WEEK_LABELS[d]}">${DAY_OF_WEEK_LABELS[d].charAt(0)}</th>`;
  }
  content += `</tr>
        </thead>
        <tbody>
          ${datesHtml}
        </tbody>
      </table>
    </div>`;
  newCalendar.innerHTML = content;
  calendarEl.parentNode.replaceChild(newCalendar, calendarEl);

  datePickerEl.classList.add(DATE_PICKER_ACTIVE_CLASS);
  if (dialogEl.hidden === true) {
    dialogEl.hidden = false;
    if (guideEl.hidden) {
      guideEl.hidden = false;
    }
  }
  
  const statuses = [];

  if (calendarWasHidden) {
    statusEl.textContent = "";
  } 
  else if (_dateToDisplay.getTime() === minDate.getTime()) {
    statuses.push(date_picker_text.first_possible_date);
  }
  else if (maxDate !== undefined && maxDate !== "" && _dateToDisplay.getTime() === maxDate.getTime()) {
    statuses.push(date_picker_text.last_possible_date);
  }
  else {
    statuses.push(date_picker_text.current_month_displayed.replace(/{monthLabel}/, monthLabel).replace(/{focusedYear}/, focusedYear));
  }

  statusEl.textContent = statuses.join(". ");

  return newCalendar;
};

/**
 * Navigate back one year and display the calendar.
 *
 * @param {HTMLButtonElement} _buttonEl An element within the date picker component
 */
const displayPreviousYear = (_buttonEl) => {
  if (_buttonEl.disabled) return;
  const { calendarEl, calendarDate, minDate, maxDate } = getDatePickerContext(
    _buttonEl
  );
  let date = subYears(calendarDate, 1);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = renderCalendar(calendarEl, date);

  let nextToFocus = newCalendar.querySelector(CALENDAR_PREVIOUS_YEAR);
  if (nextToFocus.disabled) {
    nextToFocus = newCalendar.querySelector(CALENDAR_DATE_PICKER);
  }
  nextToFocus.focus();
};

/**
 * Navigate back one month and display the calendar.
 *
 * @param {HTMLButtonElement} _buttonEl An element within the date picker component
 */
const displayPreviousMonth = (_buttonEl) => {
  if (_buttonEl.disabled) return;
  const { calendarEl, calendarDate, minDate, maxDate } = getDatePickerContext(
    _buttonEl
  );
  let date = subMonths(calendarDate, 1);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = renderCalendar(calendarEl, date);

  let nextToFocus = newCalendar.querySelector(CALENDAR_PREVIOUS_MONTH);
  if (nextToFocus.disabled) {
    nextToFocus = newCalendar.querySelector(CALENDAR_DATE_PICKER);
  }
  nextToFocus.focus();
};

/**
 * Navigate forward one month and display the calendar.
 *
 * @param {HTMLButtonElement} _buttonEl An element within the date picker component
 */
const displayNextMonth = (_buttonEl) => {
  if (_buttonEl.disabled) return;
  const { calendarEl, calendarDate, minDate, maxDate } = getDatePickerContext(
    _buttonEl
  );
  let date = addMonths(calendarDate, 1);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = renderCalendar(calendarEl, date);

  let nextToFocus = newCalendar.querySelector(CALENDAR_NEXT_MONTH);
  if (nextToFocus.disabled) {
    nextToFocus = newCalendar.querySelector(CALENDAR_DATE_PICKER);
  }
  nextToFocus.focus();
};

/**
 * Navigate forward one year and display the calendar.
 *
 * @param {HTMLButtonElement} _buttonEl An element within the date picker component
 */
const displayNextYear = (_buttonEl) => {
  if (_buttonEl.disabled) return;
  const { calendarEl, calendarDate, minDate, maxDate } = getDatePickerContext(
    _buttonEl
  );
  let date = addYears(calendarDate, 1);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = renderCalendar(calendarEl, date);

  let nextToFocus = newCalendar.querySelector(CALENDAR_NEXT_YEAR);
  if (nextToFocus.disabled) {
    nextToFocus = newCalendar.querySelector(CALENDAR_DATE_PICKER);
  }
  nextToFocus.focus();
};

/**
 * Hide the calendar of a date picker component.
 *
 * @param {HTMLElement} el An element within the date picker component
 */
const hideCalendar = (el) => {
  const { datePickerEl, calendarEl, statusEl } = getDatePickerContext(el);

  datePickerEl.classList.remove(DATE_PICKER_ACTIVE_CLASS);
  calendarEl.hidden = true;
  statusEl.textContent = "";
};

/**
 * Select a date within the date picker component.
 *
 * @param {HTMLButtonElement} calendarDateEl A date element within the date picker component
 */
const selectDate = (calendarDateEl) => {
  if (calendarDateEl.disabled) return;

  const { datePickerEl, externalInputEl, dialogEl, guideEl } = getDatePickerContext(
    calendarDateEl
  );
  setCalendarValue(calendarDateEl, calendarDateEl.dataset.value);
  hideCalendar(datePickerEl);
  dialogEl.hidden = true;
  guideEl.hidden = true;

  externalInputEl.focus();
};

/**
 * Toggle the calendar.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 */
const toggleCalendar = (el) => {
  if (el.disabled) return;
  const {
    dialogEl,
    calendarEl,
    inputDate,
    minDate,
    maxDate,
    defaultDate,
    guideEl
  } = getDatePickerContext(el);

  if (calendarEl.hidden) {
    const dateToDisplay = keepDateBetweenMinAndMax(
      inputDate || defaultDate || today(),
      minDate,
      maxDate
    );
    const newCalendar = renderCalendar(calendarEl, dateToDisplay);
    newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
  } else {
    hideCalendar(el);
    dialogEl.hidden = true;
    guideEl.hidden = true;
  }
};

/**
 * Update the calendar when visible.
 *
 * @param {HTMLElement} el an element within the date picker
 */
const updateCalendarIfVisible = (el) => {
  const { calendarEl, inputDate, minDate, maxDate } = getDatePickerContext(el);
  const calendarShown = !calendarEl.hidden;

  if (calendarShown && inputDate) {
    const dateToDisplay = keepDateBetweenMinAndMax(inputDate, minDate, maxDate);
    renderCalendar(calendarEl, dateToDisplay);
  }
};

// #endregion Calendar - Date Selection View

// #region Calendar - Month Selection View
/**
 * Display the month selection screen in the date picker.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 * @returns {HTMLElement} a reference to the new calendar element
 */
const displayMonthSelection = (el, monthToDisplay) => {
  const {
    calendarEl,
    statusEl,
    calendarDate,
    minDate,
    maxDate,
  } = getDatePickerContext(el);

  const selectedMonth = calendarDate.getMonth();
  const focusedMonth = monthToDisplay == null ? selectedMonth : monthToDisplay;

  const months = MONTH_LABELS.map((month, index) => {
    const monthToCheck = setMonth(calendarDate, index);

    const isDisabled = isDatesMonthOutsideMinOrMax(
      monthToCheck,
      minDate,
      maxDate
    );

    let tabindex = "-1";

    const classes = [CALENDAR_MONTH_CLASS];
    const isSelected = index === selectedMonth;

    if (index === focusedMonth) {
      tabindex = "0";
      classes.push(CALENDAR_MONTH_FOCUSED_CLASS);
    }

    if (isSelected) {
      classes.push(CALENDAR_MONTH_SELECTED_CLASS);
    }

    return `<button 
        type="button"
        tabindex="${tabindex}"
        class="${classes.join(" ")}" 
        data-value="${index}"
        data-label="${month}"
        aria-current="${isSelected ? "true" : "false"}"
        ${isDisabled ? `disabled="disabled"` : ""}
      >${month}</button>`;
  });

  const monthsHtml = `<div tabindex="-1" class="${CALENDAR_MONTH_PICKER_CLASS}">
    <table class="${CALENDAR_TABLE_CLASS}" role="presentation">
      <tbody>
        ${listToGridHtml(months, 3)}
      </tbody>
    </table>
  </div>`;

  const newCalendar = calendarEl.cloneNode();
  newCalendar.innerHTML = monthsHtml;
  calendarEl.parentNode.replaceChild(newCalendar, calendarEl);

  statusEl.textContent = date_picker_text.months_displayed;

  return newCalendar;
};

/**
 * Select a month in the date picker component.
 *
 * @param {HTMLButtonElement} monthEl An month element within the date picker component
 */
const selectMonth = (monthEl) => {
  if (monthEl.disabled) return;
  const { calendarEl, calendarDate, minDate, maxDate } = getDatePickerContext(
    monthEl
  );
  const selectedMonth = parseInt(monthEl.dataset.value, 10);
  let date = setMonth(calendarDate, selectedMonth);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = renderCalendar(calendarEl, date);
  newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
};

// #endregion Calendar - Month Selection View

// #region Calendar - Year Selection View

/**
 * Display the year selection screen in the date picker.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 * @param {number} yearToDisplay year to display in year selection
 * @returns {HTMLElement} a reference to the new calendar element
 */
const displayYearSelection = (el, yearToDisplay) => {
  const {
    calendarEl,
    statusEl,
    calendarDate,
    minDate,
    maxDate,
  } = getDatePickerContext(el);

  const selectedYear = calendarDate.getFullYear();
  const focusedYear = yearToDisplay == null ? selectedYear : yearToDisplay;

  let yearToChunk = focusedYear;
  yearToChunk -= yearToChunk % YEAR_CHUNK;
  yearToChunk = Math.max(0, yearToChunk);

  const prevYearChunkDisabled = isDatesYearOutsideMinOrMax(
    setYear(calendarDate, yearToChunk - 1),
    minDate,
    maxDate
  );

  const nextYearChunkDisabled = isDatesYearOutsideMinOrMax(
    setYear(calendarDate, yearToChunk + YEAR_CHUNK),
    minDate,
    maxDate
  );

  const years = [];
  let yearIndex = yearToChunk;
  while (years.length < YEAR_CHUNK) {
    const isDisabled = isDatesYearOutsideMinOrMax(
      setYear(calendarDate, yearIndex),
      minDate,
      maxDate
    );

    let tabindex = "-1";

    const classes = [CALENDAR_YEAR_CLASS];
    const isSelected = yearIndex === selectedYear;

    if (yearIndex === focusedYear) {
      tabindex = "0";
      classes.push(CALENDAR_YEAR_FOCUSED_CLASS);
    }

    if (isSelected) {
      classes.push(CALENDAR_YEAR_SELECTED_CLASS);
    }

    years.push(
      `<button 
        type="button"
        tabindex="${tabindex}"
        class="${classes.join(" ")}" 
        data-value="${yearIndex}"
        aria-current="${isSelected ? "true" : "false"}"
        ${isDisabled ? `disabled="disabled"` : ""}
      >${yearIndex}</button>`
    );
    yearIndex += 1;
  }

  const yearsHtml = listToGridHtml(years, 3);
  const ariaLabelPreviousYears = date_picker_text.previous_years.replace(/{years}/, YEAR_CHUNK);
  const ariaLabelNextYears = date_picker_text.next_years.replace(/{years}/, YEAR_CHUNK);
  const announceYears = date_picker_text.years_displayed.replace(/{start}/, yearToChunk).replace(/{end}/, yearToChunk + YEAR_CHUNK - 1);

  const newCalendar = calendarEl.cloneNode();
  newCalendar.innerHTML = `<div tabindex="-1" class="${CALENDAR_YEAR_PICKER_CLASS}">
    <table class="${CALENDAR_TABLE_CLASS}" role="presentation">
        <tbody>
          <tr>
            <td>
              <button
                type="button"
                class="${CALENDAR_PREVIOUS_YEAR_CHUNK_CLASS}" 
                aria-label="${ariaLabelPreviousYears}"
                ${prevYearChunkDisabled ? `disabled="disabled"` : ""}
              >&nbsp;</button>
            </td>
            <td colspan="3">
              <table class="${CALENDAR_TABLE_CLASS}" role="presentation">
                <tbody>
                  ${yearsHtml}
                </tbody>
              </table>
            </td>
            <td>
              <button
                type="button"
                class="${CALENDAR_NEXT_YEAR_CHUNK_CLASS}" 
                aria-label="${ariaLabelNextYears}"
                ${nextYearChunkDisabled ? `disabled="disabled"` : ""}
              >&nbsp;</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>`;
  calendarEl.parentNode.replaceChild(newCalendar, calendarEl);

  statusEl.textContent = announceYears;

  return newCalendar;
};

/**
 * Navigate back by years and display the year selection screen.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 */
const displayPreviousYearChunk = (el) => {
  if (el.disabled) return;

  const { calendarEl, calendarDate, minDate, maxDate } = getDatePickerContext(
    el
  );
  const yearEl = calendarEl.querySelector(CALENDAR_YEAR_FOCUSED);
  const selectedYear = parseInt(yearEl.textContent, 10);

  let adjustedYear = selectedYear - YEAR_CHUNK;
  adjustedYear = Math.max(0, adjustedYear);

  const date = setYear(calendarDate, adjustedYear);
  const cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = displayYearSelection(
    calendarEl,
    cappedDate.getFullYear()
  );

  let nextToFocus = newCalendar.querySelector(CALENDAR_PREVIOUS_YEAR_CHUNK);
  if (nextToFocus.disabled) {
    nextToFocus = newCalendar.querySelector(CALENDAR_YEAR_PICKER);
  }
  nextToFocus.focus();
};

/**
 * Navigate forward by years and display the year selection screen.
 *
 * @param {HTMLButtonElement} el An element within the date picker component
 */
const displayNextYearChunk = (el) => {
  if (el.disabled) return;

  const { calendarEl, calendarDate, minDate, maxDate } = getDatePickerContext(
    el
  );
  const yearEl = calendarEl.querySelector(CALENDAR_YEAR_FOCUSED);
  const selectedYear = parseInt(yearEl.textContent, 10);

  let adjustedYear = selectedYear + YEAR_CHUNK;
  adjustedYear = Math.max(0, adjustedYear);

  const date = setYear(calendarDate, adjustedYear);
  const cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = displayYearSelection(
    calendarEl,
    cappedDate.getFullYear()
  );

  let nextToFocus = newCalendar.querySelector(CALENDAR_NEXT_YEAR_CHUNK);
  if (nextToFocus.disabled) {
    nextToFocus = newCalendar.querySelector(CALENDAR_YEAR_PICKER);
  }
  nextToFocus.focus();
};

/**
 * Select a year in the date picker component.
 *
 * @param {HTMLButtonElement} yearEl A year element within the date picker component
 */
const selectYear = (yearEl) => {
  if (yearEl.disabled) return;
  const { calendarEl, calendarDate, minDate, maxDate } = getDatePickerContext(
    yearEl
  );
  const selectedYear = parseInt(yearEl.innerHTML, 10);
  let date = setYear(calendarDate, selectedYear);
  date = keepDateBetweenMinAndMax(date, minDate, maxDate);
  const newCalendar = renderCalendar(calendarEl, date);
  newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
};

// #endregion Calendar - Year Selection View

// #region Calendar Event Handling

/**
 * Hide the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleEscapeFromCalendar = (event) => {
  const { datePickerEl, externalInputEl, dialogEl, guideEl } = getDatePickerContext(event.target);

  hideCalendar(datePickerEl);
  dialogEl.hidden = true;
  guideEl.hidden = true;
  externalInputEl.focus();

  event.preventDefault();
};

// #endregion Calendar Event Handling

// #region Calendar Date Event Handling

/**
 * Adjust the date and display the calendar if needed.
 *
 * @param {function} adjustDateFn function that returns the adjusted date
 */
const adjustCalendar = (adjustDateFn) => {
  return (event) => {
    const { calendarEl, calendarDate, minDate, maxDate } = getDatePickerContext(
      event.target
    );

    const date = adjustDateFn(calendarDate);

    const cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);
    if (!isSameDay(calendarDate, cappedDate)) {
      const newCalendar = renderCalendar(calendarEl, cappedDate);
      newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
    }
    event.preventDefault();
  };
};

/**
 * Navigate back one week and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleUpFromDate = adjustCalendar((date) => subWeeks(date, 1));

/**
 * Navigate forward one week and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleDownFromDate = adjustCalendar((date) => addWeeks(date, 1));

/**
 * Navigate back one day and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleLeftFromDate = adjustCalendar((date) => subDays(date, 1));

/**
 * Navigate forward one day and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleRightFromDate = adjustCalendar((date) => addDays(date, 1));

/**
 * Navigate to the start of the week and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleHomeFromDate = adjustCalendar((date) => startOfWeek(date));

/**
 * Navigate to the end of the week and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleEndFromDate = adjustCalendar((date) => endOfWeek(date));

/**
 * Navigate forward one month and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handlePageDownFromDate = adjustCalendar((date) => addMonths(date, 1));

/**
 * Navigate back one month and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handlePageUpFromDate = adjustCalendar((date) => subMonths(date, 1));

/**
 * Navigate forward one year and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleShiftPageDownFromDate = adjustCalendar((date) => addYears(date, 1));

/**
 * Navigate back one year and display the calendar.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleShiftPageUpFromDate = adjustCalendar((date) => subYears(date, 1));

/**
 * display the calendar for the mousemove date.
 *
 * @param {MouseEvent} event The mousemove event
 * @param {HTMLButtonElement} dateEl A date element within the date picker component
 */
const handleMousemoveFromDate = (dateEl) => {
  if (dateEl.disabled) return;

  const calendarEl = dateEl.closest(DATE_PICKER_CALENDAR);

  const currentCalendarDate = calendarEl.dataset.value;
  const hoverDate = dateEl.dataset.value;

  if (hoverDate === currentCalendarDate) return;

  const dateToDisplay = parseDateString(hoverDate);
  const newCalendar = renderCalendar(calendarEl, dateToDisplay);
  newCalendar.querySelector(CALENDAR_DATE_FOCUSED).focus();
};

// #endregion Calendar Date Event Handling

// #region Calendar Month Event Handling

/**
 * Adjust the month and display the month selection screen if needed.
 *
 * @param {function} adjustMonthFn function that returns the adjusted month
 */
const adjustMonthSelectionScreen = (adjustMonthFn) => {
  return (event) => {
    const monthEl = event.target;
    const selectedMonth = parseInt(monthEl.dataset.value, 10);
    const { calendarEl, calendarDate, minDate, maxDate } = getDatePickerContext(
      monthEl
    );
    const currentDate = setMonth(calendarDate, selectedMonth);

    let adjustedMonth = adjustMonthFn(selectedMonth);
    adjustedMonth = Math.max(0, Math.min(11, adjustedMonth));

    const date = setMonth(calendarDate, adjustedMonth);
    const cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);
    if (!isSameMonth(currentDate, cappedDate)) {
      const newCalendar = displayMonthSelection(
        calendarEl,
        cappedDate.getMonth()
      );
      newCalendar.querySelector(CALENDAR_MONTH_FOCUSED).focus();
    }
    event.preventDefault();
  };
};

/**
 * Navigate back three months and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleUpFromMonth = adjustMonthSelectionScreen((month) => month - 3);

/**
 * Navigate forward three months and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleDownFromMonth = adjustMonthSelectionScreen((month) => month + 3);

/**
 * Navigate back one month and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleLeftFromMonth = adjustMonthSelectionScreen((month) => month - 1);

/**
 * Navigate forward one month and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleRightFromMonth = adjustMonthSelectionScreen((month) => month + 1);

/**
 * Navigate to the start of the row of months and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleHomeFromMonth = adjustMonthSelectionScreen(
  (month) => month - (month % 3)
);

/**
 * Navigate to the end of the row of months and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleEndFromMonth = adjustMonthSelectionScreen(
  (month) => month + 2 - (month % 3)
);

/**
 * Navigate to the last month (December) and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handlePageDownFromMonth = adjustMonthSelectionScreen(() => 11);

/**
 * Navigate to the first month (January) and display the month selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handlePageUpFromMonth = adjustMonthSelectionScreen(() => 0);

/**
 * update the focus on a month when the mouse moves.
 *
 * @param {MouseEvent} event The mousemove event
 * @param {HTMLButtonElement} monthEl A month element within the date picker component
 */
const handleMousemoveFromMonth = (monthEl) => {
  if (monthEl.disabled) return;
  if (monthEl.classList.contains(CALENDAR_MONTH_FOCUSED_CLASS)) return;

  const focusMonth = parseInt(monthEl.dataset.value, 10);

  const newCalendar = displayMonthSelection(monthEl, focusMonth);
  newCalendar.querySelector(CALENDAR_MONTH_FOCUSED).focus();
};

// #endregion Calendar Month Event Handling

// #region Calendar Year Event Handling

/**
 * Adjust the year and display the year selection screen if needed.
 *
 * @param {function} adjustYearFn function that returns the adjusted year
 */
const adjustYearSelectionScreen = (adjustYearFn) => {
  return (event) => {
    const yearEl = event.target;
    const selectedYear = parseInt(yearEl.dataset.value, 10);
    const { calendarEl, calendarDate, minDate, maxDate } = getDatePickerContext(
      yearEl
    );
    const currentDate = setYear(calendarDate, selectedYear);

    let adjustedYear = adjustYearFn(selectedYear);
    adjustedYear = Math.max(0, adjustedYear);

    const date = setYear(calendarDate, adjustedYear);
    const cappedDate = keepDateBetweenMinAndMax(date, minDate, maxDate);
    if (!isSameYear(currentDate, cappedDate)) {
      const newCalendar = displayYearSelection(
        calendarEl,
        cappedDate.getFullYear()
      );
      newCalendar.querySelector(CALENDAR_YEAR_FOCUSED).focus();
    }
    event.preventDefault();
  };
};

/**
 * Navigate back three years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleUpFromYear = adjustYearSelectionScreen((year) => year - 3);

/**
 * Navigate forward three years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleDownFromYear = adjustYearSelectionScreen((year) => year + 3);

/**
 * Navigate back one year and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleLeftFromYear = adjustYearSelectionScreen((year) => year - 1);

/**
 * Navigate forward one year and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleRightFromYear = adjustYearSelectionScreen((year) => year + 1);

/**
 * Navigate to the start of the row of years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleHomeFromYear = adjustYearSelectionScreen(
  (year) => year - (year % 3)
);

/**
 * Navigate to the end of the row of years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handleEndFromYear = adjustYearSelectionScreen(
  (year) => year + 2 - (year % 3)
);

/**
 * Navigate to back 12 years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handlePageUpFromYear = adjustYearSelectionScreen(
  (year) => year - YEAR_CHUNK
);

/**
 * Navigate forward 12 years and display the year selection screen.
 *
 * @param {KeyboardEvent} event the keydown event
 */
const handlePageDownFromYear = adjustYearSelectionScreen(
  (year) => year + YEAR_CHUNK
);

/**
 * update the focus on a year when the mouse moves.
 *
 * @param {MouseEvent} event The mousemove event
 * @param {HTMLButtonElement} dateEl A year element within the date picker component
 */
const handleMousemoveFromYear = (yearEl) => {
  if (yearEl.disabled) return;
  if (yearEl.classList.contains(CALENDAR_YEAR_FOCUSED_CLASS)) return;

  const focusYear = parseInt(yearEl.dataset.value, 10);

  const newCalendar = displayYearSelection(yearEl, focusYear);
  newCalendar.querySelector(CALENDAR_YEAR_FOCUSED).focus();
};

// #endregion Calendar Year Event Handling

// #region Focus Handling Event Handling

const tabHandler = (focusable) => {
  const getFocusableContext = (el) => {
    const { calendarEl } = getDatePickerContext(el);
    const focusableElements = (0,utils_select/* default */.Z)(focusable, calendarEl);

    const firstTabIndex = 0;
    const lastTabIndex = focusableElements.length - 1;
    const firstTabStop = focusableElements[firstTabIndex];
    const lastTabStop = focusableElements[lastTabIndex];
    const focusIndex = focusableElements.indexOf(active_element());

    const isLastTab = focusIndex === lastTabIndex;
    const isFirstTab = focusIndex === firstTabIndex;
    const isNotFound = focusIndex === -1;

    return {
      focusableElements,
      isNotFound,
      firstTabStop,
      isFirstTab,
      lastTabStop,
      isLastTab,
    };
  };

  return {
    tabAhead(event) {
      const { firstTabStop, isLastTab, isNotFound } = getFocusableContext(
        event.target
      );

      if (isLastTab || isNotFound) {
        event.preventDefault();
        firstTabStop.focus();
      }
    },
    tabBack(event) {
      const { lastTabStop, isFirstTab, isNotFound } = getFocusableContext(
        event.target
      );

      if (isFirstTab || isNotFound) {
        event.preventDefault();
        lastTabStop.focus();
      }
    },
  };
};

const datePickerTabEventHandler = tabHandler(DATE_PICKER_FOCUSABLE);
const monthPickerTabEventHandler = tabHandler(MONTH_PICKER_FOCUSABLE);
const yearPickerTabEventHandler = tabHandler(YEAR_PICKER_FOCUSABLE);

// #endregion Focus Handling Event Handling

// #region Date Picker Event Delegation Registration / Component

const datePickerEvents = {
  [CLICK]: {
    [DATE_PICKER_BUTTON]() {
      toggleCalendar(this);
    },
    [CALENDAR_DATE]() {
      selectDate(this);
    },
    [CALENDAR_MONTH]() {
      selectMonth(this);
    },
    [CALENDAR_YEAR]() {
      selectYear(this);
    },
    [CALENDAR_PREVIOUS_MONTH]() {
      displayPreviousMonth(this);
    },
    [CALENDAR_NEXT_MONTH]() {
      displayNextMonth(this);
    },
    [CALENDAR_PREVIOUS_YEAR]() {
      displayPreviousYear(this);
    },
    [CALENDAR_NEXT_YEAR]() {
      displayNextYear(this);
    },
    [CALENDAR_PREVIOUS_YEAR_CHUNK]() {
      displayPreviousYearChunk(this);
    },
    [CALENDAR_NEXT_YEAR_CHUNK]() {
      displayNextYearChunk(this);
    },
    [CALENDAR_MONTH_SELECTION]() {
      const newCalendar = displayMonthSelection(this);
      newCalendar.querySelector(CALENDAR_MONTH_FOCUSED).focus();
    },
    [CALENDAR_YEAR_SELECTION]() {
      const newCalendar = displayYearSelection(this);
      newCalendar.querySelector(CALENDAR_YEAR_FOCUSED).focus();
    },
  },
  keyup: {
    [DATE_PICKER_CALENDAR](event) {
      const keydown = this.dataset.keydownKeyCode;
      if (`${event.keyCode}` !== keydown) {
        event.preventDefault();
      }
    },
  },
  keydown: {
    [DATE_PICKER_EXTERNAL_INPUT](event) {
      if (event.keyCode === ENTER_KEYCODE) {
        validateDateInput(this);
      }
    },
    [CALENDAR_DATE]: keymap({
      Up: handleUpFromDate,
      ArrowUp: handleUpFromDate,
      Down: handleDownFromDate,
      ArrowDown: handleDownFromDate,
      Left: handleLeftFromDate,
      ArrowLeft: handleLeftFromDate,
      Right: handleRightFromDate,
      ArrowRight: handleRightFromDate,
      Home: handleHomeFromDate,
      End: handleEndFromDate,
      PageDown: handlePageDownFromDate,
      PageUp: handlePageUpFromDate,
      "Shift+PageDown": handleShiftPageDownFromDate,
      "Shift+PageUp": handleShiftPageUpFromDate,
    }),
    [CALENDAR_DATE_PICKER]: keymap({
      Tab: datePickerTabEventHandler.tabAhead,
      "Shift+Tab": datePickerTabEventHandler.tabBack,
    }),
    [CALENDAR_MONTH]: keymap({
      Up: handleUpFromMonth,
      ArrowUp: handleUpFromMonth,
      Down: handleDownFromMonth,
      ArrowDown: handleDownFromMonth,
      Left: handleLeftFromMonth,
      ArrowLeft: handleLeftFromMonth,
      Right: handleRightFromMonth,
      ArrowRight: handleRightFromMonth,
      Home: handleHomeFromMonth,
      End: handleEndFromMonth,
      PageDown: handlePageDownFromMonth,
      PageUp: handlePageUpFromMonth,
    }),
    [CALENDAR_MONTH_PICKER]: keymap({
      Tab: monthPickerTabEventHandler.tabAhead,
      "Shift+Tab": monthPickerTabEventHandler.tabBack,
    }),
    [CALENDAR_YEAR]: keymap({
      Up: handleUpFromYear,
      ArrowUp: handleUpFromYear,
      Down: handleDownFromYear,
      ArrowDown: handleDownFromYear,
      Left: handleLeftFromYear,
      ArrowLeft: handleLeftFromYear,
      Right: handleRightFromYear,
      ArrowRight: handleRightFromYear,
      Home: handleHomeFromYear,
      End: handleEndFromYear,
      PageDown: handlePageDownFromYear,
      PageUp: handlePageUpFromYear,
    }),
    [CALENDAR_YEAR_PICKER]: keymap({
      Tab: yearPickerTabEventHandler.tabAhead,
      "Shift+Tab": yearPickerTabEventHandler.tabBack,
    }),
    [DATE_PICKER_CALENDAR](event) {
      this.dataset.keydownKeyCode = event.keyCode;
    },
    [DATE_PICKER](event) {
      const keyMap = keymap({
        Escape: handleEscapeFromCalendar,
      });

      keyMap(event);
    },
  },
  focusout: {
    [DATE_PICKER_EXTERNAL_INPUT]() {
      validateDateInput(this);
    },
    [DATE_PICKER](event) {
      if (!this.contains(event.relatedTarget)) {
        hideCalendar(this);
      }
    },
  },
  input: {
    [DATE_PICKER_EXTERNAL_INPUT]() {
      reconcileInputValues(this);
      updateCalendarIfVisible(this);
    },
  },
};

if (!is_ios_device()) {
  datePickerEvents.mousemove = {
    [CALENDAR_DATE_CURRENT_MONTH]() {
      handleMousemoveFromDate(this);
    },
    [CALENDAR_MONTH]() {
      handleMousemoveFromMonth(this);
    },
    [CALENDAR_YEAR]() {
      handleMousemoveFromYear(this);
    },
  };
}

const datePicker = utils_behavior(datePickerEvents, {
  init(root) {
    (0,utils_select/* default */.Z)(DATE_PICKER, root).forEach((datePickerEl) => {
      if(!datePickerEl.classList.contains(DATE_PICKER_INITIALIZED_CLASS)){
        enhanceDatePicker(datePickerEl);
      }
    });
  },
  setLanguage(strings) {
    date_picker_text = strings;
    MONTH_LABELS = [
      date_picker_text.january,
      date_picker_text.february,
      date_picker_text.march,
      date_picker_text.april,
      date_picker_text.may,
      date_picker_text.june,
      date_picker_text.july,
      date_picker_text.august,
      date_picker_text.september,
      date_picker_text.october,
      date_picker_text.november,
      date_picker_text.december
    ];
    DAY_OF_WEEK_LABELS = [
      date_picker_text.monday,
      date_picker_text.tuesday,
      date_picker_text.wednesday,
      date_picker_text.thursday,
      date_picker_text.friday,
      date_picker_text.saturday,
      date_picker_text.sunday
    ];
  },
  getDatePickerContext,
  disable,
  enable,
  isDateInputInvalid,
  setCalendarValue,
  validateDateInput,
  renderCalendar,
  updateCalendarIfVisible
});

// #endregion Date Picker Event Delegation Registration / Component

/* harmony default export */ const date_picker = (datePicker);


/***/ }),

/***/ 1427:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

(function(undefined) {

// Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Object/defineProperty/detect.js
var detect = (
  // In IE8, defineProperty could only act on DOM elements, so full support
  // for the feature requires the ability to set a property on an arbitrary object
  'defineProperty' in Object && (function() {
  	try {
  		var a = {};
  		Object.defineProperty(a, 'test', {value:42});
  		return true;
  	} catch(e) {
  		return false
  	}
  }())
)

if (detect) return

// Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Object.defineProperty&flags=always
(function (nativeDefineProperty) {

	var supportsAccessors = Object.prototype.hasOwnProperty('__defineGetter__');
	var ERR_ACCESSORS_NOT_SUPPORTED = 'Getters & setters cannot be defined on this javascript engine';
	var ERR_VALUE_ACCESSORS = 'A property cannot both have accessors and be writable or have a value';

	Object.defineProperty = function defineProperty(object, property, descriptor) {

		// Where native support exists, assume it
		if (nativeDefineProperty && (object === window || object === document || object === Element.prototype || object instanceof Element)) {
			return nativeDefineProperty(object, property, descriptor);
		}

		if (object === null || !(object instanceof Object || typeof object === 'object')) {
			throw new TypeError('Object.defineProperty called on non-object');
		}

		if (!(descriptor instanceof Object)) {
			throw new TypeError('Property description must be an object');
		}

		var propertyString = String(property);
		var hasValueOrWritable = 'value' in descriptor || 'writable' in descriptor;
		var getterType = 'get' in descriptor && typeof descriptor.get;
		var setterType = 'set' in descriptor && typeof descriptor.set;

		// handle descriptor.get
		if (getterType) {
			if (getterType !== 'function') {
				throw new TypeError('Getter must be a function');
			}
			if (!supportsAccessors) {
				throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
			}
			if (hasValueOrWritable) {
				throw new TypeError(ERR_VALUE_ACCESSORS);
			}
			Object.__defineGetter__.call(object, propertyString, descriptor.get);
		} else {
			object[propertyString] = descriptor.value;
		}

		// handle descriptor.set
		if (setterType) {
			if (setterType !== 'function') {
				throw new TypeError('Setter must be a function');
			}
			if (!supportsAccessors) {
				throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
			}
			if (hasValueOrWritable) {
				throw new TypeError(ERR_VALUE_ACCESSORS);
			}
			Object.__defineSetter__.call(object, propertyString, descriptor.set);
		}

		// OK to define value unconditionally - if a getter has been specified as well, an error would be thrown above
		if ('value' in descriptor) {
			object[propertyString] = descriptor.value;
		}

		return object;
	};
}(Object.defineProperty));
})
.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof __webpack_require__.g && __webpack_require__.g || {});


/***/ }),

/***/ 1011:
/***/ (() => {

/* eslint-disable consistent-return */
/* eslint-disable func-names */
(function () {
  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event, _params) {
    const params = _params || {
      bubbles: false,
      cancelable: false,
      detail: null,
    };
    const evt = document.createEvent("CustomEvent");
    evt.initCustomEvent(
      event,
      params.bubbles,
      params.cancelable,
      params.detail
    );
    return evt;
  }

  window.CustomEvent = CustomEvent;
})();


/***/ }),

/***/ 762:
/***/ (() => {

"use strict";

const elproto = window.HTMLElement.prototype;
const HIDDEN = 'hidden';

if (!(HIDDEN in elproto)) {
  Object.defineProperty(elproto, HIDDEN, {
    get: function () {
      return this.hasAttribute(HIDDEN);
    },
    set: function (value) {
      if (value) {
        this.setAttribute(HIDDEN, '');
      } else {
        this.removeAttribute(HIDDEN);
      }
    },
  });
}


/***/ }),

/***/ 9742:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// polyfills HTMLElement.prototype.classList and DOMTokenList
__webpack_require__(3241);
// polyfills HTMLElement.prototype.hidden
__webpack_require__(762);

// polyfills Number.isNaN()
__webpack_require__(9737);

// polyfills CustomEvent
__webpack_require__(1011);

__webpack_require__(1632);
__webpack_require__(4814);

/***/ }),

/***/ 9737:
/***/ (() => {

Number.isNaN =
  Number.isNaN ||
  function isNaN(input) {
    // eslint-disable-next-line no-self-compare
    return typeof input === "number" && input !== input;
  };


/***/ }),

/***/ 5660:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

let breakpoints = {
  'xs': 0,
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (breakpoints);


/***/ }),

/***/ 6843:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// https://stackoverflow.com/a/7557433
function isElementInViewport (el, win=window,
                              docEl=document.documentElement) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (win.innerHeight || docEl.clientHeight) &&
    rect.right <= (win.innerWidth || docEl.clientWidth)
  );
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (isElementInViewport);


/***/ }),

/***/ 4231:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @name isElement
 * @desc returns whether or not the given argument is a DOM element.
 * @param {any} value
 * @return {boolean}
 */
const isElement = (value) =>
  value && typeof value === "object" && value.nodeType === 1;

/**
 * @name select
 * @desc selects elements from the DOM by class selector or ID selector.
 * @param {string} selector - The selector to traverse the DOM with.
 * @param {Document|HTMLElement?} context - The context to traverse the DOM
 *   in. If not provided, it defaults to the document.
 * @return {HTMLElement[]} - An array of DOM nodes or an empty array.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((selector, context) => {
  if (typeof selector !== "string") {
    return [];
  }

  if (!context || !isElement(context)) {
    context = window.document; // eslint-disable-line no-param-reassign
  }

  const selection = context.querySelectorAll(selector);
  return Array.prototype.slice.call(selection);
});


/***/ }),

/***/ 9095:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const EXPANDED = 'aria-expanded';
const CONTROLS = 'aria-controls';
const HIDDEN = 'aria-hidden';

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((button, expanded) => {

  if (typeof expanded !== 'boolean') {
    expanded = button.getAttribute(EXPANDED) === 'false';
  }
  button.setAttribute(EXPANDED, expanded);
  const id = button.getAttribute(CONTROLS);
  const controls = document.getElementById(id);
  if (!controls) {
    throw new Error(
      'No toggle target found with id: "' + id + '"'
    );
  }

  controls.setAttribute(HIDDEN, !expanded);
  return expanded;
});


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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Accordion: () => (/* reexport */ accordion),
  Alert: () => (/* reexport */ components_alert),
  BackToTop: () => (/* reexport */ back_to_top),
  CharacterLimit: () => (/* reexport */ character_limit),
  CheckboxToggleContent: () => (/* reexport */ checkbox_toggle_content),
  Dropdown: () => (/* reexport */ dropdown),
  DropdownSort: () => (/* reexport */ dropdown_sort),
  ErrorSummary: () => (/* reexport */ error_summary),
  InputRegexMask: () => (/* reexport */ regex_input_mask),
  Modal: () => (/* reexport */ modal),
  Navigation: () => (/* reexport */ navigation),
  RadioToggleGroup: () => (/* reexport */ radio_toggle_content),
  ResponsiveTable: () => (/* reexport */ table),
  TableSelectableRows: () => (/* reexport */ selectable_table),
  Tabnav: () => (/* reexport */ tabnav),
  Toast: () => (/* reexport */ toast),
  Tooltip: () => (/* reexport */ tooltip),
  datePicker: () => (/* binding */ datePicker),
  init: () => (/* binding */ init)
});

// EXTERNAL MODULE: ./src/js/polyfills/Object/defineProperty.js
var defineProperty = __webpack_require__(1427);
;// CONCATENATED MODULE: ./src/js/polyfills/Function/prototype/bind.js


(function(undefined) {
  // Detection from https://github.com/Financial-Times/polyfill-service/blob/master/packages/polyfill-library/polyfills/Function/prototype/bind/detect.js
  var detect = 'bind' in Function.prototype

  if (detect) return

  // Polyfill from https://cdn.polyfill.io/v2/polyfill.js?features=Function.prototype.bind&flags=always
  Object.defineProperty(Function.prototype, 'bind', {
      value: function bind(that) { // .length is 1
          // add necessary es5-shim utilities
          var $Array = Array;
          var $Object = Object;
          var ObjectPrototype = $Object.prototype;
          var ArrayPrototype = $Array.prototype;
          var Empty = function Empty() {};
          var to_string = ObjectPrototype.toString;
          var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
          var isCallable; /* inlined from https://npmjs.com/is-callable */ var fnToStr = Function.prototype.toString, tryFunctionObject = function tryFunctionObject(value) { try { fnToStr.call(value); return true; } catch (e) { return false; } }, fnClass = '[object Function]', genClass = '[object GeneratorFunction]'; isCallable = function isCallable(value) { if (typeof value !== 'function') { return false; } if (hasToStringTag) { return tryFunctionObject(value); } var strClass = to_string.call(value); return strClass === fnClass || strClass === genClass; };
          var array_slice = ArrayPrototype.slice;
          var array_concat = ArrayPrototype.concat;
          var array_push = ArrayPrototype.push;
          var max = Math.max;
          // /add necessary es5-shim utilities

          // 1. Let Target be the this value.
          var target = this;
          // 2. If IsCallable(Target) is false, throw a TypeError exception.
          if (!isCallable(target)) {
              throw new TypeError('Function.prototype.bind called on incompatible ' + target);
          }
          // 3. Let A be a new (possibly empty) internal list of all of the
          //   argument values provided after thisArg (arg1, arg2 etc), in order.
          // XXX slicedArgs will stand in for "A" if used
          var args = array_slice.call(arguments, 1); // for normal call
          // 4. Let F be a new native ECMAScript object.
          // 11. Set the [[Prototype]] internal property of F to the standard
          //   built-in Function prototype object as specified in 15.3.3.1.
          // 12. Set the [[Call]] internal property of F as described in
          //   15.3.4.5.1.
          // 13. Set the [[Construct]] internal property of F as described in
          //   15.3.4.5.2.
          // 14. Set the [[HasInstance]] internal property of F as described in
          //   15.3.4.5.3.
          var bound;
          var binder = function () {

              if (this instanceof bound) {
                  // 15.3.4.5.2 [[Construct]]
                  // When the [[Construct]] internal method of a function object,
                  // F that was created using the bind function is called with a
                  // list of arguments ExtraArgs, the following steps are taken:
                  // 1. Let target be the value of F's [[TargetFunction]]
                  //   internal property.
                  // 2. If target has no [[Construct]] internal method, a
                  //   TypeError exception is thrown.
                  // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                  //   property.
                  // 4. Let args be a new list containing the same values as the
                  //   list boundArgs in the same order followed by the same
                  //   values as the list ExtraArgs in the same order.
                  // 5. Return the result of calling the [[Construct]] internal
                  //   method of target providing args as the arguments.

                  var result = target.apply(
                      this,
                      array_concat.call(args, array_slice.call(arguments))
                  );
                  if ($Object(result) === result) {
                      return result;
                  }
                  return this;

              } else {
                  // 15.3.4.5.1 [[Call]]
                  // When the [[Call]] internal method of a function object, F,
                  // which was created using the bind function is called with a
                  // this value and a list of arguments ExtraArgs, the following
                  // steps are taken:
                  // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                  //   property.
                  // 2. Let boundThis be the value of F's [[BoundThis]] internal
                  //   property.
                  // 3. Let target be the value of F's [[TargetFunction]] internal
                  //   property.
                  // 4. Let args be a new list containing the same values as the
                  //   list boundArgs in the same order followed by the same
                  //   values as the list ExtraArgs in the same order.
                  // 5. Return the result of calling the [[Call]] internal method
                  //   of target providing boundThis as the this value and
                  //   providing args as the arguments.

                  // equiv: target.call(this, ...boundArgs, ...args)
                  return target.apply(
                      that,
                      array_concat.call(args, array_slice.call(arguments))
                  );

              }

          };

          // 15. If the [[Class]] internal property of Target is "Function", then
          //     a. Let L be the length property of Target minus the length of A.
          //     b. Set the length own property of F to either 0 or L, whichever is
          //       larger.
          // 16. Else set the length own property of F to 0.

          var boundLength = max(0, target.length - args.length);

          // 17. Set the attributes of the length own property of F to the values
          //   specified in 15.3.5.1.
          var boundArgs = [];
          for (var i = 0; i < boundLength; i++) {
              array_push.call(boundArgs, '$' + i);
          }

          // XXX Build a dynamic function with desired amount of arguments is the only
          // way to set the length property of a function.
          // In environments where Content Security Policies enabled (Chrome extensions,
          // for ex.) all use of eval or Function costructor throws an exception.
          // However in all of these environments Function.prototype.bind exists
          // and so this code will never be executed.
          bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

          if (target.prototype) {
              Empty.prototype = target.prototype;
              bound.prototype = new Empty();
              // Clean up dangling references.
              Empty.prototype = null;
          }

          // TODO
          // 18. Set the [[Extensible]] internal property of F to true.

          // TODO
          // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
          // 20. Call the [[DefineOwnProperty]] internal method of F with
          //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
          //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
          //   false.
          // 21. Call the [[DefineOwnProperty]] internal method of F with
          //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
          //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
          //   and false.

          // TODO
          // NOTE Function objects created using Function.prototype.bind do not
          // have a prototype property or the [[Code]], [[FormalParameters]], and
          // [[Scope]] internal properties.
          // XXX can't delete prototype in pure-js.

          // 22. Return F.
          return bound;
      }
  });
})
.call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof __webpack_require__.g && __webpack_require__.g || {});

;// CONCATENATED MODULE: ./src/js/components/accordion.js


const toggle = (__webpack_require__(9095)/* ["default"] */ .Z);
const isElementInViewport = (__webpack_require__(6843)/* ["default"] */ .Z);
const BUTTON = `.accordion-button[aria-controls]`;
const EXPANDED = 'aria-expanded';
const BULK_FUNCTION_ACTION_ATTRIBUTE = "data-accordion-bulk-expand";
const TEXT_ACCORDION = {
    "open_all": "Åbn alle",
    "close_all": "Luk alle"
}

/**
 * Adds click functionality to accordion list
 * @param {HTMLElement} $accordion the accordion ul element
 * @param {JSON} strings Translate labels: {"open_all": "Åbn alle", "close_all": "Luk alle"}
 */
function Accordion($accordion, strings = TEXT_ACCORDION) {
    if (!$accordion) {
        throw new Error(`Missing accordion group element`);
    }
    this.accordion = $accordion;
    this.text = strings;
}

/**
 * Set eventlisteners on click elements in accordion list
 */
Accordion.prototype.init = function () {
    this.buttons = this.accordion.querySelectorAll(BUTTON);
    if (this.buttons.length == 0) {
        throw new Error(`Missing accordion buttons`);
    }

    // loop buttons in list
    for (var i = 0; i < this.buttons.length; i++) {
        let currentButton = this.buttons[i];

        // Verify state on button and state on panel
        let expanded = currentButton.getAttribute(EXPANDED) === 'true';
        this.toggleButton(currentButton, expanded);

        // Set click event on accordion buttons
        currentButton.removeEventListener('click', this.eventOnClick.bind(this, currentButton), false);
        currentButton.addEventListener('click', this.eventOnClick.bind(this, currentButton), false);
    }
    // Set click event on bulk button if present
    let prevSibling = this.accordion.previousElementSibling;
    if (prevSibling !== null && prevSibling.classList.contains('accordion-bulk-button')) {
        this.bulkFunctionButton = prevSibling;
        this.bulkFunctionButton.addEventListener('click', this.bulkEvent.bind(this));
    }
}

/**
 * Bulk event handler: Triggered when clicking on .accordion-bulk-button
 */
Accordion.prototype.bulkEvent = function () {
    var $module = this;
    if (!$module.accordion.classList.contains('accordion')) {
        throw new Error(`Could not find accordion.`);
    }
    if ($module.buttons.length == 0) {
        throw new Error(`Missing accordion buttons`);
    }

    let expand = true;
    if ($module.bulkFunctionButton.getAttribute(BULK_FUNCTION_ACTION_ATTRIBUTE) === "false") {
        expand = false;
    }
    for (var i = 0; i < $module.buttons.length; i++) {
        $module.toggleButton($module.buttons[i], expand, true);
    }

    $module.bulkFunctionButton.setAttribute(BULK_FUNCTION_ACTION_ATTRIBUTE, !expand);
    if (!expand === true) {
        $module.bulkFunctionButton.innerText = this.text.open_all;
    } else {
        $module.bulkFunctionButton.innerText = this.text.close_all;
    }
}

/**
 * Accordion button event handler: Toggles accordion
 * @param {HTMLButtonElement} $button 
 * @param {PointerEvent} e 
 */
Accordion.prototype.eventOnClick = function ($button, e) {
    var $module = this;
    e.stopPropagation();
    e.preventDefault();
    $module.toggleButton($button);
    if ($button.getAttribute(EXPANDED) === 'true') {
        // We were just expanded, but if another accordion was also just
        // collapsed, we may no longer be in the viewport. This ensures
        // that we are still visible, so the user isn't confused.
        if (!isElementInViewport($button)) $button.scrollIntoView();
    }
}

/**
 * Toggle a button's "pressed" state, optionally providing a target
 * state.
 *
 * @param {HTMLButtonElement} button
 * @param {boolean?} expanded If no state is provided, the current
 * state will be toggled (from false to true, and vice-versa).
 * @return {boolean} the resulting state
 */
Accordion.prototype.toggleButton = function (button, expanded, bulk = false) {
    let accordion = null;
    if (button.parentNode.parentNode.classList.contains('accordion')) {
        accordion = button.parentNode.parentNode;
    } else if (button.parentNode.parentNode.parentNode.classList.contains('accordion')) {
        accordion = button.parentNode.parentNode.parentNode;
    }
    expanded = toggle(button, expanded);
    if (expanded) {
        let eventOpen = new Event('fds.accordion.open');
        button.dispatchEvent(eventOpen);
    } else {
        let eventClose = new Event('fds.accordion.close');
        button.dispatchEvent(eventClose);
    }

    if (accordion !== null) {
        let bulkFunction = accordion.previousElementSibling;
        if (bulkFunction !== null && bulkFunction.classList.contains('accordion-bulk-button')) {
            let buttons = accordion.querySelectorAll(BUTTON);
            if (bulk === false) {
                let buttonsOpen = accordion.querySelectorAll(BUTTON + '[aria-expanded="true"]');
                let newStatus = true;

                if (buttons.length === buttonsOpen.length) {
                    newStatus = false;
                }

                bulkFunction.setAttribute(BULK_FUNCTION_ACTION_ATTRIBUTE, newStatus);
                if (newStatus === true) {
                    bulkFunction.innerText = this.text.open_all;
                } else {
                    bulkFunction.innerText = this.text.close_all;
                }
            }
        }
    }
};

/* harmony default export */ const accordion = (Accordion);
;// CONCATENATED MODULE: ./src/js/components/alert.js

function Alert(alert){
    this.alert = alert;
}

Alert.prototype.init = function(){
    let close = this.alert.getElementsByClassName('alert-close');
    if(close.length === 1){
        close[0].addEventListener('click', this.hide.bind(this));
    }
}

Alert.prototype.hide = function(){
    this.alert.classList.add('d-none');
    let eventHide = new Event('fds.alert.hide');
    this.alert.dispatchEvent(eventHide);
};

Alert.prototype.show = function(){
    this.alert.classList.remove('d-none');
    
    let eventShow = new Event('fds.alert.show');
    this.alert.dispatchEvent(eventShow);
};

/* harmony default export */ const components_alert = (Alert);
;// CONCATENATED MODULE: ./src/js/components/back-to-top.js


function BackToTop(backtotop){
    this.backtotop = backtotop;
}

BackToTop.prototype.init = function() {
    let backtotopbutton = this.backtotop;

    updateBackToTopButton(backtotopbutton);

    const observer = new MutationObserver( list => {
        const evt = new CustomEvent('dom-changed', {detail: list});
        document.body.dispatchEvent(evt)
    });

    // Which mutations to observe
    let config = {
        attributes            : true,
        attributeOldValue     : false,
        characterData         : true,
        characterDataOldValue : false,
        childList             : true,
        subtree               : true
    };

    // DOM changes
    observer.observe(document.body, config);
    document.body.addEventListener('dom-changed', function(e) {
        updateBackToTopButton(backtotopbutton);
    });

    // Scroll actions
    window.addEventListener('scroll', function(e) {
        updateBackToTopButton(backtotopbutton);
    });

    // Window resizes
    window.addEventListener('resize', function(e) {
        updateBackToTopButton(backtotopbutton);
    });
}

function updateBackToTopButton(button) {
    let docBody = document.body;
    let docElem = document.documentElement;
    let heightOfViewport = Math.max(docElem.clientHeight || 0, window.innerHeight || 0);
    let heightOfPage = Math.max(docBody.scrollHeight, docBody.offsetHeight, docBody.getBoundingClientRect().height, 
                                  docElem.scrollHeight, docElem.offsetHeight, docElem.getBoundingClientRect().height, docElem.clientHeight);
    
    let limit = heightOfViewport * 2; // The threshold selected to determine whether a back-to-top-button should be displayed
    
    // Never show the button if the page is too short
    if (limit > heightOfPage) {
        if (!button.classList.contains('d-none')) {
            button.classList.add('d-none');
        }
    }
    // If the page is long, calculate when to show the button
    else {
        if (button.classList.contains('d-none')) {
            button.classList.remove('d-none');
        }

        let lastKnownScrollPosition = window.scrollY;
        let footer = document.getElementsByTagName("footer")[0]; // If there are several footers, the code only applies to the first footer

        // Show the button, if the user has scrolled too far down
        if (lastKnownScrollPosition >= limit) {
            if (!isFooterVisible(footer) && button.classList.contains('footer-sticky')) {
                button.classList.remove('footer-sticky');
            }
            else if (isFooterVisible(footer) && !button.classList.contains('footer-sticky')) {
                button.classList.add('footer-sticky');
            }
        }
        // If there's a sidenav, we might want to show the button anyway
        else {
            let sidenav = document.querySelector('.sidenav-list'); // Finds side navigations (left menus) and step guides

            if (sidenav && sidenav.offsetParent !== null) {
                // Only react to sidenavs, which are always visible (i.e. not opened from overflow-menu buttons)
                if (!(sidenav.closest(".overflow-menu-inner")?.previousElementSibling?.getAttribute('aria-expanded') === "true" &&
                sidenav.closest(".overflow-menu-inner")?.previousElementSibling?.offsetParent !== null)) {
                    
                    let rect = sidenav.getBoundingClientRect();
                    if (rect.bottom < 0) {
                        if (!isFooterVisible(footer) && button.classList.contains('footer-sticky')) {
                            button.classList.remove('footer-sticky');
                        }
                        else if (isFooterVisible(footer) && !button.classList.contains('footer-sticky')) {
                            button.classList.add('footer-sticky');
                        }
                    }
                    else {
                        if (!button.classList.contains('footer-sticky')) {
                            button.classList.add('footer-sticky');
                        }
                    }

                }
            }
            // There's no sidenav and we know the user hasn't reached the scroll limit: Ensure the button is hidden
            else {
                if (!button.classList.contains('footer-sticky')) {
                    button.classList.add('footer-sticky');
                }
            }
        }
    }

}

function isFooterVisible(footerElement) {
    if (footerElement?.querySelector('.footer')) {
        let rect = footerElement.querySelector('.footer').getBoundingClientRect();

        // Footer is visible or partly visible
        if ((rect.top < window.innerHeight || rect.top < document.documentElement.clientHeight)) {
            return true;
        }
        // Footer is hidden
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

/* harmony default export */ const back_to_top = (BackToTop);
;// CONCATENATED MODULE: ./src/js/components/character-limit.js


const MAX_LENGTH = 'data-maxlength';
const TEXT_CHARACTERLIMIT = {
    "character_remaining": "Du har {value} tegn tilbage",
    "characters_remaining": "Du har {value} tegn tilbage",
    "character_too_many": "Du har {value} tegn for meget",
    "characters_too_many": "Du har {value} tegn for meget"
};

/**
 * Show number of characters left in a field
 * @param {HTMLElement} containerElement 
 * @param {JSON} strings Translate labels: {"character_remaining": "Du har {value} tegn tilbage", "characters_remaining": "Du har {value} tegn tilbage", "character_too_many": "Du har {value} tegn for meget", "characters_too_many": "Du har {value} tegn for meget"}
 */
 function CharacterLimit(containerElement, strings = TEXT_CHARACTERLIMIT) {
    if (!containerElement) {
        throw new Error(`Missing form-limit element`);
    }
    this.container = containerElement;
    this.input = containerElement.getElementsByClassName('form-input')[0];
    this.maxlength = this.container.getAttribute(MAX_LENGTH);
    this.text = strings;

    let lastKeyUpTimestamp = null;
    let oldValue = this.input.value;
    let intervalID = null;

    let handleKeyUp = () => {
        updateVisibleMessage(this);
        lastKeyUpTimestamp = Date.now();
    }

    let handleFocus = () => {
        /* Reset the screen reader message on focus to force an update of the message.
        This ensures that a screen reader informs the user of how many characters there is left
        on focus and not just what the character limit is. */
        if (this.input.value !== "") {
            let sr_message = this.container.getElementsByClassName('character-limit-sr-only')[0];
            sr_message.innerHTML = '';
        }
    
        intervalID = setInterval(function () {
            /* Don't update the Screen Reader message unless it's been awhile
            since the last key up event. Otherwise, the user will be spammed
            with audio notifications while typing. */
            if (!lastKeyUpTimestamp || (Date.now() - 500) >= lastKeyUpTimestamp) {
                let sr_message = this.container.getElementsByClassName('character-limit-sr-only')[0].innerHTML;
                let visible_message = this.container.getElementsByClassName('character-limit')[0].innerHTML;     
    
                /* Don't update the messages unless the input has changed or if there
                is a mismatch between the visible message and the screen reader message. */
                if (oldValue !== this.input.value || sr_message !== visible_message) {
                    oldValue = this.input.value;
                    this.updateMessages();
                }
            }
        }.bind(this), 1000);
    }
    
    let handleBlur = () => {
        clearInterval(intervalID);
        // Don't update the messages on blur unless the value of the textarea/text input has changed
        if (oldValue !== this.input.value) {
            oldValue = this.input.value;
            this.updateMessages();
        }
    }

    this.init = function() {
        if (!this.maxlength) {
            throw new Error(`Character limit is missing attribute ${MAX_LENGTH}`);
        }

        this.input.addEventListener('keyup', function() {
            handleKeyUp();
        });
        this.input.addEventListener('focus', function() {
            handleFocus();
        });
        this.input.addEventListener('blur', function() {
            handleBlur();
        });

        /* If the browser supports the pageshow event, use it to update the character limit
        message and sr-message once a page has loaded. Second best, use the DOMContentLoaded event. 
        This ensures that if the user navigates to another page in the browser and goes back, the 
        message and sr-message will show/tell the correct amount of characters left. */
        if ('onpageshow' in window) {
            window.addEventListener('pageshow', () => {
                this.updateMessages();
            });
        } 
        else {
            window.addEventListener('DOMContentLoaded', () => {
                this.updateMessages();
            });
        }
    };
}

CharacterLimit.prototype.charactersLeft = function () {
    let current_length = this.input.value.length;
    return this.maxlength - current_length;
}

function characterLimitMessage(formLimit) {
    let count_message = "";
    let characters_left = formLimit.charactersLeft();

    if (characters_left === -1) {
        let exceeded = Math.abs(characters_left);
        count_message = formLimit.text.character_too_many.replace(/{value}/, exceeded);
    }
    else if (characters_left === 1) {
        count_message = formLimit.text.character_remaining.replace(/{value}/, characters_left);
    }
    else if (characters_left >= 0) {
        count_message = formLimit.text.characters_remaining.replace(/{value}/, characters_left);
    }
    else {
        let exceeded = Math.abs(characters_left);
        count_message = formLimit.text.characters_too_many.replace(/{value}/, exceeded);
    }

    return count_message;
}

function updateVisibleMessage(formLimit) {
    let characters_left = formLimit.charactersLeft();
    let count_message = characterLimitMessage(formLimit);
    let character_label = formLimit.container.getElementsByClassName('character-limit')[0];

    if (characters_left < 0) {
        if (!character_label.classList.contains('limit-exceeded')) {
            character_label.classList.add('limit-exceeded');
        }
        if (!formLimit.input.classList.contains('form-limit-error')) {
            formLimit.input.classList.add('form-limit-error');
        }
    }
    else {
        if (character_label.classList.contains('limit-exceeded')) {
            character_label.classList.remove('limit-exceeded');
        }
        if (formLimit.input.classList.contains('form-limit-error')) {
            formLimit.input.classList.remove('form-limit-error');
        }
    }

    character_label.innerHTML = count_message;
}

function updateScreenReaderMessage(formLimit) {
    let count_message = characterLimitMessage(formLimit);
    let character_label = formLimit.container.getElementsByClassName('character-limit-sr-only')[0];
    character_label.innerHTML = count_message;
}

CharacterLimit.prototype.updateMessages = function () {
    updateVisibleMessage(this);
    updateScreenReaderMessage(this);
}

/* harmony default export */ const character_limit = (CharacterLimit);
;// CONCATENATED MODULE: ./src/js/components/checkbox-toggle-content.js



const TOGGLE_TARGET_ATTRIBUTE = 'data-aria-controls';

/**
 * Adds click functionality to checkbox collapse component
 * @param {HTMLInputElement} checkboxElement 
 */
function CheckboxToggleContent(checkboxElement){
    this.checkboxElement = checkboxElement;
    this.targetElement = null;
}

/**
 * Set events on checkbox state change
 */
CheckboxToggleContent.prototype.init = function(){
    this.checkboxElement.addEventListener('change', this.toggle.bind(this));
    this.toggle();
}

/**
 * Toggle checkbox content
 */
CheckboxToggleContent.prototype.toggle = function(){
    var $module = this;
    var targetAttr = this.checkboxElement.getAttribute(TOGGLE_TARGET_ATTRIBUTE)
    var targetEl = document.getElementById(targetAttr);
    if(targetEl === null || targetEl === undefined){
        throw new Error(`Could not find panel element. Verify value of attribute `+ TOGGLE_TARGET_ATTRIBUTE);
    }
    if(this.checkboxElement.checked){
        $module.expand(this.checkboxElement, targetEl);
    }else{
        $module.collapse(this.checkboxElement, targetEl);
    }
}

/**
 * Expand content
 * @param {HTMLInputElement} checkboxElement Checkbox input element 
 * @param {HTMLElement} contentElement Content container element 
 */
CheckboxToggleContent.prototype.expand = function(checkboxElement, contentElement){
    if(checkboxElement !== null && checkboxElement !== undefined && contentElement !== null && contentElement !== undefined){
        checkboxElement.setAttribute('data-aria-expanded', 'true');
        contentElement.classList.remove('collapsed');
        contentElement.setAttribute('aria-hidden', 'false');
        let eventOpen = new Event('fds.collapse.expanded');
        checkboxElement.dispatchEvent(eventOpen);
    }
}

/**
 * Collapse content
 * @param {HTMLInputElement} checkboxElement Checkbox input element 
 * @param {HTMLElement} contentElement Content container element 
 */
CheckboxToggleContent.prototype.collapse = function(triggerEl, targetEl){
    if(triggerEl !== null && triggerEl !== undefined && targetEl !== null && targetEl !== undefined){
        triggerEl.setAttribute('data-aria-expanded', 'false');
        targetEl.classList.add('collapsed');
        targetEl.setAttribute('aria-hidden', 'true');
        
        let eventClose = new Event('fds.collapse.collapsed');
        triggerEl.dispatchEvent(eventClose);
    }
}

/* harmony default export */ const checkbox_toggle_content = (CheckboxToggleContent);

;// CONCATENATED MODULE: ./src/js/components/dropdown.js

const breakpoints = (__webpack_require__(5660)/* ["default"] */ .Z);
const dropdown_BUTTON = '.button-overflow-menu';
const jsDropdownCollapseModifier = 'js-dropdown--responsive-collapse'; //option: make dropdown behave as the collapse component when on small screens (used by submenus in the header and step-dropdown).
const TARGET = 'data-js-target';

/**
 * Add functionality to overflow menu component
 * @param {HTMLButtonElement} buttonElement Overflow menu button
 */
function Dropdown (buttonElement) {
  this.buttonElement = buttonElement;
  this.targetEl = null;
  this.responsiveListCollapseEnabled = false;

  if(this.buttonElement === null ||this.buttonElement === undefined){
    throw new Error(`Could not find button for overflow menu component.`);
  }
  let targetAttr = this.buttonElement.getAttribute(TARGET);
  if(targetAttr === null || targetAttr === undefined){
    throw new Error('Attribute could not be found on overflow menu component: '+TARGET);
  }
  let targetEl = document.getElementById(targetAttr.replace('#', ''));
  if(targetEl === null || targetEl === undefined){
    throw new Error('Panel for overflow menu component could not be found.');
  }
  this.targetEl = targetEl;
}

/**
 * Set click events
 */
Dropdown.prototype.init = function (){
  if(this.buttonElement !== null && this.buttonElement !== undefined && this.targetEl !== null && this.targetEl !== undefined){

    if(this.buttonElement.parentNode.classList.contains('overflow-menu--md-no-responsive') || this.buttonElement.parentNode.classList.contains('overflow-menu--lg-no-responsive')){
      this.responsiveListCollapseEnabled = true;
    }

    //Clicked outside dropdown -> close it
    document.getElementsByTagName('body')[ 0 ].removeEventListener('click', outsideClose);
    document.getElementsByTagName('body')[ 0 ].addEventListener('click', outsideClose);
    //Clicked on dropdown open button --> toggle it
    this.buttonElement.removeEventListener('click', toggleDropdown);
    this.buttonElement.addEventListener('click', toggleDropdown);
    let $module = this;
    // set aria-hidden correctly for screenreaders (Tringuide responsive)
    if(this.responsiveListCollapseEnabled) {
      let element = this.buttonElement;
      if (window.IntersectionObserver) {
        // trigger event when button changes visibility
        let observer = new IntersectionObserver(function (entries) {
          // button is visible
          if (entries[ 0 ].intersectionRatio) {
            if (element.getAttribute('aria-expanded') === 'false') {
              $module.targetEl.setAttribute('aria-hidden', 'true');
            }
          } else {
            // button is not visible
            if ($module.targetEl.getAttribute('aria-hidden') === 'true') {
              $module.targetEl.setAttribute('aria-hidden', 'false');
            }
          }
        }, {
          root: document.body
        });
        observer.observe(element);
      } else {
        // IE: IntersectionObserver is not supported, so we listen for window resize and grid breakpoint instead
        if (doResponsiveCollapse($module.triggerEl)) {
          // small screen
          if (element.getAttribute('aria-expanded') === 'false') {
            $module.targetEl.setAttribute('aria-hidden', 'true');
          } else{
            $module.targetEl.setAttribute('aria-hidden', 'false');
          }
        } else {
          // Large screen
          $module.targetEl.setAttribute('aria-hidden', 'false');
        }
        window.addEventListener('resize', function () {
          if (doResponsiveCollapse($module.triggerEl)) {
            if (element.getAttribute('aria-expanded') === 'false') {
              $module.targetEl.setAttribute('aria-hidden', 'true');
            } else{
              $module.targetEl.setAttribute('aria-hidden', 'false');
            }
          } else {
            $module.targetEl.setAttribute('aria-hidden', 'false');
          }
        });
      }
    }

    
    document.removeEventListener('keyup', closeOnEscape);
    document.addEventListener('keyup', closeOnEscape);
  }
}

/**
 * Hide overflow menu
 */
Dropdown.prototype.hide = function(){
  dropdown_toggle(this.buttonElement);
}

/**
 * Show overflow menu
 */
Dropdown.prototype.show = function(){
  dropdown_toggle(this.buttonElement);
}

let closeOnEscape = function(event){
  var key = event.which || event.keyCode;
  if (key === 27) {
    closeAll(event);
  }
};

/**
 * Get an Array of button elements belonging directly to the given
 * accordion element.
 * @param parent accordion element
 * @returns {NodeListOf<SVGElementTagNameMap[[string]]> | NodeListOf<HTMLElementTagNameMap[[string]]> | NodeListOf<Element>}
 */
let getButtons = function (parent) {
  return parent.querySelectorAll(dropdown_BUTTON);
};

/**
 * Close all overflow menus
 * @param {event} event default is null
 */
let closeAll = function (event = null){
  let changed = false;
  const body = document.querySelector('body');

  let overflowMenuEl = document.getElementsByClassName('overflow-menu');
  for (let oi = 0; oi < overflowMenuEl.length; oi++) {
    let currentOverflowMenuEL = overflowMenuEl[ oi ];
    let triggerEl = currentOverflowMenuEL.querySelector(dropdown_BUTTON+'[aria-expanded="true"]');
    if(triggerEl !== null){
      changed = true;
      let targetEl = currentOverflowMenuEL.querySelector('#'+triggerEl.getAttribute(TARGET).replace('#', ''));

        if (targetEl !== null && triggerEl !== null) {
          if(doResponsiveCollapse(triggerEl)){
            if(triggerEl.getAttribute('aria-expanded') === true){
              let eventClose = new Event('fds.dropdown.close');
              triggerEl.dispatchEvent(eventClose);
            }
            triggerEl.setAttribute('aria-expanded', 'false');
            targetEl.classList.add('collapsed');
            targetEl.setAttribute('aria-hidden', 'true');
          }
        }
    }
  }

  if(changed && event !== null){
    event.stopImmediatePropagation();
  }
};
let offset = function (el) {
  let rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

let toggleDropdown = function (event, forceClose = false) {
  event.stopPropagation();
  event.preventDefault();

  dropdown_toggle(this, forceClose);

};

let dropdown_toggle = function(button, forceClose = false){
  let triggerEl = button;
  let targetEl = null;
  if(triggerEl !== null && triggerEl !== undefined){
    let targetAttr = triggerEl.getAttribute(TARGET);
    if(targetAttr !== null && targetAttr !== undefined){
      targetEl = document.getElementById(targetAttr.replace('#', ''));
    }
  }
  if(triggerEl !== null && triggerEl !== undefined && targetEl !== null && targetEl !== undefined){
    //change state

    targetEl.style.left = null;
    targetEl.style.right = null;

    if(triggerEl.getAttribute('aria-expanded') === 'true' || forceClose){
      //close
      triggerEl.setAttribute('aria-expanded', 'false');
      targetEl.classList.add('collapsed');
      targetEl.setAttribute('aria-hidden', 'true');      
      let eventClose = new Event('fds.dropdown.close');
      triggerEl.dispatchEvent(eventClose);
    }else{
      
      if(!document.getElementsByTagName('body')[0].classList.contains('mobile_nav-active')){
        closeAll();
      }
      //open
      triggerEl.setAttribute('aria-expanded', 'true');
      targetEl.classList.remove('collapsed');
      targetEl.setAttribute('aria-hidden', 'false');
      let eventOpen = new Event('fds.dropdown.open');
      triggerEl.dispatchEvent(eventOpen);
      let targetOffset = offset(targetEl);

      if(targetOffset.left < 0){
        targetEl.style.left = '0px';
        targetEl.style.right = 'auto';
      }
      let right = targetOffset.left + targetEl.offsetWidth;
      if(right > window.innerWidth){
        targetEl.style.left = 'auto';
        targetEl.style.right = '0px';
      }

      let offsetAgain = offset(targetEl);

      if(offsetAgain.left < 0){

        targetEl.style.left = '0px';
        targetEl.style.right = 'auto';
      }
      right = offsetAgain.left + targetEl.offsetWidth;
      if(right > window.innerWidth){

        targetEl.style.left = 'auto';
        targetEl.style.right = '0px';
      }
    }

  }
}

let hasParent = function (child, parentTagName){
  if(child.parentNode.tagName === parentTagName){
    return true;
  } else if(parentTagName !== 'BODY' && child.parentNode.tagName !== 'BODY'){
    return hasParent(child.parentNode, parentTagName);
  }else{
    return false;
  }
};

let outsideClose = function (evt){
  if(!document.getElementsByTagName('body')[0].classList.contains('mobile_nav-active')){
    if(document.querySelector('body.mobile_nav-active') === null && !evt.target.classList.contains('button-menu-close')) {
      let openDropdowns = document.querySelectorAll(dropdown_BUTTON+'[aria-expanded=true]');
      for (let i = 0; i < openDropdowns.length; i++) {
        let triggerEl = openDropdowns[i];
        let targetEl = null;
        let targetAttr = triggerEl.getAttribute(TARGET);
        if (targetAttr !== null && targetAttr !== undefined) {
          if(targetAttr.indexOf('#') !== -1){
            targetAttr = targetAttr.replace('#', '');
          }
          targetEl = document.getElementById(targetAttr);
        }
        if (doResponsiveCollapse(triggerEl) || (hasParent(triggerEl, 'HEADER') && !evt.target.classList.contains('overlay'))) {
          //closes dropdown when clicked outside
          if (evt.target !== triggerEl) {
            //clicked outside trigger, force close
            triggerEl.setAttribute('aria-expanded', 'false');
            targetEl.classList.add('collapsed');
            targetEl.setAttribute('aria-hidden', 'true');          
            let eventClose = new Event('fds.dropdown.close');
            triggerEl.dispatchEvent(eventClose);
          }
        }
      }
    }
  }
};

let doResponsiveCollapse = function (triggerEl){
  if(!triggerEl.classList.contains(jsDropdownCollapseModifier)){
    // not nav overflow menu
    if(triggerEl.parentNode.classList.contains('overflow-menu--md-no-responsive') || triggerEl.parentNode.classList.contains('overflow-menu--lg-no-responsive')) {
      // trinindikator overflow menu
      if (window.innerWidth <= getTringuideBreakpoint(triggerEl)) {
        // overflow menu på responsiv tringuide aktiveret
        return true;
      }
    } else{
      // normal overflow menu
      return true;
    }
  }

  return false;
};

let getTringuideBreakpoint = function (button){
  if(button.parentNode.classList.contains('overflow-menu--md-no-responsive')){
    return breakpoints.md;
  }
  if(button.parentNode.classList.contains('overflow-menu--lg-no-responsive')){
    return breakpoints.lg;
  }
};

/* harmony default export */ const dropdown = (Dropdown);
;// CONCATENATED MODULE: ./src/js/components/dropdown-sort.js




/**
 * Add functionality to sorting variant of Overflow menu component
 * @param {HTMLElement} container .overflow-menu element
 */
function DropdownSort (container){
    this.container = container;
    this.button = container.getElementsByClassName('button-overflow-menu')[0];

    // if no value is selected, choose first option
    if(!this.container.querySelector('.overflow-list li button[aria-current="true"]')){
        this.container.querySelectorAll('.overflow-list li button')[0].setAttribute('aria-current', "true");
    }

    this.updateSelectedValue();
}

/**
 * Add click events on overflow menu and options in menu
 */
DropdownSort.prototype.init = function(){
    this.overflowMenu = new dropdown(this.button).init();

    let sortingOptions = this.container.querySelectorAll('.overflow-list li button');
    for(let s = 0; s < sortingOptions.length; s++){
        let option = sortingOptions[s];
        option.addEventListener('click', this.onOptionClick.bind(this));
    }
}

/**
 * Update button text to selected value
 */
DropdownSort.prototype.updateSelectedValue = function(){
    let selectedItem = this.container.querySelector('.overflow-list li button[aria-current="true"]');
    this.container.getElementsByClassName('button-overflow-menu')[0].getElementsByClassName('selected-value')[0].innerText = selectedItem.innerText;
}

/**
 * Triggers when choosing option in menu
 * @param {PointerEvent} e
 */
DropdownSort.prototype.onOptionClick = function(e){
    let li = e.target.parentNode;
    li.parentNode.querySelector('li button[aria-current="true"]').removeAttribute('aria-current');
    li.querySelectorAll('.overflow-list li button')[0].setAttribute('aria-current', 'true');

    let button = li.parentNode.parentNode.parentNode.getElementsByClassName('button-overflow-menu')[0];
    let eventSelected = new Event('fds.dropdown.selected');
    eventSelected.detail = this.target;
    button.dispatchEvent(eventSelected);
    this.updateSelectedValue();

    // hide menu
    let overflowMenu = new dropdown(button);
    overflowMenu.hide();
}

/* harmony default export */ const dropdown_sort = (DropdownSort);

;// CONCATENATED MODULE: ./src/js/components/error-summary.js

/**
 * Handle focus on input elements upon clicking link in error message
 * @param {HTMLElement} element Error summary element
 */
function ErrorSummary (element) {
  this.element = element;
}

/**
 * Set events on links in error summary
 */
ErrorSummary.prototype.init = function () {
  if (!this.element) {
    return
  }
  this.element.focus()

  this.element.addEventListener('click', this.handleClick.bind(this))
}

/**
* Click event handler
*
* @param {MouseEvent} event - Click event
*/
ErrorSummary.prototype.handleClick = function (event) {
  var target = event.target
  if (this.focusTarget(target)) {
    event.preventDefault()
  }
}

/**
 * Focus the target element
 *
 * By default, the browser will scroll the target into view. Because our labels
 * or legends appear above the input, this means the user will be presented with
 * an input without any context, as the label or legend will be off the top of
 * the screen.
 *
 * Manually handling the click event, scrolling the question into view and then
 * focussing the element solves this.
 *
 * This also results in the label and/or legend being announced correctly in
 * NVDA (as tested in 2018.3.2) - without this only the field type is announced
 * (e.g. "Edit, has autocomplete").
 *
 * @param {HTMLElement} $target - Event target
 * @returns {boolean} True if the target was able to be focussed
 */
ErrorSummary.prototype.focusTarget = function ($target) {
  // If the element that was clicked was not a link, return early
  if ($target.tagName !== 'A' || $target.href === false) {
    return false
  }

  var inputId = this.getFragmentFromUrl($target.href)
  var $input = document.getElementById(inputId)
  if (!$input) {
    return false
  }

  var $legendOrLabel = this.getAssociatedLegendOrLabel($input)
  if (!$legendOrLabel) {
    return false
  }

  // Scroll the legend or label into view *before* calling focus on the input to
  // avoid extra scrolling in browsers that don't support `preventScroll` (which
  // at time of writing is most of them...)
  $legendOrLabel.scrollIntoView()
  $input.focus({ preventScroll: true })

  return true
}

/**
 * Get fragment from URL
 *
 * Extract the fragment (everything after the hash) from a URL, but not including
 * the hash.
 *
 * @param {string} url - URL
 * @returns {string} Fragment from URL, without the hash
 */
ErrorSummary.prototype.getFragmentFromUrl = function (url) {
  if (url.indexOf('#') === -1) {
    return false
  }

  return url.split('#').pop()
}

/**
 * Get associated legend or label
 *
 * Returns the first element that exists from this list:
 *
 * - The `<legend>` associated with the closest `<fieldset>` ancestor, as long
 *   as the top of it is no more than half a viewport height away from the
 *   bottom of the input
 * - The first `<label>` that is associated with the input using for="inputId"
 * - The closest parent `<label>`
 *
 * @param {HTMLElement} $input - The input
 * @returns {HTMLElement} Associated legend or label, or null if no associated
 *                        legend or label can be found
 */
ErrorSummary.prototype.getAssociatedLegendOrLabel = function ($input) {
  var $fieldset = $input.closest('fieldset')

  if ($fieldset) {
    var legends = $fieldset.getElementsByTagName('legend')

    if (legends.length) {
      var $candidateLegend = legends[0]

      // If the input type is radio or checkbox, always use the legend if there
      // is one.
      if ($input.type === 'checkbox' || $input.type === 'radio') {
        return $candidateLegend
      }

      // For other input types, only scroll to the fieldset’s legend (instead of
      // the label associated with the input) if the input would end up in the
      // top half of the screen.
      //
      // This should avoid situations where the input either ends up off the
      // screen, or obscured by a software keyboard.
      var legendTop = $candidateLegend.getBoundingClientRect().top
      var inputRect = $input.getBoundingClientRect()

      // If the browser doesn't support Element.getBoundingClientRect().height
      // or window.innerHeight (like IE8), bail and just link to the label.
      if (inputRect.height && window.innerHeight) {
        var inputBottom = inputRect.top + inputRect.height

        if (inputBottom - legendTop < window.innerHeight / 2) {
          return $candidateLegend
        }
      }
    }
  }

  return document.querySelector("label[for='" + $input.getAttribute('id') + "']") ||
    $input.closest('label')
}

/* harmony default export */ const error_summary = (ErrorSummary);
;// CONCATENATED MODULE: ./src/js/components/regex-input-mask.js

const modifierState = {
  shift: false,
  alt: false,
  ctrl: false,
  command: false
};
/*
* Prevents the user from inputting based on a regex.
* Does not work the same way af <input pattern="">, this pattern is only used for validation, not to prevent input.
* Usecase: number input for date-component.
* Example - number only: <input type="text" data-input-regex="^\d*$">
*/
class InputRegexMask {
  constructor (element){
    element.addEventListener('paste', regexMask);
    element.addEventListener('keydown', regexMask);
  }
}
var regexMask = function (event) {
  if(modifierState.ctrl || modifierState.command) {
    return;
  }
  var newChar = null;
  if(typeof event.key !== 'undefined'){
    if(event.key.length === 1){
      newChar = event.key;
    }
  } else {
    if(!event.charCode){
      newChar = String.fromCharCode(event.keyCode);
    } else {
      newChar = String.fromCharCode(event.charCode);
    }
  }

  var regexStr = this.getAttribute('data-input-regex');

  if(event.type !== undefined && event.type === 'paste'){
    //console.log('paste');
  } else{
    var element = null;
    if(event.target !== undefined){
      element = event.target;
    }
    if(newChar !== null && element !== null) {
      if(newChar.length > 0){
        let newValue = this.value;
        if(element.type === 'number'){
          newValue = this.value;//Note input[type=number] does not have .selectionStart/End (Chrome).
        }else{
          newValue = this.value.slice(0, element.selectionStart) + this.value.slice(element.selectionEnd) + newChar; //removes the numbers selected by the user, then adds new char.
        }

        var r = new RegExp(regexStr);
        if(r.exec(newValue) === null){
          if (event.preventDefault) {
            event.preventDefault();
          } else {
            event.returnValue = false;
          }
        }
      }
    }
  }
};

/* harmony default export */ const regex_input_mask = (InputRegexMask);
;// CONCATENATED MODULE: ./src/js/components/modal.js

/**
 * Adds click functionality to modal
 * @param {HTMLElement} $modal Modal element
 */
function Modal ($modal) {
    this.$modal = $modal;
    let id = this.$modal.getAttribute('id');
    this.triggers = document.querySelectorAll('[data-module="modal"][data-target="'+id+'"]');
}

/**
 * Set events
 */
Modal.prototype.init = function () {
  let triggers = this.triggers;
  for (let i = 0; i < triggers.length; i++){
    let trigger = triggers[ i ];
    trigger.addEventListener('click', this.show.bind(this));
  }
  let closers = this.$modal.querySelectorAll('[data-modal-close]');
  for (let c = 0; c < closers.length; c++){
    let closer = closers[ c ];
    closer.addEventListener('click', this.hide.bind(this));
  }
};

/**
 * Hide modal
 */
Modal.prototype.hide = function (){
  let modalElement = this.$modal;
  if(modalElement !== null){
    modalElement.setAttribute('aria-hidden', 'true');

    let eventClose = document.createEvent('Event');
    eventClose.initEvent('fds.modal.hidden', true, true);
    modalElement.dispatchEvent(eventClose);

    let $backdrop = document.querySelector('#modal-backdrop');
    $backdrop?.parentNode.removeChild($backdrop);

    document.getElementsByTagName('body')[0].classList.remove('modal-open');
    document.removeEventListener('keydown', trapFocus, true);

    if(!hasForcedAction(modalElement)){
      document.removeEventListener('keyup', handleEscape);
    }
    let dataModalOpener = modalElement.getAttribute('data-modal-opener');
    if(dataModalOpener !== null){
      let opener = document.getElementById(dataModalOpener)
      if(opener !== null){
        opener.focus();
      }
      modalElement.removeAttribute('data-modal-opener');
    }
  }
};

/**
 * Show modal
 */
Modal.prototype.show = function (e = null){
  let modalElement = this.$modal;
  if(modalElement !== null){
    if(e !== null){
      let openerId = e.target.getAttribute('id');
      if(openerId === null){
        openerId = 'modal-opener-'+Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
        e.target.setAttribute('id', openerId)
      }
      modalElement.setAttribute('data-modal-opener', openerId);
    }

    // Hide open modals - FDS do not recommend more than one open modal at a time
    let activeModals = document.querySelectorAll('.fds-modal[aria-hidden=false]');
    for(let i = 0; i < activeModals.length; i++){
      new Modal(activeModals[i]).hide();
    }

    modalElement.setAttribute('aria-hidden', 'false');
    modalElement.setAttribute('tabindex', '-1');

    let eventOpen = document.createEvent('Event');
    eventOpen.initEvent('fds.modal.shown', true, true);
    modalElement.dispatchEvent(eventOpen);

    let $backdrop = document.createElement('div');
    $backdrop.classList.add('modal-backdrop');
    $backdrop.setAttribute('id', "modal-backdrop");
    document.getElementsByTagName('body')[0].appendChild($backdrop);

    document.getElementsByTagName('body')[0].classList.add('modal-open');

    modalElement.focus();

    document.addEventListener('keydown', trapFocus, true);
    if(!hasForcedAction(modalElement)){
      document.addEventListener('keyup', handleEscape);
    }

  }
};

/**
 * Close modal when hitting ESC
 * @param {KeyboardEvent} event 
 */
let handleEscape = function (event) {
  var key = event.which || event.keyCode;
  let modalElement = document.querySelector('.fds-modal[aria-hidden=false]');
  let currentModal = new Modal(document.querySelector('.fds-modal[aria-hidden=false]'));
  if (key === 27){
    let possibleOverflowMenus = modalElement.querySelectorAll('.button-overflow-menu[aria-expanded="true"]');
    if(possibleOverflowMenus.length === 0){
      currentModal.hide();
    }
  }
};

/**
 * Trap focus in modal when open
 * @param {PointerEvent} e
 */
 function trapFocus(e){
  var currentDialog = document.querySelector('.fds-modal[aria-hidden=false]');
  if(currentDialog !== null){
    var focusableElements = currentDialog.querySelectorAll('a[href]:not([disabled]):not([aria-hidden=true]), button:not([disabled]):not([aria-hidden=true]), textarea:not([disabled]):not([aria-hidden=true]), input:not([type=hidden]):not([disabled]):not([aria-hidden=true]), select:not([disabled]):not([aria-hidden=true]), details:not([disabled]):not([aria-hidden=true]), [tabindex]:not([tabindex="-1"]):not([disabled]):not([aria-hidden=true])');
    
    var firstFocusableElement = focusableElements[0];
    var lastFocusableElement = focusableElements[focusableElements.length - 1];

    var isTabPressed = (e.key === 'Tab' || e.keyCode === 9);

    if (!isTabPressed) { 
      return; 
    }

    if ( e.shiftKey ) /* shift + tab */ {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
          e.preventDefault();
      }
    } else /* tab */ {
      if (document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus();
          e.preventDefault();
      }
    }
  }
};

function hasForcedAction (modal){
  if(modal.getAttribute('data-modal-forced-action') === null){
    return false;
  }
  return true;
}

/* harmony default export */ const modal = (Modal);

;// CONCATENATED MODULE: ./src/js/components/navigation.js

const forEach = __webpack_require__(9084);
const navigation_select = (__webpack_require__(4231)/* ["default"] */ .Z);

const NAV = `.nav`;
const NAV_LINKS = `${NAV} a`;
const OPENERS = `.js-menu-open`;
const CLOSE_BUTTON = `.js-menu-close`;
const OVERLAY = `.overlay`;
const CLOSERS = `${CLOSE_BUTTON}, .overlay`;
const TOGGLES = [ NAV, OVERLAY ].join(', ');

const ACTIVE_CLASS = 'mobile_nav-active';
const VISIBLE_CLASS = 'is-visible';

/**
 * Add mobile menu functionality
 */
class Navigation {
  /**
   * Set events
   */
  init () {
    window.addEventListener('resize', mobileMenu, false);
    mobileMenu();
  }

  /**
   * Remove events
   */
  teardown () {
    window.removeEventListener('resize', mobileMenu, false);
  }
}

/**
 * Add functionality to mobile menu
 */
const mobileMenu = function() {
  let mobile = false;
  let openers = document.querySelectorAll(OPENERS);
  for(let o = 0; o < openers.length; o++) {
    if(window.getComputedStyle(openers[o], null).display !== 'none') {
      openers[o].addEventListener('click', toggleNav);
      mobile = true;
    }
  }

  // if mobile
  if(mobile){
    let closers = document.querySelectorAll(CLOSERS);
    for(let c = 0; c < closers.length; c++) {
      closers[ c ].addEventListener('click', toggleNav);
    }

    let navLinks = document.querySelectorAll(NAV_LINKS);
    for(let n = 0; n < navLinks.length; n++) {
      navLinks[ n ].addEventListener('click', function(){
        // A navigation link has been clicked! We want to collapse any
        // hierarchical navigation UI it's a part of, so that the user
        // can focus on whatever they've just selected.

        // Some navigation links are inside dropdowns; when they're
        // clicked, we want to collapse those dropdowns.


        // If the mobile navigation menu is active, we want to hide it.
        if (isActive()) {
          toggleNav.call(this, false);
        }
      });
    }

    const trapContainers = document.querySelectorAll(NAV);
    for(let i = 0; i < trapContainers.length; i++){
      focusTrap = _focusTrap(trapContainers[i]);
    }

  }

  const closer = document.body.querySelector(CLOSE_BUTTON);

  if (isActive() && closer && closer.getBoundingClientRect().width === 0) {
    // The mobile nav is active, but the close box isn't visible, which
    // means the user's viewport has been resized so that it is no longer
    // in mobile mode. Let's make the page state consistent by
    // deactivating the mobile nav.
    toggleNav.call(closer, false);
  }
};

/**
 * Check if mobile menu is active
 * @returns true if mobile menu is active and false if not active
 */
const isActive = () => document.body.classList.contains(ACTIVE_CLASS);

/**
 * Trap focus in mobile menu if active
 * @param {HTMLElement} trapContainer 
 */
const _focusTrap = (trapContainer) => {

  // Find all focusable children
  const focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  let focusableElements = trapContainer.querySelectorAll(focusableElementsString);
  let firstTabStop = focusableElements[ 0 ];

  function trapTabKey (e) {
    var key = event.which || event.keyCode;
    // Check for TAB key press
    if (key === 9) {

      let lastTabStop = null;
      for(let i = 0; i < focusableElements.length; i++){
        let number = focusableElements.length - 1;
        let element = focusableElements[ number - i ];
        if (element.offsetWidth > 0 && element.offsetHeight > 0) {
          lastTabStop = element;
          break;
        }
      }

      // SHIFT + TAB
      if (e.shiftKey) {
        if (document.activeElement === firstTabStop) {
          e.preventDefault();
          lastTabStop.focus();
        }

      // TAB
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    // ESCAPE
    if (e.key === 'Escape') {
      toggleNav.call(this, false);
    }
  }

  return {
    enable () {
        // Focus first child
        firstTabStop.focus();
      // Listen for and trap the keyboard
      document.addEventListener('keydown', trapTabKey);
    },

    release () {
      document.removeEventListener('keydown', trapTabKey);
    },
  };
};

let focusTrap;

const toggleNav = function (active) {
  const body = document.body;
  if (typeof active !== 'boolean') {
    active = !isActive();
  }
  body.classList.toggle(ACTIVE_CLASS, active);

  forEach(navigation_select(TOGGLES), el => {
    el.classList.toggle(VISIBLE_CLASS, active);
  });
  if (active) {
    focusTrap.enable();
  } else {
    focusTrap.release();
  }

  const closeButton = body.querySelector(CLOSE_BUTTON);
  const menuButton = body.querySelector(OPENERS);

  if (active && closeButton) {
    // The mobile nav was just activated, so focus on the close button,
    // which is just before all the nav elements in the tab order.
    closeButton.focus();
  } else if (!active && document.activeElement === closeButton &&
             menuButton) {
    // The mobile nav was just deactivated, and focus was on the close
    // button, which is no longer visible. We don't want the focus to
    // disappear into the void, so focus on the menu button if it's
    // visible (this may have been what the user was just focused on,
    // if they triggered the mobile nav by mistake).
    menuButton.focus();
  }

  return active;
};

/* harmony default export */ const navigation = (Navigation);
;// CONCATENATED MODULE: ./src/js/components/radio-toggle-content.js

const TOGGLE_ATTRIBUTE = 'data-controls';

/**
 * Adds click functionality to radiobutton collapse list
 * @param {HTMLElement} containerElement 
 */
function RadioToggleGroup(containerElement){
    this.radioGroup = containerElement;
    this.radioEls = null;
    this.targetEl = null;
}

/**
 * Set events
 */
RadioToggleGroup.prototype.init = function (){
    this.radioEls = this.radioGroup.querySelectorAll('input[type="radio"]');
    if(this.radioEls.length === 0){
        throw new Error('No radiobuttons found in radiobutton group.');
    }
    var that = this;

    for(let i = 0; i < this.radioEls.length; i++){
        var radio = this.radioEls[ i ];
        
        radio.addEventListener('change', function (){
            for(let a = 0; a < that.radioEls.length; a++ ){
                that.toggle(that.radioEls[ a ]);
            }
        });
        this.toggle(radio);
    }
}

/**
 * Toggle radiobutton content
 * @param {HTMLInputElement} radioInputElement 
 */
RadioToggleGroup.prototype.toggle = function (radioInputElement){
    var contentId = radioInputElement.getAttribute(TOGGLE_ATTRIBUTE);
    if(contentId !== null && contentId !== undefined && contentId !== ""){
        var contentElement = document.querySelector(contentId);
        if(contentElement === null || contentElement === undefined){
            throw new Error(`Could not find panel element. Verify value of attribute `+ TOGGLE_ATTRIBUTE);
        }
        if(radioInputElement.checked){
            this.expand(radioInputElement, contentElement);
        }else{
            this.collapse(radioInputElement, contentElement);
        }
    }
}

/**
 * Expand radio button content
 * @param {} radioInputElement Radio Input element
 * @param {*} contentElement Content element
 */
RadioToggleGroup.prototype.expand = function (radioInputElement, contentElement){
    if(radioInputElement !== null && radioInputElement !== undefined && contentElement !== null && contentElement !== undefined){
        radioInputElement.setAttribute('data-expanded', 'true');
        contentElement.setAttribute('aria-hidden', 'false');
        let eventOpen = new Event('fds.radio.expanded');
        radioInputElement.dispatchEvent(eventOpen);
    }
}
/**
 * Collapse radio button content
 * @param {} radioInputElement Radio Input element
 * @param {*} contentElement Content element
 */
RadioToggleGroup.prototype.collapse = function(radioInputElement, contentElement){
    if(radioInputElement !== null && radioInputElement !== undefined && contentElement !== null && contentElement !== undefined){
        radioInputElement.setAttribute('data-expanded', 'false');
        contentElement.setAttribute('aria-hidden', 'true');
        let eventClose = new Event('fds.radio.collapsed');
        radioInputElement.dispatchEvent(eventClose);
    }
}

/* harmony default export */ const radio_toggle_content = (RadioToggleGroup);
;// CONCATENATED MODULE: ./src/js/components/table.js
const table_select = (__webpack_require__(4231)/* ["default"] */ .Z);

/**
 * Set data-title on cells, where the attribute is missing
 */
class ResponsiveTable {
    constructor(table) {
        insertHeaderAsAttributes(table);
    }
}

/**
 * Add data attributes needed for responsive mode.
 * @param {HTMLTableElement} tableEl Table element
 */
function insertHeaderAsAttributes(tableEl) {
    if (!tableEl) return;

    let header = tableEl.getElementsByTagName('thead');
    if (header.length !== 0) {
        let headerCellEls = header[0].getElementsByTagName('th');
        if (headerCellEls.length == 0) {
            headerCellEls = header[0].getElementsByTagName('td');
        }

        if (headerCellEls.length > 0) {
            const bodyRowEls = table_select('tbody tr', tableEl);
            Array.from(bodyRowEls).forEach(rowEl => {
                let cellEls = rowEl.children;
                if (cellEls.length === headerCellEls.length) {
                    Array.from(headerCellEls).forEach((headerCellEl, i) => {
                        // Grab header cell text and use it body cell data title.
                        if (!cellEls[i].hasAttribute('data-title') && headerCellEl.tagName === "TH" && !headerCellEl.classList.contains("sr-header")) {
                            cellEls[i].setAttribute('data-title', headerCellEl.textContent);
                        }
                    });
                }
            });
        }
    }
}

/* harmony default export */ const table = (ResponsiveTable);

;// CONCATENATED MODULE: ./src/js/components/tabnav.js

let tabnav_breakpoints = {
  'xs': 0,
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200
};

// For easy reference
var keys = {
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  delete: 46
};

// Add or substract depending on key pressed
var direction = {
  37: -1,
  38: -1,
  39: 1,
  40: 1
};

/**
 * Add functionality to tabnav component
 * @param {HTMLElement} tabnav Tabnav container
 */
function Tabnav (tabnav) {
  this.tabnav = tabnav;
  this.tabs = this.tabnav.querySelectorAll('button.tabnav-item');
}

/**
 * Set event on component
 */
Tabnav.prototype.init = function(){
  if(this.tabs.length === 0){
    throw new Error(`Tabnav HTML seems to be missing tabnav-item. Add tabnav items to ensure each panel has a button in the tabnavs navigation.`);
  }

  // if no hash is set on load, set active tab
  if (!setActiveHashTab()) {
    // set first tab as active
    let tab = this.tabs[ 0 ];

    // check no other tabs as been set at default
    let alreadyActive = getActiveTabs(this.tabnav);
    if (alreadyActive.length === 0) {
      tab = alreadyActive[ 0 ];
    }

    // activate and deactivate tabs
    this.activateTab(tab, false);
  }
  let $module = this;
  // add eventlisteners on buttons
  for(let t = 0; t < this.tabs.length; t ++){
    this.tabs[ t ].addEventListener('click', function(){$module.activateTab(this, false)});
    this.tabs[ t ].addEventListener('keydown', keydownEventListener);
    this.tabs[ t ].addEventListener('keyup', keyupEventListener);
  }
}

/***
 * Show tab and hide others
 * @param {HTMLButtonElement} tab button element
 * @param {boolean} setFocus True if tab button should be focused
 */
 Tabnav.prototype.activateTab = function(tab, setFocus) {
  let tabs = getAllTabsInList(tab);

  // close all tabs except selected
  for (let i = 0; i < this.tabs.length; i++) {
    if (tabs[ i ] === tab) {
      continue;
    }

    if (tabs[ i ].getAttribute('aria-selected') === 'true') {
      let eventClose = new Event('fds.tabnav.close');
      tabs[ i ].dispatchEvent(eventClose);
    }

    tabs[ i ].setAttribute('tabindex', '-1');
    tabs[ i ].setAttribute('aria-selected', 'false');
    let tabpanelID = tabs[ i ].getAttribute('aria-controls');
    let tabpanel = document.getElementById(tabpanelID)
    if(tabpanel === null){
      throw new Error(`Could not find tabpanel.`);
    }
    tabpanel.setAttribute('aria-hidden', 'true');
  }
  
  // Set selected tab to active
  let tabpanelID = tab.getAttribute('aria-controls');
  let tabpanel = document.getElementById(tabpanelID);
  if(tabpanel === null){
    throw new Error(`Could not find accordion panel.`);
  }

  tab.setAttribute('aria-selected', 'true');
  tabpanel.setAttribute('aria-hidden', 'false');
  tab.removeAttribute('tabindex');

  // Set focus when required
  if (setFocus) {
    tab.focus();
  }

  let eventChanged = new Event('fds.tabnav.changed');
  tab.parentNode.dispatchEvent(eventChanged);

  let eventOpen = new Event('fds.tabnav.open');
  tab.dispatchEvent(eventOpen);
}

/**
 * Add keydown events to tabnav component
 * @param {KeyboardEvent} event 
 */
function keydownEventListener (event) {
  let key = event.keyCode;

  switch (key) {
    case keys.end:
      event.preventDefault();
      // Activate last tab
      focusLastTab(event.target);
      break;
    case keys.home:
      event.preventDefault();
      // Activate first tab
      focusFirstTab(event.target);
      break;
    // Up and down are in keydown
    // because we need to prevent page scroll >:)
    case keys.up:
    case keys.down:
      determineOrientation(event);
      break;
  }
}

/**
 * Add keyup events to tabnav component
 * @param {KeyboardEvent} event 
 */
function keyupEventListener (event) {
  let key = event.keyCode;

  switch (key) {
    case keys.left:
    case keys.right:
      determineOrientation(event);
      break;
    case keys.delete:
      break;
    case keys.enter:
    case keys.space:
      new Tabnav(event.target.parentNode).activateTab(event.target, true);
      break;
  }
}

/**
 * When a tablist aria-orientation is set to vertical,
 * only up and down arrow should function.
 * In all other cases only left and right arrow function.
 */
function determineOrientation (event) {
  let key = event.keyCode;

  let w=window,
    d=document,
    e=d.documentElement,
    g=d.getElementsByTagName('body')[ 0 ],
    x=w.innerWidth||e.clientWidth||g.clientWidth,
    y=w.innerHeight||e.clientHeight||g.clientHeight;

  let vertical = x < tabnav_breakpoints.md;
  let proceed = false;

  if (vertical) {
    if (key === keys.up || key === keys.down) {
      event.preventDefault();
      proceed = true;
    }
  }
  else {
    if (key === keys.left || key === keys.right) {
      proceed = true;
    }
  }
  if (proceed) {
    switchTabOnArrowPress(event);
  }
}

/**
 * Either focus the next, previous, first, or last tab
 * depending on key pressed
 */
function switchTabOnArrowPress (event) {
  var pressed = event.keyCode;
  if (direction[ pressed ]) {
    let target = event.target;
    let tabs = getAllTabsInList(target);
    let index = getIndexOfElementInList(target, tabs);
    if (index !== -1) {
      if (tabs[ index + direction[ pressed ] ]) {
        tabs[ index + direction[ pressed ] ].focus();
      }
      else if (pressed === keys.left || pressed === keys.up) {
        focusLastTab(target);
      }
      else if (pressed === keys.right || pressed == keys.down) {
        focusFirstTab(target);
      }
    }
  }
}

/**
 * Get all active tabs in list
 * @param tabnav parent .tabnav element
 * @returns returns list of active tabs if any
 */
function getActiveTabs (tabnav) {
  return tabnav.querySelectorAll('button.tabnav-item[aria-selected=true]');
}

/**
 * Get a list of all button tabs in current tablist
 * @param tab Button tab element
 * @returns {*} return array of tabs
 */
function getAllTabsInList (tab) {
  let parentNode = tab.parentNode;
  if (parentNode.classList.contains('tabnav')) {
    return parentNode.querySelectorAll('button.tabnav-item');
  }
  return [];
}

/**
 * Get index of element in list
 * @param {HTMLElement} element 
 * @param {HTMLCollection} list 
 * @returns {index}
 */
function getIndexOfElementInList (element, list){
  let index = -1;
  for (let i = 0; i < list.length; i++ ){
    if(list[ i ] === element){
      index = i;
      break;
    }
  }

  return index;
}

/**
 * Checks if there is a tab hash in the url and activates the tab accordingly
 * @returns {boolean} returns true if tab has been set - returns false if no tab has been set to active
 */
function setActiveHashTab () {
  let hash = location.hash.replace('#', '');
  if (hash !== '') {
    let tab = document.querySelector('button.tabnav-item[aria-controls="#' + hash + '"]');
    if (tab !== null) {
      activateTab(tab, false);
      return true;
    }
  }
  return false;
}

/**
 * Get first tab by tab in list
 * @param {HTMLButtonElement} tab 
 */
function focusFirstTab (tab) {
  getAllTabsInList(tab)[ 0 ].focus();
}

/**
 * Get last tab by tab in list
 * @param {HTMLButtonElement} tab 
 */
function focusLastTab (tab) {
  let tabs = getAllTabsInList(tab);
  tabs[ tabs.length - 1 ].focus();
}

/* harmony default export */ const tabnav = (Tabnav);
;// CONCATENATED MODULE: ./src/js/components/selectable-table.js


/**
 * 
 * @param {HTMLTableElement} table Table Element
 */
function TableSelectableRows (table) {
  this.table = table;
}

/**
 * Initialize eventlisteners for checkboxes in table
 */
TableSelectableRows.prototype.init = function(){
  this.groupCheckbox = this.getGroupCheckbox();
  this.tbodyCheckboxList = this.getCheckboxList();
  if(this.tbodyCheckboxList.length !== 0){
    for(let c = 0; c < this.tbodyCheckboxList.length; c++){
      let checkbox = this.tbodyCheckboxList[c];
      checkbox.removeEventListener('change', updateGroupCheck);
      checkbox.addEventListener('change', updateGroupCheck);
    }
  }
  if(this.groupCheckbox !== false){
    this.groupCheckbox.removeEventListener('change', updateCheckboxList);
    this.groupCheckbox.addEventListener('change', updateCheckboxList);
  }
}
  
/**
 * Get group checkbox in table header
 * @returns element on true - false if not found
 */
TableSelectableRows.prototype.getGroupCheckbox = function(){
  let checkbox = this.table.getElementsByTagName('thead')[0].getElementsByClassName('form-checkbox');
  if(checkbox.length === 0){
    return false;
  }
  return checkbox[0];
}
/**
 * Get table body checkboxes
 * @returns HTMLCollection
 */
TableSelectableRows.prototype.getCheckboxList = function(){
  return this.table.getElementsByTagName('tbody')[0].getElementsByClassName('form-checkbox');
}

/**
 * Update checkboxes in table body when group checkbox is changed
 * @param {Event} e 
 */
function updateCheckboxList(e){
  let checkbox = e.target;
  checkbox.removeAttribute('aria-checked');
  let table = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
  let tableSelectableRows = new TableSelectableRows(table);
  let checkboxList = tableSelectableRows.getCheckboxList();
  let checkedNumber = 0;
  if(checkbox.checked){
    for(let c = 0; c < checkboxList.length; c++){
      checkboxList[c].checked = true;
      checkboxList[c].parentNode.parentNode.parentNode.classList.add('table-row-selected');
    }

    checkedNumber = checkboxList.length;
  } else{
    for(let c = 0; c < checkboxList.length; c++){
      checkboxList[c].checked = false;
      checkboxList[c].parentNode.parentNode.parentNode.classList.remove('table-row-selected');
    }
  }
  
  const event = new CustomEvent("fds.table.selectable.updated", {
    bubbles: true,
    cancelable: true,
    detail: {checkedNumber}
  });
  table.dispatchEvent(event);
}

/**
 * Update group checkbox when checkbox in table body is changed
 * @param {Event} e 
 */
function updateGroupCheck(e){
  // update label for event checkbox
  if(e.target.checked){
    e.target.parentNode.parentNode.parentNode.classList.add('table-row-selected');
  } else{
    e.target.parentNode.parentNode.parentNode.classList.remove('table-row-selected');
  }
  let table = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
  let tableSelectableRows = new TableSelectableRows(table);
  let groupCheckbox = tableSelectableRows.getGroupCheckbox();
  if(groupCheckbox !== false){
    let checkboxList = tableSelectableRows.getCheckboxList();

    // how many row has been selected
    let checkedNumber = 0;
    for(let c = 0; c < checkboxList.length; c++){
      let loopedCheckbox = checkboxList[c];
      if(loopedCheckbox.checked){
        checkedNumber++;
      }
    }
    
    if(checkedNumber === checkboxList.length){ // if all rows has been selected
      groupCheckbox.removeAttribute('aria-checked');
      groupCheckbox.checked = true;
    } else if(checkedNumber == 0){ // if no rows has been selected
      groupCheckbox.removeAttribute('aria-checked');
      groupCheckbox.checked = false;
    } else{ // if some but not all rows has been selected
      groupCheckbox.setAttribute('aria-checked', 'mixed');
      groupCheckbox.checked = false;
    }
    const event = new CustomEvent("fds.table.selectable.updated", {
      bubbles: true,
      cancelable: true,
      detail: {checkedNumber}
    });
    table.dispatchEvent(event);
  }
}

/* harmony default export */ const selectable_table = (TableSelectableRows);
;// CONCATENATED MODULE: ./src/js/components/toast.js

/**
 * Show/hide toast component
 * @param {HTMLElement} element 
 */
function Toast (element){
    this.element = element;
}

/**
 * Show toast
 */
Toast.prototype.show = function(){
    this.element.classList.remove('hide');
    this.element.classList.add('showing');
    this.element.getElementsByClassName('toast-close')[0].addEventListener('click', function(){
        let toast = this.parentNode.parentNode;
        new Toast(toast).hide();
    });
    requestAnimationFrame(showToast);
}

/**
 * Hide toast
 */
Toast.prototype.hide = function(){
    this.element.classList.remove('show');
    this.element.classList.add('hide');         
}

/**
 * Adds classes to make show animation
 */
function showToast(){
    let toasts = document.querySelectorAll('.toast.showing');
    for(let t = 0; t < toasts.length; t++){
        let toast = toasts[t];
        toast.classList.remove('showing');
        toast.classList.add('show');
    }
}

/* harmony default export */ const toast = (Toast);
;// CONCATENATED MODULE: ./src/js/components/tooltip.js

/**
 * Set tooltip on element
 * @param {HTMLElement} element Element which has tooltip
 */
function Tooltip(element) {
    this.element = element;
    if (this.element.getAttribute('data-tooltip') === null) {
        throw new Error(`Tooltip text is missing. Add attribute data-tooltip and the content of the tooltip as value.`);
    }
}

/**
 * Set eventlisteners
 */
Tooltip.prototype.init = function () {
    let module = this;
    this.element.addEventListener('mouseenter', function (e) {
        let trigger = e.target;
        if (trigger.classList.contains('tooltip-hover') === false && trigger.classList.contains('tooltip-focus') === false) {
            closeAllTooltips(e);
            trigger.classList.add("tooltip-hover");
            setTimeout(function () {
                if (trigger.classList.contains('tooltip-hover')) {
                    var element = e.target;

                    if (element.getAttribute('aria-describedby') !== null) return;
                    addTooltip(element);
                }
            }, 300);
        }
    });

    this.element.addEventListener('mouseleave', function (e) {
        let trigger = e.target;
        if (trigger.classList.contains('tooltip-hover')) {
            trigger.classList.remove('tooltip-hover');
            var tooltipId = trigger.getAttribute('aria-describedby');
            let tooltipElement = document.getElementById(tooltipId);
            if (tooltipElement !== null) {
                closeHoverTooltip(trigger);
            }
        }
    });

    this.element.addEventListener('keyup', function (event) {
        var key = event.which || event.keyCode;
        if (key === 27) {
            var tooltip = this.getAttribute('aria-describedby');
            if (tooltip !== null && document.getElementById(tooltip) !== null) {
                document.body.removeChild(document.getElementById(tooltip));
            }
            this.classList.remove('active');
            this.removeAttribute('aria-describedby');
        }
    });

    if (this.element.getAttribute('data-tooltip-trigger') === 'click') {
        this.element.addEventListener('click', function (e) {
            var trigger = e.target;
            closeAllTooltips(e);
            trigger.classList.add('tooltip-focus');
            trigger.classList.remove('tooltip-hover');
            if (trigger.getAttribute('aria-describedby') !== null) return;
            addTooltip(trigger);
        });
    }

    document.getElementsByTagName('body')[0].removeEventListener('click', closeAllTooltips);
    document.getElementsByTagName('body')[0].addEventListener('click', closeAllTooltips);
};

/**
 * Close all tooltips
 */
function tooltip_closeAll() {
    var elements = document.querySelectorAll('.js-tooltip[aria-describedby]');
    for (var i = 0; i < elements.length; i++) {
        var popper = elements[i].getAttribute('aria-describedby');
        elements[i].removeAttribute('aria-describedby');
        document.body.removeChild(document.getElementById(popper));
    }
}

function addTooltip(trigger) {
    var pos = trigger.getAttribute('data-tooltip-position') || 'top';

    var tooltip = createTooltip(trigger, pos);

    document.body.appendChild(tooltip);

    positionAt(trigger, tooltip, pos);
}

/**
 * Create tooltip element
 * @param {HTMLElement} element Element which the tooltip is attached
 * @param {string} pos Position of tooltip (top | bottom)
 * @returns 
 */
function createTooltip(element, pos) {
    var tooltip = document.createElement('div');
    tooltip.className = 'tooltip-popper';
    var poppers = document.getElementsByClassName('tooltip-popper');
    var id = 'tooltip-' + poppers.length + 1;
    tooltip.setAttribute('id', id);
    tooltip.setAttribute('role', 'tooltip');
    tooltip.setAttribute('x-placement', pos);
    element.setAttribute('aria-describedby', id);

    var tooltipInner = document.createElement('div');
    tooltipInner.className = 'tooltip';

    var tooltipArrow = document.createElement('div');
    tooltipArrow.className = 'tooltip-arrow';
    tooltipInner.appendChild(tooltipArrow);

    var tooltipContent = document.createElement('div');
    tooltipContent.className = 'tooltip-content';
    tooltipContent.innerHTML = element.getAttribute('data-tooltip');
    tooltipInner.appendChild(tooltipContent);
    tooltip.appendChild(tooltipInner);

    return tooltip;
}


/**
 * Positions the tooltip.
 *
 * @param {object} parent - The trigger of the tooltip.
 * @param {object} tooltip - The tooltip itself.
 * @param {string} posHorizontal - Desired horizontal position of the tooltip relatively to the trigger (left/center/right)
 * @param {string} posVertical - Desired vertical position of the tooltip relatively to the trigger (top/center/bottom)
 *
 */
function positionAt(parent, tooltip, pos) {
    let trigger = parent;
    let arrow = tooltip.getElementsByClassName('tooltip-arrow')[0];
    let triggerPosition = parent.getBoundingClientRect();

    var parentCoords = parent.getBoundingClientRect(), left, top;

    var tooltipWidth = tooltip.offsetWidth;

    var dist = 12;
    let arrowDirection = "down";
    left = parseInt(parentCoords.left) + ((parent.offsetWidth - tooltip.offsetWidth) / 2);

    switch (pos) {
        case 'bottom':
            top = parseInt(parentCoords.bottom) + dist;
            arrowDirection = "up";
            break;

        default:
        case 'top':
            top = parseInt(parentCoords.top) - tooltip.offsetHeight - dist;
    }

    // if tooltip is out of bounds on left side
    if (left < 0) {
        left = dist;
        let endPositionOnPage = triggerPosition.left + (trigger.offsetWidth / 2);
        let tooltipArrowHalfWidth = 8;
        let arrowLeftPosition = endPositionOnPage - dist - tooltipArrowHalfWidth;
        tooltip.getElementsByClassName('tooltip-arrow')[0].style.left = arrowLeftPosition + 'px';
    }

    // if tooltip is out of bounds on the bottom of the page
    if ((top + tooltip.offsetHeight) >= window.innerHeight) {
        top = parseInt(parentCoords.top) - tooltip.offsetHeight - dist;
        arrowDirection = "down";
    }

    // if tooltip is out of bounds on the top of the page
    if (top < 0) {
        top = parseInt(parentCoords.bottom) + dist;
        arrowDirection = "up";
    }

    if (window.innerWidth < (left + tooltipWidth)) {
        tooltip.style.right = dist + 'px';
        let endPositionOnPage = triggerPosition.right - (trigger.offsetWidth / 2);
        let tooltipArrowHalfWidth = 8;
        let arrowRightPosition = window.innerWidth - endPositionOnPage - dist - tooltipArrowHalfWidth;
        tooltip.getElementsByClassName('tooltip-arrow')[0].style.right = arrowRightPosition + 'px';
        tooltip.getElementsByClassName('tooltip-arrow')[0].style.left = 'auto';
    } else {
        tooltip.style.left = left + 'px';
    }
    tooltip.style.top = top + pageYOffset + 'px';
    tooltip.getElementsByClassName('tooltip-arrow')[0].classList.add(arrowDirection);
}


function closeAllTooltips(event, force = false) {
    if (force || (!event.target.classList.contains('js-tooltip') && !event.target.classList.contains('tooltip') && !event.target.classList.contains('tooltip-content'))) {
        var elements = document.querySelectorAll('.tooltip-popper');
        for (var i = 0; i < elements.length; i++) {
            let trigger = document.querySelector('[aria-describedby=' + elements[i].getAttribute('id') + ']');
            trigger.removeAttribute('data-tooltip-active');
            trigger.removeAttribute('aria-describedby');
            trigger.classList.remove('tooltip-focus');
            trigger.classList.remove('tooltip-hover');
            document.body.removeChild(elements[i]);
        }
    }
}

function closeHoverTooltip(trigger) {
    var tooltipId = trigger.getAttribute('aria-describedby');
    let tooltipElement = document.getElementById(tooltipId);
    tooltipElement.removeEventListener('mouseenter', onTooltipHover);
    tooltipElement.addEventListener('mouseenter', onTooltipHover);
    setTimeout(function () {
        let tooltipElement = document.getElementById(tooltipId);
        if (tooltipElement !== null) {
            if (!trigger.classList.contains("tooltip-hover")) {
                removeTooltip(trigger);
            }
        }
    }, 300);
}

function onTooltipHover(e) {
    let tooltipElement = this;

    let trigger = document.querySelector('[aria-describedby=' + tooltipElement.getAttribute('id') + ']');
    trigger.classList.add('tooltip-hover');

    tooltipElement.addEventListener('mouseleave', function () {
        let trigger = document.querySelector('[aria-describedby=' + tooltipElement.getAttribute('id') + ']');
        if (trigger !== null) {
            trigger.classList.remove('tooltip-hover');
            closeHoverTooltip(trigger);
        }
    });
}

function removeTooltip(trigger) {
    var tooltipId = trigger.getAttribute('aria-describedby');
    let tooltipElement = document.getElementById(tooltipId);

    if (tooltipId !== null && tooltipElement !== null) {
        document.body.removeChild(tooltipElement);
    }
    trigger.removeAttribute('aria-describedby');
    trigger.classList.remove('tooltip-hover');
    trigger.classList.remove('tooltip-focus');
}

/* harmony default export */ const tooltip = (Tooltip);

;// CONCATENATED MODULE: ./src/js/dkfds.js


















const datePicker = (__webpack_require__(6647)/* ["default"] */ .Z);
/**
 * The 'polyfills' define key ECMAScript 5 methods that may be missing from
 * older browsers, so must be loaded first.
 */
__webpack_require__(9742);

/**
 * Init all components
 * @param {JSON} options {scope: HTMLElement} - Init all components within scope (default is document)
 */
var init = function (options) {
  // Set the options to an empty object by default if no options are passed.
  options = typeof options !== 'undefined' ? options : {}

  // Allow the user to initialise FDS in only certain sections of the page
  // Defaults to the entire document if nothing is set.
  var scope = typeof options.scope !== 'undefined' ? options.scope : document

  /*
  ---------------------
  Accordions
  ---------------------
  */
  const jsSelectorAccordion = scope.getElementsByClassName('accordion');
  for(let c = 0; c < jsSelectorAccordion.length; c++){
    new accordion(jsSelectorAccordion[ c ]).init();
  }
  const jsSelectorAccordionBordered = scope.querySelectorAll('.accordion-bordered:not(.accordion)');
  for(let c = 0; c < jsSelectorAccordionBordered.length; c++){
    new accordion(jsSelectorAccordionBordered[ c ]).init();
  }

  /*
  ---------------------
  Alerts
  ---------------------
  */

  const alertsWithCloseButton = scope.querySelectorAll('.alert.has-close');
  for(let c = 0; c < alertsWithCloseButton.length; c++){
    new components_alert(alertsWithCloseButton[ c ]).init();
  }

  /*
  ---------------------
  Back to top button
  ---------------------
  */

  const backToTopButtons = scope.getElementsByClassName('back-to-top-button');
  for(let c = 0; c < backToTopButtons.length; c++){
    new back_to_top(backToTopButtons[ c ]).init();
  }

  /*
  ---------------------
  Character limit
  ---------------------
  */
  const jsCharacterLimit = scope.getElementsByClassName('form-limit');
  for(let c = 0; c < jsCharacterLimit.length; c++){

    new character_limit(jsCharacterLimit[ c ]).init();
  }
  
  /*
  ---------------------
  Checkbox collapse
  ---------------------
  */
  const jsSelectorCheckboxCollapse = scope.getElementsByClassName('js-checkbox-toggle-content');
  for(let c = 0; c < jsSelectorCheckboxCollapse.length; c++){
    new checkbox_toggle_content(jsSelectorCheckboxCollapse[ c ]).init();
  }

  /*
  ---------------------
  Overflow menu
  ---------------------
  */
  const jsSelectorDropdown = scope.getElementsByClassName('js-dropdown');
  for(let c = 0; c < jsSelectorDropdown.length; c++){
    new dropdown(jsSelectorDropdown[ c ]).init();
  }

  
  /*
  ---------------------
  Overflow menu sort
  ---------------------
  */
  const jsSelectorDropdownSort = scope.getElementsByClassName('overflow-menu--sort');
  for(let c = 0; c < jsSelectorDropdownSort.length; c++){
    new dropdown_sort(jsSelectorDropdownSort[ c ]).init();
  }

  /*
  ---------------------
  Datepicker
  ---------------------
  */
  datePicker.on(scope);
  
  /*
  ---------------------
  Error summary
  ---------------------
  */
  var $errorSummary = scope.querySelector('[data-module="error-summary"]');
  new error_summary($errorSummary).init();

  /*
  ---------------------
  Input Regex - used on date fields
  ---------------------
  */
  const jsSelectorRegex = scope.querySelectorAll('input[data-input-regex]');
  for(let c = 0; c < jsSelectorRegex.length; c++){
    new regex_input_mask(jsSelectorRegex[ c ]);
  }

  /*
  ---------------------
  Modal
  ---------------------
  */
  const modals = scope.querySelectorAll('.fds-modal');
  for(let d = 0; d < modals.length; d++) {
    new modal(modals[d]).init();
  }
  
  /*
  ---------------------
  Navigation
  ---------------------
  */
  new navigation().init();
   
  /*
  ---------------------
  Radiobutton group collapse
  ---------------------
  */
  const jsSelectorRadioCollapse = scope.getElementsByClassName('js-radio-toggle-group');
  for(let c = 0; c < jsSelectorRadioCollapse.length; c++){
    new radio_toggle_content(jsSelectorRadioCollapse[ c ]).init();
  }

  /*
  ---------------------
  Responsive tables
  ---------------------
  */
  const jsSelectorTable = scope.querySelectorAll('table.table--responsive-headers, table.table-sm-responsive-headers, table.table-md-responsive-headers, table.table-lg-responsive-headers');
  for(let c = 0; c < jsSelectorTable.length; c++){
    new table(jsSelectorTable[ c ]);
  }

  /*
  ---------------------
  Selectable rows in table
  ---------------------
  */
  const jsSelectableTable = scope.querySelectorAll('table.table--selectable');
  for(let c = 0; c < jsSelectableTable.length; c++){
    new selectable_table(jsSelectableTable[ c ]).init();
  }

  /*
  ---------------------
  Tabnav
  ---------------------
  */
  const jsSelectorTabnav = scope.getElementsByClassName('tabnav');
  for(let c = 0; c < jsSelectorTabnav.length; c++){
    new tabnav(jsSelectorTabnav[ c ]).init();
  }

  /*
  ---------------------
  Tooltip
  ---------------------
  */
  const jsSelectorTooltip = scope.getElementsByClassName('js-tooltip');
  for(let c = 0; c < jsSelectorTooltip.length; c++){
    new tooltip(jsSelectorTooltip[ c ]).init();
  }
  
};


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});