import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native';

import {Button} from 'react-native-elements';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {userForgotPassword} from '@store/user/userAction';

import {Header, FormInput} from '@component/common';

import {stringHelper} from '@utility/helper/stringHelper';
import {Colors} from '@utility/constants/Colors';
import {showAlert} from '@utility/helper/functionHelper';
import {valueConstant} from '@utility/constants/valueConstant';

import fitness from '@assets/image/fitness.png';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const doForget = async (emailValue) => {
    if (!loading) {
      if (email === '') {
        showAlert(stringHelper.auth.fillData);
      } else {
        setLoading(true);
        setIsSubmit(true);
        dispatch(userForgotPassword(emailValue))
          .then(() => {
            setLoading(false);
            showAlert(stringHelper.auth.fillData);
          })
          .catch(() => {
            setLoading(false);
          });
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header
        centerText={stringHelper.screens.forgetPassword}
        leftPress={() => navigation.goBack()}
        leftIcon={stringHelper.icons.return}
        leftText={stringHelper.back}
      />
      <KeyboardAvoidingView style={styles.align} behavior="position">
        <View style={styles.align}>
          <Image source={fitness}  tintColor={Colors.LOGO}  style={styles.imageStyle} />
        </View>
        {!isSubmit ? (
          <View style={styles.align}>
            <Text style={styles.text}>{stringHelper.auth.resetPassword}</Text>

            <FormInput
              value={email}
              placeholderText={stringHelper.auth.auth}
              onChangeText={(userEmail) => setEmail(userEmail)}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
            />
            <Button
              onPress={async () => await doForget(email)}
              buttonStyle={[
                styles.buttonStyle,
                {
                  backgroundColor: email
                    ? Colors.PRIMARY_COLOR
                    : Colors.BUTTON_DEACTIVE_COLOR,
                },
              ]}
              containerStyle={styles.align}
              titleStyle={{
                color: email ? Colors.WHITE_COLOR : Colors.FORMINPUT_COLOR,
              }}
              title={stringHelper.submit}
              loading={loading}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.text}>{stringHelper.auth.checkInbox}</Text>
            <Text style={styles.textHint}>
              {stringHelper.auth.checkInboxSentenceOne}
            </Text>
            <Text style={styles.textHint}>{email}</Text>
            <Text style={styles.textHint}>
              {stringHelper.auth.checkInboxSentenceTwo}
            </Text>
            <Button
              onPress={() => navigation.goBack()}
              buttonStyle={[styles.buttonStyle, styles.backButLogin]}
              containerStyle={styles.align}
              title={stringHelper.auth.login}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DATE_COLOR,
    flex: 1,
  },
  align: {
    alignItems: 'center',
  },
  indicator: {
    marginTop: 8,
  },
  backButLogin: {
    backgroundColor: Colors.PRIMARY_COLOR,
    marginTop: 39,
  },
  buttonStyle: {
    width: valueConstant.formItemWidth,
    height: valueConstant.formItemHeight,
    borderRadius: 10,
    borderWidth: 0,
    marginTop: 36,
  },
  imageStyle: {
    marginTop: 39,
    marginBottom: 8,
    width: 130,
    height: 130,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.WHITE_COLOR,
  },
  textHint: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
    color: Colors.WHITE_COLOR,
    width: responsiveScreenWidth(90),
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 17,
    color: Colors.DELETE_COLOR,
  },
});

export default ForgetPassword;
