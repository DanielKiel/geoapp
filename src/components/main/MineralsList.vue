<template>
    <div>
        <b-input-group prepend="Suchen" class="sticky-top">
            <b-form-input v-model="query"></b-form-input>
            <b-input-group-append>
                <b-btn variant="success" disabled><font-awesome-icon icon="search"></font-awesome-icon></b-btn>
                <b-btn variant="secondary" :disabled="type == 'list'" @click="$store.commit('setMineralViewType', 'list')">
                    <font-awesome-icon icon="list"></font-awesome-icon>
                </b-btn>
                <b-btn variant="secondary" :disabled="type == 'table'" @click="$store.commit('setMineralViewType', 'table')">
                    <font-awesome-icon icon="table"></font-awesome-icon>
                </b-btn>
                <b-btn v-if="type == 'table'" variant="secondary" :disabled="showSettings" @click="showSettings = ! showSettings"><font-awesome-icon icon="cog"></font-awesome-icon></b-btn>
            </b-input-group-append>
        </b-input-group>

        <span id="view_active_mineral"></span>
        <b-card v-if="activeMineral.id !== undefined">
            <b-card-header>
                {{activeMineral.title}}
            </b-card-header>
            <b-card-body>
                <b-img :src="activeMineral.poster.path" fluid />
                <div><span v-html="activeMineral.description"></span></div>
                <b-list-group>
                    <b-list-group-item>Farbe {{activeMineral.color}}</b-list-group-item>
                    <b-list-group-item>Härtegrad: {{activeMineral.hardness}}</b-list-group-item>
                    <b-list-group-item>Dichte: {{activeMineral.density_from}} bis {{activeMineral.density_to}}</b-list-group-item>
                    <b-list-group-item>Formel: {{activeMineral.chemical_formula}}</b-list-group-item>
                    <b-list-group-item>Kennzeichnung: {{activeMineral.typicality}}</b-list-group-item>
                    <b-list-group-item>Chrystal-Systematik: {{activeMineral.crystal_system}}</b-list-group-item>
                    <b-list-group-item>Strichfarbe: {{activeMineral.streal_colour}}</b-list-group-item>
                    <b-list-group-item>Opazität: {{activeMineral.opacity}}</b-list-group-item>
                    <b-list-group-item>Glanz: {{activeMineral.lustre}}</b-list-group-item>
                    <b-list-group-item>IMA Status: {{activeMineral.ima_state}}</b-list-group-item>
                    <b-list-group-item>Benennung: {{activeMineral.naming}}</b-list-group-item>
                    <b-list-group-item>Synonyme: {{activeMineral.synonyms}}</b-list-group-item>
                </b-list-group>
            </b-card-body>
            <b-card-footer>
                <b-button @click="activeMineral= {}" v-scroll-to="'#min_' + activeMineral.id"><font-awesome-icon icon="window-close"></font-awesome-icon></b-button>
            </b-card-footer>
        </b-card>

        <b-card v-if="minerals.length == 0 && query != ''">
            Keine Mineralien gefunden
        </b-card>

        <div v-if="type == 'list'">
            <b-card-group columns>
                <b-card v-for="(mineral, key) in minerals" :key="key" :id="'min_' + mineral.id"
                        :title="mineral.title"
                        :img-src="mineral.poster.path"

                        :img-alt="mineral.poster.title"
                        img-top
                >
                    <div slot="footer">
                        <b-button size="sm" v-scroll-to="'#view_active_mineral'" variant="secondary" @click="activeMineral = mineral"><font-awesome-icon icon="eye" /> </b-button>
                    </div>
                </b-card>
            </b-card-group>
        </div>
        <div v-else-if="type == 'table'">
            <div v-if="showSettings">
                <b-form-group label="Felder anzeigen">
                    <b-form-checkbox :checked="field.isActive" @change="changeFieldActivity(key)" v-for="(field, key) in allFields" :key="key" :name="field.label">{{field.label}}</b-form-checkbox>
                </b-form-group>


                <b-button @click="showSettings = false"><font-awesome-icon icon="window-close"></font-awesome-icon></b-button>
            </div>

            <b-table striped hover responsive :items="minerals" :fields="settings" ref="table">

                <template slot="density" slot-scope="row">{{row.item.density_from}} bis {{row.item.density_to}}</template>
                <template slot="show_details" slot-scope="row">
                    <span :id="'min_' + row.item.id"></span>
                    <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
                    <b-button size="sm" v-scroll-to="'#view_active_mineral'" variant="secondary" @click="activeMineral = row.item"><font-awesome-icon icon="eye" /> </b-button>
                </template>

            </b-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MineralsList",
        computed: {
            minerals() {
                return this.$store.state.minerals.filter( mineral => {
                    if (this.query == '') {
                        return true
                    }

                    let regex = new RegExp('.*' + this.query + '.*', 'ig')

                    let result = regex.test(mineral.title)

                    return result
                } )
            },
            type() {
                return this.$store.state.mineralViewType
            },
            allFields() {
                return this.$store.state.mineralViewFields
            },
            settings() {
                return this.$store.state.mineralViewFields.filter(field => {
                    return field.isActive
                })
            }
        },
        data: function() {
            return {
                query: '',
                activeMineral: {},
                showSettings: false,
                fields: this.allFields
            }
        },
        methods: {
            changeFieldActivity(key) {
                this.$store.commit('setMineralViewFields', key)
                this.$refs.table.refresh()
            }
        }
    }
</script>

<style scoped>

</style>