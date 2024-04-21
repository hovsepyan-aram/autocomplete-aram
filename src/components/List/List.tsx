import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import './List.css';

interface IListProps {
  listItems: string[];
  listItemRenderer: (item: string) => JSX.Element;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  onSelect: (item: string) => unknown;
  noItemsText?: string;
}

export const List: FC<IListProps> = React.memo(
  ({
    listItems,
    isActive,
    listItemRenderer,
    setIsActive,
    onSelect,
    noItemsText,
  }) => {
    const [activeItemIndex, setActiveItemIndex] = useState<number>(-1);

    const handleSelect = useCallback(
      (item: string) => {
        setActiveItemIndex(-1);
        setIsActive(false);
        onSelect(item);
      },
      [onSelect, setIsActive],
    );

    const handleHover = (index: number) => {
      setIsActive(true);
      setActiveItemIndex(index);
    };

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (isActive) {
          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              setActiveItemIndex((prev) =>
                prev === listItems.length - 1 ? 0 : prev + 1,
              );
              break;
            case 'ArrowUp':
              e.preventDefault();
              setActiveItemIndex((prev) =>
                prev === 0 ? listItems.length - 1 : prev - 1,
              );
              break;
            case 'Enter':
              e.preventDefault();
              handleSelect(listItems[activeItemIndex]);
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isActive, listItems, handleSelect, activeItemIndex]);

    return listItems.length ? (
      <ul className="list">
        {listItems.map((listItem, index) => (
          <li
            onClick={() => onSelect(listItem)}
            onMouseOver={() => handleHover(index)}
            className={isActive && index === activeItemIndex ? 'active' : ''}
            key={listItem}
          >
            {listItemRenderer(listItem)}
          </li>
        ))}
      </ul>
    ) : (
      <div className="empty-results">{noItemsText ?? 'No items'}</div>
    );
  },
);
