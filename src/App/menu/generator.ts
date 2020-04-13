import * as Qt from '@nodegui/nodegui';

import Menu from './Menu';

export default function (menus: { [name: string]: Menu }): Qt.QMenuBar {
    const menuBar: Qt.QMenuBar = new Qt.QMenuBar();

    const parseMenu = function (menu: Menu, depth: number = 0): Qt.QMenu {
        const qMenu: Qt.QMenu = new Qt.QMenu();

        for (const option in menu) {
            const content = menu[option];

            if (content !== null) {
                const menuOption: Qt.QAction = new Qt.QAction();
                menuOption.setText(option);

                if (typeof content === "function")
                    menuOption.addEventListener("triggered", content);
                else
                    menuOption.setMenu(parseMenu(content, depth + 1));

                qMenu.addAction(menuOption);
            } else
                qMenu.addSeparator();
        }

        return qMenu;
    }

    for (const menu in menus) {
        const qMenu: Qt.QMenu = parseMenu(menus[menu]);
        qMenu.setTitle(menu);

        menuBar.addMenu(qMenu);
    }

    return menuBar;
}
