import axios from 'axios';

class ServiceAPI {
  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      responseType: 'json',
    });

    this.instance.interceptors.request.use((config) => {
      config.headers.Authorization = `Authorization: {storage.accessToken.Get()}`;
      return config;
    });
  }

  // SerivceAPI().SignIn(email, password).then(data => {}).catch(error => setState(error))
  SignIn(email, password) {
    return this.instance.post('/signin', {
      email: email,
      password: password,
    });
  }
}
