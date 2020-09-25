import React, { useState, useEffect } from 'react';

import { FiPower, FiTrash2 } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [users, setusers] = useState([]);
    const [search, setSearch ] = useState('');
    const [filterusers, setFilterusers] = useState([]);

    const history = useHistory();

    const adminId = localStorage.getItem('adminId');
    const adminName = localStorage.getItem('AdmName');


    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: adminId,
            }
        }).then(response => {
            setusers(response.data);
        })
    }, [adminId]);

    useEffect(() => {
        setFilterusers(
            users.filter( users =>{
                return users.name.toLowerCase().includes( search.toLowerCase() )
             } )
        )
    }, [search, users])

    async function handleDeleteusers(id) {
        try {
            await api.delete(`users/${id}`, {
                headers: {
                    Authorization: adminId,
                }
            });

            setusers(users.filter(users => users.id !== id));
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

                <Link className="button" to="/rent/new">Alugar</Link>

                <Link className="button" to="/rents">Aluguéis</Link>

                <Link className="button" to="/users/new">Cadastrar novo usuário</Link>

                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#0000CD"/>
                </button>
            </header>

            <input type="text" className="search" placeholder="Busca" onChange={ e => setSearch(e.target.value) }/>

            <h1>Usuários cadastrados</h1>

            <ul>
                {filterusers.map(users => (
                    <li key={users.id}>
                    <strong className="name">Nome:</strong>
                    <p className="row">{users.name}</p>

                    <td></td>

                    <strong className="phone">Telefone:</strong>
                    <p className="row">{users.phone}</p>

                    <td></td>

                    <strong className="cellphone">Celular:</strong>
                    <p className="row">{users.cellphone}</p>

                    <td></td>

                    <strong className="address">Endereço:</strong>
                    <p className="row">{users.address}</p>

                    <td></td>

                    <strong className="registerdate">Data de registro:</strong>
                    <p className="row">{users.registerdate}</p>

                    <button className="button-delete" onClick={() => handleDeleteusers(users.id)} type="button">
                        <FiTrash2 size={20} color="#0000CD"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}