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
import Lancamentos from "../pages/Insumos/Lancamentos";
import DetalheLancamentoInsumo from "../pages/Insumos/DetalheLancamentoInsumo";

import ManutencaoInsumo from '../pages/ManutencaoInsumo'
import ManutencaoInsumoEstornoLancamentoInsumo from '../pages/ManutencaoInsumo/EstornoLancamentoInsumo'

import Marcas from "../pages/Marcas";
import NovaMarca from "../pages/Marcas/NovaMarca";
import EditarMarca from "../pages/Marcas/EditarMarca";

import Fornecedores from "../pages/Fornecedores";
import NovoFornecedor from "../pages/Fornecedores/NovoFornecedor";
import EditarFornecedor from "../pages/Fornecedores/EditarFornecedor";
import DetalheFornecedor from "../pages/Fornecedores/DetalheFornecedores";

import Clientes from "../pages/Clientes";
import NovoCliente from "../pages/Clientes/NovoCliente";
import EditarCliente from "../pages/Clientes/EditarCliente";
import DetalheCliente from "../pages/Clientes/DetalheCliente";

import GestaoCompras from "../pages/GestaoCompras";
import NovaCompra from "../pages/GestaoCompras/NovaCompra";
import DetalheNota from "../pages/GestaoCompras/DetalheNota";

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
                    <Route path="/insumos/lancamentos/:id" element={<Private Item={Lancamentos} />} />
                     <Route path="/insumos/lancamentos/detalhes/:id" element={<Private Item={DetalheLancamentoInsumo} />} />


                    <Route path="/insumos/manutencao" element={<Private Item={ManutencaoInsumo} />} />
                    <Route path="/insumos/manutencao/estorno-lancamento" element={<Private Item={ManutencaoInsumoEstornoLancamentoInsumo} />} />
                     
                    <Route path="/marcas" element={<Private Item={Marcas} />} />
                    <Route path="/marcas/novas" element={<Private Item={NovaMarca} />} />
                    <Route path="/marcas/editar/:id" element={<Private Item={EditarMarca} />} />

                    <Route path="/fornecedores" element={<Private Item={Fornecedores} />} />
                    <Route path="/fornecedores/novos" element={<Private Item={NovoFornecedor} />} />
                    <Route path="/fornecedores/editar/:id" element={<Private Item={EditarFornecedor} />} />
                    <Route path="/fornecedores/detalhe/:id" element={<Private Item={DetalheFornecedor} />} />

                    <Route path="/clientes" element={<Private Item={Clientes} />} />
                    <Route path="/clientes/novo" element={<Private Item={NovoCliente} />} />
                    <Route path="/clientes/editar/:id" element={<Private Item={EditarCliente} />} />
                    <Route path="/clientes/detalhe/:id" element={<Private Item={DetalheCliente} />} />

                    <Route path="/gestao-compras" element={<Private Item={GestaoCompras} />}/>
                    <Route path="/gestao-compras/novo" element={<Private Item={NovaCompra} />}/>
                    <Route path="/gestao-compras/detalhe/:id" element={<Private Item={DetalheNota} />} />

                </Routes>
            </Fragment>
        </BrowserRouter>
    );
};

export default RoutesApp;
