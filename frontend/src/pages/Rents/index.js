import React, { useState, useEffect } from 'react';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Rents() {
    const [rent, setrent] = useState([]);
    const [search, setSearch ] = useState('');
    const [filterrents, setFilterrents] = useState([]);

    const history = useHistory();

    const adminId = localStorage.getItem('adminId');
    const adminName = localStorage.getItem('AdmName');


    useEffect(() => {
        api.get('rent', {
            headers: {
                Authorization: adminId,
            }
        }).then(response => {
            setrent(response.data);
        })
    }, [adminId]);

    useEffect(() => {
        setFilterrents(
            rent.filter( rent =>{
                return rent.namerent.toLowerCase().includes( search.toLowerCase() )
             } )
        )
    }, [search, rent])

    async function handleDeleterent(id) {
        try {
            await api.delete(`rent/${id}`, {
                headers: {
                    Authorization: adminId,
                }
            });

            setrent(rent.filter(rent => rent.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo(a), {adminName}</span>

                <Link className="button" to="/profile">Menu principal</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#0000CD"/>
                </button>

            </header>

            <input type="text" className="search" placeholder="Busca" onChange={ e => setSearch(e.target.value) }/>

            <h1>Aluguéis cadastrados</h1>

            <ul>
                {filterrents.map(rent => (
                    <li key={rent.id}>
                    <strong className="column">Nome:</strong>
                    <p className="row">{rent.namerent}</p>

                    <td></td>

                    <strong className="column">Data inicial:</strong>
                    <p className="row">{rent.datainit}</p>

                    <td></td>

                    <strong className="column">Data final:</strong>
                    <p className="row">{rent.dataover}</p>

                    <td></td>

                    <strong className="column">Andaime:</strong>
                    <p className="row">{rent.scaffolding}</p>

                    <td></td>

                    <strong className="column">Escora:</strong>
                    <p className="row">{rent.prop}</p>

                    <td></td>

                    <strong className="column">Débito:</strong>
                    <p className="row">R$: {rent.debit}</p>

                    <button className="button-delete" onClick={() => handleDeleterent(rent.id)} type="button">
                        <FiTrash2 size={20} color="#0000CD"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}