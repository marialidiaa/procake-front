import React, {  useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'




const NovoCliente = () => {

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

    const [erroNome, setErroNome] = useState("")
    const [erroEmail, setErroEmail] = useState("")
    const [erroTelefone, setErroTelefone] = useState("")
    const [erroCidade, setErroCidade] = useState("")
    const [erroEstado, setErroEstado] = useState("")
    const [errocpfCnpj, setErrocpfCnpj] = useState("")


    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate();

    useEffect(() => {
       setErroNome("")
       setEmail("")
       setErroTelefone("")
       setCidade("")
       setEstado("")
       setCpfCnpj("")
    }, [])

    async function salvar(e) {
        e.preventDefault()

        let controle = validacoes();
        if(controle !== 0){
            return;
        }

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
                "enabled" : true 
        }
        try {
            await api.post('clientes', data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/clientes")
        } catch (error) {
            let errorMessage = "";
            error.response.data.errors.forEach(element => {
                errorMessage += `${element} \n`
            });
            alert(errorMessage)
        }
    }

    const validacoes =() =>{
        let controle = 0
        if(nome.trim().length <= 0 || nome.trim === "" || nome == null){
            setErroNome("*Não pode ser vazio*")
            controle = 1;
        }
        if(email.trim().length <= 0 || email.trim === "" || email == null){
            setErroEmail("*Não pode ser vazio*")
            controle = 1;
        }
        if(cidade.trim().length <= 0 || cidade.trim === "" || cidade == null){
            setErroCidade("*Não pode ser vazio*")
            controle = 1;
        }
        if(estado.trim().length <= 0 || estado.trim === "" || estado == null){
        setErroEstado("*Não pode ser vazio*")
        controle = 1;            
        }        
        if(telefone.trim().length <= 0 || telefone.trim === "" || telefone == null){
            setErroTelefone("*Não pode ser vazio*")
            controle = 1;
        }
        if(cpfCnpj.trim().length <= 0 || cpfCnpj.trim === "" || cpfCnpj == null){
            setErrocpfCnpj("*Não pode ser vazio*")
            controle = 1;
        }
        return controle
    }

    return (
        <>
            <Navbar />
            <section className='form'>
                <h1>Cadastro de Cliente</h1>
                <form>
                    <div className='input'>
                        <label>Nome</label>
                        <input
                            type='text'
                            placeholder='Nome'
                            onChange={(e) => setNome(e.target.value)}
                        />
                    <p className='textErro'>{erroNome}</p>
                    </div>

                    <div className='input'>
                        <label>Email</label>
                        <input
                            type='text'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className='textErro'>{erroEmail}</p>
                    </div> 

                    <div className='input'>
                        <label>CPF/CNPJ</label>
                        <input
                            type='text'
                            placeholder='CPF/CNPJ'
                            onChange={(e) => setCpfCnpj(e.target.value)}
                        />
                        <p className='textErro'>{errocpfCnpj}</p>
                    </div>

                    <div className='input'>
                        <label>Telefone</label>
                        <input
                            type='text'
                            placeholder='Telefone'
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                        <p className='textErro'>{erroTelefone}</p>
                    </div>

                    <div className='input'>
                        <label>Rua</label>
                        <input
                            type='text'
                            placeholder='Rua'
                            onChange={(e) => setRua (e.target.value)}
                        />
                    </div>

                    <div className='input'>
                        <label>Número</label>
                        <input
                            type='text'
                            placeholder='Número'
                            onChange={(e) => setNumero (e.target.value)}
                        />
                    </div> 

                    <div className='input'>
                        <label>Bairro</label>
                        <input
                            type='text'
                            placeholder='Bairro'
                            onChange={(e) => setBairro (e.target.value)}
                        />
                    </div> 

                    <div className='input'>
                        <label>CEP</label>
                        <input
                            type='text'
                            placeholder='CEP'
                            onChange={(e) => setCep (e.target.value)}
                        />
                    </div>  

                    <div className='input'>
                        <label>Complemento</label>
                        <input
                            type='text'
                            placeholder='Complemento'
                            onChange={(e) => setComplemento (e.target.value)}
                        />
                    </div> 

                    <div className='input'>
                        <label>Cidade</label>
                        <input
                            type='text'
                            placeholder='Cidade'
                            onChange={(e) => setCidade (e.target.value)}
                        />
                        <p className='textErro'>{erroCidade}</p>
                    </div> 

                    <div className='input'>
                        <label>Estado</label>
                        <input
                            type='text'
                            placeholder='Estado'
                            onChange={(e) => setEstado (e.target.value)}
                        />
                        <p className='textErro'>{erroEstado}</p>
                    </div> 


                    <div className='input'>
                        <button className='btn-save' onClick={e => salvar(e)}>
                            Salvar
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

export default NovoCliente