import React, {
  FC,
  useRef,
  useState,
  KeyboardEvent,
  useCallback,
  useMemo,
} from 'react';
import { TextInput } from '../TextInput/TextInput';
import { Modal } from '../Modal/Modal';
import { List } from '../List/List';
import { useDebounce } from '../../hooks/useDebounce';
import { normalizeSuggestions } from './helpers';
import './AutocompleteInput.css';
import { useCache } from '../../hooks/useCache';

interface IAutocompleteInputProps {
  maxResultsToDisplay?: number;
  className?: string;
  noResultsText?: string;
  debounceDelay?: number;
  fetchSuggestions: (value: string) => Promise<string[]>;
  cacheTimeout?: number;
  minChars?: number;
}

export const AutocompleteInput: FC<IAutocompleteInputProps> = ({
  fetchSuggestions,
  className = '',
  noResultsText = 'No suggestions',
  debounceDelay = 200,
  maxResultsToDisplay = 15,
  cacheTimeout = 10000,
  minChars = 3,
}) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuggestionsListActive, setIsSuggestionsListActive] = useState(false);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestionsCache = useCache<string[]>(cacheTimeout);

  const trimmedValue = useMemo(() => value.trim(), [value]);

  const handleChangeDebounced = useDebounce(async (newValue: string) => {
    const trimmedNewValue = newValue.trim();
    if (trimmedNewValue.length >= minChars) {
      let suggestionsResult: string[] =
        suggestionsCache.current.getValue(trimmedNewValue) ?? [];
      if (!suggestionsResult.length) {
        try {
          suggestionsResult = (await fetchSuggestions(trimmedNewValue)) ?? [];
          suggestionsCache.current.setValue(trimmedNewValue, suggestionsResult);
          setIsError(false);
        } catch {
          setIsError(true);
        }
      }

      // trimming the results, making them unique and having max numbers to display
      const normalizedSuggestions = normalizeSuggestions(
        suggestionsResult,
        maxResultsToDisplay,
      );
      setSuggestions(normalizedSuggestions);
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      setIsSuggestionsListActive(false);
    }
  }, debounceDelay);

  const handleChange = async (newValue: string): Promise<void> => {
    setValue(newValue);
    handleChangeDebounced(newValue);
  };

  const renderHighlightedListItem = useCallback(
    (item: string) => {
      const startIndex = item.indexOf(trimmedValue);

      if (startIndex < 0) {
        return <div>{item}</div>;
      }

      return (
        <div>
          <span>{item.slice(0, startIndex)}</span>
          <b>{trimmedValue}</b>
          <span>{item.slice(startIndex + trimmedValue.length)}</span>
        </div>
      );
    },
    [trimmedValue],
  );

  const handleSelect = useCallback((item: string) => {
    setValue(item);

    // for long texts, we need to scroll to the right-end of the input.
    // when setting texts through react, html doesn't do that automatically.
    // using setTimeout to make sure react is finished with re-rendering
    setTimeout(() => {
      inputRef.current?.blur();
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(item.length, item.length);
    }, 10);

    setIsModalOpen(false);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    // jumping into the suggestions list
    if (e.key === 'ArrowDown') {
      setIsSuggestionsListActive(true);
    }
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleInputClick = useCallback(() => {
    handleChangeDebounced(trimmedValue);
  }, [handleChangeDebounced, trimmedValue]);

  return (
    <div className={`autocomplete ${className}`.trim()}>
      <TextInput
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Start typing..."
        onClick={handleInputClick}
      />
      <Modal
        isOpen={isModalOpen}
        anchorEl={inputRef.current}
        onClose={closeModal}
      >
        <List
          listItems={suggestions}
          listItemRenderer={renderHighlightedListItem}
          isActive={isSuggestionsListActive}
          setIsActive={setIsSuggestionsListActive}
          onSelect={handleSelect}
          noItemsText={isError ? 'Error loading suggestions' : noResultsText}
        />
      </Modal>
    </div>
  );
};
