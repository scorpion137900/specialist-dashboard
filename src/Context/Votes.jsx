import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
const VotesContext = createContext({});

const VotesProvider = ({ children }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);
  const [openView, setOpenView] = useState(false);

  return (
    <VotesContext.Provider
      value={{
        openDelete,
        setOpenDelete,
        deletedItem,
        setDeletedItem,
        openView,
        setOpenView,
      }}
    >
      {children}
    </VotesContext.Provider>
  );
};
export const useVotesContext = () => useContext(VotesContext);

export default VotesProvider;
