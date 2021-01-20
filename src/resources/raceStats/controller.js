import Service from './service'
import UserInputError from '@/errors/userInputError'


class Controller {

  constructor() {
    this.service = new Service()
  }

  /**
   * 
   * @param {import("express").Request} req 
   * @param {import("express").Response} res 
   */
  async raceStats(req, res) {
    try {
      res.status(200).json(await this.service.getStats())
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