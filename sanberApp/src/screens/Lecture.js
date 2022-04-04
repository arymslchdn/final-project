import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Alert, ScrollView } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import RadioButtonRN from 'radio-buttons-react-native';
import { Video } from 'expo-av';

import getToken from '../api/getToken';
import initDataDetailLecture from '../api/initDataDetailLecture';
import global from '../global';
import submitExercise from '../api/submitExercise';
import { RadioButton } from 'react-native-paper';
import { DEVICE_WIDTH } from '../constant/Constant';

const Tab = ({ tab, page, onPressHandler, onTabLayout, styles }) => {
  const { label } = tab;
  const style = {
    marginHorizontal: 20,
    paddingVertical: 10,
  };
  const containerStyle = {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: styles.backgroundColor,
    opacity: styles.opacity,
    transform: [{ scale: styles.opacity }],
  };
  const textStyle = {
    color: styles.textColor,
    fontWeight: '600',
  };
  const iconStyle = {
    tintColor: styles.textColor,
    resizeMode: 'contain',
    width: 22,
    height: 22,
    marginLeft: 10,
  };
  return (
    <TouchableOpacity style={style} onPress={onPressHandler} onLayout={onTabLayout} key={page}>
      <Animated.View style={containerStyle}>
        <Animated.Text style={textStyle}>{label}</Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

class Lecture extends Component {
    constructor(props) {
        super(props);
        this.state = { listData: [] };
    }

    componentDidMount() {
        const id = this.props.route.params;
        const user_id = global.onSignIn.id;
        
        getToken()
        .then(token => initDataDetailLecture(token, user_id, id))
        .then(listData => this.setState({ listData }))
        .catch(err => this.gotoLogin());
    }

    compareAnswer(e, checked) {
        const user_id = global.onSignIn.id;
        const document_id = e.id;

        const correct_answer = e.meta.correct;
        const answer = checked;
        
        const is_correct = (answer === correct_answer);

        if(is_correct) this.onSuccess()
        else this.onFail()
        
        getToken()
        .then(token => submitExercise(token, user_id, document_id, answer, is_correct) )
        .then(
            // res => console.log(res)
        )
        .catch(
            // err => console.log(err)
        )
    }

    onSuccess() {
        Alert.alert( 'Thông báo', 'Đáp án đúng',
            [
                { text: 'OK' }
            ],
        );
    }

    onFail() {
        Alert.alert('Thông báo', 'Đáp án sai',
        [
            { text: 'OK' },
        ]);
    }

    goBack = () => {
        this.props.navigation.pop();
    }

    _scrollX = new Animated.Value(0);
    // 6 is a quantity of tabs
    interpolators = Array.from({ length: 6 }, (_, i) => i).map(idx => ({
        scale: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [1, 1.2, 1],
        extrapolate: 'clamp',
        }),
        opacity: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: [0.9, 1, 0.9],
        extrapolate: 'clamp',
        }),
        textColor: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: ['#000', '#fff', '#000'],
        }),
        backgroundColor: this._scrollX.interpolate({
        inputRange: [idx - 1, idx, idx + 1],
        outputRange: ['rgba(0,0,0,0.1)', '#000', 'rgba(0,0,0,0.1)'],
        extrapolate: 'clamp',
        }),
    }));
    
    render() {
        const { listData } = this.state;
        
        const PageLyThuyet = ({e}) => (
            <ScrollView style={styles.container}>
                <Text style = {formatText}> {e.name} </Text>
                <Text style = {formatText}> {e.meta.description} </Text>
            </ScrollView>
          );
          
        const PageVideo = ({e}) => (
            <ScrollView style={styles.container}>
                <Text style = {formatText}> {e.name} </Text>
                <Video
                    // ref={null}
                    source={{uri: e.meta.url}}
                    useNativeControls
                    resizeMode='contain'
                    style={video}
                />
            </ScrollView>
        );
        const PageBaiTap = ({e}) => {
            const def = e.practices[e.practices.length - 1] ? parseInt(e.practices[e.practices.length - 1].answer) : 0;
            let [checked, setChecked] = useState(def);

            return (
                <ScrollView style={styles.container}>
                    <Text style = {formatText}> {e.name} </Text>
                    <Text style = {formatText}> {e.meta.question} </Text>
                    
                    <RadioButton.Group
                        onValueChange={v => {setChecked(v)}}
                        value = {checked}
                    >
                        {
                            e.meta.answers.map(data => {
                                return (
                                    <RadioButton.Item
                                        value={data.id}
                                        style={styles.cardRadio}
                                        label={data.label}
                                    />
                                );
                            })
                        }
                    </RadioButton.Group>
    
                    <TouchableOpacity
                        style={btnMark}
                        // onPress={() => this.compareAnswer(e, checked)}
                    >
                        <Text style = {{color: '#000'}}>Gửi</Text>
                    </TouchableOpacity>
                </ScrollView>
            );
        }
        const {
            container, video,
            formatText, btnMark, 
        } = styles;

        return (
            <View style={ container }>
                <ScrollableTabView
                    renderTabBar={() => (
                    <TabBar
                        underlineColor="#000"
                        tabBarStyle={{ backgroundColor: "#666363", borderTopColor: '#d2d2d2', borderTopWidth: 1 }}
                        renderTab={(tab, page, isTabActive, onPressHandler, onTabLayout) => (
                            <Tab
                                key={page}
                                tab={tab}
                                page={page}
                                isTabActive={isTabActive}
                                onPressHandler={onPressHandler}
                                onTabLayout={onTabLayout}
                                styles={this.interpolators[page]}
                            />
                        )}
                    />
                    )}
                    onScroll={(x) => this._scrollX.setValue(x)}
                >
                    {
                        listData.map(data => {
                            if(data.document_types.name === "Lý thuyết") {
                                return (
                                    <PageLyThuyet tabLabel={{label: data.name}} e={data} key={0} />
                                );
                            }
                            if(data.document_types.name === "Bài tập") {
                                return (
                                    <PageBaiTap tabLabel={{label: data.name}} e={data} key={1} />
                                );
                            }
                            if(data.document_types.name === "Video") {
                                return (
                                    <PageVideo tabLabel={{label: data.name}} e={data} key={2} />
                                );
                            }
                        })
                    }
                </ScrollableTabView>
            </View>
        );
    }
}

export default Lecture;

const styles = StyleSheet.create({
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
      fontSize: 28,
    },
    wrapper: {
        margin: 20,
        backgroundColor: '#666363',
        borderRadius: 25,
    },
    btnMark: {
        marginLeft: DEVICE_WIDTH / 1.5,
        margin: 10,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 20,
        width: (DEVICE_WIDTH - 15) - DEVICE_WIDTH / 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formatText: {
        margin: 10,
        fontSize: 20,
        color: '#fff',
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        fontSize: 30
    },
    row1: { 
        backgroundColor: '#666363',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    titleStyle: { color: '#FFF', fontFamily: 'Avenir', fontSize: 30 },
    iconStyle: { width: 30, height: 30, margin: 5 },
    container: {
        flex: 1,
        backgroundColor: '#262525',
    },
    productImage: {
        margin: 5,
        borderRadius: 10,
        width: 90,
        height: (90 * 450) / 400
    },
    productContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        borderTopColor: '#F0F0F0',
        borderBottomColor: '#FFF',
        borderLeftColor: '#FFF',
        borderRightColor: '#FFF',
        borderWidth: 1
    },
    txtName: {
        fontFamily: 'Avenir',
        color: '#007bff',
        fontSize: 25,
        fontWeight: '700',
    },
    txtDel: {
        fontFamily: 'Avenir',
        color: '#BCBCBC',
        fontSize: 20,
        fontWeight: '700',
    },
    txtTitle: {
        backgroundColor: '#FFF',
        fontFamily: 'Avenir',
        color: '#BCBCBC',
        fontSize: 25,
        fontWeight: '700',
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 200,
    },
    radioBtn: {
        width: 300,
        marginLeft: 35,
    },
    cardRadio: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5
    },
  });
