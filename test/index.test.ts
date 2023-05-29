import {expect, test} from 'vitest'
import {
    promptToInstructions,
    createDateFormat,
    createRegex,
    dataSummary,
    programByExample,
    dataInsights, executeInstruction
} from "../src/main";

const dataTable = `
    | Car                          | MPG   | Cylinders | Displacement | Horsepower | Weight | Acceleration | Model | Origin |
    | ---------------------------- | ----- | --------- | ------------ | ---------- | ------ | -------------| ------| ------ |
    | Chevrolet Chevelle Malibu    | 18    | 8         | 307          | 130        | 3504   | 12           | 70    | US     |
    | Buick Skylark 320            | 15    | 8         | 350          | 165        | 3693   | 11.5         | 70    | US     |
    | Plymouth Satellite           | 18    | 8         | 318          | 150        | 3436   | 11           | 70    | US     |
    `

const dataStats = `
{{'*_max': {{'Car': nan,
  'MPG': 46.6,
  'Cylinders': 8,
  'Displacement': 455.0,
  'Horsepower': 230,
  'Weight': 5140,
  'Acceleration': 24.8,
  'Model': 82,
  'Origin': nan}},
 '*_min': {{'Car': nan,
  'MPG': 0.0,
  'Cylinders': 3,
  'Displacement': 68.0,
  'Horsepower': 0,
  'Weight': 1613,
  'Acceleration': 8.0,
  'Model': 70,
  'Origin': nan}},
 '*_mean': {{'Car': nan,
  'MPG': 23.051231527093595,
  'Cylinders': 5.475369458128079,
  'Displacement': 194.7795566502463,
  'Horsepower': 103.5295566502463,
  'Weight': 2979.4137931034484,
  'Acceleration': 15.519704433497537,
  'Model': 75.92118226600985,
  'Origin': nan}},
 '*_std': {{'Car': nan,
  'MPG': 8.401777352270592,
  'Cylinders': 1.7121596315485297,
  'Displacement': 104.92245837948875,
  'Horsepower': 40.52065912106348,
  'Weight': 847.0043282393509,
  'Acceleration': 2.803358816342546,
  'Model': 3.74873734545588,
  'Origin': nan}}}}
`
test('dataSummaryTest', async () => {

    const result = await dataSummary(dataTable)
    console.log(result)
    expect(typeof result).toBe('object')
}, 30000)
// Predictive Analysis: If you want the model to predict a car's MPG (Miles per Gallon) based on other characteristics, you could ask:
//
// "Given a car with 8 cylinders, a displacement of 350, horsepower of 165, weight of 3500, acceleration of 12, a model year of '70, and origin 'US', what would be the predicted MPG?"
//
// Descriptive Analysis: If you want to understand the relationship between certain variables, you could ask:
//
//     "What is the relationship between a car's horsepower and its MPG?"
//
// Comparative Analysis: If you're interested in comparing the cars, the prompt could be:
//
// "Compare the features of Chevrolet Chevelle Malibu and Buick Skylark 320. Which one is more fuel efficient?"
//
// Exploratory Analysis: If you want to explore a particular characteristic, you could ask:
//
//     "What effect does the weight of a car have on its MPG?"
//
// Causal Analysis: If you want to understand the effect of a certain variable, you could ask:
//
//     "How does the number of cylinders affect a car's MPG?"
//
// Prescriptive Analysis: If you want to get recommendations, you could ask:
//
//     "If I want to increase a car's MPG, what features should I focus on?"
test('dataInsightsTest', async () => {
    const dataTable = `
    | Car                          | MPG   | Cylinders | Displacement | Horsepower | Weight | Acceleration | Model | Origin |
    | ---------------------------- | ----- | --------- | ------------ | ---------- | ------ | -------------| ------| ------ |
    | Chevrolet Chevelle Malibu    | 18    | 8         | 307          | 130        | 3504   | 12           | 70    | US     |
    | Buick Skylark 320            | 15    | 8         | 350          | 165        | 3693   | 11.5         | 70    | US     |
    | Plymouth Satellite           | 18    | 8         | 318          | 150        | 3436   | 11           | 70    | US     |
    `
    const result = await dataInsights(dataTable, dataStats)
    console.log(result)
    expect(typeof result).toBe('string')
}, 50000)

// test('codeGenerationTest', async () => {
//     const result = await promptToInstructions('instructions', dataTable)
//     expect(typeof result).toBe('string')
// }, 10000)

test('generateCodeTest', async () => {
    const result = await executeInstruction('create a regex to remove all especial chars from the string', dataTable)
    console.log(result)
    expect(typeof result).toBe('string')
}, 10000)

test('createRegexTest', async () => {
    const result = await createRegex('remove all especial chars from the string')
    console.log(result)
    expect(typeof result).toBe('object')
}, 10000)

test('createDateFormatTest', async () => {
    const result = await createDateFormat('day as number, month name in english, year as number')
    console.log(result)
    expect(typeof result).toBe('object')
}, 10000)

test('programByExampleTest', async () => {
    const result = await programByExample(["(555) 123 456 7890", "(483) 432-234-6456"], '555 312 456 5344')
    console.log(result)
    expect(typeof result).toBe('object')
}, 10000)

