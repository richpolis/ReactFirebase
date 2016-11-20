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


class FileUpload extends React.Component{
    constructor(){
        super();
        this.state = {
            uploadValue: 0,
            message: ''
        }
    }

    handlerOnChange(event){
        const file          = event.target.files[0];
        const storageRef    = firebase.storage().ref(`pictures/${file.name}`);
        const task          = storageRef.put(file);

        task.on('state_changed', (snatshop) => {
            let percentage = (snatshop.bytesTransferred / snatshop.totalBytes) * 100;
            this.setState({
                updateValue: percentage
            });
        },(error) =>{
            this.setState({
                message: `Ha ocurrido un error: ${error.message}`
            });
        }, () => {
            //acabo de subir el archivo
            this.setState({
                message: `Archivo subido!`,
                picture: task.snapshot.downloadURL
            });
        });
    }

    render(){
        return (
            <div>
                <progress value={this.state.uploadValue} max="100"></progress>
                <br/>
                <input type="file" onChange={this.handlerOnChange.bind(this)} />
                <br/>
                {this.state.message}
                <br/>
                <img src={this.state.picture} width="100"/>
            </div>
        )
    }
}

ReactDOM.render(<FileUpload />, document.getElementById('root'))