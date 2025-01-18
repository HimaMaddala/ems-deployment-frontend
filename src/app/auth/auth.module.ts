export interface Login {
    username: string;
    email: string;
}

export interface Signup {
    username: string;
    email: string;
    password: string;
    confirm_password: string;
    role: string;
}