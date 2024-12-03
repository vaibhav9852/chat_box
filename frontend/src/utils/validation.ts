const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
const emailRegex =   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;

export const isValidPassword =  (password : string) =>{
   return passwordRegex.test(password)
}

export const isValidEmail = (email:string) =>{
    return emailRegex.test(email)
}

