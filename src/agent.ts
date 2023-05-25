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
import {initializeAgentExecutorWithOptions} from "langchain/agents";
import {DynamicTool} from "langchain/tools";

const llmTemperature: number = 0.7;

const model = new OpenAI({openAIApiKey: import.meta.env.VITE_OPENAI_API_KEY, temperature: llmTemperature});
const tools = [
    // new DynamicTool({
    //     name: "Create transformation functions in Pandas",
    //     description:
    //         "Create transformation, ordering and filtering functions.",
    //     func: () => Promise.resolve("Foo Value"),
    // }),
    // new DynamicTool({
    //     name: "Create transformation functions in Blurr",
    //     description:
    //         "Create transformation, ordering and filtering functions.",
    //     func: () => Promise.resolve("Foo Value"),
    // }),
    new DynamicTool({
        name: "Explain or create a summary of the Data",
        description:
            "Explain or create a summary of the data and the columns.",
        func: () => Promise.resolve("Return the dataframe info and columns content"),
    }),
    new DynamicTool({
        name: "Regex",
        description:
            "Create a python Regular Expression. input should be a string.",
        func: () => Promise.resolve(""),
    }),
    // new DynamicTool({
    //     name: "String to Date Format",
    //     description:
    //         "Create a python Date Format. input should be a string.",
    //     func: () => Promise.resolve(""),
    // }),
];


const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description", verbose: true
});

console.log("Loaded agent.");

// const input =  await regex("Match all the words that start with 'a' and end with 'e'");

const data: String = `
INCIDENT_NUMBER      OFFENSE_CODE  OFFENSE_CODE_GROUP               OFFENSE_DESCRIPTION                         DISTRICT      REPORTING_AREA  SHOOTING    OCCURRED_ON_DATE          YEAR      MONTH  DAY_OF_WEEK         HOUR  UCR_PART    STREET                    Lat        Long  Location
(object)                  (int64)  (object)                         (object)                                    (object)            (object)  (object)    (object)               (int64)    (int64)  (object)         (int64)  (object)    (object)             (object)    (object)  (object)
-----------------  --------------  -------------------------------  ------------------------------------------  ----------  ----------------  ----------  -------------------  ---------  ---------  -------------  ---------  ----------  -----------------  ----------  ----------  ---------------------------
    I182070945                    619  Larceny                          LARCENY ALL OTHERS                          D14                      808              2018-09-02 13:00:00       2018          9  Sunday                13  Part One    LINCOLN ST            42.3578    -71.1394  (42.35779134, -71.13937053)
I182070943                   1402  Vandalism                        VANDALISM                                   C11                      347              2018-08-21 00:00:00       2018          8  Tuesday                0  Part Two    HECLA ST              42.3068    -71.0603  (42.30682138, -71.06030035)
I182070941                   3410  Towed                            TOWED MOTOR VEHICLE                         D4                       151              2018-09-03 19:27:00       2018          9  Monday                19  Part Three  CAZENOVE ST           42.3466    -71.0724  (42.34658879, -71.07242943)
I182070940                   3114  Investigate Property             INVESTIGATE PROPERTY                        D4                       272              2018-09-03 21:16:00       2018          9  Monday                21  Part Three  NEWCOMB ST            42.3342    -71.0787  (42.33418175, -71.07866441)
I182070938                   3114  Investigate Property             INVESTIGATE PROPERTY                        B3                       421              2018-09-03 21:05:00       2018          9  Monday                21  Part Three  DELHI ST              42.2754    -71.0904  (42.27536542, -71.09036101)
I182070936                   3820  Motor Vehicle Accident Response  M/V ACCIDENT INVOLVING PEDESTRIAN - INJURY  C11                      398              2018-09-03 21:09:00       2018          9  Monday                21  Part Three  TALBOT AVE            42.2902    -71.0716  (42.29019621, -71.07159012)
I182070933                    724  Auto Theft                       AUTO THEFT                                  B2                       330              2018-09-03 21:25:00       2018          9  Monday                21  Part One    NORMANDY ST           42.3061    -71.0827  (42.30607218, -71.08273260)
I182070932                   3301  Verbal Disputes                  VERBAL DISPUTE                              B2                       584              2018-09-03 20:39:37       2018          9  Monday                20  Part Three  LAWN ST               42.327     -71.1056  (42.32701648, -71.10555088)
I182070931                    301  Robbery                          ROBBERY - STREET                            C6                       177              2018-09-03 20:48:00       2018          9  Monday                20  Part One    MASSACHUSETTS AVE     42.3315    -71.0709  (42.33152148, -71.07085307)
I182070929                   3301  Verbal Disputes                  VERBAL DISPUTE                              C11                      364              2018-09-03 20:38:00       2018          9  Monday                20  Part Three  LESLIE ST             42.2951    -71.0586  (42.29514664, -71.05860832)
I182070928                   3301  Verbal Disputes                  VERBAL DISPUTE                              C6                       913              2018-09-03 19:55:00       2018          9  Monday                19  Part Three  OCEAN VIEW DR         42.3196    -71.0403  (42.31957856, -71.04032766)
`;
console.log(data, executor)

const input = "await dataSummary(data)";
// const input = await dataSummary(data);
// console.log({input});
//
const result = await executor.call({input});
//
console.log(`Got output ${result.output}`);

