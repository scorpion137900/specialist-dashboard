import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
const VideoTypeContext = createContext({});

const VideoTypeProvider = ({ children }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState(null);
  return (
    <VideoTypeContext.Provider
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
    </VideoTypeContext.Provider>
  );
};
export const useVideoTypeContext = () => useContext(VideoTypeContext);

export default VideoTypeProvider;
