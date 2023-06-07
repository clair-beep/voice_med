import { Request, Response } from 'express';
import axios from 'axios';

export const showMeTheMusic = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const apiUrl = process.env.API_URL || 'http://localhost:3001';

    const songs = await axios.get(apiUrl + '/song');
    //console.log(songs.data);
    res.render('index', { songs: songs.data });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
