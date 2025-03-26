import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as yup from 'yup';
import { useFormik } from "formik";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

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
  username: yup.string().required('Username is required')
            .min(5, 'Username has to be at least 5 characters long')
            .max(30, 'Username cannot be longer than 30 characters'),
  password: yup.string().required('Password is required')
            .min(5, 'Passsword has to be at least 5 characters long')
            .max(30, 'Password cannot be longer than 30 characters'),
  passwordConfirm: yup.string()
     .oneOf([yup.ref('password')], 'Password confirmation doesn\'t match the password')
     .required('Password confirmation is required')
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const SignUpContainer = ({onSubmit}) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })
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
      <TextInput
        secureTextEntry
        placeholder='Password confirmation'
        value={formik.values.passwordConfirm}
        onChangeText={formik.handleChange('passwordConfirm')}
        style={[styles.textField, formik.touched.passwordConfirm && formik.errors.passwordConfirm && styles.textFieldError]}
      />
      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{ color: 'red' }}>{formik.errors.passwordConfirm}</Text>
      )}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text fontSize='heading' backgroundColor='primary' color='textOnPrimary' style={styles.buttonText} >Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [createUser] = useSignUp(); 
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async ({ username, password }) => {
    try {
      await createUser({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (error) {
      console.log('error at SignUp', error);
    }
  }
  return <SignUpContainer onSubmit={onSubmit} />
};

export default SignUp;