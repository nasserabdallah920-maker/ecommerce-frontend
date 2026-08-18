export interface ILoginCredentials {
    email:string,
    password:string
}

export interface ISignupData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
}

export interface SignupAction {
    type: string;
    value: string;
}

export interface IChangePasswordRequest {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}
