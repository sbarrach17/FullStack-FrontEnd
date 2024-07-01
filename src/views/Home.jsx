import axios from 'axios'
import Context from '../contexts/Context'
import {  useState,useContext, useEffect } from 'react'
import { ENDPOINT } from '../config/constans'
import '../css/Home.css'

const Home = () => {
  const { setDeveloper } = useContext(Context)
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString())

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      axios.get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data: [user] }) => setDeveloper({ ...user }))
        .catch(() => {
          window.sessionStorage.removeItem('token')
          setDeveloper(null)
        })
      } else {
        // If there's no token, set developer to null
        setDeveloper(null)
      }
    }

    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentDateTime(new Date().toLocaleString())
      }, 1000)
  
      // Cleanup function to clear interval when component unmounts
      return () => clearInterval(intervalId)
    }, [])

  useEffect(getDeveloperData, [])

  return (
    <div className='Home'>
    <div className='image-container'>
      <div className='image-box middle'>
        <img src='https://i.pinimg.com/736x/bf/dd/32/bfdd3274150f2489dea816e307ba9577.jpg' alt='Image 1' />
      </div>
      <div className='image-box'>
        <img src='https://www.newmundialmotos.com/uploads/RESEG3479Copia_de_Copia_de_Copia_de_Copia_de_Copia_de_Copia_de_Copia_de_Publicaci%C3%B3n_de_Instagram_Moderno_Modular_Marcas_de_Moda_Sostenible_Rojo_y_Crema_(1).jpg' alt='Image 2' />
      </div>
      <div className='image-box '>
        <img src='https://i.pinimg.com/736x/34/fd/53/34fd5356bfe61f8e71fb7e7c48a09b4b.jpg' alt='Image 3' />
      </div>
    </div>
  </div>
  )
}

export default Home
