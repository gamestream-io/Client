import Theme from "../theme";

export default interface JSONPreferenceScheme {
    theme: Theme,
    accountName: string,
    email: string,
    userToken: string,
    applicationInstallDir: string,
    developerMode: boolean,
    localApplications: string[],
    useNativeLauncher: boolean,
    autoUpdate: boolean
}
