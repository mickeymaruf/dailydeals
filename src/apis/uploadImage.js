const uploadImage = async (formData) => {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_APP_IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
    })
    return await res.json();
}

export default uploadImage;