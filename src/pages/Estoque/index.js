import React, { useEffect, useState } from 'react'
import useAuth from "../../hooks/useAuth";
import Navbar from '../../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { FiPlusCircle, FiFileText } from 'react-icons/fi'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'



const Estoque = () => {

    const [estoque, setEstoque] = useState([])
    const [pesquisa, setPesquisa] = useState()
    const tokenAcesso = localStorage.getItem('tokenAcesso')

    const { signout } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        api.get('estoque', {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            },
            params: {
                size: 10,
                sort: "id,ASC",
                page: 0
            }
        }).then((res) => {
            res.data.content.forEach(e => {
                let data = new Date(e.dataInsercao);
                let dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                e.dataInsercao = dataFormatada;

                data = new Date(e.dataVencimento);
                dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                e.dataVencimento = dataFormatada;

                e.valor = e.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            })
            setEstoque(res.data.content)
        }).catch((err) => {
            console.log(err)
            if (err.response.data === "") {
                signout();
            } else {
                alert(err.response.data)
            }
        })
    }, [tokenAcesso, signout])

    useEffect(() => {
        const timer = setTimeout(() => {

            if (pesquisa !== "" && pesquisa !== undefined) {
                api.get(`estoque/pesquisar/${pesquisa}`, {
                    headers: {
                        Authorization: `Bearer ${tokenAcesso}`
                    }
                }).then((res) => {
                    setEstoque(res.data)
                    setPesquisa("")
                }).catch((err) => {
                    console.log(err)
                })
            }
        }, 500)
        return () => clearTimeout(timer)
    }, [pesquisa, tokenAcesso])


    async function novoEstoque() {
        navigate("/estoque/novo")
    }

    async function detalheEstoque(id) {
        navigate(`/estoque/detalhes/${id}`)
    }

    return (
        <>
            <Navbar />
            <section className='top'>
                <h3>Estoque</h3>
                <input
                    placeholder='Pesquisar por nome de insumo'
                    value={pesquisa}
                    onChange={e => setPesquisa(e.target.value)}
                />

                <div className='btn'
                    onClick={novoEstoque} >
                    <button type='button'>
                        <FiPlusCircle size={25} color='#6098DE' />
                    </button>
                    <p>Adicionar</p>
                </div>
            </section>

            <section className='table-small'>
                <table>
                    <thead>
                        <tr>
                            <th>Insumo</th>
                            <th className='acoes'>Marca</th>
                            <th>Quantidade</th>
                            <th>Data de vencimento</th>
                            <th>Valor pago</th>
                            <th>Nota fiscal</th>
                            <th className='acoes'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estoque.map(estoque => (
                            <tr key={estoque.id}>
                                <td>COD: {estoque.insumo.codigo} - {estoque.insumo.nome}</td>
                                <td>{estoque.marca}</td>
                                <td>
                                    {estoque.quantidade}{estoque.insumo.unidadeMedida}
                                </td>
                                <td>{estoque.dataVencimento}</td>
                                <td>{estoque.valor}</td>
                                <td>{estoque.notaFiscal ? (estoque.notaFiscal) : ("N/A")}</td>
                                <td>
                                    <FiFileText
                                        color='#6098DE'
                                        className='icon'
                                        size={20}
                                        type='button'
                                        title="Detalhes"
                                        onClick={() => detalheEstoque(estoque.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

        </>
    )
}

export default Estoque