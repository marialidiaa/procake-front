import React from 'react'
import Navbar from '../../components/Navbar'
import error from '../../assets/404.png'
import './styles.css'

const Error = () => {
    return (
        <>
            <Navbar />
            <div className='error-container'>
                <img src={error} alt='Bolo triste' />
                <h3>Erro 404</h3>
                <p>Oops, parece que a página que você esta procurando não existe :(</p>
            </div>
        </>
    )
}

export default Error