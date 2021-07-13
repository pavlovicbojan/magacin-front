import DevelopingAxios from '../apis/DevelopingAxios'
import jwt_decode from "jwt-decode"

export const login = async function(username, password){
    const cred = {
        username: username,
        password: password
    }

    try{
        const ret = await DevelopingAxios.post('korisnici/auth',cred)
        console.log(ret)
        const decoded = jwt_decode(ret.data);
        console.log(decoded.role.authority)
        window.localStorage.setItem('role', decoded.role.authority);
        window.localStorage.setItem('jwt',ret.data)
    }catch(err){
        console.log(err)
    }
    window.location.reload();
}

export const logout = async function(){
    window.localStorage.removeItem('role');
    window.localStorage.removeItem('jwt');
    window.location.reload();
}