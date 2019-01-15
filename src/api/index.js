import axios from 'axios'

export default class API {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://transparency-api.mybit.io/',
    });
  }
    
  async getProjects() {
    return await this.instance.get('/projects')
    .then((response) => response.data)
  }
}