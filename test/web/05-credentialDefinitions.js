/*!
 * Copyright (c) 2026 Digital Bazaar, Inc. All rights reserved.
 */
import {
  getPointerValue, resolveCredentialDefinitionField
} from '../../components/credentialDefinitions.js';
import {
  openBadgeCredential, openBadgeCredentialNoTopLevelDescription
} from './mock-credentials.js';

describe('credentialDefinitions', () => {
  describe('getPointerValue', () => {
    it('should resolve a nested pointer', async () => {
      getPointerValue({
        value: openBadgeCredential,
        pointer: '/credentialSubject/achievement/image/id'
      }).should.equal(
        openBadgeCredential.credentialSubject.achievement.image.id);
    });

    it('should return undefined for a missing segment', async () => {
      should.not.exist(getPointerValue({
        value: openBadgeCredential, pointer: '/credentialSubject/nonexistent'
      }));
    });

    it('should return undefined when no pointer is given', async () => {
      should.not.exist(getPointerValue({value: openBadgeCredential}));
    });
  });

  describe('resolveCredentialDefinitionField', () => {
    it('should resolve the OBv3 image pointer for an OpenBadgeCredential',
      async () => {
        resolveCredentialDefinitionField({
          credential: openBadgeCredential, field: 'imagePointer'
        }).should.deep.equal(
          openBadgeCredential.credentialSubject.achievement.image);
      });

    it('should resolve the OBv3 description pointer for an ' +
      'OpenBadgeCredential', async () => {
      resolveCredentialDefinitionField({
        credential: openBadgeCredentialNoTopLevelDescription,
        field: 'descriptionPointer'
      }).should.equal(
        openBadgeCredentialNoTopLevelDescription
          .credentialSubject.achievement.description);
    });

    it('should return undefined for a credential matching no definition',
      async () => {
        should.not.exist(resolveCredentialDefinitionField({
          credential: {type: ['VerifiableCredential', 'AlumniCredential']},
          field: 'imagePointer'
        }));
      });

    it('should match on `type` array membership, not exact equality',
      async () => {
        const credential = {
          type: ['VerifiableCredential', 'OpenBadgeCredential'],
          credentialSubject: {achievement: {image: 'x'}}
        };
        resolveCredentialDefinitionField({credential, field: 'imagePointer'})
          .should.equal('x');
      });
  });
});
