import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router'; // Hook para pegar o ID da URL
import axios from 'axios';

// Definindo o tipo de dado do Aluno
type Aluno = {
  id: number;
  nome: string;
  matricula: string;
  cpf: string;
};

// URL base da API
const API_BASE_URL = 'https://proweb.leoproti.com.br/alunos';

export default function DetalhesAluno() {
  // 1. Pega o parâmetro 'id' da URL
  const { id } = useLocalSearchParams<{ id: string }>(); 

  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Só busca se o ID estiver disponível
    if (id) {
      const fetchAluno = async () => {
        try {
          setLoading(true);
          // 2. Busca dados do aluno específico usando o ID
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
    }
  }, [id]); // Depende do 'id'

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.centered} />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!aluno) {
    return (
      <View style={styles.centered}>
        <Text>Aluno não encontrado.</Text>
      </View>
    );
  }

  // 3. Exibe os detalhes
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{aluno.nome}</Text>
      
      {/* ----- INÍCIO DA CORREÇÃO ----- */}
      <Text style={styles.detail}>
        <Text style={styles.boldText}>Matrícula: </Text>
        {aluno.matricula}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.boldText}>CPF: </Text>
        {aluno.cpf || 'Não informado'}
      </Text>
      {/* ----- FIM DA CORREÇÃO ----- */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },

  // ----- ESTILO ADICIONADO -----
  boldText: {
    fontWeight: 'bold',
  },
  // -----------------------------

  errorText: {
    color: 'red',
    fontSize: 16,
  }
});