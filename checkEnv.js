const fs = require("fs");
const path = require("path");

// Caminho para o arquivo .env
const envPath = path.join(__dirname, ".env");

// Lê o arquivo .env
fs.readFile(envPath, "utf8", (err, data) => {
  if (err) {
    console.error("Erro ao ler o arquivo .env:", err);
    return;
  }

  // Divide o conteúdo do arquivo .env em linhas
  const lines = data.split("\n");

  // Encontra a linha que define NODE_ENV
  const nodeEnvLine = lines.find((line) => line.startsWith("NODE_ENV="));

  if (!nodeEnvLine) {
    console.log("A variável NODE_ENV não foi encontrada no arquivo .env.");
    return;
  }

  // Extrai o valor de NODE_ENV
  const nodeEnvValue = nodeEnvLine.split("=")[1];

  // Verifica se o valor é 'development' ou 'production'
  if (nodeEnvValue === "development" || nodeEnvValue === "production") {
    console.log(`NODE_ENV é igual a ${nodeEnvValue}.`);
  } else {
    console.log(
      'O valor de NODE_ENV não é nem "development" nem "production".'
    );
  }
});
