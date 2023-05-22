import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useParams } from 'react-router-dom'

import api from '../../api/api'

import './styles.css'


const DetalheCliente = () => {

    const [cliente, setCliente] = useState("")
    


    const tokenAcesso = localStorage.getItem('tokenAcesso')
    const { id } = useParams();


    useEffect(() => {

        api.get(`clientes/${id}`, {
            headers: {
                Authorization: `Bearer ${tokenAcesso}`
            }
        }).then(response => {
            setCliente(response.data)
        })
    }, [tokenAcesso, id])

    return (
        <>
            <Navbar />
            <section className='detalhes'>
                <div className='titulo-detalhes'>
                    <h1>Detalhes de cliente</h1>
                    <div className='input'>
                        <Link to="/clientes" className=' btn-cancel' >
                            Voltar
                        </Link>
                    </div>
                </div>
                <section>
                    <div>
                        <h2>Nome: </h2>
                        <p>{cliente.nome}</p>
                    </div>
                    <div>
                        <h2>E-mail: </h2>
                        <p>{cliente.email}</p>
                    </div>
                    <div>
                        <h2>CPF/CNPJ: </h2>
                        <p>{cliente.cpfCnpj}</p>
                    </div>
                    <div>
                        <h2>Telefone: </h2>
                        <p>{cliente.telefone}</p>
                    </div>
                    <div>
                        <h2>Rua: </h2>
                        <p>{cliente.rua}</p>
                    </div>
                    <div>
                        <h2>Número: </h2>
                        <p>{cliente.numero ? cliente.numero : "N/A"}</p>
                    </div>

                    <div>
                        <h2>Bairro: </h2>
                        <p>{cliente.bairro}</p>
                    </div>
                    <div>
                        <h2>CEP: </h2>
                        <p>{cliente.cep}</p>
                    </div>
                    <div>
                        <h2>Complemento: </h2>
                        <p>{cliente.complemento ? cliente.complemento  : "N/A" }</p>
                    </div>
                    <div>
                        <h2>Cidade: </h2>
                        <p>{cliente.cidade}</p>
                    </div>
                    <div>
                        <h2>Estado: </h2>
                        <p>{cliente.estado}</p>
                    </div>
                    
                </section>
            </section>
        </>
    )
}

export default DetalheCliente