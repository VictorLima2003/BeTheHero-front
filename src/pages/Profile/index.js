import React, {useEffect, useState} from 'react';
import {FiPower, FiTrash2} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';


import logoImg from '../../assets/logo.svg'
import './styles.css';


export default function Profile() {
    const [ incidents, setIncidents ] = useState([]); 
    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        axios.get('http://localhost:3333/profile', { headers: {
            Authorization: ongId
        }}).then(response => {
            setIncidents(response.data)
        })
    }, [ongId])

   function handleDeleteIncidents(id) {
        axios.delete(`http://localhost:3333/incidents/${id}`, { headers: {
            Authorization: ongId
        }}).then(
            setIncidents(incidents.filter(incident => incident.id !== id))
        )
    }

    function handleLogout () {
        localStorage.clear();

        history.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/Incidens/new" >Cadastrar novo caso</Link>
                
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>     
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
               {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição</strong>
                        <p>{incident.description}</p>

                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency:'BRL' }).format(incident.value)}</p>

                        <button onClick={() => {handleDeleteIncidents(incident.id)}} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
               ))}
            </ul>
        </div>
    )
}