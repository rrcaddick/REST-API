// generateMigration.js
const { exec } = require("child_process");

const migrationName = process.argv[2];
if (!migrationName) {
  console.error("Please provide a migration name.");
  process.exit(1);
}

const command = `npm run typeorm migration:generate ./src/config/database/mysql/migrations/${migrationName} -- -d ./src/config/database/mysql/mysql.config.ts`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Stderr: ${stderr}`);
    return;
  }
  console.log(`Stdout: ${stdout}`);
});
