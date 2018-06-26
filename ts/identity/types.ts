import { IDidDocumentAttrs } from './didDocument/types'
import { SignedCredential } from '../credentials/signedCredential'

export interface IIdentityCreateArgs {
  didDocument: IDidDocumentAttrs
  profile: SignedCredential
}
