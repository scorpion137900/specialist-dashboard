//Auth token we will use to generate a meeting and connect to it
export const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJjYjFlMzJjNi0zNWU4LTRmNzAtOTY2Zi1kNWUxOWYwMzRiODAiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY3OTcxOTIzNCwiZXhwIjoxNjgyMzExMjM0fQ.U1Xs-TSeMIpguHZYgGnv2L1OPZCna4Y1YGykGoP-tLA";
// API call to create meeting
export const createMeeting = async ({ token }) => {
  try {
    const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
      method: "POST",
      headers: {
        authorization: `${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    //Destructuring the roomId from the response
    const { roomId } = await res.json();
    return roomId;
  } catch (error) {
    console.log(error);
  }
};
