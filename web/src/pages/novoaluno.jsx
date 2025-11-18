import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';

const API_URL = '/api/alunos'; // Usando o Proxy

function NovoAluno() {
  const [nome, setNome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook para redirecionar após salvar

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita recarregar a página
    
    try {
      // Envia os dados para a API
      await axios.post(API_URL, {
        nome: nome,
        matricula: matricula,
        cpf: cpf
      });
      
      // Se der certo, volta para a Home
      navigate('/');
    } catch (err) {
      console.error(err);
      setError("Erro ao cadastrar aluno. Verifique os dados.");
    }
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="shadow p-4" style={{ width: '100%', maxWidth: '500px', backgroundColor: '#2e2f31', color: '#fff' }}>
        <h2 className="mb-4 text-center">Novo Aluno</h2>
        
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Ex: João Silva"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={{ backgroundColor: '#3d3e40', color: '#fff', border: '1px solid #555' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Matrícula</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Ex: 2023001"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
              style={{ backgroundColor: '#3d3e40', color: '#fff', border: '1px solid #555' }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>CPF</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
              style={{ backgroundColor: '#3d3e40', color: '#fff', border: '1px solid #555' }}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="success" type="submit" size="lg">
              Salvar Aluno
            </Button>
            <Button as={Link} to="/" variant="secondary">
              Cancelar
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
}

export default NovoAluno;