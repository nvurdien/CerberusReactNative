import React from 'react';
import {
    AppRegistry, Button, FlatList, ListView, registerComponent, ScrollView, StyleSheet, Text, TouchableHighlight,
    View
} from 'react-native';
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
            messages: [],
            last_time: new Date(),
            current_time: Date.now(),
        }
    }

    onFirstPage = () => {
        this.setState({
            count: 2,
        })
        fetch('http://127.0.0.1:5000/new_message', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uuid: this.state.uuid
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

    };

    onSafe = () => {
        this.setState({
            count: 3,
        });
        fetch('http://127.0.0.1:5000/new_message', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                uuid: this.state.uuid
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
    };

    componentDidMount(){
        this.timer = setInterval(()=> this.updateInfo(), 500)
    }

    async updateInfo() {
        fetch('http://127.0.0.1:5000/message', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                }),
            }).then((uuidID) => {
                // console.log(JSON.parse(uuidID._bodyText));
                var jsonFile = JSON.parse(uuidID._bodyText);
                // console.log(jsonFile.messages)
                this.setState({
                    messages: jsonFile,
                    last_time: Date.now(),
                });
            console.log(this.state.messages)
            }).catch((e) => {
                console.log(`ERROR: ${e}`);
            });

    };

    offDanger = () => {
        this.setState({
            count: 2,
        })

    };

    render() {
        if(this.state.count === 1)
            return (
                <View style={styles.containerOne}>
                    <Text style={styles.firstText}>CERBERUS Emergency Response</Text>
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
                <View style={styles.containerTwo}>
                    <Text style={{
                        color: "white",
                        textAlign: "center",
                        fontSize: 50,
                        marginTop: 0,
                        top: 0,
                        padding: 10,
                        marginBottom:30
                    }}>Is the intruder near you?</Text>
                    <TouchableHighlight
                        style={styles.safeText}
                        onPress={this.onSafe}
                    ><Text style={styles.secondText}>No, I'm not in imminent danger</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.secondButton}
                        onPress={this.onDanger}
                    ><Text style={styles.secondText}>Yes, the shooter is nearby</Text>
                    </TouchableHighlight>
                </View>
            );
        else if(this.state.count === 3){
            return (
                <View style={styles.containerTwo}>
                    <Text style={{fontSize: 30, color: 'white'}}>How to protect yourself</Text>
                    <ScrollView>
                        {
                            Object.keys(this.state.messages).map((item, index) => (<View style={{
                                backgroundColor: 'red', borderRadius: 90
                            }}>

                                <Text key={index} style={{
                                    color: 'white',
                                    fontSize: 20,
                                    padding: 10
                                }}>{this.state.messages[item]}
                                </Text></View>))

                        }

                    </ScrollView>
                    <TouchableHighlight
                        style={styles.secondButton}
                        onPress={this.onDanger}
                    >
                        <Text style={styles.secondText}>The intruder is nearby</Text>
                    </TouchableHighlight>
                    <Text style={styles.noDisplay}>
                        {console.log("updated")}
                    </Text>
                </View>
            );
        }
        else if(this.state.count === 4){
            return (
                <View style={styles.containerOne}>
                    <Text style={styles.firstText}>Throw a chair at the intruder
                    </Text>
                    <Text style={styles.noDisplay}> {setTimeout(this.offDanger, 5000)}</Text>
                </View>
            );
        }
    }
}

AppRegistry.registerComponent('App', () => App)

const styles = StyleSheet.create({
    containerOne: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 100
    },
    containerTwo: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 30
    },
    firstButton: {
        backgroundColor: 'red',
        borderRadius: 90,
        padding: 30,
        margin: 30,
        marginTop: 70,
        borderWidth: 5,
        borderColor: "white"
    },
    firstText: {
        color: 'white',
        fontSize: 45,
        textAlign: 'center',
    },
    safeText: {
        backgroundColor: 'green',
        marginTop: 50,
        marginBottom: 20,
        borderRadius: 90,
        margin: 30,
        borderWidth: 5,
        borderColor: "white",
        padding: 10
    },
    secondButton: {
        backgroundColor: 'red',
        borderRadius: 90,
        margin: 30,
        padding: 20,
        borderWidth: 5,
        borderColor: "white"
    },
    secondText: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        borderRadius: 90
    },
    noDisplay: {
        display: 'none'
    }
});
