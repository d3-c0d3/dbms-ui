import {environment} from '../../../environments/environment';

export const DATABASE_KEY = Object.freeze({
  loginToken: 'DBMS_TOKEN_' + environment.VERSION,
  loggInSession: 'DBMS_SESSION_' + environment.VERSION,
  loginTokenAdmin: 'DBMS_ADMIN_TOKEN_' + environment.VERSION,
  loggInSessionAdmin: 'DBMS_ADMIN_SESSION_' + environment.VERSION,
  encryptAdminLogin: 'DBMS_USER_0_' + environment.VERSION,
  encryptUserLogin: 'DBMS_USER_1_' + environment.VERSION,
  loginAdminRole: 'DBMS_ADMIN_ROLE_' + environment.VERSION,
  userCookieTerm: 'DBMS_COOKIE_TERM' + environment.VERSION,
});
