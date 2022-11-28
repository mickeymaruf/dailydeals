export const useIsVerified = async (email) => {
    const data = await fetch(`https://dailydeals-server.vercel.app/isVerified?email=${email}`)
    const res = await data.json();
    return res;
}