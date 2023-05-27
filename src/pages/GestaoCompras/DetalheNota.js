import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useParams } from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi'

import api from '../../api/api'

import './styles.css'


const DetalheNota = () => {

    
    const [notaFiscal, setNotaFiscal] = useState("")
    const [fornecedor, setFornecedor] = useState("")  
    const [lancamento, setLancamento] = useState([])


    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const { id } = useParams();


    useEffect(() => {

        api.get(`nota-fiscal/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            }
        }).then(response => {
            console.log(response.data)
            setNotaFiscal(response.data)
            setFornecedor(response.data.fornecedor.nome)
            setLancamento(response.data.lancamentos)
        })
    }, [tokenAcesso, id])

    return (
        <>
            <Navbar />
            <section className='detalhes'>
                <div className='titulo-detalhes'>
                    <h1>Detalhes da Nota Fiscal</h1>
                    
                    <div className='input'>
                        <Link to="/gestao-compras" className=' btn-cancel' >
                            Voltar
                        </Link>
                    </div>
                </div>
                <section>
                    <div>
                        <h2>Número da Nota Fiscal: </h2>
                        <p>{notaFiscal.notaFiscal}</p>
                    </div>
                    <div>
                        <h2>Data da Compra: </h2>
                        <p>{notaFiscal.dataCompra}</p>
                    </div>
                    <div>
                        <h2>Fornecedor: </h2>
                        <p>{fornecedor}</p>
                    </div>
                </section>

                <section className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>Insumo</th>
                            <th>Marca</th>
                            <th>Quantidade</th>
                            <th>Valor Pago</th>
                            <th>Data de Validade</th>
                        </tr>
                    </thead>
                    <tbody>
                    {lancamento.map(l => (
                            <tr key={l.id}>
                                <td>{l.insumo.nome}</td>
                                <td>{l.marca.nome}</td>
                                <td>{l.quantidade}</td>
                                <td>{l.valorPago}</td>
                                <td>{l.dataVencimento}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>


            </section>
        </>
    )
}

export default DetalheNota