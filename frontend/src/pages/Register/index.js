import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [admname, setAdmName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            admname,
            password,
            email
        };

        try {
            const response = await api.post('admin', data);

            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#0000CD"/>
                        Não tenho cadastro
                    </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome"
                    value={admname}
                    onChange={e => setAdmName(e.target.value)}
                    />
                    <input type="password" placeholder=" Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                    <input placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}