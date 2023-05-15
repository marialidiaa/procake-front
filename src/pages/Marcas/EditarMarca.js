import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'


const EditarMarca = () => {

    const [nome, setNome] = useState("")
    const [enabled, setEnabled] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        api.get(`marcas/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            }
        }).then(response => {
            setNome(response.data.nome)
            setEnabled(response.data.enabled)
        })
    }, [tokenAcesso, id])


    async function atualizar(e) {

        e.preventDefault()

        const data = {
            nome,
            enabled
        }
        try {
            await api.put(`marcas/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/marcas")
        } catch (error) {
            let errorMessage = error.response.data.error;
            alert(errorMessage)
        }
    }


    return (
        <>
            <Navbar />
            <section className='form'>
                <h1>Editar marca</h1>
                <form>
                    <div className='input'>
                        <label>Nome</label>
                        <input
                            type='text'
                            placeholder='Nome'
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                        />
                    </div>

                    <div className='input'>
                        <button className='btn-save' onClick={e => atualizar(e)}>
                            Atualizar
                        </button>

                        <Link to="/marcas" className=' btn-cancel' >
                            Voltar
                        </Link>
                    </div>
                </form>
            </section >
        </>
    )
}

export default EditarMarca