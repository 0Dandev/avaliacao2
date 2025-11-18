import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Importe useNavigate
import axios from 'axios';
import { Card, Spinner, Alert, Button, Row, Col } from 'react-bootstrap';

// Usando o Proxy
const API_BASE_URL = '/api/alunos';

function DetalhesAluno() {
  const { id } = useParams(); 
  const navigate = useNavigate(); // Hook para redirecionar
  
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAluno = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        setAluno(response.data);
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar os detalhes do aluno.");
      } finally {
        setLoading(false);
      }
    };
    fetchAluno();
  }, [id]);

  // --- FUNÇÃO DE EXCLUIR ---
  const handleDelete = async () => {
    // Confirmação simples do navegador
    if (window.confirm("Tem certeza que deseja excluir este aluno? Essa ação não pode ser desfeita.")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        alert("Aluno excluído com sucesso!");
        navigate('/'); // Volta para a lista
      } catch (err) {
        console.error(err);
        alert("Erro ao excluir aluno. Tente novamente.");
      }
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!aluno) return <Alert variant="warning">Aluno não encontrado.</Alert>;

  return (
    <Row className="justify-content-center mt-5">
      <Col md={8} lg={6}>
        <Card className="shadow">
          <Card.Header as="h5">
            Ficha do Aluno
          </Card.Header>
          <Card.Body className="p-4">
            <Card.Title className="display-6 mb-4">{aluno.nome}</Card.Title>
            
            <div className="mb-3">
              <strong style={{ color: '#a0a0a0' }}>Matrícula:</strong>
              <p className="fs-5">{aluno.matricula}</p>
            </div>
            
            <div className="mb-4">
              <strong style={{ color: '#a0a0a0' }}>CPF:</strong>
              <p className="fs-5">{aluno.cpf || 'Não informado'}</p>
            </div>
            
            <div className="d-grid gap-2">
              {/* Botão de Excluir (Vermelho) */}
              <Button variant="danger" onClick={handleDelete} className="mb-2">
                🗑️ Excluir Aluno
              </Button>

              {/* Botão de Voltar (Roxo) */}
              <Button as={Link} to="/" className="btn-purple">
                &larr; Voltar para a Lista
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default DetalhesAluno;