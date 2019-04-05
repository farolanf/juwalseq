import * as yup from 'yup'
import messages from '$prj/locale/validation'

export default yup.object().shape({
  password: yup.string().min(5).max(100).required(),
  passwordConfirm: yup.string().required()
    .test('passwordConfirm', messages.test.passwordConfirm, function (value) {
      return value === this.parent.password
    }),
})
