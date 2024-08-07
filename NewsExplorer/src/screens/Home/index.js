import { Component } from 'react';
import { View, Text, TextInput , Button ,FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import api from '../../services/Api';
import { Logo, Home_card, Header } from "../../components";
import { StatusBar } from 'expo-status-bar';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [], // onde serão armazenadas as notícias
      query: '', // onde será armazenada a palavra-chave pela qual o usuário deseja buscar
      searchHistory: [], // onde serão armazenadas as palavras-chave pesquisadas
    };
  }

  async componentDidMount() {
    try {
      const response = await api.get('top-headlines?sources=bbc-news&apiKey=1cb3adba6281437583fb4ea7c0419c02');
      this.setState({
        news: response.data.articles,
      });
    } catch (error) {
      console.error('Erro ao buscar as notícias:', error);
    }
  }

  goToResults = () => {
    const { query, searchHistory } = this.state;

    // Navega para a tela de resultados
    this.props.navigation.navigate('Results', { query }); //passa a palavra-chave para a próxima tela como parâmetro

    // Adiciona a busca ao histórico, removendo duplicatas
    const updatedHistory = searchHistory.filter(item => item !== query); 
    this.setState({ searchHistory: [query, ...updatedHistory], query: '' });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Logo height={64} width={120} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.key_word}
            placeholder="Digite a palavra-chave"
            value={this.state.query} // valor do input
            onChangeText={(text) => this.setState({ query: text })} // atualiza o valor do input
          />
          {/* // Botão para buscar as notícias */}
          <Button title="Buscar" onPress={this.goToResults}/>   
        </View>
        <View>
          <Text style={styles.heading}>Principais Notícias</Text>
        </View>
        <StatusBar style="light" />
        <FlatList
          data={this.state.news}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
          <Home_card 
            urlToImage={item.urlToImage} 
            title={item.title} 
            author={item.author} 
            date={item.publishedAt} 
          />
          )}
        />
        <View>
          <Text style={styles.historyHeading}>Histórico de buscas recentes:</Text>
        </View>
        <FlatList
          data={this.state.searchHistory}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Results', { query: item })}>
              <Text style={styles.historyItem}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
  },

  key_word: {
    width: '80%',
    height: 45,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    margin: 20,
    padding: 10,
  },

  inputContainer: {
    width: '93%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

  },

  historyHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },

  searchHistory:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  historyItem: {
    fontSize: 16,
    marginVertical: 3,
    color: 'blue',
  },
  
});
