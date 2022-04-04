import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import { DEVICE_HEIGHT, DEVICE_WIDTH, PADDING_CONTENT, TEXTSIZE } from "../constant/Constant";

import global from "../global";
import saveToken from "../api/saveToken";

class Profile extends Component {
    constructor( props ) {
        super(props);
    }

    logout() {
        global.onSignIn = null;
        saveToken('');
        this.props.navigation.navigate("Login");
    }

    gotoLink(item) {
        this.props.navigation.navigate(item.toGo);
    }

    factory(item) {
        item.id == 1 ? this.logout() : this.gotoLink(item)
    }

    render() {
        const nav = this.props.navigation;

        const items = [
            {
                id: 0,
                key: 'Personal information',
                toGo: "ProfileDetails"
            },
            {
                id: 2,
                key: 'Change Password',
                toGo: 'ChangePassword'
            },
            {
                id: 1,
                key: 'Log out',
                toGo: "Login"
            },
            
        ];
        
        return(
            <View style={ styles.container }>
                <FlatList
                    data={ items }
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            style = { styles.btnSignInStyle }
                            onPress = {() => this.factory(item)}
                        >
                            <Text style = { styles.textButton }>{ item.key }</Text>
                        </TouchableOpacity>
                    }
                >
                </FlatList>
            </View>
        );
    }
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
    },

    rect: {
        borderColor: "#000",
        borderWidth: 1,
        flexDirection: "column",
        width: DEVICE_WIDTH,
        height: 48,
        padding: PADDING_CONTENT,
    },

    textButton: {
        color: "#000",
        fontSize: TEXTSIZE
    },

    btnSignInStyle: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        backgroundColor: '#ffd',
        width: DEVICE_WIDTH - 20,   
        marginBottom: 10,
        justifyContent: 'center',
        paddingLeft: 10
    },

    btnTextSignIn: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});