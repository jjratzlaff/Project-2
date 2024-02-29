
const TvModel = require('../models/tv')
const PeformerModel = require('../models/performer');

module.exports = {
    new: newTv,
    create: create,
    index,
    show
}
async function show(req, res) {

  
	try {
  
	  const tvFromTheDatabase = await TvModel
	  									.findById(req.params.id)
										.populate('cast') 
										.exec()			
														
									
  
									
  
	  console.log(tvFromTheDatabase);

		const performersNotInThetv = await PeformerModel.find({_id: {$nin: tvFromTheDatabase.cast}})
		
  

	
	  res.render("tv/show", {
		tv: tvFromTheDatabase, 
		performers: performersNotInThetv
	  });
	} catch (err) {
	  console.log(err)
	  res.send(err);
	}
  }

async function index(req, res){
	
	
	try {
	
		const tvDocumentsFromTheDB = await TvModel.find({})
		console.log(tvDocumentsFromTheDB)
		
		res.render('tv/index', {tvDocs: tvDocumentsFromTheDB})
		
	} catch(err){
		console.log(err)
		res.redirect('/')
	}
}

async function create(req, res) {

	req.body.nowShowing = !!req.body.nowShowing;
	
	for (let key in req.body) {
	  if (req.body[key] === "") delete req.body[key];
	}
	try {
	  const tvFromTheDatabase = await TvModel.create(req.body); 
	 
	  console.log(tvFromTheDatabase);
  

	  res.redirect(`/tv/${tvFromTheDatabase._id}`);
	} catch (err) {
	  // Typically some sort of validation error
	  console.log(err);
	  res.render("tv/new", { errorMsg: err.message });
	}
  }
  

function newTv(req, res){

	// res.render looks in our 
	// views folder for the ejs page
	res.render('tv/new')
}
