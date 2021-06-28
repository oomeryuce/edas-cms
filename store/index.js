export const state = () => ({
  sss: null,
  sTypes: null,
  updateData: null,
  news: null,
  energyManagement: null,
  cities:null,
  notifications: null,
  uploadedImage: null,
})
export const mutations = {
  setSSS(state, payload) {
    state.sss = payload
  },
  setSTypes(state, payload) {
    state.sTypes = payload
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
  setUploadImage(state, payload) {
    state.uploadedImage = payload
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
      const response = await this.$axios.get('/Sss/Get')
      if (response.data.isSuccess){
        await commit('setSSS', response.data.entityData)
      } else {
        alert(response.data.message)
        await commit('setSSS', [])
      }
    }catch( err ) {
      alert(err)
    }
  },
  async getSTypes({ commit, dispatch }){
    try {
      const response = await this.$axios.get('/Sss/GetSssTypes')
      if (response.data.isSuccess){
        await commit('setSTypes', response.data.entityData)
      } else {
        alert(response.data.message)
        await commit('setSTypes', [])
      }
    }catch( err ) {
      alert(err)
    }
  },
  async getListNews({ commit, dispatch }){
    try {
      const response = await this.$axios.get('/News/Get')
      if (response.data.isSuccess){
        await commit('setNews', response.data.entityData)
      } else {
        alert(response.data.message)
        await commit('setNews', [])
      }
    }catch( err ) {
      alert(err)
    }
  },
  async getEnergyItems({ commit, dispatch }){
    try {
      const response = await this.$axios.get('/EnerjiYonetimi/Get')
      if (response.data.isSuccess){
        await commit('setEnergyManagement', response.data.entityData)
      } else {
        alert(response.data.message)
        await commit('setEnergyManagement', [])
      }
    }catch( err ) {
      alert(err)
    }
  },
  async getListCity({ commit, dispatch }){
    try {
      const response = await this.$axios.get(
        '/MobilCity/Get'
      )
      if (response.data.isSuccess){
        await commit('setCities', response.data.entityData)
      } else {
        alert(response.data.message)
        await commit('setCities', [])
      }
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
      const response = await this.$axios.get('/Sss/GetById?id=' + id)
      if (response.data.isSuccess){
        await commit('setUpdateData', response.data.entityData)
      } else {
        alert(response.data.message)
        await commit('setUpdateData', [])
      }
    }catch( err ) {
      alert(err)
    }
  },
  async getNewsById({ commit, dispatch }, id){
    try {
      const response = await this.$axios.get('/News/GetById?id=' + id)
      if (response.data.isSuccess){
        await commit('setUpdateData', response.data.entityData)
      } else {
        alert(response.data.message)
        await commit('setUpdateData', [])
      }
    }catch( err ) {
      alert(err)
    }
  },
  async getEnergyById({ commit, dispatch }, id){
    try {
      const response = await this.$axios.get('/EnerjiYonetimi/GetById?id=' + id)
      if (response.data.isSuccess){
        await commit('setUpdateData', response.data.entityData)
      } else {
        alert(response.data.message)
        await commit('setUpdateData', [])
      }
    }catch( err ) {
      alert(err)
    }
  },
  async getCityById({ commit, dispatch }, id){
    try {
      const response = await this.$axios.get(
        '/MobilCity/GetById?id=' + id,
      )
      if (response.data.isSuccess){
        await commit('setUpdateData', response.data.entityData)
      } else {
        alert(response.data.message)
        await commit('setUpdateData', [])
      }
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
  async addSSS({ commit, dispatch }, payload){
    try {
      const response = await this.$axios.post(
        '/Sss/Add', payload
      )
      if (response.data.isSuccess){
        await dispatch('getListSSS')
      }else {
        alert(response.data.message)
      }
    }catch( err ) {
      alert(err)
    }
  },
  async addNews({ commit, dispatch }, payload){
    try {
      const response = await this.$axios.post(
        '/News/Add', payload
      )
      console.log(payload)
      if (response.data.isSuccess){
        await dispatch('getListNews')
      }else {
        alert(response.data.message)
      }
    }catch( err ) {
      alert(err)
    }
  },
  async addEnergyModel({ commit, dispatch }, payload){
    try {
      const response = await this.$axios.post(
        '/EnerjiYonetimi/Add', payload
      )
      if (response.data.isSuccess){
        await dispatch('getEnergyItems')
      }else {
        alert(response.data.message)
      }
    }catch( err ) {
      alert(err)
    }
  },
  async addCity({ commit, dispatch }, payload){
    try {
      const response = await this.$axios.post(
        '/MobilCity/Add', payload
      )
      if (response.data.isSuccess){
        await dispatch('getListCity')
      }else {
        alert(response.data.message)
      }
    }catch( err ) {
      alert(err)
    }
  },
  async updateEnergyModel({ commit, dispatch }, payload){
    try {
      const response = await this.$axios.post(
        '/EnerjiYonetimi/Update', payload
      )
      if (response.data.isSuccess){
        await dispatch('getEnergyItems')
      }else {
        alert(response.data.message)
      }
    }catch( err ) {
      alert(err)
    }
  },
  async updateNews({ commit, dispatch }, payload){
    try {
      const response = await this.$axios.post(
        '/News/Update', payload
      )
      if (response.data.isSuccess){
        await dispatch('getListNews')
      }else {
        alert(response.data.message)
      }
    }catch( err ) {
      alert(err)
    }
  },
  async updateSSS({ commit, dispatch }, payload){
    try {
      const response = await this.$axios.post(
        '/Sss/Update', payload
      )
      if (response.data.isSuccess){
        await dispatch('getListSSS')
      }else {
        alert(response.data.message)
      }
    }catch( err ) {
      alert(err)
    }
  },
  async updateCity({ commit, dispatch }, payload){
    try {
      const response = await this.$axios.post(
        '/MobilCity/Update', payload
      )
      if (response.data.isSuccess){
        await dispatch('getListCity')
      }else {
        alert(response.data.message)
      }
    }catch( err ) {
      alert(err)
    }
  },
  async updateNotf({ commit, dispatch }, payload){
    try {
      /*const response = await this.$axios.post(
        '/City/Update', payload
      )*/
      await dispatch('getListNotf')
    }catch( err ) {
      alert(err)
    }
  },
  async addNotf({ commit, dispatch }, payload){
    try {
      /*const response = await this.$axios.post(
        '/City/Add', payload
      )*/
      console.log(payload)
      await dispatch('getListNotf')
    }catch( err ) {
      alert(err)
    }
  },
  async deleteSSS({ commit, dispatch }, id){
    try {
      const response = await this.$axios.post(
        '/Sss/Remove?id=' + id,
      )
      if (response.data.isSuccess){
        await dispatch('getListSSS')
      }else {
        alert(response.data.message)
      }
    }catch( err ) {
      alert(err)
    }
  },
  async deleteNews({ commit, dispatch }, id){
    try {
      const response = await this.$axios.post(
        '/News/Remove?id=' + id,
      )
      if (response.data.isSuccess){
        await dispatch('getListNews')
      }else {
        alert(response.data.message)
      }
    }catch( err ) {
      alert(err)
    }
  },
  async deleteEnergyItem({ commit, dispatch }, id){
    try {
      const response = await this.$axios.post(
        '/EnerjiYonetimi/Remove?id=' + id,
      )
      if (response.data.isSuccess){
        await dispatch('getEnergyItems')
      }else {
        alert(response.data.message)
      }
    }catch( err ) {
      alert(err)
    }
  },
  async deleteCity({ commit, dispatch }, id){
    try {
      const response = await this.$axios.post(
        '/MobilCity/Remove?id=' + id,
      )
      if (response.data.isSuccess){
        await dispatch('getListCity')
      }else {
        alert(response.data.message)
      }
    }catch( err ) {
      alert(err)
    }
  },
  async deleteNotf({ commit, dispatch }, id){
    try {
      /*const response = await this.$axios.delete(
        '/Sss/Remove/' + id,
      )*/
      console.log(id)
      await dispatch('getListNotf')
    }catch( err ) {
      alert(err)
    }
  },
  async uploadImage({ commit, dispatch }, payload){
    try {
      const response = await this.$axios.post(
        '/Users/Upload', payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      )
      console.log(response.data)
      await commit('setUploadImage', response.data.fileName)
    }catch( err ) {
      alert(err)
    }
  }
}
