import React from 'react';
import {
  Text,
  View,
  ListView,
  TouchableHighlight
} from 'react-native';

import ScoreGridElement from './ScoreGridElement';

const marginStyle = {
    marginTop: 10,
    marginBottom: 10
};

class ScoreGrid extends React.Component {
    scoreIncreased(player) {
        const score = this.props.scores[player.id][this.props.hole-1];
        this.props.updateScore(this.props.gameId, player.id, this.props.hole, score + 1);
    }

    scoreDecreased(player) {
        const score = this.props.scores[player.id][this.props.hole-1]
        if (score > 1) {
            this.props.updateScore(this.props.gameId, player.id, this.props.hole, score - 1);
        }
    }

    render() {
        const scoreGridElements = this.props.players.map((p, index) => {
            const score = this.props.scores[p.id][this.props.hole-1];
            return <ScoreGridElement
                player={p}
                key={index}
                score={score}
                par={3}
                scoreIncreased={this.scoreIncreased.bind(this, p)}
                scoreDecreased={this.scoreDecreased.bind(this, p)}/>;
        });
        return (
            <View style={marginStyle}>
                {scoreGridElements}
            </View>
        );
    }
};

export default ScoreGrid;