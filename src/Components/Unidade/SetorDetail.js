import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import styled from 'styled-components';

// Estilos
const Container = styled.div`
    margin: 20px;
    padding: 20px;
    background-color: #e7f0fd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    color: #004080;
    font-size: 24px;
    margin-bottom: 20px;
`;

const DetailGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #004080;
`;

const Value = styled.span`
    display: block;
    padding: 10px;
    border: 1px solid #b3d1ff;
    border-radius: 4px;
    background-color: #f0f8ff;
`;

const BackButton = styled.button`
    background-color: #6c757d;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
        background-color: #5a6268;
    }
`;

const SetorDetail = () => {
    const { id } = useParams();
    const [setor, setSetor] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSetor = async () => {
            try {
                const response = await axiosInstance.get(`/setores/${id}`);
                setSetor(response.data);
            } catch (error) {
                console.error('Error fetching setor details:', error);
            }
        };

        fetchSetor();
    }, [id]);

    const handleBack = () => {
        navigate('/setores');
    };

    if (!setor) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <Title>Detalhes do Setor</Title>
            <DetailGroup>
                <Label>Nome:</Label>
                <Value>{setor.nome}</Value>
            </DetailGroup>
            <DetailGroup>
                <Label>Email:</Label>
                <Value>{setor.sigla}</Value>
            </DetailGroup>
            <BackButton onClick={handleBack}>Voltar</BackButton>
        </Container>
    );
};

export default SetorDetail;
