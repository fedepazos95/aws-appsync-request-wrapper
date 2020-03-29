"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var Api_1 = require("./Api");
var URL = require("url");
var AWS = require("aws-sdk");
var aws_sdk_1 = require("aws-sdk");
var V4Signer = require("aws-sdk/lib/signers/v4");
var Util = require("aws-sdk/lib/util");
;
var AppSync = /** @class */ (function (_super) {
    __extends(AppSync, _super);
    function AppSync(apiUrl, region) {
        var _this = _super.call(this, { baseURL: apiUrl }) || this;
        _this.apiUrl = apiUrl;
        _this.region = region;
        return _this;
    }
    AppSync.prototype.query = function (post_body) {
        var uri = URL.parse(this.apiUrl);
        var httpRequest = new AWS.HttpRequest(new aws_sdk_1.Endpoint(uri.href), this.region);
        httpRequest.headers.host = uri.host || this.apiUrl;
        httpRequest.headers['Content-Type'] = 'application/json';
        httpRequest.method = 'POST';
        httpRequest.body = JSON.stringify(post_body);
        var signer = new V4Signer(httpRequest, 'appsync', true);
        signer.addAuthorization(AWS.config.credentials, Util.date.getDate());
        return this.request({
            method: 'POST',
            url: uri.href,
            data: httpRequest.body,
            headers: httpRequest.headers
        });
    };
    return AppSync;
}(Api_1.default));
exports.AppSync = AppSync;
