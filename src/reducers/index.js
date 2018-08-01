import { combineReducers } from 'redux';
import { nprogress } from 'redux-nprogress';

import { authentication } from './authentication.reducer';
import { profile } from './profile.reducer';
import { users } from './users.reducer';
import { alerts } from './alerts.reducer';

const rootReducer = combineReducers({
  authentication,
  profile,
  users,
  alerts,
  nprogress
});

export default rootReducer;
