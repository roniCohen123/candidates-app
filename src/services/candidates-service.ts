import axios from "axios";

const API_URL = 'http://localhost:3001/candidates';

class CandidatesService {
    public static async getCandidates(): Promise<any[]> {
        try {
            const response = await axios.get(API_URL, {});
            return response.data.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    }
}

export default CandidatesService;
