const Clarifai = require('clarifai');
const clarifai = new Clarifai.App({
    apiKey: '9e2b8beeaf164b688c3f6df9edfe8dba'
  })
const handleApiCall = (req, res) => {
    const { userInput } = req.body;
    clarifai.models.predict(Clarifai.FACE_DETECT_MODEL, userInput)
    .then(data => {
        res.json(data);
    })
}

const handleImage = (req, res, database) => {
    const { id } = req.body;
    database('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entries'));
}
module.exports = {
    handleImage,
    handleApiCall
}