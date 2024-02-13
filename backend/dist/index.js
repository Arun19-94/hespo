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
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = require("./routes");
// import cors from 'cors';
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongo_local_1 = __importDefault(require("./component/mongo/mongo.local"));
dotenv_1.default.config({ path: './config.env' });
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// app.use(cors());
// app.use(helmet());
console.log("connect");
app.get('/', (req, res) => {
    console.log("---------------------");
    res.send('Express + TypeScript Server + backend');
});
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("EXPRESS-MONGOss");
    yield (0, mongo_local_1.default)();
});
init();
for (let i = 0; i < routes_1.ROUTES.length; i++) {
    const route = routes_1.ROUTES[i];
    app.use(route);
}
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
