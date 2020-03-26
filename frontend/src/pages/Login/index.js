import React from 'react';
import { Link } from 'react-router-dom';

import { FiLogIn } from 'react-icons/fi';
import './style.css';

import herosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import './style.css';

export default function Login() {
  return (
    <div className="login-conteiner">
      <section className="form">
        <img src={ logoImg } alt="Be the Hero" />

        <form action="">
          <h1>
            Faça seu login
          </h1>

          <input type="text" placeholder="Sua ID"/>
          <button className="button" type="submit">Entrar</button>
          <Link to="/register">
            <FiLogIn size={16} color="#E02041"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={ herosImg } alt="Heros" />
    </div>
  );
}