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


const { List, Feature, Addon } = require('./models/list');
const Publisher = require('./models/publisher');
const Account = require('./models/account');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));


app.post('/api/search', (req, res) => {
    const { query } = req.query;
    if (query === '') {
        return res.json([])
    }
    List.aggregate([
        {
            $lookup: {
                from: "addons",
                "localField": "_id",
                "foreignField": "property",
                as: "extras"
            }
        },

        {
            $match: {
                $or: [
                    {
                        "extras.extra_loc": {
                            $regex: query,
                            $options: 'i'
                        }
                    },
                    {
                        "location.zip": {
                            $regex: query,
                            '$options': 'i'
                        }
                    },
                    {
                        "location.city": {
                            $regex: query,
                            '$options': 'i'
                        }
                    },
                    {
                        "location.province": {
                            $regex: query,
                            '$options': 'i'
                        }
                    },
                    {
                        "location.address": {
                            $regex: query,
                            '$options': 'i'
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "features",
                "localField": "_id",
                "foreignField": "property",
                as: "feature"
            }
        },
        { "$unwind": "$feature" },
        { "$unwind": "$extras" },
        {
            $project: {
                facts: 1,
                location: 1,
                feature: 1,
                amenites: 1,
                _id: 0
            }
        }
    ]
        , (err, data) => {
            if (err) {
                return res.json(err)
            }

            if (data) {
                res.json(data)
            }
        });


    // List.aggregate([{
    //     $lookup: {
    //         from: "addons",
    //         localField: "location",
    //         foreignField: "extra_loc",
    //         as: "match_properties"
    //     },
    //     $match: {
    //         location: {
    //             $or: [
    //                 {
    //                     zip: {
    //                         $regex: query,
    //                         '$options': 'i'
    //                     }
    //                 },
    //                 {
    //                     city: {
    //                         $regex: query,
    //                         '$options': 'i'
    //                     }
    //                 },
    //                 {
    //                     province: {
    //                         $regex: query,
    //                         '$options': 'i'
    //                     }
    //                 },
    //                 {
    //                     address: {
    //                         $regex: query,
    //                         '$options': 'i'
    //                     }
    //                 }
    //             ]
    //         }
    //     }
    // }])

    // Addon.aggregate(
    //     { $match: {extra_loc: query}},
    //     { $lookup: {from: 'users', localField: 'email', foreignField: 'email', as: 'user'} }
    //   ).exec( function (err, invites) {
    //     if (err) {
    //       next(err);
    //     }

    //     res.json(invites);
    //   }
    // );

    // console.log(query)
    // List.aggregate([{
    //     $match: {
    //         $or: [
    //             {
    //                 zip: {
    //                     $regex: query,
    //                     '$options': 'i'
    //                 }
    //             },
    //             {
    //                 city: {
    //                     $regex: query,
    //                     '$options': 'i'
    //                 }
    //             },
    //             {
    //                 province: {
    //                     $regex: query,
    //                     '$options': 'i'
    //                 }
    //             },
    //             {
    //                 address: {
    //                     $regex: query,
    //                     '$options': 'i'
    //                 }
    //             }
    //         ]
    //     }
    // }, {
    //     $project: {
    //         province: 1,
    //         title: 1,
    //         description: 1,
    //         startingPrice: 1,
    //         address: 1,
    //         city: 1,
    //         feature: 1,
    //         _id: 0
    //     }
    // }], (err, data) => {
    //     if (err) {
    //         return res.json(err)
    //     }

    //     List.populate(data, { path: 'feature', select: 'geometry type' }, (err, populatedData) => {
    //         if (err) {
    //             return res.json(err)
    //         }

    //         if (populatedData) {
    //             res.json(populatedData)
    //         }
    //     })
    // })

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

app.use((req, res, next) => {
    const { authorization } = req.headers;

    if (authorization) {
        const token = req.headers.authorization.slice(7 - req.headers.authorization.length);
        isValid = JSRSASign.KJUR.jws.JWS.verifyJWT(token, "$PraveenIsNotAwesome!", { alg: ["HS512"], gracePeriod: 1 * 60 * 60 });

        if (isValid) {
            var payloadObj = JSRSASign.KJUR.jws.JWS.readSafeJSONString(JSRSASign.b64toutf8(token.split(".")[1]));
            res.locals.verifiedToken = payloadObj;
            next()
        } else {
            res.status(401).json({
                message: 'Somethings not right..',
                code: 401
            });
        }
    } else {
        res.status(401).json({
            message: 'Your session may have been expired',
            code: 401
        });
    }





});

app.put('/api/account/:id', async (req, res) => {
    const { first_name, last_name, password, phone } = this.req;

    Account.findOneAndUpdate({ _id: req.query.id })
})

app.put('/api/account', async (req, res) => {
    const { password, email } = req.body;
    const user = new Account({
        email,
        password,

    });

    try {
        const userData = await user.save();
        return res.status(200).json(userData)

    } catch (err) {
        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(409).json({ errmsg: 'Account with the same email exists' })
        }

        return res.status(501).json({ errmsg: 'Unknown error occured' })
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


app.get('/api/properties', (req, res) => {
    const id = res.locals.verifiedToken.id;
    List.find({ publisher: id })
        .populate('feature').
        exec(function (err, properties) {
            if (err) return res.json({ message: 'Error' });

            if (properties) {
                return res.json({ properties: properties });
            }
        });
})

app.post('/api/property', (req, res) => {
    const { addons, dogs_policy, cats_policy, smoking_policy, pets_policy_detail,
        num_of_dedicated_parking, num_of_covered_parking, num_of_garagae_parking, coords,
        lease, num_of_bed, num_of_bath, square_feet, starting_price, deposit, zip_code,
        city, province, street_address } = req.body;
    const id = res.locals.verifiedToken.id;
    console.log(req.body)
    const newList = new List({
        publisher: id,
        facts: {
            title: req.body.title,
            description: req.body.description,
            numOfBed: num_of_bed,
            numOfBath: num_of_bath,
            squareFeet: square_feet,
            pricing: [parseInt(starting_price), parseInt(deposit)],
        },
        location: {
            zip: zip_code,
            city: city,
            province: province,
            address: street_address
        },
        lease: {
            terms: lease.terms,
            detail: lease.detail
        },

    })

    newList.save((err, list) => {
        if (err) {
            console.log(err)
            res.json({ message: 'from re', error: err })
        }

        if (list) {
            const extras = new Addon({
                property: list._id,
                community_features: addons.community_features,
                policy: {
                    dogs: dogs_policy,
                    cats: cats_policy,
                    smoking: smoking_policy,
                    detail: pets_policy_detail
                },
                amenities: {
                    indoor: addons.amenities.indoor,
                    outdoor: addons.amenities.outdoor
                },
                flooring: addons.flooring,
                parking: {
                    dedicated: num_of_dedicated_parking,
                    covered: num_of_covered_parking,
                    garage: num_of_garagae_parking
                },
                extra_loc: addons.extra_loc
            })

            const newFeature = new Feature({
                geometry: {
                    coordinates: [coords.lng, coords.lat]
                },
                property: list._id
            })

            newFeature.save((err, data) => {
                if (err) {
                    console.log(err)

                    res.json({ message: 'from here', error: err })
                }

                if (data) {

                    extras.save((err, extra) => {
                        if (err) {
                            console.log(err)

                            res.json({ message: 'from here' })
                        }

                        if (extra) {
                            return res.status(200).json({
                                message: 'Property is now awaiting verification',

                            })

                        }
                    })
                }
            })
        }
    })
})


app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})
