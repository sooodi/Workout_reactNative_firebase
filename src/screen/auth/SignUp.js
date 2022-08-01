import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import {Button} from 'react-native-elements';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import FormInput from '@component/common/FormInput';
import * as userAction from '@store/user/userAction';
import {Colors} from '@utility/constants/Colors';
import {validateEmail, showAlert} from '@utility/helper/functionHelper';
import {stringHelper} from '@utility/helper/stringHelper';
import {valueConstant} from '@utility/constants/valueConstant';
import fitness from '@assets/image/fitness.png';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [emailAgain, setEmailAgain] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const screenNames = stringHelper.screens;

  const doRegister = async () => {
    if (!loading) {
      if (
        email === '' ||
        email === '' ||
        emailAgain === '' ||
        nickName === ''
      ) {
        showAlert(stringHelper.auth.fillData);
      } else if (email !== emailAgain) {
        showAlert(stringHelper.auth.emailRepeatInvalid);
      } else if (!validateEmail(email) || !validateEmail(emailAgain)) {
        showAlert(stringHelper.auth.emailInvalid);
      } else if (password.length < 4) {
        showAlert(stringHelper.auth.passwordLength);
      } else {
        setLoading(true);
        dispatch(userAction.userSignUp(email, password, nickName))
          .then((result) => {
            navigation.reset({
              index: 0,
              routes: [{name: screenNames.mainStack}],
            });
          })
          .catch((err) => {
            setLoading(false);
            showAlert(err);
          });
      }
    }
  };

  const returnKeyTypeConfig = () => {
    return Platform.OS === 'ios' ? 'done' : 'next';
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollViewStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <Image source={fitness} tintColor={Colors.LOGO} style={styles.imageStyle} />
        <Text style={styles.text}>{stringHelper.welcome}</Text>
        <FormInput
          value={nickName}
          placeholderText={stringHelper.auth.firstName}
          onChangeText={(txt) => setNickName(txt)}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={() => null}
          returnKeyType={returnKeyTypeConfig()}
        />
        <FormInput
          value={email}
          placeholderText={stringHelper.auth.email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType={returnKeyTypeConfig()}
          autoCorrect={false}
        />
        <FormInput
          value={emailAgain}
          placeholderText={stringHelper.auth.emailRepeat}
          onChangeText={(txt) => setEmailAgain(txt)}
          autoCapitalize="none"
          keyboardType="email-address"
          returnKeyType={returnKeyTypeConfig()}
          autoCorrect={false}
        />
        <FormInput
          value={password}
          returnKeyType={'done'}
          placeholderText={stringHelper.auth.choosePassword}
          onChangeText={(userPassword) => setPassword(userPassword)}
          secureTextEntry={true}
        />

        <Button
          onPress={() => doRegister(email, password, nickName)}
          buttonStyle={[
            styles.buttonStyle,
            {
              backgroundColor:
                password && email && emailAgain && nickName
                  ? Colors.PRIMARY_COLOR
                  : Colors.BUTTON_DEACTIVE_COLOR,
            },
          ]}
          titleStyle={{
            color:
              password && email && emailAgain && nickName
                ? Colors.WHITE_COLOR
                : Colors.FORMINPUT_COLOR,
          }}
          containerStyle={styles.buttonContainerStyle}
          title={stringHelper.auth.signup}
          loading={loading}
        />
        <Text style={styles.navButtonHint}>{stringHelper.auth.hasAccount}</Text>
        <Button
          buttonStyle={styles.loginBtnStyle}
          onPress={() => navigation.navigate(stringHelper.screens.login)}
          type="clear"
          titleStyle={styles.loginBtnTextStyle}
          title={stringHelper.auth.loginHere}
          raised={false}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.DATE_COLOR,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.DATE_COLOR,
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: Colors.DATE_COLOR,
  },
  buttonStyle: {
    width: valueConstant.formItemWidth,
    height: valueConstant.formItemHeight,
    borderRadius: 10,
    borderWidth: 0,
    marginTop:30,
  },
  imageStyle: {
    marginTop: 39,
    width: 159,
    height: 127,
  },
  text: {
    fontSize: 24,
    marginBottom: 30,
    color: Colors.WHITE_COLOR,
  },
  textTerm: {
    fontSize: 13,
    color: Colors.WHITE_COLOR,
  },
  navButtonHint: {
    marginTop: 20,
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
    color: Colors.WHITE_COLOR,
  },
  loginBtnTextStyle: {
    marginTop: 6,
    fontSize: 15,
    textAlign: 'center',
    color: Colors.PRIMARY_COLOR,
  },
  loginBtnStyle: {
    marginTop: 5,
    padding: 10,
    paddingHorizontal: 15,
  },
  buttonContainerStyle: {
    alignItems: 'center',
  },
});

export default SignUp;
