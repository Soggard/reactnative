import React, {Component} from 'react';
import {WebView} from 'react-native';

export default class App extends React.Component {

    constructor(props){
        super(props);
    }
    render() {
        return (
            <WebView
                source={{uri: this.props.navigation.state.params.url}}
                style={{marginTop: 20}} 
            />
        );
    }
}