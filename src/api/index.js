import axios from 'axios'
import projects from '../mocks/projects';
import components from '../mocks/components';

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
      , 1000)
    })
  }
  
  async getProject(id) {
    return new Promise((res,rej) => {
      setTimeout(() => 
        // Intentionally using '==' as json is parsed as string
        res(projects.data[projects.data.findIndex(project => project.id == id)])
      , 1000)
    })
  }
  
  async getProjectComponents(id) {
    return new Promise((res,rej) => {
      setTimeout(() => 
        res(components.data)
      , 1000)
    })
  }
}