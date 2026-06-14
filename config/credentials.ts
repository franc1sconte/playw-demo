function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Variable de entorno requerida no encontrada: "${name}". ` +
      `Asegurate de tener un archivo .env basado en .env.example.`
    );
  }
  return value;
}

export const CREDENTIALS = {
  siglo: {
    username: requireEnv('PROD_SIGLO_USERNAME'),
    password: requireEnv('PROD_SIGLO_PASSWORD'),
  },
  tuni: {
    username: requireEnv('STAGING_TUNI_USERNAME'),
    password: requireEnv('STAGING_TUNI_PASSWORD'),
  },
} as const;
