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
exports.deleteDuty = exports.listDuties = exports.updateDuty = exports.createDuty = void 0;
const postgresql_1 = __importDefault(require("../package/postgresql"));
const tableName = 'public.duty';
const createDuty = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield postgresql_1.default.create(tableName, {
            name,
        });
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.createDuty = createDuty;
const updateDuty = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield postgresql_1.default.update(tableName, { name }, 'id = $1', [id]);
        return data;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
});
exports.updateDuty = updateDuty;
const listDuties = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield postgresql_1.default.read(tableName, '', []); // Pass an empty string for no condition
        return data;
    }
    catch (error) {
        console.log(error);
        throw error; // Optionally rethrow the error for handling further up the stack
    }
});
exports.listDuties = listDuties;
const deleteDuty = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield postgresql_1.default.delete(tableName, 'id = $1', [id]);
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteDuty = deleteDuty;
