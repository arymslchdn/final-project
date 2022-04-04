import SUPABASE_KEY from '../apikey'
const initData = (token) => (
    fetch('https://uswqxkmaeotljwtuynhs.supabase.co/rest/v1/courses?select=*',
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

export default initData;
