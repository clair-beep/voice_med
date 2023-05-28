import { Request, Response } from 'express';
import Song from '../models/Song';
import { isValidObjectId } from 'mongoose';

export const getSongs = async (req: Request, res: Response): Promise<void> => {
  try {
    const songs = await Song.find();

    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch songs' });
  }
};

export const getSong = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: 'Invalid playlist ID format' });
    return;
  }

  try {
    const song = await Song.findById(id);
    if (!song) {
      res.status(404).json({ error: 'Song not found' });
      return;
    }
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retieve song data' });
  }
};

export const createSong = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { artist, album, title, length, track } = req.body;

    if (
      !artist ||
      typeof artist !== 'string' ||
      !album ||
      typeof album !== 'string' ||
      !title ||
      typeof title !== 'string' ||
      !length ||
      typeof length !== 'number' ||
      length <= 0 ||
      !track ||
      typeof track !== 'number'
    ) {
      res
        .status(400)
        .json({ error: 'Invalid or missing fields in the request body' });
      return;
    }
    const newSong = new Song({ artist, album, title, length, track });

    const savedSong = await newSong.save();

    res.status(201).json(savedSong);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save song data' });
  }
};

export const deleteSong = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: 'Invalid song ID format' });
    return;
  }

  try {
    const song = await Song.findByIdAndDelete(id);

    if (!song) {
      res.status(404).json({ error: 'Song not found' });
      return;
    }
    res.json({ message: 'Song deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
