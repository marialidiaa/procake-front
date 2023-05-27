import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'


const EditarFornecedor = () => {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cpfCnpj, setCpfCnpj] = useState("")
    const [telefone, setTelefone] = useState("")
    const [rua, setRua] = useState("")
    const [numero, setNumero] = useState("")
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [bairro, setBairro] = useState("")
    const [cep, setCep]= useState("")
    const [complemento, setComplemento] = useState("")
    const [enabled, setEnabled] = useState("")

    const [erroNome, setErroNome] = useState("")
    const [erroEmail, setErroEmail] = useState("")
    const [erroTelefone, setErroTelefone] = useState("")
    const [erroCidade, setErroCidade] = useState("")
    const [erroEstado, setErroEstado] = useState("")
    const [erroRua, setErroRua] = useState("")
    const [erroBairro, setErroBairro] = useState("")
    const [erroCep, setErroCep] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setErroNome("")
        setErroEmail("")
        setErroTelefone("")
        setErroCidade("")
        setErroEstado("")
        setErroBairro("")
        setErroCep("")
        setErroRua("")

     }, [])


    useEffect(() => {
        api.get(`fornecedores/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            }
        }).then(response => {
            setNome(response.data.nome)
            setEmail(response.data.email)
            setCpfCnpj(response.data.cpfCnpj)
            setNumero(response.data.numero)
            setCep(response.data.cep)
            setComplemento(response.data.complemento)
            setCidade(response.data.cidade)
            setEstado(response.data.estado)
            setRua(response.data.rua)
            setTelefone(response.data.telefone)
            setBairro(response.data.bairro)
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
            await api.put(`fornecedores/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/fornecedores")
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
        if(rua.trim().length <= 0 || rua.trim === "" || rua == null){
            setErroRua("*Não pode ser vazio*")
            controle = 1;
        }
        if(bairro.trim().length <= 0 || bairro.trim === "" || bairro == null){
            setErroBairro("*Não pode ser vazio*")
            controle = 1;
        }
        if(cep.trim().length <= 0 || cep.trim === "" || cep == null){
            setErroCep("*Não pode ser vazio*")
            controle = 1;
        }
        return controle
    }


    return (
        <>
            <Navbar />
            <section className='form'>
                <h1>Editar Fornecedor</h1>
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
                        <label>Email</label>
                        <input
                            type='text'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <p className='textErro'>{erroEmail}</p>
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
                        <p className='textErro'>{erroTelefone}</p>
                    </div>

                    <div className='input'>
                        <label>Rua</label>
                        <input
                            type='text'
                            placeholder='Rua'
                            onChange={(e) => setRua(e.target.value)}
                            value={rua}
                        />
                        <p className='textErro'>{erroRua}</p>
                    </div>

                    <div className='input'>
                        <label>Número</label>
                        <input
                            type='text'
                            placeholder='Numero'
                            onChange={(e) => setNumero(e.target.value)}
                            value={numero}
                        />
                    </div>

                    <div className='input'>
                        <label>Bairro</label>
                        <input
                            type='text'
                            placeholder='Bairro'
                            onChange={(e) => setBairro(e.target.value)}
                            value={bairro}
                        />
                        <p className='textErro'>{erroBairro}</p>
                    </div>

                    <div className='input'>
                        <label>CEP</label>
                        <input
                            type='text'
                            placeholder='CEP'
                            onChange={(e) => setCep(e.target.value)}
                            value={cep}
                        />
                        <p className='textErro'>{erroCep}</p>
                    </div>

                    <div className='input'>
                        <label>Complemento</label>
                        <input
                            type='text'
                            placeholder='Complemento'
                            onChange={(e) => setComplemento(e.target.value)}
                            value={complemento}
                        />
                    </div>

                    <div className='input'>
                        <label>Cidade</label>
                        <input
                            type='text'
                            placeholder='Cidade'
                            onChange={(e) => setCidade(e.target.value)}
                            value={cidade}
                        />
                        <p className='textErro'>{erroCidade}</p>
                    </div>

                    <div className='input'>
                        <label>Estado</label>
                        <input
                            type='text'
                            placeholder='Estado'
                            onChange={(e) => setEstado(e.target.value)}
                            value={estado}
                        />
                        <p className='textErro'>{erroEstado}</p>
                    </div>

                    <div className='input'>
                        <button className='btn-save' onClick={e => atualizar(e)}>
                            Atualizar
                        </button>

                        <Link to="/fornecedores" className=' btn-cancel' >
                            Voltar
                        </Link>
                    </div>
                </form>
            </section >
        </>
    )
}

export default EditarFornecedor