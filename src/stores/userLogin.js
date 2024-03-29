import { computed, ref } from "vue";
import { defineStore } from "pinia";
import http from '../services/http'
import router from "../router";

export const userLogin = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));
    const user = ref(JSON.parse(localStorage.getItem('user')));
    const isAuth = ref(false);

    function setToken(tokenValue){
        localStorage.setItem('token', tokenValue);
        token.value = tokenValue;
    }

    function setUser(userValue){
        localStorage.setItem('user', JSON.stringify(userValue));
        user.value = userValue;
    }

    function setIsAuth(auth){
        isAuth.value = auth
    }

    const fullName = computed(() => {
        return user.value.firstName + ' ' + user.value.lastName;
    })

    const initials = computed(() => {
        const firstName = user.value.firstName.charAt(0);
        const lastName = user.value.lastName.charAt(0);
        return firstName + '' + lastName;
      });

    const role = computed(() => {
        return user.value.role;
    })

    async function checkToken(){
        try {
            const tokenAuth = 'Bearer ' + token.value; 
            const {data} = await http.get('/login/verify', {
                headers: {
                    Authorization: tokenAuth
                }
            });
            return data;
        } catch (error) {
            clear()
            router.push('/unauthorized')
            console.log(error.response.data);
        }
    }

    function clear() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        isAuth.value = false;
        token.value = '';
        user.value= '';
    }

    return {
        token,
        user,
        setToken,
        setUser,
        checkToken,
        fullName,
        initials,
        role,
        clear,
        setIsAuth,
        isAuth
    }
})