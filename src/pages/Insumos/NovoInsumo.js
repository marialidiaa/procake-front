import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'


const NovoInsumo = () => {

    const [nome, setNome] = useState("")
    const [unidadeMedida, setUnidadeMedida] = useState("")
    const [descricao, setDescricao] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate();


    async function salvar(e) {

        e.preventDefault()

        const data = {
            nome,
            unidadeMedida,
            descricao,
            enabled: true
        }


        try {
            await api.post('insumos', data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/insumos")
        } catch (error) {
            console.log(error.response)
            let errorMessage = "";
            error.response.data.errors.forEach(element => {
                errorMessage += `${element} \n`
            });
            console.log(error)
            alert(errorMessage)
        }
    }


    return (
        <>
            <Navbar />
            <section className='form'>
                <h1>Inserir insumo</h1>
                <form>
                    <div className='input'>
                        <label>Nome</label>
                        <input
                            type='text'
                            placeholder='Nome'
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                        />
                    </div>

                    <div className='input'>
                        <label>Unidade de medida</label>
                        <select
                            placeholder='Unidade de Medida'
                            value={unidadeMedida}
                            onChange={(e) => setUnidadeMedida(e.target.value)}
                        >
                            <option >Selecione</option>
                            <option value="KG">KILOGRAMA (KG)</option>
                            <option value="G">GRAMA (G)</option>
                            <option value="MG">MILIGRAMA (MG)</option>
                            <option value="ML">MILILITRO (ML)</option>
                            <option value="L">LITRO (L)</option>
                            <option value="UN">UNIDADE (UN)</option>
                        </select>
                    </div>

                    <div className='text-area'>
                        <label>Descrição</label>
                        <textarea
                            type='text'
                            placeholder='Descrição'
                            onChange={(e) => setDescricao(e.target.value)}
                            value={descricao}
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

export default NovoInsumo