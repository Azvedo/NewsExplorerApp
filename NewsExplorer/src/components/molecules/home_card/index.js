import {Text, Image,View, StyleSheet  } from 'react-native';


export const Home_card = ({ urlToImage, title, author, date }) => {
    return (
        <View style={styles.item}>
            {urlToImage && (
                <Image
                    source={{ uri: urlToImage }}
                    style={styles.image}
                />
            )}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{author}</Text>
            <Text>{new Date(date).toLocaleString()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        marginBottom: 20,
        padding: 10,
        backgroundColor: 'rgba(242,201,37,0.9)',
        borderRadius: 5,
        width: '93%',
        alignSelf: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    author: {
        fontSize: 14,
        color: 'black',
        marginBottom: 5,
    },
});