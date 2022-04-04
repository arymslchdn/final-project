import SUPABASE_KEY from '../apikey'
const initData = (token, idUser, idLecture) => (
    fetch(`https://uswqxkmaeotljwtuynhs.supabase.co/rest/v1/documents?lecture_id=eq.${idLecture}&select=*,document_types(*),practices(*)&practices.user_id=eq.${idUser}`,
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
