import { Navigate, Route, Routes } from 'react-router-dom'
import EmailVerify from './components/EmailVerify/EmailVerify'
import Login from './components/Login/login'
import Main from './components/Main/main'
import Signup from './components/Signup/signup'

function App() {
	const user = localStorage.getItem('token')
	return (
		<Routes>
			{user && <Route path='/' element={<Main />} />}
			<Route path='/signup' element={<Signup />} />
			<Route path='/login' element={<Login />} />
			<Route path='/' element={<Navigate to='/login' />} />
			<Route path='/users/:id/verify/:token' element={<EmailVerify />} />
		</Routes>
	)
}

export default App
