
const TvModel = require('../models/tv')

module.exports = {
    new: newShow,
    create, create
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

function newShow(req,res){



    res.render('tv/new')
}
