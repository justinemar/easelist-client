const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const staticData = [{
    "_id":"039e8dhf8w749f0",
    "publisher": "Yll Peng",
    "createdAt": "9/18/2019-3:52PMPHT",
    "title": "WANTED BEDSPACER BINONDO, MANILA",
    "description": "NEWLY REFURNISED ROOM AVAILABLE FOR RENT",
    "type": {
      "variant": "room",
      "size": "844-1221 Sqft"
    },
    "location": {
      "city": "Manila"
    },
    "startingPrice": "$1,280+",
    "variations": [
      {
        "title": "one bed",
        "units": [
          {
            "title": "Unit A2",
            "price": "$1,355+/mo",
            "description": "1 Bed | 1 Bath | 946 Sqft",
            "image": [
              "image1",
              "image2",
              "image3"
            ]
          },
          {
            "title": "Unit C with Den/Dining",
            "price": "$1,370 - $1,395/mo",
            "description": "1 Bed | 1 Bath | 914 Sqft",
            "image": [
              "image1",
              "image2",
              "image3"
            ]
          }
        ]
      },
      {
        "title": "two bed",
        "units": [
          {
            "title": "Unit D",
            "price": "$1,560 - $1,585/mo",
            "description": "2 Beds | 2 Baths 1102 Sqft",
            "image": [
              "image1",
              "image2",
              "image3"
            ]
          },
          {
            "title": "Unit E corner unit",
            "price": "$1,625 - $1,650/mo",
            "description": "2 Beds | 2 Baths 1221 Sqft",
            "image": [
              "image1",
              "image2",
              "image3"
            ]
          }
        ]
      }
    ],
    "amenities": [
      {
        "title": "Perks",
        "listItem": [
          "Cable Ready",
          "Extra Storage",
          "High Speed Internet Access",
          "New/Renovated Interior"
        ]
      }
    ],
    "geometry": []
  }]

  const featureCollection = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
					120.973800,
					14.599920
				]
			},
			"properties": {
				"title": "WANTED BEDSPACER CALAMBA, LAGUNA",
				"description": "NEWLY REFURNISED ROOM AVAILABLE FOR RENT",
				"listID": "039e8dhf8w749f0"
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
					120.9822006,
					14.6042004
				]
			},
			"properties": {
				"title": "Somewhere out there 2 ",
				"description": "a place somewhere out there 2",
				"listID": "18"
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
					120.9678802,
					14.6495304
				]
			},
			"properties": {
				"title": "Somewhere out there 3",
				"description": "a place somewhere out there 3",
				"listID": "19"
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
					124.4397202,
					7.2041702
				]
			},
			"properties": {
				"title": "Somewhere out there 4",
				"description": "a place somewhere out there 4",
				"listID": "20"
			}
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "Point",
				"coordinates": [
					123.8907089,
					10.31672
				]
			},
			"properties": {
				"title": "Somewhere out there 5",
				"description": "a place somewhere out there 5",
				"listID": "21"
			}
		}
	]
}


const FeatureSchema = new Schema({
    type: {
        type: String,
        default: 'Feature'
    },
    geometry: {
        type: {
            type: String,
            default: 'Point'
          },
          coordinates: {
              type: [Number],
              index: '2dsphere'
          }
    },
    property: {
            type: Schema.Types.ObjectId,
            ref: 'List'
    }
})

const ListSchema = new Schema({
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'Publisher'
    },
    zip: {
        type: String
    },
    city: {
        type: String
    },
    province: {
        type: String
    },
    address: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    startingPrice: {
        type: Number
    },
    feature: {
        type: Schema.Types.ObjectId,
        ref: 'Feature'
    }
})


const List = mongoose.model('List', ListSchema);
const Feature = mongoose.model('Feature', FeatureSchema);

ListSchema.index({ address: 1, city: 1, zip:1, province: 1}); // schema level

module.exports = {
    List,
    Feature
}