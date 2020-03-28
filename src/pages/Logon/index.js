import React from 'react';
import { Link, useHistory} from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import axios from 'axios';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg  from '../../assets/logo.svg';
import { useState } from 'react';

export default function Logon() {
    const[id, setId] = useState('');

    const history = useHistory();

    function handleLogin(e) {
        e.preventDefault();

        axios.post('http://localhost:3333/sessions', { id })
            .then(response => {
                
                localStorage.setItem('ongId', id)
                localStorage.setItem('ongName', response.data.nome)

                history.push('/profile');
            })
            .catch(error => alert('Algo deu errado, tente novamente')) //caso ocorra algum erro

    }

    return(
        <div className="logon-container">
            <section className="form" >
                <img src={logoImg} alt="logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}/>
                    <button className="button">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}