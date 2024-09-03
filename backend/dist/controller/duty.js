"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = require("express");
const DutyService = __importStar(require("../service/duty"));
const router = (0, express_1.Router)();
router.post('', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('create duty', req.body);
        const { name } = req.body;
        if (!name) {
            throw new Error('name is required');
        }
        const data = yield DutyService.createDuty(name);
        console.log('create duty success', data);
        res.send(data);
    }
    catch (error) {
        console.log(error);
    }
}));
router.post('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!id) {
            throw new Error('id is required');
        }
        if (!name) {
            throw new Error('name is required');
        }
        const data = yield DutyService.updateDuty(Number(id), name);
        res.send(data);
    }
    catch (error) {
        console.log(error);
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            throw new Error('id is required');
        }
        const data = yield DutyService.deleteDuty(Number(id));
        res.send(data);
    }
    catch (error) {
        console.log(error);
    }
}));
router.get('/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield DutyService.listDuties();
        res.send(data);
    }
    catch (error) {
        console.log(error);
    }
}));
exports.default = router;
