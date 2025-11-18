import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import DetalhesAluno from './pages/DetalhesAluno';
import NovoAluno from './pages/novoaluno'; // <--- IMPORTANTE: Importar a página nova
import { Container, Navbar, Nav } from 'react-bootstrap';

function App() {
  return (
    <BrowserRouter>
      {/* --- Navbar Global (Cabeçalho) --- */}
      <Navbar expand="lg" className="mb-4" style={{ backgroundColor: '#1c1d1f', borderBottom: '1px solid #3e4143' }}>
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ color: '#fff', fontWeight: 'bold' }}>
            🎓 Portal do Aluno
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" style={{ color: '#ccc' }}>Início</Nav.Link>
              <Nav.Link href="#" style={{ color: '#ccc' }}>Sobre</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* --- Conteúdo das Páginas --- */}
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aluno/:id" element={<DetalhesAluno />} />
          {/* Nova rota para o cadastro */}
          <Route path="/adicionar" element={<NovoAluno />} /> 
        </Routes>
      </Container>
      
      {/* --- Rodapé Simples --- */}
      <footer className="text-center mt-5 py-4" style={{ color: '#6a6f73', fontSize: '0.9rem' }}>
        <p>&copy; 2025 Avaliação 2 - Desenvolvimento Web e Mobile</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;