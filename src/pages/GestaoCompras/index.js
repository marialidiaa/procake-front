import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiTrash2, FiPlusCircle } from 'react-icons/fi'

import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'

const GestaoCompras = () => {

    const [estoque, setEstoque] = useState([])
    const [dataInicial, setDataInicial] = useState("")
    const [dataFinal, setDataFinal] = useState("")
    const [usuarioInsercao, setUsuarioInsercao] = useState("")
    const [notaFiscal, setNotaFiscal] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate()



    async function novaCompra() {
        navigate(`/gestao-compras/novo`)
    }



    return (
        <>
            <Navbar />
            <section className='top-filter'>
                <h3>Gestão compras</h3>
                <h4>Filtros de pesquisa</h4>
                <div className='container-pesquisa'>

                    <div className='input'>
                        <label>Data de inicial</label>
                        <input
                            value={dataInicial}
                            onChange={e => setDataInicial(e.target.value)}
                            type='date'
                        />
                    </div>

                    <div className='input'>
                        <label>Data final</label>
                        <input
                            value={dataFinal}
                            onChange={e => setDataFinal(e.target.value)}
                            type='date'
                        />
                    </div>
                    <div className='input'>
                        <label>Usuário responsável pela inserção</label>
                        <input
                            placeholder='Pesquisar por nome de usuario'
                            value={usuarioInsercao}
                            onChange={e => setUsuarioInsercao(e.target.value)}
                            type='text'
                        />
                    </div>
                    <div className='input'>
                        <label>Nota Fiscal</label>
                        <input
                            placeholder='Pesquisar por nota fiscal'
                            value={notaFiscal}
                            onChange={e => setNotaFiscal(e.target.value)}
                            type='text'
                        />
                    </div>
                    <div className='btn'>
                        <FiSearch size={25} color='#6098DE' />
                        <p>Pesquisar</p>
                    </div>

                    <div className='btn' onClick={novaCompra}>
                    <FiPlusCircle size={25} color='#51AD86' />
                    <p>Adicionar</p>
                </div>

                </div>
            </section>

            <section className='table-small'>
                <table>
                    <thead>
                        <tr>    
                            <th>Nota fiscal</th>
                            <th>Usuário</th>
                            <th>Data de inserção</th>
                            <th className='acoes'>Ações</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {estoque.map(estoque => (
                            <tr key={estoque.id}>
                                <td>{estoque.insumo.nome}</td>
                                <td>{estoque.marca}</td>
                                <td>
                                    {estoque.quantidade} {estoque.insumo.unidadeMedida}
                                </td>
                                <td>{estoque.dataVencimento}</td>
                                <td>{estoque.valor}</td>
                                <td>{estoque.notaFiscal}</td>
                                <td>
                                    <FiTrash2
                                        color='#E52548'
                                        className='icon'
                                        size={20}
                                        type='button'
                                        title="Detalhes"
                                        onClick={() => estorno(estoque.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody> */}
                </table>
            </section>

        </>
    )
}

export default GestaoCompras