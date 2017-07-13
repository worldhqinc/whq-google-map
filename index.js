class GoogleMap {
    constructor (options) {
        const { apiKey, element, coords, zoom, markerIcon, styles } = options

        this.apiKey = apiKey
        this.element = element
        this.coords = coords
        this.zoom = zoom || 4
        this.markerIcon = markerIcon || null
        this.styles = styles || null
        this.map = null
    }

    init () {
        if (!window.google) {
            this.loadApi()
        } else {
            this.loadMap()
        }
    }

    loadApi () {
        window.loadMap = this.loadMap.bind(this)

        const scriptTag = document.createElement('script')
        const firstScriptTag = document.getElementsByTagName('script')[0]
        scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&callback=loadMap`
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag)
    }

    loadMap () {
        this.map = new window.google.maps.Map(this.element, {
            center: this.coords,
            clickableIcons: false,
            mapTypeControl: false,
            streetViewControl: false,
            styles: this.styles,
            zoom: this.zoom,
            zoomControl: false
        })

        this.loadMarker()
    }

    loadMarker () {
        /* eslint-disable no-new */
        new window.google.maps.Marker({
            position: this.coords,
            map: this.map,
            icon: this.markerIcon
        })
    }
}

export default GoogleMap
