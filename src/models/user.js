const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true
    },
    password: { 
        type: String, 
        required: true, 
        select: false
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function(next){
    const hash = bcrypt.hash(this.password, 10)
    this.password = await hash;
    console.log(this)

    next()
});


const User = mongoose.model('user',userSchema);

module.exports = { User }