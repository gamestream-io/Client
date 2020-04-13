import * as Qt from '@nodegui/nodegui';

declare module global {
    let window: Qt.QMainWindow;
}

export default function error(err: Error, header: string): void {
    const messageBox = new Qt.QMessageBox();
    messageBox.setText(err.message);
    messageBox.setWindowTitle(header);

    const accept = new Qt.QPushButton();
    accept.setText('Okay');

    messageBox.addButton(accept, Qt.ButtonRole.AcceptRole);
    messageBox.exec();
}
