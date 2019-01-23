import axios from 'axios'
import projects from '../mocks/projects';

export default class API {
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://transparency-api.mybit.io/',
    });
  }
    
  // async getProjects() {
  //   return await this.instance.get('/projects')
  //   .then((response) => response.data)
  // }
  
  async getProjects() {
    return new Promise((res,rej) => {
      setTimeout(() => 
        res(projects.data)
      , 3000)
    })
  }
}