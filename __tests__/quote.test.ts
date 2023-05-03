import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { SdkModule } from '../src/modules/sdk.module';

function assertQuoteObject(quote) {
    expect(quote).toMatchObject({
        _id: expect.any(String),
        dialog: expect.any(String),
        movie: expect.any(String),
        character: expect.any(String),
    });
}

describe('QuoteController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [SdkModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    let quoteId: unknown;
    it('/GET quote', async () => {
        const limit = 10;
        const offset = 0;
        const response = await request(app.getHttpServer())
            .get('/quote')
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .query({ limit, offset });

        expect(response.status).toBe(200);
        expect(response.body.docs).toBeDefined();
        expect(Array.isArray(response.body.docs)).toBe(true);

        const quote = response.body.docs[0];
        assertQuoteObject(quote);

        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('limit', limit);
        expect(response.body).toHaveProperty('offset', offset);

        quoteId = quote._id;
    });

    it('/GET quote - wrong Authorization', async () => {
        try {
            await request(app.getHttpServer())
                .get(`/quote`)
                .set('Authorization', `Bearer `);
        } catch (err) {
            expect(err).toHaveProperty('code');
            expect(err).toHaveProperty('message');
            expect(err.message).toEqual('Authentication is required');
            expect(err).toHaveProperty('details');
        }
    });

    it('/GET quote/:id', async () => {
        const response = await request(app.getHttpServer())
            .get(`/quote/${quoteId}`)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.docs).toBeDefined();

        assertQuoteObject(response.body.docs[0]);
    });

    it('/GET quote/:id - wrong Authorization', async () => {
        try {
            await request(app.getHttpServer())
                .get(`/quote/${quoteId}`)
                .set('Authorization', `Bearer `);
        } catch (err) {
            expect(err).toHaveProperty('code');
            expect(err).toHaveProperty('message');
            expect(err.message).toEqual('Authentication is required');
            expect(err).toHaveProperty('details');
        }
    });
});
