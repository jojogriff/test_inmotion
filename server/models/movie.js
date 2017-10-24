const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
  posterImage: String,
  title: String,
  genre: String,
  year: String,
  rating: String,
  actors: Array,
  uploadedByUser: { type: String, ref: 'user'}
}, { timestamps: true });

const MovieModel = mongoose.model('movie', movieSchema);

module.exports = MovieModel;
