const { Configuration, OpenAIApi } = require('openai');

const openai = new OpenAIApi(new Configuration({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY
}));

const generateText = async (prompt:String) => {
    const response = await openai.createCompletion(
        {
            prompt,
            temperature: 0.7,
            maxTokens: 100
        }
    );

    return response.choices[0].text;
};

const text = await generateText("Write a poem about a cat.");

console.log(text);
