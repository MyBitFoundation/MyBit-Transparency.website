import axios from 'axios'
import projects from '../mocks/projects';
import components from '../mocks/components';
import concat from 'ramda/src/concat'
import Q from 'q';

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
        baseURL: 'https://hq-api.mybit.io/',
      });
    this.enabledCategories = {
      chat: false,
      message_board: false,
      schedule: false,
      questionnaire: true,
      vault: true,
      inbox: false,
      todoset: true
    }
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
    this.projects = [];
    this.projectMap = {};
    
    this.WAITING_TIME_IN_MS = 5000;
  }
  
  getIconFromCategory(category) {
    return this.categoryIconMap[category];
  }

  getStatusFromCategory(category) {
    return this.enabledCategories[category];
  }
  
  getDescriptionFromCategory(category) {
    return this.categoryDescriptionMap[category];
  }
  
  /*
  * All methods are stored in memory, in order to make sure the application
  * doesn’t perform calls to our servers while its being used, but on reaload
  * it refreshes everything that has been called.
  */ 
  async getProjects() {
    const projects = this.projects.length > 0 ? 
      this.projects : 
      await this.instance.get('/projects')
        .then((response) => response.data)
    this.projects = projects;
    return projects;
  }

  async getTodoset(projectId, todosetId) {
    const todoset = (project => 
      project && project[todosetId])(this.projectMap[projectId]) ?
      this.projectMap[projectId][todosetId] :
      await this.instance.post('/todoset', { projectId: projectId, todosetId: todosetId })
        .then((response) => response.data)
    this.projectMap[projectId][todosetId] = todoset;
    return todoset;
  }
  
  async getQuestionnaire(projectId, questionnaireId) {
    const questionnaire = (project => 
      project && project[questionnaireId])(this.projectMap[projectId]) ?
      this.projectMap[projectId][questionnaireId] :
      await this.instance.post('/questionnaire', { projectId: projectId, questionnaireId: questionnaireId })
        .then((response) => response.data)
    this.projectMap[projectId][questionnaireId] = questionnaire;
    return questionnaire;
  }
  
  async getDocumentsFromVault(projectId, vaultId) {
    const documents = (project => 
      project && project[vaultId])(this.projectMap[vaultId]) ?
      this.projectMap[projectId][vaultId] :
      await this.instance.post('/vault', { projectId: projectId, vaultId: vaultId })
        .then((response) => response.data)
    this.projectMap[projectId][vaultId] = documents;
    return documents;
  }
  
  async getTodolist(projectId, todolistId) {
    const todolist = (project => 
      project && project[todolistId])(this.projectMap[projectId]) ?
      this.projectMap[projectId][todolistId] :
        (([completedTodos, uncompletedTodos]) =>
          concat(completedTodos.value, uncompletedTodos.value)
        )
        (await Q.allSettled([true, false].map(
          async (completed) =>
            await this.instance.post('/todolist',
              {
                projectId: projectId,
                todolistId: todolistId,
                completed: completed
              })
            .then(response => response.data)
        )))
    this.projectMap[projectId][todolistId] = todolist;
    return todolist;
  }
  
  async getQuestion(projectId, questionId) {
    const question = (project => 
      project && project[questionId])(this.projectMap[projectId]) ?
      this.projectMap[projectId][questionId] :
      await this.instance.post('/question',
        {
          projectId: projectId,
          questionId: questionId
        })
      .then(response => response.data)
    this.projectMap[projectId][questionId] = question;
    return question;
  }
  
  async getDocument(projectId, documentId) {
    const doc = (project => 
      project && project[documentId])(this.projectMap[documentId]) ?
      this.projectMap[projectId][documentId] :
      await this.instance.post('/document',
        {
          projectId: projectId,
          documentId: documentId
        })
      .then(response => response.data)
    this.projectMap[projectId][documentId] = doc;
    return doc;
  }

  async getProject(projectId) {
    const project = this.projectMap[projectId] ?
      this.projectMap[projectId] :
      await this.instance.post('/project', { projectId: projectId } )
        .then((response) => response.data)
    this.projectMap[projectId] = project;
    return project;
  }
}