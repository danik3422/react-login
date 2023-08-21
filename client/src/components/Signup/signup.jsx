import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './style.module.css'
const Signup = () => {
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	})
	const [error, setError] = useState(null)
	const [msg, setMsg] = useState('')
	const handleChange = (e) => {
		const { name, value } = e.target
		setData((data) => ({
			...data,
			[name]: value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const url = 'http://localhost:8000/api/users'
			const { data: res } = await axios.post(url, data)
			setMsg(res.message)
		} catch (err) {
			if (
				err.response &&
				(err.response.status >= 400) & (err.response.status <= 500)
			) {
				setError(err.response.data.message)
			}
		}
	}
	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome back</h1>
					<Link to='/login'>
						<button type='button' className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create account</h1>
						<input
							type='text'
							placeholder='First Name'
							name='firstName'
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type='text'
							placeholder='Last Name'
							name='lastName'
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type='email'
							placeholder='Email'
							name='email'
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type='password'
							placeholder='Password'
							name='password'
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
						<button type='submit' className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
export default Signup
