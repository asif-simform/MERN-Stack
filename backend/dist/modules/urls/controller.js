"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllShortUrlsByUser = exports.getShortUrl = exports.createShortUrl = void 0;
var express_validator_1 = require("express-validator");
var services_1 = require("./services");
var responseMessages_1 = require("../../constants/responseMessages");
var sendResponse_1 = require("../../utils/sendResponse");
var handleCustomErrors_1 = require("../../utils/handleCustomErrors");
var createShortUrl = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, extractedErrors, originalUrl, baseURL, userId, data, err_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    extractedErrors = (0, handleCustomErrors_1.extractErrors)(errors);
                    return [2 /*return*/, (0, sendResponse_1.sendResponse)(res, 422, {}, { errors: extractedErrors })];
                }
                originalUrl = req.body.originalUrl;
                baseURL = req.get('origin');
                userId = ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id) || '';
                return [4 /*yield*/, (0, services_1.create)({ originalUrl: originalUrl, baseURL: baseURL, userId: userId })];
            case 1:
                data = _b.sent();
                return [2 /*return*/, (0, sendResponse_1.sendResponse)(res, 201, data, responseMessages_1.reponseMessages.genericSuccess)];
            case 2:
                err_1 = _b.sent();
                return [2 /*return*/, (0, handleCustomErrors_1.handleCustomError)(res, err_1)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createShortUrl = createShortUrl;
var getShortUrl = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, extractedErrors, urlId, originalUrl, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    extractedErrors = (0, handleCustomErrors_1.extractErrors)(errors);
                    return [2 /*return*/, (0, sendResponse_1.sendResponse)(res, 422, {}, { errors: extractedErrors })];
                }
                urlId = req.params.urlId;
                return [4 /*yield*/, (0, services_1.get)(urlId)];
            case 1:
                originalUrl = _a.sent();
                return [2 /*return*/, (0, sendResponse_1.sendResponse)(res, 201, { originalUrl: originalUrl }, responseMessages_1.reponseMessages.genericSuccess)];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, (0, handleCustomErrors_1.handleCustomError)(res, err_2)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getShortUrl = getShortUrl;
var getAllShortUrlsByUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, extractedErrors, userId, data, err_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    extractedErrors = (0, handleCustomErrors_1.extractErrors)(errors);
                    return [2 /*return*/, (0, sendResponse_1.sendResponse)(res, 422, {}, { errors: extractedErrors })];
                }
                userId = ((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id) || '';
                return [4 /*yield*/, (0, services_1.getAll)(userId)];
            case 1:
                data = _b.sent();
                return [2 /*return*/, (0, sendResponse_1.sendResponse)(res, 201, { data: data }, responseMessages_1.reponseMessages.genericSuccess)];
            case 2:
                err_3 = _b.sent();
                return [2 /*return*/, (0, handleCustomErrors_1.handleCustomError)(res, err_3)];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllShortUrlsByUser = getAllShortUrlsByUser;
