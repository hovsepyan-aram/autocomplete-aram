const BASE_URL = 'http://localhost:3001';

export const getAutocompleteResults = async (
  query: string,
): Promise<string[]> => {
  const response = await fetch(
    `${BASE_URL}/suggestions?query=${encodeURIComponent(query)}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  const result = await response.json();

  return result;
};
