import React, { Component } from 'react';
import { Item, Input, Label } from 'native-base';

class FormInput extends Component {
    render() {
        return (
            <Item floatingLabel>
                <Label>{ this.props.label }</Label>
                <Input
                    value={this.props.value}
                    onChangeText={this.props.onChangeText}
                    keyboardType={this.props.keyboardType}
                />
            </Item>
        );
    }
}

export default FormInput;
