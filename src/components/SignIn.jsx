import { useFormik } from 'formik';
import Text from './Text';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 8,
    backgroundColor: theme.colors.backgroundOnBackground,
  },
  buttonText: {
    textAlign: 'center',
    color: theme.colors.textOnPrimary,
    backgroundColor: theme.colors.primary,
  },
  button: {
    flexGrow: 0,
    borderRadius: 3,
    padding: 4,
    backgroundColor: theme.colors.primary,
    borderStyle: 'solid',
  },
  textField: {
    fontSize: theme.fontSizes.heading,
    borderRadius: 3,
    padding: 4,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  textFieldError: {
    borderColor: theme.colors.error,
  },

});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({onSubmit}) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[styles.textField, formik.touched.username && formik.errors.username && styles.textFieldError]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        secureTextEntry
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={[styles.textField, formik.touched.password && formik.errors.password && styles.textFieldError]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontSize='heading' backgroundColor='primary' color='textOnPrimary' style={styles.buttonText} >Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
const [signIns] = useSignIn();

  const onSubmit = async (values) => {
    console.log(values);
    const { username, password } = values;

    try {
      const { data } = await signIns({ username, password });
      console.log('signIn data', data);
    } catch (error) {
      console.log('error at signIn', error);
    }
  }
   
  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;