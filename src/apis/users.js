export const saveUser = async userData => {
    const res = await fetch(`https://dailydeals-server.vercel.app/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    return await res.json();
}