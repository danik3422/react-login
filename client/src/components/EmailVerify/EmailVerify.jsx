import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import success from '../images/success.png'
import styles from './style.module.css'

const EmailVerify = () => {
	const [validUrl, setValidUrl] = useState(true)
	const param = useParams()

	useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:8000/api/users/${param.id}/verify/${param.token}`
				const { data } = await axios.get(url)
				console.log(data)
				setValidUrl(true)
			} catch (error) {
				console.log(error)
				setValidUrl(false)
			}
		}
		verifyEmailUrl()
	}, [param])

	return (
		<>
			{validUrl ? (
				<div className={styles.container}>
					<img src={success} alt='success_img' className={styles.success_img} />
					<h1>Email verified successfully</h1>
					<Link to='/login'>
						<button className={styles.green_btn}>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</>
	)
}

export default EmailVerify
