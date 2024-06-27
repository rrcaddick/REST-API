import { exec } from "child_process";
import { resolve } from "path";

const migrationName = process.argv[2];

if (!migrationName) {
  console.error("Please provide a migration name.");
  process.exit(1);
}

const migrationsPath = resolve(__dirname, `./${migrationName}`);
const configPath = resolve(__dirname, "../mysql.config.ts");

// Migrations folder and datasource file path could be added to .env file
const command = `npm run typeorm migration:generate ${migrationsPath} -- -d ${configPath}`;

exec(command, (_, stdout, stderr) => (stderr ? console.error(stderr) : console.log(stdout)));
