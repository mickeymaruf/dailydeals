export const saveUser = async userData => {
    const res = await fetch(`${import.meta.env.VITE_APP_API_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    return await res.json();
}