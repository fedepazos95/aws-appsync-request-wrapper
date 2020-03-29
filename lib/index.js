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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Api_1 = __importDefault(require("./Api"));
var URL = __importStar(require("url"));
var aws_sdk_1 = __importStar(require("aws-sdk"));
var V4Signer = __importStar(require("aws-sdk/lib/signers/v4"));
var Util = __importStar(require("aws-sdk/lib/util"));
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
        var httpRequest = new aws_sdk_1.default.HttpRequest(new aws_sdk_1.Endpoint(uri.href), this.region);
        httpRequest.headers.host = uri.host || this.apiUrl;
        httpRequest.headers['Content-Type'] = 'application/json';
        httpRequest.method = 'POST';
        httpRequest.body = JSON.stringify(post_body);
        var signer = new V4Signer(httpRequest, 'appsync', true);
        signer.addAuthorization(aws_sdk_1.default.config.credentials, Util.date.getDate());
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
