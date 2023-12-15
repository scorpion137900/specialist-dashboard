import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/constants";

const EmailVerification = ({ email, token }) => {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState(null);

  // Call verifyEmail() when the component mounts
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Make a POST request to your API endpoint to verify the email
        const response = await axios.post(
          `${API_URL}/User/confirmemail?email=${email}&token=${token}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data;
        console.log(data);
        setIsVerified(true);

        setMessage(data.message);
      } catch (error) {
        console.log(error);
        setIsVerified(false);
        setMessage(error.response.data.message);
      }
      setIsVerifying(false);
    };
    verifyEmail();
  }, []);
  if (isVerifying) {
    return <p>Verifying your email...</p>;
  }

  return (
    <>
      {message ? (
        <p>{message}</p>
      ) : (
        <p>
          Sorry, we were unable to verify your email. Please try again later.
        </p>
      )}
    </>
  );
};

export default EmailVerification;
