export default class GeoCoordinates {
    fetch() {
        return new Promise( (resolve, reject) => {
            axios({
                method: 'GET',
                url: AppConfig.api.url + '/api/v1/geocoordinates'
            })
                .then( response => {
                    let coords = new Array()

                    response.data.forEach(coord => {
                        coords.push({
                            id: coord.id,
                            title: coord.title,
                            position: {
                                lat: Number.parseFloat(coord.latitude),
                                lng: Number.parseFloat(coord.longitude)
                            }
                        })
                    })

                    resolve(coords)
                } )
                .catch( error => {
                    reject(error)
                } )
        } )
    }
}