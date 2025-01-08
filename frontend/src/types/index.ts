import { ReactElement } from "react"

export interface User{
   id? : string 
   name : string 
   email: string
   avatar : File | undefined
   password : string 
}
 
export interface ForgotPasswordResponse {
  success: boolean; 
  message : string
}

export interface ResetPasswordResponse {  
  success: boolean; 
}
  
export interface VerifyEmailResponse {
  success: boolean;
  data: {
    id: string;
  };
  token: string; 
}
 interface MemberSec {
   userId : string
   status : boolean
   id : string
 }

export interface SelectedItem {
    id: string;
    name: string;
    avatar?: string | null;
    adminId? : string  
    members? : any
 
  } 



export interface ListProps {
    onSelect: (item: { id: string; name: string; image?: string | null }) => void;
  } 

export interface MessageProps {
  item : {   id:  string 
    adminId? : string
    name    : string 
  }
} 

export interface Messgae{
    id: string
    content : string
    fileUrl? : string
    senderId : string
    adminId? : string
    groupId? : string
    recipientId? : string
}



  
   export interface Member {
      id : string
      name : string
      email: string
      password : string 
  }

  export interface ShowMediaProps {
    item : { type : string 
    fileUrl : string 
    }
  }

  export   interface ProtectedRouteProps {
    element : ReactElement
 }