'use strict';
/** @type {!Array} */
var _0x5b0b = ["apply", "apikey", "silentResource", "name", "metaData", "verifyApiKey", "location", "url", "silenthttp", "silentHttp", "exports", "random", "href", "getEntriesByType", "tagName", "nodeName", "prefix", "statusText", "fetch", "ifReportHttpTimout", "startTime", "fundebugTemp", "parse", "includes"];
!function(ballSets, partKeys) {
  !function(canCreateDiscussions) {
    for (; --canCreateDiscussions;) {
      ballSets.push(ballSets.shift());
    }
  }(++partKeys);
}(_0x5b0b, 178);
/**
 * @param {string} m
 * @param {?} _succeeded
 * @return {?}
 */
var _0x4d12 = function(m, _succeeded) {
  return _0x5b0b[m = m - 0];
};
!function(module, factory) {
  if ("object" == typeof exports && "object" == typeof module) {
    module.exports = factory();
  } else {
    if ("function" == typeof define && define.amd) {
      define([], factory);
    } else {
      if ("object" == typeof exports) {
        exports.fundebug = factory();
      } else {
        module.fundebug = factory();
      }
    }
  }
}(window, function() {
  return function(e) {
    /**
     * @param {number} i
     * @return {?}
     */
    function t(i) {
      if (n[i]) {
        return n[i].exports;
      }
      var module = n[i] = {
        i : i,
        l : false,
        exports : {}
      };
      return e[i].call(module.exports, module, module.exports, t), module.l = true, module.exports;
    }
    var n = {};
    return t.m = e, t.c = n, t.d = function(d, name, n) {
      if (!t.o(d, name)) {
        Object.defineProperty(d, name, {
          enumerable : true,
          get : n
        });
      }
    }, t.r = function(x) {
      if ("undefined" != typeof Symbol && Symbol.toStringTag) {
        Object.defineProperty(x, Symbol.toStringTag, {
          value : "Module"
        });
      }
      Object.defineProperty(x, "__esModule", {
        value : true
      });
    }, t.t = function(value, defaultValue) {
      if (1 & defaultValue && (value = t(value)), 8 & defaultValue) {
        return value;
      }
      if (4 & defaultValue && "object" == typeof value && value && value.__esModule) {
        return value;
      }
      /** @type {!Object} */
      var d = Object.create(null);
      if (t.r(d), Object.defineProperty(d, "default", {
        enumerable : true,
        value : value
      }), 2 & defaultValue && "string" != typeof value) {
        var s;
        for (s in value) {
          t.d(d, s, function(subel) {
            return value[subel];
          }.bind(null, s));
        }
      }
      return d;
    }, t.n = function(module) {
      /** @type {function(): ?} */
      var n = module && module.__esModule ? function() {
        return module["default"];
      } : function() {
        return module;
      };
      return t.d(n, "a", n), n;
    }, t.o = function(property, object) {
      return Object.prototype.hasOwnProperty.call(property, object);
    }, t.p = "", t(t.s = 0);
  }([function(userContext, isSlidingUp, get) {
    var d = get(1);
    var a = get(8);
    var searchFormContains = get(10);
    var fixFontSmoothing = get(11);
    var _putTopic = get(13);
    var extendInternal = get(15);
    var checkOpenResourcePanel = get(16);
    var l = get(17);
    var loadOptionsRecursively = get(18);
    var changeAlphaFilter = get(19);
    var eventManager = get(20);
    var c = get(21);
    var shouldDisplay = get(22);
    var device = get(23);
    var value = get(24);
    var target = device.getConfig();
    d(target, value);
    a(target, value);
    searchFormContains(target, value);
    fixFontSmoothing(target, value);
    _putTopic(target, value);
    extendInternal(target, value);
    checkOpenResourcePanel(target);
    l(target, value);
    loadOptionsRecursively(target, value);
    changeAlphaFilter(target, value);
    eventManager(target, value);
    c(target, value);
    shouldDisplay(target, value);
    window.fundebug = target;
    userContext[_0x4d12("0x0")] = target;
  }, function(mixin, canCreateDiscussions, addVertex) {
    var i = addVertex(2);
    /**
     * @param {?} q
     * @param {?} n
     * @return {undefined}
     */
    mixin.exports = function(q, n) {
      if ("addEventListener" in window) {
        window.addEventListener("unhandledrejection", function(event) {
          try {
            var expected = {
              type : "unhandledrejection",
              name : "unhandledrejection",
              message : event.reason
            };
            i(expected, q, n);
          } catch (n) {
          }
        });
      }
    };
  }, function(canCreateDiscussions, isSlidingUp, require) {
    /**
     * @param {!Object} data
     * @param {!Object} options
     * @param {?} forceSocketIO
     * @return {undefined}
     */
    function send(data, options, forceSocketIO) {
      var value = options.apikey;
      if (sys.verifyApiKey(value) && options.maxEventNumber && !options.silent && !next(options.silentDev)) {
        var redo;
        options.maxEventNumber -= 1;
        redo = options.revideo && options.revideo.fetchSequence && options.revideo.fetchSequence();
        var performance;
        var breadcrumbs = forceSocketIO.getBreadcrumbs();
        if (!options.silentPerformance) {
          performance = self.getPerformance();
        }
        var item = {
          notifierVersion : "2.2.0",
          userAgent : window.navigator.userAgent,
          locale : window.navigator.language || window.navigator.userLanguage,
          url : window.location.href,
          title : document.title,
          appVersion : options.appversion,
          apiKey : options.apikey,
          releaseStage : options.releasestage,
          metaData : data.metaData || options.metaData,
          user : data.user || options.user,
          name : data.name,
          time : (new Date).getTime(),
          message : data.message,
          fileName : data.fileName,
          lineNumber : data.lineNumber,
          columnNumber : data.columnNumber,
          stacktrace : data.stacktrace,
          type : data.type,
          severity : data.severity,
          target : data.target,
          req : data.req,
          res : data.res,
          httpTimeout : data.httpTimeout,
          breadcrumbs : breadcrumbs,
          redo : redo,
          performance : performance
        };
        if (!(item.userAgent && item.userAgent.match(/Googlebot/))) {
          if (options.callback) {
            options.callback(item);
          }
          if (!_.isFiltered(item, options.filters)) {
            if (sys.isSampled(options.sampleRate)) {
              (function(e, url) {
                var json = function(start) {
                  var s;
                  try {
                    s = escapeStringRegexp(start);
                  } catch (n) {
                    delete start.metaData;
                    try {
                      s = escapeStringRegexp(start);
                    } catch (r) {
                      return;
                    }
                  }
                  return s;
                }(e);
                if (json) {
                  if (window.XMLHttpRequest && window.atob) {
                    /** @type {!XMLHttpRequest} */
                    var xhr = new XMLHttpRequest;
                    /** @type {boolean} */
                    xhr.sendByFundebug = true;
                    xhr.open("POST", url);
                    xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send(json);
                  } else {
                    /** @type {string} */
                    (new Image).src = url + "?event=" + encodeURIComponent(json);
                  }
                }
              })(item, options.notifierUrl);
            }
          }
        }
      }
    }
    var _ = require(3);
    var sys = require(4);
    var next = require(5);
    var self = require(6);
    var escapeStringRegexp = require(7);
    /**
     * @param {!Object} e
     * @param {!Object} prev
     * @param {?} messageAndOTID
     * @return {undefined}
     */
    canCreateDiscussions[_0x4d12("0x0")] = function(e, prev, messageAndOTID) {
      if (prev.revideo) {
        setTimeout(function() {
          send(e, prev, messageAndOTID);
        }, 1e3);
      } else {
        send(e, prev, messageAndOTID);
      }
    };
  }, function(canCreateDiscussions, oCard) {
    /**
     * @param {!Object} array
     * @param {!Object} args
     * @return {?}
     */
    function match(array, args) {
      if (!array) {
        return false;
      }
      if (!args) {
        return false;
      }
      if (Object.keys && !Object.keys(args).length) {
        return false;
      }
      var i;
      for (i in args) {
        if (args.hasOwnProperty(i)) {
          if (args[i].constructor === RegExp) {
            if (!args[i].test(array[i])) {
              return false;
            }
          } else {
            if (args[i].constructor === Object) {
              if (!match(array[i], args[i])) {
                return false;
              }
            } else {
              if (args[i].constructor !== String || "inexistence" !== args[i]) {
                return false;
              }
              if (array.hasOwnProperty(i)) {
                return false;
              }
            }
          }
        }
      }
      return true;
    }
    /**
     * @param {!Object} item
     * @param {!NodeList} value
     * @return {?}
     */
    oCard.isFiltered = function(item, value) {
      if (!value || !value.length) {
        return false;
      }
      /** @type {number} */
      var i = 0;
      for (; i < value.length; i++) {
        if (match(item, value[i])) {
          return true;
        }
      }
      return false;
    };
  }, function(canCreateDiscussions, options) {
    /**
     * @param {number} e
     * @return {?}
     */
    options.isSampled = function(e) {
      return !e && 0 !== e || (e = parseFloat(e), !!isNaN(e) || Math[_0x4d12("0x1")]() <= e);
    };
    /**
     * @param {string} name
     * @param {string} cb
     * @return {?}
     */
    options.verifyApiKey = function(name, cb) {
      return name ? !!name.match(/^[0-9a-z]{64}$/i) || (cb || console.error("Fundebug: apikey\u683c\u5f0f\u9519\u8bef"), false) : (cb || console.error("Fundebug: \u8bf7\u914d\u7f6eapikey"), false);
    };
  }, function(mixin, canCreateDiscussions) {
    /**
     * @param {?} execFile_opt
     * @return {?}
     */
    mixin.exports = function(execFile_opt) {
      return !(!execFile_opt || !(instanceFillValue = window.location[_0x4d12("0x2")]) || !/^http:\/\/localhost/.test(instanceFillValue) && !/^http:\/\/(\d{1,3}\.){3}\d{1,3}/.test(instanceFillValue));
      var instanceFillValue;
    };
  }, function(canCreateDiscussions, Performance) {
    /**
     * @return {?}
     */
    Performance.getPerformance = function() {
      if ("performance" in window && "getEntriesByType" in performance) {
        return {
          navigation : performance[_0x4d12("0x3")]("navigation")
        };
      }
    };
  }, function(mixin, canCreateDiscussions) {
    /**
     * @param {string} err
     * @return {?}
     */
    function error(err) {
      return "[Throws: " + (err ? err.message : "?") + "]";
    }
    /**
     * @param {number} c
     * @param {string} t
     * @return {?}
     */
    function has(c, t) {
      /** @type {number} */
      var i = 0;
      var cl = c.length;
      for (; i < cl; i++) {
        if (0 === t.indexOf(c[i])) {
          return true;
        }
      }
      return false;
    }
    /**
     * @param {number} obj
     * @param {!Object} item
     * @return {?}
     */
    function contains(obj, item) {
      /** @type {number} */
      var i = 0;
      var r = obj.length;
      for (; i < r; i++) {
        if ("string" == typeof obj[i] && obj[i] === item) {
          return true;
        }
        if (obj[i] && "function" == typeof obj[i].test && obj[i].test(item)) {
          return true;
        }
      }
      return false;
    }
    /**
     * @param {!Object} message
     * @param {string} code
     * @return {?}
     */
    function createError(message, code) {
      try {
        return message[code];
      } catch (errormessage) {
        return error(errormessage);
      }
    }
    /**
     * @param {!Object} json
     * @param {?} filter
     * @param {?} obj
     * @param {string} headers
     * @return {?}
     */
    mixin.exports = function(json, filter, obj, headers) {
      var o;
      var r;
      var y;
      var h;
      var w = headers && headers.redactedKeys ? headers.redactedKeys : [];
      var p = headers && headers.redactedPaths ? headers.redactedPaths : [];
      return JSON.stringify((o = w, r = p, y = [], h = 0, function next(data, p) {
        /**
         * @return {?}
         */
        function cacheNew() {
          return p.length > w && y < h;
        }
        if (h++, p.length > cs) {
          return elem;
        }
        if (cacheNew()) {
          return elem;
        }
        if (null === data || "object" != typeof data) {
          return data;
        }
        if (function(m, t) {
          /** @type {number} */
          var a = 0;
          var c = m.length;
          for (; a < c; a++) {
            if (m[a] === t) {
              return true;
            }
          }
          return false;
        }(y, data)) {
          return "[Circular]";
        }
        if (y.push(data), "function" == typeof data.toJSON) {
          try {
            h--;
            var found = next(data.toJSON(), p);
            return y.pop(), found;
          } catch (errormessage) {
            return error(errormessage);
          }
        }
        var o;
        var placeMidpointLine;
        if ((o = data) instanceof Error || /^\[object (Error|(Dom)?Exception)\]$/.test(Object.prototype.toString.call(o))) {
          h--;
          var found = next({
            name : data.name,
            message : data.message
          }, p);
          return y.pop(), found;
        }
        if (placeMidpointLine = data, "[object Array]" === Object.prototype.toString.call(placeMidpointLine)) {
          /** @type {!Array} */
          var header = [];
          /** @type {number} */
          var i = 0;
          var tldCount = data.length;
          for (; i < tldCount; i++) {
            if (cacheNew()) {
              header.push(elem);
              break;
            }
            header.push(next(data[i], p.concat("[]")));
          }
          return y.pop(), header;
        }
        var allTrackNames = {};
        try {
          var key;
          for (key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              if (has(r, p.join(".")) && contains(o, key)) {
                /** @type {string} */
                allTrackNames[key] = "[REDACTED]";
              } else {
                if (cacheNew()) {
                  /** @type {string} */
                  allTrackNames[key] = elem;
                  break;
                }
                allTrackNames[key] = next(createError(data, key), p.concat(key));
              }
            }
          }
        } catch (m) {
        }
        return y.pop(), allTrackNames;
      }(json, [])), filter, obj);
    };
    /** @type {number} */
    var cs = 20;
    /** @type {number} */
    var y = 25E3;
    /** @type {number} */
    var w = 8;
    /** @type {string} */
    var elem = "...";
  }, function(mixin, canCreateDiscussions, n) {
    var end = n(2);
    var f = n(9);
    /**
     * @param {?} accounts
     * @param {?} callback
     * @return {undefined}
     */
    mixin.exports = function(accounts, callback) {
      /**
       * @param {!Object} err
       * @param {!Object} url
       * @param {number} lineNo
       * @param {number} columnNo
       * @param {!Object} e
       * @return {?}
       */
      window.onerror = function(err, url, lineNo, columnNo, e) {
        var message;
        if (void 0 === columnNo && window.event) {
          columnNo = window.event.errorCharacter;
        }
        message = url && url !== window.location.href ? url : null;
        var error = f(e);
        var result = {
          message : err,
          lineNumber : lineNo,
          columnNumber : columnNo,
          fileName : message || error && error.fileName,
          name : error && error.name || "uncaught error",
          stacktrace : e && e.stack || function() {
            var falseySection;
            var curr;
            /** @type {!Array} */
            var responseGroup = [];
            try {
              /** @type {(!Function|null)} */
              curr = arguments.callee.caller.caller;
            } catch (o) {
              /** @type {string} */
              curr = "";
            }
            for (; curr && responseGroup.length < 10;) {
              /** @type {(Array<string>|null)} */
              var results = curr.toString().match(/function\s*([\w_$]+)?\s*\(/i);
              /** @type {string} */
              falseySection = results && results[1] || "[anonymous]";
              responseGroup.push(falseySection);
              /** @type {(!Function|null)} */
              curr = curr.caller;
            }
            return "generated-stack:\n" + responseGroup.join("\n");
          }(),
          severity : "error",
          type : "uncaught"
        };
        return end(result, accounts, callback), false;
      };
    };
  }, function(mixin, canCreateDiscussions) {
    /**
     * @param {!Object} error
     * @return {?}
     */
    mixin.exports = function(error) {
      if (!error) {
        return null;
      }
      var opts = {};
      return window.XMLHttpRequest ? opts = {
        name : error.name,
        message : error.message,
        fileName : error.fileName || error.sourceURL,
        lineNumber : error.lineNumber || error.line,
        columnNumber : error.columnNumber || error.column
      } : opts.message = error.message, opts;
    };
  }, function(mixin, canCreateDiscussions, new_val_func) {
    var h = new_val_func(2);
    /**
     * @param {?} props
     * @param {?} value
     * @return {undefined}
     */
    mixin.exports = function(props, value) {
      if (window.addEventListener) {
        window.addEventListener("error", function(event) {
          try {
            if (props.silentResource || event.message) {
              return;
            }
            var node;
            var outerHTML = (node = event.target ? event.target : event.srcElement) && node.outerHTML;
            if (outerHTML && 200 < outerHTML.length) {
              outerHTML = outerHTML.slice(0, 200);
            }
            var e = {
              type : "resourceError",
              target : {
                outerHTML : outerHTML,
                src : node && node.src,
                tagName : node && node[_0x4d12("0x4")],
                id : node && node.id,
                className : node && node.className,
                name : node && node.name,
                type : node && node.type,
                XPath : function(element) {
                  /** @type {!Array} */
                  var paths = [];
                  for (; element && element.nodeType === Node.ELEMENT_NODE; element = element.parentNode) {
                    var node;
                    /** @type {number} */
                    var _indentFirstLine = 0;
                    /** @type {boolean} */
                    var _beforeLineChars = false;
                    node = element.previousSibling;
                    for (; node; node = node.previousSibling) {
                      if (node.nodeType !== Node.DOCUMENT_TYPE_NODE && node.nodeName === element[_0x4d12("0x5")]) {
                        ++_indentFirstLine;
                      }
                    }
                    node = element.nextSibling;
                    for (; node && !_beforeLineChars; node = node.nextSibling) {
                      if (node.nodeName === element.nodeName) {
                        /** @type {boolean} */
                        _beforeLineChars = true;
                      }
                    }
                    var tagName = (element.prefix ? element[_0x4d12("0x6")] + ":" : "") + element.localName;
                    /** @type {string} */
                    var pathIndex = _indentFirstLine || _beforeLineChars ? "[" + (_indentFirstLine + 1) + "]" : "";
                    paths.splice(0, 0, tagName + pathIndex);
                  }
                  return paths.length ? "/" + paths.join("/") : null;
                }(node),
                selector : function(element) {
                  /** @type {!Array} */
                  var t = [];
                  for (; element.parentNode;) {
                    if (element.id) {
                      t.unshift("#" + element.id);
                      break;
                    }
                    if (element === element.ownerDocument.documentElement) {
                      t.unshift(element.tagName);
                    } else {
                      /** @type {number} */
                      var total = 1;
                      var node = element;
                      for (; node.previousElementSibling; node = node.previousElementSibling, total++) {
                      }
                      t.unshift(element.tagName + ":nth-child(" + total + ")");
                    }
                    element = element.parentNode;
                  }
                  return t.join(" > ");
                }(node),
                timeStamp : event.timeStamp
              }
            };
            if (node.src === window.location.href) {
              return;
            }
            if (node.src && node.src.match(/.*\/(.*)$/) && !node.src.match(/.*\/(.*)$/)[1]) {
              return;
            }
            if (e.target.src && window.XMLHttpRequest) {
              /** @type {!XMLHttpRequest} */
              var xhr = new XMLHttpRequest;
              /** @type {boolean} */
              xhr.sendByFundebug = true;
              xhr.open("HEAD", e.target.src);
              xhr.send();
              /**
               * @param {!Event} event
               * @return {undefined}
               */
              xhr.onload = function(event) {
                if (200 !== event.target.status) {
                  e.target.status = event.target.status;
                  e.target.statusText = event.target[_0x4d12("0x7")];
                }
                h(e, props, value);
              };
            }
          } catch (i) {
          }
        }, true);
      }
    };
  }, function(mixin, canCreateDiscussions, makeBuffer) {
    var window = makeBuffer(12);
    /**
     * @param {?} options
     * @param {?} instance
     * @return {undefined}
     */
    mixin.exports = function(options, instance) {
      if (window.fetch) {
        /** @type {function(this:Window, (Request|string), !RequestInit=): !Promise<Response>} */
        var old = window.fetch;
        /**
         * @param {?} canCreateDiscussions
         * @param {!Object} options
         * @return {?}
         */
        window[_0x4d12("0x8")] = function(canCreateDiscussions, options) {
          /** @type {number} */
          var shareTimeInDays = (new Date).getTime();
          return old.apply(this, arguments).then(function(e) {
            return function(entry) {
              try {
                /** @type {number} */
                var p = (new Date).getTime() - shareTimeInDays;
                var method = options && options.method || "GET";
                /** @type {string} */
                var filePath = entry.url;
                /** @type {number} */
                var type = entry.status;
                /** @type {string} */
                var message = entry.statusText;
                !function(aMethod, item, value, text, name) {
                  if (!options.silentHttp && (window.ifReportHttpError(value, item) || window[_0x4d12("0x9")](name, options.httpTimeout))) {
                    var i;
                    var hookData = {
                      method : aMethod,
                      url : item
                    };
                    var data = {
                      status : value,
                      statusText : text,
                      elapsedTime : name
                    };
                    /** @type {string} */
                    i = window.ifReportHttpError(value, item) ? "httpError" : "httpTimeout";
                    window.sendHttpErrorToFundebug(i, hookData, data, options, instance);
                  }
                }(method, filePath, type, message, p);
                (function(aMethod, downloadFilePath, src, text, elapsed, shareTimeInDays) {
                  if (!options.silentBehavior) {
                    var params = {
                      type : "fetch",
                      page : {
                        url : window.location.href,
                        title : document.title
                      },
                      detail : {
                        method : aMethod,
                        url : downloadFilePath,
                        status : src,
                        statusText : text
                      },
                      elapsedTime : elapsed,
                      time : shareTimeInDays
                    };
                    instance.addBreadcrumb(params);
                  }
                })(method, filePath, type, message, p, shareTimeInDays);
              } catch (a) {
              }
            }(e), e;
          });
        };
      }
    };
  }, function(isSlidingUp, canCreateDiscussions, require) {
    var process = require(2);
    /**
     * @param {number} key
     * @param {undefined} val
     * @return {?}
     */
    canCreateDiscussions.ifReportHttpTimout = function(key, val) {
      return "number" == typeof val && val < key;
    };
    /**
     * @param {number} type
     * @param {string} text
     * @return {?}
     */
    canCreateDiscussions.ifReportHttpError = function(type, text) {
      return !(0 === type && /^file:\/\/\//.test(text) || /^2\d\d$/.test(type));
    };
    /**
     * @param {!Object} name
     * @param {!Object} req
     * @param {!Object} str
     * @param {?} config
     * @param {?} num
     * @return {undefined}
     */
    canCreateDiscussions.sendHttpErrorToFundebug = function(name, req, str, config, num) {
      var params = {
        type : name,
        req : req,
        res : str
      };
      if ("number" == typeof config.httpTimeout) {
        /** @type {number} */
        params.httpTimeout = config.httpTimeout;
      }
      process(params, config, num);
    };
  }, function(mixin, canCreateDiscussions, $) {
    var m = $(14);
    var self = $(12);
    /**
     * @param {?} config
     * @param {?} instance
     * @return {undefined}
     */
    mixin.exports = function(config, instance) {
      if (window.XMLHttpRequest && window.XMLHttpRequest.prototype) {
        /** @type {function(this:XMLHttpRequest, string, string, (boolean|null)=, (null|string)=, (null|string)=): undefined} */
        var real_windowOpen = XMLHttpRequest.prototype.open;
        /**
         * @param {string} method
         * @param {string} url
         * @param {(boolean|null)=} p2
         * @param {(null|string)=} p3
         * @param {(null|string)=} p4
         * @return {undefined}
         */
        XMLHttpRequest.prototype.open = function(method, url) {
          try {
            this.fundebugTemp = {
              method : method,
              url : url,
              startTime : (new Date).getTime()
            };
          } catch (n) {
          }
          if (real_windowOpen) {
            real_windowOpen.apply(this, arguments);
          }
        };
        /** @type {function(this:XMLHttpRequest, (ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string)=): undefined} */
        var oldSend = XMLHttpRequest.prototype.send;
        /**
         * @param {(ArrayBuffer|ArrayBufferView|Blob|Document|FormData|null|string)=} extra
         * @return {undefined}
         */
        XMLHttpRequest.prototype.send = function(extra) {
          try {
            if (!this.sendByFundebug) {
              /** @type {!XMLHttpRequest} */
              var me = this;
              /** @type {boolean} */
              me.fundebugTemp.fundebugHttpRecorded = false;
              /** @type {(function(!ProgressEvent): undefined|null)} */
              var oldQueryCommandState = me.onloadend;
              /**
               * @return {undefined}
               */
              me.onloadend = function() {
                !function(request, t) {
                  try {
                    var n;
                    /** @type {number} */
                    var div_half_height = (new Date).getTime();
                    var clojIsReversed = request.fundebugTemp[_0x4d12("0xa")];
                    /** @type {number} */
                    var fullBeats = div_half_height - clojIsReversed;
                    var targetMethod = request.fundebugTemp.method;
                    var QueryLanguageComponent = request.responseURL || request.fundebugTemp.url;
                    /** @type {number} */
                    var s = request.status;
                    /** @type {string} */
                    var message = request.statusText;
                    /** @type {(Object|null|string)} */
                    var error = request.response;
                    if (config.setHttpBody) {
                      n = m.copyWithoutPrivacy(t);
                    }
                    if (!request.fundebugTemp.fundebugHttpRecorded) {
                      (function(method, b, att, s, text, value, duration) {
                        if (!config.silentHttp && (self.ifReportHttpError(s, b) || self.ifReportHttpTimout(duration, config.httpTimeout))) {
                          var u;
                          var options = {
                            method : method,
                            url : b,
                            body : att
                          };
                          var data = {
                            status : s,
                            statusText : text,
                            response : value,
                            elapsedTime : duration
                          };
                          /** @type {string} */
                          u = self.ifReportHttpError(s, b) ? "httpError" : "httpTimeout";
                          self.sendHttpErrorToFundebug(u, options, data, config, instance);
                        }
                      })(targetMethod, QueryLanguageComponent, n, s, message, error, fullBeats);
                      (function(method, b, status, text, duration, isSlidingUp) {
                        if (!config.silentBehavior) {
                          var params = {
                            type : "XMLHttpRequest",
                            page : {
                              url : window.location.href
                            },
                            detail : {
                              method : method,
                              url : b,
                              status : status,
                              statusText : text
                            },
                            elapsedTime : duration,
                            time : isSlidingUp
                          };
                          instance.addBreadcrumb(params);
                        }
                      })(targetMethod, QueryLanguageComponent, s, message, fullBeats, clojIsReversed);
                      /** @type {boolean} */
                      request[_0x4d12("0xb")].fundebugHttpRecorded = true;
                    }
                  } catch (f) {
                  }
                }(me, extra);
                if (oldQueryCommandState) {
                  oldQueryCommandState.apply(this, arguments);
                }
              };
            }
          } catch (r) {
          }
          if (oldSend) {
            oldSend.apply(this, arguments);
          }
        };
      }
    };
  }, function(isSlidingUp, canCreateDiscussions) {
    /**
     * @param {string} a
     * @return {?}
     */
    canCreateDiscussions.copyWithoutPrivacy = function(a) {
      try {
        /** @type {string} */
        var actual = a;
        return "string" == typeof a && (actual = JSON[_0x4d12("0xc")](a)).password && (actual.password = "Fundebug: deleted for protectiong privary"), actual;
      } catch (n) {
        return a;
      }
    };
    /**
     * @param {!Function} obj
     * @return {?}
     */
    canCreateDiscussions.copyWithoutCircle = function(obj) {
      return obj && "object" == typeof obj && function(used) {
        try {
          JSON.stringify(used);
        } catch (effect) {
          return !!(effect.message.includes("Converting circular structure to JSON") || effect.message.includes("JSON.stringify cannot serialize cyclic structures") || effect.message.includes("cyclic object value") || effect.message.includes("Circular reference in value argument not supported") || effect.message[_0x4d12("0xd")]("\u5faa\u73af\u5f15\u7528"));
        }
        return false;
      }(obj) ? "entries" in Object ? function load(val, data) {
        try {
          var ret = {};
          return Object.entries(val).forEach(function(match) {
            var mid = match[0];
            var arg = match[1];
            if ("object" == typeof arg && null !== arg) {
              if (data.has(arg)) {
                /** @type {string} */
                ret[mid] = "property removed because of circular structure";
              } else {
                if (10 < data.size) {
                  /** @type {string} */
                  ret[mid] = "property removed to avoid deep recursion";
                } else {
                  data.add(arg);
                  ret[mid] = load(arg, data);
                }
              }
            } else {
              ret[mid] = arg;
            }
          }), ret;
        } catch (t) {
          return val;
        }
      }(obj, new Set([obj])) : {} : obj;
    };
  }, function(mixin, canCreateDiscussions, saveNotifs) {
    var processInput = saveNotifs(2);
    /**
     * @param {?} socket
     * @param {?} done
     * @return {undefined}
     */
    mixin.exports = function(socket, done) {
      try {
        if (socket.silentWebsocket) {
          return;
        }
        if (!("WebSocket" in window)) {
          return;
        }
        /** @type {(ObjectPropertyDescriptor<WebSocket.prototype>|undefined)} */
        var dsc = Object.getOwnPropertyDescriptor(WebSocket.prototype, "onerror");
        if (!dsc) {
          return;
        }
        if (!dsc.configurable) {
          return;
        }
        Object.defineProperty(WebSocket.prototype, "onerror", {
          set : function() {
            if (socket.silentWebsocket) {
              return dsc.set.apply(this, arguments);
            }
            try {
              var lastArg = arguments[0];
              return dsc.set.apply(this, [function(event) {
                try {
                  var data = {
                    type : "websocketError",
                    target : {
                      type : "onerror",
                      url : event.target.url,
                      timeStamp : event.timeStamp
                    }
                  };
                  processInput(data, socket, done);
                  if ("function" == typeof lastArg) {
                    lastArg[_0x4d12("0xe")](this, arguments);
                  }
                } catch (n) {
                  if ("function" == typeof lastArg) {
                    lastArg.apply(this, arguments);
                  }
                }
              }]);
            } catch (e) {
              return dsc.set.apply(this, arguments);
            }
          }
        });
      } catch (e) {
      }
    };
  }, function(mixin, canCreateDiscussions, saveNotifs) {
    saveNotifs(2);
    saveNotifs(4);
    /**
     * @param {!Object} memo
     * @return {undefined}
     */
    mixin.exports = function(memo) {
      /**
       * @param {?} data
       * @return {undefined}
       */
      memo.init = function(data) {
        /** @type {number} */
        var _g = 0;
        /** @type {!Array} */
        var fields = [_0x4d12("0xf"), "appversion", "releasestage", "user", "metaData", "callback", "setHttpBody", "httpTimeout", "filters", "silent", "silentDev", _0x4d12("0x10"), "silentHttp", "silentWebsocket", "silentConsole", "silentPerformance", "sampleRate", "domain", "notifierUrl"];
        for (; _g < fields.length; _g++) {
          var i = fields[_g];
          if (data[i]) {
            memo[i] = data[i];
          }
        }
      };
    };
  }, function(mixin, canCreateDiscussions, trim) {
    var f = trim(2);
    var tag = trim(9);
    /**
     * @param {?} self
     * @param {?} host
     * @return {undefined}
     */
    mixin.exports = function(self, host) {
      /**
       * @param {!Error} e
       * @param {!Object} options
       * @return {undefined}
       */
      self.notifyError = function(e, options) {
        if (e) {
          if (window.console) {
            console.error(e);
          }
          var err = tag(e);
          var info = {
            name : err.name || options && options[_0x4d12("0x11")] || "caught error",
            message : err.message || options && options.message,
            stacktrace : e.stack,
            fileName : err.fileName,
            lineNumber : err.lineNumber,
            columnNumber : err.columnNumber,
            severity : options && options.severity || "error",
            type : "caught",
            user : options && options.user,
            metaData : options && options.metaData
          };
          f(info, self, host);
        }
      };
    };
  }, function(mixin, canCreateDiscussions, iter_f) {
    var next = iter_f(2);
    var command_codes = iter_f(4);
    /**
     * @param {!Object} msg
     * @param {?} items
     * @return {undefined}
     */
    mixin.exports = function(msg, items) {
      /**
       * @param {(Object|string)} error
       * @param {!Object} err
       * @param {!Object} info
       * @return {?}
       */
      msg.notify = function(error, err, info) {
        if (error) {
          var config = {
            message : err || info && info.message,
            name : error || info && info.name,
            severity : info && info.message || "warning",
            stacktrace : function() {
              var s;
              try {
                throw new Error("");
              } catch (local) {
                s = local.stack;
              }
              if (s) {
                return "generated-stack:\n" + (s = s.replace(/(.*?)fundebug(.*?)\.js(.*)\n?/gm, "")).replace(/^Error\n/g, "");
              }
            }(),
            type : "notification",
            user : info && info.user,
            metaData : info && info[_0x4d12("0x12")]
          };
          var data = msg.apikey;
          return command_codes[_0x4d12("0x13")](data, true) ? (next(config, msg, items), "fundebug.com" === location.host || "www.fundebug.com" === location.host ? "\u4eb2\uff0c\u4e0d\u8981\u5728Fundebug\u7f51\u7ad9\u6d4b\u8bd5\u54e6\uff1b\u8bf7\u5c06Fundebug\u63d2\u4ef6\u96c6\u6210\u5230\u60a8\u7684\u7f51\u7ad9\uff0c\u7136\u540e\u8fdb\u884c\u6d4b\u8bd5!" : "\u8bf7\u67e5\u770b\u90ae\u7bb1\u4ee5\u53caFundebug\u63a7\u5236\u53f0!") : data ? "apikey\u683c\u5f0f\u9519\u8bef" : "\u8bf7\u914d\u7f6eapikey";
        }
      };
    };
  }, function(mixin, canCreateDiscussions, require) {
    var loop = require(2);
    var impl = require(4);
    /**
     * @param {!Object} data
     * @param {?} callback
     * @return {undefined}
     */
    mixin.exports = function(data, callback) {
      /**
       * @param {!Object} str
       * @param {!Object} value
       * @return {?}
       */
      data.test = function(str, value) {
        var model = {
          name : str || "Test",
          message : value || "Hello, Fundebug!",
          severity : "test",
          type : "test"
        };
        var apiKey = data.apikey;
        return impl.verifyApiKey(apiKey, true) ? (loop(model, data, callback), "fundebug.com" === location.host || "www.fundebug.com" === location.host ? "\u4eb2\uff0c\u4e0d\u8981\u5728Fundebug\u7f51\u7ad9\u6d4b\u8bd5\u54e6\uff1b\u8bf7\u5c06Fundebug\u63d2\u4ef6\u96c6\u6210\u5230\u60a8\u7684\u7f51\u7ad9\uff0c\u7136\u540e\u8fdb\u884c\u6d4b\u8bd5!" : "\u8bf7\u67e5\u770b\u90ae\u7bb1\u4ee5\u53caFundebug\u63a7\u5236\u53f0!") : apiKey ? "apikey\u683c\u5f0f\u9519\u8bef" : "\u8bf7\u914d\u7f6eapikey";
      };
    };
  }, function(mixin, canCreateDiscussions) {
    /**
     * @param {?} definition
     * @param {?} instance
     * @return {undefined}
     */
    mixin.exports = function(definition, instance) {
      /**
       * @param {!Event} event
       * @return {undefined}
       */
      function e(event) {
        var node;
        var outerHTML = (node = event.target ? event.target : event.srcElement) && node.outerHTML;
        if (outerHTML && 200 < outerHTML.length) {
          outerHTML = outerHTML.slice(0, 200);
        }
        var params = {
          type : "click",
          page : {
            url : window.location.href,
            title : document.title
          },
          detail : {
            outerHTML : outerHTML,
            tagName : node && node.tagName,
            id : node && node.id,
            className : node && node.className,
            name : node && node.name
          },
          time : (new Date).getTime()
        };
        instance.addBreadcrumb(params, definition.silentBehavior);
      }
      if (window.addEventListener) {
        window.addEventListener("click", e, true);
      } else {
        document.attachEvent("onclick", e);
      }
    };
  }, function(mixin, canCreateDiscussions) {
    /**
     * @param {?} definition
     * @param {?} instance
     * @return {undefined}
     */
    mixin.exports = function(definition, instance) {
      /**
       * @param {string} value
       * @param {string} type
       * @return {undefined}
       */
      function replace(value, type) {
        var data = {
          type : "navigation",
          detail : {
            from : value,
            to : result = type
          },
          time : (new Date).getTime()
        };
        JSON.stringify(data, null, 4);
        instance.addBreadcrumb(data, definition.silentBehavior);
      }
      var result = {
        url : window[_0x4d12("0x14")].href,
        title : ""
      };
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function() {
          result = {
            url : window.location.href,
            title : document.title
          };
        });
      } else {
        document.attachEvent("onreadystatechange", function() {
          result = {
            url : window.location.href,
            title : document.title
          };
        });
      }
      /** @type {function(): ?} */
      var cached = window.onpopstate;
      /**
       * @return {?}
       */
      window.onpopstate = function() {
        var h = {
          url : window.location.href
        };
        if (result.title || (result.title = document.title), result.url !== h[_0x4d12("0x15")] && replace(result, h), cached) {
          return cached.apply(this, arguments);
        }
      };
      /** @type {function(): ?} */
      var pushState = window.history.pushState;
      if (pushState) {
        /**
         * @return {?}
         */
        window.history.pushState = function() {
          result = {
            url : window.location.href,
            title : document.title
          };
          var object = {};
          if (3 === arguments.length && (object.url = arguments[2]), result.url !== object.url && replace(result, object), pushState) {
            return pushState.apply(this, arguments);
          }
        };
      }
      /** @type {function(): ?} */
      var previousHandler = window.onhashchange;
      window.onhashchange;
      /**
       * @return {?}
       */
      window.onhashchange = function() {
        var template = {
          url : window.location.href,
          title : document.title
        };
        if (result.url !== template[_0x4d12("0x15")] && replace(result, template), previousHandler) {
          return previousHandler.apply(this, arguments);
        }
      };
    };
  }, function(mixin, canCreateDiscussions, require) {
    var uri = require(14);
    /**
     * @param {?} event
     * @param {?} instance
     * @return {undefined}
     */
    mixin.exports = function(event, instance) {
      /**
       * @param {string} type
       * @return {undefined}
       */
      function isFn(type) {
        var method = console[type];
        /**
         * @return {undefined}
         */
        console[type] = function() {
          try {
            var params = {
              type : "console",
              page : {
                url : window.location.href,
                title : document.title
              },
              detail : {
                level : type,
                arguments : (a = arguments, a[0] instanceof Error ? [].slice.apply(a).join(" ") : uri.copyWithoutCircle(a))
              },
              time : (new Date).getTime()
            };
            if (!event.silentConsole) {
              instance.addBreadcrumb(params, event.silentBehavior);
            }
          } catch (r) {
          }
          var a;
          if ("function" == typeof method) {
            if (method.apply) {
              method.apply(console, arguments);
            } else {
              /** @type {string} */
              var value = Array.prototype.slice.apply(arguments).join(" ");
              method(value);
            }
          }
        };
      }
      /** @type {!Array} */
      var methods = ["log", "warn", "debug", "info"];
      var old = {};
      /** @type {number} */
      var i = 0;
      for (; i < methods.length; i++) {
        if (window.console) {
          old[methods[i]] = console[methods[i]];
          if (!event.silentConsole) {
            isFn(methods[i]);
          }
        }
      }
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", function() {
          /** @type {number} */
          var i = 0;
          for (; i < methods.length; i++) {
            if (window.console && event.silentConsole && old[methods[i]]) {
              console[methods[i]] = old[methods[i]];
            }
          }
        });
      }
    };
  }, function(canCreateDiscussions, RDFEConfig) {
    var self = function() {
      /** @type {(HTMLScriptElement|null)} */
      var script = document.currentScript;
      if (!script) {
        /** @type {!HTMLCollection<HTMLScriptElement>} */
        var scripts = document.scripts;
        /** @type {!HTMLScriptElement} */
        script = scripts[scripts.length - 1];
      }
      return script;
    }();
    /**
     * @return {?}
     */
    RDFEConfig.getConfig = function() {
      var args = {};
      return args.silent = self.getAttribute("silent") || false, "false" === args.silent && (args.silent = false), args.maxEventNumber = self.getAttribute("maxEventNumber") || self.getAttribute("maxeventnumber") || 10, args.setHttpBody = self.getAttribute("setHttpBody") || self.getAttribute("sethttpbody") || false, "false" === args.setHttpBody && (args.setHttpBody = false), args.silentResource = self.getAttribute("silentResource") || self.getAttribute("silentresource") || false, "false" === args.silentResource && 
      (args.silentResource = false), args.silentWebsocket = self.getAttribute("silentWebsocket") || self.getAttribute("silentWebsocket") || false, "false" === args.silentWebsocket && (args.silentWebsocket = false), args.silentHttp = self.getAttribute("silentHttp") || self.getAttribute(_0x4d12("0x16")) || false, "false" === args[_0x4d12("0x17")] && (args.silentHttp = false), args.silentConsole = self.getAttribute("silentConsole") || self.getAttribute("silentconsole") || false, "false" === args.silentConsole && 
      (args.silentConsole = false), args.sampleRate = self.getAttribute("sampleRate") || self.getAttribute("samplerate"), args.silentBehavior = self.getAttribute("silentBehavior") || self.getAttribute("silentbehavior") || false, "false" === args.silentBehavior && (args.silentBehavior = false), args.silentPerformance = self.getAttribute("silentPerformance") || self.getAttribute("silentperformance") || false, "false" === args.silentPerformance && (args.silentPerformance = false), args.silentDev = self.getAttribute("silentDev") || 
      self.getAttribute("silentdev") || false, "false" === args.silentDev && (args.silentDev = false), args.apikey = self.getAttribute("apikey"), args.appversion = self.getAttribute("appversion"), args.releasestage = self.getAttribute("releasestage"), args.notifierUrl = self.getAttribute("notifierUrl") || "https://web.fundebug.net/event/", args;
    };
  }, function(canCreateDiscussions, Breadcrumbs) {
    /** @type {!Array} */
    var ajaxes = [];
    /** @type {number} */
    var url = 0;
    /**
     * @param {?} req
     * @param {?} topic_id
     * @return {undefined}
     */
    Breadcrumbs.addBreadcrumb = function(req, topic_id) {
      if (!topic_id) {
        ajaxes[url] = req;
        if (20 == ++url) {
          /** @type {number} */
          url = 0;
        }
      }
    };
    /**
     * @return {?}
     */
    Breadcrumbs.getBreadcrumbs = function() {
      return ajaxes;
    };
  }]);
});
