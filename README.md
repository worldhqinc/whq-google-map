# WHQ Google Map
Wrapper for embedding a Google Map more easily.

## Installation
```sh
npm install whq-google-map
```

## Usage
```js
import GoogleMap from 'whq-google-map'

// new GoogleMap(options)

const mapCanvas = document.querySelector('.map-canvas')
const mapMarkers = [
    {
        coords: { lat: 100, lng: -100 },
        title: 'Location #1' <-- Optional
    },
    {
        coords: { lat: 100, lng: -100 },
        title: 'Location #2' <-- Optional
    },
    ...
]
const mapStyles = [...]

const myMap = new GoogleMap({
    apiKey: 'YOUR_API_KEY',
    element: mapCanvas,
    initialCoords: { lat: 100, lng: -100 },
    zoom: 12,
    markerIcon: 'img/map-marker.png',
    markers: mapMarkers,
    styles: mapStyles
})

myMap.init()
```

## Options
| Option | Type | Description |
| --- | --- | --- |
| `apiKey` | String | Your Google Maps API key. |
| `coords` | String | Object with lat and long properties. |
| `element` | Node | The map canvas element. |
| `markerIcon` | String | Optional. <br> Path to a custom marker icon. PNGs work the best cross-browser. |
| `zoom` | Integer | Optional. <br>Custom zoom level. <br>Default: `4` |
| `styles` | Array | Optional. <br>Array of custom styles. |
