import mongoose, { Document, Schema } from 'mongoose';
import Song from '../models/Song';

interface IPlaylist extends Document {
  name: string;
  songs: mongoose.Types.ObjectId[]; // Array of ObjectIds referencing Song model
}

const playlistSchema: Schema = new Schema({
  name: { type: String, required: true },
  songs: [{ type: Schema.Types.ObjectId, ref: 'Song', required: true }], // Reference to Song model
});

const Playlist = mongoose.model<IPlaylist>('Playlist', playlistSchema);

export default Playlist;
