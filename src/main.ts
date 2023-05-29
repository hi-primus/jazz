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
    templateCreateDateFormat, templateDataInsights, templateDataSummary,
    templateFixCode,
    templateInstructionsToCode,
    templateProgramByExample,
    templateRegex,
    templateTextToInstructions
} from "./prompts";
import {LLMChain, PromptTemplate} from "langchain";


const llmTemperature: number = 0;

const model35 = new OpenAI(
    {
        openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
        temperature: llmTemperature,
        modelName: "gpt-3.5-turbo",
    });
const model4 = new OpenAI(
    {
        openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY,
        temperature: llmTemperature,
        modelName: "gpt-3.4-turbo",
    })

export const dataInsights = async (dataTable: string, dataStats: string) => {
    console.log(dataTable)
    const prompt = new PromptTemplate({
        template: templateDataInsights,
        inputVariables: ["dataTable", "dataStats"],
    });
    const chain = new LLMChain({llm: model35, prompt: prompt});
    const result = await chain.call({dataTable: dataTable, dataStats: dataStats})
    return result.text
}

/**
 * Explain or create a summary of the Data and the columns.
 * @param dataTable - The data schema like the following:
 *     | ID | Subscription_Date | Package_Type | Monthly_Cost | Data_Usage_GB | Overage_Fees | Total_Calls | Churned |
 *     |----|-------------------|--------------|--------------|---------------|--------------|-------------|---------|
 *     | 1  | 2021-01-01       | Premium      | 30.00        | 12.5          | 0.00         | 500         | No      |
 *     | 2  | 2020-07-01       | Standard     | 20.00        | 15.0          | 10.00        | 300         | Yes     |
 *     | 3  | 2022-03-01       | Economy      | 15.00        | 5.0           | 0.00         | 200         | No      |
 */
export const dataSummary = async (dataTable: string) => {
    console.log(dataTable)
    const prompt = new PromptTemplate({
        template: templateDataSummary,
        inputVariables: ["dataSchema"],
    });
    const chain = new LLMChain({llm: model35, prompt: prompt});
    const result = await chain.call({dataSchema: dataTable})
    return JSON.parse(result.text)
}
/**
 * Create a python Regular Expression. input should be a string.
 * @param instruction
 */
export const createRegex = async (instruction: string) => {
    // TODO: Add a regex validation after creation
    const prompt = new PromptTemplate({
        template: templateRegex,
        inputVariables: ["instruction"],
    });
    const chain = new LLMChain({llm: model35, prompt: prompt});
    const chainResult = await chain.call({instruction: instruction})
    return JSON.parse(escapeBackslashes(chainResult.text))
}
/**
 * Create a python Date Format from a description. input should be a string.
 * @param instruction
 */
export const createDateFormat = async (instruction: string) => {
    const prompt = new PromptTemplate({
        template: templateCreateDateFormat,
        inputVariables: ["instruction"],
    });
    const chain = new LLMChain({llm: model35, prompt: prompt});
    const chainResult = await chain.call({instruction: instruction})
    return JSON.parse(chainResult.text)

}
/**
 * Create a python program by example. input should be a string.
 * @param input - A list of input examples
 * @param output - A list of output examples
 */
export const programByExample = async (input: string[], output: string) => {

    const _input = JSON.stringify(input);

    const prompt = new PromptTemplate({
        template: templateProgramByExample,
        inputVariables: ["input", "output"],
    });
    const chain = new LLMChain({llm: model35, prompt: prompt});
    const chainResult = await chain.call({input: _input, output: output})
    const result = JSON.parse(escapeBackslashes(chainResult.text))
    return result
}

/**
 * Create a python program by example. input should be a string.
 * @param prompt - Instructions about the code should be generated
 * @param dataTable - Data over which the code should be generated
 */
export const executeInstruction = async (prompt: string, dataTable: string) => {
    const codeProcessor = new CodeProcessor()
    return codeProcessor.createCode(prompt, dataTable)

}
/**
 * Create an Optimus python program from text. input should be a string.
 * @param instructions - Text instructions to generate the code
 * @param dataTable - A list of input examples
 *
 */
export const promptToInstructions = async (instructions: string, dataTable: string) => {

    let promptInstruction = new PromptTemplate({
        template: templateTextToInstructions,
        inputVariables: ["instructions", "data"],
    });

    // TODO: get the optimus functions signature
    const chain = new LLMChain({llm: model35, prompt: promptInstruction});

    return await chain.call({code: instructions, error: dataTable})
}

/**
 * Create an Optimus python program from a set of instructions. input should be a string.
 * @param instructions - Text instructions to generate the code
 * @param dataTable - Data table to generate the code
 */
export const instructionsToCode = async (instructions: string, dataTable: string) => {

    let promptCode = new PromptTemplate({
        template: templateInstructionsToCode,
        inputVariables: ["instructions"],
    });

    const chain = new LLMChain({llm: model35, prompt: promptCode});
    return await chain.run({instructions: instructions, data: dataTable});
}
/**
 * Fix a python code. input should be a string.
 * @param code - The code to fix
 * @param error - The error to fix
 */
export const fixCode = async (code: string, error: string) => {
    const prompt = new PromptTemplate({
        template: templateFixCode,
        inputVariables: ["code", "error"],
    });
    const chain = new LLMChain({llm: model35, prompt: prompt});
    return await chain.call({code: code, error: error})
}

export const executePythonCode = async (code: string) => {
    return code
}

function escapeBackslashes(str: string) {
    return str.replace(/\\/g, '\\\\');
}

export class CodeProcessor {
    private retryCount: number;

    constructor() {
        this.retryCount = 0;
    }

    /**
     * Create a python program by example. input should be a string.
     * @param prompt - The description of the program you want to create
     * @param dataTable - The data table used as input to create the program
     */
    async createCode(prompt: string, dataTable: string): Promise<void> {
        // convert prompt to instructions
        const instructions = await promptToInstructions(prompt, dataTable);
        // convert instructions to python code
        const code = await instructionsToCode(instructions.text, dataTable);

        await this.executeAndFixCode(code);
    }

    /**
     * Execute and fix a python code. input should be a string.
     * @param code - The code to execute and fix if needed
     */
    async executeAndFixCode(code: string): Promise<void> {
        let errorDescription = ""
        try {
            // use some API to execute python code
            // assuming this API throws an error if code can't be compiled
            errorDescription = await executePythonCode(code);
        } catch (error) {
            if (this.retryCount < 3) {
                this.retryCount += 1;
                const fixedCode = await fixCode(code, errorDescription);
                await this.executeAndFixCode(fixedCode.text);
            } else {
                console.error('Could not fix code after 3 attempts');
            }
        }
    }

}
