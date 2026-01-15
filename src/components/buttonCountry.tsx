import { useState } from 'react'
import { createPortal } from 'react-dom';
import type { CyberEvent } from '@/model/CyberEvent';
import { ModalContent } from './ModalContent';

export function ModalButton({ data }: { data: CyberEvent[] }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(!showModal)}
        className="text-center"
        id="Testbut"
      >
        Test Button
      </button>

      {showModal &&
      createPortal(
            <ModalContent
            closeModal={() => setShowModal(false)}
            data={data}
          />,
          document.body
        )}
    </>
  );
}
