import SUPABASE_KEY from '../apikey'
const initData = (token, id) => (
    fetch(`https://uswqxkmaeotljwtuynhs.supabase.co/rest/v1/chapters?course_id=eq.${id}&select=*,lectures(*)`,
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
