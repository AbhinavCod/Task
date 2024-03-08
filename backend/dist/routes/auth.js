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
const auth_1 = __importDefault(require("../models/auth"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const router = express_1.default.Router();
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        let user = yield auth_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        return res.status(200).json({ userId: user._id });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid Credentials" });
    }
}));
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, confirmPassword } = req.body;
    try {
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Invalid Data" });
        }
        let user = yield auth_1.default.findOne({ email: email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        user = new auth_1.default(req.body);
        yield user.save();
        return res.status(200).json({ message: "User registered successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid Credentials" });
    }
}));
router.post("/forgot-password", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, oldPassword, newPassword } = req.body;
    try {
        let user = yield auth_1.default.findOne({ email: email });
        if (!user) {
            console.log("here");
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = yield bcryptjs_1.default.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 8);
        const newUser = yield auth_1.default.findOneAndUpdate({ email: email }, { $set: { password: hashedPassword } }, { new: true });
        return res.status(200).json({ message: "Updated Successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid Credentials" });
    }
}));
exports.default = router;
