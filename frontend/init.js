import '$assets/css/global.css'
import { setLocale } from 'yup'
import { configure } from 'mobx'
import { verify } from '$src/lib/auth'
import messages from '$prj/locale/validation'

// yup doesn't support unknown messages
const _messages = Object.assign({}, messages)
delete _messages.test

setLocale(_messages)

configure({
  enforceActions: 'always',
})

verify()
