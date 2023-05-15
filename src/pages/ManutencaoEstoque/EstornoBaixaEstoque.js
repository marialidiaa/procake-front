import React, { useState } from 'react'
import useAuth from "../../hooks/useAuth";
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

import api from '../../api/api'
import UTILS from '../../utils/UTILS'

import './styles.css'
import '../../styles/Global.css'

const EstornoBaixaEstoque = () => {

    const [estoque, setEstoque] = useState([])
    const [dataInicial, setDataInicial] = useState("")
    const [dataFinal, setDataFinal] = useState("")
    const [usuario, setUsuario] = useState("")
    const [insumo, setInsumo] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')

    const { signout } = useAuth();
    const navigate = useNavigate()

    async function pesquisar() {
        console.log(`${dataInicial} - ${dataFinal} - ${usuario} - ${insumo}`)
    }


    return (
        <>
            <Navbar />
            <section className='top-filter'>
                <h3>Manutenção de insumos - Estorno da baixa</h3>
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
                            value={usuario}
                            onChange={e => setUsuario(e.target.value)}
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

                    </tbody>
                </table>
            </section>

        </>
    )
}

export default EstornoBaixaEstoque