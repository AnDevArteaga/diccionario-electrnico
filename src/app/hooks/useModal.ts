import { useState } from "react";

const useModal = () => {
  const [openModalId, setOpenModalId] = useState<string | null>(null);
  const [isGeneralOpen, setIsGeneralOpen] = useState(false); // Para modal general

  const openModal = (id?: string) => {
    if (id) {
      setOpenModalId(id);
    } else {
      setIsGeneralOpen(true);
    }
  };

  const closeModal = () => {
    setOpenModalId(null);
    setIsGeneralOpen(false);
  };

  const isOpen = (id?: string) => (id ? openModalId === id : isGeneralOpen);

  return { isOpen, openModal, closeModal };
};

export default useModal;