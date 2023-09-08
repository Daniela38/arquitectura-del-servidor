
export const generateUserErrorInfo = (user) => {
    return `Possible problems:
      One or more properties were incomplete or not valid.
      List of required properties:
      * first_name : needs to be a String, received ${user.firstName}
      * last_name : needs to be a String, received ${user.lastName}
      * email : needs to be a String, received ${user.email}
      * age: needs to be a Number, received ${user.age}
      * password: need to be a String, received ${user.password}`;
  };

export const generateProductError = (id) => {
  return `Possible problems:
  * Cannot get all products
  * The product with the id ${id} does not exists`
}

export const generateProductAddError = () => {
  return `Possible problems:
  * Cannot add the product
  * Cannot update the product`;
}

export const generateCartError = (cartId, prodId) => {
  return `Possible problems:
  * The id cart ${cartId} does not exist
  * The id product ${prodId} does not exist`;
}

export const generateMessageError = () => {
  return `Possible problems:
  * Cannot get messages`;
}

export const generateMessageAddError = () => {
  return `Possible problems:
  * Username does not exist
  * Message does not exist`;
}

export const generateServerError = (error) => {
  return `Possible problems:
  * An internal error ocurred on the server
  More information: ${error}`;
}