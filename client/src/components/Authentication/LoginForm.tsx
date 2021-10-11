//rfce enter make react
import React , {useState} from 'react'
import { useForm } from 'react-hook-form';
import { ModalLayout } from '../Modal';
import { TextField } from '../TextField';

interface LoginDetails{
  email: string,
  password : string
}
interface Props {
  Login: (details: LoginDetails) => void;
  error: string;
  close: ()=>void;
  
}
function LoginForm({ close , Login,error }: Props )
{

    const [details , ] = useState<LoginDetails>({ email: "", password: "" })
    
    const submitHandler = (e: { preventDefault: () => void; })=>{
        e.preventDefault();
        Login(details);
    }

    const { register } = useForm<LoginDetails>();

    return (
      
      <ModalLayout close={close}>

        <form onSubmit = {submitHandler} 					className='w-80 space-y-10'        >
        <h2 className='text-center text-2xl text-white font-bold'>Login</h2>
              
          <div className="form-inner">

              
              {(error != "") ? (<div className="error"></div>) : ""}

              <div className="space-y-6 ...">
              <TextField name="email" register={register}   />
          
               <TextField name="password" register={register}   />

               <div className='flex justify-end'>
						<input
							type='submit'
							value='Sign in'
							className='pn-button bg-blue-500 bg-opacity-50 border-blue-500 hover:border-blue-400 mergin-top:'
						/>

					</div>
          
              </div>
           

         
          </div>
        </form>
        </ModalLayout>
    )
    
}

export default LoginForm



