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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FirebaseService_1 = __importDefault(require("../datebase/FirebaseService"));
const ImageServices_1 = __importDefault(require("../datebase/ImageServices"));
const router = express_1.default.Router();
const firebaseService = FirebaseService_1.default.getInstance();
router.get("/:param", handleRequest);
console.log("bascifetch");
function handleRequest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const param = req.params.param;
        const json = yield firebaseService.fetchDataCollection(param);
        for (const key in json) {
            const imagePath = json[key].img;
            if (imagePath) {
                const imageUrl = yield ImageServices_1.default.getImageUrl(imagePath);
                json[key].url = imageUrl;
            }
        }
        res.json(json);
    });
}
exports.default = router;
