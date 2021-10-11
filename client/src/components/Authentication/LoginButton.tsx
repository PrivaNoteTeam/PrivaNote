import React from 'react'
import CircleUser from '../../assets/icons/user-circle.svg'
interface Props {
    authModalVisible: boolean;
    setAuthModalVisible: React.Dispatch<boolean>;
}

function LoginButton({ authModalVisible, setAuthModalVisible }: Props) {
    const handleClick = () => {
        setAuthModalVisible(!authModalVisible)
    }

    return (
        
            
         <div className="cursor-pointer height='100px' bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center" onClick={handleClick}><CircleUser/></div>
       
       
    )
}

export default LoginButton
