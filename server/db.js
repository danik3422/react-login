const mongoose = require('mongoose')

module.exports = () => {
	try {
		mongoose.connect(process.env.DB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		console.log('Connected to database successfully')
	} catch (err) {
		console.log(err)
	}
}
