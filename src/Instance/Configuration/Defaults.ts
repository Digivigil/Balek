/**
 * @internal
 * Default and Type for BalekConfiguration
 * @module BalekConfigurationDefaults
 * @category Configuration
 */

export type BalekConfiguration = {
  session: {
    loader: {
      modules: string[];
    };
  };
  https: {
    address: string;
    port: string;
  };
  database: {
    sql: {
      host: string;
      user: string;
      password: string;
      database: string;
    };
    mongo: {
      host: string;
      port: string;
      user: string;
      password: string;
      database: string;
    };
  };
};

export const defaultBalekConfiguration: BalekConfiguration = {
  session: {
    loader: {
      modules: ["session/login"],
    },
  },
  https: {
    address: "0.0.0.0",
    port: "8080",
  },
  database: {
    sql: {
      host: "localhost",
      user: "balekAppUser",
      password: "balekAppPassword",
      database: "balek",
    },
    mongo: {
      host: "localhost",
      port: "27017",
      user: "root",
      password: "rootPass",
      database: "balek",
    },
  },
};
