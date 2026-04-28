import 'dotenv/config';

const getGeminiAiAPIResponse = async (message) => {
    const API_KEY = process.env.GEMINI_API_KEY;
    const MODEL = "gemini-3-flash-preview";
    const URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [{ text: message }]
                }
            ]
        })
    };

    try {
        const response = await fetch(URL, options);
        const data = await response.json();
        // console.log(data.candidates[0].content.parts[0].text);
        return (data.candidates[0].content.parts[0].text);
    } catch (err) {
        console.log(err);
    }
}

export default getGeminiAiAPIResponse;