import * as yup from 'yup'
import _ from 'lodash'
import { uniqueEmail } from '$lib/auth';
import messages from '$prj/locale/validation'

const uniqueEmailDebounced = _.debounce(uniqueEmail, 350)

export default yup.object().shape({
  email: yup.string().email().required()
    .test('uniqueEmail', messages.test.uniqueEmail, uniqueEmailDebounced),
  password: yup.string().min(5).max(100),
  passwordConfirm: yup.string()
    .test('passwordConfirm', messages.test.passwordConfirm, function (value) {
      return value === this.parent.password
    }),
})
