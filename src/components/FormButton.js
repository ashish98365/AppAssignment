import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { Button, Text } from 'native-base';
import { Font } from 'expo'; //import is require else font error is given

class FormButton extends Component {

    state={ loading: true }

    async componentDidMount() {
        await Expo.Font.loadAsync({
            Roboto: require("../../node_modules/native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("../../node_modules/native-base/Fonts/Roboto_medium.ttf"),
            //Ionicons: require("../../node_modules/@expo/vector-icons/fonts/Ionicons.ttf"),
          });
          this.setState({ loading: false });
    }

    onClick = (param) => {
        this.props.action(param);
    }

    render() {
        const { buttonStyle } = styles;

        if (this.state.loading) {
            return <ActivityIndicator />;
        }

        return (
            <Button 
                onPress={this.onClick.bind(this, this.props.param)}
                style={buttonStyle} 
                block
            >
                <Text>{ this.props.buttonText }</Text>
            </Button> 
        );
    }
}

const styles = {
    buttonStyle: {
        marginTop: 50, 
        marginLeft: 10, 
        marginRight: 10
    }
};

export default FormButton;
