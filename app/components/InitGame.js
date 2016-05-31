import React from 'react';
import {
  Text,
  View,
  ListView,
} from 'react-native';

import SelectPlayers from './SelectPlayers';
import SelectCourse from './SelectCourse';
import Game from './Game';


class InitGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState: 'selectPlayers'
        };
    }

    playersSelected(selectedPlayers) {
        this.setState({
            selectedPlayers,
            currentState: 'selectCourse'
        });
    }

    courseSelected(selectedCourse) {
        this.setState({
            selectedCourse,
            currentState: 'startGame'
        });
    }

    render() {
        var component;
        switch (this.state.currentState) {
            case 'selectPlayers':
                component = (<SelectPlayers {...this.props}
                    playersSelected={this.playersSelected.bind(this)} />);
                break;
            case 'selectCourse':
                component = (<SelectCourse {...this.props}
                    courseSelected={this.courseSelected.bind(this)} />);
                break;
            case 'startGame':
                component = (<Game {...this.props}
                    players={this.state.selectedPlayers}
                    course={this.state.selectedCourse} />);
                break;
        }
        return (
            <View>
                {component}
            </View>
        );
    }
};

export default InitGame;