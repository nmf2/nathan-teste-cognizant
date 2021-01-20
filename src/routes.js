import imageRouter from './resources/image/router'
/**
 * @param {import("express").Application} app
 */
export default function router(app) {
  app.use('/image', imageRouter)
}
