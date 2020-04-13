import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as mkdirp from 'mkdirp';

import * as StateManager from '../../state/stateManager'

import JSONPreferenceScheme from './scheme';
import {account, login, validateToken} from "../../API/auth";
import Theme from "../theme";

export function preferenceLocation(): string {
    const preferenceDir: string = path.join(os.homedir(), '.GameStream');
    return path.join(preferenceDir, 'preference.json');
}

export default async function loadPreferences() {
    const preferences: JSONPreferenceScheme = await coalesce(JSON.parse(await rawPreferences()));

    StateManager.dispatch("loadPreferences", {
        preferences
    });
}

async function coalesce(data: JSONPreferenceScheme): Promise<JSONPreferenceScheme> { // used for validating preferences and ensuring they are of correct types
    let auth: account = {
        accountName: data.accountName,
        email: data.email,
        userToken: await validateToken(data.userToken) ? data.userToken : null
    };

    if (!(auth.accountName && auth.email && auth.userToken))
        auth = await login();

    const preferences: JSONPreferenceScheme = {
        accountName: auth.accountName,
        applicationInstallDir: data.applicationInstallDir || path.join(os.homedir(), 'Applications'),
        autoUpdate: typeof data.autoUpdate === "boolean" ? data.autoUpdate : true,
        developerMode: typeof data.developerMode === "boolean" ? data.developerMode : false,
        email: auth.email,
        localApplications: [],
        theme: data.theme in Theme ? data.theme : Theme.system,
        useNativeLauncher: typeof data.useNativeLauncher === "boolean" ? data.useNativeLauncher : true,
        userToken: auth.userToken
    }

    fs.writeFileSync(preferenceLocation(), JSON.stringify(preferences, null, 4), 'utf8');

    return preferences;
}

function rawPreferences(): Promise<string> {
    return mkdirp(path.join(os.homedir(), '.GameStream')).then(function() {
        try {
            if (!fs.existsSync(preferenceLocation()))
                fs.writeFileSync(preferenceLocation(), '{}');

            console.log(preferenceLocation());

            return fs.readFileSync(preferenceLocation(), 'utf8');
        } catch (err) {
            StateManager.dispatch("error", function () {
                return {
                    error: new Error(`Try deleting ${preferenceLocation()}, then restarting the app.`)
                };
            });
        }
    }).catch(err => {
        throw new Error(err);
    });
}
