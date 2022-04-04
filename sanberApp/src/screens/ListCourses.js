import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { DEVICE_WIDTH, PADDING_CONTENT, DEVICE_HEIGHT } from "../constant/Constant";
import initDataCourse from "../api/initDataCourses";
import getToken from "../api/getToken";
import { TextInput } from "react-native-gesture-handler";

class ListCourses extends Component {
    constructor(props) {
        super(props);
        this.state = { listData: [], data: [], search: ''};
    }

    componentDidMount() {
        getToken()
        .then(token => initDataCourse(token))
        .then(listData => this.setState({ listData, data: listData }))
        .catch(err => this.gotoLogin());
    }
    
    gotoCourse(id) {
        this.props.navigation.navigate("Course", id);
    }

    gotoLogin() {
        this.props.navigation.navigate("Login");
    }

    _search(text){
        let list = [];
        this.state.data.map(function(value){
          if(value.code.indexOf(text) > -1 || value.code.indexOf(text.toUpperCase()) > -1){
            list.push(value);
          }
        });
        this.setState({
          listData:list,
          search:text
        });
    }

    _timeFormat(text) {
        // console.log(text);
        let y = text.substr(0, 4);
        let m = text.substr(5, 2);
        let d = text.substr(8, 2);

        return `Khóa học từ ${d}/${m}/${y}`;
    }

    render() {
        const { listData } = this.state;
        // console.log(listData);

        return(
            <View style={ styles.container }>
                <ScrollView>
                    <View>
                        <TextInput
                            placeholder='Search'
                            value={this.state.search}
                            onChangeText={(text)=>this._search(text)}
                            style = { styles.textInput }
                        >
                        </TextInput>
                    </View>
                    { listData.map((item) => {
                        return (
                            <View style={ styles.productContainer} key={item.id}>
                                <TouchableOpacity
                                    style={ styles.rect2 }
                                    onPress={() => this.gotoCourse(item.id)}
                                >
                                    <Image style={ styles.productImage } source={{uri:item.thumbnail}}></Image>
                                    <View>
                                        <Text style={ styles.textTittle }> {item.code} </Text>
                                        <Text style={ styles.textTime }> {this._timeFormat(item.started_at)} </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            
                        );
                    }) }
                </ScrollView>
            </View>
        );
    }
}

export default ListCourses;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    rect2: {
        backgroundColor: '#ffd',
        borderColor: "#000",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "row",
        width: DEVICE_WIDTH - 10,
        height: 100,
        padding: PADDING_CONTENT,
    },

    textTittle: {
        color: "#000",
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10
    },

    textTime: {
        color: "#000",
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10
    },

    productImage: {
        borderRadius: 10,
        marginBottom: 15,
        width: 80,
        height: 80
    },

    productContainer: {
        margin: 5,
        backgroundColor: '#666363',
        borderRadius: 15,
        flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1
    },
    textInput: { 
        color: '#000',
        margin: 5,
        borderRadius: 10,
        height: DEVICE_HEIGHT / 20, 
        width: DEVICE_WIDTH - 10,
        backgroundColor: '#fff', 
        paddingLeft: 10,
        paddingVertical: 0, 
        borderColor: 'gray',
        borderWidth: 2
    },
});