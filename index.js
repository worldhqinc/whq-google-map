class GoogleMap {
    constructor (options) {
        const { apiKey, element, initialCoords, zoom, title, markerIcon, markers, styles } = options

        this.apiKey = apiKey
        this.element = element
        this.initialCoords = initialCoords
        this.zoom = zoom || 4
        this.title = title || null
        this.markerIcon = markerIcon || null
        this.markers = markers || null
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
            center: this.initialCoords,
            clickableIcons: false,
            mapTypeControl: false,
            streetViewControl: false,
            styles: this.styles,
            zoom: this.zoom,
            zoomControl: false
        })

        this.loadMarkers()
    }

    loadMarkers () {
        for (let marker of this.markers) {
            this.addMarker(marker.coords, marker.title || null)
        }
    }

    addMarker (coords, title = '', icon = this.markerIcon) {
        /* eslint-disable no-new */
        new window.google.maps.Marker({
            position: coords,
            map: this.map,
            icon: icon,
            title: title
        })
    }
}

export default GoogleMap
