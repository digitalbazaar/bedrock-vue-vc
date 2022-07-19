export const alumniCredential = {
  '@context': [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
  ],
  id: "http://example.edu/credentials/58473",
  type: [
    "VerifiableCredential",
    "AlumniCredential"
  ],
  issuer: {
    id: "did:example:12345678910111213",
    image: "http://example.com/some-image.png"
  },
  name: "Alumni Credential",
  description: "The holder is an alumni of Example University.",
  issuanceDate: "2018-05-14T12:00:00Z",
  credentialSubject: {
    id: "did:example:ebfeb1f712ebc6f1c276e12ec21",
    alumniOf: {
      id: "did:example:c276e12ec21ebfeb1f712ebc6f1",
      name: [
        {
          value: "Example University",
          lang: "en"
        },
        {
          value: "Exemple d'Université",
          lang: "fr"
        }
      ]
    }
  },
  proof: {
    type: "Ed25519Signature2020",
    created: "2021-11-13T18:19:39Z",
    verificationMethod: "https://example.edu/issuers/14#key-1",
    proofPurpose: "assertionMethod",
    proofValue: "z58DAdFfa9SkqZMVPxAQpic7ndSayn1PzZs6ZjWp1CktyGesjuTSwRdoWhAfGFCF5bppETSTojQCrfFPP2oumHKtz"
  }
}

export const basicCredential = {
  credentialSubject: {
    name: 'John Doe',
  },
  type: ['TestCredential'],
  description: 'Test description',
  image: 'http://example.com/some-image.png'
};