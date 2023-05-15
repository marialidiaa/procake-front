import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import Login from "../pages/Login"
import Error from "../pages/Error"
import Home from "../pages/Home";

import Usuarios from "../pages/Usuarios";
import NovoUsuario from "../pages/Usuarios/NovoUsuario";
import EditarUsuario from "../pages/Usuarios/EditarUsuario";

import Insumos from "../pages/Insumos";
import NovoInsumo from "../pages/Insumos/NovoInsumo";
import EditarInsumo from "../pages/Insumos/EditarInsumo";

import Estoque from '../pages/Estoque'
import NovoEstoque from '../pages/Estoque/NovoEstoque'
import DetalheEstoque from '../pages/Estoque/DetalheEstoque'


import ManutencaoEstoque from '../pages/ManutencaoEstoque'
import EstornoLancamentoEstoque from '../pages/ManutencaoEstoque/EstornoLancamentoEstoque'
import EstornoBaixaEstoque from '../pages/ManutencaoEstoque/EstornoBaixaEstoque'
import ReintegracaoEstoque from '../pages/ManutencaoEstoque/ReintegracaoEstoque'
import BaixaEstoque from '../pages/ManutencaoEstoque/BaixaEstoque'

import Marcas from "../pages/Marcas";
import NovaMarca from "../pages/Marcas/NovaMarca";
import EditarMarca from "../pages/Marcas/EditarMarca";

import Fornecedores from "../pages/Fornecedores";
import NovoFornecedor from "../pages/Fornecedores/NovoFornecedor";
import EditarFornecedor from "../pages/Fornecedores/EditarFornecedor";

import Clientes from "../pages/Clientes";
import NovoCliente from "../pages/Clientes/NovoCliente";
import EditarCliente from "../pages/Clientes/EditarCliente";

const Private = ({ Item }) => {
    const { signed } = useAuth();

    return signed > 0 ? <Item /> : <Login />;
};

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="*" element={<Private Item={Error} />} />
                    {/* <Route exact path="/home" element={<Private Item={Home} />} /> */}


                    <Route path="/usuarios" element={<Private Item={Usuarios} />} />
                    <Route path="/usuarios/:erro" element={<Private Item={Usuarios} />} />
                    <Route path="/usuarios/novo" element={<Private Item={NovoUsuario} />} />
                    <Route path="/usuarios/editar/:id" element={<Private Item={EditarUsuario} />} />


                    <Route path="/insumos" element={<Private Item={Insumos} />} />
                    <Route path="/insumos/novo" element={<Private Item={NovoInsumo} />} />
                    <Route path="/insumos/editar/:id" element={<Private Item={EditarInsumo} />} />

                    <Route path="/estoque" element={<Private Item={Estoque} />} />
                    <Route path="/estoque/novo" element={<Private Item={NovoEstoque} />} />
                    <Route path="/estoque/detalhes/:id" element={<Private Item={DetalheEstoque} />} />

                    <Route path="/estoque/manutencao" element={<Private Item={ManutencaoEstoque} />} />
                    <Route path="/estoque/manutencao/estorno-lancamento" element={<Private Item={EstornoLancamentoEstoque} />} />
                    {/* <Route path="/estoque/manutencao/baixa" element={<Private Item={BaixaEstoque} />} />
                    <Route path="/estoque/manutencao/reintegracao" element={<Private Item={ReintegracaoEstoque} />} />
                    <Route path="/estoque/manutencao/estorno-baixa" element={<Private Item={EstornoBaixaEstoque} />} /> */}

                    <Route path="/marcas" element={<Private Item={Marcas} />} />
                    <Route path="/marcas/novas" element={<Private Item={NovaMarca} />} />
                    <Route path="/marcas/editar/:id" element={<Private Item={EditarMarca} />} />

                    <Route path="/fornecedores" element={<Private Item={Fornecedores} />} />
                    <Route path="/fornecedores/novos" element={<Private Item={NovoFornecedor} />} />
                    <Route path="/fornecedores/editar/:id" element={<Private Item={EditarFornecedor} />} />

                    <Route path="/clientes" element={<Private Item={Clientes} />} />
                    <Route path="/clientes/novo" element={<Private Item={NovoCliente} />} />
                    <Route path="/clientes/editar/:id" element={<Private Item={EditarCliente} />} />

                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;
