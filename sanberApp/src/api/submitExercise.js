import SUPABASE_KEY from '../apikey'
const submitExercise = (token, user_id, document_id, answer, is_correct) => (
    fetch('https://uswqxkmaeotljwtuynhs.supabase.co/rest/v1/practices',
    {   
        method: 'POST',
        headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({ user_id, document_id, answer, is_correct })
    })
    .then(res => res.json())
);

export default submitExercise;