import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { FiTrash2 } from 'react-icons/fi'

import api from '../../api/api'
import UTILS from '../../utils/UTILS'

import './styles.css'
import '../../styles/Global.css'

const NovaCompra = () => {

    const [marcaPesquisa, setMarcaPesquisa] = useState("")
    const [insumoPesquisa, setInsumoPesquisa] = useState("")
    const [fornecedorPesquisa, setFornecedorPesquisa] = useState("")

    const [marcaLista, setMarcaLista] = useState([])
    const [insumoLista, setInsumoLista] = useState([])
    const [fornecedorLista, setFornecedorLista] = useState([])
    const [lancamentos, setLancamentos] = useState([])

    const [notaFiscal, setNotaFiscal] = useState('')
    const [dataCompra, setDataCompra] = useState('')
    const [fornecedor, setFornecedor] = useState('')
    const [marca, setMarca] = useState('')
    const [insumo, setInsumo] = useState("")
    const [quantidade, setQuantidade] = useState('')
    const [valorPago, setValorPago] = useState('')
    const [dataVencimento, setDataVencimento] = useState('')
    const [id, setId] = useState(0)


    const [erroNotaFiscal, setErroNotaFiscal] = useState("")
    const [erroDataCompra, setErroDataCompra] = useState("")
    const [erroFornecedor, setErroFornecedor] = useState("")
    const [erroMarca, setErroMarca] = useState("")
    const [erroInsumo, setErroInsumo] = useState("")
    const [erroQuantidade, setErroQuantidade] = useState("")
    const [erroValor, setErroValor] = useState("")
    const [erroVencimento, setErroVencimento] = useState("")

    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const navigate = useNavigate()

    useEffect(() => {
        setErroNotaFiscal("")
        setErroDataCompra("")
        setErroFornecedor("")
        setErroMarca("")
        setErroInsumo("")
        setErroQuantidade("")
        setErroValor("")
        setErroVencimento("")
        
     }, [])

    useEffect(() => {
        
        const timer = setTimeout(() => {

            if (insumoPesquisa !== "" && insumoPesquisa !== undefined) {
                api.get(`insumos/pesquisar/ativo/${insumoPesquisa}`, {
                    headers: {
                        Authorization: `Bearer ${tokenAcesso}`
                    }
                }).then((res) => {
                    if (res.data.length > 0) {
                        res.data.forEach(i => {
                            i.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_TEXTO(i.unidadeMedida)
                        })
                    }
                    setInsumoLista(res.data)
                    setInsumoPesquisa("")
                }).catch((err) => {
                    console.log(err.response.data)
                })
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [insumoPesquisa, tokenAcesso])

    useEffect(() => {
        
        const timer = setTimeout(() => {

            if (marcaPesquisa !== "" && marcaPesquisa !== undefined) {
                api.get(`marcas/pesquisar/ativo/${marcaPesquisa}`, {
                    headers: {
                        Authorization: `Bearer ${tokenAcesso}`
                    }
                }).then((res) => {
                   setMarcaLista(res.data)
                    setMarcaPesquisa("")
                }).catch((err) => {
                    console.log(err.response.data)
                })
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [marcaPesquisa, tokenAcesso])

    useEffect(() => {
        
        const timer = setTimeout(() => {

            if (fornecedorPesquisa !== "" && fornecedorPesquisa !== undefined) {
                api.get(`fornecedores/pesquisar/ativo/${fornecedorPesquisa}`, {
                    headers: {
                        Authorization: `Bearer ${tokenAcesso}`
                    }
                }).then((res) => {
                   setFornecedorLista(res.data)
                    setFornecedorPesquisa("")
                }).catch((err) => {
                    console.log(err.response.data)
                })
            }
        }, 500)

        return () => clearTimeout(timer)
    }, [fornecedorPesquisa, tokenAcesso])


    async function addLancamento(e){

        e.preventDefault()
        let controle = validacoes();
        if(controle !== 0){
            return;
        }

        let data = {
            id,
            insumo,
            marca,
            dataVencimento,
            quantidade,
            valorPago
        }
        setId( id + 1)

        data.insumo = insumoLista.find(x => x.id === insumo)
        data.marca = marcaLista.find(x => x.id === marca)
        lancamentos.push(data)
        setLancamentos(lancamentos)
        setMarca([])
        setInsumo([])
        setQuantidade("")
        setValorPago("")
        setDataVencimento("")

    }

    const handleChange = (event, func) => {
        const result = event.target.value.replace(/[^0-9.]/g, '');
        func(result)
    }

    async function deleteLancamento(id){
        setLancamentos(lancamentos.filter(l => l.id !== id))
    }

    async function salvar(e) {
        e.preventDefault()

        if(lancamentos.length <= 0){
            return;
        }

        if(notaFiscal.trim().length <= 0 || notaFiscal.trim === "" || notaFiscal == null){
            setErroNotaFiscal("*Não pode ser vazio*")
            return;
        }else{
            setErroNotaFiscal("")
        }

        if(dataCompra.trim().length <= 0 || dataCompra.trim === "" || dataCompra == null){
            setErroDataCompra("*Não pode ser vazio*")
            return;
        }else{
            setErroDataCompra("")
        }

        if(fornecedor.length <= 0|| fornecedor == null){
            setErroFornecedor("*Não pode ser vazio*")
            return;
        }else{
            setErroFornecedor("")
        }

        let fornecedorData = fornecedorLista.find(f => f.id === fornecedor)
        setLancamentos(lancamentos.map(e =>{
            e.id = null;
            e.insumo.unidadeMedida = UTILS.CONVERT_UNIDADE_MEDIDA_VALOR(e.insumo.unidadeMedida)
            return e;
        }))



        const data = {
               notaFiscal,
               dataCompra,
               "fornecedor" : fornecedorData,
               lancamentos
        }

        try {
            await api.post('nota-fiscal', data, {
                headers: {
                    Authorization: `Bearer ${tokenAcesso}`
                }
            })
            navigate("/gestao-compras")
        } catch (error) {
            alert(error)
        }
    }

    const validacoes =() =>{
        let controle = 0
        if(dataCompra.trim().length <= 0 || dataCompra.trim === "" || dataCompra == null){
            setErroDataCompra("*Não pode ser vazio*")
            controle = 1;
        }else{
            setErroDataCompra("")
        }
        if(dataVencimento.trim().length <= 0 || dataVencimento.trim === "" || dataVencimento == null){
            setErroVencimento("*Não pode ser vazio*")
            controle = 1;
        }else{
            setErroVencimento("")
        }
        if(fornecedor.length <= 0|| fornecedor == null){
            setErroFornecedor("*Não pode ser vazio*")
            controle = 1;
        }else{
            setErroFornecedor("")
        }
        if(insumo.length <= 0 || insumo == null){
            setErroInsumo("*Não pode ser vazio*")
            controle = 1;            
        }else{
            setErroInsumo("")
        }        
        if(marca.length <= 0 || marca == null){
            setErroMarca("*Não pode ser vazio*")
            controle = 1;
        }else{
            setErroMarca("")
        }
        if(notaFiscal.trim().length <= 0 || notaFiscal.trim === "" || notaFiscal == null){
            setErroNotaFiscal("*Não pode ser vazio*")
            controle = 1;
        }else{
            setErroNotaFiscal("")
        }
        if(quantidade.trim().length <= 0 || quantidade.trim === "" || quantidade == null){
            setErroQuantidade("*Não pode ser vazio*")
            controle = 1;
        }else{
            setErroQuantidade("")
        }
        if(valorPago.trim().length <= 0 || valorPago.trim === "" || valorPago == null){
            setErroValor("*Não pode ser vazio*")
            controle = 1;
        }else{
            setErroValor("")
        }

        return controle
    }

    return (
        <>
            <Navbar />
            <section className='top-filter'>

                <h3>Inserir Nova Compra</h3>
                <h4>Filtros de pesquisa</h4>

                <div className='container-pesquisa'>

                <div className='input'>
                        <label>Fornecedor</label>
                        <input
                            placeholder='Pesquisar por fornecedor'
                            value={fornecedorPesquisa}
                            onChange={e => setFornecedorPesquisa(e.target.value)}
                            type='text'
                        />
                         
                    </div>


                    <div className='input'>
                        <label>Marca</label>
                        <input
                            placeholder='Pesquisar por marca'
                            value={marcaPesquisa}
                            onChange={e => setMarcaPesquisa(e.target.value)}
                            type='text'
                        />
                        
                    </div>

                    <div className='input'>
                        <label>Insumo</label>
                        <input
                            placeholder='Pesquisar por nome de insumo'
                            value={insumoPesquisa}
                            onChange={e => setInsumoPesquisa(e.target.value)}
                            type='text'
                        />
                    </div>
                   
                    <div className='input'>
                        <button className='btn-save' onClick={e => salvar(e)}>
                            Salvar
                        </button>
                        <Link to="/gestao-compras" className='btn-cancel' >
                            Voltar
                        </Link>
                    </div>
                </div>
                <h4>Dados lançamento</h4>
            </section>

            <section className='form'>

                <form>
                    <div className='input'>
                        <label>Nota Fiscal</label>
                        <input
                            type='text'
                            placeholder='Nota Fiscal'
                            value={notaFiscal}
                            onChange={e => setNotaFiscal(e.target.value)}
                        />
                        <p className='textErro'>{erroNotaFiscal}</p>
                    </div>

                    <div className='input'>
                        <label>Data da Compra</label>
                        <input
                            type='date'
                            placeholder='Data da Compra'
                            value={dataCompra}
                            onChange={e => setDataCompra(e.target.value)}
                        />
                        <p className='textErro'>{erroDataCompra}</p>
                    </div>

                    <div className='input'>
                        <label>Fornecedor</label>
                        <select
                            onChange={(e) => setFornecedor(e.target.value)}
                            value={fornecedor}
                        >
                            <option>Selecionar</option>
                            {fornecedorLista.map(fornecedor => (
                                <option key={fornecedor.id} value={fornecedor.id} >{fornecedor.nome} </option>
                            ))}
                        </select>
                        <p className='textErro'>{erroFornecedor}</p>
                    </div>

                    <div className='input'>
                        <label>Marca</label>
                        <select
                            onChange={(e) => setMarca(e.target.value)}
                            value={marca}
                        >
                            <option>Selecionar</option>
                            {marcaLista.map(marca => (
                                <option key={marca.id} value={marca.id} >{marca.nome}</option>
                            ))}
                        </select>
                        <p className='textErro'>{erroMarca}</p>
                    </div>

                    <div className='input'>
                        <label>Insumo</label>
                        <select
                            onChange={(e) => setInsumo(e.target.value)}
                            value={insumo}
                        >
                            <option>Selecionar</option>
                            {insumoLista.map(ins => (
                                <option key={ins.id} value={ins.id} >COD: {ins.codigo} - {ins.nome} - {ins.unidadeMedida} </option>
                            ))}
                        </select>
                        <p className='textErro'>{erroInsumo}</p>
                    </div>

                    <div className='input'>
                        <label>Quantidade</label>
                        <input
                            type='text'
                            placeholder='Quantidade'
                            value={quantidade}
                            onChange={(e) => handleChange(e, setQuantidade)}
                        />
                        <p className='textErro'>{erroQuantidade}</p>
                    </div>

                    <div className='input'>
                        <label>Valor pago</label>
                        <input
                            type='text'
                            placeholder='Valor pago'
                            value={valorPago}
                            onChange={(e) => handleChange(e, setValorPago)}
                        />
                        <p className='textErro'>{erroValor}</p>
                    </div>

                    <div className='input'>
                        <label>Data de validade</label>
                        <input
                            type='date'
                            placeholder='Data de validade'
                            value={dataVencimento}
                            onChange={(e) => setDataVencimento(e.target.value)}
                        />
                        <p className='textErro'>{erroVencimento}</p>
                    </div>

                    <div className='input'>
                        <button onClick={e => addLancamento(e)} className='btn-add'>
                            Adicionar
                        </button>
                    </div>
                </form>
            </section >

            <section className='table'>
                <table>
                    <thead>
                        <tr>
                            <th>Insumo</th>
                            <th>Marca</th>
                            <th>Quantidade</th>
                            <th>Valor Pago</th>
                            <th>Data de Validade</th>
                            <th className='acoes'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                    {lancamentos.map(lancamento => (
                            <tr key={lancamento.id}>
                                <td>{lancamento.insumo.nome}</td>
                                <td>{lancamento.marca.nome}</td>
                                <td>{lancamento.quantidade}</td>
                                <td>{lancamento.valorPago}</td>
                                <td>{lancamento.dataVencimento}</td>
                                <td onClick={e => deleteLancamento(lancamento.id)}><FiTrash2
                                color='#E52548'
                                className='icon'
                                size={20}
                                type='button'
                                title="Editar"/></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default NovaCompra