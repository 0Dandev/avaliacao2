import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Card, Spinner, Alert, Button } from 'react-bootstrap';

// URL base da API
const API_BASE_URL = 'https://proweb.leoproti.com.br/alunos';

function DetalhesAluno() {
  // Pega o parâmetro 'id' da URL
  const { id } = useParams(); 
  
  const [aluno, setAluno] = useState(null); // Guarda o objeto do aluno
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        setLoading(true);
        // Busca dados do aluno específico usando o ID da URL
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        setAluno(response.data);
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar os detalhes do aluno.");
        console.error("Erro ao buscar aluno:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAluno();
  }, [id]); // O useEffect agora depende do 'id'
           // Se o id mudar (ex: navegar de um aluno pra outro), ele busca de novo

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  // Se o aluno não for encontrado (ex: ID não existe)
  if (!aluno) {
    return <Alert variant="warning">Aluno não encontrado.</Alert>;
  }

 
  return (
    <div>
      <h1 className="mb-4">Detalhes do Aluno</h1>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{aluno.nome}</Card.Title>
          <Card.Text>
            <strong>Matrícula:</strong> {aluno.matricula}
          </Card.Text>
          <Card.Text>
            <strong>CPF:</strong> {aluno.cpf}
          </Card.Text>
          {/* Adicione outros campos se desejar */}
          
          <Button as={Link} to="/" variant="primary">
            Voltar para a Lista
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DetalhesAluno;