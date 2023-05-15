import React, { useEffect, useState } from 'react'
import useAuth from "../../hooks/useAuth";
import Navbar from '../../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { FiXCircle, FiCheckCircle, FiPlusCircle, FiEdit3 } from 'react-icons/fi'

import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'


const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([])
    const [pesquisa, setPesquisa] = useState()
    const tokenAcesso = localStorage.getItem('tokenAcesso')

    const { signout } = useAuth();
    const navigate = useNavigate()
    const { erro } = useParams();


    useEffect(() => {
        api.get('usuarios', {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            },
            params: {
                size: 10,
                sort: "nome,ASC",
                page: 0
            }
        }).then((res) => {
            setUsuarios(res.data.content)
        }).catch((err) => {
            console.log(err.response)
            if (err.response.data === "") {
                signout();
            }
        })
        console.log(erro)
        if(erro){
            alert(`Funcionário não encontrado com este id ${erro}`)
        }

    }, [tokenAcesso, signout])

    useEffect(() => {
        const timer = setTimeout(() => {

            if (pesquisa !== "" && pesquisa !== undefined) {
                api.get(`usuarios/pesquisar/${pesquisa}`, {
                    headers: {
                        Authorization: `Bearer ${tokenAcesso}`
                    }
                }).then((response) => {
                    setUsuarios(response.data)
                    setPesquisa("")
                }).catch((err) => {
                    console.log(err)
                })
            }

        }, 500)

        return () => clearTimeout(timer)
    }, [pesquisa, tokenAcesso])



    async function usuariosDesativados() {
        try {
            let response = await api.get(`usuarios/desativados`, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                },
                params: {
                    size: 10,
                    sort: "nome,ASC",
                    page: 0
                }
            })

            setUsuarios(response.data.content)
        } catch (error) {

        }
    }

    async function usuariosAtivos() {
        try {
            let response = await api.get(`usuarios/ativos`, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                },
                params: {
                    size: 10,
                    sort: "nome,ASC",
                    page: 0
                }
            })

            setUsuarios(response.data.content)
        } catch (error) {
            console.log(error)
        }
    }

    function novoUsuario() {
        navigate("/usuarios/novo")
    }

    async function editar(id) {
        navigate(`/usuarios/editar/${id}`)
    }

    async function desativar(id) {
        const data = usuarios.find(u => u.id === id)
        data.enabled = false;

        try {
            let response = await api.put(`usuarios/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            setUsuarios(usuarios.map(function (item) { return item.id === id ? response.data : item }))
        } catch (error) {
            console.log(error)
        }
    }

    async function ativar(id) {

        const data = usuarios.find(u => u.id === id)
        data.enabled = true;

        try {
            let response = await api.put(`usuarios/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            setUsuarios(usuarios.map(function (item) { return item.id === id ? response.data : item }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <section className='top'>
                <h3>Funcionários</h3>

                <input
                    placeholder='Pesquisar por nome'
                    value={pesquisa}
                    onChange={e => setPesquisa(e.target.value)} 
                />

                <div className='btn' onClick={usuariosDesativados} >
                    <button type='button'>
                        <FiXCircle size={25} color='#E52548' />
                    </button>
                    <p>Desativados</p>
                </div>

                <div className='btn' onClick={usuariosAtivos} >
                    <button type='button'>
                        <FiCheckCircle size={25} color='#51AD86' />
                    </button>
                    <p>Ativos</p>
                </div>

                <div className='btn' onClick={novoUsuario}>
                    <button type='button'>
                        <FiPlusCircle size={25} color='#6098DE' />
                    </button>
                    <p>Adicionar</p>
                </div>
            </section>
            <section className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Usuario</th>
                            <th>Grupo de Acesso</th>
                            <th>Status</th>
                            <th className='acoes'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(user => (
                            <tr key={user.id}>
                                <td>{user.nome}</td>
                                <td>{user.username}</td>
                                <td>{user.grupoAcesso.nome}</td>
                                <td>{user.enabled ? "ATIVO" : "DESATIVADO"}</td>
                                <td>
                                    <FiEdit3
                                        color='#6098DE'
                                        className='icon'
                                        size={20}
                                        type='button'
                                        title="Editar"
                                        onClick={() => editar(user.id)}
                                    />
                                    {
                                        user.enabled ?
                                            <FiXCircle
                                                color='#E52548'
                                                className='icon'
                                                size={20}
                                                type='button'
                                                title="Desativar"
                                                onClick={() => desativar(user.id)}
                                            /> :
                                            <FiCheckCircle
                                                color='#51AD86'
                                                className='icon'
                                                size={20}
                                                type='button'
                                                title="Ativar"
                                                onClick={() => ativar(user.id)}
                                            />
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default Usuarios