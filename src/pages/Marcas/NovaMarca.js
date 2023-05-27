import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'




const NovaMarca = () => {

    const [nome, setNome] = useState("")

    const [erroNome, setErroNome] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate();

    useEffect(() => {
        setErroNome("")
    }, [])

    async function salvar(e) {

        e.preventDefault()

        let controle = validacoes();
        if(controle !== 0){
            return;
        }

        const data = {
                nome
        }
        try {
            await api.post('marcas', data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/marcas")
        } catch (error) {
            let errorMessage = "";
            error.response.data.errors.forEach(element => {
                errorMessage += `${element} \n`
            });
            alert(errorMessage)
        }
    }

    const validacoes =() =>{
        let controle = 0
        if(nome.trim().length <= 0 || nome.trim === "" || nome == null){
            setErroNome("*Não pode ser vazio*")
            controle = 1;
        }
        return controle
    }


    return (
        <>
            <Navbar />
            <section className='form'>
                <h1>Criação de Marcas</h1>
                <form>
                    <div className='input'>
                        <label>Nome</label>
                        <input
                            type='text'
                            placeholder='Nome'
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <p className='textErro'>{erroNome}</p>
                    </div>

                    <div className='input'>
                        <button className='btn-save' onClick={e => salvar(e)}>
                            Salvar
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

export default NovaMarca