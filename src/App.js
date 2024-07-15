import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SetorTable from './Components/Setor/SetorTable';
import SetorForm from './Components/Setor/SetorForm';
import SetorDetail from './Components/Setor/SetorDetail';
import Sidebar from './Components/Sidebar/Sidebar';
import styled from 'styled-components';

// Estilos
const AppContainer = styled.div`
    display: flex;
`;

const Content = styled.div`
    margin-left: 200px; /* Correspondente à largura da Sidebar */
    padding: 20px;
    width: calc(100% - 250px); /* Ajusta a largura para o restante da tela */
    box-sizing: border-box;
`;

const App = () => {
    const [searchParams, setSearchParams] = useState({});

    const handleSearch = (key, value) => {
        setSearchParams((prevParams) => ({
            ...prevParams,
            [key]: value
        }));
    };

    return (
        <Router>
            <AppContainer>
                <Sidebar />
                <Content>
                    <Routes>
                        {/* Redireciona a rota raiz para /setores */}
                        <Route path="/" element={<Navigate to="/setores" />} />
                        {/* Rota para listar setores com a tabela e o formulário de busca */}
                        <Route path="/setores" element={<SetorTable searchParams={searchParams} />} />
                        {/* Rota para criar um novo setor */}
                        <Route path="/setores/novo" element={<SetorForm />} />
                        {/* Rota para editar um setor existente */}
                        <Route path="/setores/:id/editar" element={<SetorForm />} />
                        {/* Rota para detalhes do setor */}
                        <Route path="/setores/:id" element={<SetorDetail />} />
                    </Routes>
                </Content>
            </AppContainer>
        </Router>
    );
};

export default App;
