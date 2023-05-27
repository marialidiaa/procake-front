import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useParams } from 'react-router-dom'

import api from '../../api/api'

import './styles.css'


const DetalheFornecedor = () => {

    const [fornecedor, setFornecedor] = useState("")
    
    


    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const { id } = useParams();


    useEffect(() => {

        api.get(`fornecedores/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            }
        }).then(response => {
            setFornecedor(response.data)
        })
    }, [tokenAcesso, id])

    return (
        <>
            <Navbar />
            <section className='detalhes'>
                <div className='titulo-detalhes'>
                    <h1>Detalhes de Fornecedor</h1>
                    <div className='input'>
                        <Link to="/fornecedores" className=' btn-cancel' >
                            Voltar
                        </Link>
                    </div>
                </div>
                <section>
                    <div>
                        <h2>Nome: </h2>
                        <p>{fornecedor.nome}</p>
                    </div>
                    <div>
                        <h2>E-mail: </h2>
                        <p>{fornecedor.email}</p>
                    </div>
                    <div>
                        <h2>CPF/CNPJ: </h2>
                        <p>{fornecedor.cpfCnpj}</p>
                    </div>
                    <div>
                        <h2>Telefone: </h2>
                        <p>{fornecedor.telefone}</p>
                    </div>
                    <div>
                        <h2>Rua: </h2>
                        <p>{fornecedor.rua}</p>
                    </div>
                    <div>
                        <h2>Número: </h2>
                        <p>{fornecedor.numero ? fornecedor.numero : "N/A"}</p>
                    </div>

                    <div>
                        <h2>Bairro: </h2>
                        <p>{fornecedor.bairro}</p>
                    </div>
                    <div>
                        <h2>CEP: </h2>
                        <p>{fornecedor.cep}</p>
                    </div>
                    <div>
                        <h2>Complemento: </h2>
                        <p>{fornecedor.complemento ? fornecedor.complemento  : "N/A" }</p>
                    </div>
                    <div>
                        <h2>Cidade: </h2>
                        <p>{fornecedor.cidade}</p>
                    </div>
                    <div>
                        <h2>Estado: </h2>
                        <p>{fornecedor.estado}</p>
                    </div>
                    
                </section>
            </section>
        </>
    )
}

export default DetalheFornecedor