import mongoose from 'mongoose';
import shortid from 'shortid';
import dotenv from 'dotenv';

dotenv.config();

const shortUrlSchema = mongoose.Schema({
  fullUrl: { type: String },
  shortUrl: { type: String, default: shortid.generate },
}, {
  timestamps: true,
});

const urls = mongoose.model('urls', shortUrlSchema);

export default urls;
