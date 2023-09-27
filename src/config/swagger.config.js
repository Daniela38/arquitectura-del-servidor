import swaggerUIExpress from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

export default function configureSwagger(app) {
    const swaggerOptions = {
        definition: {
            openapi: '3.0.1',
            info: {
                title: 'Documentación api',
                description: 'Documentando la api'
            }
        },
        apis: ['./src/docs/**/*.yaml']
    }
    const specs = swaggerJSDoc(swaggerOptions);
    app.use('/apidocs', swaggerUIExpress.serve, swaggerUIExpress.setup(specs));
}