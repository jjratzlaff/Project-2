
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
    console.log(req.body, "contents")
	req.body.nowShowing = !!req.body.nowShowing;
	
    req.body.cast = req.body.cast.trim();

	  if (req.body.cast) req.body.cast = req.body.cast.split(/\s*,\s*/);



	try {


	  const createdTvDoc = await TvModel.create(req.body)

	  res.redirect(`/tv/new`)
	} catch (err) {
	  console.log(err);
	  res.redirect('/tv/new')
	}
  }

function newTv(req,res){



    res.render('tv/new')
}
