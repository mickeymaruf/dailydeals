import axios from "axios";

export const useJWT = email => {
    axios.get(`https://dailydeals-server.vercel.app/jwt?email=${email}`)
        .then(tokenData => {
            localStorage.setItem('DAILY_DEALS_ACCESS_TOKEN', tokenData.data.accessToken);
        })
}