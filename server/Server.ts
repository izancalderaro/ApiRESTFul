import http from 'http'
import Api from './api/Api'
const config = require('./config/env/Config')()
const models = require('./models/');

const server = http.createServer(Api)

models.sequelize.sync().then(() => {
  server.listen(config.serverPort);
  server.on('listening', () => console.log(`Servidor rodando na porta: ${config.serverPort}`))
  server.on('error', (error: NodeJS.ErrnoException) => console.log(`Ocorreu um erro: ${error}`))
})
