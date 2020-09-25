import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Newusers () {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [cellphone, setCellphone] = useState('');
    const [address, setAdress] = useState('');
    const [registerdate, setRegisterDate] = useState('');

    const history = useHistory();

    const adminId = localStorage.getItem('adminId')

    async function handleNewusers(e) {
        e.preventDefault();

        const data = {
            name,
            phone,
            cellphone,
            address,
            registerdate
        };

        try {
            await api.post('users', data, {
                headers: {
                    Authorization: adminId,
                }
            })

            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }

    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo usuário</h1>
                    <p>Informações sobre o usuário.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para página principal
                    </Link>

                </section>
                <form onSubmit={handleNewusers}>
                    <input 
                        placeholder="Nome"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input 
                        placeholder="Telefone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />

                    <input 
                        placeholder="Celular"
                        value={cellphone}
                        onChange={e => setCellphone(e.target.value)}
                    />

                    <input 
                        placeholder="Endereço"
                        value={address}
                        onChange={e => setAdress(e.target.value)}
                    />

                    <input 
                        placeholder="Data de registro"
                        value={registerdate}
                        onChange={e => setRegisterDate(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}