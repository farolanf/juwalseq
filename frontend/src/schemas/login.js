import * as yup from 'yup'

export default yup.object().shape({
  email: yup.string().required(), // email or username
  password: yup.string().min(5).max(100),
})