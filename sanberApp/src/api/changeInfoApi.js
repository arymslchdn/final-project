import SUPABASE_KEY from '../apikey'
const changeInfoApi = (token, password) => (
    fetch('https://vikrybiztqeanihgvgkm.supabase.co/auth/v1/user',
    {   
        method: 'PUT',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password })
    })
    .then(res => res.json())
);

export default changeInfoApi;
