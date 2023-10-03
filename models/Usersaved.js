const mongoose = require('mongoose')


const UsersavedSchema = new mongoose.Schema({
userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
noteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
}
},{
    timestamps: true
})

module.exports = mongoose.models.Usersaved || mongoose.model('Usersaved', UsersavedSchema)