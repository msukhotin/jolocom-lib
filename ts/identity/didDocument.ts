import AuthenticationCredential from "./authenticationCredential";
import Did from "./did";
import LinkedDataSignature from "./linkedDataSignature";
import { IDidDocumentAttrs } from "./types";

/* Describes Identity according to DID/DDO specifications
 * Source: https://w3c-ccg.github.io/did-spec/
 */
export default class DidDocument {
  public static reviver(key: string, value: any): any {
    return key === "" ? DidDocument.fromJSON(value) : value;
  }

  public static fromJSON(json: IDidDocumentAttrs): DidDocument {
    const did = Object.create(DidDocument.prototype);
    const parsedAuthCredentials = JSON.parse(
      JSON.stringify(json.authenticationCredential), AuthenticationCredential.reviver,
    );
    return Object.assign(did, json, {
      id: Did.fromJSON(json.id),
      authenticationCredential: parsedAuthCredentials,
      created: new Date(json.created),
    });
  }

  public "@context": string = "https://w3id.org/did/v1";
  public id: Did;
  public authenticationCredential: AuthenticationCredential;
  public created: Date;

  constructor(publicKey: Buffer) {
    this.id = new Did(publicKey);
    this.authenticationCredential = AuthenticationCredential.ecdsaCredentials(publicKey.toString(), this.id);
    this.created = new Date(Date.now());
  }
}