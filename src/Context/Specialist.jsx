import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
const SpecialistContext = createContext({});

const SpecialistProvider = ({ children }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState(null);
  return (
    <SpecialistContext.Provider
      value={{
        openDelete,
        setOpenDelete,
        deletedItem,
        setDeletedItem,
        updatedItem,
        setUpdatedItem,
        openUpdate,
        setOpenUpdate,
      }}
    >
      {children}
    </SpecialistContext.Provider>
  );
};
export const useSpecialistContext = () => useContext(SpecialistContext);

export default SpecialistProvider;
