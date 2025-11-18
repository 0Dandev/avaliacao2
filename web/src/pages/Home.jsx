// web/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';


// URL da API de Alunos
const API_URL = 'https://proweb.leoproti.com.br/alunos';

function Home() {
  const [alunos, setAlunos] = useState([]); // Guarda a lista de alunos
  const [loading, setLoading] = useState(true); // Indica se está carregando
  const [error, setError] = useState(null); // Guarda mensagens de erro

  // useEffect para buscar os dados da API quando o componente for montado
  useEffect(() => {
    // Função assíncrona para buscar os dados
    const fetchAlunos = async () => {
      try {
        setLoading(true);
        // Faz a requisição GET para a API 
        const response = await axios.get(API_URL);
        // Atualiza o estado com os dados recebidos
        setAlunos(response.data);
        setError(null); // Limpa qualquer erro anterior
      } catch (err) {
        // Em caso de erro, guarda a mensagem
        setError("Não foi possível carregar a lista de alunos.");
        console.error("Erro ao buscar alunos:", err);
      } finally {
        // Independentemente de sucesso ou erro, para de carregar
        setLoading(false);
      }
    };

    fetchAlunos();
  }, []); // O array vazio [] faz com que o useEffect rode apenas uma vez

  // Se estiver carregando, exibe um Spinner
  if (loading) {
    return <Spinner animation="border" role="status">
      <span className="visually-hidden">Carregando...</span>
    </Spinner>;
  }

  // Se houver um erro, exibe um Alerta
  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  // Se tudo deu certo, exibe a lista de alunos
  return (
    <div>
      <h1 className="mb-4">Lista de Alunos</h1>
      <ListGroup>
        {/* Mapeia o array de alunos e cria um item de lista para cada um */}
        {alunos.map((aluno) => (
          // Cada item é um Link para a rota de detalhes [cite: 24, 25]
          <ListGroup.Item 
            key={aluno.id}
            as={Link} // Renderiza o item como um componente <Link>
            to={`/aluno/${aluno.id}`} // Define o destino do link
            action // Adiciona estilo de hover
          >
            {aluno.nome}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Home;