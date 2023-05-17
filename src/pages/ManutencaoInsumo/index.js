import React, { useState } from 'react'
import useAuth from "../../hooks/useAuth";
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FiFilePlus, FiFileMinus, FiXSquare, FiRotateCcw, FiGrid} from 'react-icons/fi'


import api from '../../api/api'
import UTILS from '../../utils/UTILS'

import './styles.css'
import '../../styles/Global.css'

const ManutencaoInsumo = () => {

    const navigate = useNavigate()

    async function lancamentoInsumo() {
        navigate("/insumos/manutencao/novo")
    }

    async function estornoLancamentoInsumo() {
        navigate("/insumos/manutencao/estorno-lancamento")
    }

    async function baixaInsumo() {
        navigate("/insumos/manutencao/baixa")
    }

    async function reintegracaoInsumo() {
        navigate("/insumos/manutencao/reintegracao")
    }
    async function estornoCancelamentoInsumo() {
        navigate("/insumos/manutencao/estorno-baixa")
    }

    return (
        <>
            <Navbar />
            <section className='menu-manutencao-estoque'>

            <div className='btn' onClick={lancamentoInsumo}>
                    <div><FiFilePlus color='#ff0095' size={40}/></div>
                    <p>Entrada de insumos</p>
                </div>

                <div className='btn' onClick={estornoLancamentoInsumo}>
                    <div><FiXSquare size={40}/></div>
                    <p>Cancelamento de entrada de insumo</p>
                </div>

                <div className='btn' onClick={estornoCancelamentoInsumo}>
                <div><FiGrid size={40}/></div>
                    <p>Reintegração cancelamento de insumo</p>
                </div>

                <div className='btn' onClick={baixaInsumo}>
                <div><FiFileMinus size={40}/></div>
                    <p>Baixa de insumo</p>
                </div>

                <div className='btn' onClick={reintegracaoInsumo}>
                <div><FiRotateCcw size={40}/></div>
                    <p>Reintegração da baixa de insumo</p>
                </div>

            </section>
        </>
    )
}

export default ManutencaoInsumo