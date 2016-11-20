import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: 'AIzaSyAtlAcSAvpLIW-F9z181gVWAoZv3n8dQ_I',
    authDomain: 'react-firebase-9b2d3.firebaseapp.com',
    databaseURL: 'https://react-firebase-9b2d3.firebaseio.com',
    storageBucket: 'react-firebase-9b2d3.appspot.com',
    messagingSenderId: '92322337636'
};
firebase.initializeApp(config);


class App extends React.Component{
    constructor(){
        super();
        this.state = {
            name: 'Ricardo'
        }
    }

    componentWillMount(){
        const nameRef = firebase.database().ref().child('object').child('name');

        nameRef.on('value',(snatshop) => {
            console.log("Entro aqui o no");
            this.setState({
                name: snatshop.val()
            });
        });
    }

    render(){
        return <h1>Hola {this.state.name}!</h1>
    }
}

ReactDOM.render(<App />, document.getElementById('root'))