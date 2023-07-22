const {model, Schema} = require('mongoose')

const studentAttendanceSchema = new Schema({
    createdAt: Date,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    adminAttendance: {
        type: Schema.Types.ObjectId,
        ref: 'AdminAttendance',
    }
})

const studentAttendance = model('StudentAttendance', studentAttendanceSchema)
module.exports = studentAttendance