import * as sourceMap from 'source-map-support';

import * as StateManager from "./state/stateManager";

import app from './App';
import error from "./App/error";

import loadPreferences from "./App/preferences";

sourceMap.install();

StateManager.on('error', function ({error: err}) {
    error(err, "Could not load preferences");
});

loadPreferences().then(function () {
    app();
}).catch(err => {
    error(err, "An error has occurred");
});
