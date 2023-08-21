const nodemailer = require('nodemailer')
const { google } = require('googleapis')
module.exports = async (email, subject, text) => {
	try {
		const OAuth2 = google.auth.OAuth2

		const OAuth2Client = new OAuth2(
			process.env.CLIENT_ID,
			process.env.CLIENT_SECRET,
			process.env.REDIRECT_URI
		)

		OAuth2Client.setCredentials({
			refresh_token: process.env.REFRESH_TOKEN,
		})
		const accessToken = new Promise((res, rej) => {
			OAuth2Client.getAccessToken((err, token) => {
				if (err) rej(err)
				res(token)
			})
		})
		const transporter = nodemailer.createTransport({
			service: process.env.SERVICE,
			host: process.env.HOST,
			port: Number(process.env.EMAIL_PORT),
			secure: false,
			auth: {
				type: 'OAuth2',
				user: 'testmailnodeq@gmail.com',
				clientId: process.env.CLIENT_ID,
				accessToken: accessToken,
				clientSecret: process.env.CLIENT_SECRET,
				refreshToken: process.env.REFRESH_TOKEN,
			},
		})

		await transporter.sendMail({
			from: 'testmailnodeq@gmail.com',
			to: email,
			subject: subject,
			text: text,
		})
		console.log('Email send successfully!')
	} catch (err) {
		console.log('Email not send!', err)
		return err
	}
}
