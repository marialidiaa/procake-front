import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'




const NovoUsuario = () => {

    const [listaGrupos, setListaGrupos] = useState([])
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [cpfCnpj, setCpfCnpj] = useState("")
    const [grupoAcessoId, setGrupoAcessoId] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate();


    useEffect(() => {
        api.get('grupos', {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            },
            params: {
                size: 10,
                sort: "nome,ASC",
                page: 0
            }
        }).then(response => {
            setListaGrupos(response.data.content)
        })
    }, [tokenAcesso])

    async function salvar(e) {

        e.preventDefault()
        
        const data = {
                nome,
                username: email,
                grupoAcesso: {
                    id: grupoAcessoId,
                    nome: "",
                    roles: []
                },
                telefone,
                cpfCnpj,
                enabled: true
        }
        try {
            await api.post('usuarios', data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/usuarios")
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
                <h1>Novos Colaboradores</h1>
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
                        <label>Telefone</label>
                        <input
                            type='text'
                            placeholder='Telefone'
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>

                    <div className='input'>
                        <label>CPF</label>
                        <input
                            type='text'
                            placeholder='CPF'
                            onChange={(e) => setCpfCnpj(e.target.value)}
                        />
                    </div>

                    <div className='input'>
                        <label>Grupo de Acesso</label>
                        <select
                            value={grupoAcessoId}
                            onChange={e => setGrupoAcessoId(e.target.value)}
                            placeholder='Selecione um grupo de acesso'
                        >
                            <option value="">Selecione</option>
                            {listaGrupos.map(grupo => (
                                <option key={grupo.id} value={grupo.id}  >{grupo.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className='input'>
                        <button className='btn-save' onClick={e => salvar(e)}>
                            Salvar
                        </button>

                        <Link to="/usuarios" className=' btn-cancel' >
                            Voltar
                        </Link>
                    </div>


                </form>
            </section >
        </>
    )
}

export default NovoUsuario