import Vue from 'vue'
import Vuex from 'vuex'
import vuejsStorage from 'vuejs-storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadingGeoCcordinates: true,
    loadingMinerals: true,
    loadingGalleries: true,
    showMapsMarkersCloud: false,
    geoCoordinates: [],
    locations: [],
    minerals: [],
    galleries: {
      data: []
    },
    mineralViewType: 'list',
    mineralViewFields: [
        {
            key: "show_details",
            label: "",
            sortable: true,
            isActive: true
        },
        {
            key: "title",
            label: "Titel",
            sortable: true,
            isActive: true
        },
        {
            key: "color",
            label: "Farbe",
            sortable: true,
            isActive: true
        },
        {
            key: "hardness",
            label: "Härtegrad",
            sortable: true,
            isActive: true
        },
        {
            key: 'density',
            label: "Dichte",
            isActive: true
        },
        {
            key:"chemical_formula",
            label: "Formel",
            isActive: true
        },
        {
            key: "typicality",
            label: "Kennzeichnung",
            isActive:false
        },
        {
            key: "crystal_system",
            label: "Chrystal-Systematik",
            isActive:false
        },
        {
            key: "streal_colour",
            label: "Strichfarbe",
            isActive:false
        },
        {
            key: "opacity",
            label: "Opazität",
            isActive:false
        },
        {
            key: "lustre",
            label: "Glanz",
            isActive:false
        },
        {
            key: "ima_state",
            label: "IMA Status",
            isActive:false
        },
        {
            key: "naming",
            label: "Benennung",
            isActive:false
        },
        {
            key: "synonyms",
            label: "Synonyme",
            isActive:false
        }
    ],
    timestamps: {},
    lastMineralsUpdate: null,
    lastGeosUpdate: null,
  },
  mutations: {
    setGeoCoordinates(state, geoCoordinates) {
      this.state.geoCoordinates = geoCoordinates
        this.state.lastGeosUpdate = new Date()
    },

    setGalleries(state, galleries) {
        this.state.galleries = galleries
    },

    setMinerals(state, minerals) {
      this.state.minerals = minerals
      this.state.lastMineralsUpdate = new Date()
    },

    setLastMineralsUpdate(state) {
      this.state.lastMineralsUpdate = new Date()
    },

    setMineralViewType(state, type) {
      this.state.mineralViewType = type
    },

    setMineralViewFields(state, key) {
      this.state.mineralViewFields[key].isActive = ! this.state.mineralViewFields[key].isActive
    },

    freshTimestamps(state, timestamps) {
      this.state.timestamps = timestamps
    },

    finishLoadingGeoCoordinates(state) {
      this.state.loadingGeoCcordinates = false
    },

    finishLoadingMinerals(state) {
      this.state.loadingMinerals = false
    },

    finishLoadingGalleries(state) {
      this.state.loadingGalleries = false
    },

    changeShowMapsMarkersCloud(state) {
      this.state.showMapsMarkersCloud = ! this.state.showMapsMarkersCloud
    }
  },
  actions: {

  },
    plugins: [
        vuejsStorage({
            keys: ['mineralViewType', 'minerals', 'lastMineralsUpdate','lastGeosUpdate', 'geoCoordinates','mineralViewFields'],
            //keep state.count in localStorage
            namespace: 'geoapp',
        })
    ]
})
