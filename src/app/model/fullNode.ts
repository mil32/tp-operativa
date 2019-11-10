import { Connection } from "./connection";
import { NetworkNode } from "./networkNode";

export class FullNode {
  id: number;
  name: string;
  address: string;
  stock: number;
  isInitial: Boolean;
  isEnd: Boolean;
  connections: Array<Connection>;

  constructor(n: NetworkNode, connections: Array<Connection>) {
    this.id = n.id;
    this.name = n.name;
    this.address = n.address;
    this.stock = n.stock;
    this.isInitial = n.isInitial;
    this.isEnd = n.isEnd;
    this.connections = connections.filter(
      c => c.originNode == this.id || c.endNode == this.id
    );
  }
}
