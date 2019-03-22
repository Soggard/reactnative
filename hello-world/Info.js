import React from 'react';
import { StyleSheet, Text, View, Linking, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true};

    }

    componentDidMount(){
        return fetch('https://androidlessonsapi.herokuapp.com/api/game/details?game_id=' + this.props.navigation.state.params.id)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    game: responseJson,
                }, function(){});

            })
            .catch((error) =>{
                console.error(error);
            });
    };

    render() {

        if (this.state.isLoading)  return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text>Loading... </Text>
            </View>
        );

        return (
            <View style={styles.container}>

                <Text><Icon name="trophy" size={20} color={'blue'} /></Text>

                <View style={styles.whitebox}>
                    <Text style={styles.title}>{this.state.game.name}</Text>
                </View>

                <View style={styles.infos}>
                    <Text style={styles.info}>Players : {this.state.game.players}</Text>
                    <Text style={styles.info}>Type : {this.state.game.type}</Text>
                    <Text style={styles.info}>Year : {this.state.game.year}</Text>
                </View>

                <View style={styles.whitebox}>
                    <Text style={styles.text}>{this.state.game.description_en}</Text>
                </View>

                <View style={styles.whitebox}>
                    <Text style={styles.title}
                          onPress={() => {
                              {this.props.navigation.navigate('MoreDetails', {url: this.state.game.url})}}}
                    >More details...  <Icon name="question-circle" size={20} /></Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d1ddff',
        color: '#505463',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        textAlign: 'center',
    },
    text: {
        textAlign: 'justify',
        fontSize: 14,
        fontWeight: 'bold'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    },
    whitebox: {
        backgroundColor: 'white',
        borderRadius: 15,
        alignSelf: 'stretch',
        textAlign: 'center',
        margin: 20,
        padding: 20,
    },
    infos: {
        margin: 20,
        alignSelf: 'stretch',
    },
    info: {
        alignSelf: 'stretch',
        fontSize: 14,
        fontWeight: 'bold'
    }
});
