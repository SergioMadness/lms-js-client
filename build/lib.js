var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Interfaces;
(function (Interfaces) {
    var Services;
    (function (Services) {
        Services.DEFAULT_REQUEST_OPTIONS = {
            ignoreCache: false,
            headers: {
                Accept: 'application/json, text/javascript, text/plain'
            },
            timeout: 5000
        };
    })(Services = Interfaces.Services || (Interfaces.Services = {}));
})(Interfaces || (Interfaces = {}));
var Models;
(function (Models) {
    var Model = (function () {
        function Model() {
        }
        return Model;
    }());
    Models.Model = Model;
})(Models || (Models = {}));
var Models;
(function (Models) {
    var Blog;
    (function (Blog) {
        var Topic = (function (_super) {
            __extends(Topic, _super);
            function Topic(attributes) {
                var _this = _super.call(this) || this;
                _this.fill(attributes);
                return _this;
            }
            Topic.prototype.fill = function (attributes) {
                this.id = attributes.get('id');
                this.name = attributes.get('name');
                this.title = attributes.get('title');
                this.preview = attributes.get('preview');
                this.body = attributes.get('body');
                this.publishDate = attributes.get('publish_date');
                this.cover = attributes.get('cover');
                return this;
            };
            return Topic;
        }(Models.Model));
        Blog.Topic = Topic;
    })(Blog = Models.Blog || (Models.Blog = {}));
})(Models || (Models = {}));
var Models;
(function (Models) {
    var News;
    (function (News_1) {
        var News = (function (_super) {
            __extends(News, _super);
            function News(attributes) {
                var _this = _super.call(this) || this;
                _this.fill(attributes);
                return _this;
            }
            News.prototype.fill = function (attributes) {
                this.id = attributes.get('id');
                this.name = attributes.get('name');
                this.body = attributes.get('body');
                this.preview = attributes.get('preview');
                this.title = attributes.get('title');
                this.publishDate = attributes.get('publish_date');
                this.cover = attributes.get('cover');
                return this;
            };
            return News;
        }(Models.Model));
        News_1.News = News;
    })(News = Models.News || (Models.News = {}));
})(Models || (Models = {}));
var Models;
(function (Models) {
    var Users;
    (function (Users) {
        var User = (function (_super) {
            __extends(User, _super);
            function User(attributes) {
                var _this = _super.call(this) || this;
                _this.fill(attributes);
                return _this;
            }
            User.prototype.fill = function (attributes) {
                this.id = attributes.get('id');
                this.firstName = attributes.get('first_name');
                this.middleName = attributes.get('middle_name');
                this.lastName = attributes.get('last_name');
                this.email = attributes.get('email');
                this.phone = attributes.get('phone');
                this.avatar = attributes.get('avatar');
                return this;
            };
            return User;
        }(Models.Model));
        Users.User = User;
    })(Users = Models.Users || (Models.Users = {}));
})(Models || (Models = {}));
var Services;
(function (Services) {
    var WebService = (function () {
        function WebService() {
            this.limitConstraint = 10;
            this.offsetConstraint = 0;
        }
        WebService.prototype.setTransport = function (transport) {
            this.transport = transport;
            return this;
        };
        WebService.prototype.getTransport = function () {
            return this.transport;
        };
        WebService.prototype.limit = function (limit) {
            this.limitConstraint = limit;
            return this;
        };
        WebService.prototype.getLimit = function () {
            return this.limitConstraint;
        };
        WebService.prototype.offset = function (offset) {
            this.offsetConstraint = offset;
            return this;
        };
        WebService.prototype.getOffset = function () {
            return this.offsetConstraint;
        };
        WebService.prototype.where = function (key, value) {
            this.whereConditions.set(key, value);
            return this;
        };
        WebService.prototype.getConditions = function () {
            return this.whereConditions;
        };
        WebService.prototype.prepareParams = function () {
            var result = this.getConditions();
            result.set('limit', this.getLimit());
            result.set('offset', this.getOffset());
            return result;
        };
        return WebService;
    }());
    Services.WebService = WebService;
})(Services || (Services = {}));
var Services;
(function (Services) {
    Services.HTTP_METHOD_GET = 'get';
    Services.HTTP_METHOD_POST = 'post';
    Services.HTTP_METHOD_DELETE = 'delete';
    Services.HTTP_METHOD_PATCH = 'patch';
    Services.HTTP_METHOD_PUT = 'put';
})(Services || (Services = {}));
var Services;
(function (Services) {
    Services.METHOD_GET_TOPICS = '/api/v1/blog';
    Services.METHOD_GET_TOPIC = '/api/v1/blog/{id}';
    var Blog = (function (_super) {
        __extends(Blog, _super);
        function Blog() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Blog.prototype.get = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result, data;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = new Array();
                            return [4, this.getTransport().send(Services.METHOD_GET_TOPICS, Services.HTTP_METHOD_GET, this.prepareParams())];
                        case 1:
                            data = _a.sent();
                            data.forEach(function (element) {
                                result.push(_this.create(element));
                            });
                            return [2, result];
                    }
                });
            });
        };
        Blog.prototype.find = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getTransport().send(Services.METHOD_GET_TOPIC, Services.HTTP_METHOD_GET, new Map([
                                ['id', id]
                            ]))];
                        case 1:
                            data = _a.sent();
                            return [2, this.create(data[0])];
                    }
                });
            });
        };
        Blog.prototype.create = function (attributes) {
            return new Models.Blog.Topic(attributes);
        };
        return Blog;
    }(Services.WebService));
    Services.Blog = Blog;
})(Services || (Services = {}));
System.register("services/LMS", [], function (exports_1, context_1) {
    "use strict";
    var LMS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            LMS = (function () {
                function LMS() {
                }
                LMS.setTransport = function (transport) {
                    LMS.transport = transport;
                };
                LMS.getTransport = function () {
                    return LMS.transport;
                };
                LMS.prototype.news = function () {
                    var result = new Services.News();
                    result.setTransport(LMS.getTransport());
                    return result;
                };
                LMS.prototype.blog = function () {
                    var result = new Services.Blog();
                    result.setTransport(LMS.getTransport());
                    return result;
                };
                return LMS;
            }());
            exports_1("LMS", LMS);
        }
    };
});
var Services;
(function (Services) {
    Services.METHOD_GET_NEWS = '/api/v1/news';
    Services.METHOD_GET_SINGLE_NEWS = '/api/v1/news/{id}';
    var News = (function (_super) {
        __extends(News, _super);
        function News() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        News.prototype.create = function (attributes) {
            return new Models.News.News(attributes);
        };
        News.prototype.get = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result, data;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            result = new Array();
                            return [4, this.getTransport().send(Services.METHOD_GET_NEWS, Services.HTTP_METHOD_GET, this.prepareParams())];
                        case 1:
                            data = _a.sent();
                            data.forEach(function (element) {
                                result.push(_this.create(element));
                            });
                            return [2, result];
                    }
                });
            });
        };
        News.prototype.find = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.getTransport().send(Services.METHOD_GET_SINGLE_NEWS, Services.HTTP_METHOD_GET, new Map([
                                ['id', id]
                            ]))];
                        case 1:
                            data = _a.sent();
                            return [2, this.create(data[0])];
                    }
                });
            });
        };
        return News;
    }(Services.WebService));
    Services.News = News;
})(Services || (Services = {}));
var Services;
(function (Services) {
    function queryParams(params) {
        if (params === void 0) { params = {}; }
        return Object.keys(params)
            .map(function (k) { return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]); })
            .join('&');
    }
    function withQuery(url, params) {
        if (params === void 0) { params = {}; }
        var queryString = queryParams(params);
        return queryString ? url + (url.indexOf('?') === -1 ? '?' : '&') + queryString : url;
    }
    function parseXHRResult(xhr) {
        return {
            ok: xhr.status >= 200 && xhr.status < 300,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: xhr.responseText,
            json: function () { return JSON.parse(xhr.responseText); }
        };
    }
    function errorResponse(xhr, message) {
        if (message === void 0) { message = null; }
        return {
            ok: false,
            status: xhr.status,
            statusText: xhr.statusText,
            headers: xhr.getAllResponseHeaders(),
            data: message || xhr.statusText,
            json: function () { return JSON.parse(message || xhr.statusText); }
        };
    }
    function request(method, url, queryParams, body, options) {
        if (queryParams === void 0) { queryParams = {}; }
        if (body === void 0) { body = null; }
        if (options === void 0) { options = Interfaces.Services.DEFAULT_REQUEST_OPTIONS; }
        var ignoreCache = options.ignoreCache || Interfaces.Services.DEFAULT_REQUEST_OPTIONS.ignoreCache;
        var headers = options.headers || Interfaces.Services.DEFAULT_REQUEST_OPTIONS.headers;
        var timeout = options.timeout || Interfaces.Services.DEFAULT_REQUEST_OPTIONS.timeout;
        return new Promise(function (resolve) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, withQuery(url, queryParams));
            if (headers) {
                Object.keys(headers).forEach(function (key) { return xhr.setRequestHeader(key, headers[key]); });
            }
            if (ignoreCache) {
                xhr.setRequestHeader('Cache-Control', 'no-cache');
            }
            xhr.timeout = timeout;
            xhr.onload = function () {
                resolve(parseXHRResult(xhr));
            };
            xhr.onerror = function () {
                resolve(errorResponse(xhr, 'Failed to make request.'));
            };
            xhr.ontimeout = function () {
                resolve(errorResponse(xhr, 'Request took longer than expected.'));
            };
            if (method === 'post' && body) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(body));
            }
            else {
                xhr.send();
            }
        });
    }
    Services.request = request;
})(Services || (Services = {}));
var Services;
(function (Services) {
    var Transport = (function () {
        function Transport() {
        }
        Transport.prototype.send = function (apiMethod, httpMethod, data) {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, Services.request(httpMethod, this.prepareUrl(apiMethod), httpMethod === Services.HTTP_METHOD_GET ? this.prepareData(data) : {}, httpMethod !== Services.HTTP_METHOD_GET ? this.prepareData(data) : {})];
                        case 1:
                            response = _a.sent();
                            return [2, response.json()];
                    }
                });
            });
        };
        Transport.prototype.prepareUrl = function (apiMethod) {
            return apiMethod;
        };
        Transport.prototype.prepareData = function (data) {
            return data;
        };
        return Transport;
    }());
    Services.Transport = Transport;
})(Services || (Services = {}));
//# sourceMappingURL=lib.js.map