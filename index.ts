import exp from "constants";
import { TcpClient } from "./src/tcp";

class GovalClient {
  private tcpClient: TcpClient;
  private host: string;
  private port: number;
  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
    this.tcpClient = new TcpClient(this.host, this.port);
  }

  public async connect(): Promise<void> {
    await this.tcpClient.connect();
  }

  public async disconnect(): Promise<void> {
    await this.tcpClient.disconnect();
  }

  public async get(key: string): Promise<string> {
    return await this.tcpClient.send(`GET ${key}`);
  }

  public async set(key: string, value: string): Promise<string> {
    return await this.tcpClient.send(`SET ${key} ${value}`);
  }

  public async del(key: string): Promise<string> {
    return await this.tcpClient.send(`DEL ${key}`);
  }
}

export default GovalClient;
