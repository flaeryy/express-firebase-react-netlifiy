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
const firestore_1 = require("firebase/firestore");
const express_1 = __importDefault(require("express"));
const ImageServices_1 = __importDefault(require("../datebase/ImageServices"));
const { db } = require("../datebase//firebase");
const router = express_1.default.Router();
router.get("/:param", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyword = req.params.param;
    console.log(keyword);
    const results = [];
    const collections = ["waters", "rice-bowls"];
    for (const collectionName of collections) {
        const collectionRef = (0, firestore_1.collection)(db, collectionName);
        const querySnapshot = yield (0, firestore_1.getDocs)(collectionRef);
        querySnapshot.forEach((document) => {
            const data = document.data();
            const { title, desc } = data;
            if (title.includes(keyword) || desc.includes(keyword)) {
                results.push(data);
            }
        });
    }
    for (const key in results) {
        const imagePath = results[key].img;
        if (imagePath) {
            const imageUrl = yield ImageServices_1.default.getImageUrl(imagePath);
            results[key].url = imageUrl;
        }
    }
    res.json(results);
}));
exports.default = router;
