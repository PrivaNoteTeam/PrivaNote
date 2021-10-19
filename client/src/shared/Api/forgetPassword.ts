import axios from 'axios';
import { FieldError, ForgotPasswordFormValues } from '@types';


interface forgetPasswordResponse{
    success?: boolean;
    fieldError?: FieldError;
}

export async function forgetPassword({email}: ForgotPasswordFormValues){

    return new Promise<forgetPasswordResponse>((resolve, reject) => {

        axios

        .post('http://localhost:8080/api/forgot-password',{email})
        .then((response) => {
            resolve(response.data as forgetPasswordResponse);

           
        })

        .catch((err) => {
            console.error(err);
            reject(err);
        });
    })
    
}

