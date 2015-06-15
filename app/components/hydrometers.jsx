'use strict';

import React from 'react';
import ListenerMixin from 'alt/mixins/ListenerMixin';
import {IntlMixin} from 'react-intl';

if (process.env.BROWSER) {
  require('styles/hydrometers.scss');
}

export default class Hydrometers extends React.Component {
  static contextTypes = {
    router: React.PropTypes.func
  }

  static propTypes = {
    flux: React.PropTypes.object.isRequired
  }

  _getIntlMessage = IntlMixin.getIntlMessage

  state = this.props.flux
    .getStore('hydrometers')
    .getState();

  componentWillMount() {
    this.props.flux
      .getActions('page-title')
      .set(this._getIntlMessage('hydrometers.page-title'));

    this.props.flux
      .getActions('hydrometers')
      .fetch();
  }

  componentDidMount() {
    this.props.flux
      .getStore('hydrometers')
      .listen(this._handleStoreChange);
  }

  componentWillUnmount() {
    this.props.flux
      .getStore('hydrometers')
      .unlisten(this._handleStoreChange);
  }

  _handleStoreChange = this._handleStoreChange.bind(this)
  _handleStoreChange(state: Object) {
    return this.setState(state);
  }

  _removeHydrometer(index: number) {
    this.props.flux
      .getActions('hydrometers')
      .remove(index);
  }

  _showProfile(seed: string) {
    this.context.router
      .transitionTo('profile', {seed});
  }

  _renderHydrometers() {
    return this.state.hydrometers.map((hydrometer, index) => {
      return (
        <tr className='hydrometer--row' key={index}>
          <td>{hydrometer.hydrometer.email}</td>
          <td className='text-center'>
            <button
              onClick={this._showProfile.bind(this, hydrometer.seed)}>
              Profile
            </button>
          </td>
          <td className='text-center'>
            <button
              className='hydrometer--remove'
              onClick={this._removeHydrometer.bind(this, index)}>
              X
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h1 className='text-center'>
          {this._getIntlMessage('hydrometers.title')}
        </h1>
        <table className='app--hydrometers'>
          <thead>
            <tr>
              <th>
                {this._getIntlMessage('hydrometers.email')}
              </th>
              <th colSpan='2'>
                {this._getIntlMessage('hydrometers.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {this._renderHydrometers()}
          </tbody>
        </table>
        <p className='text-center'>
          <button
            ref='add-button'
            onClick={this.props.flux.getActions('hydrometers').add}>
            {this._getIntlMessage('hydrometers.add')}
          </button>
        </p>
      </div>
    );
  }
}
