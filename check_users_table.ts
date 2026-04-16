import { query } from './lib/db'; 
query({query: 'DESCRIBE users;'}).then(console.log).catch(console.error).finally(() => process.exit());
