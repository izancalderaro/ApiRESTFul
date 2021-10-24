/** @format */

import http from 'http';
import Api from './api/Api';
import { sequelize } from './api/Sequelize';

(async () => {
	await sequelize.sync({
		alter: true
	});

	const server = http.createServer(Api);

	server.listen(process.env.SERVER_PORT);
	server.on('listening', () =>
		console.log(
			`Servidor rodando na porta: ${process.env.SERVER_PORT}`
		)
	);
	server.on('error', (error: NodeJS.ErrnoException) =>
		console.log(`Ocorreu um erro: ${error}`)
	);
})();
