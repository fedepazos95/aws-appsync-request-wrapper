"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var Api = /** @class */ (function () {
    function Api(config) {
        this.api = axios_1.default.create(config);
        this.api.interceptors.request.use(function (param) { return (__assign({}, param)); });
    }
    Api.prototype.getUri = function (config) {
        return this.api.getUri(config);
    };
    Api.prototype.request = function (config) {
        return this.api.request(config);
    };
    Api.prototype.get = function (url, config) {
        return this.api.get(url, config);
    };
    Api.prototype.delete = function (url, config) {
        return this.api.delete(url, config);
    };
    Api.prototype.head = function (url, config) {
        return this.api.head(url, config);
    };
    Api.prototype.post = function (url, data, config) {
        return this.api.post(url, data, config);
    };
    Api.prototype.put = function (url, data, config) {
        return this.api.put(url, data, config);
    };
    Api.prototype.patch = function (url, data, config) {
        return this.api.patch(url, data, config);
    };
    return Api;
}());
exports.default = Api;
