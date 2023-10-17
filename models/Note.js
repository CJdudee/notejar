const mongoose = require('mongoose')


const NoteSchema = new mongoose.Schema({
    rating: Number,
    header: {
        type: String,
        unique: true
    },
    content: String,
    saved: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number, 
        default: 0
    },
    
    liked_by: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isPrivate: {
        type: Boolean,
        default: true
    },
    allowedEditor: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    pendingEditor: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
},{
    timestamps: true
})


module.exports = mongoose.models.Note || mongoose.model('Note', NoteSchema)

// const Product = mongoose.models && "Product" in mongoose.models ? mongoose.models. Product : mongoose.model("Product", PostSchema);
// export default Product;