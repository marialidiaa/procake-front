import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.svg'
import useAuth from "../../hooks/useAuth";
import api from '../../api/api'
import './styles.css'
import '../../styles/Global.css'



const Login = () => {

    const { signin, signed } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (signed) {
            navigate("/home")
        }
    }, [navigate, signed])

    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault();

        const data = {
            email,
            senha
        }

        try {
            const response = await api.post('auth/autenticar', data)
            signin(response.data.tokenAcesso)
        } catch (error) {

            let erroMensagem = "";
            if (error.response.data) {
                erroMensagem += `${error.response.data.error} motivo:\n `

                if (!!error.response.data.errors) {
                    error.response.data.errors.forEach(element => {
                        erroMensagem += `${element}\n `
                    });
                } else {
                    erroMensagem += `${error.response.data.error}\n `
                }

            } else {
                erroMensagem = "Usuario ou senha incorretos"
            }
            alert(erroMensagem)
        }
        navigate("/home")
    }


    return (
        <div className='login-container'>
            <section className="logo">
                <h1>PROCAKE</h1>
                <h2>Seus lucros na palma da mão</h2>
                <img src={logo} alt="" />
            </section>
            <section className="login-form">
                <form onSubmit={e => handleLogin(e)}>
                    <h1>Entrar</h1>
                    <p>Com sua conta</p>

                    <input type="text" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <button className='button'>Entrar</button>
                </form>

            </section>
        </div>
    )
}

export default Login