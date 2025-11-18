
// web/src/pages/Home.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

// Diz ao Vitest para "simular" (mockar) a biblioteca axios
vi.mock('axios');

describe('Página Home', () => {

  it('deve renderizar a lista de alunos após a chamada da API', async () => {
    // 1. Dados Falsos (Mock)
    // Preparamos uma lista de alunos falsa que esperamos receber
    const mockAlunos = [
      { id: 1, nome: 'Aluno Falso 1' },
      { id: 2, nome: 'Aluno Falso 2' },
    ];

    // 2. Simular a Resposta
    // Dizemos ao 'axios.get' que, quando ele for chamado,
    // ele deve retornar nossos dados falsos.
    axios.get.mockResolvedValue({ data: mockAlunos });

    // 3. Renderizar o Componente
    // Renderizamos a Home. Precisamos do <BrowserRouter>
    // porque o componente Home usa o <Link> do react-router.
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // 4. Esperar a mágica acontecer
    // O teste espera (waitFor) até que o 'loading' desapareça
    // e os nossos dados falsos apareçam na tela.
    await waitFor(() => {
      // 5. Verificar o Resultado
      // Verificamos se o nome 'Aluno Falso 1' está na tela
      expect(screen.getByText('Aluno Falso 1')).toBeInTheDocument();
      // Verificamos se o nome 'Aluno Falso 2' está na tela
      expect(screen.getByText('Aluno Falso 2')).toBeInTheDocument();
    });

    // 6. Verificação extra (opcional)
    // Garantimos que a mensagem "Carregando..." não está mais na tela.
    expect(screen.queryByText('Carregando...')).not.toBeInTheDocument();
  });
});