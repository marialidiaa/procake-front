import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'




const EditarCliente = () => {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [telefone, setTelefone] = useState("")
    const [rua, setRua] = useState("")
    const [numero, setNumero] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [bairro, setBairro] = useState("")
    const [cep, setCep]= useState("")
    const [complemento, setComplemento] = useState("")
    const [cpfCnpj, setCpfCnpj] = useState("")
    const [enabled, setEnabled] = useState("")


    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        api.get(`clientes/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            }
        }).then(response => {
            setNome(response.data.nome)
            setBairro(response.data.bairro)
            setEmail(response.data.email)
            setNumero(response.data.numero)
            setCep(response.data.cep)
            setComplemento(response.data.complemento)
            setCidade(response.data.cidade)
            setEstado(response.data.estado)
            setRua(response.data.rua)
            setTelefone(response.data.telefone)
            setCpfCnpj(response.data.cpfCnpj)
            setEnabled(response.data.enabled)
        })
    }, [tokenAcesso, id])


    async function atualizar(e) {

        e.preventDefault()

        const data = {
            nome,
                email,
                telefone,
                rua,
                numero,
                cidade,
                estado,
                bairro,
                cep,
                complemento,
                cpfCnpj,
                enabled 
        }
        try {
            await api.put(`clientes/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/clientes")
        } catch (error) {
            let errorMessage = error.response.data.error;
            alert(errorMessage)
        }
    }


    return (
        <>
            <Navbar />
            <section className='form'>
                <h1>Editar Cliente</h1>
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
                        <label>Email</label>
                        <input
                            type='text'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div> 

                    <div className='input'>
                        <label>CPF/CNPJ</label>
                        <input
                            type='text'
                            placeholder='CPF/CNPJ'
                            onChange={(e) => setCpfCnpj(e.target.value)}
                            value={cpfCnpj}
                            readOnly={true}
                        />
                    </div>

                    <div className='input'>
                        <label>Telefone</label>
                        <input
                            type='text'
                            placeholder='Telefone'
                            onChange={(e) => setTelefone(e.target.value)}
                            value={telefone}
                        />
                    </div>

                    <div className='input'>
                        <label>Rua</label>
                        <input
                            type='text'
                            placeholder='Rua'
                            onChange={(e) => setRua (e.target.value)}
                            value={rua}
                        />
                    </div>

                    <div className='input'>
                        <label>Número</label>
                        <input
                            type='text'
                            placeholder='Número'
                            onChange={(e) => setNumero (e.target.value)}
                            value={numero}
                        />
                    </div> 

                    <div className='input'>
                        <label>Bairro</label>
                        <input
                            type='text'
                            placeholder='Bairro'
                            onChange={(e) => setBairro (e.target.value)}
                            value={bairro}
                        />
                    </div> 

                    <div className='input'>
                        <label>CEP</label>
                        <input
                            type='text'
                            placeholder='CEP'
                            onChange={(e) => setCep (e.target.value)}
                            value={cep}
                        />
                    </div>  

                    <div className='input'>
                        <label>Complemento</label>
                        <input
                            type='text'
                            placeholder='Complemento'
                            onChange={(e) => setComplemento (e.target.value)}
                            value={complemento}
                        />
                    </div> 

                    <div className='input'>
                        <label>Cidade</label>
                        <input
                            type='text'
                            placeholder='Cidade'
                            onChange={(e) => setCidade (e.target.value)}
                            value={cidade}
                        />
                    </div> 

                    <div className='input'>
                        <label>Estado</label>
                        <input
                            type='text'
                            placeholder='Estado'
                            onChange={(e) => setEstado (e.target.value)}
                            value={estado}
                        />
                    </div> 


                    <div className='input'>
                        <button className='btn-save' onClick={e => atualizar(e)}>
                            Atualizar
                        </button>

                        <Link to="/clientes" className=' btn-cancel' >
                            Voltar
                        </Link>
                    </div>


                </form>
            </section >
        </>
    )
}

export default EditarCliente