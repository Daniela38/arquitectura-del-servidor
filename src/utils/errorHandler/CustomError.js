export default class Error {
    static createError({name = 'Error', recievedParams, message, type = 1, statusCode = 400}){
        const error = new Error(message);
        error.name = name;
        error.recievedParams = recievedParams;
        throw error;
    }
}