
export interface User{
   id? : string 
   name : string 
   email: string
   avatar : File | undefined
   password : string 
}
 

export interface SelectedItem {
    id: string;
    name: string;
    avatar?: string | null;
    adminId? : string 
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
}


 export interface CreateGroupProps {
    adminId: string;
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