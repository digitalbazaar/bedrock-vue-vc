/*!
 * Copyright (c) 2018-2022 Digital Bazaar, Inc. All rights reserved.
 */
import {createApp} from 'vue';
import {CredentialSwitch} from '@bedrock/vue-vc';

// helper function that mounts and returns the rendered text
function renderCredential(propsData) {
  const app = createApp(CredentialSwitch, propsData);
  // use the universal selector to get the first element
  return app.mount('*');
}

describe('CredentialCard', () => {
  it('should render content if type of value is a string in credential ' +
    'subject', async () => {
    const vm = renderCredential({
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
    console.log({vm});
    should.exist(vm);
    should.exist(vm.$el);
    vm.$el.querySelector('.g-field-data-regular')
      .textContent.trim().should.equal('John Doe');
  });

  it('should not render content if type of value in credential ' +
    'subject is null or undefined', async () => {
    const valueTypes = [undefined, null];

    for(const value of valueTypes) {
      const vm = renderCredential({
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
      const vm = renderCredential({
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
    const vm = renderCredential({
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
