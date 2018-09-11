export default class Galleries {
    fetch(url) {
        if (url === undefined) {
            url = AppConfig.api.url + '/api/v1/galleries'
        }

        return new Promise( (resolve, reject) => {
            axios({
                method: 'GET',
                url: url
            })
                .then( response => {
                    resolve(response.data)
                } )
                .catch( error => {
                    reject(error)
                } )
        } )
    }

    fetchOne(id) {
        return new Promise( (resolve, reject) => {
            axios({
                method: 'GET',
                url: AppConfig.api.url + '/api/v1/gallery/' + id
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