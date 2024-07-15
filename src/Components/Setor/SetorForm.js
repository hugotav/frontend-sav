import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import styled from 'styled-components';

// Estilos do formulário
const Container = styled.div`
    margin: 20px;
    padding: 20px;
    background-color: #e7f0fd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
    margin-bottom: 20px;
`;

const Title = styled.h2`
    color: #004080;
    font-size: 24px;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #004080;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #b3d1ff;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #f0f8ff;
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #b3d1ff;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #f0f8ff;
`;

const Button = styled.button`
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    color: #fff;
    background-color: ${props => props.primary ? '#004080' : '#6c757d'};
    margin-right: 10px;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${props => props.primary ? '#0056b3' : '#5a6268'};
    }
`;

const SetorForm = ({ onSearch }) => {
    const [setor, setSetor] = useState({
        id: '',
        nome: '',
        sigla: ''
    });
    // const [perfis, setPerfis] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        // const fetchPerfis = async () => {
        //     try {
        //         const response = await axiosInstance.get('/perfis');
        //         setPerfis(response.data);
        //     } catch (error) {
        //         console.error('Erro ao buscar perfis:', error);
        //     }
        // };

        const fetchSetor = async () => {
            if (id) {
                try {
                    const response = await axiosInstance.get(`/setores/${id}`);
                    const setorData = response.data;
                    setSetor({
                        id: setorData.id,
                        nome: setorData.nome,
                        sigla: setorData.sigla
                    });
                } catch (error) {
                    console.error('Erro ao buscar setor:', error);
                }
            }
        };

        // fetchPerfis();
        fetchSetor();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setSetor((prevSetor) => ({
            ...prevSetor,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Prepare the payload to match the backend expectation
        const payload = {
            ...setor
            // perfil: { id: aluno.perfilId }
        };

        try {
            if (setor.id) {
                await axiosInstance.put(`/setores/${setor.id}`, payload);
            } else {
                await axiosInstance.post('/setores', payload);
            }
            navigate('/setores'); // Redireciona para a tabela de setores após salvar
            if (onSearch) onSearch();
        } catch (error) {
            console.error('Erro ao salvar setor:', error);
        }
    };

    return (
        <Container>
            <Header>
                <Title>{setor.id ? 'Editar Setor' : 'Novo Setor'}</Title>
            </Header>
            <form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="nome">Nome:</Label>
                    <Input
                        type="text"
                        id="nome"
                        name="nome"
                        value={setor.nome}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="sigla">Sigla:</Label>
                    <Input
                        type="sigla"
                        id="sigla"
                        name="sigla"
                        value={setor.sigla}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                
                <div>
                    <Button type="submit" primary>Salvar</Button>
                    <Button
                        type="button"
                        onClick={() => navigate('/setores')}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </Container>
    );
};

export default SetorForm;