const {model, Schema} = require('mongoose')

const adminAttendanceSchema = new Schema({
    timeLimit: Number,
    status: String,
    createdAt: Date
})

const adminAttendance = model('AdminAttendance', adminAttendanceSchema)
module.exports = adminAttendance