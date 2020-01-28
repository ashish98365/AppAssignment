import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Container, Content, Form } from 'native-base';
import { connect } from 'react-redux';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { inputFieldUpdate, saveEmployeeDetail } from '../actions';
import { APP_THEME } from '../utils';

class EmployeeForm extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Employee Detail Form',
            headerTitleStyle: {
                color: '#ffffff'
            },
            headerStyle: {
                backgroundColor: APP_THEME,
            },
        };
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'didFocus',
            () => {
                this.props.inputFieldUpdate({ prop: 'name', value: '' });
                this.props.inputFieldUpdate({ prop: 'designation', value: '' });
                this.props.inputFieldUpdate({ prop: 'age', value: '' });
            }
        );
    }

    render() {
        const { name, designation, age } = this.props;
        const { nameError, designationError, ageError } = this.props.validationError;
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
                                {nameError}
                            </Text>
                            <FormInput 
                                label='Designation'
                                value={designation}
                                onChangeText={value => this.props.inputFieldUpdate({ prop: 'designation', value })}
                            />
                            <Text style={styles.errorTextStyle}>
                                {designationError}
                            </Text>
                            <FormInput 
                                label='Age'
                                value={age}
                                onChangeText={value => this.props.inputFieldUpdate({ prop: 'age', value })}
                                keyboardType='numeric'
                            />
                            <Text style={styles.errorTextStyle}>
                                {ageError}
                            </Text>
                            <FormButton
                                action={this.props.saveEmployeeDetail}
                                param={{ name, designation, age, navigationObj: this.props.navigation.navigate, navigateTo: 'employeeList' }}
                                buttonText='Create'
                            />
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
    }
  };

const mapStateToProps = ({ formReducer, validationError }) => {
    const { name, designation, age } = formReducer;    
    return { name, designation, age, validationError };
};

export default connect(mapStateToProps, { inputFieldUpdate, saveEmployeeDetail })(EmployeeForm);
