import express from 'express';
const routes = express();

// import * as musicDataController from '../controllers/index';
import * as songController from '../controllers/songs';
import * as playlistController from '../controllers/playlist';
import { searchAndPaginationMiddleware } from '../middleware/pagination';

// routes.get('/', musicDataController.showMeTheMusic);
routes.get('/song', searchAndPaginationMiddleware, songController.getSongs);
routes.get('/song/:id', songController.getSong);
routes.post('/song', songController.createSong);
routes.delete('/song/:id', songController.deleteSong);

routes.get('/playlist', playlistController.getPlaylists);
routes.get('/playlist/:id', playlistController.getPlaylist);
routes.post('/playlist', playlistController.createPlaylist);
routes.delete('/playlist/:id', playlistController.deletePlaylist);
routes.put('/playlist/:id', playlistController.addSongsToPlaylist);

export default routes;
