import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
	render() {
		const MainScreen = TabNavigator({
			map: { screen: MapScreen },
			deck: { screen: DeckScreen },
			review: {
				screen: StackNavigator({
					review: { screen: ReviewScreen },
					settings: { screen: SettingsScreen }
				})
			}
		}, {
			tabBarPosition: 'bottom',
			lazy: false,
			tabBarOptions: {
				showIcon: true
			}
		});
		
		const MainNavigator = StackNavigator({
			welcome: { screen: WelcomeScreen },
			auth: { screen: AuthScreen },
			main: { screen: MainScreen }
		}, {
			tabBarPosition: 'bottom',
			//lazy: true,
			//swipeEnabled: false,
			//animationEnabled: false,
			headerMode: 'none',
			navigationOptions: {
				tabBarVisible: false
			}
		}
		);
		return (
			<Provider store={store}>
				<MainNavigator />
			</Provider>
		);
	}
}
