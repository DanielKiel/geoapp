export default class Timestamps {
    fetch() {
        return new Promise( (resolve, reject) => {
            axios({
                method: 'GET',
                url: AppConfig.api.url + '/api/v1/timestamps'
            })
                .then( response => {
                    resolve(response.data)
                } )
                .catch( error => {
                    reject(error)
                } )
        } )
    }
}