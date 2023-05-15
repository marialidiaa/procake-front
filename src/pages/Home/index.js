import React from 'react'
import Navbar from '../../components/Navbar'
import './styles.css'

import construcao from '../../assets/construcao.png'

const Home = () => {
    return (
        <>
            <Navbar />
            <div className='home'>
                <img src={construcao} alt='alt' />
                <p>Pagina em construção</p>
            </div>
        </>
    )
}

export default Home