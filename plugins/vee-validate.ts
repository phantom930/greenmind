/* eslint-disable camelcase */
import { extend } from 'vee-validate';
import { min, email, required, digits, max } from 'vee-validate/dist/rules';
extend('min', {
  ...min,
  message: field => `This field must have be ${field}`
});

extend('max', {
  ...max,
  message: field => `This field must have be ${field}`
});

extend('email', {
  ...email,
  message: 'This field must be an email'
});

extend('digits', {
  ...digits,
  message: field => `This field must have ${field} digits`
});

extend('required', {
  ...required,
  message: 'This field is required.'
});
