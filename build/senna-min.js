/**
 * Senna - A blazing-fast Single Page Application engine
 * @author Eduardo Lundgren <edu@rdo.io>
 * @version v0.1.0
 * @link http://sennajs.com
 * @license BSD
 */
"use strict";!function(n,e){n.senna=n.senna||{},senna.append=function(n,e){return senna.isString(e)&&(e=senna.buildFragment(e)),n.appendChild(senna.parseScripts(e))},senna.bind=function(n,e){if(!n)throw new Error;if(Function.prototype.bind){var t=n.call.apply(n.bind,arguments);return function(){return t.apply(null,arguments)}}if(arguments.length>2){var r=Array.prototype.slice.call(arguments,2);return function(){var t=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(t,r),n.apply(e,t)}}return function(){return n.apply(e,arguments)}},senna.buildFragment=function(n){var e=document.createElement("div");e.innerHTML="<br>"+n,e.removeChild(e.firstChild);for(var t=document.createDocumentFragment();e.firstChild;)t.appendChild(e.firstChild);return t},senna.debounce=function(n,e,t){var r;return function(){t||(t=this);var a=arguments;clearTimeout(r),r=setTimeout(function(){n.apply(t,a)},e)}},senna.getObjectByName=function(e,t){for(var r,a=e.split("."),o=t||n;r=a.shift();){if(!senna.isDefAndNotNull(o[r]))return null;o=o[r]}return o},senna.globalEval=function(e){if(e&&e.trim()){var t=n.execScript;t||(t=function(e){n.eval.call(n,e)}),t(e)}},senna.inherits=function(n,e){function t(){}t.prototype=e.prototype,n.superClass_=e.prototype,n.prototype=new t,n.prototype.constructor=n,n.base=function(n,t){var r=Array.prototype.slice.call(arguments,2);return e.prototype[t].apply(n,r)}},senna.isDef=function(n){return n!==e},senna.isDefAndNotNull=function(n){return senna.isDef(n)&&!senna.isNull(n)},senna.isElement=function(n){return"object"==typeof n&&1===n.nodeType},senna.isFunction=function(n){return"function"==typeof n},senna.isNull=function(n){return null===n},senna.isObject=function(n){var e=typeof n;return"object"===e&&null!==n||"function"===e},senna.isString=function(n){return"string"==typeof n},senna.match=function(n,e){if(!n||1!==n.nodeType)return!1;var t=Element.prototype,r=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector;if(r)return r.call(n,e);for(var a=document.querySelectorAll(e,n.parentNode),o=0;o<a.length;++o)if(a[o]===n)return!0;return!1},senna.parseScripts=function(n){for(var e=function(n){senna.globalEval(n.responseText||n.text||n.textContent||n.innerHTML||"")},t=Array.prototype.slice.call(n.querySelectorAll("script"));t.length;){var r=t.shift();if(r.setAttribute("type","text/parsed"),r.src){var a={"Content-Type":"text/javascript"};senna.request(r.src,"GET",a,null,!0).then(e)}else senna.async.nextTick(senna.bind(e,null,r))}return n},senna.remove=function(n){n.parentNode&&n.parentNode.removeChild(n)},senna.request=function(n,e,t,r,a){var o=new XMLHttpRequest,s=new senna.Promise(function(n,e){o.onload=function(){return 200===o.status?void n(o):void o.onerror()},o.onerror=function(){var n=new Error("Request error");n.xhr=o,e(n)}}).thenCatch(function(n){throw n}).thenAlways(function(){clearTimeout(u)});if(o.open(e,n,!a),t)for(var i in t)o.setRequestHeader(i,t[i]);if(o.send(null),senna.isDef(r))var u=setTimeout(function(){s.cancel("Request timeout")},r);return s},senna.BrowserFeatures={},senna.BrowserFeatures.chrome=navigator.userAgent.indexOf("Chrome")>-1,senna.BrowserFeatures.safari=navigator.userAgent.indexOf("Safari")>-1&&!senna.BrowserFeatures.chrome,document.addEventListener("DOMContentLoaded",function(){senna.dataAttributeHandler=new senna.DataAttributeHandler(document.body)})}(window);
"use strict";!function(){senna.EventEmitter=function(){},senna.EventEmitter.prototype.events_=null,senna.EventEmitter.prototype.addListener=function(t,e){if("function"!=typeof e)throw new TypeError("Listener must be a function");return this.events_||(this.events_={}),this.emit("newListener",t,e),this.events_[t]||(this.events_[t]=[]),this.events_[t].push(e),this},senna.EventEmitter.prototype.destroy=function(){},senna.EventEmitter.prototype.listeners=function(t){return this.events_&&this.events_[t]},senna.EventEmitter.prototype.emit=function(t){var e=this.listeners(t);if(e){for(var n=Array.prototype.slice.call(arguments,1),r=0;r<e.length;r++)e[r]&&e[r].apply(this,n);return!0}return!1},senna.EventEmitter.prototype.on=senna.EventEmitter.prototype.addListener,senna.EventEmitter.prototype.once=function(t,e){var n=this;n.on(t,function r(){n.removeListener(t,r),e.apply(this,arguments)})},senna.EventEmitter.prototype.removeAllListeners=function(t){return this.events_?(t?delete this.events_[t]:delete this.events_,this):this},senna.EventEmitter.prototype.removeListener=function(t,e){if("function"!=typeof e)throw new TypeError("Listener must be a function");if(!this.events_)return this;var n=this.listeners(t);if(Array.isArray(n)){var r=n.indexOf(e);if(0>r)return this;n.splice(r,1)}return this},senna.EventEmitter.prototype.setMaxListeners=function(){throw new Error("Not implemented")}}();
"use strict";!function(){senna.Cacheable=function(){},senna.Cacheable.prototype.cache=null,senna.Cacheable.prototype.cacheable=!1,senna.Cacheable.prototype.addCache=function(e){return this.cacheable?this.cache=e:void 0,this},senna.Cacheable.prototype.clearCache=function(){return this.cache=null,this},senna.Cacheable.prototype.destroy=function(){this.clearCache()},senna.Cacheable.prototype.getCache=function(){return this.cache},senna.Cacheable.prototype.isCacheable=function(){return this.cacheable},senna.Cacheable.prototype.setCacheable=function(e){e||this.clearCache(),this.cacheable=e}}();
"use strict";!function(){senna.DataAttributeHandler=function(e){if(!senna.isElement(e))throw new Error("Base element not specified.");this.setBaseElement(e),this.initApp_()},senna.DataAttributeHandler.prototype.app=null,senna.DataAttributeHandler.prototype.baseElement=null,senna.DataAttributeHandler.prototype.getApp=function(){return this.app},senna.DataAttributeHandler.prototype.getBaseElement=function(){return this.baseElement},senna.DataAttributeHandler.prototype.initApp_=function(){var e=this.baseElement;if(!e.hasAttribute("data-senna"))return void void 0;void 0,this.app=new senna.App;var t=e.getAttribute("data-senna-basepath");senna.isNull(t)||(this.app.setBasePath(t),void 0);var n=e.getAttribute("data-senna-link-selector");senna.isNull(n)||(this.app.setLinkSelector(n),void 0),this.scanSurfaces(),this.scanRoutes()},senna.DataAttributeHandler.prototype.makeDefaultRoute_=function(){var e=document.createElement("link");return e.href="regex:.*",e.rel="senna-route",e.type="senna.HtmlScreen",e},senna.DataAttributeHandler.prototype.scanRoutes=function(){var e=document.querySelectorAll('link[rel="senna-route"]');0===e.length&&(void 0,e=[this.makeDefaultRoute_()]);for(var t=0;t<e.length;t++){var n=e[t];if(!n.hasAttribute("senna-parsed")){var a=n.getAttribute("href"),s=n.getAttribute("type");senna.isDefAndNotNull(a)&&senna.isDefAndNotNull(s)&&(0===a.indexOf("regex:")&&(a=new RegExp(a.substring(6))),this.app.addRoutes(new senna.Route(a,senna.getObjectByName(s))),n.setAttribute("data-parsed",""),void 0)}}},senna.DataAttributeHandler.prototype.scanSurfaces=function(){for(var e=this.baseElement.querySelectorAll("[data-senna-surface]"),t=0;t<e.length;t++){var n=e[t].id;n&&!this.app.surfaces[n]&&(this.app.addSurfaces(n),void 0)}},senna.DataAttributeHandler.prototype.setApp=function(e){this.app=e},senna.DataAttributeHandler.prototype.setBaseElement=function(e){this.baseElement=e}}();
"use strict";!function(t){senna.App=function(){senna.App.base(this,"constructor"),this.routes=[],this.surfaces={},this.screens={},this.docClickEventHandler_=senna.bind(this.onDocClick_,this),this.popstateEventHandler_=senna.bind(this.onPopstate_,this),this.scrollEventHandler_=senna.debounce(this.onScroll_,50,this),this.on("startNavigate",this.onStartNavigate_),document.addEventListener("click",this.docClickEventHandler_,!1),t.addEventListener("popstate",this.popstateEventHandler_,!1),document.addEventListener("scroll",this.scrollEventHandler_,!1),this.skipLoadPopstate=senna.BrowserFeatures.safari&&("interactive"===document.readyState||"loading"===document.readyState)},senna.inherits(senna.App,senna.EventEmitter),senna.App.prototype.activeScreen=null,senna.App.prototype.activePath=null,senna.App.prototype.basePath="",senna.App.prototype.captureHistoryScrollPosition=!0,senna.App.prototype.defaultTitle="",senna.App.prototype.linkSelector="a",senna.App.prototype.loadingCssClass="senna-loading",senna.App.prototype.syncScrollLeft=0,senna.App.prototype.syncScrollTop=0,senna.App.prototype.pendingNavigate=null,senna.App.prototype.routes=null,senna.App.prototype.screens=null,senna.App.prototype.scrollHandle=null,senna.App.prototype.skipLoadPopstate=!1,senna.App.prototype.surfaces=null,senna.App.prototype.updateScrollPosition=!0,senna.App.prototype.addRoutes=function(t){Array.isArray(t)||(t=[t]);for(var e=0;e<t.length;e++){var n=t[e];n instanceof senna.Route||(n=new senna.Route(n.path,n.handler)),this.routes.push(n)}return this},senna.App.prototype.addSurfaces=function(t){Array.isArray(t)||(t=[t]);for(var e=0;e<t.length;e++){var n=t[e];senna.isString(n)&&(n=new senna.Surface(n)),this.surfaces[n.getId()]=n}return this},senna.App.prototype.createScreenInstance_=function(t,e){var n;t===this.activePath&&(void 0,n=this.screens[t],delete this.screens[t]);var o=this.screens[t];if(!o){void 0;var s=e.getHandler();o=s===senna.Screen||senna.Screen.isImplementedBy(s.prototype)?new s:s(e)||new senna.Screen,n&&o.addCache(n.getCache())}return o},senna.App.prototype.destroy=function(){senna.App.base(this,"destroy");for(var e in this.surfaces)this.surfaces[e].remove(this.activeScreen),this.surfaces[e].show();return t.removeEventListener("popstate",this.popstateEventHandler_,!1),document.removeEventListener("click",this.docClickEventHandler_,!1),document.removeEventListener("scroll",this.scrollEventHandler_,!1),this},senna.App.prototype.dispatch=function(){return this.navigate(t.location.pathname+t.location.search+t.location.hash,!0)},senna.App.prototype.doNavigate_=function(t,e){var n=this;if(n.activeScreen&&n.activeScreen.beforeDeactivate())return this.pendingNavigate=senna.Promise.reject(new senna.Promise.CancellationError("Cancelled by active screen")),this.pendingNavigate;var o=this.findRoute(t);if(!o)return this.pendingNavigate=senna.Promise.reject(new senna.Promise.CancellationError("No route for "+t)),this.pendingNavigate;t===this.activePath&&(e=!0),void 0;var s=this.createScreenInstance_(t,o);return this.pendingNavigate=senna.Promise.resolve().then(function(){return s.load(t)}).then(function(t){var e=s.getId();for(var o in n.surfaces){var a=n.surfaces[o];a.addContent(e,s.getSurfaceContent(o,t))}return n.activeScreen&&n.activeScreen.deactivate(),s.flip(n.surfaces)}).then(function(){n.finalizeNavigate_(t,s,e)}).thenCatch(function(e){throw n.handleNavigateError_(t,s,e),e}),this.pendingNavigate},senna.App.prototype.finalizeNavigate_=function(t,e,n){var o=this.activeScreen,s=e.getTitle()||this.getDefaultTitle();this.updateHistory_(s,t,n),this.syncScrollPosition_(n),document.title=s,e.activate(),o&&!o.isCacheable()&&this.removeScreen_(this.activePath,o),this.activePath=t,this.activeScreen=e,this.screens[t]=e,this.pendingNavigate=null,this.captureHistoryScrollPosition=!0,void 0},senna.App.prototype.findRoute=function(e){var n=this.basePath,o=e.lastIndexOf("#");if(o>-1&&(e=e.substr(0,o),e===t.location.pathname+t.location.search))return null;e=e.substr(n.length);for(var s=0;s<this.routes.length;s++){var a=this.routes[s];if(a.matchesPath(e))return a}return null},senna.App.prototype.getBasePath=function(){return this.basePath},senna.App.prototype.getDefaultTitle=function(){return this.defaultTitle},senna.App.prototype.getLinkSelector=function(){return this.linkSelector},senna.App.prototype.getLoadingCssClass=function(){return this.loadingCssClass},senna.App.prototype.getUpdateScrollPosition=function(){return this.updateScrollPosition},senna.App.prototype.handleNavigateError_=function(t,e,n){void 0,this.removeScreen_(t,e),this.pendingNavigate=null},senna.App.prototype.isLinkSameOrigin_=function(e){return e===t.location.hostname},senna.App.prototype.isSameBasePath_=function(t){return 0===t.indexOf(this.basePath)},senna.App.prototype.lockHistoryScrollPosition_=function(){var e=t.history.state;if(e){var n=!1,o=function(){document.removeEventListener("scroll",o,!1),n||(t.scrollTo(e.scrollLeft,e.scrollTop),n=!0)};senna.async.nextTick(o),document.addEventListener("scroll",o,!1)}},senna.App.prototype.navigate=function(t,e){return this.stopPending_(),this.emit("startNavigate",{path:t,replaceHistory:!!e}),this.pendingNavigate},senna.App.prototype.onDocClick_=function(t){for(var e=t.target;e&&"A"!==e.tagName;)e=e.parentNode;if(e){if(!senna.match(e,this.linkSelector))return void void 0;var n=e.hostname,o=e.pathname+e.search+e.hash,s=!1;if(!this.isLinkSameOrigin_(n))return void void 0;if(!this.isSameBasePath_(o))return void void 0;if(!this.findRoute(o))return void void 0;this.navigate(o).thenCatch(function(){s=!0}),s||t.preventDefault()}},senna.App.prototype.onPopstate_=function(e){var n=e.state;if(null===n||n.isNullState){if(this.skipLoadPopstate)return;if(!t.location.hash)return void t.location.reload()}n&&n.senna&&(void 0,this.syncScrollTop=n.scrollTop,this.syncScrollLeft=n.scrollLeft,this.lockHistoryScrollPosition_(),this.navigate(n.path,!0)),this.skipLoadPopstate=!1},senna.App.prototype.onScroll_=function(){this.captureHistoryScrollPosition&&this.storeScrollPosition_(t.pageXOffset,t.pageYOffset)},senna.App.prototype.onStartNavigate_=function(e){var n=this,o={};this.captureHistoryScrollPosition=!1,this.storeScrollPosition_(t.pageXOffset,t.pageYOffset),document.documentElement.classList.add(this.loadingCssClass),this.pendingNavigate=this.doNavigate_(e.path,e.replaceHistory).thenCatch(function(t){throw n.stopPending_(),o.error=t,t}).thenAlways(function(){o.path=e.path,n.emit("endNavigate",o),document.documentElement.classList.remove(n.loadingCssClass)})},senna.App.prototype.removeScreen_=function(t,e){var n=e.getId();for(var o in this.surfaces)this.surfaces[o].remove(n);e.destroy(),delete this.screens[t]},senna.App.prototype.setBasePath=function(t){this.basePath=t},senna.App.prototype.setDefaultTitle=function(t){this.defaultTitle=t},senna.App.prototype.setLinkSelector=function(t){this.linkSelector=t},senna.App.prototype.setLoadingCssClass=function(t){this.loadingCssClass=t},senna.App.prototype.setUpdateScrollPosition=function(t){this.updateScrollPosition=t},senna.App.prototype.stopPending_=function(){this.pendingNavigate&&(this.pendingNavigate.cancel("Cancel pending navigation"),this.pendingNavigate=null)},senna.App.prototype.updateHistory_=function(e,n,o){var s={path:n,senna:!0};o?t.history.replaceState(s,e,n):t.history.pushState(s,e,n)},senna.App.prototype.storeScrollPosition_=function(e,n){var o=t.history.state||{};o.isNullState=senna.isNull(t.history.state),o.scrollLeft=e,o.scrollTop=n,t.history.replaceState(o,null,null)},senna.App.prototype.syncScrollPosition_=function(e){var n=e?this.syncScrollLeft:0,o=e?this.syncScrollTop:0;this.updateScrollPosition&&t.scrollTo(n,o),this.storeScrollPosition_(n,o)}}(window);
"use strict";!function(){senna.Route=function(t,n){if(!senna.isDef(t))throw new Error("Route path not specified.");if(!senna.isFunction(n))throw new Error("Route handler is not a function.");this.setPath(t),this.setHandler(n)},senna.Route.prototype.path=null,senna.Route.prototype.handler=null,senna.Route.prototype.getHandler=function(){return this.handler},senna.Route.prototype.getPath=function(){return this.path},senna.Route.prototype.matchesPath=function(t){var n=this.path;return senna.isString(n)?t===n:senna.isFunction(n)?n(t):n instanceof RegExp?t.search(n)>-1:null},senna.Route.prototype.setHandler=function(t){this.handler=t},senna.Route.prototype.setPath=function(t){this.path=t}}();
"use strict";!function(){senna.Surface=function(t){if(!t)throw new Error("Surface element id not specified.");this.setId(t)},senna.Surface.DEFAULT="default",senna.Surface.TRANSITION=function(t,e){t&&(t.style.display="none",t.classList.remove("flipped")),e&&(e.style.display="block",e.classList.add("flipped"))},senna.Surface.prototype.activeChild=null,senna.Surface.prototype.defaultChild=null,senna.Surface.prototype.el=null,senna.Surface.prototype.id=null,senna.Surface.prototype.transitionFn=null,senna.Surface.prototype.addContent=function(t,e){if(!e)return this.getChild(t);void 0;var n=this.getEl(),i=this.createChild(t);return senna.append(i,e),this.transition(i,null),n&&senna.append(n,i),i},senna.Surface.prototype.createChild=function(t){var e=document.createElement("div");return e.setAttribute("id",this.makeId_(t)),e},senna.Surface.prototype.getEl=function(t){return this.el?this.el:(this.el=document.getElementById(t||this.id),this.el)},senna.Surface.prototype.getId=function(){return this.id},senna.Surface.prototype.getChild=function(t){return document.getElementById(this.makeId_(t))},senna.Surface.prototype.getTransitionFn=function(){return this.transitionFn},senna.Surface.prototype.makeId_=function(t){return this.id+"-"+t},senna.Surface.prototype.setId=function(t){this.id=t},senna.Surface.prototype.setTransitionFn=function(t){this.transitionFn=t},senna.Surface.prototype.show=function(t){this.defaultChild||(this.defaultChild=this.addContent(senna.Surface.DEFAULT)),this.activeChild||(this.activeChild=this.defaultChild);var e=this.activeChild,n=this.getChild(t);n||(n=this.defaultChild),e&&e!==n&&senna.remove(e);var i=this.getEl();i&&n&&!n.parentNode&&senna.append(i,n);var a=this.transition(e,n);return this.activeChild=n,a},senna.Surface.prototype.remove=function(t){var e=this.getChild(t);e&&senna.remove(e)},senna.Surface.prototype.toString=function(){return this.id},senna.Surface.prototype.transition=function(t,e){var n=this.transitionFn||senna.Surface.TRANSITION;return senna.Promise.resolve(n.call(this,t,e))}}();
"use strict";!function(){senna.Screen=function(){senna.Screen.base(this,"constructor"),this.setId(senna.Screen.uniqueIdCounter++)},senna.inherits(senna.Screen,senna.Cacheable),senna.Screen.isImplementedBy=function(e){return e instanceof senna.Screen},senna.Screen.uniqueIdCounter=+new Date,senna.Screen.prototype.id=null,senna.Screen.prototype.title=null,senna.Screen.prototype.activate=function(){void 0},senna.Screen.prototype.beforeDeactivate=function(){void 0},senna.Screen.prototype.flip=function(e){void 0;var n=[];for(var t in e)n.push(e[t].show(this.id));return senna.Promise.all(n)},senna.Screen.prototype.deactivate=function(){void 0},senna.Screen.prototype.destroy=function(){senna.Screen.base(this,"destroy"),void 0},senna.Screen.prototype.getId=function(){return this.id},senna.Screen.prototype.getSurfaceContent=function(){void 0},senna.Screen.prototype.getTitle=function(){return this.title},senna.Screen.prototype.load=function(){void 0},senna.Screen.prototype.setId=function(e){this.id="screen_"+String(e)},senna.Screen.prototype.setTitle=function(e){this.title=e},senna.Screen.prototype.toString=function(){return this.id}}();
"use strict";!function(){senna.RequestScreen=function(){senna.RequestScreen.base(this,"constructor")},senna.inherits(senna.RequestScreen,senna.Screen),senna.RequestScreen.prototype.cacheable=!0,senna.RequestScreen.prototype.httpHeaders={"X-PJAX":"true","X-Requested-With":"XMLHttpRequest"},senna.RequestScreen.prototype.httpMethod="GET",senna.RequestScreen.prototype.request=null,senna.RequestScreen.prototype.timeout=3e4,senna.RequestScreen.prototype.abortRequest=function(){this.request&&this.request.abort()},senna.RequestScreen.prototype.getHttpHeaders=function(){return this.httpHeaders},senna.RequestScreen.prototype.getHttpMethod=function(){return this.httpMethod},senna.RequestScreen.prototype.getRequest=function(){return this.request},senna.RequestScreen.prototype.getTimeout=function(){return this.timeout},senna.RequestScreen.prototype.load=function(e){senna.RequestScreen.base(this,"load",e);var t=this,n=this.getCache();return senna.isDefAndNotNull(n)?senna.Promise.resolve(n):senna.request(e,this.httpMethod,this.httpHeaders,this.timeout).then(function(e){return t.setRequest(e),e.responseText})},senna.RequestScreen.prototype.setHttpHeaders=function(e){this.httpHeaders=e},senna.RequestScreen.prototype.setHttpMethod=function(e){this.httpMethod=e},senna.RequestScreen.prototype.setRequest=function(e){this.request=e},senna.RequestScreen.prototype.setTimeout=function(e){this.timeout=e}}();
"use strict";!function(){senna.HtmlScreen=function(){senna.HtmlScreen.base(this,"constructor")},senna.inherits(senna.HtmlScreen,senna.RequestScreen),senna.HtmlScreen.prototype.titleSelector="title",senna.HtmlScreen.prototype.getSurfaceContent=function(e,t){var n=t.querySelector("#"+e);return n?n.innerHTML:void 0},senna.HtmlScreen.prototype.getTitleSelector=function(){return this.titleSelector},senna.HtmlScreen.prototype.load=function(e){var t=this,n=senna.HtmlScreen.base(this,"load",e);return n.then(function(e){return t.resolveContent(e)}).thenCatch(function(e){throw t.abortRequest(),e})},senna.HtmlScreen.prototype.resolveContent=function(e){if(senna.isString(e)){var t=document.createElement("div");t.innerHTML=e,e=t}var n=e.querySelector(this.titleSelector);return n&&this.setTitle(n.innerHTML.trim()),this.addCache(e),e},senna.HtmlScreen.prototype.setTitleSelector=function(e){this.titleSelector=e}}();
/*!
 * Promises polyfill based on Google's Closure Library promises.
 *
 *      Copyright 2013 The Closure Library Authors. All Rights Reserved.
 *
 * NOTE(eduardo): Promise support is not ready on all supported browsers,
 * therefore senna.js is temporarily using Google's promises as polyfill. It
 * supports cancellable promises and has clean and fast implementation.
 */
"use strict";!function(n){senna.Thenable=function(){},senna.Thenable.prototype.then=function(){},senna.Thenable.IMPLEMENTED_BY_PROP="$goog_Thenable",senna.Thenable.addImplementation=function(n){n.prototype.then=n.prototype.then,n.prototype.$goog_Thenable=!0},senna.Thenable.isImplementedBy=function(n){if(!n)return!1;try{return!!n.$goog_Thenable}catch(e){return!1}},senna.partial=function(n){var e=Array.prototype.slice.call(arguments,1);return function(){var t=e.slice();return t.push.apply(t,arguments),n.apply(this,t)}},senna.async={},senna.async.throwException=function(n){senna.async.nextTick(function(){throw n})},senna.async.run=function(n,e){senna.async.run.workQueueScheduled_||(senna.async.nextTick(senna.async.run.processWorkQueue),senna.async.run.workQueueScheduled_=!0),senna.async.run.workQueue_.push(new senna.async.run.WorkItem_(n,e))},senna.async.run.workQueueScheduled_=!1,senna.async.run.workQueue_=[],senna.async.run.processWorkQueue=function(){for(;senna.async.run.workQueue_.length;){var n=senna.async.run.workQueue_;senna.async.run.workQueue_=[];for(var e=0;e<n.length;e++){var t=n[e];try{t.fn.call(t.scope)}catch(a){senna.async.throwException(a)}}}senna.async.run.workQueueScheduled_=!1},senna.async.run.WorkItem_=function(n,e){this.fn=n,this.scope=e},senna.async.nextTick=function(e,t){var a=e;return t&&(a=senna.bind(e,t)),a=senna.async.nextTick.wrapCallback_(a),senna.isFunction(n.setImmediate)?void n.setImmediate(a):(senna.async.nextTick.setImmediate_||(senna.async.nextTick.setImmediate_=senna.async.nextTick.getSetImmediateEmulator_()),void senna.async.nextTick.setImmediate_(a))},senna.async.nextTick.setImmediate_=null,senna.async.nextTick.getSetImmediateEmulator_=function(){var e=n.MessageChannel;if("undefined"==typeof e&&"undefined"!=typeof n&&n.postMessage&&n.addEventListener&&(e=function(){var n=document.createElement("iframe");n.style.display="none",n.src="",document.documentElement.appendChild(n);var e=n.contentWindow,t=e.document;t.open(),t.write(""),t.close();var a="callImmediate"+Math.random(),s=e.location.protocol+"//"+e.location.host,i=senna.bind(function(n){(n.origin===s||n.data===a)&&this.port1.onmessage()},this);e.addEventListener("message",i,!1),this.port1={},this.port2={postMessage:function(){e.postMessage(a,s)}}}),"undefined"!=typeof e){var t=new e,a={},s=a;return t.port1.onmessage=function(){a=a.next;var n=a.cb;a.cb=null,n()},function(n){s.next={cb:n},s=s.next,t.port2.postMessage(0)}}return"undefined"!=typeof document&&"onreadystatechange"in document.createElement("script")?function(n){var e=document.createElement("script");e.onreadystatechange=function(){e.onreadystatechange=null,e.parentNode.removeChild(e),e=null,n(),n=null},document.documentElement.appendChild(e)}:function(n){setTimeout(n,0)}},senna.async.nextTick.wrapCallback_=function(n){return n},senna.Promise=function(n,e){this.state_=senna.Promise.State_.PENDING,this.result_=void 0,this.parent_=null,this.callbackEntries_=null,this.executing_=!1,senna.Promise.UNHANDLED_REJECTION_DELAY>0?this.unhandledRejectionId_=0:0===senna.Promise.UNHANDLED_REJECTION_DELAY&&(this.hadUnhandledRejection_=!1);try{var t=this;n.call(e,function(n){t.resolve_(senna.Promise.State_.FULFILLED,n)},function(n){t.resolve_(senna.Promise.State_.REJECTED,n)})}catch(a){this.resolve_(senna.Promise.State_.REJECTED,a)}},senna.Promise.UNHANDLED_REJECTION_DELAY=0,senna.Promise.State_={PENDING:0,BLOCKED:1,FULFILLED:2,REJECTED:3},senna.Promise.CallbackEntry_=null,senna.Promise.resolve=function(n){return new senna.Promise(function(e){e(n)})},senna.Promise.reject=function(n){return new senna.Promise(function(e,t){t(n)})},senna.Promise.race=function(n){return new senna.Promise(function(e,t){n.length||e(void 0);for(var a,s=0;a=n[s];s++)a.then(e,t)})},senna.Promise.all=function(n){return new senna.Promise(function(e,t){var a=n.length,s=[];if(!a)return void e(s);for(var i,o=function(n,t){a--,s[n]=t,0===a&&e(s)},r=function(n){t(n)},c=0;i=n[c];c++)i.then(senna.partial(o,c),r)})},senna.Promise.firstFulfilled=function(n){return new senna.Promise(function(e,t){var a=n.length,s=[];if(!a)return void e(void 0);for(var i,o=function(n){e(n)},r=function(n,e){a--,s[n]=e,0===a&&t(s)},c=0;i=n[c];c++)i.then(o,senna.partial(r,c))})},senna.Promise.prototype.then=function(n,e,t){return this.addChildPromise_(senna.isFunction(n)?n:null,senna.isFunction(e)?e:null,t)},senna.Thenable.addImplementation(senna.Promise),senna.Promise.prototype.thenAlways=function(n,e){var t=function(){try{n.call(e)}catch(t){senna.Promise.handleRejection_.call(null,t)}};return this.addCallbackEntry_({child:null,onRejected:t,onFulfilled:t}),this},senna.Promise.prototype.thenCatch=function(n,e){return this.addChildPromise_(null,n,e)},senna.Promise.prototype.cancel=function(n){this.state_===senna.Promise.State_.PENDING&&senna.async.run(function(){var e=new senna.Promise.CancellationError(n);this.cancelInternal_(e)},this)},senna.Promise.prototype.cancelInternal_=function(n){this.state_===senna.Promise.State_.PENDING&&(this.parent_?this.parent_.cancelChild_(this,n):this.resolve_(senna.Promise.State_.REJECTED,n))},senna.Promise.prototype.cancelChild_=function(n,e){if(this.callbackEntries_){for(var t,a=0,s=-1,i=0;t=this.callbackEntries_[i];i++){var o=t.child;if(o&&(a++,o===n&&(s=i),s>=0&&a>1))break}if(s>=0)if(this.state_===senna.Promise.State_.PENDING&&1===a)this.cancelInternal_(e);else{var r=this.callbackEntries_.splice(s,1)[0];this.executeCallback_(r,senna.Promise.State_.REJECTED,e)}}},senna.Promise.prototype.addCallbackEntry_=function(n){this.callbackEntries_&&this.callbackEntries_.length||this.state_!==senna.Promise.State_.FULFILLED&&this.state_!==senna.Promise.State_.REJECTED||this.scheduleCallbacks_(),this.callbackEntries_||(this.callbackEntries_=[]),this.callbackEntries_.push(n)},senna.Promise.prototype.addChildPromise_=function(n,e,t){var a={child:null,onFulfilled:null,onRejected:null};return a.child=new senna.Promise(function(s,i){a.onFulfilled=n?function(e){try{var a=n.call(t,e);s(a)}catch(o){i(o)}}:s,a.onRejected=e?function(n){try{var a=e.call(t,n);!senna.isDef(a)&&n instanceof senna.Promise.CancellationError?i(n):s(a)}catch(o){i(o)}}:i}),a.child.parent_=this,this.addCallbackEntry_(a),a.child},senna.Promise.prototype.unblockAndFulfill_=function(n){if(this.state_!==senna.Promise.State_.BLOCKED)throw new Error("Promise is not blocked.");this.state_=senna.Promise.State_.PENDING,this.resolve_(senna.Promise.State_.FULFILLED,n)},senna.Promise.prototype.unblockAndReject_=function(n){if(this.state_!==senna.Promise.State_.BLOCKED)throw new Error("Promise is not blocked.");this.state_=senna.Promise.State_.PENDING,this.resolve_(senna.Promise.State_.REJECTED,n)},senna.Promise.prototype.resolve_=function(n,e){if(this.state_===senna.Promise.State_.PENDING){if(this===e)n=senna.Promise.State_.REJECTED,e=new TypeError("Promise cannot resolve to itself");else{if(senna.Thenable.isImplementedBy(e))return e=e,this.state_=senna.Promise.State_.BLOCKED,void e.then(this.unblockAndFulfill_,this.unblockAndReject_,this);if(senna.isObject(e))try{var t=e.then;if(senna.isFunction(t))return void this.tryThen_(e,t)}catch(a){n=senna.Promise.State_.REJECTED,e=a}}this.result_=e,this.state_=n,this.scheduleCallbacks_(),n!==senna.Promise.State_.REJECTED||e instanceof senna.Promise.CancellationError||senna.Promise.addUnhandledRejection_(this,e)}},senna.Promise.prototype.tryThen_=function(n,e){this.state_=senna.Promise.State_.BLOCKED;var t=this,a=!1,s=function(n){a||(a=!0,t.unblockAndFulfill_(n))},i=function(n){a||(a=!0,t.unblockAndReject_(n))};try{e.call(n,s,i)}catch(o){i(o)}},senna.Promise.prototype.scheduleCallbacks_=function(){this.executing_||(this.executing_=!0,senna.async.run(this.executeCallbacks_,this))},senna.Promise.prototype.executeCallbacks_=function(){for(;this.callbackEntries_&&this.callbackEntries_.length;){var n=this.callbackEntries_;this.callbackEntries_=[];for(var e=0;e<n.length;e++)this.executeCallback_(n[e],this.state_,this.result_)}this.executing_=!1},senna.Promise.prototype.executeCallback_=function(n,e,t){e===senna.Promise.State_.FULFILLED?n.onFulfilled(t):(this.removeUnhandledRejection_(),n.onRejected(t))},senna.Promise.prototype.removeUnhandledRejection_=function(){var n;if(senna.Promise.UNHANDLED_REJECTION_DELAY>0)for(n=this;n&&n.unhandledRejectionId_;n=n.parent_)clearTimeout(n.unhandledRejectionId_),n.unhandledRejectionId_=0;else if(0===senna.Promise.UNHANDLED_REJECTION_DELAY)for(n=this;n&&n.hadUnhandledRejection_;n=n.parent_)n.hadUnhandledRejection_=!1},senna.Promise.addUnhandledRejection_=function(n,e){senna.Promise.UNHANDLED_REJECTION_DELAY>0?n.unhandledRejectionId_=setTimeout(function(){senna.Promise.handleRejection_.call(null,e)},senna.Promise.UNHANDLED_REJECTION_DELAY):0===senna.Promise.UNHANDLED_REJECTION_DELAY&&(n.hadUnhandledRejection_=!0,senna.async.run(function(){n.hadUnhandledRejection_&&senna.Promise.handleRejection_.call(null,e)}))},senna.Promise.handleRejection_=senna.async.throwException,senna.Promise.setUnhandledRejectionHandler=function(n){senna.Promise.handleRejection_=n},senna.Promise.CancellationError=function(n){senna.Promise.CancellationError.base(this,"constructor",n),n&&(this.message=n)},senna.inherits(senna.Promise.CancellationError,Error),senna.Promise.CancellationError.prototype.name="cancel"}(window);