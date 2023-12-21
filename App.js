import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './screens/HomeScreen'
import StackNavigator from './navigation/StackNavigator';
import { Provider } from 'react-redux';
import store from './store';
import { UserContext } from './UserContext';
import { ModalPortal } from "react-native-modals";


const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <Provider store={store}>
        <UserContext>
           <StackNavigator/>
           <ModalPortal />
        </UserContext>
      </Provider>
    </>
  )
}

export default App

const styles = StyleSheet.create({})