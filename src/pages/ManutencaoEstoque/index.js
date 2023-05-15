import React, { useState } from 'react'
import useAuth from "../../hooks/useAuth";
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'

import api from '../../api/api'
import UTILS from '../../utils/UTILS'

import './styles.css'
import '../../styles/Global.css'

const ManutencaoEstoque = () => {

    const navigate = useNavigate()

    async function estornoLancamentoEstoque() {
        navigate("/estoque/manutencao/estorno-lancamento")
    }

    async function baixaEstoque() {
        navigate("/estoque/manutencao/baixa")
    }

    async function reintegracaoEstoque() {
        navigate("/estoque/manutencao/reintegracao")
    }
    async function estornoBaixaEstoque() {
        navigate("/estoque/manutencao/estorno-baixa")
    }

    return (
        <>
            <Navbar />
            <section className='menu-manutencao-estoque'>
                <div className='btn' onClick={estornoLancamentoEstoque}>
                    <p>Estorno de lançamentos de estoque</p>
                    <p>Cancelamento dos estornos realizados na funcionalidade de estoque</p>
                </div>

                <div className='btn' onClick={baixaEstoque}>
                    Baixa de estoque
                    <p>Baixa de manterial lançado em ManutencaoEstoque</p>
                </div>

                <div className='btn' onClick={reintegracaoEstoque}>
                    Reintegração de estoque
                    <p>Reintegração da baixa do lançamento de estoque que foi cancelado</p>
                </div>

                <div className='btn' onClick={estornoBaixaEstoque}>
                    Estorno de baixa de estoque
                    <p>Reintegração da baixa de estoque que foi cancelado</p>
                </div>

                <div className='btn' onClick={estornoBaixaEstoque}>
                    Entrada de insumos
                    <p>Entrada de nota de insumos</p>
                </div>

                <div className='btn' onClick={estornoBaixaEstoque}>
                    Estorno entrada de insumos
                    <p>Estorno das entradas realizadas</p>
                </div>
            </section>
        </>
    )
}

export default ManutencaoEstoque