import React, { Component } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import api from '../../services/Api';
import { Logo, Home_card } from "../../components";
import { StatusBar } from 'expo-status-bar';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [], // onde serão armazenadas as notícias
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.nav}>
          <Logo height={64} width={120} />
        </View>
        <Text style={styles.heading}>Principais Notícias</Text>
        <StatusBar style="light" />
        <FlatList
          data={this.state.news}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
          <Home_card urlToImage={item.urlToImage} title={item.title} author={item.author} date={item.publishedAt} />
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
});
