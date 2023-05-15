import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiTrash2 } from 'react-icons/fi'

import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'

const EstornoLancamentoEstoque = () => {

    const [estoque, setEstoque] = useState([])
    const [dataInicial, setDataInicial] = useState("")
    const [dataFinal, setDataFinal] = useState("")
    const [usuarioInsercao, setUsuarioInsercao] = useState("")
    const [insumo, setInsumo] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')

    const navigate = useNavigate()

    async function pesquisar() {

        const data = {
            dataInicial,
            dataFinal,
            usuarioInsercao,
            insumo
        }

        try {
            let res = await api.post(`estoque/pesquisar`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })

            res.data.forEach(e => {
                let data = new Date(e.dataVencimento);
                let dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

                e.dataVencimento = dataFormatada;

                e.valor = e.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            })

            setEstoque(res.data)

            setDataFinal("")
            setDataInicial("")
            setInsumo("")
            setUsuarioInsercao("")

            return
        } catch (error) {

            setDataFinal("")
            setDataInicial("")
            setInsumo("")
            setUsuarioInsercao("")
            alert(error.response.data.message)
            return
        }
    }


    async function estorno(id) {

        let estoqueJson = estoque.find(item => item.id === id);


        const data = {
            "id": estoqueJson.id,
        }

        try {
            console.log(data)
            await api.post(`estoque/estorno`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })

            estoque = estoque.filter(item => item.id === id);
            return
        } catch (error) {
            alert(error.response.data.message)
            return
        }
    }




    return (
        <>
            <Navbar />
            <section className='top-filter'>
                <h3>Manutenção de insumos - Estorno do Lançamento</h3>
                <h4>Filtros de pesquisa</h4>
                <div className='manutencao-estoque-filter'>

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
                        <label>Usuario responsavel pela inserção</label>
                        <input
                            placeholder='Pesquisar por nome de usuario'
                            value={usuarioInsercao}
                            onChange={e => setUsuarioInsercao(e.target.value)}
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
                    <div className='btn' onClick={pesquisar}>
                        <button type='button'>
                            <FiSearch size={25} color='#6098DE' />
                        </button>
                        <p>Pesquisar</p>
                    </div>
                </div>
            </section>

            <section className='table-small'>
                <table>
                    <thead>
                        <tr>
                            <th>Insumo</th>
                            <th className='acoes'>Marca</th>
                            <th>Quantidade</th>
                            <th>Data de vencimento</th>
                            <th>Valor pago</th>
                            <th>Nota fiscal</th>
                            <th className='acoes'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                </table>
            </section>

        </>
    )
}

export default EstornoLancamentoEstoque