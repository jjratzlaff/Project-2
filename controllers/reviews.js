const TvModel = require('../models/tv')


module.exports = {
	create
}

async function create(req, res){
	
	console.log('====================================')
	console.log(req.user, "< ---- req.user")
	console.log('====================================')
	try {
		
		const tvDoc = await TvModel.findById(req.params.id)
		
		req.body.user = req.user._id
		req.body.userName = req.user.name
		req.body.userAvatar = req.user.avatar
		
		tvDoc.reviews.push(req.body); 
		
		await tvDoc.save() 
		
		res.redirect(`/tv/${req.params.id}`)
		

	} catch(err){
		console.log(err)
		res.send(err)
	}
	


}