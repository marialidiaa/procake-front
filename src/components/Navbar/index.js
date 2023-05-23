import React from 'react';
import './style.css'
import logo from '../../assets/logo.svg'
import { Link } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const { signout } = useAuth();

    const handleLogout = () => {
        signout()
        navigate("/login")
    }

    const insumo = () => {
        navigate("/insumos/manutencao")
    }

    const usuarios = () => {
        navigate("/usuarios")
    }

    const grupoAcesso = () => {
        navigate("/grupo-acesso")
    }

    const alterarSenha = () => {
        navigate("/alterar-senha")
    }

    const marcas = () => {
        navigate("/marcas")
    }
    const fornecedores = () => {
        navigate("/fornecedores")
    }

    const clientes = () => {
        navigate("/clientes")
    }

    const insumos = () => {
        navigate("/insumos")
    }
    
    const inventario = () => {
        navigate("/inventario")
    }

    const gestaoCompras = () => {
        navigate("/gestao-compras")
    }



    return (
        <nav className='nav'>
            <section>
                <img src={logo} alt="" />
                <span>PROCAKE</span>
            </section>
            <section className='container'>

                <Link className='link' to="/home">
                    Home
                </Link>

                <ul className="drop-down">
                    <li className='drop-down-label'>Administração
                        <ul>
                            <li onClick={usuarios}>
                                <Link className='drop-down-link'>
                                    Funcionários
                                </Link>
                            </li>
                            <li onClick={clientes}>
                                <Link className='drop-down-link'>
                                    Clientes
                                </Link>
                            </li>
                            <li onClick={grupoAcesso}>
                                <Link className='drop-down-link'>
                                    Grupos de acesso
                                </Link>
                            </li>
                            <li onClick={alterarSenha}>
                                <Link className='drop-down-link'>
                                    Alterar senha
                                </Link>
                            </li>
                        </ul>
                    </li>

                </ul>

               

                <ul className="drop-down">
                    <li className='drop-down-label'> Gestão de Insumos
                        <ul>
                            <li onClick={marcas}>
                                <Link className='drop-down-link'>
                                    Marcas
                                </Link>
                            </li>
                            <li onClick={fornecedores}>
                                <Link className='drop-down-link'>
                                    Fornecedores
                                </Link>
                            </li>

                            <li onClick={insumos}>
                                <Link className='drop-down-link'>
                                    Insumos
                                </Link>
                            </li>

                            <li onClick={inventario}>
                                <Link className='drop-down-link'>
                                Inventário
                                </Link>
                            </li>

                            <li onClick={gestaoCompras}>
                                <Link className='drop-down-link'>
                                Gestão de compras
                                </Link>
                            </li>
                           
                        </ul>
                    </li>

                </ul>

                <button className='button' onClick={handleLogout}>Sair</button>
            </section >
        </nav >
    );

}


export default Navbar;