const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const JSRSASign = require("jsrsasign");

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
const Account = require('./models/account');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));
// app.use((req, res, next) => {
//     console.log('token middleware');
//     const token = req.headers.authorization.slice(7 - req.headers.authorization.length);

//     isValid = JSRSASign.KJUR.jws.JWS.verifyJWT(token, "$PraveenIsNotAwesome!", {alg: ["HS512"], gracePeriod: 1 * 60 * 60});
//     res.send(isValid)
//     jwt.verify(token, process.env.KEY1, (err, decoded) => {
//         if (err) {
//             res.status(401).json({
//                 message: 'Your session has expired, please login to continue where you left off',
//                 type: 'error',
//                 code: 401,
//             });
//         }

//         if (decoded) {
//             next();
//         }
//     });
// });

app.post('/api/search', (req, res) => {
    const { query } = req.query;
    if (query === '') {
        return res.json([])
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
    }, {
        $project: {
            province: 1,
            title: 1,
            description: 1,
            startingPrice: 1,
            address: 1,
            city: 1,
            feature: 1,
            _id: 0
        }
    }], (err, data) => {
        if (err) {
            return res.json(err)
        }

        List.populate(data, { path: 'feature', select: 'geometry type' }, (err, populatedData) => {
            if (err) {
                return res.json(err)
            }

            if (populatedData) {
                res.json(populatedData)
            }
        })
    })

})

app.post('/api/verify', (req, res) => {
    const header = req.headers['authorization'];
    const bearer = header.split(' ');
    const token = bearer[1];

    var payloadObj = JSRSASign.KJUR.jws.JWS.readSafeJSONString(JSRSASign.b64toutf8(token.split(".")[1]));
    console.log(payloadObj)
    isValid = JSRSASign.KJUR.jws.JWS.verifyJWT(token, "$PraveenIsNotAwesome!", { alg: ["HS512"] });
    res.send(isValid)

})

app.post('/api/account', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Account.findOne({ email }).select('+password').exec();
        if (!user) {

            return res.status(404).json({ message: "The email address is not associated with any account" });
        }

        user.comparePassword(password, (err, match) => {
            if (err) return err;

            if (!match) {

                return res.status(401).json({ message: "The email address or password is incorrect" });
            }

            const EXPIRATION = 60 * 60 // 1 hour
            const sPayload = JSON.stringify({
                first_name: user.first_name,
                last_name: user.last_name,
                id: user._id,
                email: user.email,
                exp: Math.round(new Date().getTime() / 1000) + EXPIRATION,
            });

            const key = "$PraveenIsNotAwesome!";
            const sHeader = JSON.stringify({
                alg: "HS512",
                typ: "JWT"
            })
            const sJWT = JSRSASign.jws.JWS.sign("HS512", sHeader, sPayload, key);

            return res.status(200).json(sJWT);
        })

    } catch (err) {
        return res.status(500).json({ message: err })
    }
})

app.put('/api/account', async (req, res) => {
    const { first_name, last_name, password, email, mobile_number, home_number } = req.body;
    const user = new Account({
        first_name,
        last_name,
        email,
        password,
        mobile_number,
        home_number
    });

    try {
        const userData = await user.save();
        return res.json(userData)

    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(409).json({ errmsg: 'Account with the same email exists' })
        }

        return res.status(501).json({ message: 'Unknown error occured us' })
    }

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
