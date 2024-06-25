// TODO: Move to config/migrations folder
const { exec } = require("child_process");

const migrationName = process.argv[2];
if (!migrationName) {
  console.error("Please provide a migration name.");
  process.exit(1);
}

// Migrations folder and datasource file path could be added to .env file
const command = `npm run typeorm migration:generate ./src/config/database/mysql/migrations/${migrationName} -- -d ./src/config/database/mysql/mysql.config.ts`;

exec(command, (_, stdout, stderr) => (stderr ? console.error(stderr) : console.log(stdout)));