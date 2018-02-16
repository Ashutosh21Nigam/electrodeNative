
/*import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});*/

import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableHighlight
} from 'react-native'
import { MoviesApi } from 'react-native-ernmovie-api'
import { NavigationApi } from 'react-native-ernnavigation-api'

export default class MovieListMiniApp extends Component {

  _keyExtractor = (item, index) => item.title;

  /*constructor () {
    super()
    this.state = {
      movies: [{
        title: 'The Fast and Furious',
        releaseYear: 2010,
        ratings: '4.5',
        imageUrl: 'http://bit.ly/2jRUZwE',
        description: 'The Fast and the Furious'
      }, {
        title: '2 Fast 2 Furious',
        releaseYear: 2011,
        ratings: '4.0',
        imageUrl: 'http://bit.ly/2jTfYPF',
        description: 'How fast do you like it ?'
      }]
    }
  }*/

  constructor () {
  super()

  MoviesApi.requests().getTopRatedMovies().then((movies) => {
    if (movies) {
      this.setState(previousState => {
        return {movies}
      })
    }
  }).catch(error => {
    let movies = [{
      title: 'Titanic',
      releaseYear: 1997,
      ratings: '4.5',
      imageUrl: 'http://bit.ly/2hnU8mq',
      description: 'Titanic'
    }, {
      title: 'Avatar',
      releaseYear: 2009,
      ratings: '4.0',
      imageUrl: 'http://bit.ly/2xAX0Cv',
      description: 'Avatar'
    }]

    this.setState(previousState => {
      return {movies}
    })
  })

  this.state = {
    movies: []
  }
}

  /*render () {
    return (
      <FlatList
        style={styles.container}
        data={this.state.movies}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) =>
          <View style={styles.row}>
            <Image
              style={styles.icon}
              source={{
                uri: item.imageUrl ? item.imageUrl : 'http://bit.ly/2yz3AYe'
              }}
            />
            <View style={styles.row2}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.releaseYear}</Text>
            </View>
          </View>
        }
      />
    )
  }*/


  render () {
    return (
      <FlatList
        style={styles.container}
        data={this.state.movies}
        keyExtractor={this._keyExtractor}
        renderItem={({item}) =>
        <TouchableHighlight onPress={() => this._onPressRow(item)} underlayColor="gray">
          <View style={styles.row} onPress={() => this._onPressRow(item)}>
            <Image
              style={styles.icon}
              source={{
                uri: item.imageUrl ? item.imageUrl : 'http://bit.ly/2yz3AYe'
              }}
            />
            <View style={styles.row2}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.releaseYear}</Text>
            </View>
          </View>
          </TouchableHighlight>}
      />
    )
  }

  _onPressRow (movie) {
   movie.isSelect = !movie.isSelect
   NavigationApi.requests().navigate('MovieDetailsMiniApp', {'initialPayload': JSON.stringify(movie)}).catch(() => {
     console.log("Navigation failed.");
   })
 }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    padding: 5,
    backgroundColor: 'black'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12
  },
  row2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    paddingTop: 5,
    flex: 1,
    fontSize: 12
  },
  icon: {
    width: 50,
    height: 70,
    flexShrink: 1,
    alignSelf: 'center'
  }
});
