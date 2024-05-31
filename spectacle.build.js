const { execSync } = require("child_process");

const projectRoot = process.cwd();

const command = `docker run -it -v ${projectRoot}\\dist:/app/dist -v ${projectRoot}\\dist/public:/app/dist/public sourcey/spectacle spectacle -t /app/dist/public /app/dist/swagger.json`;

execSync(command, { stdio: "inherit" });
