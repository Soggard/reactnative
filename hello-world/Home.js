import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage } from 'react-native';


export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            lastGame: null
        }
    }

    _storeData = async (item, value) => {
        console.log('Storing '+ item + ' '+ value);
        try {
            await AsyncStorage.setItem(item, value);
            console.log('Stored '+ item + ' '+ value);
        } catch (error) {
            console.error(error);
        }
    };

    _retrieveData = async (item) => {
        console.log('Retrieving '+ item);
        try {
            const value = await AsyncStorage.getItem(item);
            if (value !== null) {
                console.log('Retrieved '+ item + ' : ' + value);
                this.state.lastGame = value;
                console.log(this.state.lastGame);
            }
        } catch (error) {
            console.error(error);
        }
    };

    navigateToGame = function(id, name) {
        this._storeData('lastGame', name);
        this.props.navigation.navigate('Info', {id: id});
    };

    componentDidMount(){
        console.log("mounting");

        this._retrieveData('lastGame');
        return fetch('https://androidlessonsapi.herokuapp.com/api/game/list')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    render() {
        console.log("rendering");
        this._retrieveData('lastGame');
        const lastGame = this.state.lastGame;
        if (this.state.isLoading)  return (<Text>Loading... </Text>);

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Hello Games</Text>

                <FlatList
                    data={this.state.dataSource}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>
                        <Text style={styles.button}
                          onPress={() =>
                            {this.navigateToGame(item.id, item.name)}
                          }>{item.name}</Text>
                        }
                />

                <Text style={styles.lastGame}>{lastGame}</Text>
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
    },
    text: {
        flex: 1,
    },
    button: {
        flex: 1,
        backgroundColor: 'lightgrey'
    }
});
