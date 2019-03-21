import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';



export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount(){


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
/*
    */
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
                              this.props.navigation.navigate('Info', {id: item.id})
                          }>{item.name}</Text>
                        }
                />

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
