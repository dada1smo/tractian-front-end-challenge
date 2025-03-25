export const baseUrl = process.env.TRACTIAN_FAKE_API || '';

export function tractianApi(path: string) {
  return `${baseUrl}${path}`;
}
