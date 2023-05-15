import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from 'react-router-dom'


import api from '../../api/api'
import UTILS from '../../utils/UTILS'

import './styles.css'
import '../../styles/Global.css'

const NovoEstoque = () => {

    const [insumo, setInsumo] = useState("")
    const [listaInsumo, setListaInsumo] = useState([])
    const [quantidade, setQuantidade] = useState('')
    const [marca, setMarca] = useState('')
    const [valor, setValor] = useState('')
    const [dataVencimento, setDataVencimento] = useState('')
    const [pesquisa, setPesquisa] = useState('')
    const [notaFiscal, setNotaFiscal] = useState('')
    const tokenAcesso = localStorage.getItem('tokenAcesso')

    const { signout } = useAuth();
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
        }, 500)

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
            navigate("/estoque")
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
                <h1>Inserir estoque</h1>
                <form>

                    <div className='input'>
                        <label>Pesquisa do insumo</label>
                        <input
                            placeholder='Pesquisar por nome de insumo'
                            value={pesquisa}
                            onChange={e => setPesquisa(e.target.value)}
                        />
                    </div>

                    <div className='input'>
                        <label>Insumo</label>
                        <select
                            onChange={(e) => setInsumo(e.target.value)}
                            value={insumo}
                        >
                            <option>Selecionar</option>
                            {listaInsumo.map(ins => (
                                <option key={ins.id} value={ins.id} >COD: {ins.codigo} - {ins.nome} - {ins.unidadeMedida} </option>
                            ))}
                        </select>
                    </div>
                    <div className='input'>
                        <label>Quantidade</label>
                        <input
                            type='text'
                            placeholder='Quantidade'
                            onChange={(e) => handleChange(e, setQuantidade)}
                            value={quantidade}
                        />
                    </div>
                    <div className='input'>
                        <label>Valor Pago</label>
                        <input
                            type='text'
                            placeholder='Valor Pago'
                            onChange={(e) => handleChange(e, setValor)}
                            value={valor}
                        />
                    </div>
                    <div className='input'>
                        <label>Data de vencimento</label>
                        <input
                            type='date'
                            placeholder='Data de vencimento'
                            onChange={(e) => setDataVencimento(e.target.value)}
                            value={dataVencimento}
                        />
                    </div>

                    <div className='input'>
                        <label>Nota fiscal</label>
                        <input
                            type='text'
                            placeholder='Nota fiscal'
                            onChange={(e) => setNotaFiscal(e.target.value)}
                            value={notaFiscal}
                        />
                    </div>

                    <div className='input'>
                        <label>Marca</label>
                        <input
                            type='text'
                            placeholder='Marca'
                            onChange={(e) => setMarca(e.target.value)}
                            value={marca}
                        />
                    </div>

                    <div className='input'>
                        <button className='btn-save' onClick={e => salvar(e)}>
                            Salvar
                        </button>

                        <Link to="/estoque" className=' btn-cancel' >
                            Voltar
                        </Link>
                    </div>
                </form>
            </section>
        </>
    )
}

export default NovoEstoque