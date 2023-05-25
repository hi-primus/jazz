// import {OpenAI} from "langchain/llms/openai";
// import {PromptTemplate} from "langchain/prompts";
// import {LLMChain} from "langchain/chains";
//
// const model = new OpenAI({openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY, temperature: 0.9});
//
// const template = "What is a good name for a company that makes {product}?";
// const prompt = new PromptTemplate({
//     template: template,
//     inputVariables: ["product"],
// });
//
// const chain = new LLMChain({llm: model, prompt: prompt});
//
// const res = await chain.call({product: "colorful socks"});
// console.log(res.text);
// console.log()

import {OpenAI} from "langchain/llms/openai";
import {
    instructionsToOptimus,
    templateCreateDateFormat,
    templateDataSummary,
    templateProgramByExample,
    templateRegex,
    textToInstructions
} from "./prompts";
import {LLMChain, PromptTemplate} from "langchain";
import {SimpleSequentialChain} from "langchain/chains";


const llmTemperature: number = 0.7;

const model = new OpenAI({openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY, temperature: llmTemperature});

/**
 * Explain or create a summary of the Data and the columns.
 * @param dataSchema - The data schema like the following:
 *     | ID | Subscription_Date | Package_Type | Monthly_Cost | Data_Usage_GB | Overage_Fees | Total_Calls | Churned |
 *     |----|-------------------|--------------|--------------|---------------|--------------|-------------|---------|
 *     | 1  | 2021-01-01       | Premium      | 30.00        | 12.5          | 0.00         | 500         | No      |
 *     | 2  | 2020-07-01       | Standard     | 20.00        | 15.0          | 10.00        | 300         | Yes     |
 *     | 3  | 2022-03-01       | Economy      | 15.00        | 5.0           | 0.00         | 200         | No      |
 */
export const dataSummary = async (dataSchema: string) => {
    const prompt = new PromptTemplate({
        template: templateDataSummary,
        inputVariables: ["dataSchema"],
    });
    const chain = new LLMChain({llm: model, prompt: prompt});
    return await chain.call({dataSchema: dataSchema})
}
/**
 * Create a python Regular Expression. input should be a string.
 * @param instruction
 */
export const createRegex = async (instruction: string) => {
    const prompt = new PromptTemplate({
        template: templateRegex,
        inputVariables: ["instruction"],
    });
    const chain = new LLMChain({llm: model, prompt: prompt});
    return await chain.call({dataSchema: instruction})
}
/**
 * Create a python Date Format. input should be a string.
 * @param dataSchema
 */
export const createDateFromat = async (dataSchema: string) => {
    const prompt = new PromptTemplate({
        template: templateCreateDateFormat,
        inputVariables: ["dataSchema"],
    });
    const chain = new LLMChain({llm: model, prompt: prompt});
    return await chain.call({dataSchema: dataSchema})
}
/**
 * Create a python program by example. input should be a string.
 * @param input - A list of input examples
 * @param output - A list of output examples
 */
export const programByExample = async (input: string, output: string) => {
    const prompt = new PromptTemplate({
        template: templateProgramByExample,
        inputVariables: ["input", "output"],
    });
    const chain = new LLMChain({llm: model, prompt: prompt});
    return await chain.call({input: input, output: output})
}
/**
 * Create a Optimus python program from text. input should be a string.
 * @param instructions - Text instructions to generate the code
 * @param data - A list of input examples
 *
 */
export const codeGeneration = async (instructions: string, data: string) => {

    let promptInstruction = new PromptTemplate({
        template: textToInstructions,
        inputVariables: ["instructions", "data"],
    });
    let promptCode = new PromptTemplate({
        template: instructionsToOptimus,
        inputVariables: ["instructions"],
    });


    const synopsisChain = new LLMChain({llm: model, prompt: promptInstruction});
    const reviewChain = new LLMChain({llm: model, prompt: promptCode});

    const overallChain = new SimpleSequentialChain({
        chains: [synopsisChain, reviewChain],
    });

    return await overallChain.run({instructions: instructions, data: data});
}
