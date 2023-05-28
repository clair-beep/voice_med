import express from 'express';

// Create Express server
const routes = express();

import * as songController from '../controllers/songs';
import * as playlistController from '../controllers/playlist';
import * as testController from '../controllers/test';

routes.get('/song', songController.getSongs);
routes.get('/song/:id', songController.getSong);
routes.post('/song', songController.createSong);
routes.delete('/song/:id', songController.deleteSong);

routes.get('/playlist', playlistController.getPlaylists);
routes.get('/playlist/:id', playlistController.getPlaylist);
routes.post('/playlist', playlistController.createPlaylist);
routes.delete('/playlist/:id', playlistController.deletePlaylist);
routes.put('/playlist/:id', playlistController.addSongsToPlaylist);

routes.get('/user', testController.getThis);

export default routes;
