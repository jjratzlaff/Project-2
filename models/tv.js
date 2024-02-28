const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const tvSchema = new Schema({
  title: String,
  releaseYear: Number,
  genre: String,
  contentRating: String,
  cast: [String],
  nowShowing: Boolean
}, {
  timestamps: true
});
	
module.exports = mongoose.model('Tv', tvSchema);

