import React, { Component } from 'react';
import { View, Text, Platform, ScrollView, Linking } from 'react-native';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Review Jobs',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="favorite" size={22} color={tintColor} />
            ),
            headerRight: (
                <Button 
                    title="Settings"
                    onPress={() => navigation.navigate('settings')}
                    backgroundColor="rgba(0, 0, 0, 0)"
                    color="rgba(0, 122, 255, 1)"
                />
            ),
            headerStyle: {
                marginTop: Platform.OS === 'android' ? 24 : 0,
            }
        };
    }

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const {
                company, formattedRelativeTime, url, longitude, latitude, jobtitle, jobkey
            } = job;

            const initialRegion = {
                longitude,
                latitude,
                longitudeDelta: 0.02,
                latitudeDelta: 0.045
            };

            return (
                <Card title={jobtitle} key={jobkey}>
                    <View style={{ height: 200 }}>
                        <MapView
                            scrollEnabled={false}
                            style={{ flex: 1 }}
                            liteMode
                            initialRegion={initialRegion}
                        />
                        <View style={styles.detailWrapper}>
                            <Text styles={styles.italic}>{company}</Text>
                            <Text styles={styles.italic}>{formattedRelativeTime}</Text>
                        </View>
                        <Button
                            title="Apply Now!"
                            backgroundColor="#03A9F4"
                            onPress={() => Linking.openURL(url)}
                        />
                    </View>
                </Card>
            );
        });
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }
}

const styles = {
    detailWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginTop: 10
    },
    italics: {
        fontStyle: 'italic'
    }
};

function mapStateToProps(state) {
    console.log(state.likedJobs);
    return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
