import { TcpClient } from "./src/tcp";

class GovalClient {
  private tcpClient: TcpClient;
  private host: string;
  private port: number;
  constructor(host: string, port: number = 6969) {
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

  public async get(key: string): Promise<string | number> {
    const res = await this.tcpClient.send(`!GET ${key}`);
    if (res.startsWith(":")) {
      return Number(res.slice(1));
    }
    if (res.startsWith("-")) {
      throw new Error(res.slice(1));
    }
    return res.slice(1);
  }

  public async decr(key: string, value: number = 1): Promise<number> {
    if (value > 0) {
      value = -value;
    }
    const res = await this.tcpClient.send(`:INCR ${key} ${value}`);
    if (res.startsWith("-")) {
      throw new Error(res.slice(1));
    }
    return Number(res.slice(1));
  }

  public async set(key: string, value: string | number): Promise<string> {
    const prefix = typeof value === "number" ? ":" : "+";
    const res = await this.tcpClient.send(`${prefix}SET ${key} ${value}`);
    if (res.startsWith("-")) {
      throw new Error(res.slice(1));
    }
    return res.slice(1);
  }

  public async incr(key: string, value: number = 1): Promise<number> {
    const res = await this.tcpClient.send(`:INCR ${key} ${value}`);
    if (res.startsWith("-")) {
      throw new Error(res.slice(1));
    }
    return Number(res.slice(1));
  }

  public async del(key: string): Promise<string> {
    const res = await this.tcpClient.send(`!DEL ${key}`);
    if (res.startsWith("-")) {
      throw new Error(res.slice(1));
    }
    return res.slice(1);
  }

  public async expr(key: string, ttl: number): Promise<string> {
    const res = await this.tcpClient.send(`!EXPR ${key} ${ttl}`);
    console.log(res);
    if (res.startsWith("-")) {
      throw new Error(res.slice(1));
    }
    return res.slice(1);
  }

  public async version(): Promise<string> {
    const res = await this.tcpClient.send("!VERSION");
    if (res.startsWith("-")) {
      throw new Error(res.slice(1));
    }
    return res.slice(1);
  }

  public async auth(password: string): Promise<string> {
    const res = await this.tcpClient.send(`!AUTH ${password}`);
    if (res.startsWith("-")) {
      throw new Error(res.slice(1));
    }
    return res.slice(1);
  }
}

export default GovalClient;
