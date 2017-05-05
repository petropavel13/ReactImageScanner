/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  NavigatorIOS,
  StatusBar,
  TouchableHighlight,
  ActivityIndicatorIOS,
} from 'react-native'

import GridView from 'react-native-grid-view'

// const cheerio = require('cheerio-without-node-native');

export default class ReactImageScanner extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: InitialScreen,
          title: 'Title',
        }}
        style={{
          flex: 1,
        }}
        barTintColor='#007AFF'
      >
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
      </NavigatorIOS>
    );
  }
}

export class InitialScreen extends Component {
  state = {
    text: "",
    isValid: false
  }
  
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  _onForward = () => {
    const nextRoute = {
      component: CollectionScene,
      title: this.state.text,
      passProps: { url: this.state.text }
    };
    this.props.navigator.push(nextRoute);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: .05}} />
          <View style={styles.inputContainer}>
            <View
              style={styles.borderContainer}>
              <TextInput
                style={styles.input}
                placeholder="Text"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={(text) => this.setState({
                  text: text,
                  isValid: text.length > 0
                })}>
              </TextInput>
            </View>
            <TouchableHighlight
              style={this.state.isValid ? styles.scan : styles.scanDisabled}
              onPress={this._onForward}
              activeOpacity={75 / 100}
              underlayColor={"rgb(74,144,226)"}
              disabled={!this.state.isValid}>
              <Text style={{color: 'white'}}>Scan</Text>
            </TouchableHighlight>
          </View>
          <View style={{flex: .05}} />
        </View>
      </View>
    );
  }
}

class Item extends Component {
  render() {
      return (
        <Image
            source={{uri: this.props.thumbnail}}
            style={styles.thumbnail}
          />
      );
  }
}

export class CollectionScene extends Component {
  state = {
    dataSource: null,
    loaded: false
  }
  
  componentDidMount() {
    this.fetchData();
  }
  
  fetchData() {
    console.log(this.props.url);
    fetch(this.props.url)
      .then((response) => response.text())
      .then((responseData) => {
      // convert to array or image links
      var imageLinks = []
        this.setState({
          dataSource: responseData,
          loaded: true,
        });
      })
      .done();
  }
  
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,122,255,1)",
        }}>
        <Text>{this.state.dataSource}</Text>
      </View>
    );
  }
  
  renderLoadingView() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}>
        <Text style={{
            textAlign: 'center',
          }}>
          Loading pictures...
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  inputContainer: {
    flex: 0.9,
    height: 128,
    justifyContent: 'space-between',
  },
  borderContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  input: {
    height: 40,
    color: '#333333',
    textAlign: 'center',
  },
  scan: {
    height: 40,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  scanDisabled: {
    height: 40,
    backgroundColor: '#007AFFAA',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});

AppRegistry.registerComponent('ReactImageScanner', () => ReactImageScanner);
