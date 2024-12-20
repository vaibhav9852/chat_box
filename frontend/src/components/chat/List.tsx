
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGroups, getUsers } from "src/services/groupService";
import { ListProps } from "src/types"; 
import Loading from "../common/Loading";  
import Error from "../common/Error"; 



const List: React.FC<ListProps> = ({ onSelect }) => {
  const [list,setList] = useState<object[]>([]) 
  const { data: users, status: userStatus } = useQuery({ queryKey: ["users"], queryFn: getUsers });
  const { data: groups, status: groupStatus } = useQuery({ queryKey: ["groups"], queryFn: getGroups });
  
  
   let combinedList = [
    ...(users?.data?.data || []),
    ...(groups?.data?.data || []), 
  ];
   
     
  if (userStatus === "pending") return <Loading />;
  if (userStatus === "error")
    return <Error message={"Error fetching users and groups"} />;
   
   
  return (
    <ul className="space-y-2">
      { combinedList.map((item: any) => (
 
        <li 
          key={item.id}
          onClick={() => onSelect(item)} 
          className="p-2 bg-gray-100 rounded-md hover:bg-gray-400 cursor-pointer flex items-center space-x-4"
        >
          {item.avatar ? (
            <img src={item.avatar} alt={item.name} className="w-8 h-8 rounded-full" />
          ) : (
            <div className="w-8 h-8 flex items-center justify-center bg-gray-400 text-white rounded-full">
              {item.name.charAt(0).toUpperCase()}
            </div>
          )}
          <span>{item.name}</span>
        
        </li>
      ))}
    </ul>
  );
};

export default List; 


