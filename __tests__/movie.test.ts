import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { SdkModule } from '../src/modules/sdk.module';

function assertMovieObject(movie) {
    expect(movie).toMatchObject({
        _id: expect.any(String),
        name: expect.any(String),
        runtimeInMinutes: expect.any(Number),
        budgetInMillions: expect.any(Number),
        boxOfficeRevenueInMillions: expect.any(Number),
        academyAwardNominations: expect.any(Number),
        academyAwardWins: expect.any(Number),
        rottenTomatoesScore: expect.any(Number),
    });
}

describe('MovieController (e2e)', () => {
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

    let movieId: unknown;
    it('/GET movie', async () => {
        const limit = 10;
        const offset = 0;
        const response = await request(app.getHttpServer())
            .get('/movie')
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`)
            .query({ limit, offset });

        expect(response.status).toBe(200);
        expect(response.body.docs).toBeDefined();
        expect(Array.isArray(response.body.docs)).toBe(true);

        const movie = response.body.docs[0];
        assertMovieObject(movie);

        expect(response.body).toHaveProperty('total');
        expect(response.body).toHaveProperty('limit', limit);
        expect(response.body).toHaveProperty('offset', offset);

        movieId = movie._id;
    });

    it('/GET movie - wrong Authorization', async () => {
        try {
            await request(app.getHttpServer())
                .get(`/movie`)
                .set('Authorization', `Bearer `);
        } catch (err) {
            console.log(err)
            expect(err).toHaveProperty('code');
            expect(err).toHaveProperty('message');
            expect(err.message).toEqual('Authentication is required');
            expect(err).toHaveProperty('details');
        }
    });

    it('/GET movie/:id', async () => {
        const response = await request(app.getHttpServer())
            .get(`/movie/${movieId}`)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body.docs).toBeDefined();

        assertMovieObject(response.body.docs[0]);
    });

    it('/GET movie/:id - wrong Authorization', async () => {
        try {
            await request(app.getHttpServer())
                .get(`/movie/${movieId}`)
                .set('Authorization', `Bearer `);
        } catch (err) {
            console.log(err)
            expect(err).toHaveProperty('code');
            expect(err).toHaveProperty('message');
            expect(err.message).toEqual('Authentication is required');
            expect(err).toHaveProperty('details');
        }
    });

    it('/GET movie/:id/quote', async () => {
        const response = await request(app.getHttpServer())
            .get(`/movie/${movieId}/quote`)
            .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body.docs)).toBe(true);
    });

    it('/GET movie/:id/quote - wrong id provided', async () => {
        try {
            await request(app.getHttpServer())
                .get(`/movie/123/quote`)
                .set('Authorization', `Bearer ${process.env.BEARER_TOKEN}`);
        } catch (err) {
            console.log(err)
            expect(err).toHaveProperty('code');
            expect(err).toHaveProperty('message');
            expect(err.message).toEqual(' Something went wrong.');
            expect(err).toHaveProperty('details');
        }
    });

    it('/GET movie/:id/quote - wrong Authorization', async () => {
        try {
            await request(app.getHttpServer())
                .get(`/movie/123/quote`)
                .set('Authorization', `Bearer `);
        } catch (err) {
            console.log(err)
            expect(err).toHaveProperty('code');
            expect(err).toHaveProperty('message');
            expect(err.message).toEqual('Authentication is required');
            expect(err).toHaveProperty('details');
        }
    });
});
