import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';
import { Container, Content, Form } from 'native-base';
import { connect } from 'react-redux';

import FormInput from '../components/FormInput';
import { inputFieldUpdate, editEmployeeDetail } from '../actions';

class NameEdit extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Edit Employee Name',
            headerRight: (
                <Text style={styles.headerRightStyle} onPress={navigation.getParam('editDetail')}>
                    Save
                </Text>
            )
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({ editDetail: this.editEmployeeDetail });
    }

    componentWillReceiveProps(newProps) {
        const { nameError, designationError, ageError } = newProps.validationError;
        if (nameError) {
            Alert.alert('Error !!!', nameError, [{ text: 'OK' }], { cancelable: false });
        } else if (designationError) {
            Alert.alert('Error !!!', designationError, [{ text: 'OK' }], { cancelable: false });
        } else if (ageError) {
            Alert.alert('Error !!!', ageError, [{ text: 'OK' }], { cancelable: false });
        }
    }

    editEmployeeDetail = () => {
        const { id, name, designation, age } = this.props;
        this.props.editEmployeeDetail({ id, name, designation, age }, this.props.navigation.navigate, 'employeeList');
    }

    render() {
        const { name } = this.props;
        return (
            <View style={{ flex: 1 }}>
                <Container>
                    <Content>
                        <Form>
                            <FormInput 
                                label='Full Name'
                                value={name}
                                onChangeText={value => this.props.inputFieldUpdate({ prop: 'name', value })}
                            />
                            <Text style={styles.errorTextStyle}>
                                {this.props.validationError.name ? this.props.validationError.name : ''}
                            </Text>
                        </Form> 
                    </Content>
                </Container>
            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
    },
    headerRightStyle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10
    }
  };

const mapStateToProps = ({ formReducer, validationError }) => {
    const { id, name, designation, age } = formReducer;    
    return { id, name, designation, age, validationError };
};

export default connect(mapStateToProps, { inputFieldUpdate, editEmployeeDetail })(NameEdit);
