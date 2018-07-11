'use strict'

var express = require('express'),
    bodyParser = require('body-parser'),
	app = express(),
    mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/karma');
mongoose.Promise = Promise;

var Story = new mongoose.Schema({
    story: String,
    grades: [Number]
});

var stories = mongoose.model('stories', Story);

app.use(bodyParser.json({limit: '5mb', type: 'application/json'}));

app.post('/api/addStory', function (req, res) {
    stories.create({story: req.body.text, grades: []});
    console.log('adding - ', req.body);
    res.send('ok');
});

app.get('/api/getStory', function (req, res) {
    stories.count().exec(function (err, count) {
        var rand = Math.floor(Math.random() * count);
        var op = stories.findOne().skip(rand).exec(function (err, result) {
            console.log('getting story - ', result);
            res.json(result);
        });
    });
});

app.post('/api/rateStory', function (req, res) {
    stories.findOne({_id: req.body._id}).exec(function(err, result) {
        result.grades.push(req.body.grade);
        result.save();
    })
    console.log('rating - ', req.body);
    res.send('ok');
})

app.get('/allStories', function (req, res) {
    stories.find().exec(function(err, result) {
        res.json(result);
    });
});

app.use('/', express.static('../client'))

app.listen(8080);
