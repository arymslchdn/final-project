import SUPABASE_KEY from '../apikey'
const signIn = (email, password) => (
    fetch('https://uswqxkmaeotljwtuynhs.supabase.co/auth/v1/token?grant_type=password',
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

export default signIn;