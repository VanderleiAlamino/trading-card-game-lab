import js from "@eslint/js";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended, // Regras recomendadas pelo ESLint
  {
    rules: {
      "no-unused-vars": "warn", // Exibe avisos para variáveis não utilizadas
      "no-console": "error",    // Proíbe o uso de console.log
    },
  },
  prettier, // Desativa regras do ESLint que conflitam com o Prettier
];