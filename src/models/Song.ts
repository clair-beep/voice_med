import mongoose, { Document, Schema } from 'mongoose';

interface ISong extends Document {
  artist: string;
  album: string;
  title: string;
  length: number;
  track: number;
}

const songSchema: Schema = new Schema({
  artist: { type: String, required: true },
  album: { type: String, required: true },
  title: { type: String, required: true },
  length: { type: Number, required: true },
  track: { type: Number, required: true },
});

const Song = mongoose.model<ISong>('Song', songSchema);

export default Song;
