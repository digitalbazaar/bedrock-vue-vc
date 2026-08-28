export const alumniCredential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://www.w3.org/2018/credentials/examples/v1'
  ],
  id: 'http://example.edu/credentials/58473',
  type: [
    'VerifiableCredential',
    'AlumniCredential'
  ],
  issuer: {
    id: 'did:example:12345678910111213',
    image: 'http://example.com/some-image.png'
  },
  name: 'Alumni Credential',
  description: 'The holder is an alumni of Example University.',
  issuanceDate: '2018-05-14T12:00:00Z',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    alumniOf: {
      id: 'did:example:c276e12ec21ebfeb1f712ebc6f1',
      name: [
        {
          value: 'Example University',
          lang: 'en'
        },
        {
          value: 'Exemple d\'Université',
          lang: 'fr'
        }
      ]
    }
  },
  proof: {
    type: 'Ed25519Signature2020',
    created: '2021-11-13T18:19:39Z',
    verificationMethod: 'https://example.edu/issuers/14#key-1',
    proofPurpose: 'assertionMethod',
    proofValue: 'z58DAdFfa9SkqZMVPxAQpic7ndSaynfFPP2oumHKtz'
  }
};

export const basicCredential = {
  credentialSubject: {
    name: 'John Doe'
  },
  type: ['TestCredential'],
  description: 'Test description',
  image: 'http://example.com/some-image.png'
};

export const openBadgeCredential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://purl.imsglobal.org/spec/ob/v3p0/context.json'
  ],
  id: 'http://example.edu/credentials/obv3-1',
  type: [
    'VerifiableCredential',
    'OpenBadgeCredential'
  ],
  issuer: {
    id: 'did:example:issuer',
    name: 'Example Badge Issuer'
  },
  name: 'Open Badge Credential',
  description: 'The holder earned this badge.',
  issuanceDate: '2024-01-01T12:00:00Z',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    type: ['AchievementSubject'],
    achievement: {
      id: 'http://example.edu/achievements/1',
      type: ['Achievement'],
      name: 'Example Achievement',
      image: {
        id: 'http://example.com/achievement-image.png',
        type: 'Image'
      }
    }
  }
};

export const openBadgeCredentialStringAchievementImage = {
  ...openBadgeCredential,
  id: 'http://example.edu/credentials/obv3-4',
  name: 'Open Badge Credential (string achievement image)',
  credentialSubject: {
    ...openBadgeCredential.credentialSubject,
    achievement: {
      ...openBadgeCredential.credentialSubject.achievement,
      id: 'http://example.edu/achievements/4',
      // OBv3's achievement `image` may be a plain string URL instead of
      // an image object with an `id`
      image: 'http://example.com/string-achievement-image.png'
    }
  }
};

export const openBadgeCredentialNoTopLevelDescription = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1',
    'https://purl.imsglobal.org/spec/ob/v3p0/context.json'
  ],
  id: 'http://example.edu/credentials/obv3-2',
  type: [
    'VerifiableCredential',
    'OpenBadgeCredential'
  ],
  issuer: {
    id: 'did:example:issuer',
    name: 'Example Badge Issuer'
  },
  name: 'Open Badge Credential (no top-level description)',
  issuanceDate: '2024-01-01T12:00:00Z',
  credentialSubject: {
    id: 'did:example:ebfeb1f712ebc6f1c276e12ec21',
    type: ['AchievementSubject'],
    achievement: {
      id: 'http://example.edu/achievements/2',
      type: ['Achievement'],
      name: 'Example Achievement',
      description: 'The holder earned this achievement.',
      image: {
        id: 'http://example.com/achievement-image.png',
        type: 'Image'
      }
    }
  }
};

export const openBadgeCredentialEmptyTopLevelDescription = {
  ...openBadgeCredentialNoTopLevelDescription,
  id: 'http://example.edu/credentials/obv3-3',
  name: 'Open Badge Credential (empty top-level description)',
  description: '',
  credentialSubject: {
    ...openBadgeCredentialNoTopLevelDescription.credentialSubject,
    achievement: {
      ...openBadgeCredentialNoTopLevelDescription.credentialSubject
        .achievement,
      id: 'http://example.edu/achievements/3'
    }
  }
};
