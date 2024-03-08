"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const auth_1 = __importDefault(require("./routes/auth"));
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect("mongodb+srv://admin:AKPzufqXcD8TK4Zw@cluster0.4krj7mm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("Connection Successfull");
}).catch((e) => {
    console.log(e);
    console.log("NO Connection");
});
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist")));
app.use("/api/auth", auth_1.default);
app.get("/", (req, res) => {
    res.json({ message: "Hello world" });
});
app.listen(port, () => {
    console.log(`Listening at port no ${port}`);
});
