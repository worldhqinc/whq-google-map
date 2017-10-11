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
    markerClick: {
        enabled: true,
        zoom: 9,
        centerOnMarker: true,
        bindSelector: '.element-to-bind',
        boundElementContainer: '.container',
        activeClass: 'active'
    },
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
| `markers` | String | Optional. <br> Node list of markers. |
| `markerClick` | String | Optional. <br> Options for marker click events. |
| `styles` | Array | Optional. <br>Array of custom styles. |
| `zoom` | Integer | Optional. <br>Custom zoom level. <br>Default: `4` |

### Marker Click Options

| Option | Type | Description |
| --- | --- | --- |
| `enabled` | Boolean | Optional. <br> Whether or not marker click events are enabled. <br>Default: `False` |
| `zoom` | Integer | Optional. <br> Zoom level after marker click. <br>Default: `False` |
| `centerOnMarker` | Boolean | Optional. <br> Whether or not to center the map on a marker when it is clicked. <br>Default: `True` |
| `bindSelector` | String | Optional. <br> An element selector to bind each marker to. |
| `boundElementContainer` | String | Optional. <br> Selector of the element that contains the bound elements. This is required to scroll to the bound element. |
| `activeClass` | String | Optional. <br> Class to add to the bound element when its corresponding marker is clicked. <br>Default: `active` |

## Binding Elements

To get bound elements to work, you must add the `data-title` attribute to the DOM node that corresponds to the title of each marker.

```html
<li class="bound-element" data-title="Location #1">Location #1</li>
```

## Icon Override

Override the global icon option by adding the `data-icon` attribute to the markers data.

```html
const mapMarkers = [
    {
        coords: { lat: 100, lng: -100 },
        title: 'Location #1',
        icon: '/path/to/custom-icon.png'
    },
    ...
]
```
