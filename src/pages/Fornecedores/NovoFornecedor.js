import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'




const NovoFornecedor = () => {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cpfCnpj, setCpfCnpj] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate();

    async function salvar(e) {

        e.preventDefault()

        const data = {
                nome,
                email,
                cpfCnpj
        }
        try {
            await api.post('fornecedores', data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/fornecedores")
        } catch (error) {
            let errorMessage = "";
            error.response.data.errors.forEach(element => {
                errorMessage += `${element} \n`
            });
            alert(errorMessage)
        }
    }


    return (
        <>
            <Navbar />
            <section className='form'>
                <h1>Cadastro Fornecedores</h1>
                <form>
                    <div className='input'>
                        <label>Nome</label>
                        <input
                            type='text'
                            placeholder='Nome'
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className='input'>
                        <label>Email</label>
                        <input
                            type='text'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className='input'>
                        <label>CPF/CNPJ</label>
                        <input
                            type='text'
                            placeholder='CPF/CNPJ'
                            onChange={(e) => setCpfCnpj(e.target.value)}
                        />
                    </div>

                    <div className='input'>
                        <button className='btn-save' onClick={e => salvar(e)}>
                            Salvar
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

export default NovoFornecedor