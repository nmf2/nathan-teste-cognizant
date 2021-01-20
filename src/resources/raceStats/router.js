import { Router } from 'express'
import controller from './controller'

export default Router({ mergeParams: true }).get(
  '/stats',
  controller.raceStats.bind(controller)
)
