import * as jwt from 'jwt-decode';


const checkRole = () => {

  let token = localStorage.getItem('mtTokenSporter')
  return jwt(token, {
    complete: true
  })
}

export default checkRole