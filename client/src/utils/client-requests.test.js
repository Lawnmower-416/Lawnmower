import axios from "axios";

jest.mock('axios');

const baseURL = 'https://ec2-3-89-194-170.compute-1.amazonaws.com:3000';
const sampleUser = { firstName: "JohnTest", lastName: "Test", username: "jdoe123", email: "t@t.com", password: "test11234", passwordVerify: "test1234" };

const createUser = async (data) => {
    const url = `${baseURL}/auth/register`;
    return await axios.post(url, data);
}

describe("User Testing", () => {
    it("Creates User Successfully", async () => {
        // const result = await axios.post(`${baseURL}/auth/register`, sampleUser);
        axios.post.mockImplementationOnce(sampleUser);

        const result = await createUser(sampleUser);
        
        expect(axios.post).toHaveBeenCalledWith(`${baseURL}/auth/register`, sampleUser);
        expect(result).toEqual(users);
    });
});