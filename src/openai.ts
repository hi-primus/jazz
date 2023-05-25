import { Configuration, OpenAIApi } from 'openai';

export class OpenAI {
    private static instance: OpenAI;
    private openai: OpenAIApi;

    private constructor(apiKey: string) {
        // Create the Configuration and OpenAIApi instances
        this.openai = new OpenAIApi(new Configuration({ apiKey }));
    }

    public static getInstance(apiKey: string): OpenAI {
        if (!OpenAI.instance) {
            OpenAI.instance = new OpenAI(apiKey);
        }
        return OpenAI.instance;
    }

    // Asynchronous function to generate text from the OpenAI API
    public async generateText(prompt: string, model: string, max_tokens: number, temperature = 0.85): Promise<string> {
        try {
            // Send a request to the OpenAI API to generate text
            const response = await this.openai.createCompletion({
                model,
                prompt,
                max_tokens,
                n: 1,
                temperature,
            });
            console.log(`request cost: ${response?.data?.usage?.total_tokens} tokens`);
            // Return the text of the response
            return response.data.choices[0].text as string;
        } catch (error) {
            throw error;
        }
    }
}
