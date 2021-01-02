import { useEffect, useRef, useCallback } from "react";
import Modal, { ModalParameters } from "@eightfeet/modal";

const useModal = (parameters: ModalParameters) => {
  const ref = useRef(null);
  useEffect(() => {
    ((ref.current as unknown) as Modal) = new Modal(parameters);
    return () => {
      if (ref.current) {
        const previousModal = ((ref.current as unknown) as Modal);
        if (document.getElementById(previousModal.state.id as string)) {
          previousModal.remove();
        }
      }
    }
  }, [parameters]);

  const createModal = useCallback<Modal['create']>((data) => {
    return ((ref.current as unknown) as Modal).create(data);
  }, []);

  const hideModal = useCallback<Modal["hide"]>((data) => {
    return ((ref.current as unknown) as Modal).hide(data);
  }, []);

  return { createModal, hideModal }
};

export default useModal;
