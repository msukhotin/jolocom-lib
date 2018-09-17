import { IJWTHeader } from './types'
import {
  validateJWTSignature,
  computeJWTSignature,
  encodeAsJWT,
  validateJWTSignatureWithRegistry
} from '../utils/jwt'
import { decodeToken } from 'jsontokens'
import { classToPlain } from 'class-transformer'
import {
  IPayload,
  IJSONWebTokenAttrs,
  InteractionType,
  IJSONWebTokenCreationAttrs,
  InteractionTypePayloadAttrs
} from './types'
import { JolocomRegistry, createJolocomRegistry } from '../registries/jolocomRegistry'
import { privateKeyToDID } from '../utils/crypto'
import { CredentialRequestPayload } from './credentialRequest/credentialRequestPayload'
import { ICredentialRequestPayloadAttrs } from './credentialRequest/types'

type InteractionTypedJWT = JSONWebToken<CredentialRequestPayload>

export class JSONWebToken<T extends IPayload> {
  private header: IJWTHeader = {
    typ: 'JWT',
    alg: 'ES256K'
  }
  private payload: T
  private signature: string

  public getIssuer(): string {
    return this.payload.iss
  }

  public getIssueTime(): number {
    return this.payload.iat
  }

  public getPayload(): T {
    return this.payload
  }

  public getSignature(): string {
    return this.signature
  }

  public static create(args: IJSONWebTokenCreationAttrs): InteractionTypedJWT {
    const { privateKey, payload } = args

    const jwt = JSONWebToken.payloadToJWT(payload)

    jwt.payload.iat = Date.now()
    jwt.payload.iss = privateKeyToDID(privateKey)
    jwt.signature = jwt.sign(privateKey)

    return jwt
  }

  public static decode(jwt: string): IPayload {
    const json = decodeToken(jwt)
    // TODO: verify the signature
    // should return just the payload class instance
    return JSONWebToken.fromJSON(json).payload
  }

  public encode(): string {
    if (!this.payload || !this.header || !this.signature) {
      throw new Error('The JWT is not complete, header / payload / signature are missing')
    }

    return encodeAsJWT(this.header, this.payload, this.signature)
  }

  public sign(privateKey: Buffer) {
    return computeJWTSignature(this.payload, privateKey)
  }

  public validateSignatureWithPublicKey(pubKey: Buffer): boolean {
    return validateJWTSignature(this, pubKey)
  }

  public async validateSignatureWithRegistry(registry?: JolocomRegistry): Promise<boolean> {
    if (!registry) {
      registry = createJolocomRegistry()
    }
    return validateJWTSignatureWithRegistry({ jwtInstance: this, registry })
  }

  public toJSON(): IJSONWebTokenAttrs {
    return classToPlain(this) as IJSONWebTokenAttrs
  }

  public static fromJSON(json: IJSONWebTokenAttrs): InteractionTypedJWT {
    const jwt = JSONWebToken.payloadToJWT(json.payload)
    jwt.header = json.header
    jwt.signature = json.signature

    return jwt
  }

  private static payloadToJWT(payload: InteractionTypePayloadAttrs): InteractionTypedJWT {
    let jwt

    switch (payload.typ) {
      case InteractionType.CredentialRequest.toString(): {
        jwt = new JSONWebToken<CredentialRequestPayload>()
        jwt.payload = CredentialRequestPayload.fromJSON(payload as ICredentialRequestPayloadAttrs)
        break
      }
      case InteractionType.CredentialResponse.toString(): {
        // TODO
        break
      }
      case InteractionType.CredentialsReceive.toString(): {
        // TODO
        break
      }
      default: {
        throw new Error('Interaction type not recognized!')
        break
      }
    }
    return jwt
  }
}
