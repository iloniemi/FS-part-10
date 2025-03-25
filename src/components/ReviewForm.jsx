import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text"
import theme from "../theme";
import { useFormik } from "formik";
import * as yup from 'yup';

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

const initialValues = {
  owner: '',
  repository: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  owner: yup.string().required('Owner\'s usernamename is required'),
  repository: yup.string().required('Repository name is required'),
  rating: yup.number('Rating should be an integer from 0 to 100')
    .required('Rating is required')
    .positive('Lowest allowed rating is 0')
    .integer('Rating should be an integer')
    .max(100, 'Highest allowed rating is 100'),
  review: yup.string(),
});

const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  })
  return (
    <View style={styles.container} >
      <TextInput
      placeholder='Repository owner'
      value={formik.values.owner}
      onChangeText={formik.handleChange('owner')}
      style={[styles.textField, formik.touched.owner && formik.errors.owner && styles.textFieldError]}
      />
      {formik.touched.owner && formik.errors.owner && (
        <Text style={{ color: 'red' }}>{formik.errors.owner}</Text>
      )}
      <TextInput
      placeholder='Repository name'
      value={formik.values.repository}
      onChangeText={formik.handleChange('repository')}
      style={[styles.textField, formik.touched.repository && formik.errors.repository && styles.textFieldError]}
      />
      {formik.touched.repository && formik.errors.repository && (
        <Text style={{ color: 'red' }}>{formik.errors.repository}</Text>
      )}
      <TextInput
      placeholder='Rating'
      value={formik.values.rating}
      onChangeText={formik.handleChange('rating')}
      inputMode='numeric'
      style={[styles.textField, formik.touched.rating && formik.errors.rating && styles.textFieldError]}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: 'red' }}>{formik.errors.rating}</Text>
      )}
      <TextInput
      placeholder='Review'
      value={formik.values.review}
      onChangeText={formik.handleChange('review')}
      multiline
      style={styles.textField}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit} >
        <Text style={styles.buttonText}>Create review</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {

  const onSubmit = (values) => {
    console.log('values', values);
    
  };
  return  <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;