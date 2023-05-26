import {SimpleSequentialChain} from "langchain/chains";
import {OpenAI} from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";

// Reference https://js.langchain.com/docs/modules/chains/sequential_chain

const llmTemperature: number = 0.7;

const llm = new OpenAI({openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY, temperature: llmTemperature});

let template = `
You are a playwright. Given the title of play, it is your job to write a synopsis for that title.
Title: {title}
Playwright: This is a synopsis for the above play:`

let prompt = new PromptTemplate({
    template: template,
    inputVariables: ["title"],
});


const synopsisChain = new LLMChain({llm: llm, prompt: prompt});

template = `You are a play critic from the New York Times. Given the synopsis of play, it is your job to write a review for that play.

Play Synopsis:
{synopsis}
Review from a New York Times play critic of the above play:`

prompt = new PromptTemplate({
    template: template,
    inputVariables: ["synopsis"],
});

const reviewChain = new LLMChain({llm: llm, prompt: prompt});

const overallChain = new SimpleSequentialChain({
    chains: [synopsisChain, reviewChain],
});

const review = await overallChain.run("Tragedy at sunset on the beach")
console.log(review)
