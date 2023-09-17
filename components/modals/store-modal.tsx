"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "../ui/modal";

export const StoreModal = () => {
  const storeModal = useStoreModal();


  return (
    <Modal
      description="Add new store to manage products and categories"
      title="Create store"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Store form
    </Modal>
  );
};
