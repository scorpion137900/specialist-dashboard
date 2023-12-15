import { createContext, useContext } from "react";
import theme from "../Styles/Styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import { useLayoutEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTranslation } from "react-i18next";
const cacheLtr = createCache({
  key: "muiltr",
});

const cacheRtl = createCache({
  key: "muirtl",
  // prefixer is the only stylis plugin by default, so when
  // overriding the plugins you need to include it explicitly
  // if you want to retain the auto-prefixing behavior.
  stylisPlugins: [prefixer, rtlPlugin],
});

const directionThemeContext = createContext({});
const ltrTheme = createTheme({ direction: "ltr" });
const rtlTheme = createTheme({ direction: "rtl" });
const DirectionThemeProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [isRtl, setIsRtl] = useState(false);
  const toggleLanguage = () => {
    setIsRtl((isRtl) => !isRtl);
  };
  useLayoutEffect(() => {
    document.body.setAttribute("dir", isRtl ? "rtl" : "ltr");
    i18n.changeLanguage(`${isRtl ? "ar" : "en"}`);
  }, [isRtl]);
  const directtionTheme = isRtl ? rtlTheme : ltrTheme;
  return (
    // DirectionThemeProvider is a wrapper for the whole app to share the direction context Value
    <directionThemeContext.Provider value={{ isRtl, toggleLanguage }}>
      <CacheProvider value={isRtl ? cacheRtl : cacheLtr}>
        <ThemeProvider theme={directtionTheme}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeProvider>
      </CacheProvider>
    </directionThemeContext.Provider>
  );
};
export const useDirectionThemeContext = () => useContext(directionThemeContext);
export default DirectionThemeProvider;
