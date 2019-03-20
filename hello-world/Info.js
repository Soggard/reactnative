import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class App extends React.Component {
    state = {
        clicked: false
    };

    render() {

        const text = this.state.clicked ? 'cliqué' : 'Pas cliqué';

        return (
            <View style={styles.container}>
                <Text style={styles.text}>{text}</Text>
                <Text style={styles.button1} onPress={() => {
                    // Mon code réagissant à l'event
                    this.setState({clicked: false})
                }}
                >Pas cliqué</Text>

                <Text style={styles.button2}
                      onPress={() =>
                          this.props.navigation.goBack()
                      }> Cliqué</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button1: {
        backgroundColor: 'red'
    },
    button2: {
        backgroundColor: 'green'
    }
});
