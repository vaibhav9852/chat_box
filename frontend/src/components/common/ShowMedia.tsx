import { ShowMediaProps } from "@/src/types"

const ShowMedia : React.FC<ShowMediaProps> = ({item}) =>{
 
    if(item.type == 'jpg' || item.type == 'png'){
      return (
        <div className="w-40 h-40"> 
        <img src={item.fileUrl} alt="image" />    
        </div>
      )
    }  else if(item.type == 'webm'){
        return(
            <>
             {item.fileUrl && (
          <audio controls>
            <source src={item.fileUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        )}
            </>
        )
    } else if(item.type == 'mp4'){
        return(
            <>
            <p>video file</p> 
            </>
        )
    }else{
        return null  
    }

}

export default ShowMedia