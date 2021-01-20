import Service from './service'
import UserInputError from '@/errors/userInputError'

class Controller {
  constructor () {
    // Just storing the "image" here. Maybe there should be an endpoint to set
    // it?
    const image = [
      [1, 2, 2, 3],
      [3, 3, 4, 4],
      [4, 4, 5, 5],
      [5, 5, 5, 6]
    ]

    this.service = new Service(image)
  }

  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  countValues (req, res) {
    // The OpenAPI validator middleware will ensure that this is an array of
    // integers based on the YAML specification.
    /** @type {number[]} */
    const values = req.body

    try {
      res.status(200).json(this.service.getBulkCount(values))
    } catch (error) {
      console.error(error)
      if (error instanceof UserInputError) {
        res.status(400).send(error.message)
      } else {
        res.sendStatus(500)
      }
    }
  }
}

export default new Controller()
