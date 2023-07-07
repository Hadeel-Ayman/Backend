const monogoose = require('mongoose')


const connectDB = async () => {
    try {
        const conn = await monogoose.connect(process.env.MONG_URI)
        console.log(`MongoDB connected : ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB