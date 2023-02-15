import { defineNode } from '@noodl/noodl-sdk';

function locationUpdated(_this, position) {
  _this.setOutputs({
    timestamp: position.timestamp,
    accuracy: position.coords.accuracy,
    altitude: position.coords.altitude,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    speed: position.coords.speed,
    errorCode: 0
  })
  _this.sendSignalOnOutput('locationUpdated');
}

function locationError(_this, error) {
  _this.setOutputs({
    errorCode: error.code
  })
  _this.sendSignalOnOutput('error');
}

export default defineNode({
  category: 'Location',
  name: 'Location Services',
  docs: 'https://github.com/pragmaflowinc/noodl-geolocation/blob/main/README.md',
  inputs: {
    enableWatchMode: {
      type: 'boolean',
      displayName: 'Enable Watch Mode',
      default: false,
      tooltip: "Something"
    },
    maximumAge: {
      displayName: 'Maximum Age',
      type: 'number',
      default: 0,
      group: 'Options'
    },
    timeout: {
      displayName: 'Timeout',
      type: 'number',
      default: Infinity,
      group: 'Options'
    },
    enableHighAccuracy: {
      type: 'boolean',
      displayName: 'Enable High Accuracy',
      default: false,
      group: 'Options'
    }
  },
  outputs: {
    watchStarted: {
      displayName: 'Location Stream Started',
      type: 'signal',
      group: 'Events'
    },
    watchStopped: {
      displayName: 'Location Stream Stopped',
      type: 'signal',
      group: 'Events'
    },
    locationUpdated: {
      displayName: 'Location Updated',
      type: 'signal',
      group: 'Events'
    },
    error: {
      type: 'signal',
      displayName: "Failure",
      group: 'Events'
    },
    timestamp: {
      type: 'number',
      group: 'GeolocationCoordinates'
    },
    latitude: {
      displayName: "Latitude",
      type: 'number',
      group: 'GeolocationCoordinates'
    },
    longitude: {
      displayName: "Longitude",
      type: 'number',
      group: 'GeolocationCoordinates'
    },
    altitude: {
      displayName: "Altitude",
      type: 'number',
      group: 'GeolocationCoordinates'
    },
    accuracy: {
      displayName: "Accuracy",
      type: 'number',
      group: 'GeolocationCoordinates'
    },
    altitudeAccuracy: {
      displayName: "Altitude Accuracy",
      type: 'number',
      group: 'GeolocationCoordinates'
    },
    heading: {
      displayName: "Heading",
      type: 'number',
      group: 'GeolocationCoordinates'
    },
    speed: {
      displayName: "Speed",
      type: 'number',
      group: 'GeolocationCoordinates'
    },
    errorCode: {
      displayName: "Error Code",
      type: 'number',
      group: 'GeolocationError'
    }
  },
  initialize() {
    this.watchId = null
    this.options = {
      maximumAge: 0,
      timeout: Infinity,
      enableHighAccuracy: false
    }
  },
  changed: {
    enableWatchMode: function (value) {
      if (value) {
        this.startWatch()
      } else {
        this.stopWatch()
      }
    },
    maximumAge: value => this.options.maximumAge = value,
    timeout: value => this.options.timeout = value,
    enableHighAccuracy: value => this.options.enableHighAccuracy = value,
  },
  methods: {
    startWatch() {
      this.watchId = navigator.geolocation.watchPosition(position => locationUpdated(this, position), error => locationError(this, error), this.options)
      this.sendSignalOnOutput('watchStarted');
    },
    stopWatch() {
      navigator.geolocation.clearWatch(this.watchId)
      this.sendSignalOnOutput('watchStopped');
    }
  },
  signals: {
    fetch: {
      displayName: 'Fetch',
      signal: function () { navigator.geolocation.getCurrentPosition(position => locationUpdated(this, position), error => locationError(this, error), this.options) }
    },
  }
})