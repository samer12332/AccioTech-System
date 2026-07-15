type NodeEnvironment = "development" | "test" | "production";

export interface EnvironmentVariables {
  NODE_ENV: NodeEnvironment;
  PORT: number;
  DATABASE_URL: string;
}

export function validateEnvironment(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const nodeEnv = config.NODE_ENV ?? "development";
  if (
    typeof nodeEnv !== "string" ||
    !["development", "test", "production"].includes(nodeEnv)
  ) {
    throw new Error(
      "Configuration validation failed: NODE_ENV must be development, test, or production.",
    );
  }

  const port = parsePort(config.PORT ?? "3001");
  const databaseUrl = parseDatabaseUrl(config.DATABASE_URL);

  return {
    NODE_ENV: nodeEnv as NodeEnvironment,
    PORT: port,
    DATABASE_URL: databaseUrl,
  };
}

function parsePort(value: unknown): number {
  if (typeof value !== "string" || !/^\d+$/.test(value)) {
    throw new Error(
      "Configuration validation failed: PORT must be a numeric TCP port.",
    );
  }

  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new Error(
      "Configuration validation failed: PORT must be between 1 and 65535.",
    );
  }

  return port;
}

function parseDatabaseUrl(value: unknown): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(
      "Configuration validation failed: DATABASE_URL is required and must not be empty.",
    );
  }

  const databaseUrl = value.trim();

  try {
    const url = new URL(databaseUrl);
    if (url.protocol !== "postgresql:" && url.protocol !== "postgres:") {
      throw new Error();
    }
  } catch {
    throw new Error(
      "Configuration validation failed: DATABASE_URL must be a PostgreSQL connection URL.",
    );
  }

  return databaseUrl;
}
