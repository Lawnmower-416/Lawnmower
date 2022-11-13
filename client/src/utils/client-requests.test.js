// const AuthRequest = require('../requests/auth-request');
// const axios = require('axios');
// const { baseAPI } = require('../requests');
import {authRequest} from './__mocks__/auth-request-test';

// jest.mock('axios');
// jest.mock('../__mocks__/auth-request-test');

const sampleUser = { firstName: "JohnTest", lastName: "Test", username: "jdoe123", email: "t@t.com", password: "test1234", passwordVerify: "test1234" };

describe("User Testing", () => {
    it("register | SUCCESS", async () => {
        // axios.post.mockResolvedValue('Promise').mockResolvedValueOnce({
        //     success: true,
        //     firstName: "JohnTest",
        //     lastName: "Test",
        //     username: "jdoe123",
        //     email: "t@t.com",
        //     password: "test1234",
        //     passwordHash: "someHashedtest1234"
        // });

        // jest.spyon(axios, axios.post);
        // const user = await axios.post(`${baseAPI}/auth/register`, sampleUser.firstName, sampleUser.lastName, sampleUser.username, sampleUser.email, sampleUser.password, sampleUser.passwordVerify);
        // expect(user).toHaveProperty("success", true);
        // expect(axios.post).toHaveBeenCalledTimes(1);

        expect.assertions(1);
        return expect(authRequest('/auth/register/', sampleUser).resolves.toContain("success", true));
    });
});