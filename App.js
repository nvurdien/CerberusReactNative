import React from 'react';
import {AppRegistry, Button, registerComponent, StyleSheet, Text, TouchableHighlight, View} from 'react-native';
// import {AudioRecorder,AudioUtils} from 'react-native-audio';
// import {
//     Player,
//     Recorder,
//     MediaStates
// } from 'react-native-audio-toolkit';
// import SoundRecorder from 'react-native-sound-recorder';
// import {navigate, StackNavigator} from "react-navigation";

export default class App extends React.Component {


    constructor() {
        super();
        this.state ={
            count: 1,
            longitude: null,
            latitude: null,
            timestamp: null,
            accuracy: null,
            uuid: null,
        }
    }

    onFirstPage = () => {
        this.setState({
            count: 2
        })
    };

    onDanger = () => {
        navigator.geolocation.getCurrentPosition((position) => {
                console.log(position);
                this.setState({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp,
                    count: 4,
                });
            },
            (error) => console.log(new Date(), error),
            {enableHighAccuracy: false, timeout: 10000, maximumAge: 3000}
            );
        fetch('http://127.0.0.1:5000/new_message', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uuid: this.state.uuid,
                longitude: this.state.longitude,
                latitude: this.state.latitude,
                accuracy: this.state.accuracy,
                timestamp: this.state.timestamp,
            }),
        }).then((uuidID) => {
            console.log(JSON.parse(uuidID._bodyText));
            var jsonFile = JSON.parse(uuidID._bodyText);
            console.log(jsonFile.uuid)
            this.setState({
                uuid: jsonFile.uuid,
            });
        }).catch((e) => {
            console.log(`ERROR: ${e}`);
        });
        // let audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';
        // AudioRecorder.prepareRecordingAtPath(audioPath, {
        //     SampleRate: 22050,
        //     Channels: 1,
        //     AudioQuality: "Low",
        //     AudioEncoding: "aac"
        // });

    };

    offDanger = () => {
        this.setState({
            count: 2,
        })

    };

    onSafe = () => {
        this.setState({
            count: 3,
        })
    };

    render() {
        if(this.state.count === 1)
            return (
                <View style={styles.container}>
                    <TouchableHighlight
                        style={styles.firstButton}
                        onPress={this.onFirstPage}
                    >
                        <Text style={styles.firstText}>Active Shooter</Text>
                    </TouchableHighlight>
                </View>
            );
        else if(this.state.count === 2)
            return (
                <View style={styles.container}>
                    <TouchableHighlight
                        style={styles.safeText}
                        onPress={this.onSafe}
                    >
                        <Text style={styles.secondText}>I'm Safe</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.firstButton}
                        onPress={this.onDanger}
                    >
                        <Text style={styles.secondText}>Shooter Nearby</Text>
                    </TouchableHighlight>
                </View>
            );
        else if(this.state.count === 3){
            return (
                <View style={styles.container}>

                    <Text style={styles.secondText}>Message Board</Text>

                    <TouchableHighlight
                        style={styles.firstButton}
                        onPress={this.onDanger}
                    >
                        <Text style={styles.secondText}>Shooter Nearby</Text>
                    </TouchableHighlight>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <Text style={styles.firstText}>TAKE COVER!
                    </Text>
                    <Text style={styles.noDisplay}> {setTimeout(this.offDanger, 5000)}</Text>
                </View>
            );
        }
    }
}

AppRegistry.registerComponent('App', () => App)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    firstButton: {
        backgroundColor: 'red',
        borderRadius: 90,
        padding: 30
    },
    firstText: {
        color: 'white',
        fontSize: 95,
        textAlign: 'center'
    },
    safeText: {
        backgroundColor: 'green',
        marginBottom: 50
    },
    secondButton: {
        backgroundColor: 'red',
        borderRadius: 90,
        paddingTop: 0
    },
    secondText: {
        color: 'white',
        fontSize: 80,
        textAlign: 'center'
    },
    noDisplay: {
        display: 'none'
    }
});
