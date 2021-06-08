export const state = () => ({
  sss: null,
  updateData: null,
  news: null,
  energyManagement: null,
  cities:null,
  notifications: null,
})
export const mutations = {
  setSSS(state, payload) {
    state.sss = payload
  },
  setNews(state, payload) {
    state.news = payload
  },
  setUpdateData(state, payload) {
    state.updateData = payload
  },
  setEnergyManagement(state, payload) {
    state.energyManagement = payload
  },
  setCities(state, payload) {
    state.cities = payload
  },
  setNotf(state, payload) {
    state.notifications = payload
  },
}
export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
}
export const actions = {
  async getListSSS({ commit, dispatch }){
    try {
      /*const response = await this.$axios.post(
        '/dev-api/io/1.0/expert/calculator/skills/' + uuid,
        data[0]
      )*/
      let data = [
        {
          id: 1,
          question: 'Test 1',
          answer: 'Test 1 Content',
          status: true,
        },
        {
          id: 2,
          question: 'Test 2',
          answer: 'Test 2 Content',
          status: false,
        },
        {
          id: 3,
          question: 'Test 3',
          answer: 'Test 3 Content',
          status: true,
        },
      ]
      await commit('setSSS', data)
    }catch( err ) {
      alert(err)
    }
  },
  async getListNews({ commit, dispatch }){
    try {
      /*const response = await this.$axios.post(
        '/dev-api/io/1.0/expert/calculator/skills/' + uuid,
        data[0]
      )*/
      let data = [
        {
          id: 1,
          title: 'Test 1',
          content: 'Test 1 Content',
          link: 'www.google.com',
          image: 'www.google.com/image',
          status: true,
        },
        {
          id: 2,
          title: 'Test 2',
          content: 'Test 2 Content',
          link: 'www.google.com',
          image: 'www.google.com/image',
          status: false,
        },
        {
          id: 3,
          title: 'Test 3',
          content: 'Test 3 Content',
          link: 'www.google.com',
          image: 'www.google.com/image',
          status: true,
        },
      ]
      await commit('setNews', data)
    }catch( err ) {
      alert(err)
    }
  },
  async getEnergyItems({ commit, dispatch }){
    try {
      /*const response = await this.$axios.post(
        '/dev-api/io/1.0/expert/calculator/skills/' + uuid,
        data[0]
      )*/
      let data = [
        {
          id: 1,
          title: 'Test 1',
          icon: 'Test 1 İkon',
          consumption: 1.2,
          daily: 6.4,
          qty: 2,
          work_time: 5,
          weekly: 4,
          yearly: 5,
          status: true,
        },
        {
          id: 2,
          title: 'Test 2',
          icon: 'Test 2 İkon',
          consumption: 1.2,
          daily: 6.4,
          qty: 2,
          work_time: 5,
          weekly: 4,
          yearly: 5,
          status: true,
        },
        {
          id: 3,
          title: 'Test 3',
          icon: 'Test 3 İkon',
          consumption: 1.2,
          daily: 6.4,
          qty: 2,
          work_time: 5,
          weekly: 4,
          yearly: 5,
          status: true,
        },
        {
          id: 4,
          title: 'Test 4',
          icon: 'Test 4 İkon',
          consumption: 1.2,
          daily: 6.4,
          qty: 2,
          work_time: 5,
          weekly: 4,
          yearly: 5,
          status: false,
        },
        {
          id: 5,
          title: 'Test 5',
          icon: 'Test 5 İkon',
          consumption: 1.2,
          daily: 6.4,
          qty: 2,
          work_time: 5,
          weekly: 4,
          yearly: 5,
          status: true,
        },
        {
          id: 6,
          title: 'Test 6',
          icon: 'Test 6 İkon',
          consumption: 1.2,
          daily: 6.4,
          qty: 2,
          work_time: 5,
          weekly: 4,
          yearly: 5,
          status: false,
        },
      ]
      await commit('setEnergyManagement', data)
    }catch( err ) {
      alert(err)
    }
  },
  async getListCity({ commit, dispatch }){
    try {
      /*const response = await this.$axios.post(
        '/dev-api/io/1.0/expert/calculator/skills/' + uuid,
        data[0]
      )*/
      let data = [
        {
          id: 1,
          title: 'Test 1',
          image: 'Test 1 İmage',
          status: true,
        },
        {
          id: 2,
          title: 'Test 2',
          image: 'Test 2 İmage',
          status: true,
        },
        {
          id: 3,
          title: 'Test 3',
          image: 'Test 3 İmage',
          status: false,
        },
      ]
      await commit('setCities', data)
    }catch( err ) {
      alert(err)
    }
  },
  async getListNotf({ commit, dispatch }){
    try {
      /*const response = await this.$axios.post(
        '/dev-api/io/1.0/expert/calculator/skills/' + uuid,
        data[0]
      )*/
      let data = [
        {
          id: 1,
          title: 'Test 1',
          content: 'Test 1 Content',
          sentDate: new Date().toISOString(),
        },
        {
          id: 2,
          title: 'Test 2',
          content: 'Test 2 Content',
          sentDate: false,
        },
        {
          id: 3,
          title: 'Test 3',
          content: 'Test 3 Content',
          sentDate: false,
        },
      ]
      await commit('setNotf', data)
    }catch( err ) {
      alert(err)
    }
  },
  async getSSSById({ commit, dispatch }, id){
    try {
      /*const response = await this.$axios.post(
        '/dev-api/io/1.0/expert/calculator/skills/' + uuid,
        data[0]
      )*/
      let data = this.state.sss
      let response = null
      data.forEach(function(item){
        if (item.id == id){
          response = item
        }
      })
      await commit('setUpdateData', response)
    }catch( err ) {
      alert(err)
    }
  },
  async getNewsById({ commit, dispatch }, id){
    try {
      /*const response = await this.$axios.post(
        '/dev-api/io/1.0/expert/calculator/skills/' + uuid,
        data[0]
      )*/
      let data = this.state.news
      console.log(data)
      let response = null
      data.forEach(function(item){
        if (item.id == id){
          response = item
        }
      })
      await commit('setUpdateData', response)
    }catch( err ) {
      alert(err)
    }
  },
  async getEnergyById({ commit, dispatch }, id){
    try {
      /*const response = await this.$axios.post(
        '/dev-api/io/1.0/expert/calculator/skills/' + uuid,
        data[0]
      )*/
      let data = this.state.energyManagement
      let response = null
      data.forEach(function(item){
        if (item.id == id){
          response = item
        }
      })
      await commit('setUpdateData', response)
    }catch( err ) {
      alert(err)
    }
  },
  async getCityById({ commit, dispatch }, id){
    try {
      /*const response = await this.$axios.post(
        '/dev-api/io/1.0/expert/calculator/skills/' + uuid,
        data[0]
      )*/
      let data = this.state.cities
      let response = null
      data.forEach(function(item){
        if (item.id == id){
          response = item
        }
      })
      await commit('setUpdateData', response)
    }catch( err ) {
      alert(err)
    }
  },
  async getNotfById({ commit, dispatch }, id){
    try {
      /*const response = await this.$axios.post(
        '/dev-api/io/1.0/expert/calculator/skills/' + uuid,
        data[0]
      )*/
      let data = this.state.notifications
      let response = null
      data.forEach(function(item){
        if (item.id == id){
          response = item
        }
      })
      await commit('setUpdateData', response)
    }catch( err ) {
      alert(err)
    }
  },
  async addSSS({ commit, dispatch }, data){
    try {
      /*const response = await this.$axios.post(
        '/dev-api/io/1.0/expert/calculator/skills/' + uuid,
        data[0]
      )
      let encrypt = JSON.stringify(this.state.sss)
      let oldData = JSON.parse(encrypt)
      console.log([oldData, oldData])
      oldData.push(data)
      await commit('setSSS', oldData)*/
    }catch( err ) {
      alert(err)
    }
  }
}
