'use strict';

import {isEmpty} from 'lodash';

class HydrometersStore {

  constructor() {
    this.bindActions(this.alt.getActions('hydrometers'));
    this.hydrometers = [];
  }

  static getBySeed(seed) {
    const hydrometers: Array<Object> = this.getState().hydrometers;
    return {hydrometer: hydrometers.find((hydrometer) => hydrometer.seed === seed)};
  }

  onRemove(index) {
    const hydrometers: Array<Object> = this.hydrometers.slice();
    hydrometers.splice(index, 1);

    return this.setState({hydrometers});
  }

  onAddSuccess(hydrometer) {
    const hydrometers: Array<Object> = this.hydrometers.slice();
    hydrometers.push(hydrometer);

    return this.setState({hydrometers});
  }

  onFetchSuccess(hydrometers) {
    if (isEmpty(this.hydrometers)) {
      // just apply the new hydrometers
      // this is called on every server rendering
      return this.setState({hydrometers});
    }
    else {
      const merged: Array<Object> = this.hydrometers.slice();
      hydrometers.forEach((hydrometer) => {
        // update the most recent data into store
        let match: ?Object = merged.find((u) => u.seed === hydrometer.seed) || null;
        if (match) {
          match = hydrometer;
        }
        // push the new hydrometer
        else {
          merged.push(hydrometer);
        }
      });

      return this.setState({hydrometers: merged});
    }
  }

  onFetchBySeedSuccess(hydrometer) {
    const hydrometers: Array<Object> = this.hydrometers.slice();
    let occurrence: ?Object = hydrometers.find((u) => u.seed === hydrometer.seed);
    if (occurrence) {
      occurrence = hydrometer;
    }
    else if (hydrometer) {
      hydrometers.push(hydrometer);
    }

    return this.setState({hydrometers});
  }

}

export default HydrometersStore;
