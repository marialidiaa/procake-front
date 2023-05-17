import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'


const EditarUsuario = () => {

    const [listaGrupos, setListaGrupos] = useState([])
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [cpfCnpj, setCpfCnpj] = useState("")
    const [enabled, setEnabled] = useState("")
    const [grupoAcessoId, setGrupoAcessoId] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate();
    const { id } = useParams();


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

        api.get(`usuarios/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            }
        }).then(response => {
            setNome(response.data.nome)
            setEmail(response.data.username)
            setTelefone(response.data.telefone)
            setCpfCnpj(response.data.cpfCnpj)
            setGrupoAcessoId(response.data.grupoAcesso.id)
            setEnabled(response.data.enabled)
        }).catch(error =>{
            navigate(`/usuarios/${id}`)
        })
    }, [tokenAcesso, id, navigate])


    async function atualizar(e) {

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
            enabled

        }
        try {
            await api.put(`usuarios/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/usuarios")
        } catch (error) {
            let errorMessage = error.response.data.error;
            alert(errorMessage)
        }
    }


    return (
        <>
            <Navbar />
            <section className='form'>
                <h1>Editar Funcionário</h1>
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
                        <label>Telefone</label>
                        <input
                            type='text'
                            placeholder='Telefone'
                            onChange={(e) => setTelefone(e.target.value)}
                            value={telefone}
                        />
                    </div>

                    <div className='input'>
                        <label>CPF</label>
                        <input
                            type='text'
                            placeholder='CPF'
                            onChange={(e) => setCpfCnpj(e.target.value)}
                            value={cpfCnpj}
                            readOnly={true}
                        />
                    </div>

                    <div className='input'>
                        <label>Grupo de Acesso</label>
                        <select
                            onChange={e => setGrupoAcessoId(e.target.value)}
                            placeholder='Selecione um grupo de acesso'
                            value={grupoAcessoId}
                        >
                            {listaGrupos.map(grupo => (
                                <option key={grupo.id} value={grupo.id} >{grupo.nome}</option>
                            ))}
                        </select>
                    </div>

                    <div className='input'>
                        <button className='btn-save' onClick={e => atualizar(e)}>
                            Atualizar
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

export default EditarUsuario