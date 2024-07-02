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
      <div className='image-box middle '>
        <img src='https://images.unsplash.com/photo-1591216098056-b25a0d6ef8d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bW90b2ZvdG98ZW58MHx8MHx8&w=1000&q=80' alt='Image 2' />
      </div>
      <div className='image-box '>
        <img src='https://images.unsplash.com/photo-1611004061243-b8cd8c3fc7ba?q=80&w=1000&auto=f3fDB8MHxzZWFyY2h8Mnx8Q3Vlcm9zJTIwZGUlMjBtb3RvfGVufDB8fDB8fHww' alt='Image 1' />
      </div>
      <div className='image-box '>
        <img src='https://ae01.alicdn.com/kf/Sd3dd730bafc8453bb315bb0ab35cfbb3M/Traje-de-montar-en-motocicleta-a-prueba-de-fr-o-para-hombres-y-mujeres-traje-de.jpg' alt='Image 3' />
      </div>
    </div>
  </div>
  )
}

export default Home
