export const normalizeSuggestions = (
  items: string[],
  maxResults: number,
): string[] => {
  const suggestionsSet = new Set<string>();

  items.forEach((item) => {
    const trimmedItem = item.trim();
    if (trimmedItem.length) {
      suggestionsSet.add(trimmedItem);
    }
  });

  return Array.from(suggestionsSet).slice(0, maxResults);
};
