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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// Create Express server
var routes = (0, express_1.default)();
var musicDataController = __importStar(require("../controllers/index"));
var songController = __importStar(require("../controllers/songs"));
var playlistController = __importStar(require("../controllers/playlist"));
var pagination_1 = require("../middleware/pagination");
routes.get('/', musicDataController.showMeTheMusic);
routes.get('/song', pagination_1.searchAndPaginationMiddleware, songController.getSongs);
routes.get('/song/:id', songController.getSong);
routes.post('/song', songController.createSong);
routes.delete('/song/:id', songController.deleteSong);
routes.get('/playlist', playlistController.getPlaylists);
routes.get('/playlist/:id', playlistController.getPlaylist);
routes.post('/playlist', playlistController.createPlaylist);
routes.delete('/playlist/:id', playlistController.deletePlaylist);
routes.put('/playlist/:id', playlistController.addSongsToPlaylist);
exports.default = routes;
