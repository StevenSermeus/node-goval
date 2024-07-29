import { Socket } from "net";

class TcpClient {
  private client: Socket;
  private host: string;
  private port: number;
  private queue: Array<{
    data: string;
    resolve: (value: string) => void;
    reject: (reason?: any) => void;
  }> = [];
  private isProcessingQueue: boolean = false;
  private accumulatedData: string = "";

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
    this.client = new Socket();
    this.client.setKeepAlive(true);
    this.client.setEncoding("utf8");
    this.client.on("data", this.onData.bind(this));
    this.client.on("error", this.onError.bind(this));
    process.on("exit", () => {
      this.client.end();
    });
    process.on("SIGINT", () => {
      this.client.end();
    });
    process.on("SIGTERM", () => {
      this.client.end();
    });
    process.on("SIGUSR1", () => {
      this.client.end();
    });
  }

  public async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.connect(this.port, this.host, () => {
        resolve();
      });
    });
  }

  private addProtocol(data: string): string {
    return `!${data}\n\r\n\r`;
  }

  public async send(data: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.queue.push({ data, resolve, reject });
      this.processQueue();
    });
  }

  private stripProtocol(data: string): string {
    return data.slice(1, data.length - 4);
  }

  private processQueue() {
    if (this.isProcessingQueue || this.queue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;
    const { data, resolve, reject } = this.queue.shift()!;

    this.client.write(this.addProtocol(data), "utf8", (err) => {
      if (err) {
        reject(err);
        this.isProcessingQueue = false;
        this.processQueue();
        return;
      }
    });

    const onDataHandler = (response: string) => {
      this.accumulatedData += response;
      if (this.accumulatedData.endsWith("\n\r\n\r")) {
        resolve(this.stripProtocol(this.accumulatedData));
        this.accumulatedData = "";
        this.isProcessingQueue = false;
        this.client.off("data", onDataHandler); // Remove the data listener for this message
        this.processQueue();
      }
    };

    this.client.on("data", onDataHandler);

    this.client.once("error", (err: Error) => {
      reject(err);
      this.isProcessingQueue = false;
      this.client.off("data", onDataHandler); // Remove the data listener for this message
      this.processQueue();
    });
  }

  private onData(data: string) {
    // handle incoming data if needed
  }

  private onError(err: Error) {
    // handle errors if needed
  }
  public async disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.end(() => {
        resolve();
      });
    });
  }
}

export { TcpClient };
