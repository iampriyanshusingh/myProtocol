import { createConnection } from "node:net";

class MyProtocol {
  constructor({ debounceTime = 30000, retryAttempts = 4 } = {}) {
    this.debounceTime = debounceTime;
    this.retryAttempts = retryAttempts;
    this.retryCount = 0;
    this.queue = [];
    this.ready = false;

    this.connect();

    // Debounce
    this.debounceTimer = setInterval(() => {
      if (this.ready && this.queue.length > 0) {
        const data = this.queue.shift();
        const payload = `[SOF]\n${data}\n[EOF]`;
        this.client.write(Buffer.from(payload));
        console.log("Sent:", data);
      }
    }, this.debounceTime);
  }

  connect() {
    this.client = createConnection({ host: "localhost", port: 3001 });

    this.client.on("connect", () => {
      console.log("Connected to server");
      this.ready = true;
      this.retryCount = 0;
    });

    this.client.on("end", () => {
      console.log("Connection ended by server");
      this.retryConnection();
    });

    this.client.on("error", (err) => {
      console.error("Client Error:", err.message);
      this.ready = false;
      this.retryConnection();
    });
  }

  retryConnection() {
    if (this.retryCount >= this.retryAttempts) {
      console.error("Max retry attempts reached");
      return;
    }

    this.ready = false;
    this.retryCount++;

    console.log(`Reconnecting... Attempt ${this.retryCount}`);
    setTimeout(() => this.connect(), 1000 * this.retryCount); // Exponential backoff
  }

  send(data) {
    this.queue.push(data);
  }
}

// Demo
const client = new MyProtocol({ debounceTime: 3000 });
client.send("Hello World 1");
client.send("Hello World 2");
client.send("Hello World 3");
