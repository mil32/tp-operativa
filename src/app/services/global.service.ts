import { Injectable } from "@angular/core";
import { NetworkNode } from "../model/networkNode";
import { Connection } from "../model/connection";
import { FullNode } from "../model/fullNode";
import LocalNodes from "../data/nodes.json";
import LocalConnections from "../data/connections.json";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  private nodes = new Array<NetworkNode>();
  private connections = new Array<Connection>();
  private fullNodes = new Array<FullNode>();

  fullNodesSubject: BehaviorSubject<FullNode[]>;
  fullNodes$: Observable<FullNode[]>;

  constructor() {
    console.log("====RECONTRABUILD=====");
    this.nodes = LocalNodes.map(
      n =>
        new NetworkNode(n.id, n.name, n.address, n.stock, n.isInitial, n.isEnd)
    );
    this.connections = LocalConnections.map(
      conn =>
        new Connection(conn.id, conn.originNode, conn.endNode, conn.distance)
    );
    this.fullNodesSubject = new BehaviorSubject<FullNode[]>(this.fullNodes);
    this.fullNodes$ = this.fullNodesSubject.asObservable();
    this.setFullNodes();
  }

  setFullNodes(selectedNodes: NetworkNode[] = this.nodes): void {
    console.log("[Building Full Nodes]");
    // console.log("XXXXXX GET", this.getNodes());
    let finalArray: FullNode[] = [];
    // console.log("[setFullNodes] SelectedNodes >", selectedNodes);

    selectedNodes.forEach(node => {
      finalArray.push(new FullNode(node, this.connections));
    });
    // console.log("[setFullNodes] Final Array >", finalArray);

    this.fullNodes = finalArray;
    // console.log("[setFullNodes] >", this.connections);
    this.fullNodesSubject.next(this.fullNodes);
  }

  getFullNodes(selectedNodes: NetworkNode[] = this.nodes): FullNode[] {
    this.setFullNodes(selectedNodes);
    return this.fullNodes;
  }

  getConnections(): Connection[] {
    return this.connections;
  }

  deleteConnection(id: number): void {
    let erased = this.connections.splice(id, 1);
    this.setFullNodes();
  }
  getNodes(): NetworkNode[] {
    return this.nodes;
  }

  addNode(n: any): void {
    this.nodes.push(
      new NetworkNode(
        this.nodes.length,
        n.name,
        n.address,
        n.stock,
        n.isInitial,
        n.isEnd
      )
    );
    console.log("[GS] NODE ADDED >", this.nodes, this.connections);
    this.setFullNodes();
  }

  addConnection(con: any): void {
    this.connections.push(
      new Connection(
        this.connections.length,
        con.originNode,
        con.endNode,
        con.distance
      )
    );
    console.log("[GS] CONN ADDED >", this.nodes, this.connections);
    this.setFullNodes();
  }
}
