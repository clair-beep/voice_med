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
exports.deleteSong = exports.createSong = exports.getSong = exports.getSongs = void 0;
const Song_1 = __importDefault(require("../models/Song"));
const mongoose_1 = require("mongoose");
const getSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield Song_1.default.find();
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch songs' });
    }
});
exports.getSongs = getSongs;
const getSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        res.status(400).json({ error: 'Invalid playlist ID format' });
        return;
    }
    try {
        const song = yield Song_1.default.findById(id);
        if (!song) {
            res.status(404).json({ error: 'Song not found' });
            return;
        }
        res.status(200).json(song);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retieve song data' });
    }
});
exports.getSong = getSong;
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { artist, album, title, length, track } = req.body;
        if (!artist ||
            typeof artist !== 'string' ||
            !album ||
            typeof album !== 'string' ||
            !title ||
            typeof title !== 'string' ||
            !length ||
            typeof length !== 'number' ||
            length <= 0 ||
            !track ||
            typeof track !== 'number') {
            res
                .status(400)
                .json({ error: 'Invalid or missing fields in the request body' });
            return;
        }
        const newSong = new Song_1.default({ artist, album, title, length, track });
        const savedSong = yield newSong.save();
        res.status(201).json(savedSong);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to save song data' });
    }
});
exports.createSong = createSong;
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        res.status(400).json({ error: 'Invalid song ID format' });
        return;
    }
    try {
        const song = yield Song_1.default.findByIdAndDelete(id);
        if (!song) {
            res.status(404).json({ error: 'Song not found' });
            return;
        }
        res.json({ message: 'Song deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.deleteSong = deleteSong;
