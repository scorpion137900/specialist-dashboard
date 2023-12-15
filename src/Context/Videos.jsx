import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
const VideosContext = createContext({});

const VideoProvider = ({ children }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [deletedItem, setDeletedItem] = useState(null);

  return (
    <VideosContext.Provider
      value={{
        openDelete,
        setOpenDelete,
        deletedItem,
        setDeletedItem,
      }}
    >
      {children}
    </VideosContext.Provider>
  );
};
export const useVideosContext = () => useContext(VideosContext);

export default VideoProvider;
