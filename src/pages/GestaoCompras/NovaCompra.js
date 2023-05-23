import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'


import api from '../../api/api'
import UTILS from '../../utils/UTILS'

import './styles.css'
import '../../styles/Global.css'

const NovaCompra = () => {

    const [insumo, setInsumo] = useState("")
    const [listaInsumo, setListaInsumo] = useState([])
    const [quantidade, setQuantidade] = useState('')
    const [marca, setMarca] = useState('')
    const [valor, setValor] = useState('')
    const [dataVencimento, setDataVencimento] = useState('')
    const [pesquisa, setPesquisa] = useState('')
    const [notaFiscal, setNotaFiscal] = useState('')
    const tokenAcesso = localStorage.getItem('tokenAcesso')

    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {

            if (pesquisa !== "" && pesquisa !== undefined) {
                api.get(`insumos/pesquisar/ativo/${pesquisa}`, {
                    headers: {
                        Authorization: `Bearer ${tokenAcesso}`
                    }
                }).then((res) => {

                    if (res.data.length > 0) {
                        res.data.forEach(i => {
                            i.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_TEXTO(i.unidadeMedida)
                        })
                    }
                    setListaInsumo(res.data)
                    setPesquisa("")
                }).catch((err) => {
                    console.log(err.response.data)
                })
            }
        }, 2000)

        return () => clearTimeout(timer)
    }, [pesquisa, tokenAcesso])


    const handleChange = (event, func) => {
        const result = event.target.value.replace(/[^0-9.]/g, '');
        func(result)
    }

    async function salvar(e) {
        e.preventDefault()

        if (!insumo) {
            alert("Insumo não pode ser vazio")
            return
        }

        const data = {
            "insumo": {
                id: insumo
            },
            quantidade,
            marca,
            dataVencimento,
            notaFiscal,
            valor
        }
        console.log(data)
        try {
            await api.post('estoque', data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/insumos/manutencao")
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
            <section className='top-filter'>
                <h3>Inserir Nova Compra</h3>
                <h4>Filtros de pesquisa</h4>
                <div className='container-pesquisa'>
                    <div className='input'>
                        <label>Marca</label>
                        <input
                            placeholder='Pesquisar por marca'
                            value={insumo}
                            onChange={e => setInsumo(e.target.value)}
                            type='text'
                        />
                    </div>
                    <div className='input'>
                        <label>Fornecedor</label>
                        <input
                            placeholder='Pesquisar por fornecedor'
                            value={insumo}
                            onChange={e => setInsumo(e.target.value)}
                            type='text'
                        />
                    </div>
                    <div className='input'>
                        <label>Insumo</label>
                        <input
                            placeholder='Pesquisar por nome de insumo'
                            value={insumo}
                            onChange={e => setInsumo(e.target.value)}
                            type='text'
                        />
                    </div>

                    
                    <div className='input'>
                        <button className='btn-save' onClick={e => salvar(e)}>
                            Salvar
                        </button>
                        <Link to="/gestao-compras" className='btn-cancel' >
                            Voltar
                        </Link>
                    </div>
                </div>
                <h4>Dados lançamento</h4>
            </section>



            <section className='form'>

                <form>
                    <div className='input'>
                        <label>Nome</label>
                        <input
                            type='text'
                            placeholder='Nome'
                        />
                    </div>

                    <div className='input'>
                        <label>Nome</label>
                        <input
                            type='text'
                            placeholder='Nome'
                        />
                    </div>

                    <div className='input'>
                        <button className='btn-save' onClick={salvar} >
                            Salvar
                        </button>

                        <Link to="/insumos" className=' btn-cancel' >
                            Voltar
                        </Link>
                    </div>
                </form>
            </section >
        </>
    )
}

export default NovaCompra