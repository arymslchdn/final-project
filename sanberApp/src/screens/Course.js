import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView, View } from 'react-native';

import DropDownItem from "react-native-drop-down-item";
import initDataDetailCourse from '../api/initDataDetailCourse';
import getToken from '../api/getToken';

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = { listData: [] };
    }

    componentDidMount() {
        const id = this.props.route.params;

        console.log(id);

        getToken()
        .then(token => initDataDetailCourse(token, id))
        .then(listData => this.setState({ listData }))
        .catch(err => this.gotoLogin());
    }

    goBack = () => {
        this.props.navigation.pop();
    }

    gotoLecture(id) {
        console.log(id);
        this.props.navigation.navigate('Lecture', id);
    }

    gotoLogin() {
        this.props.navigation.navigate("Login");
    }

    render() {
        const { listData } = this.state;

        const {
            container, txtTitle, row1, txtName, descript,contai, titleStyle, hr
        } = styles;

        return (
            <View style={ container }>
                <View style={row1}>
                    <Text style={titleStyle}>React Native Course</Text>
                </View>

                <View style={hr}></View>

                <ScrollView style={ descript }>
                    { listData.map((item) => {
                        return (
                            <DropDownItem
                                key={item.id}
                                header={
                                <View style={ contai }>
                                    <Text style = {txtTitle}>★ {item.name}</Text>
                                </View>
                                }
                            >
                                {
                                    item.lectures.map((lecture) => {
                                        return  (
                                            <TouchableOpacity key={lecture.id}>
                                                <Text
                                                    style = {txtName}
                                                    onPress = {() => this.gotoLecture(lecture.id)}
                                                >● { lecture.name }</Text>
                                            </TouchableOpacity>
                                        );
                                    })
                                }
                            </DropDownItem>
                        );
                    }) }
                </ScrollView>
            </View>
        );
  }
}

export default Course;

const styles = StyleSheet.create({
    row1: { backgroundColor: '#666363' , flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 30 },
    iconStyle: { width: 30, height: 30, margin: 5 },
    iconCup: { 
        width: 40, 
        height: 40, 
        margin: 5,
        borderRadius: 25,
    },
    container: {
        flex: 1,
        backgroundColor: '#262525',
    },
    descript: {
        margin: 15,
    },
    hr: {
        height: 10,
        backgroundColor: '#666363',
        borderColor: 'gray',
        borderTopWidth: 1,
        borderBottomWidth: 1,
    },
    contai: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#262525',
    },
    score: { 
        margin: 15,
        flexDirection: 'row', 
    },
    txtTienDo: {
        marginLeft: 5,
        marginTop: 16,
        color: '#fff',
    },
    txtName: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 20,
        marginTop: 20,
    },
    txtDel: {
        color: '#BCBCBC',
        fontSize: 20,
        fontWeight: '700',
    },
    txtTitle: {
        color: '#BCBCBC',
        fontSize: 25,
        fontWeight: '400',
    },
    startStyle: {
        marginLeft: 190,
        backgroundColor: '#0075b4',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 20,
        width: 70,
    },
});
