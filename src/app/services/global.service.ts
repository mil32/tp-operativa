import { Injectable } from "@angular/core";
import { NetworkNode } from "../model/networkNode";
import { Connection } from "../model/connection";
import { FullNode } from "../model/fullNode";
import LocalNodes from "../data/nodes.json";
import LocalConnections from "../data/connections.json";

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  nodes: Array<NetworkNode> = [];
  connections: Array<Connection> = [];
  fullNodes: Array<FullNode> = [];

  constructor() {
    this.nodes = LocalNodes.map(
      n =>
        new NetworkNode(n.id, n.name, n.address, n.stock, n.isInitial, n.isEnd)
    );

    this.connections = LocalConnections.map(
      conn =>
        new Connection(conn.id, conn.originNode, conn.endNode, conn.distance)
    );
  }

  getConnections(): Array<Connection> {
    return this.connections;
  }

  getNodes(): Array<NetworkNode> {
    return this.nodes;
  }

  setFullNodes(selectedNodes: Array<NetworkNode>): void {
    let finalArray: Array<FullNode> = [];
    selectedNodes.forEach(node => {
      finalArray.push(new FullNode(node, this.connections));
    });
    this.fullNodes = finalArray;
  }

  getFullNodes(
    selectedNodes: Array<NetworkNode> = this.nodes
  ): Array<FullNode> {
    this.setFullNodes(selectedNodes);
    return this.fullNodes;
  }

  addNode(n: any): Array<NetworkNode> {
    this.nodes.push(
      new NetworkNode(n.id, n.name, n.address, n.stock, n.isInitial, n.isEnd)
    );
    return this.nodes;
  }

  addConnection(con: any): Array<Connection> {
    this.connections.push(
      new Connection(con.id, con.originNode, con.endNode, con.distance)
    );
    return this.connections;
  }
}
