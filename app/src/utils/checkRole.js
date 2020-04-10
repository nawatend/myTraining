import * as jwt from 'jwt-decode';


const checkRole = () => {

  let token = localStorage.getItem('mtToken')
  return jwt(token, {
    complete: true
  })
}

export default checkRole