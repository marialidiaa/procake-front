import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useParams } from 'react-router-dom'

import api from '../../api/api'

import './styles.css'


const DetalheEstoque = () => {

    const [insumo, setInsumo] = useState("")
    const [quantidade, setQuantidade] = useState("")
    const [dataInsercao, setDataInsercao] = useState("")
    const [dataVencimento, setDataVencimento] = useState("")
    const [valor, setValor] = useState("")
    const [marca, setMarca] = useState("")
    const [notaFiscal, setNotaFiscal] = useState("")
    const [usuarioInsercao, setUsuarioInsercao] = useState("")


    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const { id } = useParams();


    useEffect(() => {

        api.get(`estoque/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            }
        }).then(response => {
            setInsumo(response.data.insumo)
            setQuantidade(response.data.quantidade)
            let data = new Date(response.data.dataInsercao);
            let dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            setDataInsercao(dataFormatada)
            data = new Date(response.data.dataVencimento);
            dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            setDataVencimento(dataFormatada)
            setValor(response.data.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
            setNotaFiscal(response.data.notaFiscal)
            setUsuarioInsercao(response.data.usuarioInsercao)
            setMarca(response.data.marca)
        })
    }, [tokenAcesso, id])

    return (
        <>
            <Navbar />
            <section className='detalhes'>
                <div className='titulo-detalhes'>
                    <h1>Detalhes de estoque</h1>
                    <div className='input'>
                        <Link to="/estoque" className=' btn-cancel' >
                            Voltar
                        </Link>
                    </div>
                </div>
                <section>
                    <div>
                        <h2>Insumo: </h2>
                        <p>{insumo.nome}</p>
                    </div>
                    <div>
                        <h2>Código: </h2>
                        <p>{insumo.codigo}</p>
                    </div>
                    <div>
                        <h2>Quantidade: </h2>
                        <p>{quantidade}{insumo.unidadeMedida}</p>
                    </div>
                    <div>
                        <h2>Data de inserção: </h2>
                        <p>{dataInsercao}</p>
                    </div>
                    <div>
                        <h2>Data de vencimento: </h2>
                        <p>{dataVencimento}</p>
                    </div>
                    <div>
                        <h2>Valor pago: </h2>
                        <p>{valor}</p>
                    </div>

                    <div>
                        <h2>Usuario que inseriu: </h2>
                        <p>{usuarioInsercao}</p>
                    </div>
                    <div>
                        <h2>Nota Fiscal: </h2>
                        <p>{notaFiscal ? notaFiscal : "N/A"}</p>
                    </div>
                    <div>
                        <h2>Marca: </h2>
                        <p>{marca}</p>
                    </div>
                </section>
            </section>
        </>
    )
}

export default DetalheEstoque