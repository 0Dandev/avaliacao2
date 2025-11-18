import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';

// Definindo o tipo de dado do Aluno (bom para TypeScript)
type Aluno = {
  id: number;
  nome: string;
  matricula: string;
  cpf: string;
};

// A MESMA URL da API
const API_URL = 'https://proweb.leoproti.com.br/alunos';

export default function Home() {
  const [alunos, setAlunos] = useState<Aluno[]>([]); // Diz que o estado é um array de Alunos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // O erro é string ou nulo

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setAlunos(response.data);
        setError(null);
      } catch (err) {
        setError("Não foi possível carregar a lista.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlunos();
  }, []);

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

  // Função para renderizar cada item (com tipo)
  const renderItem = ({ item }: { item: Aluno }) => (
    <Link href={`/${item.id.toString()}`} asChild>
      <Pressable style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.nome}</Text>
      </Pressable>
    </Link>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={alunos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

// Estilização (continua igual)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  itemText: {
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  }
});