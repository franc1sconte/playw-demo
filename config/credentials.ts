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
    username: requireEnv('SIGLO_USERNAME'),
    password: requireEnv('SIGLO_PASSWORD'),
  },
} as const;
