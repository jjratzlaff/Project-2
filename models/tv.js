const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    
    user: {
      type: Schema.Types.ObjectId, 
      ref: 'User' 
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  })
  
const tvSchema = new Schema({
  title: String,
  releaseYear: Number,
  genre: String,
  mpaaRating: String,
  nowShowing: Boolean,

  cast: [{
    type: Schema.Types.ObjectId, // from mongoose
    ref: 'Performer' 
    
  }],
  reviews: [reviewSchema]
}, {
  timestamps: true
});
	
module.exports = mongoose.model('Tv', tvSchema);

