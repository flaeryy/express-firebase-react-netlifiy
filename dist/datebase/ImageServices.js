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
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("./firebase");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");
class ImageService {
    static getImageUrl(imagePath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imageRef = ref(firebase_1.storage, imagePath);
                const downloadURL = yield getDownloadURL(imageRef);
                console.log("Download URL:", downloadURL);
                return downloadURL;
            }
            catch (error) {
                console.log("Error getting image URL:", error);
                return null;
            }
        });
    }
}
exports.default = ImageService;
