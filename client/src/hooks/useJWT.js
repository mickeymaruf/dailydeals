import axios from "axios";

export const useJWT = email => {
    axios.get(`${import.meta.env.VITE_APP_API_URL}/jwt?email=${email}`)
        .then(tokenData => {
            localStorage.setItem('DAILY_DEALS_ACCESS_TOKEN', tokenData.data.accessToken);
        })
}