const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: 'ec4c8e89b0b444708655320e699542f5'});

const handleAPICall=(req,res)=>{
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        req.body.input)
    .then(data=>{
        res.json(data);
    })
    .catch(err=> res.status(400).json("cannot connect to the API"))
}

const imageHandler=(req,res,db)=>{
    const { id } = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0]);
    })
    .catch(err=>res.status(400).json('Unable to get Count'))
}

module.exports={
    imageHandler,
    handleAPICall
};