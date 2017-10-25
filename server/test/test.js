/**
 * Make any/all changes you see fit based on your experience. Every detail you (do not) change will be subject to
 * questioning during the in person interview.
 *
 * Good luck.
 */
 //first to do is still split these tests up so there aren't dependencies

process.env.NODE_ENV = 'test';

const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../');
const should = chai.should();
var faker = require('faker');
var email1 = faker.internet.email().toLowerCase()

chai.use(chaiHttp)
let user, movie

const newUser = {
  email: email1,
  password: 'ASecretSoBigNoOneCanBreak'
}
console.log(email1)
const wrongPasswordUser = {
  email: email1,
  password: 'password'
}

describe('Authentication Tests', function() {


  // this is expected to work the first time. Fail everytime thereafter
  describe('Registration', function() {
    it('Should register a new user', function(done) {
      chai.request(server).post('/register').send(newUser).end(function (err, res) {
        assert.equal(err, undefined)
        assert.equal(res.body.success, true)
        res.should.have.status(201);
        res.body.user.should.be.a('object');
        res.body.user.should.have.property('_id');
        res.body.user.should.have.property('token');
        email = res.body.email
        done();
      });
    });

  it('Should fail to register with an email already taken', function(done) {
      chai.request(server).post('/register').send(newUser).end(function (err, res) {
        assert.equal(err, undefined)
        res.should.have.status(200);
        assert.equal(res.body.success, true)
        res.body.success.should.be.a('boolean');
        assert.equal(res.body.message, "User with that email already taken.")
        res.body.should.not.have.property('user')
        done();
      });
    });
  });
  describe('Login', function() {
    it('Should login successfully', function (done) {
      chai.request(server).post('/login').send(newUser).end(function (err, res) {
        assert.equal(err, undefined)
        assert.equal(res.body.success, true)
        res.should.have.status(200);
        res.body.user.should.be.a('object');
        res.body.user.should.have.property('_id');
        res.body.user.should.have.property('token');
        user = res.body.user
        done();
      });
    });
    it('Should send back an unauthorized error', function(done) {
      chai.request(server).post('/login').send(wrongPasswordUser).end(function (err, res) {
        res.should.have.status(401);
        done();
      });
    });
    it('Should send back a not found error', function(done) {
      chai.request(server).post('/login').send({user: 'aaron@test.com', password: 'hello123'}).end(function (err, res) {
        res.should.have.status(400);
        done();
      });
    });
  });
  describe('Cleanup', function() {
    it('Should delete the new user', function(done) {
      chai.request(server).delete('/register').send(newUser).end(function (err, res) {
        assert.equal(err, undefined)
        assert.equal(res.body.success, true)
        res.should.have.status(201);
        done();
      });
    });
  });
});

//all these data values need to be extracted to json files
describe('Movie Tests', function() {
  let newMovie = {
    imagePoster: '',
    title: 'Testing Title',
    genre: 'Testing Genre',
    rating: '10',
    actors: 'Steve Martin, Collin Ferral, Leo Decaprio',
    year: '2017'
  }
  let noMovie = {
    imagePoster: '',
    title: 'Jack',
    genre: 'John',
    rating: '10',
    actors: 'Frank',
    year: '2017'
  }
  let newMovie2 = {
    imagePoster: '',
    title: 'Testing Title',
    genre: 'Testing Genre',
    rating: '10',
    actors: 'Steve Martin, Collin Ferral, Leo Decaprio, Shirly Temple',
    year: '2017'
  }
  describe('Create', function() {
    it('Should create a new movie with the API', function(done) {
      chai.request(server).post('/movie').set('Authorization', user.token).send(newMovie).end(function (err, res) {
        assert.equal(err, undefined)
        assert.equal(res.body.success, true)
        res.should.have.status(201);
        done();
      });
    });
  });

  describe('Read', function() {
    it('Should send back a list of all movies', function(done) {
      chai.request(server).get('/movies').end(function (err, res) {
        assert.equal(err, undefined)
        assert.equal(res.body.success, true)
        res.should.have.status(200);
        res.body.movies.should.be.a('array');
        res.body.movies.length.should.not.be.eql(0);
        done();
      });
    });
    //values are hardcoded for now, but need to move them to a variable
    it('Should send back a list of a Users movies', function(done) {
      chai.request(server).get('/users/59eb52f9d5a59357aa1080e1/movies').end(function (err, res) {
        assert.equal(err, undefined)
        assert.equal(res.body.success, true)
        res.should.have.status(200);
        res.body.movies.should.be.a('array');
        res.body.movies.length.should.not.be.eql(0);
        done();
      });
    });
  });

  describe('Update', function() {
    it('Should update a movie', function(done) {
      chai.request(server).post('/movie/59ee216c4990e906d500f7e4/').set('Authorization', user.token).send(newMovie2).end(function (err, res) {
        assert.equal(err, undefined)
        assert.equal(res.body.success, true)
        res.should.have.status(200);
        done();
      });
    });

    it('Should return an error for not finding requested movie to be updated', function(done) {
      chai.request(server).post('/movie/noMovie').set('Authorization', user.token).send(noMovie).end(function (err, res) {
        assert.equal(err, undefined)
        assert.equal(res.body.success, true)
        res.should.have.status(200);
        assert.equal(res.body.message, "Unable to locate that movie.")
        done();
      });
    });
  });

  describe('Delete', function() {
    it('Should remove the movie', function(done) {
      chai.request(server).delete('/movie/59ee216c4990e906d500f7e4/').set('Authorization', user.token).send(newMovie).end(function (err, res) {
        assert.equal(err, undefined)
        assert.equal(res.body.success, true)
        res.should.have.status(200);
        done();
      });
    });
  });

});
