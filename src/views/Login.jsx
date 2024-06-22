// import axios from 'axios'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// import { ENDPOINT } from '../config/constans'
import { GlobalContext } from '../contexts/GlobalContext'
import Swal from 'sweetalert2'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = { email: '', password: '' }

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)
  const { login } = useContext(GlobalContext)

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

  const handleForm = async (event) => {
    event.preventDefault()

    if (!user.email.trim() || !user.password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email y password obligatorias.",
      });
      return;
    }

    if (!emailRegex.test(user.email)) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El formato de email no es correcto.",
      });
      return;
    }

    try {
      await login(user, navigate);
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  return (
    <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5'>
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className='form-group mt-1 '>
        <label>Email </label>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
         
        />
      </div>
      <div className='form-group mt-1 '>
        <label>Password</label>
        <input
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control'
       
        />
      </div>
      
      <button type='submit' className='button mt-3' >Iniciar Sesión</button>
      
    </form>
  )
}

export default Login
