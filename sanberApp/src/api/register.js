import SUPABASE_KEY from '../apikey'
const register = (email, password) => (
    fetch('https://uswqxkmaeotljwtuynhs.supabase.co/auth/v1/signup',
    {   
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
);

export default register;