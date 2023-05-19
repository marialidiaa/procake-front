import React, { useEffect, useState } from 'react'
import useAuth from "../../hooks/useAuth";
import Navbar from '../../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FiFileText } from 'react-icons/fi'
import api from '../../api/api'

import './styles.css'
import '../../styles/Global.css'



const Lancamentos = () => {

    const [lancamento, setLancamento] = useState([])
    const [insumo, setInsumo] = useState("")
    const tokenAcesso = localStorage.getItem('tokenAcesso')

    const { signout } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        api.get(`/insumos/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            }
        }).then((res) => {

            setInsumo(res.data)
        }).catch((err) => {
            if (err.response.data === "") {
                signout();
            } else {
                alert(err.response.data)
            }
        })

        api.get(`/estoque/listar-insumo-id/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            },
            params: {
                size: 10,
                sort: "id,ASC",
                page: 0
            }
        }).then((res) => {
            res.data.forEach(e => {
                let data = new Date(e.dataInsercao);
                let dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                e.dataInsercao = dataFormatada;
                data = new Date(e.dataVencimento);
                dataFormatada = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                e.dataVencimento = dataFormatada;

                e.valor = e.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
            })
            setLancamento(res.data)
        }).catch((err) => {
            if (err.response.data === "") {
                signout();
            } else {
                alert(err.response.data)
            }
        })

        
    }, [tokenAcesso, signout, id])

    async function DetalheLancamentoInsumo(id) {
        navigate(`/insumos/lancamentos/detalhes/${id}`)
    }

    return (
        <>
            <Navbar />
            <section className='top'>
                <h3>LANÇAMENTOS DO INSUMO {insumo.nome}</h3>   
                <Link to="/insumos" className=' btn-cancel-small' >
                            Voltar
                        </Link>    
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
                        {lancamento.map(estoque => (
                            <tr key={estoque.id}>
                                <td>COD: {insumo.codigo} - {insumo.nome}</td>
                                <td>{estoque.marca}</td>
                                <td>
                                    {estoque.quantidade}{insumo.unidadeMedida}
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
                                        onClick={() => DetalheLancamentoInsumo(estoque.id)}
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

export default Lancamentos