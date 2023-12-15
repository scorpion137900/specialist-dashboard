import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
const ReportsContext = createContext({});

const ReportsProvider = ({ children }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [editView, setEditView] = useState(false);
  const [updatedItem, setUpdatedItem] = useState(null);
  return (
    <ReportsContext.Provider
      value={{
        openDelete,
        setOpenDelete,
        deletedItem,
        setDeletedItem,
        updatedItem,
        setUpdatedItem,
        openView,
        setOpenView,
        editView,
        setEditView,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
};
export const useReportsContext = () => useContext(ReportsContext);

export default ReportsProvider;
