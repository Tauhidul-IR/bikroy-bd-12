import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const useToken = email => {
    const [token, setToken] = useState('')
    const navigate = useNavigate();
    useEffect(() => {
        if (email) {
            fetch(`https://bikroy-bd-server.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        localStorage.setItem('accessToken', data.accessToken)
                        setToken(data.accessToken)
                        navigate('/');
                    }
                });
        }
    }, [email]);
    return [token];

}
export default useToken;