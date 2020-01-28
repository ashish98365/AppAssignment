import React, { Component } from 'react';
import { View, ToastAndroid, Alert, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Spinner, Text } from 'native-base';
import _ from 'lodash';
import { ListItem, Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';

import { getEmployeeDetail, navigateToEditScreen, deleteEmployeeDetail } from '../actions';
import { APP_THEME } from '../utils';

class EmployeeList extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Employee Details',
            headerTitleStyle: {
                color: '#ffffff'
            },
            headerStyle: {
                backgroundColor: APP_THEME,
            },
            headerRight: (
                <Icon iconStyle={{ marginRight: 10 }} color='#ffffff' type="font-awesome" name="user-plus" onPress={navigation.getParam('employeeForm')} />
            )
        };
    }

    state = { employeeDetail: null };

    componentDidMount() {
        this.props.navigation.setParams({ employeeForm: this.addNewEmployee });
        this.props.navigation.addListener(
            'didFocus',
            () => {
                this.props.getEmployeeDetail();
            }
        );
    }

    componentWillReceiveProps(newProp) {
        this.setState({ employeeDetail: newProp.employeeDetail });
        if (this.props.navigation.getParam('toastMessage')) {
            ToastAndroid.show(this.props.navigation.getParam('toastMessage'), ToastAndroid.SHORT);
            this.props.navigation.setParams({ toastMessage: '' });
        }
    }

    addNewEmployee = () => {
        this.props.navigation.navigate('employeeForm');
    }

    deleteEmployeeDetail = (employeeDetail) => {
        const { id, name, designation, age } = employeeDetail;
        Alert.alert(
            'Delete detail',
            `Are you sure you want to delete "${name}"'s detail?`,
            [
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                  text: 'Yes', 
                  onPress: () => {
                      this.props.deleteEmployeeDetail(id);
                      ToastAndroid.show('Employee detail deleted successfully', ToastAndroid.SHORT);
                    }
                },
            ],
            { cancelable: false },
          );
    }

    editEmployeeDetail = (employeeDetail) => {
        this.props.navigateToEditScreen(employeeDetail, this.props.navigation.navigate, 'edit');
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item, index }) => {
        const { id, name, designation, age } = item;
        return (
            <ListItem
                style={{ borderBottomWidth: 1, borderColor: '#ddd' }}
                title={name}
                subtitle={`Designation: ${designation} ${'\n'}Age: ${age}`}
            />
        );
    }

    render() {
        const { employeeDetail } = this.state;
        

        if (_.isNull(employeeDetail)) {
            this.props.getEmployeeDetail();
            return (
                <View style={styles.container}>
                    <Spinner color='green' />
                    <Text>Loading</Text>
                </View>
            );
        }
        if (_.isEmpty(employeeDetail)) {
            return (
                <View style={styles.container}>
                    <Text>No Employee Detail found</Text>
                </View>
            );
        }
        return (
            <View style={{ flex: 1 }}>
                <SwipeListView
                    keyExtractor={this.keyExtractor}
                    data={employeeDetail}
                    renderItem={this.renderItem}
                    renderHiddenItem={(data) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity
                                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                            >
                                <Icon
                                    raised
                                    name='edit'
                                    type='font-awesome'
                                    color='#f50'
                                    onPress={this.editEmployeeDetail.bind(this, data.item)}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.backRightBtn, styles.backRightBtnRight]}
                            >
                                <Icon
                                    raised
                                    name='trash'
                                    type='font-awesome'
                                    color='red'
                                    onPress={this.deleteEmployeeDetail.bind(this, data.item)}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                    rightOpenValue={-150}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={this.onRowDidOpen}
                    onSwipeValueChange={this.onSwipeValueChange}
                />
            </View>
        );
    }
}

const styles = {
    container: {
      flex: 1,
      //backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderBottomWidth: 1, 
        borderColor: '#ddd',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        right: 75,
    },
    backRightBtnRight: {
        right: 0,
    }
  };

const mapStateToProps = ({ employeeDetail: { employeeDetail } }) => {
    return { employeeDetail };
};

export default connect(mapStateToProps, { getEmployeeDetail, navigateToEditScreen, deleteEmployeeDetail })(EmployeeList);
