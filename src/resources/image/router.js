import { Router } from 'express'
import controller from './controller'

export default Router({ mergeParams: true }).post(
  '/bulk/count-values',
  controller.countValues.bind(controller)
)
