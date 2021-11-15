//require neccessary modules
const express = require('express');
const connectDB = require('./config/db');
const {check, validationResult} = require('express-validator');
const cors = require('cors');
const completePayment = require('./helper/completePayment');
const User = require('./models/User');
const path = require('path');


const app = express();
const port = process.env.PORT || 5000;

//establish connection with database
connectDB();
app.use(cors());

app.use(express.json({extended: true}));

// User.findOneAndDelete({email: "priya@gmail.com"}, function(err){
//     if(err) console.log(err);
// })

app.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('time_slot', 'Please Enter a valid slot').isIn(['1','2','3','4']),
    check('gender', 'incorrect gender').isIn(['0','1']),
    check('age', 'Please select an age between 18-65').isInt({ min: 18, max: 65 })
], async (req, res) => {
    console.log("Register route hit");
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return res.status(400).json({errors: error.array()});
    }
    const {name, email, time_slot, age, gender} = req.body;

    try {
        
        let user = await User.findOne({email});
        if(user){
            return res.json({msg: "User already registered"});
        }

        user = new User({
            name: name,
            email: email,
            time_slot: time_slot,
            age: age,
            gender: gender
        });

        await user.save();
        console.log(user);
        return res.json({msg: "Registered Successfully"});

    } catch (err) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }
})

app.post('/renew', [
    check('email', 'Please enter a valid email').isEmail(),
    check('time_slot', 'Please Enter a valid slot').isIn(['1','2','3','4']),
    check('age', 'Please select an age between 18-65').isInt({ min: 18, max: 65 })
    
], async (req, res) => {
    console.log("Renew route hit");
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return res.status(400).json({errors: error.array()});
    }
    const {email, time_slot, age} = req.body;

    try {
        
        let user = await User.findOne({email});
        if(!user){
            return res.json({msg: "User not found"});
        }
        if(!user.paid){
            return res.json({msg: "Payment due"});
        }

        user.time_slot = time_slot;
        if(age) user.age=age;
        user.paid = false;

        await user.save();
        console.log(user);
        return res.json({msg: "Renewed Successfully"});

    } catch (err) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }
});

app.post('/payment', [
    check('email', 'Please enter a valid email').isEmail(),

], async (req, res) => {
    console.log("Payment route hit");
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        return res.status(400).json({errors: error.array()});
    }
    const {email} = req.body;

    try {
        
        let user = await User.findOne({email});
        if(!user){
            return res.json({msg: "User not found"});
        }
        if(user.paid){
            return res.json({msg: "Payment already paid"});
        }

        user.paid = completePayment(req);

        await user.save();
        console.log(user);
        return res.json({msg: "Paid Successfully"});

    } catch (err) {
        console.log(error.message);
        return res.status(500).send('Server error');
    }
});

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})