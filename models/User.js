const mongoose = require('mongoose')

function colorVal (v) {
    if (v.indexOf('#') == 0) {
        if (v.length == 7) {
            return true
        } else if (v.length == 4) {
            return true
        }
    }

    return v
}

    //if i make a list of notes with the users that means that the whenever the user is called for even username or email the posts will be called to it might be smarter to put the user.id with posts

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true
    },
    password: {
        type: String, 
        select: false
    },
    roles: {
        type: [String],
    default: ['user']
    },
    notes: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Note'
    },

    blogpost: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: 'Blogpost'
    },
    profileColor: {
        type: String,
        //validate: [colorVal, 'not a valid color'],
        default: '#fff'
    },
    
})

//have to make users posts a subdoc so i dont go over the 16 mb limit or a populate
module.exports = mongoose.models.User || mongoose.model('User', UserSchema)

// const Product = mongoose.models && "Product" in mongoose.models ? mongoose.models. Product : mongoose.model("Product", PostSchema);
// export default Product;