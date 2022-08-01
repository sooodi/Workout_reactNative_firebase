import React from 'react';
import {Animated, Keyboard, Platform} from 'react-native';

import PropTypes from 'prop-types';


/* Component ======================================= */
class KeyboardAvoidView extends React.Component {
  constructor(props) {
    super(props);

    this.paddingBottom = new Animated.Value(0);

    this._keyboardShow = this._keyboardShow.bind(this);
    this._keyboardHide = this._keyboardHide.bind(this);
    this._animate = this._animate.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.keyboardShowListener = Keyboard.addListener(
        'keyboardWillShow',
        this._keyboardShow,
      );
      this.keyboardHideListener = Keyboard.addListener(
        'keyboardWillHide',
        this._keyboardHide,
      );
    } else {
      this.keyboardShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardShow,
      );
      this.keyboardHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardHide,
      );
    }
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  _keyboardShow(event) {
    this._animate(event.endCoordinates.height);
  }

  _keyboardHide() {
    this._animate(0);
  }

  _animate(value, duration = 180) {
    let toValue = value;
    if (Platform.OS === 'android') {
      return;
    }

    if (Platform.OS === 'ios' ) {
      toValue = toValue - 36;
    }

    Animated.timing(this.paddingBottom, {
      toValue,
      duration,
    }).start();
  }

  render() {
    const {children, style, ...restProps} = this.props;

    return (
      <Animated.View
        {...restProps}
        style={[style, {paddingBottom: this.paddingBottom}]}>
        {children}
      </Animated.View>
    );
  }
}

/* Props ================================== */
KeyboardAvoidView.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
};

KeyboardAvoidView.defaultProps = {
  children: null,
  style: {},
};

/* Export Component ======================= */
export {KeyboardAvoidView};
