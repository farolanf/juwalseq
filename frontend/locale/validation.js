const messages = {
  mixed: {
    required: 'harus diisi',
  },
  string: {
    min: 'minimal ${min} karakter',
    max: 'maximal ${max} karakter',
    email: 'harus berupa alamat email',
  },
  number: {
    min: ({ min }) => 'minimal ' + Intl.NumberFormat().format(min),
    max: ({ max }) => 'maximal ' + Intl.NumberFormat().format(max),
  },
  test: {
    uniqueEmail: 'email sudah terdaftar',
    passwordConfirm: 'kedua password harus sama',
  }
}

export default messages