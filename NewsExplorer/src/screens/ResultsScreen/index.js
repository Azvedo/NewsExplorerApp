import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import api from '../../services/Api';
import { Results_card } from "../../components";

export default function ResultsScreen({ route }) {
  const { query } = route.params; // palavra-chave pela qual o usuário deseja buscar
  const [articles, setArticles] = useState([]); // onde serão armazenadas as notícias
  const [loading, setLoading] = useState(false); // indicador de carregamento

  useEffect(() => { // função que será executada sempre que a tela for renderizada
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await api.get(`everything?q=${query}&apiKey=1cb3adba6281437583fb4ea7c0419c02`); // busca as notícias de acordo com a palavra-chave
        setArticles(response.data.articles); // armazena as notícias
      } catch (error) {
        console.error('Erro ao buscar as notícias:', error);
      }
      setLoading(false);
    };

    fetchArticles(); 
  }, [query]); // executa a função sempre que a palavra-chave for alterada

  return (
    <View style={styles.container}>
      {loading ? ( // exibe a mensagem de carregamento enquanto as notícias estão sendo buscadas
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={articles}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <Results_card 
              urlToImage={item.urlToImage} 
              title={item.title} 
              description={item.description} 
              author={item.author} 
              date={item.publishedAt} 
              link={item.url}
              />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});
