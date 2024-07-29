import * as net from "net";

class GoVal {
  private host: string;
  private port: number;
  private passphrase: string;
  private bufferSize: number;
  private client: net.Socket;

  constructor(
    host: string,
    port: number,
    passphrase: string,
    bufferSize?: number
  ) {
    this.host = host;
    this.port = port;
    this.passphrase = passphrase;
    this.bufferSize = bufferSize || 1024;
    this.client = new net.Socket();
    this.client.connect(this.port, this.host, () => {
      console.log("Connected");
    });
    this.client.write(this.passphrase);
  }
}
