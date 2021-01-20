import imageRouter from './resources/image/router'
import raceStatsRouter from './resources/raceStats/router'
/**
 * @param {import("express").Application} app
 */
export default function router (app) {
  app.use('/image', imageRouter)
  app.use('/super-hero-race', raceStatsRouter)
}
