import PropTypes from 'prop-types';
import React from 'react';

import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';

import navigationService from '@navigation/navigationService';

import {Colors} from '@utility/constants/Colors';

const ActionSheet = (props) => {
  const {actionItems} = props;
  const actionSheetItems = [...actionItems];

  const onPressAction = (actionItem) => {
    navigationService.back();
    setTimeout(() => {
      props.accept(actionItem.id);
    }, 200);
  };

  const handleItemStyles = (index) => {
    if (index === 0) {
      let firstItemStyle = styles.firstActionSheetItem;
      if (actionItems.length === 1) {
        firstItemStyle = {
          ...firstItemStyle,
          ...styles.lastActionSheetItem,
          borderTopWidth: 0,
        };
      }

      return firstItemStyle;
    } else if (index === actionSheetItems.length - 1) {
      return styles.lastActionSheetItem;
    } else {
      return styles.middleActionSheetItem;
    }
  };

  return (
    <View style={styles.modalContent}>
      {actionSheetItems.map((actionItem, index) => {
        return (
          <TouchableHighlight
            style={[styles.actionSheetView, handleItemStyles(index)]}
            underlayColor={Colors.BUTTON_DEACTIVE_COLOR}
            key={index}
            onPress={() => onPressAction(actionItem)}>
            <Text
              allowFontScaling={false}
              style={[
                styles.actionSheetText,
                props?.actionTextColor && {
                  color: props?.actionTextColor,
                },
                index === actionSheetItems.length - 1 && {
                  color: Colors.PRIMARY_COLOR,
                },
                index === actionSheetItems.length - 2 &&
                  props.changeColor === true && {
                    color: Colors.PRIMARY_COLOR,
                  },
              ]}>
              {actionItem.label}
            </Text>
          </TouchableHighlight>
        );
      })}
      <TouchableHighlight
        style={[styles.actionSheetView, styles.borderItem]}
        underlayColor={Colors.BUTTON_DEACTIVE_COLOR}
        onPress={() => navigationService.back()}>
        <Text
          allowFontScaling={false}
          style={[
            styles.actionSheetText,
            props?.actionTextColor && {
              color: props?.actionTextColor,
            },
            {color: Colors.PRIMARY_COLOR},
          ]}>
          Cancel
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 20,
    justifyContent: 'flex-end',
    width: '100%',
    flex: 1,
  },
  borderItem: {
    borderBottomWidth: 0,
    backgroundColor: Colors.BACK_FORMINPUT_COLOR,
    marginTop: 8,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  lastActionSheetItem: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopColor: Colors.LINE_COLOR_LITE,
    borderTopWidth: 1,
  },
  firstActionSheetItem: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  middleActionSheetItem: {
    borderTopColor: Colors.LINE_COLOR_LITE,
    borderTopWidth: 1,
  },

  actionSheetText: {
    fontSize: 18,
    color: Colors.PRIMARY_COLOR,
  },
  actionSheetView: {
    backgroundColor: Colors.BACK_FORMINPUT_COLOR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
});

ActionSheet.propTypes = {
  actionItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      label: PropTypes.string,
      onPress: PropTypes.func,
    }),
  ).isRequired,
  onCancel: PropTypes.func,
  actionTextColor: PropTypes.string,
};

ActionSheet.defaultProps = {
  actionItems: [],
  onCancel: () => {},
  actionTextColor: null,
};

export default ActionSheet;
