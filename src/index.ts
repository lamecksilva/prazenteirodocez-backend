/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: `.env` });

import { SetupServer } from './server';

enum ExitStatus {
	Failure = 1,
	Success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
	console.error(
		`App exiting due to an unhandled promise: ${promise} and reason: ${reason}`
	);
	// lets throw the error and let the uncaughtException handle below handle it
	throw reason;
});

process.on('uncaughtException', (error) => {
	console.error(`App exiting due to an uncaught exception: ${error}`);
	process.exit(ExitStatus.Failure);
});

// Self caller function
(async (): Promise<void> => {
	try {
		const server = new SetupServer(Number(process.env.PORT) || 9000);
		await server.init();
		server.start();

		const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
		exitSignals.map((sig) =>
			process.on(sig, async () => {
				try {
					await server.close();

					console.info(`App exited with success`);
					process.exit(ExitStatus.Success);
				} catch (error) {
					console.error(`App exited with error: ${error}`);
					process.exit(ExitStatus.Failure);
				}
			})
		);
	} catch (error) {
		console.error(`App exited with error: ${error}`);
		process.exit(ExitStatus.Failure);
	}
})();
