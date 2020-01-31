import axios from 'axios';
import compose from 'rippleware';

export { normalize } from './transform';

export const https = () => handle => handle(
  'String',
  (url, last) => axios(
    {
      method: 'get',
      url,
    },
  )
  .then(({ data }) => data),
);
  
export default compose;
