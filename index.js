class GoogleMap {
    constructor (options) {
        const { apiKey, element, initialCoords, zoom, title, markerIcon, markers, markerClick, styles } = options

        this.apiKey = apiKey
        this.element = element
        this.initialCoords = initialCoords
        this.zoom = zoom || 4
        this.title = title || null
        this.markerIcon = markerIcon || null
        this.markers = markers || null
        this.markerClick = {
            enabled: markerClick.enabled || false,
            zoom: markerClick.zoom || 7,
            centerOnMarker: markerClick.centerOnMarker || true,
            bindSelector: markerClick.bindSelector || null,
            activeClass: markerClick.activeClass || 'active'
        }
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
        const marker = new window.google.maps.Marker({
            position: coords,
            map: this.map,
            icon: icon,
            title: title
        })

        if (this.markerClick.enabled) {
            this.addMarkerClickEvent(marker)
        }
    }

    addMarkerClickEvent (marker) {
        marker.addListener('click', () => {
            this.map.setZoom(this.markerClick.zoom)

            if (this.markerClick.centerOnMarker) {
                this.map.setCenter(marker.getPosition())
            }

            if (this.markerClick.bindSelector) {
                const elements = Array.from(document.querySelectorAll(this.markerClick.bindSelector))
                elements.forEach(element => element.classList.remove(this.markerClick.activeClass))

                const matchingElement = elements.find(element => element.dataset.title === marker.title)
                matchingElement.classList.add(this.markerClick.activeClass)
            }
        })
    }
}

export default GoogleMap
