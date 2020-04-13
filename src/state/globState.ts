import JSONPreferenceScheme from "../App/preferences/scheme";

export default interface State {
    error?: Error,
    preferences?: JSONPreferenceScheme
};

export const defaults: State = {
};
