import { useEffect, useState } from "react";
import { requestIdle } from "@/designable/shared";

export function useInnerVisible() {
  const [modalVisible, setModalVisible] = useState(false);

  const [innerVisible, setInnerVisible] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      requestIdle(
        () => {
          Promise.resolve().then(() => {
            setInnerVisible(true);
          });
        },
        {
          timeout: 400,
        }
      );
    } else {
      setInnerVisible(false);
    }
  }, [modalVisible]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return {
    modalVisible,
    setModalVisible,
    innerVisible,
    setInnerVisible,
    openModal,
    closeModal,
  };
}
