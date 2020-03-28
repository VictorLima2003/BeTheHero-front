import React, { useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import axios from 'axios';


import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            email,
            whatsapp,
            city,
            uf
        };


        axios.post('http://localhost:3333/ongs', data)
            .then(response => {
                alert(`Sucesso! seu ID: ${response.data.id}`)  
                history.push('/')  
            })
            .catch(error => alert('Algo deu errado, tente novamente')) //caso ocorra algum erro

    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu Cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={nome} 
                        onChange={ e => setNome(e.target.value) }
                    />
                    <input 
                        type="email"
                        placeholder="Email da ONG"
                        value={email} 
                        onChange={ e => setEmail(e.target.value) }    
                    />
                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp} 
                        onChange={ e => setWhatsapp(e.target.value) }
                    />
                    
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city} 
                            onChange={ e => setCity(e.target.value) }    
                        />
                        <input 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={uf} 
                            onChange={ e => setUf(e.target.value) }    
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>           
                </form>
            </div>
        </div>
    )
}