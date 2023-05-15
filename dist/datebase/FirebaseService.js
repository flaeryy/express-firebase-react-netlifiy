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
const { db } = require("./firebase");
const { getDocs, collection } = require("firebase/firestore");
class FirebaseService {
    constructor() {
        // Inicijalizacija Firebase servisa
    }
    static getInstance() {
        if (!FirebaseService.instance) {
            FirebaseService.instance = new FirebaseService();
        }
        return FirebaseService.instance;
    }
    fetchDataCollection(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRef = collection(db, params);
            const querySnapshot = yield getDocs(dataRef);
            const data = [];
            querySnapshot.forEach((document) => {
                const user = document.data();
                data.push(user);
            });
            return data;
        });
    }
}
exports.default = FirebaseService;
