const PerformerModel = require("../models/performer");
const TvModel = require('../models/tv')

module.exports = {
  new: newPerformer,
  create,
  addToCast
};

async function addToCast(req, res){
	
	
	try {
		// Find the tv (req.params comes from the http request)
		const tvDoc = await TvModel.findById(req.params.tvId);
		// add the performers id to the tvDoc.cast array
		tvDoc.cast.push(req.body.performerId);
		// we mutated the tvDoc, so we have to tell the database!
		await tvDoc.save()
		// redirect the client back to the tvs show page!
		res.redirect(`/tv/${req.params.tvId}`)


	} catch(err){
		console.log(err)
		res.send(err)
	}

}

async function create(req, res) {

	// https://stackoverflow.com/questions/7556591/is-the-javascript-date-object-always-one-day-off
	const s = req.body.born;
	
	req.body.born = `${s.substr(5, 2)}-${s.substr(8, 2)}-${s.substr(0, 4)}`;
  
  
  
	try {
									
  
	  const createdPerformer = await PerformerModel.create(req.body);
	  console.log(createdPerformer, " <- createdPerformer")
	  // tell the client to make a GET request to /performers/new
	  res.redirect("/performers/new");
	} catch (err) {
	  // if there is an error send back the object 
	  res.send(err);
	}
  }
  
  async function newPerformer(req, res) {
	try {
	  const allPerformers = await PerformerModel.find({});
	  res.render("performers/new", {
		title: "Add Performer",
		performers: allPerformers,
	  });
	} catch (err) {
	  res.send(err);
	}
  }