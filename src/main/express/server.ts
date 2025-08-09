import { env } from '@config/env';

import { app } from './app';

app.listen(+env.port, '192.168.18.13', () => {
  console.log(`🚀 Server started at http://localhost:${env.port}`);
});
