// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  // const user = useSelector((state) => state.auth.user);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(user);
  //   if (!user) console.log("loggggg");
  // }, [user]);

  return (
    <>
      <Sidebar>{children}</Sidebar>
      {/* <Box sx={{ minHeight: "50vh", alignItems: "center" }}>{children}</Box> */}
      {/* {children} */}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
