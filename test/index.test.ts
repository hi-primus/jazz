import {expect, test} from 'vitest'
import {codeGeneration, createDateFormat, createRegex, dataSummary, programByExample} from "../src/main";


test('dataSummary', async () => {
    const dataTable = `
    | Car                          | MPG   | Cylinders | Displacement | Horsepower | Weight | Acceleration | Model | Origin |
    | ---------------------------- | ----- | --------- | ------------ | ---------- | ------ | -------------| ------| ------ |
    | Chevrolet Chevelle Malibu    | 18    | 8         | 307          | 130        | 3504   | 12           | 70    | US     |
    | Buick Skylark 320            | 15    | 8         | 350          | 165        | 3693   | 11.5         | 70    | US     |
    | Plymouth Satellite           | 18    | 8         | 318          | 150        | 3436   | 11           | 70    | US     |
    `
    const result = await dataSummary(dataTable)
    console.log(result)
    expect(typeof result).toBe('object')
},30000)

test('createRegex', async () => {
    const result = await createRegex('remove all numbers from the string')
    console.log(result)
    expect(typeof result).toBe('object')
},10000)

test('createDateFormat', async () => {
    const result = await createDateFormat('day as number, month name in english, year as number')
    console.log(result)
    expect(typeof result).toBe('object')
},10000)

test('programByExample', async () => {
    const result = await programByExample(["(555) 123 456 7890","(483) 432-234-6456"], '555 312 456 5344')
    console.log(result)
    expect(typeof result).toBe('object')
},10000)

test('codeGeneration', async () => {
    const result = await codeGeneration('instructions', 'data')
    expect(typeof result).toBe('string')
})
