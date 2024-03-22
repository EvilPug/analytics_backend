// TODO: Удалить
export function mockApiRequest(result: 'success' | 'error' = 'success'): Promise<unknown> {
  return new Promise((resolve, reject) => setTimeout(result === 'success' ? resolve : reject, 3000));
}
