const React = require('react')

const ForgotPassword = ({ url = '{{url}}' }) => (
  <div>
    <h2>Reset password</h2>
    <p>Klik link berikut untuk mengganti password anda.</p>
    <p><a href={url}>{url}</a></p>
    <p>Silahkan abaikan email ini jika anda tidak meminta reset password.</p>
  </div>
)

module.exports = ForgotPassword