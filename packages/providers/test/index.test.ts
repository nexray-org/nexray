import { serverlessProviders } from '../src';
import tap from 'tap';

tap.test('Serverless config exists', async tap => {
    const files = await serverlessProviders.exists();
    if (await serverlessProviders.exists()) {
    
        tap.pass('Serverless config exists');
    } else {
        tap.fail('Serverless config does not exist')
    }
})

tap.test('AWS credentials exists', async tap => {
    const credentials = await serverlessProviders.getCredentials()
    console.log("credentials", credentials);
    tap.pass()
})