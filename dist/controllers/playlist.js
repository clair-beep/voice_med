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
exports.addSongsToPlaylist = exports.deletePlaylist = exports.createPlaylist = exports.getPlaylist = exports.getPlaylists = void 0;
const Playlist_1 = __importDefault(require("../models/Playlist"));
const Song_1 = __importDefault(require("../models/Song"));
const mongoose_1 = require("mongoose");
const getPlaylists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield Playlist_1.default.find();
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch playlists' });
    }
});
exports.getPlaylists = getPlaylists;
const getPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        res.status(400).json({ error: 'Invalid playlist ID format' });
        return;
    }
    try {
        const playlist = yield Playlist_1.default.findById(id);
        if (!playlist) {
            res.status(404).json({ error: 'Playlist not found' });
            return;
        }
        res.status(200).json(playlist);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retrieve playlist data' });
    }
});
exports.getPlaylist = getPlaylist;
const createPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.is('application/json')) {
        throw new Error('Invalid request format. Expected JSON.');
    }
    const { name, songs } = req.body;
    if (!name || typeof name !== 'string') {
        res.status(400).json({
            error: 'Invalid or missing name field for the name of the playlist',
        });
        return;
    }
    if (!songs || !Array.isArray(songs) || songs.length === 0) {
        res
            .status(400)
            .json({ error: 'Invalid or missing name field for the songs' });
        return;
    }
    try {
        const foundSongs = yield Song_1.default.find({ _id: { $in: songs } });
        if (foundSongs.length !== songs.length) {
            res.status(400).json({ error: 'One or more songs do not exist' });
            return;
        }
        const newPlaylist = new Playlist_1.default({ name, songs: foundSongs });
        const savedPlaylist = yield newPlaylist.save();
        res.status(201).json(savedPlaylist);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.createPlaylist = createPlaylist;
const deletePlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        res.status(400).json({ error: 'Invalid playlist ID format' });
        return;
    }
    try {
        const playlist = yield Playlist_1.default.findByIdAndDelete(id);
        if (!playlist) {
            res.status(404).json({ error: 'playlist not found' });
            return;
        }
        res.json({ message: 'playlist deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.deletePlaylist = deletePlaylist;
const addSongsToPlaylist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.is('application/json')) {
        throw new Error('Invalid request format. Expected JSON.');
    }
    const { id } = req.params;
    const { name, songs } = req.body;
    if (!(0, mongoose_1.isValidObjectId)(id)) {
        res.status(400).json({ error: 'Invalid playlist ID format' });
        return;
    }
    if (!name && !songs) {
        res.status(400).json({
            error: 'Invalid request. Please provide either the new name or the song ID.',
        });
        return;
    }
    try {
        const playlist = yield Playlist_1.default.findById(id);
        if (!playlist) {
            res.status(404).json({ error: 'Playlist not found' });
            return;
        }
        if (name) {
            if (typeof name !== 'string') {
                res.status(400).json({
                    error: 'Invalid type of input, I can only handle strings :)',
                });
                return;
            }
            playlist.name = name;
        }
        if (songs) {
            if (!Array.isArray(songs) || songs.length === 0) {
                res.status(400).json({
                    error: 'Invalid type of input, I can only handle arrays :)',
                });
                return;
            }
            const foundSongs = yield Song_1.default.find({ _id: { $in: songs } });
            if (foundSongs.length !== songs.length) {
                res.status(400).json({ error: 'One or more songs do not exist' });
                return;
            }
            playlist.songs.push(...foundSongs.map((song) => song._id));
        }
        const updatedPlaylist = yield playlist.save();
        res.status(200).json(updatedPlaylist);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to retieve playlist data' });
    }
});
exports.addSongsToPlaylist = addSongsToPlaylist;
