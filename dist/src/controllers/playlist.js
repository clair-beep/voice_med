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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSongsToPlaylist = exports.deletePlaylist = exports.createPlaylist = exports.getPlaylist = exports.getPlaylists = void 0;
var Playlist_1 = __importDefault(require("../models/Playlist"));
var Song_1 = __importDefault(require("../models/Song"));
var mongoose_1 = require("mongoose");
var getPlaylists = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var songs, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Playlist_1.default.find()];
            case 1:
                songs = _a.sent();
                res.status(200).json(songs);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ error: 'Failed to fetch playlists' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getPlaylists = getPlaylists;
var getPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, playlist, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    res.status(400).json({ error: 'Invalid playlist ID format' });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Playlist_1.default.findById(id)];
            case 2:
                playlist = _a.sent();
                if (!playlist) {
                    res.status(404).json({ error: 'Playlist not found' });
                    return [2 /*return*/];
                }
                res.status(200).json(playlist);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({ error: 'Failed to retrieve playlist data' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPlaylist = getPlaylist;
var createPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, songs, foundSongs, newPlaylist, savedPlaylist, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!req.is('application/json')) {
                    throw new Error('Invalid request format. Expected JSON.');
                }
                _a = req.body, name = _a.name, songs = _a.songs;
                if (!name || typeof name !== 'string') {
                    res.status(400).json({
                        error: 'Invalid or missing name field for the name of the playlist',
                    });
                    return [2 /*return*/];
                }
                if (!songs || !Array.isArray(songs) || songs.length === 0) {
                    res
                        .status(400)
                        .json({ error: 'Invalid or missing name field for the songs' });
                    return [2 /*return*/];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Song_1.default.find({ _id: { $in: songs } })];
            case 2:
                foundSongs = _b.sent();
                if (foundSongs.length !== songs.length) {
                    res.status(400).json({ error: 'One or more songs do not exist' });
                    return [2 /*return*/];
                }
                newPlaylist = new Playlist_1.default({ name: name, songs: foundSongs });
                return [4 /*yield*/, newPlaylist.save()];
            case 3:
                savedPlaylist = _b.sent();
                res.status(201).json(savedPlaylist);
                return [3 /*break*/, 5];
            case 4:
                error_3 = _b.sent();
                res.status(500).json({ error: 'Internal server error' });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createPlaylist = createPlaylist;
var deletePlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, playlist, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    res.status(400).json({ error: 'Invalid playlist ID format' });
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Playlist_1.default.findByIdAndDelete(id)];
            case 2:
                playlist = _a.sent();
                if (!playlist) {
                    res.status(404).json({ error: 'playlist not found' });
                    return [2 /*return*/];
                }
                res.json({ message: 'playlist deleted successfully' });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ error: 'Server error' });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePlaylist = deletePlaylist;
var addSongsToPlaylist = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name, songs, playlist, foundSongs, updatedPlaylist, error_5;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!req.is('application/json')) {
                    throw new Error('Invalid request format. Expected JSON.');
                }
                id = req.params.id;
                _a = req.body, name = _a.name, songs = _a.songs;
                if (!(0, mongoose_1.isValidObjectId)(id)) {
                    res.status(400).json({ error: 'Invalid playlist ID format' });
                    return [2 /*return*/];
                }
                if (!name && !songs) {
                    res.status(400).json({
                        error: 'Invalid request. Please provide either the new name or the song ID.',
                    });
                    return [2 /*return*/];
                }
                _c.label = 1;
            case 1:
                _c.trys.push([1, 6, , 7]);
                return [4 /*yield*/, Playlist_1.default.findById(id)];
            case 2:
                playlist = _c.sent();
                if (!playlist) {
                    res.status(404).json({ error: 'Playlist not found' });
                    return [2 /*return*/];
                }
                if (name) {
                    if (typeof name !== 'string') {
                        res.status(400).json({
                            error: 'Invalid type of input, I can only handle strings :)',
                        });
                        return [2 /*return*/];
                    }
                    playlist.name = name;
                }
                if (!songs) return [3 /*break*/, 4];
                if (!Array.isArray(songs) || songs.length === 0) {
                    res.status(400).json({
                        error: 'Invalid type of input, I can only handle arrays :)',
                    });
                    return [2 /*return*/];
                }
                return [4 /*yield*/, Song_1.default.find({ _id: { $in: songs } })];
            case 3:
                foundSongs = _c.sent();
                if (foundSongs.length !== songs.length) {
                    res.status(400).json({ error: 'One or more songs do not exist' });
                    return [2 /*return*/];
                }
                (_b = playlist.songs).push.apply(_b, foundSongs.map(function (song) { return song._id; }));
                _c.label = 4;
            case 4: return [4 /*yield*/, playlist.save()];
            case 5:
                updatedPlaylist = _c.sent();
                res.status(200).json(updatedPlaylist);
                return [3 /*break*/, 7];
            case 6:
                error_5 = _c.sent();
                res.status(500).json({ error: 'Failed to retieve playlist data' });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.addSongsToPlaylist = addSongsToPlaylist;
