import React, {
  CSSProperties,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
} from 'react';
import './Modal.css';

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
}

export const Modal: FC<PropsWithChildren<IModalProps>> = ({
  anchorEl,
  children,
  isOpen,
  onClose,
}) => {
  const stopPropagation = useCallback(
    (e: React.MouseEvent | MouseEvent) => e.stopPropagation(),
    [],
  );

  // closing the modal when clicking on the document,
  // stopping propogation to document if the click was either on
  // the anchor or the modal itself
  useEffect(() => {
    if (anchorEl && isOpen) {
      document.addEventListener('click', onClose);
      anchorEl.addEventListener('click', stopPropagation);

      return () => {
        document.removeEventListener('click', onClose);
        anchorEl.removeEventListener('click', stopPropagation);
      };
    }
  }, [anchorEl, stopPropagation, onClose, isOpen]);

  if (!anchorEl || !isOpen) {
    return null;
  }

  // ideally, a really reusable modal would receive an anchor position prop, separate width,
  // maybe handle anchor element changing and so on.
  // but for our case, this is enough.
  const position: CSSProperties = {
    top: anchorEl.offsetTop + anchorEl.offsetHeight,
    left: anchorEl.offsetLeft,
    width: anchorEl.offsetWidth,
  };

  return (
    <div className="modal" onClick={stopPropagation} style={{ ...position }}>
      {children}
    </div>
  );
};
