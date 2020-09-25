import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Newusers () {
    const [datainit, setDatainit] = useState('');
    const [namerent, setNamerent] = useState('');
    const [dataover, setDataover] = useState('');
    const [scaffolding, setScaffolding] = useState('');
    const [prop, setProp] = useState('');
    const [debit, setDebit] = useState('');

    const history = useHistory();

    const adminId = localStorage.getItem('adminId')

    async function handleRent(i) {
        i.preventDefault();

        const data = {
            datainit,
            namerent,
            dataover,
            scaffolding,
            prop,
            debit
        };

        try {
            await api.post('rent', data, {
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

                    <h1>Cadastrar aluguéis</h1>
                    <p>Informações sobre o aluguel.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para página principal
                    </Link>

                </section>
                <form onSubmit={handleRent}>
                    <input 
                        placeholder="Nome"
                        value={namerent}
                        onChange={i => setNamerent(i.target.value)}
                    />

                    <input 
                        placeholder="Data inicial"
                        value={datainit}
                        onChange={i => setDatainit(i.target.value)}
                    />

                    <input 
                        placeholder="Data final"
                        value={dataover}
                        onChange={i => setDataover(i.target.value)}
                    />

                    <input 
                        placeholder="Andaime"
                        value={scaffolding}
                        onChange={i => setScaffolding(i.target.value)}
                    />

                    <input 
                        placeholder="Escora"
                        value={prop}
                        onChange={i => setProp(i.target.value)}
                    />

                    <input 
                        placeholder="Débito"
                        value={debit}
                        onChange={i => setDebit(i.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}