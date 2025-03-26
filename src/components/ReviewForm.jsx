import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text"
import theme from "../theme";
import { useFormik } from "formik";
import * as yup from 'yup';
import useCreateReview from "../hooks/useCreateReview";
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

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Owner\'s usernamename is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number('Rating should be an integer from 0 to 100')
    .required('Rating is required')
    .positive('Lowest allowed rating is 0')
    .integer('Rating should be an integer')
    .max(100, 'Highest allowed rating is 100'),
  text: yup.string(),
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
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        style={[styles.textField, formik.touched.ownerName && formik.errors.ownerName && styles.textFieldError]}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        style={[styles.textField, formik.touched.repositoryName && formik.errors.repositoryName && styles.textFieldError]}
        />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text>
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
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        multiline
        style={styles.textField}
      />
      {formik.touched.text && formik.errors.text && (
        <Text style={{ color: 'red' }}>{formik.errors.text}</Text>
      )}
      <Pressable style={styles.button} onPress={ formik.handleSubmit } >
        <Text style={styles.buttonText}>Create review</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview, result] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview(values);
      console.log('createReview data', data);
      navigate(`/repositories/${data.createReview.repositoryId}`);
    } catch (error) {
      console.log('error at createReview', error);
    }
  }
    
  return  <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;