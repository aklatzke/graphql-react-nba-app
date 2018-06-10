import mongo from 'then-mongo';

let db = mongo(process.env.MONGODB_URI || 'nba');

export default db;