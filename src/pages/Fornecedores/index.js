import React, { useEffect, useState } from 'react'
import useAuth from "../../hooks/useAuth";
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FiXCircle, FiCheckCircle, FiPlusCircle, FiEdit3, FiFileText } from 'react-icons/fi'

import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'
import DetalheFornecedor from './DetalheFornecedores';


const Fornecedor = () => {

    const [fornecedores, setFornecedores] = useState([])
    const [pesquisa, setPesquisa] = useState()
    const tokenAcesso = localStorage.getItem('tokenAcesso')

    const { signout } = useAuth();
    const navigate = useNavigate()



    useEffect(() => {
        api.get('fornecedores', {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            },
            params: {
                size: 10,
                sort: "nome,ASC",
                page: 0
            }
        }).then((res) => {
            setFornecedores(res.data.content)
        }).catch((err) => {
            console.log(err.response)
            if (err.response.data === "") {
            }
        })
    }, [tokenAcesso, signout])

    useEffect(() => {
        const timer = setTimeout(() => {

            if (pesquisa !== "" && pesquisa !== undefined) {
                api.get(`fornecedores/pesquisar/${pesquisa}`, {
                    headers: {
                        Authorization: `Bearer ${tokenAcesso}`
                    }
                }).then((response) => {
                    setFornecedores(response.data)
                    setPesquisa("")
                }).catch((err) => {
                    console.log(err)
                })
            }

        }, 1000)

        return () => clearTimeout(timer)
    }, [pesquisa, tokenAcesso])



    async function fornecedoresDesativados() {
        try {
            let response = await api.get(`fornecedores/desativados`, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                },
                params: {
                    size: 10,
                    sort: "nome,ASC",
                    page: 0
                }
            })

            setFornecedores(response.data.content)
        } catch (error) {

        }
    }

    async function fornecedoresAtivos() {
        try {
            let response = await api.get(`fornecedores/ativos`, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                },
                params: {
                    size: 10,
                    sort: "nome,ASC",
                    page: 0
                }
            })

            setFornecedores(response.data.content)
        } catch (error) {
            console.log(error)
        }
    }

    function NovoFornecedor() {
        navigate("/fornecedores/novos")
    }

    async function editar(id) {
        navigate(`/fornecedores/editar/${id}`)
    }

    async function desativar(id) {
        const data = fornecedores.find(u => u.id === id)
        data.enabled = false;

        try {
            let response = await api.put(`fornecedores/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            setFornecedores(fornecedores.map(function (item) { return item.id === id ? response.data : item }))
        } catch (error) {
            console.log(error)
        }
    }

    async function ativar(id) {

        const data = fornecedores.find(u => u.id === id)
        data.enabled = true;

        try {
            let response = await api.put(`fornecedores/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            setFornecedores(fornecedores.map(function (item) { return item.id === id ? response.data : item }))
        } catch (error) {
            console.log(error)
        }
    }

    async function DetalheFornecedor(id) {
        navigate(`/fornecedores/detalhe/${id}`)
    }

    return (
        <>
            <Navbar />
            <section className='top'>
                <h3>Fornecedores</h3>

                <input
                    placeholder='Pesquisar por nome'
                    value={pesquisa}
                    onChange={e => setPesquisa(e.target.value)} 
                />

                <div className='btn' onClick={fornecedoresDesativados} >
                    <button type='button'>
                        <FiXCircle size={25} color='#E52548' />
                    </button>
                    <p>Desativados</p>
                </div>

                <div className='btn' onClick={fornecedoresAtivos} >
                    <button type='button'>
                        <FiCheckCircle size={25} color='#51AD86' />
                    </button>
                    <p>Ativos</p>
                </div>

                <div className='btn' onClick={NovoFornecedor}>
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
                            <th>Contato</th>
                            <th className='acoes'>Detalhes</th>
                            <th>Status</th>
                            <th className='acoes'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fornecedores.map(fornecedor => (
                            <tr key={fornecedor.id}>
                                <td>{fornecedor.nome}</td>
                                <td>{fornecedor.email}</td>
                                <td>
                                    <FiFileText
                                        color='#6098DE'
                                        className='icon'
                                        size={20}
                                        type='button'
                                        title="Detalhes"
                                        onClick={() => DetalheFornecedor(fornecedor.id)}
                                    />
                                </td>
                                <td>{fornecedor.enabled ? "ATIVO" : "DESATIVADO"}</td>
                                <td>
                                    <FiEdit3
                                        color='#6098DE'
                                        className='icon'
                                        size={20}
                                        type='button'
                                        title="Editar"
                                        onClick={() => editar(fornecedor.id)}
                                    />
                                    {
                                        fornecedor.enabled ?
                                            <FiXCircle
                                                color='#E52548'
                                                className='icon'
                                                size={20}
                                                type='button'
                                                title="Desativar"
                                                onClick={() => desativar(fornecedor.id)}
                                            /> :
                                            <FiCheckCircle
                                                color='#51AD86'
                                                className='icon'
                                                size={20}
                                                type='button'
                                                title="Ativar"
                                                onClick={() => ativar(fornecedor.id)}
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

export default Fornecedor