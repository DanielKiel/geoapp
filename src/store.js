import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    geoCoordinates: [],
    locations: [],
    minerals: [],
    galleries: []
  },
  mutations: {
    setGeoCoordinates(state, geoCoordinates) {
      this.state.geoCoordinates = geoCoordinates
    }
  },
  actions: {

  }
})
