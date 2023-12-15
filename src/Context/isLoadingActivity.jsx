import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const IsLoadingActiveContext = createContext({});

const IsLoadingActiveProvider = ({ children }) => {
  const [isLoadingActivity, setIsLoadingActivity] = useState(false);
  return (
    <IsLoadingActiveContext.Provider
      value={{ isLoadingActivity, setIsLoadingActivity }}
    >
      {children}
    </IsLoadingActiveContext.Provider>
  );
};
export const useIsLoadingActiveContext = () =>
  useContext(IsLoadingActiveContext);
export default IsLoadingActiveProvider;
