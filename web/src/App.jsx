import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetalhesAluno from './pages/DetalhesAluno';
import { Container } from 'react-bootstrap'; // Para um layout legal

function App() {
  return (
    <BrowserRouter>
      <Container className="mt-4"> {/* Container do Bootstrap */}
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<Home />} />

          {/* Rota para a página de detalhes, :id é um parâmetro dinâmico */}
          <Route path="/aluno/:id" element={<DetalhesAluno />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;