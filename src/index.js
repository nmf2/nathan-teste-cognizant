import express from 'express'
import routes from './routes'
import * as bodyParser from 'body-parser'
import { middleware as ValidatorOpenApi } from 'express-openapi-validator'
import path from 'path'
// import swaggerUi from "swagger-ui-express";
import fs from 'fs'
import YAML from 'yamljs'

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '800kb' }))
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: process.env.REQUEST_LIMIT || '800kb'
  })
)

const apiSpec = path.join(__dirname, './api.yaml')
const swaggerDocument = YAML.load(apiSpec)

// Allows to open the API spec and test page at /api-explorer
app.use(express.static('public'))
fs.writeFileSync(apiSpec, JSON.stringify(swaggerDocument))
app.use(process.env.OPENAPI_SPEC || '/spec', express.static(apiSpec))

// Validates that the incoming requests have *only* have the optional or required parameters.
app.use(
  ValidatorOpenApi({
    apiSpec,
    validateRequests: true
  }),
  (err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors
    })
  }
)

routes(app)

app.listen(port, () => {
  console.log(`Server up and runnig on port ${port}`)
  console.log(`Documentation at http://localhost:${port}/api-explorer`)
})
