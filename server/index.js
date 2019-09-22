const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const database = 'mongodb://admin:newone131521@ds021663.mlab.com:21663/easelist';
mongoose.connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;

db.on('open', () => {
    console.log('connection established');
})

db.on('error', (err) => {
    console.log(err);
})



const app = express();
const PORT = 5000 | process.env.PORT;


const { List, Feature } = require('./models/list');
const Publisher = require('./models/publisher');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));

app.post('/api/search', (req, res) => {
    const { query } = req.query;
    if(query === ''){
        res.json([])
    }
    console.log(query)
    List.aggregate([{
        $match: {
            $or: [
                {
                    zip: {
                        $regex: query,
                        '$options': 'i'
                    }
                },
                {
                    city: {
                        $regex: query,
                        '$options': 'i'
                    }
                },
                {
                    province: {
                        $regex: query,
                        '$options': 'i'
                    }
                },
                {
                    address: {
                        $regex: query,
                        '$options': 'i'
                    }
                }
            ]
        }
    }], (err, data) => {
        if(err){
            return res.json(err)
        }

        if(data){
            return res.json(data);
        }
    })

})

app.post('/api/publisher', (req, res) => {
    const { first_name, middle_name, last_name } = req.body;
    const publisher = new Publisher({
        first_name,
        middle_name,
        last_name,
    })

    publisher.save((err, data) => {
        if (err) {
            res.json({ message: 'Unknown error occured' });
        }

        if (data) {
            res.json(data);
        }

    })
})

app.get('/api/publisher/property', (req, res) => {
    List.find({ publisher: req.body.publisher_id }).
        populate('publisher').
        exec(function (err, properties) {
            if (err) return res.json({ message: 'Error' });

            if (properties) {
                return res.json(properties);
            }
        });
})


app.get('/api/feature', (req, res) => {
    Feature.find({ property: req.body.property_id }).
        populate('property').
        exec(function (err, feature) {
            if (err) return res.json({ message: 'Error' });

            if (feature) {
                return res.json(feature);
            }
        });
})

app.get('/api/list', (req, res) => {
    res.json({})
})

app.post('/api/property', (req, res) => {
    const newList = new List({
        publisher: req.body.publisher_id,
        title: req.body.title,
        description: req.body.description,
        startingPrice: req.body.startingPrice,
        zip: req.body.zip,
        city: req.body.city,
        province: req.body.province,
        address: req.body.address
    })

    newList.save((err, list) => {
        if (err) {
            res.json({ message: 'Error' })
        }

        if (list) {
            const newFeature = new Feature({
                geometry: {
                    coordinates: [120.973800, 14.599920]
                },
                property: list._id
            })

            newFeature.save((err, data) => {
                if (err) {
                    res.json({ message: 'Error' })
                }

                if (data) {
                    return res.json(data)
                }
            })
        }
    })
})


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
