import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import api from '../../services/Api';
import { Results_card, Logo } from "../../components";

export default function ResultsScreen({ route }) {
  const { query } = route.params; // palavra-chave pela qual o usuário deseja buscar
  const [articles, setArticles] = useState([]); // onde serão armazenadas as notícias
  const [loading, setLoading] = useState(false); // indicador de carregamento

  useEffect(() => { // função que será executada sempre que a tela for renderizada
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await api.get(`everything?q=${query}&apiKey=5524bfd25d4f4b57bdf298296dcc898a`); // busca as notícias de acordo com a palavra-chave
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
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="rgb(242,201,37)" />
        </View>
      ) : (
        <View style = {styles.container}>
          <View style={styles.nav}>
            <Logo height={64} width={120} />
          </View>
          <Text style={styles.heading}>Resultado da sua pesquisa sobre {query}</Text>
          <StatusBar style="light" />
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
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    width: '100%',
  },
  nav: {
    paddingTop: 30,
    paddingBottom: 16,
    width: '100%',
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0, 20, 20)',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
});
