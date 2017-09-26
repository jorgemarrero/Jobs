import React, { Component } from 'react';
import { View, Text, Platform, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { connect } from 'react-redux';

class ReviewScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Review Jobs',
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
            return (
                <Card>
                    <View styles={{ height: 200 }}>
                        <View style={styles.detailWrapper}>
                            <Text styles={styles.italic}>{job.company}</Text>
                            <Text styles={styles.italic}>{job.formattedRelativeTime}</Text>
                        </View>
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
        marginBottom: 10
    },
    italics: {
        fontStyle: 'italic'
    }
};

function mapStateToProps(state) {
    console.log(state);
    console.log(state.likedJobs);
    return { likedJobs: state.likedJobs };
}

export default connect(mapStateToProps)(ReviewScreen);
