export function checkIsAdminEmail(email?: string | null): boolean {
  if (!email) return false;

  const pattern = new RegExp('^[a-zA-Z0-9._%+-]+@fearnleys.com$');
  return pattern.test(email);
}
