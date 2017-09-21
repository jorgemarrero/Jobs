import React, { Component } from 'react';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to JobAPP', color: '#03A9F4' },
    { text: 'Find your perfect job', color: '#009688' },
    { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
    onSildesComplete = () => {
        console.log(this);
        const { navigate } = this.props.navigation;
        navigate('auth');
    }

    render() {
        return (
            <Slides 
                data={SLIDE_DATA}
                onComplete={this.onSildesComplete()}
            />
        );
    }
}

export default WelcomeScreen;
