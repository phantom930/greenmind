/* eslint-disable max-statements-per-line */
/* eslint-disable */
declare let Clerk: any;
import { Plugin } from '@nuxt/types';
const clerkioKey = process.env.CLERK_PUBLIC_KEY || 'CEhYajX1WwY3uAClBKte5UC6qAC6d7W1';

declare module '@nuxt/types' {
  interface Context {
    $clerk(): any
  }
}

(function(w: any, d: Document) {
  const e = d.createElement('script'); e.type = 'text/javascript'; e.async = true;
  e.src = (d.location.protocol == 'https:' ? 'https' : 'http') + '://cdn.clerk.io/clerk.js';
  const s = d.getElementsByTagName('script')[0]; s.parentNode.insertBefore(e, s);
  w.__clerk_q = w.__clerk_q || []; w.Clerk = w.Clerk || function() {
    w.__clerk_q.push(arguments);
  };
})(window, document);

 Clerk('config', { key: clerkioKey })