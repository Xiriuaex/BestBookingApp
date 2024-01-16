import { useMutation, useQueryClient } from "react-query"
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
    
    const queryClient = useQueryClient();

    const { showToast } = useAppContext();
    const navigate = useNavigate();

    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken");
            showToast({message: "Sign Out!", type:"SUCCESS"});
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({message: error.message, type:"ERROR"});
        }
    })

    const handleClick = () => {
        mutation.mutate();
    }

  return (
    <div>
      <button onClick={handleClick} className='flex items-center h-8 px-3 font-bold rounded-lg text-[#3e3e3e] bg-[#bbeeff] hover:scale-90 duration-700'>Sign Out</button>
    </div>
  )
}

export default SignOutButton
