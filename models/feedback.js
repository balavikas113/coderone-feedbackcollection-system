const mongoose = require('mongoose');  

const feedbackSchema = new mongoose.Schema({  
    name: { type: String, required: true },  
    contactNumber: { type: String, required: true },  
    email: { type: String, required: true, match: /.*\@.*\..*/ }, 
    message: { type: String, required: true }  
});  

const Feedback = mongoose.model('feedback', feedbackSchema);  

module.exports = Feedback;