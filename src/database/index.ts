// import config, { IConfig } from 'config';
import mongoose, { Mongoose } from 'mongoose';

const { NODE_ENV, MONGODB_URI, MONGODB_DB_NAME } = process.env;

export const connect = async (): Promise<Mongoose> => {
	NODE_ENV === 'development' && mongoose.set('debug', true);

	return await mongoose.connect(MONGODB_URI || 'mongodb://locahost:27017', {
		dbName: MONGODB_DB_NAME || 'prazenteiro-docez',
		keepAlive: true,
		keepAliveInitialDelay: 300000,
	});
};

mongoose.connection.on('connected', async () => {
	console.info('MongoDB Connected!');
	console.info(`Mongose Version: ${mongoose.version}`);
});

mongoose.connection.on('error', (error) =>
	console.error('MongoDB Error: ', error)
);

export const close = (): Promise<void> => mongoose.connection.close();
