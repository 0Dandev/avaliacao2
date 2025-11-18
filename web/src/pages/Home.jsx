import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListGroup, Spinner, Alert, Badge, Button } from 'react-bootstrap'; // <--- Adicionei Button aqui

// Usando o Proxy
const API_URL = '/api/alunos';

function Home() {
  // Inicializa como array vazio para evitar erros no primeiro render
  const [alunos, setAlunos] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        
        // --- ÁREA DE DEBUG E SEGURANÇA ---
        console.log("Dados recebidos da API:", response.data); 

        if (Array.isArray(response.data)) {
            setAlunos(response.data);
            setError(null);
        } else {
            // Se não for array, mostra erro e não quebra a tela
            console.error("A resposta da API não é uma lista:", response.data);
            setError("A API retornou um formato de dados inválido.");
        }
        // ----------------------------------

      } catch (err) {
        setError("Não foi possível carregar a lista de alunos.");
        console.error("Erro ao buscar alunos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Carregando dados...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      {/* Cabeçalho melhorado com Botão de Adicionar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 style={{ fontWeight: '700', color: '#fff', marginBottom: 0 }}>Alunos</h1>
            <small className="text-muted">Gerenciamento de matrículas</small>
        </div>
        
        <div className="d-flex gap-2 align-items-center">
            {/* Proteção: Só acessa .length se alunos for array */}
            <Badge bg="secondary" className="p-2">{Array.isArray(alunos) ? alunos.length : 0} total</Badge>
            
            {/* Botão para a rota /adicionar */}
            <Button as={Link} to="/adicionar" variant="success" size="sm">
                + Novo Aluno
            </Button>
        </div>
      </div>

      <ListGroup className="shadow-sm">
        {/* Proteção: Só faz o map se alunos for um array */}
        {Array.isArray(alunos) && alunos.map((aluno) => (
          <ListGroup.Item 
            key={aluno.id}
            as={Link} 
            to={`/aluno/${aluno.id}`} 
            action 
            className="d-flex justify-content-between align-items-center py-3"
          >
            <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>
              {aluno.nome}
            </span>
            <small className="text-muted">Ver detalhes &rarr;</small>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Home;