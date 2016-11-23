import * as _ from 'lodash';

import { normalizePlayer as normalize } from './Normalizers';
import { getNextPlayerId } from './Utils';
import realm from './realm';


const players = realm.objects('Player');
const scores = realm.objects('Score');

class Players {
  getAll() {
    return _.map(players, normalize);
  }

  findById(id) {
    const result = players.filtered(`id = ${id}`);
    if (!result.length) {
      throw new Error(`No Player with id "${id}" found.`);
    }
    return _.first(result);
  }

  save(name) {
    return new Promise((success) => {
      realm.write(() => {
        const player = {
          id: getNextPlayerId(),
          name
        };
        const savedPlayer = realm.create('Player', player);
        success(normalize(savedPlayer));
      });
    });
  }

  remove(id) {
    return new Promise((success) => {
      const player = this.findById(id);
      const removableScores = scores.filtered('player.id = $0', id);
      realm.write(() => {
        realm.delete(removableScores);
        realm.delete(player);
        success();
      });
    });
  }
}

export default Players;
