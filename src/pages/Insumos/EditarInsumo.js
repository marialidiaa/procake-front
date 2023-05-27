import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'



const EditarInsumo = () => {
    const [nome, setNome] = useState("")
    const [unidadeMedida, setUnidadeMedida] = useState("")
    const [enabled, setEnabled] = useState("")
    const [descricao, setDescricao] = useState("")

    const [erroNome, setErroNome] = useState("")
    const [erroUnidadeMedida, setErroUnidadeMedida] = useState("")
    const [erroDescricao, setErroDescricao] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setErroNome("")
        setErroUnidadeMedida("")
        setErroDescricao("")
    }, [])


    useEffect(() => {

        api.get(`insumos/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            }
        }).then(response => {

            setNome(response.data.nome)
            setUnidadeMedida(response.data.unidadeMedida)
            setDescricao(response.data.descricao)
            setEnabled(response.data.enabled)
        })
    }, [tokenAcesso, id])


    async function atualizar(e) {

        e.preventDefault()

        let controle = validacoes();
        if(controle !== 0){
            return;
        }

        const data = {
            nome,
            unidadeMedida,
            descricao,
            enabled
        }

        try {
            await api.put(`insumos/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/insumos")
        } catch (error) {
            let errorMessage = error.response.data.error;
            alert(errorMessage)
        }
    }

    const validacoes =() =>{
        let controle = 0
        if(nome.trim().length <= 0 || nome.trim === "" || nome == null){
            setErroNome("*Não pode ser vazio*")
            controle = 1;
        }
        if(unidadeMedida.trim().length <= 0 || unidadeMedida.trim === "" || unidadeMedida == null){
            setErroUnidadeMedida("*Não pode ser vazio*")
            controle = 1;
        }
        if(descricao.trim().length <= 0 || descricao.trim === "" || descricao == null){
            setErroDescricao("*Não pode ser vazio*")
            controle = 1;
        }
        return controle
    }


    return (
        <>
            <Navbar />
            <section className='form'>
                <h1>Editar insumo</h1>
                <form>
                    <div className='input'>
                        <label>Nome</label>
                        <input
                            type='text'
                            placeholder='Nome'
                            onChange={(e) => setNome(e.target.value)}
                            value={nome}
                        />
                        <p className='textErro'>{erroNome}</p>
                    </div>

                    <div className='input'>
                        <label>Unidade de medida</label>
                        <select
                            placeholder='Unidade de Medida'
                            value={unidadeMedida}
                            onChange={(e) => setUnidadeMedida(e.target.value)}
                        >
                            <option value="KG">KILOGRAMA (KG)</option>
                            <option value="G">GRAMA (G)</option>
                            <option value="MG">MILIGRAMA (MG)</option>
                            <option value="ML">MILILITRO (ML)</option>
                            <option value="L">LITRO (L)</option>
                            <option value="UN">UNIDADE (UN)</option>
                        </select>
                        <p className='textErro'>{erroUnidadeMedida}</p>
                    </div>

                    <div className='text-area'>
                        <label>Descrição</label>
                        <textarea
                            type='text'
                            placeholder='Descrição'
                            onChange={(e) => setDescricao(e.target.value)}
                            value={descricao}
                        />
                        <p className='textErro'>{erroDescricao}</p>
                    </div>

                    <div className='input'>
                        <button className='btn-save' onClick={e => atualizar(e)}>
                            Atualizar
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

export default EditarInsumo