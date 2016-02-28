(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.feathers || (g.feathers = {})).localstorage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-polyfill/lib/index.js":[function(require,module,exports){
(function (global){
"use strict";

require("core-js/shim");

require("babel-regenerator-runtime");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"babel-regenerator-runtime":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-regenerator-runtime/runtime.js","core-js/shim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/shim.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-regenerator-runtime/runtime.js":[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            return result;
          });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return invoke(method, arg);
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : new Promise(function (resolve) {
          resolve(callInvokeWithMethodAndArg());
        });
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          context._sent = arg;

          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/process/browser.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.a-function.js":[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.add-to-unscopables.js":[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./$.wks')('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)require('./$.hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"./$.hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.hide.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js":[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-copy-within.js":[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./$.to-object')
  , toIndex  = require('./$.to-index')
  , toLength = require('./$.to-length');

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , $$    = arguments
    , end   = $$.length > 2 ? $$[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"./$.to-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-index.js","./$.to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-length.js","./$.to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-fill.js":[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./$.to-object')
  , toIndex  = require('./$.to-index')
  , toLength = require('./$.to-length');
module.exports = [].fill || function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , $$     = arguments
    , $$len  = $$.length
    , index  = toIndex($$len > 1 ? $$[1] : undefined, length)
    , end    = $$len > 2 ? $$[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"./$.to-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-index.js","./$.to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-length.js","./$.to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-includes.js":[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./$.to-iobject')
  , toLength  = require('./$.to-length')
  , toIndex   = require('./$.to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index;
    } return !IS_INCLUDES && -1;
  };
};
},{"./$.to-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-index.js","./$.to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-iobject.js","./$.to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-length.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-methods.js":[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = require('./$.ctx')
  , IObject  = require('./$.iobject')
  , toObject = require('./$.to-object')
  , toLength = require('./$.to-length')
  , asc      = require('./$.array-species-create');
module.exports = function(TYPE){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./$.array-species-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-species-create.js","./$.ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.ctx.js","./$.iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iobject.js","./$.to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-length.js","./$.to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-species-create.js":[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var isObject = require('./$.is-object')
  , isArray  = require('./$.is-array')
  , SPECIES  = require('./$.wks')('species');
module.exports = function(original, length){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return new (C === undefined ? Array : C)(length);
};
},{"./$.is-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-array.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.classof.js":[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.cof.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.cof.js":[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection-strong.js":[function(require,module,exports){
'use strict';
var $            = require('./$')
  , hide         = require('./$.hide')
  , redefineAll  = require('./$.redefine-all')
  , ctx          = require('./$.ctx')
  , strictNew    = require('./$.strict-new')
  , defined      = require('./$.defined')
  , forOf        = require('./$.for-of')
  , $iterDefine  = require('./$.iter-define')
  , step         = require('./$.iter-step')
  , ID           = require('./$.uid')('id')
  , $has         = require('./$.has')
  , isObject     = require('./$.is-object')
  , setSpecies   = require('./$.set-species')
  , DESCRIPTORS  = require('./$.descriptors')
  , isExtensible = Object.isExtensible || isObject
  , SIZE         = DESCRIPTORS ? '_s' : 'size'
  , id           = 0;

var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
};

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = $.create(null); // index
      that._f = undefined;      // first entry
      that._l = undefined;      // last entry
      that[SIZE] = 0;           // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.ctx.js","./$.defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.defined.js","./$.descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.descriptors.js","./$.for-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.for-of.js","./$.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.has.js","./$.hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.hide.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.iter-define":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-define.js","./$.iter-step":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-step.js","./$.redefine-all":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine-all.js","./$.set-species":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-species.js","./$.strict-new":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.strict-new.js","./$.uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.uid.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection-to-json.js":[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var forOf   = require('./$.for-of')
  , classof = require('./$.classof');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};
},{"./$.classof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.classof.js","./$.for-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.for-of.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection-weak.js":[function(require,module,exports){
'use strict';
var hide              = require('./$.hide')
  , redefineAll       = require('./$.redefine-all')
  , anObject          = require('./$.an-object')
  , isObject          = require('./$.is-object')
  , strictNew         = require('./$.strict-new')
  , forOf             = require('./$.for-of')
  , createArrayMethod = require('./$.array-methods')
  , $has              = require('./$.has')
  , WEAK              = require('./$.uid')('weak')
  , isExtensible      = Object.isExtensible || isObject
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for frozen keys
var frozenStore = function(that){
  return that._l || (that._l = new FrozenStore);
};
var FrozenStore = function(){
  this.a = [];
};
var findFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
FrozenStore.prototype = {
  get: function(key){
    var entry = findFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findFrozen(this, key);
  },
  set: function(key, value){
    var entry = findFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = id++;      // collection id
      that._l = undefined; // leak store for frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this)['delete'](key);
        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        if(!isExtensible(key))return frozenStore(this).has(key);
        return $has(key, WEAK) && $has(key[WEAK], this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    if(!isExtensible(anObject(key))){
      frozenStore(that).set(key, value);
    } else {
      $has(key, WEAK) || hide(key, WEAK, {});
      key[WEAK][that._i] = value;
    } return that;
  },
  frozenStore: frozenStore,
  WEAK: WEAK
};
},{"./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-methods.js","./$.for-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.for-of.js","./$.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.has.js","./$.hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.hide.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.redefine-all":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine-all.js","./$.strict-new":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.strict-new.js","./$.uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.uid.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection.js":[function(require,module,exports){
'use strict';
var global         = require('./$.global')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , redefineAll    = require('./$.redefine-all')
  , forOf          = require('./$.for-of')
  , strictNew      = require('./$.strict-new')
  , isObject       = require('./$.is-object')
  , fails          = require('./$.fails')
  , $iterDetect    = require('./$.iter-detect')
  , setToStringTag = require('./$.set-to-string-tag');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO;
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        strictNew(target, C, NAME);
        var that = new Base;
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    IS_WEAK || instance.forEach(function(val, key){
      BUGGY_ZERO = 1 / key === -Infinity;
    });
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js","./$.for-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.for-of.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.iter-detect":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-detect.js","./$.redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine.js","./$.redefine-all":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine-all.js","./$.set-to-string-tag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-to-string-tag.js","./$.strict-new":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.strict-new.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.core.js":[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.ctx.js":[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.a-function.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.defined.js":[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.descriptors.js":[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.dom-create.js":[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.enum-keys.js":[function(require,module,exports){
// all enumerable object keys, includes symbols
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js":[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , hide      = require('./$.hide')
  , redefine  = require('./$.redefine')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target && !own)redefine(target, key, out);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.core.js","./$.ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.ctx.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.hide.js","./$.redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails-is-regexp.js":[function(require,module,exports){
var MATCH = require('./$.wks')('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js":[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fix-re-wks.js":[function(require,module,exports){
'use strict';
var hide     = require('./$.hide')
  , redefine = require('./$.redefine')
  , fails    = require('./$.fails')
  , defined  = require('./$.defined')
  , wks      = require('./$.wks');

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , original = ''[KEY];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, exec(defined, SYMBOL, original));
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return original.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return original.call(string, this); }
    );
  }
};
},{"./$.defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.defined.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js","./$.hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.hide.js","./$.redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.flags.js":[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./$.an-object');
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.for-of.js":[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.ctx.js","./$.is-array-iter":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-array-iter.js","./$.iter-call":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-call.js","./$.to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-length.js","./core.get-iterator-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/core.get-iterator-method.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.get-names.js":[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./$.to-iobject')
  , getNames  = require('./$').getNames
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toIObject(it));
};
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js":[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.has.js":[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.hide.js":[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.descriptors.js","./$.property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.property-desc.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.html.js":[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.invoke.js":[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iobject.js":[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.cof.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-array-iter.js":[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iterators.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-array.js":[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./$.cof');
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};
},{"./$.cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.cof.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-integer.js":[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./$.is-object')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js":[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-regexp.js":[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./$.is-object')
  , cof      = require('./$.cof')
  , MATCH    = require('./$.wks')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"./$.cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.cof.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-call.js":[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-create.js":[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.hide.js","./$.property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.property-desc.js","./$.set-to-string-tag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-to-string-tag.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-define.js":[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.has.js","./$.hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.hide.js","./$.iter-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-create.js","./$.iterators":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iterators.js","./$.library":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.library.js","./$.redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine.js","./$.set-to-string-tag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-to-string-tag.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-detect.js":[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-step.js":[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iterators.js":[function(require,module,exports){
module.exports = {};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js":[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.keyof.js":[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.library.js":[function(require,module,exports){
module.exports = false;
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.math-expm1.js":[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
module.exports = Math.expm1 || function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.math-log1p.js":[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.math-sign.js":[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.microtask.js":[function(require,module,exports){
var global    = require('./$.global')
  , macrotask = require('./$.task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./$.cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain, fn;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    fn     = head.fn;
    if(domain)domain.enter();
    fn(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./$.cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.cof.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.task":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.task.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-assign.js":[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js","./$.iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iobject.js","./$.to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-sap.js":[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./$.export')
  , core    = require('./$.core')
  , fails   = require('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.core.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-to-array.js":[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject')
  , isEnum    = $.isEnum;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = $.getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.own-keys.js":[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var $        = require('./$')
  , anObject = require('./$.an-object')
  , Reflect  = require('./$.global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = $.getNames(anObject(it))
    , getSymbols = $.getSymbols;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.partial.js":[function(require,module,exports){
'use strict';
var path      = require('./$.path')
  , invoke    = require('./$.invoke')
  , aFunction = require('./$.a-function');
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that  = this
      , $$    = arguments
      , $$len = $$.length
      , j = 0, k = 0, args;
    if(!holder && !$$len)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = $$[k++];
    while($$len > k)args.push($$[k++]);
    return invoke(fn, args, that);
  };
};
},{"./$.a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.a-function.js","./$.invoke":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.invoke.js","./$.path":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.path.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.path.js":[function(require,module,exports){
module.exports = require('./$.global');
},{"./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.property-desc.js":[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine-all.js":[function(require,module,exports){
var redefine = require('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine.js":[function(require,module,exports){
// add fake Function#toString
// for correct work wrapped methods / constructors with methods like LoDash isNative
var global    = require('./$.global')
  , hide      = require('./$.hide')
  , SRC       = require('./$.uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./$.core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  if(typeof val == 'function'){
    val.hasOwnProperty(SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
    val.hasOwnProperty('name') || hide(val, 'name', key);
  }
  if(O === global){
    O[key] = val;
  } else {
    if(!safe)delete O[key];
    hide(O, key, val);
  }
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./$.core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.core.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.hide.js","./$.uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.uid.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.replacer.js":[function(require,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.same-value.js":[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-proto.js":[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.ctx.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-species.js":[function(require,module,exports){
'use strict';
var global      = require('./$.global')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.descriptors.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-to-string-tag.js":[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.has.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.shared.js":[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.species-constructor.js":[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./$.an-object')
  , aFunction = require('./$.a-function')
  , SPECIES   = require('./$.wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./$.a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.a-function.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.strict-new.js":[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-at.js":[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.defined.js","./$.to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-context.js":[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./$.is-regexp')
  , defined  = require('./$.defined');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./$.defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.defined.js","./$.is-regexp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-regexp.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-pad.js":[function(require,module,exports){
// https://github.com/ljharb/proposal-string-pad-left-right
var toLength = require('./$.to-length')
  , repeat   = require('./$.string-repeat')
  , defined  = require('./$.defined');

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength)return S;
  if(fillStr == '')fillStr = ' ';
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};
},{"./$.defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.defined.js","./$.string-repeat":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-repeat.js","./$.to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-length.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-repeat.js":[function(require,module,exports){
'use strict';
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./$.defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.defined.js","./$.to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-trim.js":[function(require,module,exports){
var $export = require('./$.export')
  , defined = require('./$.defined')
  , fails   = require('./$.fails')
  , spaces  = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
      '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec){
  var exp  = {};
  exp[KEY] = exec(trim);
  $export($export.P + $export.F * fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  }), 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"./$.defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.defined.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.task.js":[function(require,module,exports){
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$.cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.cof.js","./$.ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.ctx.js","./$.dom-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.dom-create.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.html.js","./$.invoke":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.invoke.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-index.js":[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./$.to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-integer.js":[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-iobject.js":[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.defined.js","./$.iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-length.js":[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-object.js":[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.defined.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-primitive.js":[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./$.is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.uid.js":[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js":[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.shared":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.shared.js","./$.uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.uid.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/core.get-iterator-method.js":[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.classof.js","./$.core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.core.js","./$.iterators":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iterators.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es5.js":[function(require,module,exports){
'use strict';
var $                 = require('./$')
  , $export           = require('./$.export')
  , DESCRIPTORS       = require('./$.descriptors')
  , createDesc        = require('./$.property-desc')
  , html              = require('./$.html')
  , cel               = require('./$.dom-create')
  , has               = require('./$.has')
  , cof               = require('./$.cof')
  , invoke            = require('./$.invoke')
  , fails             = require('./$.fails')
  , anObject          = require('./$.an-object')
  , aFunction         = require('./$.a-function')
  , isObject          = require('./$.is-object')
  , toObject          = require('./$.to-object')
  , toIObject         = require('./$.to-iobject')
  , toInteger         = require('./$.to-integer')
  , toIndex           = require('./$.to-index')
  , toLength          = require('./$.to-length')
  , IObject           = require('./$.iobject')
  , IE_PROTO          = require('./$.uid')('__proto__')
  , createArrayMethod = require('./$.array-methods')
  , arrayIndexOf      = require('./$.array-includes')(false)
  , ObjectProto       = Object.prototype
  , ArrayProto        = Array.prototype
  , arraySlice        = ArrayProto.slice
  , arrayJoin         = ArrayProto.join
  , defineProperty    = $.setDesc
  , getOwnDescriptor  = $.getDesc
  , defineProperties  = $.setDescs
  , factories         = {}
  , IE8_DOM_DEFINE;

if(!DESCRIPTORS){
  IE8_DOM_DEFINE = !fails(function(){
    return defineProperty(cel('div'), 'a', {get: function(){ return 7; }}).a != 7;
  });
  $.setDesc = function(O, P, Attributes){
    if(IE8_DOM_DEFINE)try {
      return defineProperty(O, P, Attributes);
    } catch(e){ /* empty */ }
    if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
    if('value' in Attributes)anObject(O)[P] = Attributes.value;
    return O;
  };
  $.getDesc = function(O, P){
    if(IE8_DOM_DEFINE)try {
      return getOwnDescriptor(O, P);
    } catch(e){ /* empty */ }
    if(has(O, P))return createDesc(!ObjectProto.propertyIsEnumerable.call(O, P), O[P]);
  };
  $.setDescs = defineProperties = function(O, Properties){
    anObject(O);
    var keys   = $.getKeys(Properties)
      , length = keys.length
      , i = 0
      , P;
    while(length > i)$.setDesc(O, P = keys[i++], Properties[P]);
    return O;
  };
}
$export($export.S + $export.F * !DESCRIPTORS, 'Object', {
  // 19.1.2.6 / 15.2.3.3 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $.getDesc,
  // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
  defineProperty: $.setDesc,
  // 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
  defineProperties: defineProperties
});

  // IE 8- don't enum bug keys
var keys1 = ('constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,' +
            'toLocaleString,toString,valueOf').split(',')
  // Additional keys for getOwnPropertyNames
  , keys2 = keys1.concat('length', 'prototype')
  , keysLen1 = keys1.length;

// Create object with `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = cel('iframe')
    , i      = keysLen1
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict.prototype[keys1[i]];
  return createDict();
};
var createGetKeys = function(names, length){
  return function(object){
    var O      = toIObject(object)
      , i      = 0
      , result = []
      , key;
    for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while(length > i)if(has(O, key = names[i++])){
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };
};
var Empty = function(){};
$export($export.S, 'Object', {
  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
  getPrototypeOf: $.getProto = $.getProto || function(O){
    O = toObject(O);
    if(has(O, IE_PROTO))return O[IE_PROTO];
    if(typeof O.constructor == 'function' && O instanceof O.constructor){
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  },
  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $.getNames = $.getNames || createGetKeys(keys2, keys2.length, true),
  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
  create: $.create = $.create || function(O, /*?*/Properties){
    var result;
    if(O !== null){
      Empty.prototype = anObject(O);
      result = new Empty();
      Empty.prototype = null;
      // add "__proto__" for Object.getPrototypeOf shim
      result[IE_PROTO] = O;
    } else result = createDict();
    return Properties === undefined ? result : defineProperties(result, Properties);
  },
  // 19.1.2.14 / 15.2.3.14 Object.keys(O)
  keys: $.getKeys = $.getKeys || createGetKeys(keys1, keysLen1, false)
});

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }
  return factories[len](F, args);
};

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
$export($export.P, 'Function', {
  bind: function bind(that /*, args... */){
    var fn       = aFunction(this)
      , partArgs = arraySlice.call(arguments, 1);
    var bound = function(/* args... */){
      var args = partArgs.concat(arraySlice.call(arguments));
      return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
    };
    if(isObject(fn.prototype))bound.prototype = fn.prototype;
    return bound;
  }
});

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * fails(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
$export($export.P + $export.F * (IObject != Object), 'Array', {
  join: function join(separator){
    return arrayJoin.call(IObject(this), separator === undefined ? ',' : separator);
  }
});

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
$export($export.S, 'Array', {isArray: require('./$.is-array')});

var createArrayReduce = function(isRight){
  return function(callbackfn, memo){
    aFunction(callbackfn);
    var O      = IObject(this)
      , length = toLength(O.length)
      , index  = isRight ? length - 1 : 0
      , i      = isRight ? -1 : 1;
    if(arguments.length < 2)for(;;){
      if(index in O){
        memo = O[index];
        index += i;
        break;
      }
      index += i;
      if(isRight ? index < 0 : length <= index){
        throw TypeError('Reduce of empty array with no initial value');
      }
    }
    for(;isRight ? index >= 0 : length > index; index += i)if(index in O){
      memo = callbackfn(memo, O[index], index, this);
    }
    return memo;
  };
};

var methodize = function($fn){
  return function(arg1/*, arg2 = undefined */){
    return $fn(this, arg1, arguments[1]);
  };
};

$export($export.P, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: $.each = $.each || methodize(createArrayMethod(0)),
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: methodize(createArrayMethod(1)),
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: methodize(createArrayMethod(2)),
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: methodize(createArrayMethod(3)),
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: methodize(createArrayMethod(4)),
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: createArrayReduce(false),
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: createArrayReduce(true),
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: methodize(arrayIndexOf),
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function(el, fromIndex /* = @[*-1] */){
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(fromIndex));
    if(index < 0)index = toLength(length + index);
    for(;index >= 0; index--)if(index in O)if(O[index] === el)return index;
    return -1;
  }
});

// 20.3.3.1 / 15.9.4.4 Date.now()
$export($export.S, 'Date', {now: function(){ return +new Date; }});

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(this))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.a-function.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.array-includes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-includes.js","./$.array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-methods.js","./$.cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.cof.js","./$.descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.descriptors.js","./$.dom-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.dom-create.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js","./$.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.has.js","./$.html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.html.js","./$.invoke":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.invoke.js","./$.iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iobject.js","./$.is-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-array.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.property-desc.js","./$.to-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-index.js","./$.to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-integer.js","./$.to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-iobject.js","./$.to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-length.js","./$.to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-object.js","./$.uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.uid.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.copy-within.js":[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./$.export');

$export($export.P, 'Array', {copyWithin: require('./$.array-copy-within')});

require('./$.add-to-unscopables')('copyWithin');
},{"./$.add-to-unscopables":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.add-to-unscopables.js","./$.array-copy-within":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-copy-within.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.fill.js":[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./$.export');

$export($export.P, 'Array', {fill: require('./$.array-fill')});

require('./$.add-to-unscopables')('fill');
},{"./$.add-to-unscopables":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.add-to-unscopables.js","./$.array-fill":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-fill.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.find-index.js":[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./$.export')
  , $find   = require('./$.array-methods')(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./$.add-to-unscopables')(KEY);
},{"./$.add-to-unscopables":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.add-to-unscopables.js","./$.array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-methods.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.find.js":[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./$.export')
  , $find   = require('./$.array-methods')(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./$.add-to-unscopables')(KEY);
},{"./$.add-to-unscopables":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.add-to-unscopables.js","./$.array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-methods.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.from.js":[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $export     = require('./$.export')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$export($export.S + $export.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./$.ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.ctx.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.is-array-iter":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-array-iter.js","./$.iter-call":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-call.js","./$.iter-detect":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-detect.js","./$.to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-length.js","./$.to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-object.js","./core.get-iterator-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/core.get-iterator-method.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.iterator.js":[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.add-to-unscopables.js","./$.iter-define":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-define.js","./$.iter-step":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-step.js","./$.iterators":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iterators.js","./$.to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.of.js":[function(require,module,exports){
'use strict';
var $export = require('./$.export');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./$.fails')(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , $$     = arguments
      , $$len  = $$.length
      , result = new (typeof this == 'function' ? this : Array)($$len);
    while($$len > index)result[index] = $$[index++];
    result.length = $$len;
    return result;
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.species.js":[function(require,module,exports){
require('./$.set-species')('Array');
},{"./$.set-species":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-species.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.function.has-instance.js":[function(require,module,exports){
'use strict';
var $             = require('./$')
  , isObject      = require('./$.is-object')
  , HAS_INSTANCE  = require('./$.wks')('hasInstance')
  , FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))$.setDesc(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = $.getProto(O))if(this.prototype === O)return true;
  return false;
}});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.function.name.js":[function(require,module,exports){
var setDesc    = require('./$').setDesc
  , createDesc = require('./$.property-desc')
  , has        = require('./$.has')
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';
// 19.2.4.2 name
NAME in FProto || require('./$.descriptors') && setDesc(FProto, NAME, {
  configurable: true,
  get: function(){
    var match = ('' + this).match(nameRE)
      , name  = match ? match[1] : '';
    has(this, NAME) || setDesc(this, NAME, createDesc(5, name));
    return name;
  }
});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.descriptors.js","./$.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.has.js","./$.property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.property-desc.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.map.js":[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.1 Map Objects
require('./$.collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./$.collection":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection.js","./$.collection-strong":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection-strong.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.acosh.js":[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./$.export')
  , log1p   = require('./$.math-log1p')
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

// V8 bug https://code.google.com/p/v8/issues/detail?id=3509
$export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.math-log1p":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.math-log1p.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.asinh.js":[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./$.export');

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

$export($export.S, 'Math', {asinh: asinh});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.atanh.js":[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.cbrt.js":[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./$.export')
  , sign    = require('./$.math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.math-sign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.math-sign.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.clz32.js":[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.cosh.js":[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./$.export')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.expm1.js":[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./$.export');

$export($export.S, 'Math', {expm1: require('./$.math-expm1')});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.math-expm1":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.math-expm1.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.fround.js":[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = require('./$.export')
  , sign      = require('./$.math-sign')
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.math-sign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.math-sign.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.hypot.js":[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./$.export')
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum   = 0
      , i     = 0
      , $$    = arguments
      , $$len = $$.length
      , larg  = 0
      , arg, div;
    while(i < $$len){
      arg = abs($$[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.imul.js":[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./$.export')
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./$.fails')(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.log10.js":[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.log1p.js":[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./$.export');

$export($export.S, 'Math', {log1p: require('./$.math-log1p')});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.math-log1p":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.math-log1p.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.log2.js":[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.sign.js":[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./$.export');

$export($export.S, 'Math', {sign: require('./$.math-sign')});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.math-sign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.math-sign.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.sinh.js":[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./$.export')
  , expm1   = require('./$.math-expm1')
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./$.fails')(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js","./$.math-expm1":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.math-expm1.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.tanh.js":[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./$.export')
  , expm1   = require('./$.math-expm1')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.math-expm1":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.math-expm1.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.trunc.js":[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./$.export');

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.constructor.js":[function(require,module,exports){
'use strict';
var $           = require('./$')
  , global      = require('./$.global')
  , has         = require('./$.has')
  , cof         = require('./$.cof')
  , toPrimitive = require('./$.to-primitive')
  , fails       = require('./$.fails')
  , $trim       = require('./$.string-trim').trim
  , NUMBER      = 'Number'
  , $Number     = global[NUMBER]
  , Base        = $Number
  , proto       = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF  = cof($.create(proto)) == NUMBER
  , TRIM        = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? new Base(toNumber(it)) : toNumber(it);
  };
  $.each.call(require('./$.descriptors') ? $.getNames(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), function(key){
    if(has(Base, key) && !has($Number, key)){
      $.setDesc($Number, key, $.getDesc(Base, key));
    }
  });
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./$.redefine')(global, NUMBER, $Number);
}
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.cof.js","./$.descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.descriptors.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.has.js","./$.redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine.js","./$.string-trim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-trim.js","./$.to-primitive":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-primitive.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.epsilon.js":[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./$.export');

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-finite.js":[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./$.export')
  , _isFinite = require('./$.global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-integer.js":[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./$.export');

$export($export.S, 'Number', {isInteger: require('./$.is-integer')});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.is-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-nan.js":[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./$.export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-safe-integer.js":[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = require('./$.export')
  , isInteger = require('./$.is-integer')
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.is-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.max-safe-integer.js":[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./$.export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.min-safe-integer.js":[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./$.export');

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.parse-float.js":[function(require,module,exports){
// 20.1.2.12 Number.parseFloat(string)
var $export = require('./$.export');

$export($export.S, 'Number', {parseFloat: parseFloat});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.parse-int.js":[function(require,module,exports){
// 20.1.2.13 Number.parseInt(string, radix)
var $export = require('./$.export');

$export($export.S, 'Number', {parseInt: parseInt});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.assign.js":[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.object-assign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-assign.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.freeze.js":[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(it) : it;
  };
});
},{"./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./$.to-iobject');

require('./$.object-sap')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./$.object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-sap.js","./$.to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.get-own-property-names.js":[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./$.object-sap')('getOwnPropertyNames', function(){
  return require('./$.get-names').get;
});
},{"./$.get-names":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.get-names.js","./$.object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.get-prototype-of.js":[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('getPrototypeOf', function($getPrototypeOf){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./$.object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-sap.js","./$.to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is-extensible.js":[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is-frozen.js":[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is-sealed.js":[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is.js":[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./$.export');
$export($export.S, 'Object', {is: require('./$.same-value')});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.same-value":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.same-value.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.keys.js":[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-sap.js","./$.to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.prevent-extensions.js":[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(it) : it;
  };
});
},{"./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.seal.js":[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./$.is-object');

require('./$.object-sap')('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(it) : it;
  };
});
},{"./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.set-prototype-of.js":[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./$.export');
$export($export.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.set-proto":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-proto.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.to-string.js":[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./$.classof')
  , test    = {};
test[require('./$.wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./$.redefine')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./$.classof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.classof.js","./$.redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.promise.js":[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $export    = require('./$.export')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same-value')
  , SPECIES    = require('./$.wks')('species')
  , speciesConstructor = require('./$.species-constructor')
  , asap       = require('./$.microtask')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , Wrapper;

var testResolve = function(sub){
  var test = new P(function(){});
  if(sub)test.constructor = Object;
  return P.resolve(test) === test;
};

var USE_NATIVE = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && require('./$.descriptors')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
var sameConstructor = function(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var PromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve),
  this.reject  = aFunction(reject)
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , result, then;
      try {
        if(handler){
          if(!ok)record.h = true;
          result = handler === true ? value : handler(value);
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      var promise = record.p
        , handler, console;
      if(isUnhandled(promise)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise._d
    , chain  = record.a || record.c
    , i      = 0
    , reaction;
  if(record.h)return false;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(record.p === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      asap(function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = this._d = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.redefine-all')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction = new PromiseCapability(speciesConstructor(this, P))
        , promise  = reaction.promise
        , record   = this._d;
      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      record.c.push(reaction);
      if(record.a)record.a.push(reaction);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
require('./$.set-to-string-tag')(P, PROMISE);
require('./$.set-species')(PROMISE);
Wrapper = require('./$.core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = new PromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof P && sameConstructor(x.constructor, this))return x;
    var capability = new PromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject
      , values     = [];
    var abrupt = perform(function(){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        var alreadyCalled = false;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled = true;
          results[index] = value;
          --remaining || resolve(results);
        }, reject);
      });
      else resolve(results);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.a-function.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.classof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.classof.js","./$.core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.core.js","./$.ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.ctx.js","./$.descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.descriptors.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.for-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.for-of.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.iter-detect":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-detect.js","./$.library":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.library.js","./$.microtask":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.microtask.js","./$.redefine-all":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine-all.js","./$.same-value":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.same-value.js","./$.set-proto":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-proto.js","./$.set-species":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-species.js","./$.set-to-string-tag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-to-string-tag.js","./$.species-constructor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.species-constructor.js","./$.strict-new":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.strict-new.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.apply.js":[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./$.export')
  , _apply  = Function.apply;

$export($export.S, 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(target, thisArgument, argumentsList);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.construct.js":[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $         = require('./$')
  , $export   = require('./$.export')
  , aFunction = require('./$.a-function')
  , anObject  = require('./$.an-object')
  , isObject  = require('./$.is-object')
  , bind      = Function.bind || require('./$.core').Function.prototype.bind;

// MS Edge supports only 2 arguments
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
$export($export.S + $export.F * require('./$.fails')(function(){
  function F(){}
  return !(Reflect.construct(function(){}, [], F) instanceof F);
}), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      if(args != undefined)switch(anObject(args).length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = $.create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.a-function.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.core.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.define-property.js":[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var $        = require('./$')
  , $export  = require('./$.export')
  , anObject = require('./$.an-object');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./$.fails')(function(){
  Reflect.defineProperty($.setDesc({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    try {
      $.setDesc(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.delete-property.js":[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = require('./$.export')
  , getDesc  = require('./$').getDesc
  , anObject = require('./$.an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = getDesc(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.enumerate.js":[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = require('./$.export')
  , anObject = require('./$.an-object');
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
require('./$.iter-create')(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.iter-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-create.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var $        = require('./$')
  , $export  = require('./$.export')
  , anObject = require('./$.an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return $.getDesc(anObject(target), propertyKey);
  }
});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.get-prototype-of.js":[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = require('./$.export')
  , getProto = require('./$').getProto
  , anObject = require('./$.an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.get.js":[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var $        = require('./$')
  , has      = require('./$.has')
  , $export  = require('./$.export')
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = $.getDesc(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = $.getProto(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.has.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.has.js":[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./$.export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.is-extensible.js":[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = require('./$.export')
  , anObject      = require('./$.an-object')
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.own-keys.js":[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./$.export');

$export($export.S, 'Reflect', {ownKeys: require('./$.own-keys')});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.own-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.own-keys.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.prevent-extensions.js":[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = require('./$.export')
  , anObject           = require('./$.an-object')
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.set-prototype-of.js":[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = require('./$.export')
  , setProto = require('./$.set-proto');

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.set-proto":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-proto.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.set.js":[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var $          = require('./$')
  , has        = require('./$.has')
  , $export    = require('./$.export')
  , createDesc = require('./$.property-desc')
  , anObject   = require('./$.an-object')
  , isObject   = require('./$.is-object');

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = $.getDesc(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = $.getProto(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = $.getDesc(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    $.setDesc(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.has.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.property-desc.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.constructor.js":[function(require,module,exports){
var $        = require('./$')
  , global   = require('./$.global')
  , isRegExp = require('./$.is-regexp')
  , $flags   = require('./$.flags')
  , $RegExp  = global.RegExp
  , Base     = $RegExp
  , proto    = $RegExp.prototype
  , re1      = /a/g
  , re2      = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW = new $RegExp(re1) !== re1;

if(require('./$.descriptors') && (!CORRECT_NEW || require('./$.fails')(function(){
  re2[require('./$.wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !(this instanceof $RegExp) && piRE && p.constructor === $RegExp && fiU ? p
      : CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f);
  };
  $.each.call($.getNames(Base), function(key){
    key in $RegExp || $.setDesc($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  });
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./$.redefine')(global, 'RegExp', $RegExp);
}

require('./$.set-species')('RegExp');
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.descriptors.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js","./$.flags":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.flags.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.is-regexp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-regexp.js","./$.redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine.js","./$.set-species":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-species.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.flags.js":[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
var $ = require('./$');
if(require('./$.descriptors') && /./g.flags != 'g')$.setDesc(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./$.flags')
});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.descriptors.js","./$.flags":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.flags.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.match.js":[function(require,module,exports){
// @@match logic
require('./$.fix-re-wks')('match', 1, function(defined, MATCH){
  // 21.1.3.11 String.prototype.match(regexp)
  return function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  };
});
},{"./$.fix-re-wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fix-re-wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.replace.js":[function(require,module,exports){
// @@replace logic
require('./$.fix-re-wks')('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  };
});
},{"./$.fix-re-wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fix-re-wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.search.js":[function(require,module,exports){
// @@search logic
require('./$.fix-re-wks')('search', 1, function(defined, SEARCH){
  // 21.1.3.15 String.prototype.search(regexp)
  return function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  };
});
},{"./$.fix-re-wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fix-re-wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.split.js":[function(require,module,exports){
// @@split logic
require('./$.fix-re-wks')('split', 2, function(defined, SPLIT, $split){
  // 21.1.3.17 String.prototype.split(separator, limit)
  return function split(separator, limit){
    'use strict';
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined
      ? fn.call(separator, O, limit)
      : $split.call(String(O), separator, limit);
  };
});
},{"./$.fix-re-wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fix-re-wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.set.js":[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.2 Set Objects
require('./$.collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./$.collection":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection.js","./$.collection-strong":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection-strong.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.code-point-at.js":[function(require,module,exports){
'use strict';
var $export = require('./$.export')
  , $at     = require('./$.string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.string-at":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-at.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.ends-with.js":[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = require('./$.export')
  , toLength  = require('./$.to-length')
  , context   = require('./$.string-context')
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./$.fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , $$   = arguments
      , endPosition = $$.length > 1 ? $$[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails-is-regexp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails-is-regexp.js","./$.string-context":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-context.js","./$.to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-length.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.from-code-point.js":[function(require,module,exports){
var $export        = require('./$.export')
  , toIndex        = require('./$.to-index')
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res   = []
      , $$    = arguments
      , $$len = $$.length
      , i     = 0
      , code;
    while($$len > i){
      code = +$$[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.to-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-index.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.includes.js":[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = require('./$.export')
  , context  = require('./$.string-context')
  , INCLUDES = 'includes';

$export($export.P + $export.F * require('./$.fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails-is-regexp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails-is-regexp.js","./$.string-context":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-context.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.iterator.js":[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iter-define.js","./$.string-at":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-at.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.raw.js":[function(require,module,exports){
var $export   = require('./$.export')
  , toIObject = require('./$.to-iobject')
  , toLength  = require('./$.to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl   = toIObject(callSite.raw)
      , len   = toLength(tpl.length)
      , $$    = arguments
      , $$len = $$.length
      , res   = []
      , i     = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < $$len)res.push(String($$[i]));
    } return res.join('');
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-iobject.js","./$.to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-length.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.repeat.js":[function(require,module,exports){
var $export = require('./$.export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./$.string-repeat')
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.string-repeat":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-repeat.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.starts-with.js":[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = require('./$.export')
  , toLength    = require('./$.to-length')
  , context     = require('./$.string-context')
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./$.fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , $$     = arguments
      , index  = toLength(Math.min($$.length > 1 ? $$[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails-is-regexp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails-is-regexp.js","./$.string-context":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-context.js","./$.to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-length.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.trim.js":[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./$.string-trim')('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"./$.string-trim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-trim.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.symbol.js":[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , DESCRIPTORS    = require('./$.descriptors')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , $fails         = require('./$.fails')
  , shared         = require('./$.shared')
  , setToStringTag = require('./$.set-to-string-tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , isArray        = require('./$.is-array')
  , anObject       = require('./$.an-object')
  , toIObject      = require('./$.to-iobject')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , _create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(setDesc({}, 'a', {
    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = getDesc(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  setDesc(it, key, D);
  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
} : setDesc;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function(it){
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toIObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , $$   = arguments
    , replacer, $replacer;
  while($$.length > i)args.push($$[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var buggyJSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  isSymbol = function(it){
    return it instanceof $Symbol;
  };

  $.create     = $create;
  $.isEnum     = $propertyIsEnumerable;
  $.getDesc    = $getOwnPropertyDescriptor;
  $.setDesc    = $defineProperty;
  $.setDescs   = $defineProperties;
  $.getNames   = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./$.library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
  'species,split,toPrimitive,toStringTag,unscopables'
).split(','), function(it){
  var sym = wks(it);
  symbolStatics[it] = useNative ? sym : wrap(sym);
});

setter = true;

$export($export.G + $export.W, {Symbol: $Symbol});

$export($export.S, 'Symbol', symbolStatics);

$export($export.S + $export.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.an-object.js","./$.descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.descriptors.js","./$.enum-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.enum-keys.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.fails.js","./$.get-names":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.get-names.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.has.js","./$.is-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-array.js","./$.keyof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.keyof.js","./$.library":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.library.js","./$.property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.property-desc.js","./$.redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine.js","./$.set-to-string-tag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.set-to-string-tag.js","./$.shared":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.shared.js","./$.to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-iobject.js","./$.uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.uid.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.weak-map.js":[function(require,module,exports){
'use strict';
var $            = require('./$')
  , redefine     = require('./$.redefine')
  , weak         = require('./$.collection-weak')
  , isObject     = require('./$.is-object')
  , has          = require('./$.has')
  , frozenStore  = weak.frozenStore
  , WEAK         = weak.WEAK
  , isExtensible = Object.isExtensible || isObject
  , tmp          = {};

// 23.3 WeakMap Objects
var $WeakMap = require('./$.collection')('WeakMap', function(get){
  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      if(!isExtensible(key))return frozenStore(this).get(key);
      if(has(key, WEAK))return key[WEAK][this._i];
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
}, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  $.each.call(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on leaky map
      if(isObject(a) && !isExtensible(a)){
        var result = frozenStore(this)[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.collection":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection.js","./$.collection-weak":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection-weak.js","./$.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.has.js","./$.is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.is-object.js","./$.redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.redefine.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.weak-set.js":[function(require,module,exports){
'use strict';
var weak = require('./$.collection-weak');

// 23.4 WeakSet Objects
require('./$.collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./$.collection":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection.js","./$.collection-weak":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection-weak.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.array.includes.js":[function(require,module,exports){
'use strict';
var $export   = require('./$.export')
  , $includes = require('./$.array-includes')(true);

$export($export.P, 'Array', {
  // https://github.com/domenic/Array.prototype.includes
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./$.add-to-unscopables')('includes');
},{"./$.add-to-unscopables":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.add-to-unscopables.js","./$.array-includes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.array-includes.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.map.to-json.js":[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./$.export');

$export($export.P, 'Map', {toJSON: require('./$.collection-to-json')('Map')});
},{"./$.collection-to-json":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection-to-json.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.object.entries.js":[function(require,module,exports){
// http://goo.gl/XkBrjD
var $export  = require('./$.export')
  , $entries = require('./$.object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.object-to-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-to-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":[function(require,module,exports){
// https://gist.github.com/WebReflection/9353781
var $          = require('./$')
  , $export    = require('./$.export')
  , ownKeys    = require('./$.own-keys')
  , toIObject  = require('./$.to-iobject')
  , createDesc = require('./$.property-desc');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , setDesc = $.setDesc
      , getDesc = $.getDesc
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key, D;
    while(keys.length > i){
      D = getDesc(O, key = keys[i++]);
      if(key in result)setDesc(result, key, createDesc(0, D));
      else result[key] = D;
    } return result;
  }
});
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.own-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.own-keys.js","./$.property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.property-desc.js","./$.to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.object.values.js":[function(require,module,exports){
// http://goo.gl/XkBrjD
var $export = require('./$.export')
  , $values = require('./$.object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.object-to-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.object-to-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.regexp.escape.js":[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./$.export')
  , $re     = require('./$.replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.replacer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.replacer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.set.to-json.js":[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./$.export');

$export($export.P, 'Set', {toJSON: require('./$.collection-to-json')('Set')});
},{"./$.collection-to-json":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.collection-to-json.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.at.js":[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./$.export')
  , $at     = require('./$.string-at')(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.string-at":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-at.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.pad-left.js":[function(require,module,exports){
'use strict';
var $export = require('./$.export')
  , $pad    = require('./$.string-pad');

$export($export.P, 'String', {
  padLeft: function padLeft(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.string-pad":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-pad.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.pad-right.js":[function(require,module,exports){
'use strict';
var $export = require('./$.export')
  , $pad    = require('./$.string-pad');

$export($export.P, 'String', {
  padRight: function padRight(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.string-pad":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-pad.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.trim-left.js":[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./$.string-trim')('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
});
},{"./$.string-trim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-trim.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.trim-right.js":[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./$.string-trim')('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
});
},{"./$.string-trim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.string-trim.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/js.array.statics.js":[function(require,module,exports){
// JavaScript 1.6 / Strawman array statics shim
var $       = require('./$')
  , $export = require('./$.export')
  , $ctx    = require('./$.ctx')
  , $Array  = require('./$.core').Array || Array
  , statics = {};
var setStatics = function(keys, length){
  $.each.call(keys.split(','), function(key){
    if(length == undefined && key in $Array)statics[key] = $Array[key];
    else if(key in [])statics[key] = $ctx(Function.call, [][key], length);
  });
};
setStatics('pop,reverse,shift,keys,values,entries', 1);
setStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
setStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
           'reduce,reduceRight,copyWithin,fill');
$export($export.S, 'Array', statics);
},{"./$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.js","./$.core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.core.js","./$.ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.ctx.js","./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/web.dom.iterable.js":[function(require,module,exports){
require('./es6.array.iterator');
var global      = require('./$.global')
  , hide        = require('./$.hide')
  , Iterators   = require('./$.iterators')
  , ITERATOR    = require('./$.wks')('iterator')
  , NL          = global.NodeList
  , HTC         = global.HTMLCollection
  , NLProto     = NL && NL.prototype
  , HTCProto    = HTC && HTC.prototype
  , ArrayValues = Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
if(NLProto && !NLProto[ITERATOR])hide(NLProto, ITERATOR, ArrayValues);
if(HTCProto && !HTCProto[ITERATOR])hide(HTCProto, ITERATOR, ArrayValues);
},{"./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.hide.js","./$.iterators":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.iterators.js","./$.wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.wks.js","./es6.array.iterator":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.iterator.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/web.immediate.js":[function(require,module,exports){
var $export = require('./$.export')
  , $task   = require('./$.task');
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.task":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.task.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/web.timers.js":[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = require('./$.global')
  , $export    = require('./$.export')
  , invoke     = require('./$.invoke')
  , partial    = require('./$.partial')
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"./$.export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.export.js","./$.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.global.js","./$.invoke":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.invoke.js","./$.partial":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.partial.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/shim.js":[function(require,module,exports){
require('./modules/es5');
require('./modules/es6.symbol');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.number.constructor');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.iterator');
require('./modules/es6.array.species');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-left');
require('./modules/es7.string.pad-right');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.regexp.escape');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/js.array.statics');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/$.core');
},{"./modules/$.core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/$.core.js","./modules/es5":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es5.js","./modules/es6.array.copy-within":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.copy-within.js","./modules/es6.array.fill":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.fill.js","./modules/es6.array.find":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.find.js","./modules/es6.array.find-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.find-index.js","./modules/es6.array.from":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.from.js","./modules/es6.array.iterator":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.iterator.js","./modules/es6.array.of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.of.js","./modules/es6.array.species":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.species.js","./modules/es6.function.has-instance":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.function.has-instance.js","./modules/es6.function.name":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.function.name.js","./modules/es6.map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.map.js","./modules/es6.math.acosh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.acosh.js","./modules/es6.math.asinh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.asinh.js","./modules/es6.math.atanh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.atanh.js","./modules/es6.math.cbrt":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.cbrt.js","./modules/es6.math.clz32":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.clz32.js","./modules/es6.math.cosh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.cosh.js","./modules/es6.math.expm1":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.expm1.js","./modules/es6.math.fround":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.fround.js","./modules/es6.math.hypot":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.hypot.js","./modules/es6.math.imul":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.imul.js","./modules/es6.math.log10":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.log10.js","./modules/es6.math.log1p":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.log1p.js","./modules/es6.math.log2":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.log2.js","./modules/es6.math.sign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.sign.js","./modules/es6.math.sinh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.sinh.js","./modules/es6.math.tanh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.tanh.js","./modules/es6.math.trunc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.trunc.js","./modules/es6.number.constructor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.constructor.js","./modules/es6.number.epsilon":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.epsilon.js","./modules/es6.number.is-finite":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-finite.js","./modules/es6.number.is-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-integer.js","./modules/es6.number.is-nan":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-nan.js","./modules/es6.number.is-safe-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-safe-integer.js","./modules/es6.number.max-safe-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.max-safe-integer.js","./modules/es6.number.min-safe-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.min-safe-integer.js","./modules/es6.number.parse-float":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.parse-float.js","./modules/es6.number.parse-int":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.parse-int.js","./modules/es6.object.assign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.assign.js","./modules/es6.object.freeze":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.freeze.js","./modules/es6.object.get-own-property-descriptor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.get-own-property-descriptor.js","./modules/es6.object.get-own-property-names":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.get-own-property-names.js","./modules/es6.object.get-prototype-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.get-prototype-of.js","./modules/es6.object.is":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is.js","./modules/es6.object.is-extensible":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is-extensible.js","./modules/es6.object.is-frozen":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is-frozen.js","./modules/es6.object.is-sealed":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is-sealed.js","./modules/es6.object.keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.keys.js","./modules/es6.object.prevent-extensions":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.prevent-extensions.js","./modules/es6.object.seal":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.seal.js","./modules/es6.object.set-prototype-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.set-prototype-of.js","./modules/es6.object.to-string":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.to-string.js","./modules/es6.promise":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.promise.js","./modules/es6.reflect.apply":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.apply.js","./modules/es6.reflect.construct":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.construct.js","./modules/es6.reflect.define-property":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.define-property.js","./modules/es6.reflect.delete-property":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.delete-property.js","./modules/es6.reflect.enumerate":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.enumerate.js","./modules/es6.reflect.get":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.get.js","./modules/es6.reflect.get-own-property-descriptor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js","./modules/es6.reflect.get-prototype-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.get-prototype-of.js","./modules/es6.reflect.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.has.js","./modules/es6.reflect.is-extensible":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.is-extensible.js","./modules/es6.reflect.own-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.own-keys.js","./modules/es6.reflect.prevent-extensions":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.prevent-extensions.js","./modules/es6.reflect.set":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.set.js","./modules/es6.reflect.set-prototype-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.set-prototype-of.js","./modules/es6.regexp.constructor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.constructor.js","./modules/es6.regexp.flags":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.flags.js","./modules/es6.regexp.match":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.match.js","./modules/es6.regexp.replace":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.replace.js","./modules/es6.regexp.search":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.search.js","./modules/es6.regexp.split":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.split.js","./modules/es6.set":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.set.js","./modules/es6.string.code-point-at":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.code-point-at.js","./modules/es6.string.ends-with":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.ends-with.js","./modules/es6.string.from-code-point":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.from-code-point.js","./modules/es6.string.includes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.includes.js","./modules/es6.string.iterator":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.iterator.js","./modules/es6.string.raw":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.raw.js","./modules/es6.string.repeat":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.repeat.js","./modules/es6.string.starts-with":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.starts-with.js","./modules/es6.string.trim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.trim.js","./modules/es6.symbol":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.symbol.js","./modules/es6.weak-map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.weak-map.js","./modules/es6.weak-set":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.weak-set.js","./modules/es7.array.includes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.array.includes.js","./modules/es7.map.to-json":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.map.to-json.js","./modules/es7.object.entries":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.object.entries.js","./modules/es7.object.get-own-property-descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.object.get-own-property-descriptors.js","./modules/es7.object.values":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.object.values.js","./modules/es7.regexp.escape":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.regexp.escape.js","./modules/es7.set.to-json":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.set.to-json.js","./modules/es7.string.at":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.at.js","./modules/es7.string.pad-left":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.pad-left.js","./modules/es7.string.pad-right":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.pad-right.js","./modules/es7.string.trim-left":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.trim-left.js","./modules/es7.string.trim-right":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.trim-right.js","./modules/js.array.statics":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/js.array.statics.js","./modules/web.dom.iterable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/web.dom.iterable.js","./modules/web.immediate":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/web.immediate.js","./modules/web.timers":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/web.timers.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/debug/browser.js":[function(require,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"./debug":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/debug/debug.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/debug/debug.js":[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/ms/index.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-errors/lib/index.js":[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var debug = require('debug')('feathers-errors');

// NOTE (EK): Babel doesn't properly support extending
// some classes in ES6. The Error class being one of them.
// Node v5.0+ does support this but until we want to drop support
// for older versions we need this hack.
// http://stackoverflow.com/questions/33870684/why-doesnt-instanceof-work-on-instances-of-error-subclasses-under-babel-node
// https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend

var FeathersError = (function (_extendableBuiltin2) {
  _inherits(FeathersError, _extendableBuiltin2);

  function FeathersError(msg, name, code, className, data) {
    _classCallCheck(this, FeathersError);

    msg = msg || 'Error';

    var errors = undefined;
    var message = undefined;
    var newData = undefined;

    if (msg instanceof Error) {
      message = msg.message || 'Error';

      // NOTE (EK): This is typically to handle validation errors
      if (msg.errors) {
        errors = msg.errors;
      }
    }
    // Support plain old objects
    else if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
        message = msg.message || 'Error';
        data = msg;
      }
      // message is just a string
      else {
          message = msg;
        }

    if (data) {
      // NOTE(EK): To make sure that we are not messing
      // with immutable data, just make a copy.
      // https://github.com/feathersjs/feathers-errors/issues/19
      newData = _extends({}, data);

      if (newData.errors) {
        errors = newData.errors;
        delete newData.errors;
      }
    }

    // NOTE (EK): Babel doesn't support this so
    // we have to pass in the class name manually.
    // this.name = this.constructor.name;

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FeathersError).call(this, message));

    _this.type = 'FeathersError';
    _this.name = name;
    _this.message = message;
    _this.code = code;
    _this.className = className;
    _this.data = newData;
    _this.errors = errors || {};

    debug(_this.name + '(' + _this.code + '): ' + _this.message);
    return _this;
  }

  // NOTE (EK): A little hack to get around `message` not
  // being included in the default toJSON call.

  _createClass(FeathersError, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        name: this.name,
        message: this.message,
        code: this.code,
        className: this.className,
        data: this.data,
        errors: this.errors
      };
    }
  }]);

  return FeathersError;
})(_extendableBuiltin(Error));

var BadRequest = (function (_FeathersError) {
  _inherits(BadRequest, _FeathersError);

  function BadRequest(message, data) {
    _classCallCheck(this, BadRequest);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BadRequest).call(this, message, 'BadRequest', 400, 'bad-request', data));
  }

  return BadRequest;
})(FeathersError);

var NotAuthenticated = (function (_FeathersError2) {
  _inherits(NotAuthenticated, _FeathersError2);

  function NotAuthenticated(message, data) {
    _classCallCheck(this, NotAuthenticated);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotAuthenticated).call(this, message, 'NotAuthenticated', 401, 'not-authenticated', data));
  }

  return NotAuthenticated;
})(FeathersError);

var PaymentError = (function (_FeathersError3) {
  _inherits(PaymentError, _FeathersError3);

  function PaymentError(message, data) {
    _classCallCheck(this, PaymentError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PaymentError).call(this, message, 'PaymentError', 402, 'payment-error', data));
  }

  return PaymentError;
})(FeathersError);

var Forbidden = (function (_FeathersError4) {
  _inherits(Forbidden, _FeathersError4);

  function Forbidden(message, data) {
    _classCallCheck(this, Forbidden);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Forbidden).call(this, message, 'Forbidden', 403, 'forbidden', data));
  }

  return Forbidden;
})(FeathersError);

var NotFound = (function (_FeathersError5) {
  _inherits(NotFound, _FeathersError5);

  function NotFound(message, data) {
    _classCallCheck(this, NotFound);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotFound).call(this, message, 'NotFound', 404, 'not-found', data));
  }

  return NotFound;
})(FeathersError);

var MethodNotAllowed = (function (_FeathersError6) {
  _inherits(MethodNotAllowed, _FeathersError6);

  function MethodNotAllowed(message, data) {
    _classCallCheck(this, MethodNotAllowed);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MethodNotAllowed).call(this, message, 'MethodNotAllowed', 405, 'method-not-allowed', data));
  }

  return MethodNotAllowed;
})(FeathersError);

var NotAcceptable = (function (_FeathersError7) {
  _inherits(NotAcceptable, _FeathersError7);

  function NotAcceptable(message, data) {
    _classCallCheck(this, NotAcceptable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotAcceptable).call(this, message, 'NotAcceptable', 406, 'not-acceptable', data));
  }

  return NotAcceptable;
})(FeathersError);

var Timeout = (function (_FeathersError8) {
  _inherits(Timeout, _FeathersError8);

  function Timeout(message, data) {
    _classCallCheck(this, Timeout);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Timeout).call(this, message, 'Timeout', 408, 'timeout', data));
  }

  return Timeout;
})(FeathersError);

var Conflict = (function (_FeathersError9) {
  _inherits(Conflict, _FeathersError9);

  function Conflict(message, data) {
    _classCallCheck(this, Conflict);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Conflict).call(this, message, 'Conflict', 409, 'conflict', data));
  }

  return Conflict;
})(FeathersError);

var Unprocessable = (function (_FeathersError10) {
  _inherits(Unprocessable, _FeathersError10);

  function Unprocessable(message, data) {
    _classCallCheck(this, Unprocessable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Unprocessable).call(this, message, 'Unprocessable', 422, 'unprocessable', data));
  }

  return Unprocessable;
})(FeathersError);

var GeneralError = (function (_FeathersError11) {
  _inherits(GeneralError, _FeathersError11);

  function GeneralError(message, data) {
    _classCallCheck(this, GeneralError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GeneralError).call(this, message, 'GeneralError', 500, 'general-error', data));
  }

  return GeneralError;
})(FeathersError);

var NotImplemented = (function (_FeathersError12) {
  _inherits(NotImplemented, _FeathersError12);

  function NotImplemented(message, data) {
    _classCallCheck(this, NotImplemented);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotImplemented).call(this, message, 'NotImplemented', 501, 'not-implemented', data));
  }

  return NotImplemented;
})(FeathersError);

var Unavailable = (function (_FeathersError13) {
  _inherits(Unavailable, _FeathersError13);

  function Unavailable(message, data) {
    _classCallCheck(this, Unavailable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Unavailable).call(this, message, 'Unavailable', 503, 'unavailable', data));
  }

  return Unavailable;
})(FeathersError);

var errors = {
  FeathersError: FeathersError,
  BadRequest: BadRequest,
  NotAuthenticated: NotAuthenticated,
  PaymentError: PaymentError,
  Forbidden: Forbidden,
  NotFound: NotFound,
  MethodNotAllowed: MethodNotAllowed,
  NotAcceptable: NotAcceptable,
  Timeout: Timeout,
  Conflict: Conflict,
  Unprocessable: Unprocessable,
  GeneralError: GeneralError,
  NotImplemented: NotImplemented,
  Unavailable: Unavailable
};

exports.default = _extends({ types: errors, errors: errors }, errors);
module.exports = exports['default'];
},{"debug":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/debug/browser.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-memory/lib/index.js":[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = init;

var _uberproto = require('uberproto');

var _uberproto2 = _interopRequireDefault(_uberproto);

var _feathersQueryFilters = require('feathers-query-filters');

var _feathersQueryFilters2 = _interopRequireDefault(_feathersQueryFilters);

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (!global._babelPolyfill) {
  require('babel-polyfill');
}

var _ = {
  values: require('lodash/values'),
  isEmpty: require('lodash/isEmpty'),
  where: require('lodash/filter'),
  extend: require('lodash/extend'),
  omit: require('lodash/omit'),
  pick: require('lodash/pick')
};

var Service = function () {
  function Service() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Service);

    this.paginate = options.paginate || {};
    this._id = options.idField || 'id';
    this._uId = options.startId || 0;
    this.store = options.store || {};
  }

  _createClass(Service, [{
    key: 'extend',
    value: function extend(obj) {
      return _uberproto2.default.extend(obj, this);
    }

    // Find without hooks and mixins that can be used internally and always returns
    // a pagination object

  }, {
    key: '_find',
    value: function _find(params) {
      var getFilter = arguments.length <= 1 || arguments[1] === undefined ? _feathersQueryFilters2.default : arguments[1];

      var query = params.query || {};
      var filters = getFilter(query);

      var values = (0, _utils.filterSpecials)(_.values(this.store), query);

      if (!_.isEmpty(query)) {
        values = _.where(values, query);
      }

      var total = values.length;

      if (filters.$sort) {
        values.sort((0, _utils.sorter)(filters.$sort));
      }

      if (filters.$skip) {
        values = values.slice(filters.$skip);
      }

      if (filters.$limit) {
        values = values.slice(0, filters.$limit);
      }

      if (filters.$select) {
        values = values.map(function (value) {
          return _.pick(value, filters.$select);
        });
      }

      return Promise.resolve({
        total: total,
        limit: filters.$limit,
        skip: filters.$skip || 0,
        data: values
      });
    }
  }, {
    key: 'find',
    value: function find(params) {
      var _this = this;

      // Call the internal find with query parameter that include pagination
      var result = this._find(params, function (query) {
        return (0, _feathersQueryFilters2.default)(query, _this.paginate);
      });

      if (!this.paginate.default) {
        return result.then(function (page) {
          return page.data;
        });
      }

      return result;
    }
  }, {
    key: 'get',
    value: function get(id) {
      if (id in this.store) {
        return Promise.resolve(this.store[id]);
      }

      return Promise.reject(new _feathersErrors2.default.NotFound('No record found for id \'' + id + '\''));
    }

    // Create without hooks and mixins that can be used internally

  }, {
    key: '_create',
    value: function _create(data) {
      var id = data[this._id] || this._uId++;
      var current = _.extend({}, data, _defineProperty({}, this._id, id));

      if (this.store[id]) {
        return Promise.reject(new _feathersErrors2.default.Conflict('A record with id: ' + id + ' already exists'));
      }

      return Promise.resolve(this.store[id] = current);
    }
  }, {
    key: 'create',
    value: function create(data) {
      var _this2 = this;

      if (Array.isArray(data)) {
        return Promise.all(data.map(function (current) {
          return _this2._create(current);
        }));
      }

      return this._create(data);
    }

    // Update without hooks and mixins that can be used internally

  }, {
    key: '_update',
    value: function _update(id, data) {
      if (id in this.store) {
        data = _.extend({}, data, _defineProperty({}, this._id, id));
        this.store[id] = data;

        return Promise.resolve(this.store[id]);
      }

      return Promise.reject(new _feathersErrors2.default.NotFound('No record found for id \'' + id + '\''));
    }
  }, {
    key: 'update',
    value: function update(id, data) {
      if (id === null || Array.isArray(data)) {
        return Promise.reject(new _feathersErrors2.default.BadRequest('You can not replace multiple instances. Did you mean \'patch\'?'));
      }

      return this._update(id, data);
    }

    // Patch without hooks and mixins that can be used internally

  }, {
    key: '_patch',
    value: function _patch(id, data) {
      if (id in this.store) {
        _.extend(this.store[id], _.omit(data, this._id));

        return Promise.resolve(this.store[id]);
      }

      return Promise.reject(new _feathersErrors2.default.NotFound('No record found for id \'' + id + '\''));
    }
  }, {
    key: 'patch',
    value: function patch(id, data, params) {
      var _this3 = this;

      if (id === null) {
        return this._find(params).then(function (page) {
          return Promise.all(page.data.map(function (current) {
            return _this3._patch(current[_this3._id], data, params);
          }));
        });
      }

      return this._patch(id, data, params);
    }

    // Remove without hooks and mixins that can be used internally

  }, {
    key: '_remove',
    value: function _remove(id) {
      if (id in this.store) {
        var deleted = this.store[id];
        delete this.store[id];

        return Promise.resolve(deleted);
      }

      return Promise.reject(new _feathersErrors2.default.NotFound('No record found for id \'' + id + '\''));
    }
  }, {
    key: 'remove',
    value: function remove(id, params) {
      var _this4 = this;

      if (id === null) {
        return this._find(params).then(function (page) {
          return Promise.all(page.data.map(function (current) {
            return _this4._remove(current[_this4._id]);
          }));
        });
      }

      return this._remove(id);
    }
  }]);

  return Service;
}();

function init(options) {
  return new Service(options);
}

init.Service = Service;
module.exports = exports['default'];
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-memory/lib/utils.js","babel-polyfill":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-polyfill/lib/index.js","feathers-errors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-errors/lib/index.js","feathers-query-filters":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-query-filters/lib/index.js","lodash/extend":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/extend.js","lodash/filter":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/filter.js","lodash/isEmpty":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isEmpty.js","lodash/omit":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/omit.js","lodash/pick":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/pick.js","lodash/values":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/values.js","uberproto":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/uberproto/lib/proto.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-memory/lib/utils.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterSpecials = filterSpecials;
exports.sorter = sorter;
var _ = {
  some: require('lodash/some'),
  isMatch: require('lodash/isMatch'),
  each: require('lodash/each'),
  isObject: require('lodash/isObject')
};

var specialFilters = exports.specialFilters = {
  $in: function $in(key, ins) {
    return function (current) {
      return ins.indexOf(current[key]) !== -1;
    };
  },
  $nin: function $nin(key, nins) {
    return function (current) {
      return nins.indexOf(current[key]) === -1;
    };
  },
  $lt: function $lt(key, value) {
    return function (current) {
      return current[key] < value;
    };
  },
  $lte: function $lte(key, value) {
    return function (current) {
      return current[key] <= value;
    };
  },
  $gt: function $gt(key, value) {
    return function (current) {
      return current[key] > value;
    };
  },
  $gte: function $gte(key, value) {
    return function (current) {
      return current[key] >= value;
    };
  },
  $ne: function $ne(key, value) {
    return function (current) {
      return current[key] !== value;
    };
  }
};

function filterSpecials(values, query) {
  if (query.$or) {
    values = values.filter(function (current) {
      return _.some(query.$or, function (or) {
        return _.isMatch(current, or);
      });
    });
    delete query.$or;
  }

  _.each(query, function (value, key) {
    if (_.isObject(value)) {
      _.each(value, function (target, prop) {
        if (specialFilters[prop]) {
          values = values.filter(specialFilters[prop](key, target));
        }
      });

      delete query[key];
    }
  });

  return values;
}

function sorter($sort) {
  return function (first, second) {
    var comparator = 0;
    _.each($sort, function (modifier, key) {
      modifier = parseInt(modifier, 10);

      if (first[key] < second[key]) {
        comparator -= 1 * modifier;
      }

      if (first[key] > second[key]) {
        comparator += 1 * modifier;
      }
    });
    return comparator;
  };
}
},{"lodash/each":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/each.js","lodash/isMatch":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isMatch.js","lodash/isObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js","lodash/some":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/some.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-query-filters/lib/index.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (query, paginate) {
  var filters = {
    $sort: query.$sort,
    $limit: getLimit(parse(query.$limit), paginate),
    $skip: parse(query.$skip),
    $select: query.$select,
    $populate: query.$populate
  };

  // Remove the params from the query's conditions.
  delete query.$sort;
  delete query.$limit;
  delete query.$skip;
  delete query.$select;
  delete query.$populate;

  return filters;
};

/**
 *
 *  Sets up the query properly if $limit, $skip, $sort, or $select is passed in params.
 *  Those same parameters are then removed from _conditions so that we aren't searching
 *  for data with a $limit parameter.
 */
function parse(number) {
  if (typeof number !== 'undefined') {
    return parseInt(number, 10);
  }
}

function getLimit(limit, paginate) {
  if (paginate && paginate.default) {
    return Math.min(limit || paginate.default, paginate.max || Number.MAX_VALUE);
  }

  return limit;
}

module.exports = exports['default'];
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Hash.js":[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Creates an hash object.
 *
 * @private
 * @constructor
 * @returns {Object} Returns the new hash object.
 */
function Hash() {}

// Avoid inheriting from `Object.prototype` when possible.
Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

module.exports = Hash;

},{"./_nativeCreate":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_nativeCreate.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js":[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getNative.js","./_root":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_MapCache.js":[function(require,module,exports){
var mapClear = require('./_mapClear'),
    mapDelete = require('./_mapDelete'),
    mapGet = require('./_mapGet'),
    mapHas = require('./_mapHas'),
    mapSet = require('./_mapSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function MapCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.clear();
  while (++index < length) {
    var entry = values[index];
    this.set(entry[0], entry[1]);
  }
}

// Add functions to the `MapCache`.
MapCache.prototype.clear = mapClear;
MapCache.prototype['delete'] = mapDelete;
MapCache.prototype.get = mapGet;
MapCache.prototype.has = mapHas;
MapCache.prototype.set = mapSet;

module.exports = MapCache;

},{"./_mapClear":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapClear.js","./_mapDelete":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapDelete.js","./_mapGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapGet.js","./_mapHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapHas.js","./_mapSet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapSet.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Reflect.js":[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Reflect = root.Reflect;

module.exports = Reflect;

},{"./_root":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Set.js":[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getNative.js","./_root":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_SetCache.js":[function(require,module,exports){
var MapCache = require('./_MapCache'),
    cachePush = require('./_cachePush');

/**
 *
 * Creates a set cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.push(values[index]);
  }
}

// Add functions to the `SetCache`.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

},{"./_MapCache":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_MapCache.js","./_cachePush":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_cachePush.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Stack.js":[function(require,module,exports){
var stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function Stack(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.clear();
  while (++index < length) {
    var entry = values[index];
    this.set(entry[0], entry[1]);
  }
}

// Add functions to the `Stack` cache.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

},{"./_stackClear":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackClear.js","./_stackDelete":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackDelete.js","./_stackGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackGet.js","./_stackHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackHas.js","./_stackSet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackSet.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Symbol.js":[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Uint8Array.js":[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_WeakMap.js":[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

},{"./_getNative":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getNative.js","./_root":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_apply.js":[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  var length = args.length;
  switch (length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayEach.js":[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayFilter.js":[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayIncludes.js":[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf');

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  return !!array.length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

},{"./_baseIndexOf":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIndexOf.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayIncludesWith.js":[function(require,module,exports){
/**
 * A specialized version of `_.includesWith` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayMap.js":[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayPush.js":[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayReduce.js":[function(require,module,exports){
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arraySome.js":[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assignValue.js":[function(require,module,exports){
var eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

module.exports = assignValue;

},{"./eq":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/eq.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocDelete.js":[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the associative array.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function assocDelete(array, key) {
  var index = assocIndexOf(array, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = array.length - 1;
  if (index == lastIndex) {
    array.pop();
  } else {
    splice.call(array, index, 1);
  }
  return true;
}

module.exports = assocDelete;

},{"./_assocIndexOf":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocIndexOf.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocGet.js":[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the associative array value for `key`.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function assocGet(array, key) {
  var index = assocIndexOf(array, key);
  return index < 0 ? undefined : array[index][1];
}

module.exports = assocGet;

},{"./_assocIndexOf":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocIndexOf.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocHas.js":[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if an associative array value for `key` exists.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function assocHas(array, key) {
  return assocIndexOf(array, key) > -1;
}

module.exports = assocHas;

},{"./_assocIndexOf":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocIndexOf.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocIndexOf.js":[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the first occurrence of `key` is found in `array`
 * of key-value pairs.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/eq.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocSet.js":[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the associative array `key` to `value`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 */
function assocSet(array, key, value) {
  var index = assocIndexOf(array, key);
  if (index < 0) {
    array.push([key, value]);
  } else {
    array[index][1] = value;
  }
}

module.exports = assocSet;

},{"./_assocIndexOf":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocIndexOf.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseCastFunction.js":[function(require,module,exports){
var identity = require('./identity');

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the array-like object.
 */
function baseCastFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = baseCastFunction;

},{"./identity":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/identity.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseCastPath.js":[function(require,module,exports){
var isArray = require('./isArray'),
    stringToPath = require('./_stringToPath');

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function baseCastPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

module.exports = baseCastPath;

},{"./_stringToPath":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stringToPath.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseDifference.js":[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    arrayMap = require('./_arrayMap'),
    baseUnary = require('./_baseUnary'),
    cacheHas = require('./_cacheHas');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support for
 * excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./_SetCache":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_SetCache.js","./_arrayIncludes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayIncludes.js","./_arrayIncludesWith":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayIncludesWith.js","./_arrayMap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayMap.js","./_baseUnary":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseUnary.js","./_cacheHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_cacheHas.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseEach.js":[function(require,module,exports){
var baseForOwn = require('./_baseForOwn'),
    createBaseEach = require('./_createBaseEach');

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./_baseForOwn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseForOwn.js","./_createBaseEach":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_createBaseEach.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFilter.js":[function(require,module,exports){
var baseEach = require('./_baseEach');

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;

},{"./_baseEach":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseEach.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFlatten.js":[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLikeObject = require('./isArrayLikeObject');

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, isStrict, result) {
  result || (result = []);

  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && isArrayLikeObject(value) &&
        (isStrict || isArray(value) || isArguments(value))) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"./_arrayPush":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayPush.js","./isArguments":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArguments.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./isArrayLikeObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLikeObject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFor.js":[function(require,module,exports){
var createBaseFor = require('./_createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./_createBaseFor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_createBaseFor.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseForOwn.js":[function(require,module,exports){
var baseFor = require('./_baseFor'),
    keys = require('./keys');

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"./_baseFor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFor.js","./keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keys.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseGet.js":[function(require,module,exports){
var baseCastPath = require('./_baseCastPath'),
    isKey = require('./_isKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path + ''] : baseCastPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./_baseCastPath":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseCastPath.js","./_isKey":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKey.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseHas.js":[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var getPrototypeOf = Object.getPrototypeOf;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return hasOwnProperty.call(object, key) ||
    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
}

module.exports = baseHas;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseHasIn.js":[function(require,module,exports){
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return key in Object(object);
}

module.exports = baseHasIn;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIndexOf.js":[function(require,module,exports){
var indexOfNaN = require('./_indexOfNaN');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./_indexOfNaN":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_indexOfNaN.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsEqual.js":[function(require,module,exports){
var baseIsEqualDeep = require('./_baseIsEqualDeep'),
    isObject = require('./isObject'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

module.exports = baseIsEqual;

},{"./_baseIsEqualDeep":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsEqualDeep.js","./isObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js","./isObjectLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsEqualDeep.js":[function(require,module,exports){
var Stack = require('./_Stack'),
    equalArrays = require('./_equalArrays'),
    equalByTag = require('./_equalByTag'),
    equalObjects = require('./_equalObjects'),
    getTag = require('./_getTag'),
    isArray = require('./isArray'),
    isHostObject = require('./_isHostObject'),
    isTypedArray = require('./isTypedArray');

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = getTag(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag, equalFunc, customizer, bitmask);
  }
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
  if (!isPartial) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, bitmask, stack);
}

module.exports = baseIsEqualDeep;

},{"./_Stack":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Stack.js","./_equalArrays":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalArrays.js","./_equalByTag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalByTag.js","./_equalObjects":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalObjects.js","./_getTag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getTag.js","./_isHostObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isHostObject.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./isTypedArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isTypedArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsMatch.js":[function(require,module,exports){
var Stack = require('./_Stack'),
    baseIsEqual = require('./_baseIsEqual');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack,
          result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;

      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./_Stack":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Stack.js","./_baseIsEqual":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsEqual.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIteratee.js":[function(require,module,exports){
var baseMatches = require('./_baseMatches'),
    baseMatchesProperty = require('./_baseMatchesProperty'),
    identity = require('./identity'),
    isArray = require('./isArray'),
    property = require('./property');

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  var type = typeof value;
  if (type == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (type == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;

},{"./_baseMatches":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseMatches.js","./_baseMatchesProperty":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseMatchesProperty.js","./identity":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/identity.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./property":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/property.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseKeys.js":[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = Object.keys;

/**
 * The base implementation of `_.keys` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  return nativeKeys(Object(object));
}

module.exports = baseKeys;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseKeysIn.js":[function(require,module,exports){
var Reflect = require('./_Reflect'),
    iteratorToArray = require('./_iteratorToArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var enumerate = Reflect ? Reflect.enumerate : undefined,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * The base implementation of `_.keysIn` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  object = object == null ? object : Object(object);

  var result = [];
  for (var key in object) {
    result.push(key);
  }
  return result;
}

// Fallback for IE < 9 with es6-shim.
if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
  baseKeysIn = function(object) {
    return iteratorToArray(enumerate(object));
  };
}

module.exports = baseKeysIn;

},{"./_Reflect":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Reflect.js","./_iteratorToArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_iteratorToArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseMatches.js":[function(require,module,exports){
var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData');

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    var key = matchData[0][0],
        value = matchData[0][1];

    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === value &&
        (value !== undefined || (key in Object(object)));
    };
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;

},{"./_baseIsMatch":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsMatch.js","./_getMatchData":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getMatchData.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseMatchesProperty.js":[function(require,module,exports){
var baseIsEqual = require('./_baseIsEqual'),
    get = require('./get'),
    hasIn = require('./hasIn');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, srcValue) {
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

module.exports = baseMatchesProperty;

},{"./_baseIsEqual":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsEqual.js","./get":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/get.js","./hasIn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/hasIn.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_basePick.js":[function(require,module,exports){
var arrayReduce = require('./_arrayReduce');

/**
 * The base implementation of `_.pick` without support for individual
 * property names.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property names to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return arrayReduce(props, function(result, key) {
    if (key in object) {
      result[key] = object[key];
    }
    return result;
  }, {});
}

module.exports = basePick;

},{"./_arrayReduce":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayReduce.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseProperty.js":[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_basePropertyDeep.js":[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;

},{"./_baseGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseGet.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseSlice.js":[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseSome.js":[function(require,module,exports){
var baseEach = require('./_baseEach');

/**
 * The base implementation of `_.some` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
 */
function baseSome(collection, predicate) {
  var result;

  baseEach(collection, function(value, index, collection) {
    result = predicate(value, index, collection);
    return !result;
  });
  return !!result;
}

module.exports = baseSome;

},{"./_baseEach":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseEach.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseTimes.js":[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseToPairs.js":[function(require,module,exports){
var arrayMap = require('./_arrayMap');

/**
 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
 * of key-value pairs for `object` corresponding to the property names of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the new array of key-value pairs.
 */
function baseToPairs(object, props) {
  return arrayMap(props, function(key) {
    return [key, object[key]];
  });
}

module.exports = baseToPairs;

},{"./_arrayMap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayMap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseUnary.js":[function(require,module,exports){
/**
 * The base implementation of `_.unary` without support for storing wrapper metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseValues.js":[function(require,module,exports){
var arrayMap = require('./_arrayMap');

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;

},{"./_arrayMap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayMap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_cacheHas.js":[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Checks if `value` is in `cache`.
 *
 * @private
 * @param {Object} cache The set cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function cacheHas(cache, value) {
  var map = cache.__data__;
  if (isKeyable(value)) {
    var data = map.__data__,
        hash = typeof value == 'string' ? data.string : data.hash;

    return hash[value] === HASH_UNDEFINED;
  }
  return map.has(value);
}

module.exports = cacheHas;

},{"./_isKeyable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_cachePush.js":[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the set cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var map = this.__data__;
  if (isKeyable(value)) {
    var data = map.__data__,
        hash = typeof value == 'string' ? data.string : data.hash;

    hash[value] = HASH_UNDEFINED;
  }
  else {
    map.set(value, HASH_UNDEFINED);
  }
}

module.exports = cachePush;

},{"./_isKeyable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_checkGlobal.js":[function(require,module,exports){
/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

module.exports = checkGlobal;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_copyObject.js":[function(require,module,exports){
var copyObjectWith = require('./_copyObjectWith');

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object) {
  return copyObjectWith(source, props, object);
}

module.exports = copyObject;

},{"./_copyObjectWith":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_copyObjectWith.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_copyObjectWith.js":[function(require,module,exports){
var assignValue = require('./_assignValue');

/**
 * This function is like `copyObject` except that it accepts a function to
 * customize copied values.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObjectWith(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : source[key];

    assignValue(object, key, newValue);
  }
  return object;
}

module.exports = copyObjectWith;

},{"./_assignValue":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assignValue.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_createAssigner.js":[function(require,module,exports){
var isIterateeCall = require('./_isIterateeCall'),
    rest = require('./rest');

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return rest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = typeof customizer == 'function'
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"./_isIterateeCall":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIterateeCall.js","./rest":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/rest.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_createBaseEach.js":[function(require,module,exports){
var isArrayLike = require('./isArrayLike');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./isArrayLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_createBaseFor.js":[function(require,module,exports){
/**
 * Creates a base function for methods like `_.forIn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalArrays.js":[function(require,module,exports){
var arraySome = require('./_arraySome');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} [stack] Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var index = -1,
      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked) {
    return stacked == other;
  }
  var result = true;
  stack.set(array, other);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isUnordered) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
          })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  return result;
}

module.exports = equalArrays;

},{"./_arraySome":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arraySome.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalByTag.js":[function(require,module,exports){
var Symbol = require('./_Symbol'),
    Uint8Array = require('./_Uint8Array'),
    mapToArray = require('./_mapToArray'),
    setToArray = require('./_setToArray');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = Symbol ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask) {
  switch (tag) {
    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object) ? other != +other : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      // Recursively compare objects (susceptible to call stack limits).
      return (isPartial || object.size == other.size) &&
        equalFunc(convert(object), convert(other), customizer, bitmask | UNORDERED_COMPARE_FLAG);

    case symbolTag:
      return !!Symbol && (symbolValueOf.call(object) == symbolValueOf.call(other));
  }
  return false;
}

module.exports = equalByTag;

},{"./_Symbol":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Symbol.js","./_Uint8Array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Uint8Array.js","./_mapToArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapToArray.js","./_setToArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_setToArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalObjects.js":[function(require,module,exports){
var baseHas = require('./_baseHas'),
    keys = require('./keys');

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : baseHas(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  return result;
}

module.exports = equalObjects;

},{"./_baseHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseHas.js","./keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keys.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getLength.js":[function(require,module,exports){
var baseProperty = require('./_baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./_baseProperty":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseProperty.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getMatchData.js":[function(require,module,exports){
var isStrictComparable = require('./_isStrictComparable'),
    toPairs = require('./toPairs');

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = toPairs(object),
      length = result.length;

  while (length--) {
    result[length][2] = isStrictComparable(result[length][1]);
  }
  return result;
}

module.exports = getMatchData;

},{"./_isStrictComparable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isStrictComparable.js","./toPairs":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toPairs.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getNative.js":[function(require,module,exports){
var isNative = require('./isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./isNative":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isNative.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getTag.js":[function(require,module,exports){
var Map = require('./_Map'),
    Set = require('./_Set'),
    WeakMap = require('./_WeakMap');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect maps, sets, and weakmaps. */
var mapCtorString = Map ? funcToString.call(Map) : '',
    setCtorString = Set ? funcToString.call(Set) : '',
    weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : '';

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
  return objectToString.call(value);
}

// Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
if ((Map && getTag(new Map) != mapTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : null,
        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case mapCtorString: return mapTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;

},{"./_Map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js","./_Set":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Set.js","./_WeakMap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_WeakMap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hasPath.js":[function(require,module,exports){
var baseCastPath = require('./_baseCastPath'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isIndex = require('./_isIndex'),
    isKey = require('./_isKey'),
    isLength = require('./isLength'),
    isString = require('./isString'),
    last = require('./last'),
    parent = require('./_parent');

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  if (object == null) {
    return false;
  }
  var result = hasFunc(object, path);
  if (!result && !isKey(path)) {
    path = baseCastPath(path);
    object = parent(object, path);
    if (object != null) {
      path = last(path);
      result = hasFunc(object, path);
    }
  }
  var length = object ? object.length : undefined;
  return result || (
    !!length && isLength(length) && isIndex(path, length) &&
    (isArray(object) || isString(object) || isArguments(object))
  );
}

module.exports = hasPath;

},{"./_baseCastPath":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseCastPath.js","./_isIndex":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIndex.js","./_isKey":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKey.js","./_parent":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_parent.js","./isArguments":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArguments.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./isLength":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isLength.js","./isString":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isString.js","./last":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/last.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashDelete.js":[function(require,module,exports){
var hashHas = require('./_hashHas');

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(hash, key) {
  return hashHas(hash, key) && delete hash[key];
}

module.exports = hashDelete;

},{"./_hashHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashHas.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashGet.js":[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @param {Object} hash The hash to query.
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(hash, key) {
  if (nativeCreate) {
    var result = hash[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_nativeCreate.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashHas.js":[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @param {Object} hash The hash to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(hash, key) {
  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
}

module.exports = hashHas;

},{"./_nativeCreate":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_nativeCreate.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashSet.js":[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 */
function hashSet(hash, key, value) {
  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
}

module.exports = hashSet;

},{"./_nativeCreate":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_nativeCreate.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_indexKeys.js":[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isLength = require('./isLength'),
    isString = require('./isString');

/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

module.exports = indexKeys;

},{"./_baseTimes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseTimes.js","./isArguments":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArguments.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./isLength":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isLength.js","./isString":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isString.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_indexOfNaN.js":[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isHostObject.js":[function(require,module,exports){
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

module.exports = isHostObject;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIndex.js":[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIterateeCall.js":[function(require,module,exports){
var eq = require('./eq'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject');

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;

},{"./_isIndex":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIndex.js","./eq":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/eq.js","./isArrayLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js","./isObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKey.js":[function(require,module,exports){
var isArray = require('./isArray');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (typeof value == 'number') {
    return true;
  }
  return !isArray(value) &&
    (reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object)));
}

module.exports = isKey;

},{"./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js":[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'number' || type == 'boolean' ||
    (type == 'string' && value != '__proto__') || value == null;
}

module.exports = isKeyable;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isPrototype.js":[function(require,module,exports){
var isFunction = require('./isFunction');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (isFunction(Ctor) && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{"./isFunction":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isFunction.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isStrictComparable.js":[function(require,module,exports){
var isObject = require('./isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"./isObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_iteratorToArray.js":[function(require,module,exports){
/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

module.exports = iteratorToArray;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapClear.js":[function(require,module,exports){
var Hash = require('./_Hash'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': Map ? new Map : [],
    'string': new Hash
  };
}

module.exports = mapClear;

},{"./_Hash":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Hash.js","./_Map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapDelete.js":[function(require,module,exports){
var Map = require('./_Map'),
    assocDelete = require('./_assocDelete'),
    hashDelete = require('./_hashDelete'),
    isKeyable = require('./_isKeyable');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapDelete(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
}

module.exports = mapDelete;

},{"./_Map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js","./_assocDelete":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocDelete.js","./_hashDelete":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashDelete.js","./_isKeyable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapGet.js":[function(require,module,exports){
var Map = require('./_Map'),
    assocGet = require('./_assocGet'),
    hashGet = require('./_hashGet'),
    isKeyable = require('./_isKeyable');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapGet(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map.get(key) : assocGet(data.map, key);
}

module.exports = mapGet;

},{"./_Map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js","./_assocGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocGet.js","./_hashGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashGet.js","./_isKeyable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapHas.js":[function(require,module,exports){
var Map = require('./_Map'),
    assocHas = require('./_assocHas'),
    hashHas = require('./_hashHas'),
    isKeyable = require('./_isKeyable');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapHas(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map.has(key) : assocHas(data.map, key);
}

module.exports = mapHas;

},{"./_Map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js","./_assocHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocHas.js","./_hashHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashHas.js","./_isKeyable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapSet.js":[function(require,module,exports){
var Map = require('./_Map'),
    assocSet = require('./_assocSet'),
    hashSet = require('./_hashSet'),
    isKeyable = require('./_isKeyable');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache object.
 */
function mapSet(key, value) {
  var data = this.__data__;
  if (isKeyable(key)) {
    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
  } else if (Map) {
    data.map.set(key, value);
  } else {
    assocSet(data.map, key, value);
  }
  return this;
}

module.exports = mapSet;

},{"./_Map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js","./_assocSet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocSet.js","./_hashSet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashSet.js","./_isKeyable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapToArray.js":[function(require,module,exports){
/**
 * Converts `map` to an array.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the converted array.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_nativeCreate.js":[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getNative.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_parent.js":[function(require,module,exports){
var baseSlice = require('./_baseSlice'),
    get = require('./get');

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
}

module.exports = parent;

},{"./_baseSlice":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseSlice.js","./get":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/get.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js":[function(require,module,exports){
(function (global){
var checkGlobal = require('./_checkGlobal');

/** Used to determine if values are of the language type `Object`. */
var objectTypes = {
  'function': true,
  'object': true
};

/** Detect free variable `exports`. */
var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
  ? exports
  : undefined;

/** Detect free variable `module`. */
var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
  ? module
  : undefined;

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(objectTypes[typeof self] && self);

/** Detect free variable `window`. */
var freeWindow = checkGlobal(objectTypes[typeof window] && window);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

/**
 * Used as a reference to the global object.
 *
 * The `this` value is used if it's the global object to avoid Greasemonkey's
 * restricted `window` object, otherwise the `window` object is used.
 */
var root = freeGlobal ||
  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
    freeSelf || thisGlobal || Function('return this')();

module.exports = root;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_checkGlobal":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_checkGlobal.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_setToArray.js":[function(require,module,exports){
/**
 * Converts `set` to an array.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the converted array.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackClear.js":[function(require,module,exports){
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = { 'array': [], 'map': null };
}

module.exports = stackClear;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackDelete.js":[function(require,module,exports){
var assocDelete = require('./_assocDelete');

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocDelete(array, key) : data.map['delete'](key);
}

module.exports = stackDelete;

},{"./_assocDelete":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocDelete.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackGet.js":[function(require,module,exports){
var assocGet = require('./_assocGet');

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocGet(array, key) : data.map.get(key);
}

module.exports = stackGet;

},{"./_assocGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocGet.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackHas.js":[function(require,module,exports){
var assocHas = require('./_assocHas');

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocHas(array, key) : data.map.has(key);
}

module.exports = stackHas;

},{"./_assocHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocHas.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackSet.js":[function(require,module,exports){
var MapCache = require('./_MapCache'),
    assocSet = require('./_assocSet');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache object.
 */
function stackSet(key, value) {
  var data = this.__data__,
      array = data.array;

  if (array) {
    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
      assocSet(array, key, value);
    } else {
      data.array = null;
      data.map = new MapCache(array);
    }
  }
  var map = data.map;
  if (map) {
    map.set(key, value);
  }
  return this;
}

module.exports = stackSet;

},{"./_MapCache":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_MapCache.js","./_assocSet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocSet.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stringToPath.js":[function(require,module,exports){
var toString = require('./toString');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
function stringToPath(string) {
  var result = [];
  toString(string).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

module.exports = stringToPath;

},{"./toString":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toString.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/assignIn.js":[function(require,module,exports){
var copyObject = require('./_copyObject'),
    createAssigner = require('./_createAssigner'),
    keysIn = require('./keysIn');

/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * function Bar() {
 *   this.d = 4;
 * }
 *
 * Foo.prototype.c = 3;
 * Bar.prototype.e = 5;
 *
 * _.assignIn({ 'a': 1 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
 */
var assignIn = createAssigner(function(object, source) {
  copyObject(source, keysIn(source), object);
});

module.exports = assignIn;

},{"./_copyObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_copyObject.js","./_createAssigner":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_createAssigner.js","./keysIn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keysIn.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/each.js":[function(require,module,exports){
module.exports = require('./forEach');

},{"./forEach":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/forEach.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/eq.js":[function(require,module,exports){
/**
 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/extend.js":[function(require,module,exports){
module.exports = require('./assignIn');

},{"./assignIn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/assignIn.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/filter.js":[function(require,module,exports){
var arrayFilter = require('./_arrayFilter'),
    baseFilter = require('./_baseFilter'),
    baseIteratee = require('./_baseIteratee'),
    isArray = require('./isArray');

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three arguments:
 * (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 */
function filter(collection, predicate) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = filter;

},{"./_arrayFilter":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayFilter.js","./_baseFilter":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFilter.js","./_baseIteratee":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIteratee.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/forEach.js":[function(require,module,exports){
var arrayEach = require('./_arrayEach'),
    baseCastFunction = require('./_baseCastFunction'),
    baseEach = require('./_baseEach'),
    isArray = require('./isArray');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length" property
 * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
 * for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(value) {
 *   console.log(value);
 * });
 * // => logs `1` then `2`
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'a' then 'b' (iteration order is not guaranteed)
 */
function forEach(collection, iteratee) {
  return (typeof iteratee == 'function' && isArray(collection))
    ? arrayEach(collection, iteratee)
    : baseEach(collection, baseCastFunction(iteratee));
}

module.exports = forEach;

},{"./_arrayEach":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayEach.js","./_baseCastFunction":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseCastFunction.js","./_baseEach":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseEach.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/get.js":[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined` the `defaultValue` is used in its place.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"./_baseGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseGet.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/hasIn.js":[function(require,module,exports){
var baseHasIn = require('./_baseHasIn'),
    hasPath = require('./_hasPath');

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b.c');
 * // => true
 *
 * _.hasIn(object, ['a', 'b', 'c']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return hasPath(object, path, baseHasIn);
}

module.exports = hasIn;

},{"./_baseHasIn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseHasIn.js","./_hasPath":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hasPath.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/identity.js":[function(require,module,exports){
/**
 * This method returns the first argument given to it.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArguments.js":[function(require,module,exports){
var isArrayLikeObject = require('./isArrayLikeObject');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

module.exports = isArguments;

},{"./isArrayLikeObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLikeObject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js":[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js":[function(require,module,exports){
var getLength = require('./_getLength'),
    isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null &&
    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./_getLength":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getLength.js","./isFunction":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isFunction.js","./isLength":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isLength.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLikeObject.js":[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

},{"./isArrayLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js","./isObjectLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isEmpty.js":[function(require,module,exports){
var isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLike = require('./isArrayLike'),
    isFunction = require('./isFunction'),
    isString = require('./isString');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is empty. A value is considered empty unless it's an
 * `arguments` object, array, string, or jQuery-like collection with a length
 * greater than `0` or an object with own enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {Array|Object|string} value The value to inspect.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (isArrayLike(value) &&
      (isArray(value) || isString(value) ||
        isFunction(value.splice) || isArguments(value))) {
    return !value.length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;

},{"./isArguments":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArguments.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./isArrayLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js","./isFunction":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isFunction.js","./isString":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isString.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isFunction.js":[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array constructors, and
  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

module.exports = isFunction;

},{"./isObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isLength.js":[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isMatch.js":[function(require,module,exports){
var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData');

/**
 * Performs a partial deep comparison between `object` and `source` to
 * determine if `object` contains equivalent property values. This method is
 * equivalent to a `_.matches` function when `source` is partially applied.
 *
 * **Note:** This method supports comparing the same values as `_.isEqual`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.isMatch(object, { 'age': 40 });
 * // => true
 *
 * _.isMatch(object, { 'age': 36 });
 * // => false
 */
function isMatch(object, source) {
  return object === source || baseIsMatch(object, source, getMatchData(source));
}

module.exports = isMatch;

},{"./_baseIsMatch":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsMatch.js","./_getMatchData":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getMatchData.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isNative.js":[function(require,module,exports){
var isFunction = require('./isFunction'),
    isHostObject = require('./_isHostObject'),
    isObjectLike = require('./isObjectLike');

/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(funcToString.call(value));
  }
  return isObjectLike(value) &&
    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
}

module.exports = isNative;

},{"./_isHostObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isHostObject.js","./isFunction":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isFunction.js","./isObjectLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js":[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js":[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isString.js":[function(require,module,exports){
var isArray = require('./isArray'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

module.exports = isString;

},{"./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./isObjectLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isSymbol.js":[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

module.exports = isSymbol;

},{"./isObjectLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isTypedArray.js":[function(require,module,exports){
var isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

module.exports = isTypedArray;

},{"./isLength":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isLength.js","./isObjectLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keys.js":[function(require,module,exports){
var baseHas = require('./_baseHas'),
    baseKeys = require('./_baseKeys'),
    indexKeys = require('./_indexKeys'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isPrototype = require('./_isPrototype');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  var isProto = isPrototype(object);
  if (!(isProto || isArrayLike(object))) {
    return baseKeys(object);
  }
  var indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  for (var key in object) {
    if (baseHas(object, key) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"./_baseHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseHas.js","./_baseKeys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseKeys.js","./_indexKeys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_indexKeys.js","./_isIndex":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIndex.js","./_isPrototype":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isPrototype.js","./isArrayLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keysIn.js":[function(require,module,exports){
var baseKeysIn = require('./_baseKeysIn'),
    indexKeys = require('./_indexKeys'),
    isIndex = require('./_isIndex'),
    isPrototype = require('./_isPrototype');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  var index = -1,
      isProto = isPrototype(object),
      props = baseKeysIn(object),
      propsLength = props.length,
      indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  while (++index < propsLength) {
    var key = props[index];
    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"./_baseKeysIn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseKeysIn.js","./_indexKeys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_indexKeys.js","./_isIndex":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIndex.js","./_isPrototype":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isPrototype.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/last.js":[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/omit.js":[function(require,module,exports){
var arrayMap = require('./_arrayMap'),
    baseDifference = require('./_baseDifference'),
    baseFlatten = require('./_baseFlatten'),
    basePick = require('./_basePick'),
    keysIn = require('./keysIn'),
    rest = require('./rest');

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable properties of `object` that are not omitted.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property names to omit, specified
 *  individually or in arrays.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = rest(function(object, props) {
  if (object == null) {
    return {};
  }
  props = arrayMap(baseFlatten(props, 1), String);
  return basePick(object, baseDifference(keysIn(object), props));
});

module.exports = omit;

},{"./_arrayMap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayMap.js","./_baseDifference":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseDifference.js","./_baseFlatten":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFlatten.js","./_basePick":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_basePick.js","./keysIn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keysIn.js","./rest":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/rest.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/pick.js":[function(require,module,exports){
var baseFlatten = require('./_baseFlatten'),
    basePick = require('./_basePick'),
    rest = require('./rest');

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property names to pick, specified
 *  individually or in arrays.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = rest(function(object, props) {
  return object == null ? {} : basePick(object, baseFlatten(props, 1));
});

module.exports = pick;

},{"./_baseFlatten":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFlatten.js","./_basePick":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_basePick.js","./rest":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/rest.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/property.js":[function(require,module,exports){
var baseProperty = require('./_baseProperty'),
    basePropertyDeep = require('./_basePropertyDeep'),
    isKey = require('./_isKey');

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

module.exports = property;

},{"./_baseProperty":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseProperty.js","./_basePropertyDeep":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_basePropertyDeep.js","./_isKey":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKey.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/rest.js":[function(require,module,exports){
var apply = require('./_apply'),
    toInteger = require('./toInteger');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.rest(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function rest(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, array);
      case 1: return func.call(this, args[0], array);
      case 2: return func.call(this, args[0], args[1], array);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

module.exports = rest;

},{"./_apply":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_apply.js","./toInteger":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toInteger.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/some.js":[function(require,module,exports){
var arraySome = require('./_arraySome'),
    baseIteratee = require('./_baseIteratee'),
    baseSome = require('./_baseSome'),
    isArray = require('./isArray'),
    isIterateeCall = require('./_isIterateeCall');

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
 * @example
 *
 * _.some([null, 0, 'yes', false], Boolean);
 * // => true
 *
 * var users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.some(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.some(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.some(users, 'active');
 * // => true
 */
function some(collection, predicate, guard) {
  var func = isArray(collection) ? arraySome : baseSome;
  if (guard && isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = some;

},{"./_arraySome":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arraySome.js","./_baseIteratee":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIteratee.js","./_baseSome":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseSome.js","./_isIterateeCall":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIterateeCall.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toInteger.js":[function(require,module,exports){
var toNumber = require('./toNumber');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3');
 * // => 3
 */
function toInteger(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  var remainder = value % 1;
  return value === value ? (remainder ? value - remainder : value) : 0;
}

module.exports = toInteger;

},{"./toNumber":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toNumber.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toNumber.js":[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObject = require('./isObject');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3);
 * // => 3
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3');
 * // => 3
 */
function toNumber(value) {
  if (isObject(value)) {
    var other = isFunction(value.valueOf) ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isFunction":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isFunction.js","./isObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toPairs.js":[function(require,module,exports){
var baseToPairs = require('./_baseToPairs'),
    keys = require('./keys');

/**
 * Creates an array of own enumerable key-value pairs for `object` which
 * can be consumed by `_.fromPairs`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.toPairs(new Foo);
 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
 */
function toPairs(object) {
  return baseToPairs(object, keys(object));
}

module.exports = toPairs;

},{"./_baseToPairs":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseToPairs.js","./keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keys.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toString.js":[function(require,module,exports){
var Symbol = require('./_Symbol'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = Symbol ? symbolProto.toString : undefined;

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  if (isSymbol(value)) {
    return Symbol ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toString;

},{"./_Symbol":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Symbol.js","./isSymbol":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isSymbol.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/values.js":[function(require,module,exports){
var baseValues = require('./_baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = values;

},{"./_baseValues":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseValues.js","./keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keys.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/ms/index.js":[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/uberproto/lib/proto.js":[function(require,module,exports){
/* global define */
/**
 * A base object for ECMAScript 5 style prototypal inheritance.
 *
 * @see https://github.com/rauschma/proto-js/
 * @see http://ejohn.org/blog/simple-javascript-inheritance/
 * @see http://uxebu.com/blog/2011/02/23/object-based-inheritance-for-ecmascript-5/
 */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Proto = factory();
	}
}(this, function () {

	function makeSuper(_super, old, name, fn) {
		return function () {
			var tmp = this._super;

			// Add a new ._super() method that is the same method
			// but either pointing to the prototype method
			// or to the overwritten method
			this._super = (typeof old === 'function') ? old : _super[name];

			// The method only need to be bound temporarily, so we
			// remove it when we're done executing
			var ret = fn.apply(this, arguments);
			this._super = tmp;

			return ret;
		};
	}

	function legacyMixin(prop, obj) {
		var self = obj || this;
		var fnTest = /\b_super\b/;
		var _super = Object.getPrototypeOf(self) || self.prototype;
		var _old;

		// Copy the properties over
		for (var name in prop) {
			// store the old function which would be overwritten
			_old = self[name];

			// Check if we're overwriting an existing function
			if(
					((
						typeof prop[name] === 'function' &&
						typeof _super[name] === 'function'
					) || (
						typeof _old === 'function' &&
						typeof prop[name] === 'function'
					)) && fnTest.test(prop[name])
			) {
				self[name] = makeSuper(_super, _old, name, prop[name]);
			} else {
				self[name] = prop[name];
			}
		}

		return self;
	}

	function es5Mixin(prop, obj) {
		var self = obj || this;
		var fnTest = /\b_super\b/;
		var _super = Object.getPrototypeOf(self) || self.prototype;
		var descriptors = {};
		var proto = prop;
		var processProperty = function(name) {
			if(!descriptors[name]) {
				descriptors[name] = Object.getOwnPropertyDescriptor(proto, name);
			}
		};

		// Collect all property descriptors
		do {
			Object.getOwnPropertyNames(proto).forEach(processProperty);
    } while((proto = Object.getPrototypeOf(proto)) && Object.getPrototypeOf(proto));
		
		Object.keys(descriptors).forEach(function(name) {
			var descriptor = descriptors[name];

			if(typeof descriptor.value === 'function' && fnTest.test(descriptor.value)) {
				descriptor.value = makeSuper(_super, self[name], name, descriptor.value);
			}

			Object.defineProperty(self, name, descriptor);
		});

		return self;
	}

	return {
		/**
		 * Create a new object using Object.create. The arguments will be
		 * passed to the new instances init method or to a method name set in
		 * __init.
		 */
		create: function () {
			var instance = Object.create(this);
			var init = typeof instance.__init === 'string' ? instance.__init : 'init';

			if (typeof instance[init] === 'function') {
				instance[init].apply(instance, arguments);
			}
			return instance;
		},
		/**
		 * Mixin a given set of properties
		 * @param prop The properties to mix in
		 * @param obj [optional] The object to add the mixin
		 */
		mixin: typeof Object.defineProperty === 'function' ? es5Mixin : legacyMixin,
		/**
		 * Extend the current or a given object with the given property
		 * and return the extended object.
		 * @param prop The properties to extend with
		 * @param obj [optional] The object to extend from
		 * @returns The extended object
		 */
		extend: function (prop, obj) {
			return this.mixin(prop, Object.create(obj || this));
		},
		/**
		 * Return a callback function with this set to the current or a given context object.
		 * @param name Name of the method to proxy
		 * @param args... [optional] Arguments to use for partial application
		 */
		proxy: function (name) {
			var fn = this[name];
			var args = Array.prototype.slice.call(arguments, 1);

			args.unshift(this);
			return fn.bind.apply(fn, args);
		}
	};

}));

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/src/index.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.default = init;

var _feathersMemory = require('feathers-memory');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocalStorage = function (_Service) {
  _inherits(LocalStorage, _Service);

  function LocalStorage() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, LocalStorage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LocalStorage).call(this, options));

    _this._storageKey = options.name || 'feathers';
    _this._storage = options.storage || typeof window !== 'undefined' && window.localStorage;
    _this._throttle = options.throttle || 200;
    _this.store = null;

    if (!_this._storage) {
      throw new Error('The `storage` option needs to be provided');
    }
    return _this;
  }

  _createClass(LocalStorage, [{
    key: 'ready',
    value: function ready() {
      var _this2 = this;

      if (!this.store) {
        return Promise.resolve(this._storage.getItem(this._storageKey)).then(function (str) {
          return JSON.parse(str || '{}');
        }).then(function (store) {
          var keys = Object.keys(store);
          var last = store[keys[keys.length - 1]];

          // Current id is the id of the last item
          _this2._uId = keys.length ? last[_this2._id] + 1 : 0;

          return _this2.store = store;
        });
      }

      return Promise.resolve(this.store);
    }
  }, {
    key: 'flush',
    value: function flush(data) {
      var _this3 = this;

      if (!this._timeout) {
        this._timeout = setTimeout(function () {
          _this3._storage.setItem(_this3._storageKey, JSON.stringify(_this3.store));
          delete _this3._timeout;
        }, this.throttle);
      }

      return data;
    }
  }, {
    key: 'execute',
    value: function execute(method) {
      var _this4 = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return this.ready().then(function () {
        var _get2;

        return (_get2 = _get(Object.getPrototypeOf(LocalStorage.prototype), method, _this4)).call.apply(_get2, [_this4].concat(args));
      });
    }
  }, {
    key: 'get',
    value: function get(id) {
      var _this5 = this;

      return this.ready().then(function () {
        return Promise.resolve(_this5.store[id]);
      });
    }
  }, {
    key: 'find',
    value: function find() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.execute.apply(this, ['find'].concat(args));
    }

    // Create without hooks and mixins that can be used internally

  }, {
    key: '_create',
    value: function _create(data) {
      var id = data[this._id] || this._uId + 1;

      // If the item already exists then just update it.
      if (this.store[id]) {
        return this.update(id, data);
      }

      // otherwise call our original _create method
      return _get(Object.getPrototypeOf(LocalStorage.prototype), '_create', this).call(this, data);
    }
  }, {
    key: 'create',
    value: function create() {
      var _this6 = this;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.execute.apply(this, ['create'].concat(args)).then(function (data) {
        return _this6.flush(data);
      });
    }
  }, {
    key: 'patch',
    value: function patch() {
      var _this7 = this;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this.execute.apply(this, ['patch'].concat(args)).then(function (data) {
        return _this7.flush(data);
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var _this8 = this;

      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this.execute.apply(this, ['update'].concat(args)).then(function (data) {
        return _this8.flush(data);
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this9 = this;

      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return this.execute.apply(this, ['remove'].concat(args)).then(function (data) {
        return _this9.flush(data);
      });
    }
  }]);

  return LocalStorage;
}(_feathersMemory.Service);

function init(options) {
  return new LocalStorage(options);
}

init.Service = _feathersMemory.Service;
module.exports = exports['default'];

},{"feathers-memory":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-memory/lib/index.js"}]},{},["/Users/eric/Development/feathersjs/feathers-localstorage/src/index.js"])("/Users/eric/Development/feathersjs/feathers-localstorage/src/index.js")
});