import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import {Button} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {userLogin} from '@store/user/userAction';

import {FormInput, Header} from '@component/common';

import {stringHelper} from '@utility/helper/stringHelper';
import {validateEmail, showAlert} from '@utility/helper/functionHelper';
import {Colors} from '@utility/constants/Colors';
import {valueConstant} from '@utility/constants/valueConstant';

import fitness from '@assets/image/fitness.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const screenNames = stringHelper.screens;

  const doLogin = async () => {
    if (!loading) {
      if (password === '' || email === '') {
        showAlert(stringHelper.auth.fillData);
        setAlertShown(true);
      } else if (!validateEmail(email)) {
        showAlert(stringHelper.auth.emailInvalid);
        setAlertShown(true);
      } else if (password.length < 4) {
        showAlert(stringHelper.auth.passwordLength);
        setAlertShown(true);
      } else {
        setLoading(true);
        dispatch(userLogin(email, password))
          .then(() => {
            navigation.reset({
              index: 0,
              routes: [{name: screenNames.mainStack}],
            });
          })
          .catch((err) => {
            setLoading(false);
            setAlertShown(true);
            showAlert(err);
          });
      }
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.scrollViewStyle}>
      <Header
        centerText={stringHelper.screens.login}
        leftPress={() => navigation.goBack()}
        leftIcon={stringHelper.icons.return}
        leftText={stringHelper.back}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={[
          styles.container,
          alertShown && {
            backgroundColor: Colors.BACKGROUND_LITE_BLACK,
          },
        ]}>
        <Image source={fitness} tintColor={Colors.LOGO}   style={styles.imageStyle} />
        <Text style={styles.text}>{stringHelper.welcome}</Text>
        <FormInput
          value={email}
          placeholderText="Email"
          onChangeText={(userEmail) => setEmail(userEmail)}
          autoCapitalize="none"
          keyboardType="email-address"
          autoCorrect={false}
          autoFocus={true}
        />
        <FormInput
          value={password}
          placeholderText="Password"
          onChangeText={(userPassword) => setPassword(userPassword)}
          secureTextEntry={true}
        />
        <Button
          onPress={() => doLogin()}
          buttonStyle={[
            styles.buttonStyle,
            {
              backgroundColor:
                email && password
                  ? Colors.PRIMARY_COLOR
                  : Colors.BUTTON_DEACTIVE_COLOR,
            },
          ]}
          containerStyle={styles.buttonContainerStyle}
          titleStyle={{
            color:
              email && password ? Colors.WHITE_COLOR : Colors.FORMINPUT_COLOR,
          }}
          title={stringHelper.auth.login}
          loading={loading}
        />
        <Button
          buttonStyle={styles.forgotPassBtnStyle}
          onPress={() =>
            navigation.navigate(stringHelper.screens.forgetPassword)
          }
          type="clear"
          titleStyle={styles.forgotPassBtnTextStyle}
          title={stringHelper.auth.forgetPassword}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.DATE_COLOR,
    flex: 1,
    alignItems: 'center',
  },
  align: {
    alignItems: 'center',
  },
  buttonStyle: {
    width: valueConstant.formItemWidth,
    height: valueConstant.formItemHeight,
    borderRadius: 10,
    borderWidth: 0,
    marginTop: 24, //36-12
  },
  imageStyle: {
    marginTop: 39,
    width: 130,
    height: 130,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: Colors.WHITE_COLOR,
  },

  forgotPassBtnTextStyle: {
    marginTop: 6,
    fontSize: 15,
    textAlign: 'center',
    color: Colors.WHITE_COLOR,
  },
  forgotPassBtnStyle: {
    marginTop: 25,
    padding: 10,
    paddingHorizontal: 15,
  },
  buttonContainerStyle: {alignItems: 'center'},
  scrollViewStyle: {flex: 1, backgroundColor: Colors.DATE_COLOR,},
});

export default Login;
