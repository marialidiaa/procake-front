import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'


const EditarFornecedor = () => {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cpfCnpj, setCpfCnpj] = useState("")
    const [enabled, setEnabled] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        api.get(`fornecedores/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            }
        }).then(response => {
            setNome(response.data.nome)
            setEmail(response.data.email)
            setCpfCnpj(response.data.cpfCnpj)
            setEnabled(response.data.enabled)
        })
    }, [tokenAcesso, id])


    async function atualizar(e) {

        e.preventDefault()

        const data = {
            nome,
            email,
            cpfCnpj,
            enabled
        }
        try {
            await api.put(`fornecedores/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/fornecedores")
        } catch (error) {
            let errorMessage = error.response.data.error;
            alert(errorMessage)
        }
    }


    return (
        <>
            <Navbar />
            <section className='form'>
                <h1>Editar Fornecedor</h1>
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
                        <label>Email</label>
                        <input
                            type='text'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    <div className='input'>
                        <label>CPF/CNPJ</label>
                        <input
                            type='text'
                            placeholder='CPF/CNPJ'
                            onChange={(e) => setCpfCnpj(e.target.value)}
                            value={cpfCnpj}
                            readOnly={true}
                        />
                    </div>

                    <div className='input'>
                        <button className='btn-save' onClick={e => atualizar(e)}>
                            Atualizar
                        </button>

                        <Link to="/fornecedores" className=' btn-cancel' >
                            Voltar
                        </Link>
                    </div>
                </form>
            </section >
        </>
    )
}

export default EditarFornecedor