import axios from "axios";

jest.mock('axios');

const baseURL = 'https://ec2-3-94-193-80.compute-1.amazonaws.com:3000';
const sampleUser = { firstName: "JohnTest", lastName: "Test", username: "jdoe123", email: "t@t.com", password: "test1234", passwordVerify: "test1234" };

describe("User Testing", () => {
    it("Creates User Successfully", async (done) => {
        // axios.post.mockResolvedValueOnce(sampleUser);
        const result = await axios.post(`${baseURL}/auth/register`, sampleUser);
        console.log(result);
        // when
        // const result = await api.register(sampleUser.firstName, sampleUser.lastName, sampleUser.username, sampleUser.email, sampleUser.password, sampleUser.passwordVerify);
        // const result = await api.post('/auth/register', sampleUser);

        expect(axios.post).toHaveBeenCalledWith(`${baseURL}/auth/register`, sampleUser);
        expect(result).toEqual(sampleUser);
    });
});