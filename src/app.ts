import * as Qt from '@nodegui/nodegui';

const app = new Qt.QMainWindow();

const text = new Qt.QLabel(app);
text.setText("Hello World");

app.show();
