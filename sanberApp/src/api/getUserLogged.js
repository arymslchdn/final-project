import SUPABASE_KEY from '../apikey'
const getUserLogged = (token) => (
    fetch('https://vikrybiztqeanihgvgkm.supabase.co/auth/v1/user',
    {
        method: 'GET',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
);

export default getUserLogged;
