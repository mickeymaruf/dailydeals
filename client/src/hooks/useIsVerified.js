export const useIsVerified = async (email) => {
    const data = await fetch(`${import.meta.env.VITE_APP_API_URL}/isVerified?email=${email}`)
    const res = await data.json();
    return res;
}