import React, { useEffect } from "react";

const Modal = ({ modalContent, CloseModal, alert, people }) => {
  useEffect(() => {
    const setTime = setTimeout(() => {
      CloseModal()
    }, 3000)
    return ()=> clearTimeout(setTime);
  }, [people]);
  return (
    // <p className="container text-center alert alert-info">{modalContent}</p>
    <p className={`container w-75 text-center alert alert-${alert}`}>{modalContent}</p>
  );
};

export default Modal;
