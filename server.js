import { createServer } from "node:net";

let buffer = "";

const server = createServer((socket) => {
  console.log("TCP Connection Open...");

  socket.on("data", (data) => {
    buffer += data.toString();

    let start = buffer.indexOf("[SOF]");
    let end = buffer.indexOf("[EOF]");

    // Process complete messages
    while (start !== -1 && end !== -1 && end > start) {
      const message = buffer.slice(start + 5, end).trim();
      console.log("Received:", message);

      buffer = buffer.slice(end + 5);
      start = buffer.indexOf("[SOF]");
      end = buffer.indexOf("[EOF]");
    }
  });

  socket.on("close", () => {
    console.log("Connection closed");
  });

  socket.on("error", (err) => {
    console.error("Server Error:", err.message);
  });
});

server.listen(3001, () => {
  console.log("Server listening on port 3001");
});
