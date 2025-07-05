import type {Config} from 'jest';

const config: Config = {

  bail: true,
  clearMocks: true,
  coverageProvider: "v8",
  preset: "ts-jest",

  testEnvironment: "node",

  // Outra pode ser também testMatch: ["<rootDir>/src/**/*.spec.ts"],
  testMatch: ["<rootDir>/src/**/*.spec.ts"],
  // <rootDir> é a raíz do projeto

  moduleNameMapper: {
    // Equivalente ao mapeamento de importação "@/*": ["./src/*"]
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};

export default config;