import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import {Colors} from '@utility/constants/Colors';
import {valueConstant} from '@utility/constants/valueConstant';

export const Header = ({
  headerStyle,
  leftIcon,
  leftText,
  leftPress,
  leftLoading = false,
  centerIcon = '',
  centerText,
  centerPress,
  rightIcon,
  rightText,
  leftTextStyle,
  rightTextStyle,
  rightPress,
  rightLoading = false,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={[styles.headerContainerStyle, headerStyle]}>
        <View style={[styles.sideBoxContainerStyle, styles.leftPadding]}>
          {leftLoading ? (
            <ActivityIndicator color={Colors.BUBBLE_SELF} size="small" />
          ) : (
            <React.Fragment>
              {leftIcon && (
                <IconHeader
                  iconName={leftIcon}
                  iconPress={() => leftPress()}
                  position="left"
                />
              )}

              <TextHeader
                title={leftText ? leftText : ''}
                textPress={() => leftText && leftPress()}
                position="left"
                leftTextStyle={[styles.leftTextStyle, leftTextStyle,{color:Colors.LOGO,marginLeft:10},]}
              />
            </React.Fragment>
          )}
        </View>

        {centerIcon.length > 0 ? (
          <Image source={{uri: centerIcon}} style={styles.centerIconStyle} />
        ) : centerText ? (
          <TextHeader
            title={
              centerText.length > 23
                ? `${centerText.substr(0, 23).trim()}...`
                : centerText
            }
            position="center"
            textPress={() => centerPress && centerPress()}
          />
        ) : (
          <View />
        )}

        <View style={[styles.sideBoxContainerStyle, styles.centerBoxView]}>
          {rightLoading ? (
            <ActivityIndicator color={Colors.BUBBLE_SELF} size="small" />
          ) : (
            <React.Fragment>
              <TextHeader
                title={rightText ? rightText : ''}
                textPress={() => rightText && rightPress()}
                position="right"
                rightTextStyle={[styles.rightTextStyle, rightTextStyle]}
              />

              {rightIcon && (
                <IconHeader
                  iconName={rightIcon}
                  iconPress={() => rightPress()}
                  position="right"
                />
              )}
            </React.Fragment>
          )}
        </View>
      </View>
      {children}
    </View>
  );
};

const IconHeader = ({iconName, iconPress, position}) => {
  return (
    <TouchableWithoutFeedback onPress={() => iconPress()}>
      <View
        style={[
          styles.iconHeaderContainerStyle,
          position === 'left'
            ? styles.iconPositionLeft
            : styles.iconPositionRight,
        ]}>
        {/*<IFSIcon*/}
        {/*  name={iconName}*/}
        {/*  color={Colors.HEADER_TEXT_COLOR}*/}
        {/*  size={valueConstant.iconMoonSize}*/}
        {/*/>*/}
      </View>
    </TouchableWithoutFeedback>
  );
};

const TextHeader = ({
  title,
  textPress,
  position,
  rightTextStyle,
  leftTextStyle,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => textPress()}>
      <View style={[styles.textHeaderContainerStyle]}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[
            styles.textHeaderStyle,
            position === 'right' ? rightTextStyle : leftTextStyle,
            position === 'center' ? styles.centerTextStyle : null,
          ]}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DATE_COLOR,
    zIndex: 1000,
    borderBottomWidth: 1,
    borderBottomColor:Colors.BORDER_BOTTOM,
  },
  title: {
    color: Colors.WHITE_COLOR,
    textAlign: 'center',
    width: 150,
    fontSize: 17,
    fontWeight: 'bold',
  },
  headerContainerStyle: {
    width: '100%',
    height: 57,
    // flex:14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sideBoxContainerStyle: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  leftPadding: {
    paddingLeft: 8,
  },
  centerBoxView: {
    paddingRight: 8,
    justifyContent: 'flex-end',
  },
  rightStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minWidth: 100,
  },
  leftStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minWidth: 100,
  },
  centerIconStyle: {
    width: 150,
    height: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  centerTextStyle: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },
  textHeaderContainerStyle: {
    // flex: 1,
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  textHeaderStyle: {
    fontSize: 17,
    textAlign: 'center',
    color: Colors.WHITE_COLOR,
    lineHeight: 24,
  },
  iconHeaderContainerStyle: {
    // flex: 5,
    // width: '20%',
    height: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPositionLeft: {
    alignItems: 'flex-start',
  },
  iconPositionRight: {
    alignItems: 'flex-end',
  },
  leftTextStyle: {
    color: Colors.WHITE_COLOR,
  },
  rightTextStyle: {
    color: Colors.WHITE_COLOR,
  },
});
