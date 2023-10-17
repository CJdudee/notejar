// pendinginvie will have 4 feilds noteId, userId, newEditorId, accepted
//by default accepted will be false 
//the newEditorId will be able to see the note they were invited to and who was the user that invited them
//they can decline or accept the invite if declined the peninginvite will be deleted 
//if accepted the newEditor will be added to the allowed editor in the note.allowedEditor
//and then will delete the pending invite again 

const { default: mongoose } = require("mongoose");


const PendinginviteSchema = new mongoose.Schema({ 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require
    },
    noteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        require
    },
    newEditorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require

    },
    accepted: {
        type: Boolean,
        default: false
    }
})



module.exports = mongoose.models.Pendinginvite || mongoose.model('Pendinginvite', PendinginviteSchema)