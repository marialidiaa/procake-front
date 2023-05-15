import React, { useEffect, useState } from 'react'
import useAuth from "../../hooks/useAuth";
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FiXCircle, FiCheckCircle, FiPlusCircle, FiEdit3 } from 'react-icons/fi'

import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'


const Clientes = () => {

    const [clientes, setClientes] = useState([])
    const [pesquisa, setPesquisa] = useState()
    const tokenAcesso = localStorage.getItem('tokenAcesso')

    const { signout } = useAuth();
    const navigate = useNavigate()



    useEffect(() => {
        api.get('clientes', {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            },
            params: {
                size: 10,
                sort: "nome,ASC",
                page: 0
            }
        }).then((res) => {
            setClientes(res.data.content)
        }).catch((err) => {
            console.log(err.response)
            if (err.response.data === "") {
            }
        })
    }, [tokenAcesso, signout])

    useEffect(() => {
        const timer = setTimeout(() => {

            if (pesquisa !== "" && pesquisa !== undefined) {
                api.get(`clientes/pesquisar/${pesquisa}`, {
                    headers: {
                        Authorization: `Bearer ${tokenAcesso}`
                    }
                }).then((response) => {
                    setClientes(response.data)
                    setPesquisa("")
                }).catch((err) => {
                    console.log(err)
                })
            }

        }, 500)

        return () => clearTimeout(timer)
    }, [pesquisa, tokenAcesso])



    async function clientesDesativados() {
        try {
            let response = await api.get(`clientes/desativados`, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                },
                params: {
                    size: 10,
                    sort: "nome,ASC",
                    page: 0
                }
            })

           setClientes(response.data.content)
        } catch (error) {

        }
    }

    async function clientesAtivos() {
        try {
            let response = await api.get(`clientes/ativos`, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                },
                params: {
                    size: 10,
                    sort: "nome,ASC",
                    page: 0
                }
            })

            setClientes(response.data.content)
        } catch (error) {
            console.log(error)
        }
    }

    function NovoCliente() {
        navigate("/clientes/novo")
    }

    async function editar(id) {
        navigate(`/clientes/editar/${id}`)
    }

    async function desativar(id) {
        const data = clientes.find(u => u.id === id)
        data.enabled = false;

        try {
            let response = await api.put(`clientes/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            setClientes (clientes.map(function (item) { return item.id === id ? response.data : item }))
        } catch (error) {
            console.log(error)
        }
    }

    async function ativar(id) {

        const data = clientes.find(u => u.id === id)
        data.enabled = true;

        try {
            let response = await api.put(`clientes/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            setClientes(clientes.map(function (item) { return item.id === id ? response.data : item }))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Navbar />
            <section className='top'>
                <h3>Clientes</h3>

                <input
                    placeholder='Pesquisar por nome'
                    value={pesquisa}
                    onChange={e => setPesquisa(e.target.value)} 
                />

                <div className='btn' onClick={clientesDesativados} >
                    <button type='button'>
                        <FiXCircle size={25} color='#E52548' />
                    </button>
                    <p>Desativados</p>
                </div>

                <div className='btn' onClick={clientesAtivos} >
                    <button type='button'>
                        <FiCheckCircle size={25} color='#51AD86' />
                    </button>
                    <p>Ativos</p>
                </div>

                <div className='btn' onClick={NovoCliente}>
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
                            <th>E-Mail</th>
                            <th>Telefone</th>
                            <th>Status</th>
                            <th className='acoes'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(user => (
                            <tr key={user.id}>
                                <td>{user.nome}</td>
                                <td>{user.email}</td>
                                <td>{user.telefone}</td>
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

export default Clientes