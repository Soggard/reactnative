import React from 'react';
import { StyleSheet, Text, View, FlatList, AsyncStorage, ActivityIndicator, Animated, ImageBackground, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            lastGame: null,
            fadeAnim: new Animated.Value(0),
            spinValue: new Animated.Value(0)
        }
    }

    _storeData = async (item, value) => {
        try {
            await AsyncStorage.setItem(item, value);
        } catch (error) {
            console.error(error);
        }
    };

    _retrieveData = async (item) => {
        try {
            const value = await AsyncStorage.getItem(item);
            if (value !== null) {
                this.setState({ [item]: value });
            }
        } catch (error) {
            console.error(error);
        }
    };

    navigateToGame = function(id, name) {
        console.log('Navigating to ' + name);
        console.log('Navigating to ' + id);
        this._storeData('lastGame', name);
        this.props.navigation.navigate('Info', {id: id});
    };

    loadingAnimation() {
        Animated.loop(Animated.sequence(
            [
                Animated.timing(
                    this.state.spinValue,
                    {
                        toValue: 1,
                        duration: 2000,
                        easing: Easing.bounce,
                        useNativeDriver: true
                    }
                ),
                Animated.timing(
                    this.state.spinValue,
                    {
                        toValue: 0,
                        duration: 2000,
                        easing: Easing.cubic,
                        useNativeDriver: true
                    }
                ),
            ]
        )).start();
    }

    componentDidMount(){
        Animated.timing(
            this.state.fadeAnim,
            {
                toValue: 1,
                duration: 2000,
            },
           this.state.spinValue,
        ).start();

        this.loadingAnimation();

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
        const spin = this.state.spinValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
        });

        this._retrieveData('lastGame');

        const lastGame = this.state.lastGame;
        const gamepad = require ('./img/gamepad.png');

        // Loading page
        if (this.state.isLoading)  return (
            <View style={[styles.container]}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text style={{fontWeight:'bold'}}>Loading... </Text>
                <Animated.Image
                    style={{transform: [{rotate: spin}] }}
                    source={gamepad} />
            </View>
        );

        // Home page
        return (
            <Animated.View style={[styles.container, {opacity: this.state.fadeAnim}]}>
                <Text style={styles.title}>
                    <Icon name="gamepad" size={30} />
                    Hello Games
                </Text>

                <FlatList
                    style={{alignSelf: 'stretch'}}
                    data={this.state.dataSource}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) =>
                        <Text style={styles.button}
                          onPress={() =>
                            {this.navigateToGame(item.id.toString(), item.name)}
                          }>{item.name}</Text>
                        }
                />

                <Text style={styles.lastGame}
                      onPress={() =>
                    {
                        this.navigateToGame(5, lastGame)
                    } }
                    >Last game seen : {lastGame}</Text>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d1ddff',
        color: '#505463',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        alignSelf: 'stretch',
        textAlign: 'center',
        padding: 20,
        fontSize:30
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 15,
        alignSelf: 'stretch',
        textAlign: 'center',
        margin: 20,
        marginTop: 5,
        marginBottom: 5,
        padding: 20,
    },
    lastGame: {
        fontWeight: 'bold',
        fontSize: 18,
    }
});
