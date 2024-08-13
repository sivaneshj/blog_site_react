import { useState,useEffect } from "react";
import axios from "axios";

const useAxios=(dataurl)=>{ 
    const [data,setdata] = useState([]);
    const [axifetcherror,setfetcherror]=useState(null)
    const [axiloading,setloading] = useState(false);
    useEffect(()=>{
        let mounted = true
        const source=axios.CancelToken.source()

        const fetchdata=async(url)=>{
            setloading(true)
            try{
                const response=await axios.get(url,{
                    CancelToken:source.token
                });
                if(mounted){
                    setdata(response.data)
                    setfetcherror(null)
                }
            }catch(err){
                if(mounted){
                    setfetcherror(err.message);
                    setdata([])
                }
            }
            finally{
                mounted && setloading(false)
            }
        }
        fetchdata(dataurl);

        const cleanup=()=>{
            mounted= false
            source.cancel()
        }
        return cleanup;
    },[dataurl])
    return {data,axifetcherror,axiloading};
}
export default useAxios;