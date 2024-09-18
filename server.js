const express = require('express');  
const mongoose = require('mongoose');  
const bodyParser = require('body-parser');  
const Feedback = require('./models/feedback');  

const app = express();  
const PORT = 7306;  

 

mongoose.connect('mongodb://localhost:27017/coderone_feedback')  
    .then(() => console.log('MongoDB connected successfully'))  
    .catch(err => console.error('MongoDB connection error:', err));   

app.listen(PORT, () => {  
    console.log(`Server is running on http://localhost:${PORT}`);  
});
app.use(bodyParser.urlencoded({ extended: true }));  
app.use(express.static('views'));
app.post('/submit-feedback', (req, res) => {  
    console.log('Form data received:', req.body);  

     
    if (!req.body.message) {  
        return res.status(400).send('Message is required');   
    }  

    const feedback = new Feedback({  
        name: req.body.name,  
        contactNumber: req.body.contactNumber,  
        email: req.body.email,  
        message: req.body.message  
    });  

    feedback.save()  
        .then(() => {  
            res.send(`  
                <h1>Thank you for your feedback!</h1>  
                
            `);  
        })  
        .catch(err => {  
            console.error('Error saving feedback:', err);  
            res.status(500).send('There was an error saving your feedback.');  
        });  
});


