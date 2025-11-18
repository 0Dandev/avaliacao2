import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      {/* Define a tela inicial (index) com um título */}
      <Stack.Screen 
        name="index" 
        options={{ title: 'Lista de Alunos' }} 
      />
      {/* Define a tela de detalhes (que vamos criar) */}
      <Stack.Screen 
        name="[id]" // O nome [id] é para a rota dinâmica
        options={{ title: 'Detalhes do Aluno' }} 
      />
    </Stack>
  );
}