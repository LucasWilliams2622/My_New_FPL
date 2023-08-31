export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4YTZmZjUxNi0xNmU1LTQ1MDAtYjk0ZS03ODgwZTJjYjNlOTIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY5MTQwMzUzMywiZXhwIjoxNjkyMDA4MzMzfQ.JMvZCaDRZ3M_JdLpj2GW7cG5cklBu0VxM6nJ-qr7qyM"; // token should be in String format

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const { roomId } = await res.json();
  console.log("room id", roomId);
  return roomId;
};
