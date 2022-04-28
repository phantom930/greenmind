/* eslint-disable camelcase */
import { extend } from 'vee-validate';
import { min, email, required } from 'vee-validate/dist/rules';
extend('min', {
  ...min,
  message: 'This field must have be greater than 0'
});

extend('email', {
  ...email,
  message: 'This field must be an email'
});

extend('required', {
  ...required,
  message: 'This field is required.'
});
