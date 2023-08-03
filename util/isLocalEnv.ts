export function isLocalEnv(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function isProdEnv(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isTestEnv(): boolean {
  return process.env.NODE_ENV === 'test';
}
