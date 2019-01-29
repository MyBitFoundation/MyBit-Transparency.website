import axios from 'axios'
import projects from '../mocks/projects';
import components from '../mocks/components';

class MockAPI {
  async get(path) {
    const method = path.substring(1);
    return await this[method]();
  } 
  async projects() {
    console.log('[ Mock API ] projects | init');
    return new Promise((res,rej) => {
      setTimeout(() => 
        res(projects)
      , 1000)
    })
  }
  
  async project(id) {
    return new Promise((res,rej) => {
      setTimeout(() => 
        // Intentionally using '==' as json is parsed as string
        res(projects.data[projects.data.findIndex(project => project.id == id)])
      , 1000)
    })
  }
  
  async components(id) {
    return new Promise((res,rej) => {
      setTimeout(() => 
        res(components.data)
      , 1000)
    })
  }
}

export default class API {
  constructor() {
    const DEVELOPMENT_MODE = false;
    this.instance = DEVELOPMENT_MODE ? 
      new MockAPI() :
      axios.create({
        baseURL: 'https://transparency-api.mybit.io/',
      });
    this.categoryIconMap = {
      chat: 'chat',
      message_board: 'chat_bubble',
      schedule: 'date_range',
      questionnaire: 'access_time',
      vault: 'description',
      inbox: 'email',
      todoset: 'list'
    }
    this.categoryDescriptionMap = {
      chat: 'Conversations around this project.',
      message_board: 'All team posts and public messages',
      schedule: 'An overview of our milestones',
      questionnaire: 'Our weekly and daily checkins',
      vault: 'Documents related to this project',
      inbox: 'Our inbox by and for the community',
      todoset: 'Tasks for all project team members'
    }
  }
  
  getIconFromCategory(category) {
    return this.categoryIconMap[category];
  }
  
  getDescriptionFromCategory(category) {
    return this.categoryDescriptionMap[category];
  }
    
  async getProjects() {
    return await this.instance.get('/projects')
    .then((response) => response.data)
  }
  
  async getProject(id) {
    return await this.instance.post('/project', { id: id} )
    .then((response) => response.data)
  }
}