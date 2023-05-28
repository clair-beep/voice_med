import { Request, Response } from 'express';
import Playlist from '../models/Playlist';
import Song from '../models/Song';
import { isValidObjectId } from 'mongoose';

export const getPlaylists = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const songs = await Playlist.find();

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch playlists' });
  }
};

export const getPlaylist = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: 'Invalid playlist ID format' });
    return;
  }
  try {
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      res.status(404).json({ error: 'Playlist not found' });
      return;
    }
    res.status(200).json(playlist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve playlist data' });
  }
};

export const createPlaylist = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
    const foundSongs = await Song.find({ _id: { $in: songs } });
    if (foundSongs.length !== songs.length) {
      res.status(400).json({ error: 'One or more songs do not exist' });
      return;
    }

    const newPlaylist = new Playlist({ name, songs: foundSongs });

    const savedPlaylist = await newPlaylist.save();
    res.status(201).json(savedPlaylist);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deletePlaylist = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: 'Invalid playlist ID format' });
    return;
  }

  try {
    const playlist = await Playlist.findByIdAndDelete(id);

    if (!playlist) {
      res.status(404).json({ error: 'playlist not found' });
      return;
    }
    res.json({ message: 'playlist deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const addSongsToPlaylist = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.is('application/json')) {
    throw new Error('Invalid request format. Expected JSON.');
  }
  const { id } = req.params;
  const { name, songs } = req.body;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: 'Invalid playlist ID format' });
    return;
  }

  if (!name && !songs) {
    res.status(400).json({
      error:
        'Invalid request. Please provide either the new name or the song ID.',
    });
    return;
  }

  try {
    const playlist = await Playlist.findById(id);

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
      const foundSongs = await Song.find({ _id: { $in: songs } });

      if (foundSongs.length !== songs.length) {
        res.status(400).json({ error: 'One or more songs do not exist' });
        return;
      }
      playlist.songs.push(...foundSongs.map((song) => song._id));
    }

    const updatedPlaylist = await playlist.save();

    res.status(200).json(updatedPlaylist);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retieve playlist data' });
  }
};
