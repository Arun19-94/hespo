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
const mongoose_1 = __importDefault(require("mongoose"));
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    //   poolSize: 10, // Maintain up to 10 socket connections
    //   bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await mongoose.connect('mongodb:27017/hespo');
        mongoose_1.default.connect(`mongodb://localhost:27017/hespo`, options);
        mongoose_1.default.connection.on('open', () => console.log('Connected'));
        mongoose_1.default.connection.on('error', (err) => console.log('Connection failed with - ', err));
        // If the Node process ends, close the Mongoose connection
        process.on("SIGINT", () => {
            console.log("Mongoose disconnected due to app termination");
            process.exit(0);
        });
    }
    catch (err) {
        console.log(err);
        console.log("Mongoose disconnected due to app termination");
        return process.exit(0);
    }
});
exports.default = connect;
