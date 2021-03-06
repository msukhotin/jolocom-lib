import { InteractionType } from '../../../ts/interactionFlows/types'

export const credentialRequestPayloadCreateAttrs = {
  typ: InteractionType.CredentialRequest.toString(),
  credentialRequest: {
    callbackURL: 'http://test.com',
    credentialRequirements: [
      {
        type: ['Credential', 'MockCredential'],
        constraints: [{ '==': [
          { var: 'issuer' },
          'did:jolo:issuer'
        ] }]
      }
    ]
  }
}

export const credentialRequestPayloadJson = {
  iss: 'did:jolo:8f977e50b7e5cbdfeb53a03c812913b72978ca35c93571f85e862862bac8cdeb',
  iat: 0,
  typ: InteractionType.CredentialRequest.toString(),
  credentialRequest: {
    callbackURL: 'http://test.com',
    credentialRequirements: [
      {
        type: ['Credential', 'MockCredential'],
        constraints: {
          and: [{ '==': [true, true] }, { '==': [{ var: 'issuer' }, 'did:jolo:issuer'] }]
        }
      }
    ]
  }
}

export const credentialRequestJson = {
  callbackURL: 'http://test.com',
  credentialRequirements: [
    {
      constraints: {
        and: [{ '==': [true, true] }, { '==': [{ var: 'issuer' }, 'did:jolo:issuer'] }]
      },
      type: ['Credential', 'MockCredential']
    }
  ]
}

export const expectedRequestedCredentials = {
  type: ['Credential', 'MockCredential'],
  constraints: {
    and: [{ '==': [true, true] }, { '==': [{ var: 'issuer' }, 'did:jolo:issuer'] }]
  }
}

//TODO remove
export const credentialRequestCreationAttrs = {
  callbackURL: 'http://test.com',
  credentialRequirements: [
    {
      type: ['Credential', 'MockCredential'],
      constraints: [{ '==': [{ var: 'issuer' }, 'did:jolo:issuer'] }]
    }
  ]
}

export const credRequestCreationAttrs = {
  callbackURL: 'http://test.com',
  credentialRequirements: [
    {
      type: ['Credential', 'ProofOfEmailCredential'],
      constraints: [{ '==': [{ var: 'issuer' }, 'did:jolo:5dcbd50085819b40b93efc4f13fb002119534e9374274b10edce88df8cb311af'] }]
    }
  ]
}

export const mockPrivKey = '3a1076bf45ab87712ad64ccb3b10217737f7faacbf2872e88fdd9a537d8fe266'
export const privKeyDID = 'did:jolo:8f977e50b7e5cbdfeb53a03c812913b72978ca35c93571f85e862862bac8cdeb'

export const signedCredReqJson = {
  header: { alg: 'ES256K', typ: 'JWT' },
  payload: {
    iat: 0,
    iss: 'did:jolo:8f977e50b7e5cbdfeb53a03c812913b72978ca35c93571f85e862862bac8cdeb',
    typ:  InteractionType.CredentialRequest,
    credentialRequest: {
      credentialRequirements: [
        {
          type: ['Credential', 'MockCredential'],
          constraints: {
            and: [{ '==': [true, true] }, { '==': [{ var: 'issuer' }, 'did:jolo:issuer'] }]
          }
        }
      ],
      callbackURL: 'http://test.com'
    }
  },
  signature: 'lBcEgnfpORwlZGZ1HanoW2d3Ngm2qox-JI4T0iL-m1fBt5f6ihAvaoj0Z2usZiXwO5UtKXvvcvJTEP6rxI_MDQ'
}

export const signedCredReqJWT =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.\
eyJpYXQiOjAsImlzcyI6ImRpZDpqb2xvOjhmOTc3ZTUwYjdlNWNiZGZlYjUzYTAzYzgxMjkxM2I3Mjk3\
OGNhMzVjOTM1NzFmODVlODYyODYyYmFjOGNkZWIiLCJjcmVkZW50aWFsUmVxdWVzdCI6eyJjcmVkZW50\
aWFsUmVxdWlyZW1lbnRzIjpbeyJ0eXBlIjpbIkNyZWRlbnRpYWwiLCJNb2NrQ3JlZGVudGlhbCJdLCJj\
b25zdHJhaW50cyI6eyJhbmQiOlt7Ij09IjpbdHJ1ZSx0cnVlXX0seyI9PSI6W3sidmFyIjoiaXNzdWVy\
In0sImRpZDpqb2xvOmlzc3VlciJdfV19fV0sImNhbGxiYWNrVVJMIjoiaHR0cDovL3Rlc3QuY29tIn19\
.lBcEgnfpORwlZGZ1HanoW2d3Ngm2qox-JI4T0iL-m1fBt5f6ihAvaoj0Z2usZiXwO5UtKXvvcvJTEP6\
rxI_MDQ'
