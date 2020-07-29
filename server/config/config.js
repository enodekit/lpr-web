const Joi = require('joi')
const path = require('path')
const glob = require('glob')
const _ = require('lodash')
const defaultAssets = require(path.join(process.cwd(), 'server/config/assets.js'))

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config()

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  SERVER_PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
}).unknown()
  .required()

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

/**
 * Get files by glob patterns
 */
const getGlobbedPaths = function(globPatterns, excludes) {
  // URL paths regex
  var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i')

  // The output array
  var output = []

  // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
  if (_.isArray(globPatterns)) {
    globPatterns.forEach(function(globPattern) {
      output = _.union(output, getGlobbedPaths(globPattern, excludes))
    })
  } else if (_.isString(globPatterns)) {
    if (urlRegex.test(globPatterns)) {
      output.push(globPatterns)
    } else {
      var files = glob.sync(globPatterns)
      if (excludes) {
        files = files.map(function(file) {
          if (_.isArray(excludes)) {
            for (var i in excludes) {
              if (excludes.hasOwnProperty(i)) {
                file = file.replace(excludes[i], '')
              }
            }
          } else {
            file = file.replace(excludes, '')
          }
          return file
        })
      }
      output = _.union(output, files)
    }
  }

  return output
}

const initGlobalConfigFiles = function(config, assets) {
  // Appending files
  config.files = {
  }

  // Setting Globbed model files
  config.files.models = getGlobbedPaths(assets.models)

  // Setting Globbed route files
  config.files.routes = getGlobbedPaths(assets.routes)

  // Setting Globbed config files
  config.files.configs = getGlobbedPaths(assets.config)

  // Setting Globbed socket files
  config.files.sockets = getGlobbedPaths(assets.sockets)

  // Setting Globbed policies files
  config.files.policies = getGlobbedPaths(assets.policies)
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.SERVER_PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  frontend: envVars.MEAN_FRONTEND || 'vue',
  log: {
    // logging with Morgan - https://github.com/expressjs/morgan
    // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
    format: envVars.LOG_FORMAT || 'combined',
    fileLogger: {
      directoryPath: envVars.LOG_DIR_PATH || process.cwd(),
      fileName: envVars.LOG_FILE || 'log/app.log',
      maxsize: 10485760,
      maxFiles: 2,
      json: true,
      infoFile: 'log/info.log',
      errorFile: 'log/error.log',
      exceptions: 'log/exceptions.log'
    }
  }
}

initGlobalConfigFiles(config, defaultAssets)

module.exports = config
