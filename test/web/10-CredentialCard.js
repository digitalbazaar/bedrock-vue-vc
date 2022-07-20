/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import Vue from 'vue';
import {CredentialCard} from '@bedrock/vue-credential-card';

// helper function that mounts and returns the rendered text
function renderCredentialCard(propsData) {
  const Constructor = Vue.extend(CredentialCard);
  return new Constructor({propsData}).$mount();
}

describe('CredentialCard', () => {
  it('should render content if type of value is a string in credential ' +
    'subject', async () => {
    const vm = renderCredentialCard({
      credential: {
        credentialSubject: {
          name: 'John Doe',
        },
        type: ['TestCredential'],
        description: 'Test description',
        image: 'http://example.com/some-image.png'
      },
      schema: {
        name: {
          name: 'Full Name',
          icon: 'fas fa-user'
        }
      }
    });
    should.exist(vm);
    should.exist(vm.$el);
    vm.$el.querySelector('.g-field-data-regular')
      .textContent.trim().should.equal('John Doe');
  });

  it('should not render content if type of value in credential ' +
    'subject is null or undefined', async () => {
    const valueTypes = [undefined, null];

    for(const value of valueTypes) {
      const vm = renderCredentialCard({
        credential: {
          credentialSubject: {
            name: value,
          },
          type: ['TestCredential'],
          description: 'Test description',
          image: 'http://example.com/some-image.png'
        },
        schema: {
          name: {
            name: 'Full Name',
            icon: 'fas fa-user'
          }
        }
      });
      should.exist(vm);
      should.exist(vm.$el);
      should.not.exist(vm.$el.querySelector('.g-field-data-regular'));
    }
  });

  it('should render content if type of value in credential ' +
    'subject is a number, NaN, or boolean', async () => {
    const valueTypes = [ NaN, 0, false];

    for(const value of valueTypes) {
      const vm = renderCredentialCard({
        credential: {
          credentialSubject: {
            name: value,
          },
          type: ['TestCredential'],
          description: 'Test description',
          image: 'http://example.com/some-image.png'
        },
        schema: {
          name: {
            name: 'Full Name',
            icon: 'fas fa-user'
          }
        }
      });
      should.exist(vm);
      should.exist(vm.$el);
      should.exist(vm.$el.querySelector('.g-field-data-regular'));
    }
  });
  it('should render content if type of value in credential ' +
    'subject is an object', async () => {
    const vm = renderCredentialCard({
      credential: {
        credentialSubject: {
          address: {
            streetAddress: '123 Main St.',
            addressCountry: 'US',
            addressLocality: 'Chicago',
            addressRegion: 'IL',
            postalCode: '60610-2949'
          }
        },
        type: ['TestCredential'],
        description: 'Test description',
        image: 'http://example.com/some-image.png'
      },
      schema: {
        address: {
          name: 'Address',
          icon: 'fa fa-map-marker-alt',
          sublabels: true
        }
      }
    });
    should.exist(vm);
    should.exist(vm.$el);
    should.exist(vm.$el.querySelector('.g-field-data-regular'));
  });
});
