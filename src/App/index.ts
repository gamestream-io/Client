import * as Qt from '@nodegui/nodegui';
import generateMenus from "./menu/generator";
import initMenu from "./menu/initMenu";

declare module global {
    let window: Qt.QMainWindow;
}

export default function () {
    const App = new Qt.QMainWindow();

    App.setMinimumSize(720, 360);

    const container = new Qt.QWidget(App);

    void container;

    App.setMenuBar(generateMenus(initMenu()));

    global.window = App;

    App.show();

    return App;
}
