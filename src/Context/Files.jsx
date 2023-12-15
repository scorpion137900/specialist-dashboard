import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const FilesContext = createContext({});

const FilesProvider = ({ children }) => {
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedViewerFile, setSelectedViewerFile] = useState(null);
  const [selectedDeleted, setSelectedDeleted] = useState(null);
  return (
    <FilesContext.Provider
      value={{
        openView,
        setOpenView,
        openDelete,
        setOpenDelete,
        selectedDeleted,
        setSelectedDeleted,
        selectedViewerFile,
        setSelectedViewerFile,
      }}
    >
      {children}
    </FilesContext.Provider>
  );
};

export default FilesProvider;
export const useFilesContext = () => useContext(FilesContext);
