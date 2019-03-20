
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';



export default class App extends React.Component {

    state = {
        clicked: false
    };

    render() {
        const text = this.state.clicked ? 'cliqué' : 'Pas cliqué';
        try {
            //const result = await this.getGames()
        } catch(exeption) {
            //const result = []
        }


        return (
            <View style={styles.container}>
                <Text style={styles.text}>Hello Games</Text>

                <FlatList
                    data={[{key: 'Slinding Puzzle'}, {key: 'TicTacToe'}, {key: 'GameOfLife'}, {key: 'Sudoku'}]}
                    renderItem={({item}) =>
                        <Text style={styles.button}
                          onPress={() =>
                              this.props.navigation.navigate('Info', {name: item.key})
                          }>{item.key}</Text>
                        }
                />

            </View>
        );
    }
}
/*
function getGames() {
    return fetch('https://androidlessonsapi.herokuapp.com/api/game/list')
}
*/
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
