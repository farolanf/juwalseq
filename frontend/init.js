import { configure } from 'mobx'
import { verify } from '$src/lib/auth'

configure({
  enforceActions: 'always',
})

verify()
