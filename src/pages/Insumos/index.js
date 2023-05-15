import React, { useEffect, useState } from 'react'
import useAuth from "../../hooks/useAuth";
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FiXCircle, FiCheckCircle, FiPlusCircle, FiEdit3 } from 'react-icons/fi'

import api from '../../api/api'
import UTILS from '../../utils/UTILS'

import './styles.css'
import '../../styles/Global.css'



const Insumos = () => {

    const [insumos, setInsumos] = useState([])
    const [pesquisa, setPesquisa] = useState()
    const tokenAcesso = localStorage.getItem('tokenAcesso')

    const { signout } = useAuth();
    const navigate = useNavigate()


    useEffect(() => {
        api.get('insumos', {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            },
            params: {
                size: 10,
                sort: "nome,ASC",
                page: 0
            }
        }).then((res) => {

            res.data.content.forEach(i => {
                i.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_TEXTO(i.unidadeMedida)
            })

            setInsumos(res.data.content)

        }).catch((err) => {
            console.log(err)
            if (err.response.data === "") {
                signout();
            }
        })
    }, [tokenAcesso, signout])

    useEffect(() => {
        const timer = setTimeout(() => {

            if (pesquisa !== "" && pesquisa !== undefined) {
                api.get(`insumos/pesquisar/${pesquisa}`, {
                    headers: {
                        Authorization: `Bearer ${tokenAcesso}`
                    }
                }).then((res) => {

                    if (res.data.length > 0) {
                        res.data.forEach(i => {
                            i.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_TEXTO(i.unidadeMedida)
                        })
                    }

                    setInsumos(res.data)
                    setPesquisa("")
                }).catch((err) => {
                    console.log(err)
                })
            }

        }, 500)

        return () => clearTimeout(timer)
    }, [pesquisa, tokenAcesso])

    async function insumoAtivos() {
        try {
            let res = await api.get(`insumos/ativos`, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                },
                params: {
                    size: 10,
                    sort: "nome,ASC",
                    page: 0
                }
            })

            res.data.content.forEach(i => {
                i.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_TEXTO(i.unidadeMedida)
            })

            setInsumos(res.data.content)
        } catch (error) {
            console.log(error)
        }
    }

    async function insumosDesativados() {
        try {
            let res = await api.get(`insumos/desativados`, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                },
                params: {
                    size: 10,
                    sort: "nome,ASC",
                    page: 0
                }
            })


            res.data.content.forEach(i => {
                i.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_TEXTO(i.unidadeMedida)
            })

            setInsumos(res.data.content)
        } catch (error) {

        }
    }

    function novoInsumo() {
        navigate("/insumos/novo")
    }

    async function editar(id) {
        navigate(`/insumos/editar/${id}`)
    }

    async function desativar(id) {
        const data = insumos.find(u => u.id === id)
        data.enabled = false;

        try {
            data.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_VALOR(data.unidadeMedida)
            await api.put(`insumos/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            data.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_TEXTO(data.unidadeMedida)
            setInsumos(insumos.map(function (item) { return item.id === id ? data : item }))
            return
        } catch (error) {
            data.enabled = true;
            data.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_TEXTO(data.unidadeMedida)
            setInsumos(insumos.map(function (item) { return item.id === id ? data : item }))
            alert(error.response.data.message)
            return
        }
    }

    async function ativar(id) {
        const data = insumos.find(u => u.id === id)
        data.enabled = true;

        try {
            data.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_VALOR(data.unidadeMedida)
            await api.put(`insumos/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })

            data.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_TEXTO(data.unidadeMedida)
            setInsumos(insumos.map(function (item) { return item.id === id ? data : item }))
            return
        } catch (error) {
            data.enabled = false;
            data.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_TEXTO(data.unidadeMedida)
            setInsumos(insumos.map(function (item) { return item.id === id ? data : item }))
            alert(error.response.data.message)
            return
        }
    }

    return (
        <>
            <Navbar />
            <section className='top'>
                <h3>Insumos</h3>
                <input
                    placeholder='Pesquisar por nome de insumo'
                    value={pesquisa}
                    onChange={e => setPesquisa(e.target.value)}
                />
                <div className='btn' onClick={insumosDesativados}>
                    <button type='button' >
                        <FiXCircle size={25} color='#E52548' />
                    </button>
                    <p>Desativados</p>
                </div>

                <div className='btn' onClick={insumoAtivos}>
                    <button type='button' >
                        <FiCheckCircle size={25} color='#51AD86' />
                    </button>
                    <p>Ativos</p>
                </div>

                <div className='btn' onClick={novoInsumo}>
                    <button type='button'>
                        <FiPlusCircle size={25} color='#6098DE' />
                    </button>
                    <p>Adicionar</p>
                </div>
            </section >
            <section className='table'>
                <table>
                    <thead>
                        <tr>
                            <th className='acoes'>Código</th>
                            <th>Nome</th>
                            <th>Unidade de medida</th>
                            <th>Descrição</th>
                            <th>Status</th>
                            <th className='acoes'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {insumos.map(insumos => (
                            <tr key={insumos.id}>
                                <td>{insumos.codigo}</td>
                                <td>{insumos.nome}</td>
                                <td>
                                    {insumos.unidadeMedida}
                                </td>
                                <td>{insumos.descricao}</td>
                                <td>{insumos.enabled ? "ATIVO" : "DESATIVADO"}</td>
                                <td>
                                    <FiEdit3
                                        color='#6098DE'
                                        className='icon'
                                        size={20}
                                        type='button'
                                        title="Editar"
                                        onClick={() => editar(insumos.id)}
                                    />
                                    {
                                        insumos.enabled ?
                                            <FiXCircle
                                                color='#E52548'
                                                className='icon'
                                                size={20}
                                                type='button'
                                                title="Desativar"
                                                onClick={() => desativar(insumos.id)}
                                            /> :
                                            <FiCheckCircle
                                                color='#51AD86'
                                                className='icon'
                                                size={20}
                                                type='button'
                                                title="Ativar"
                                                onClick={() => ativar(insumos.id)}
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

export default Insumos