/** This error represents a user input mistake */
export default class UserInputError extends Error {
  constructor(...args) {
    super(...args)
  }
}