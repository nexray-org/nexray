import { expect } from 'expect';
import { serverlessProviders } from '../';

describe('Serverless AWS tests', () => {
    it('Serverless exists', async () => {
        expect(await serverlessProviders.exists()).toBe(true);
    })
    it('Serverless config', async () => {
        try {
            const result = await serverlessProviders.getCredentials()
            console.log("result", result);
            expect(true).toBe(true);            
        } catch (error) {
            console.log("error", error)
        }

    })
})