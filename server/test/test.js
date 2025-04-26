process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../'); // Assuming server starts itself or exports app
const expect = chai.expect;

chai.use(chaiHttp);

describe('API Tests', () => {
    let testUser;
    let token;
    let createdMovieId;

    // ---- Test Data Factories ----
    const createUserData = () => ({
        email: faker.internet.email().toLowerCase(),
        password: 'aValidPassword123',
    });

    const createMovieData = () => ({
        title: `Test Movie ${faker.lorem.words(3)}`,
        genre: faker.music.genre(),
        rating: faker.datatype.number({ min: 1, max: 10 }).toString(),
        actors: `${faker.name.firstName()} ${faker.name.lastName()}`,
        year: faker.date.past(10).getFullYear().toString(),
        // imagePoster: ... // handle appropriately
    });

    // ---- Hooks ----
    before(async () => {
        // Optional: Global setup like ensuring DB connection
        // Optional: Clean up database before ALL tests run
        // await User.deleteMany({});
        // await Movie.deleteMany({});
    });

    after(async () => {
        // Optional: Global teardown
    });

    describe('Authentication API (/register, /login)', () => {
        const userData = createUserData();
        let userId;

        afterEach(async () => {
            // Clean up the user created in this test block
            if (userId) {
                try {
                    // Need an endpoint/method to delete users for testing
                    // Assuming DELETE /users/:id requires admin or specific auth - adjust as needed
                    // For simplicity, maybe a dedicated test cleanup endpoint?
                    // Or direct DB access if necessary for cleanup:
                    // await User.findByIdAndDelete(userId);
                    console.log(`Cleanup: User ${userId} should be deleted here.`);
                    userId = null; // Reset for next test
                } catch (err) {
                    console.error("Cleanup failed:", err);
                }
            }
        });

        it('POST /register - Should register a new user', async () => {
            const res = await chai.request(server)
                .post('/register')
                .send(userData);

            expect(res).to.have.status(201);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(true);
            expect(res.body.user).to.include.keys('_id', 'token');
            expect(res.body.user.email).to.equal(userData.email); // Check email if returned
            userId = res.body.user._id; // Store ID for cleanup
        });

        it('POST /register - Should fail with 409 if email is already taken', async () => {
            // First, create the user
            const regRes = await chai.request(server).post('/register').send(userData);
            expect(regRes).to.have.status(201);
            userId = regRes.body.user._id; // Store ID for cleanup

            // Then, try to register again with the same email
            const res = await chai.request(server)
                .post('/register')
                .send(userData);

            // Assuming API returns 409 Conflict and { success: false }
            expect(res).to.have.status(409); // Adjust status code if API behaves differently
            expect(res.body.success).to.equal(false); // Adjust if API behaves differently
            expect(res.body.message).to.equal("User with that email already taken."); // Or similar
            expect(res.body).to.not.have.property('user');
        });

        it('POST /login - Should login successfully with correct credentials', async () => {
            // Register user first
            const regRes = await chai.request(server).post('/register').send(userData);
            expect(regRes).to.have.status(201);
            userId = regRes.body.user._id;

            // Attempt login
            const res = await chai.request(server)
                .post('/login')
                .send(userData);

            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.user).to.include.keys('_id', 'token');
            expect(res.body.user._id).to.equal(userId);
        });

        it('POST /login - Should fail with 401 for incorrect password', async () => {
             // Register user first
            const regRes = await chai.request(server).post('/register').send(userData);
            expect(regRes).to.have.status(201);
            userId = regRes.body.user._id;

            const wrongPasswordData = { ...userData, password: 'wrongPassword' };
            const res = await chai.request(server)
                .post('/login')
                .send(wrongPasswordData);

            expect(res).to.have.status(401); // Unauthorized
        });

         it('POST /login - Should fail with 400/404 for non-existent user', async () => {
            const nonExistentUserData = createUserData(); // Email not registered
            const res = await chai.request(server)
                .post('/login')
                .send(nonExistentUserData);

            // Status could be 400 Bad Request or 404 Not Found depending on API design
            expect(res).to.have.status(400); // Or 404
         });

    });

    describe('Movies API (/movies, /movie)', () => {
        // Use hooks for setup/teardown common to movie tests
        beforeEach(async () => {
            // 1. Create a user for this test block
            testUser = createUserData();
            const regRes = await chai.request(server).post('/register').send(testUser);
            expect(regRes).to.have.status(201);
            testUser._id = regRes.body.user._id;
            token = regRes.body.user.token; // Get token
        });

        afterEach(async () => {
            // Clean up movie and user
            if (createdMovieId) {
                 try {
                    // Assuming DELETE /movie/:id exists and works with token auth
                    await chai.request(server)
                        .delete(`/movie/${createdMovieId}`)
                        .set('Authorization', `Bearer ${token}`); // Standard Bearer token format
                    createdMovieId = null;
                 } catch(err) { console.error("Movie cleanup failed:", err); }
            }
             if (testUser && testUser._id) {
                 try {
                    // Direct DB access or cleanup endpoint needed here
                    console.log(`Cleanup: User ${testUser._id} should be deleted here.`);
                    testUser = null;
                    token = null;
                 } catch(err) { console.error("User cleanup failed:", err); }
            }
        });

        it('POST /movie - Should create a new movie', async () => {
            const movieData = createMovieData();
            const res = await chai.request(server)
                .post('/movie')
                .set('Authorization', `Bearer ${token}`) // Use Bearer scheme usually
                .send(movieData);

            expect(res).to.have.status(201);
            expect(res.body.success).to.equal(true);
            expect(res.body.movie).to.be.an('object');
            expect(res.body.movie).to.include.keys('_id', 'title', 'genre'); // Add other keys
            expect(res.body.movie.title).to.equal(movieData.title);
            createdMovieId = res.body.movie._id; // Capture ID for later tests/cleanup
        });

        it('GET /movies - Should return a list of movies', async () => {
             // Optional: Create a movie first to ensure list isn't empty
             await chai.request(server).post('/movie').set('Authorization', `Bearer ${token}`).send(createMovieData());

             const res = await chai.request(server).get('/movies'); // Assuming public endpoint
             expect(res).to.have.status(200);
             expect(res.body.success).to.equal(true);
             expect(res.body.movies).to.be.an('array');
             // Add more specific checks if needed (e.g., structure of movie objects in array)
        });

        it('GET /users/:userId/movies - Should return movies for a specific user', async () => {
            // Create a movie associated with the testUser
            const movieData = createMovieData();
            const createRes = await chai.request(server).post('/movie').set('Authorization', `Bearer ${token}`).send(movieData);
            createdMovieId = createRes.body.movie._id;

            const res = await chai.request(server)
                .get(`/users/${testUser._id}/movies`); // Use dynamic user ID
                // .set('Authorization', `Bearer ${token}`); // Add if endpoint requires auth

            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.movies).to.be.an('array');
            expect(res.body.movies.length).to.be.greaterThan(0);
            // Check if the created movie is in the list
            expect(res.body.movies.some(m => m._id === createdMovieId)).to.be.true;
        });


        it('PUT /movie/:movieId - Should update a movie', async () => { // Using PUT (or PATCH)
            // 1. Create a movie
            const movieData = createMovieData();
            const createRes = await chai.request(server).post('/movie').set('Authorization', `Bearer ${token}`).send(movieData);
            createdMovieId = createRes.body.movie._id;

            // 2. Update the movie
            const updateData = { ...movieData, title: "Updated Title", rating: "1" };
            const res = await chai.request(server)
                .put(`/movie/${createdMovieId}`) // Use PUT or PATCH and dynamic ID
                .set('Authorization', `Bearer ${token}`)
                .send(updateData);

            expect(res).to.have.status(200);
            expect(res.body.success).to.equal(true);
            expect(res.body.movie).to.be.an('object');
            expect(res.body.movie.title).to.equal("Updated Title");
            expect(res.body.movie.rating).to.equal("1");

            // Optional: Fetch again to verify
            const fetchRes = await chai.request(server).get(`/movie/${createdMovieId}`).set('Authorization', `Bearer ${token}`); // Assuming GET /movie/:id exists
            expect(fetchRes.body.movie.title).to.equal("Updated Title");
        });


         it('PUT /movie/:movieId - Should return 404 for non-existent movie ID', async () => {
            const nonExistentId = '609e14e8d4a9f934c8e4e8f0'; // Example valid but likely non-existent ID
            const updateData = createMovieData();

            const res = await chai.request(server)
                .put(`/movie/${nonExistentId}`) // Use PUT or PATCH
                .set('Authorization', `Bearer ${token}`)
                .send(updateData);

            expect(res).to.have.status(404); // Not Found
            expect(res.body.success).to.equal(false); // Assuming API returns false on failure
         });

        it('DELETE /movie/:movieId - Should delete a movie', async () => {
             // 1. Create a movie
            const movieData = createMovieData();
            const createRes = await chai.request(server).post('/movie').set('Authorization', `Bearer ${token}`).send(movieData);
            createdMovieId = createRes.body.movie._id;
            const idToDelete = createdMovieId; // Store because afterEach will clear createdMovieId

             // 2. Delete the movie
            const res = await chai.request(server)
                .delete(`/movie/${idToDelete}`) // Use dynamic ID
                .set('Authorization', `Bearer ${token}`);

            expect(res).to.have.status(200); // Or 204 No Content
            expect(res.body.success).to.equal(true); // Or body might be empty for 204

            // 3. Verify deletion (expect 404)
            const fetchRes = await chai.request(server)
                .get(`/movie/${idToDelete}`)
                .set('Authorization', `Bearer ${token}`); // Assuming GET /movie/:id exists
            expect(fetchRes).to.have.status(404);

            createdMovieId = null; // Prevent afterEach from trying to delete again
        });

         it('DELETE /movie/:movieId - Should return 404 for non-existent movie ID', async () => {
            const nonExistentId = '609e14e8d4a9f934c8e4e8f0';
             const res = await chai.request(server)
                .delete(`/movie/${nonExistentId}`)
                .set('Authorization', `Bearer ${token}`);

            expect(res).to.have.status(404);
            expect(res.body.success).to.equal(false);
         });
    });
});
