import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Animated } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {
    scrollX = new Animated.Value(0);

    renderLastSlide(i) {
        if (i === this.props.data.length - 1) {
            return (
                <Button
                    title="Onwards!"
                    raised
                    buttonStyle={styles.buttonStyle}
                    containerViewStyle={styles.containerButtonStyle}
                    onPress={this.props.onComplete}
                />
                );
            }
        }
        
        renderSlides() {
            return this.props.data.map((slide, i) => {
                return (
                    <View 
                    key={slide.text}
                    style={[styles.slideStyle, { backgroundColor: slide.color }]}
                    >
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderLastSlide(i)}
                    <View style={{ flexDirection: 'row' }}>
                        { this.renderDots() }
                    </View>
                </View>
            );
        });
    }
    
    renderDots() {
        const position = Animated.divide(this.scrollX, SCREEN_WIDTH);
        
        return this.props.data.map((_, i) => { 
            const opacity = position.interpolate({
                inputRange: [i - 1, i, i + 1],
                outputRange: [0.3, 1, 0.3], 
                extrapolate: 'clamp'
            });
            return (
                <Animated.View
                key={i}
                style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
                />
            );
        });
    }
    
    render() {
        return (
            <View style={{ flex: 1 }}>
            <ScrollView
            horizontal
            pagingEnabled
                    style={{ flex: 1 }}
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event( 
                    [{ nativeEvent: { contentOffset: { x: this.scrollX } } }] 
                    )}
                    scrollEventThrottle={16} 
            >
                    {this.renderSlides()}
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: '#0288D1',
    },
    containerButtonStyle: {
        marginTop: 15
    }
};

export default Slides;
