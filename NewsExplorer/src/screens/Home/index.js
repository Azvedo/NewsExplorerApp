import { Component } from 'react';
import { View, Text, TextInput , Button ,FlatList, StyleSheet} from 'react-native';
import api from '../../services/Api';
import { Logo, Home_card, Header } from "../../components";
import { StatusBar } from 'expo-status-bar';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [], // onde serão armazenadas as notícias
      query: '', // onde será armazenada a palavra-chave pela qual o usuário deseja buscar
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
    this.props.navigation.navigate('Results', { query: this.state.query }); //passa a palavra-chave para a próxima tela como parâmetro
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
        <Text style={styles.heading}>Principais Notícias</Text>
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
});
