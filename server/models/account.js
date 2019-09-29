const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const AccountSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    mobile_number: {
        type: Number,
        required: true
    },
    home_number: {
        type: Number,

    }
})


AccountSchema.pre('save', function(next) {
    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10,  (err, salt) => {
        if(err) return next(err)
        bcrypt.hash(user.password, salt,  (err, hash) => {
            if (err) return next(err);
    
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });

 

});

AccountSchema.methods.comparePassword =  function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        return cb(null, isMatch);
    });
    
};



const Account = mongoose.model('Account', AccountSchema);

module.exports = Account;
