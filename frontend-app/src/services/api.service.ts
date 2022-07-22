export interface User {
    email: string
    password_hash: string
    password_salt: string
}

class ApiService {
    private readonly API_URL: string = 'http://localhost:8080/api'


    async login(): Promise<boolean> {
        const response = await fetch(`${this.API_URL}/login`, {
            method: 'post',
            body: JSON.stringify({
                email: 'daniel@flockert.at',
                password: 'rathalin',
            })
        })
        return response.status === 200
    }

    async getUsers(): Promise<User[]> {
        const response = await fetch(`${this.API_URL}/users`, {
            method: 'get',
        })
        return await response.json() as User[]
    }
}

export const apiService = new ApiService();
