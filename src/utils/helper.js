import { toast } from "react-toastify";



export const userMenu = ["Profile", "Logout"];


// array of objects of blogs of 30 items

export const notifySucess = (message) => {
  toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
};
export const notifyError = (message) => {
  toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    className: "z--indexxxx",
  });
};
export const notifyInfo = (message) => {
  toast.info(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    className: "z--indexxxx",
  });
};
export const isGoogleDriveLink = (value) => {
  const googleDrivePattern = /^https?:\/\/drive\.google\.com/;
  if (!googleDrivePattern.test(value)) {
    return "This is not a valid Google Drive link.";
  }
  return true; // Return true for a valid value
};
export const questions = [
  {
    id:1,
    text : " How would you like to grow within this organization?"
  },
  {
    id:2,
    text : " Do you feel a sense of purpose in your job?"
  },
  {
    id:3,
    text : "What do you need from me to do your best work? "
  },
  {
    id:4,
    text : " What are we currently not doing as a company that you feel we should do?"
  },
  {
    id:5,
    text : "Are you able to do your best work every day?"
  },
  {
    id:6,
    text : "What Does Personal and Professional Success Look Like to You?"
  },
  {
    id:7,
    text : "What Result Do You Want?"
  },
  {
    id:8,
    text : "What Difficulties Are You Facing?"
  },
  {
    id:9,
    text : "What Is Under Your Control? Out of Your Control?"
  },
  {
    id:10,
    text : "What Solutions Are You Considering?"
  },
  {
    id:11,
    text : "What Do You Like to Do When You’re Not At Work?"
  },
  {
    id:12,
    text : "If You Could Change One Thing About Your Job, What Would it Be?"
  },

]