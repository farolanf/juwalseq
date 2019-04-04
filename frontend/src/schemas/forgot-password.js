import * as yup from 'yup'

export default yup.object().shape({
  registeredEmail: yup.string().email().required()
})
