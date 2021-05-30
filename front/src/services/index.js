import React from 'react';
import Header from '../components/Header';

export const isAuthenticated = () => {
    if (!localStorage.getItem("perfil")) {
    return false;
  }
  return true;    
};

export const NotFound = () => {
  return (
      <section>
          <Header/>
          <div className="Form404">
            <h1>404 - Página não encontrada</h1>
          </div>
      </section>
  );
}; 