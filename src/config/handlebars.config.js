import handlebars from 'express-handlebars';
import __dirname from '../utils/utils.js';

export default function configureHandlebars(app) {
    app.engine('handlebars', handlebars.engine());
    app.set('views', __dirname + '/views');
    app.set('view engine', 'handlebars');
}