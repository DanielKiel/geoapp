export default class Minerals {
    fetch() {
        return new Promise( (resolve, reject) => {
            axios({
                method: 'GET',
                url: AppConfig.api.url + '/api/v1/minerals'
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