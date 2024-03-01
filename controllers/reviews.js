const TvModel = require('../models/tv')


module.exports = {
	create,
    delete: deleteOne,
    edit,
    update
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

// Include the next parameter - used for error handling in the catch
async function deleteOne(req, res) {
    try {
        const tvDoc = await TvModel.findOne({'reviews._id': req.params.id, 'reviews.user': req.user._id})

        if (!tvDoc) return res.redirect('/tv')

        tvDoc.reviews.remove(req.params.id)

        tvDoc.save();

        res.redirect(`/tv/${tvDoc._id}`);

    } catch(err){
        console.log(err)
        res.send(err)
    }
}

async function edit(req, res) {
   
    const tvDoc = await TvModel.findOne({'reviews._id': req.params.id});
 
    const review = tvDoc.reviews.id(req.params.id);
    
    res.render('/reviews/edit', { review });
}

async function update(req, res) {
   
    const tvDoc = await TvModel.findOne({'reviews._id': req.params.id});
    
    const reviewSubdoc = TvModel.reviews.id(req.params.id);
    
    if (!commentSubdoc.userId.equals(req.user._id)) return res.redirect(`/tv/${tvDoc._id}`);
   
    commentSubdoc.text = req.body.text;
    try {
      await tvDoc.save();
    } catch (e) {
      console.log(err);
    }

    res.redirect(`/tv/${tvDoc._id}`);
}
  



