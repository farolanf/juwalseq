import qs from 'qs'
import axios from 'axios'
import { setLocale } from 'yup'
import { configure } from 'mobx'
import { verify } from '$src/lib/auth'
import messages from '$prj/locale/validation'

axios.defaults.paramsSerializer = params => qs.stringify(params)

// yup doesn't support unknown messages
const _messages = Object.assign({}, messages)
delete _messages.test

setLocale(_messages)

configure({
  enforceActions: 'always',
})

verify()
