import React, { Component } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import api from '../../services/Api';
import { Logo } from "../../components";
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
      const response = await api.get('top-headlines?country=br&apiKey=1cb3adba6281437583fb4ea7c0419c02');
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
            <View style={styles.item}>
              {item.urlToImage && (
                <Image
                  source={{ uri: item.urlToImage }}
                  style={styles.image}
                />
              )}
              <Text style={styles.title}>{item.title}</Text>
              <Text>{item.description}</Text>
              <Text style={styles.author}>{item.author}</Text>
              <Text>{new Date(item.publishedAt).toLocaleString()}</Text>
            </View>
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
    backgroundColor: 'rgba(242,201,37,0.9)',
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
  item: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  author: {
    fontStyle: 'italic',
    marginVertical: 5,
  },
});
