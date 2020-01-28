import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider } from 'react-redux';

import EmployeeForm from './src/screens/EmployeeForm';
import EmployeeList from './src/screens/EmployeeList';
import NameEdit from './src/screens/NameEdit';
import DesignationEdit from './src/screens/DesignationEdit';
import AgeEdit from './src/screens/AgeEdit';
import store from './src/store';
import { APP_THEME } from './src/utils';

const nameEditScreen = createStackNavigator({
  nameEdit: { screen: NameEdit }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: APP_THEME
    },
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      color: '#ffffff'
    },
    headerTintColor: '#ffffff'
  }
});

const designationEditScreen = createStackNavigator({
  designationEdit: { screen: DesignationEdit }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: APP_THEME
    },
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      color: '#ffffff'
    },
    headerTintColor: '#ffffff'
  }
});

const ageEditScreen = createStackNavigator({
  ageEdit: { screen: AgeEdit }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: APP_THEME
    },
    headerTitleStyle: {
      flex: 1,
      textAlign: 'center',
      color: '#ffffff'
    },
    headerTintColor: '#ffffff'
  }
});

const mainNavigator = createStackNavigator({
  employeeList: { screen: EmployeeList },
  employeeForm: { screen: EmployeeForm },
  edit: { screen: createBottomTabNavigator({
      nameEdit: { screen: nameEditScreen, navigationOptions: { title: 'Name' } },
      designationEdit: { screen: designationEditScreen, navigationOptions: { title: 'Designation' } },
      ageEdit: { screen: ageEditScreen, navigationOptions: { title: 'Age' } }
    }, {
      tabBarOptions: {
        activeTintColor: '#fee505',
        inactiveTintColor: '#ffffff',
        labelStyle: { fontSize: 14 },
        style: {
          backgroundColor: APP_THEME
        }
      }
    }),
    navigationOptions: {
      headerShown: false,
    } 
  }
});

const AppContainer = createAppContainer(mainNavigator);

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
