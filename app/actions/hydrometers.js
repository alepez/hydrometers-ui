'use strict';

import {sample, take} from 'lodash';

import data from 'data/hydrometers.json';

class HydrometersActions {
  constructor() {
    this.generateActions(
      'remove', 'fetchSuccess', 'addSuccess',
      'fetchBySeedSuccess'
    );
  }
  add() {
    const promise: Function = (resolve) => {
      // fake xhr
      this.alt.getActions('requests').start();
      setTimeout(() => {
        this.actions.addSuccess(sample(data.hydrometers));
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    this.alt.resolve(promise);
  }
  fetch() {
    const promise: Function = (resolve) => {
      this.alt.getActions('requests').start();
      setTimeout(() => {
        this.actions.fetchSuccess(take(data.hydrometers, 10));
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    this.alt.resolve(promise);
  }
  fetchBySeed(seed: string) {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      setTimeout(() => {
        const hydrometer: Object = data.hydrometers.find((u) => u.seed === seed);
        this.actions.fetchBySeedSuccess(hydrometer);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };

    this.alt.resolve(promise);
  }
}

export default HydrometersActions;
