/**
 * Create a graph from a prompt
 * @param instruction
 */
export const templateCreateChart = `
    {instruction}
`
/**
 * Get data insights from a query
 * @param query
 */
export const templateDataInsights = `
    
`

/** Create a python date format from a description
 *
 * @param instruction
 */
export const templateCreateDateFormat =
    `
    Read the scenario and answer the following question:
    Scenario: "You're a data analyst who needs to translate textual descriptions of date formats into Python date formatting codes."

    Q: Can you convert this textual description into a Python date format: "years number / month name / day with padding"?
    A: { "python_date_format": "%Y / %B / %d" }
    
    Scenario: "You're a data scientist who needs to understand date formatting codes for data preprocessing."
    
    Q: Can you convert this textual description into a Python date format: "month in number / day in week day / last two number years"?
    A: { "python_date_format": "%m / %A / %y" }
    
    Scenario: "You're a data engineer reviewing a dataset."
    
    Q: Can you provide a Python date format for {instruction}?
    A: `


/**
 * Create a regex from a description
 * @param query
 */
export const templateRegex =
    `
    Read the scenario and answer the following question:
    Scenario: "You're a data engineer that wants to create a regex to match a string starting with the letter 'P'"
    
    Q: Can you create a JSON-formatted Python regex to match a string that starts with the letter 'P'?
    A: {"regex": r'^P.*'}
    
    Scenario: "You're a data engineer that wants to create a regex to match a string in a dataframe"
    
    Q: Create a JSON-formatted Python regex to remove numbers from strings?
    A: {"regex": r'\d+'}
    
    Scenario: "You're a data engineer reviewing a dataset like:"
    
    Q: Can you provide a Python regex for {instruction}?
    A:
    `;


/** Create python code to transforms a list of data with multiple formats to a unified one. For example transform
 * data formats like date a phone numbers. */

export const templateProgramByExample =
    ` 
    Read the scenario and answer the following question:
    Scenario: "You're a data analyst tasked with transforming the date format from 'MM/DD/YYYY' to 'MM DD YY' in the 'date_column'."
    
    Q: Could you provide a Python pandas command that converts the date format in 'date_column' from 'MM/DD/YYYY' to 'MM DD YY'?
    A: { "command": "df['date_column'] = df['date_column'].dt.strftime('%m %d %y')" }
    
    Scenario: "You're faced with the challenge of transforming phone number formats in the 'phone_column'. The desired transformations include: 
    1) Changing '555-10-2345' to '555 10 2345' 
    2) Converting '(555) 54 3923' to '555 54 3923'"
    
    Q: Could you provide a Python pandas command that can simultaneously convert the phone number formats in 'phone_column' from '555-10-2345' to '555 10 2345' and '(555) 54 3923' to '555 54 3923'?
    A: { "command": "df['phone_column'] = df['phone_column'].str.replace('[-()]', ' ')" }
    
    Scenario: "As a data scientist, you want to get a sample from a column and transform its format."
    
    Q: Can you devise a Python pandas command that can transform the data format from {input} to {output}?
    A: { "command": "" }
`

/**
 * Create Optimus instructions to transform a dataframe.
 * @param instruction
 */
export const instructionsToOptimus =

     `
    
    Read the scenario and answer the following question:
    Scenario: "You are and AI that convert instructions to python code."
    
    Q: Given the following instructions, can you provide a step-by-step process for creating Optimus code?        
    1. Identify the columns for 'price' and 'area' in your table.
    2. For each row, calculate the price divided by the area.
    3. Store these calculated values in a new column in your table called 'new_column'.
    
    A: Let's think step by step:
    df["new_column"]=df["price"]/df["area"]    
    
    Scenario: "You are and AI that convert english instructions to python code expert in data transformation."
    
    Q: Given the following instructions, can you provide Optimus code?        
    1. Compute the average value of the 'new_column'.
    2. Identify houses whose 'new_column' value is below this average.
    3. Remove these houses from your table, keeping only the ones above the average.
    
    A: Let's think step by step:
    mean = df.cols.mean("new_column")
    df = df.rows.select(mean < df["new_column"])
    
    
    Scenario: "You are and AI that convert english instructions to python code expert in data transformation."
    
    Q: Given the following instructions, can you provide Optimus code?                
    1. Identify houses in your table that have enough bedrooms for a family of four.
    2. From these houses, identify the ones that are only one story.
    3. The houses that meet both conditions are the ones suitable for a family of four and are one story.
    
    A: Let's think step by step:    
    df = df.rows.select((df["bedrooms"] >= 4) & (df["stories"] == 1))
    
    Scenario: "You are and AI that convert english instructions to python code expert in data transformation."
    
    Q: Given the following instructions, can you provide Optimus code?                
    {instruction}
    
    A: Let's think step by step:
    `

/**
 * Create instructions to transform a dataframe.
 * @param instruction
 * @param data
 */
export const textToInstructions =
    `
    Read the scenario and answer the following question:
    Scenario: "You're a data analyst who needs to create a new column called 'new_column' using price divided by area."
    
    Q: Given the following table, can you provide a step-by-step process for creating "new_column" using price and area?
    
    | id | price | area |
    |----|-------|------|
    | 1  | 500000| 2000 |
    | 2  | 600000| 2500 |
    | 3  | 700000| 3000 |
    
    A: Let's think step by step:
    1. Identify the columns for 'price' and 'area' in your table.
    2. For each row, calculate the price divided by the area.
    3. Store these calculated values in a new column in your table called 'new_column'.
    
    Scenario: "You're a data scientist who needs to filter out houses that are below the average of 'new_column'."
    
    Q: Given the following table, can you provide a step-by-step process for filtering houses based on "new_column"?
    
    | id | price | area | new_column |
    |----|-------|------|------------|
    | 1  | 500000| 2000 |    250     |
    | 2  | 600000| 2500 |    240     |
    | 3  | 700000| 3000 |    233.33  |
    
    A: Let's think step by step:
    1. Compute the average value of the 'new_column'.
    2. Identify houses whose 'new_column' value is below this average.
    3. Remove these houses from your table, keeping only the ones above the average.
    
    Scenario: "You're a data engineer who needs to find homes suitable for a family of four and are one story."
    
    Q: Given the following table, can you provide a step-by-step process for finding suitable homes?
    
    | id | bedrooms | stories | family_size |
    |----|----------|---------|-------------|
    | 1  | 3        | 2       | 5           |
    | 2  | 4        | 1       | 4           |
    | 3  | 2        | 1       | 3           |
    
    A: Let's think step by step:
    1. Identify houses in your table that have enough bedrooms for a family of four.
    2. From these houses, identify the ones that are only one story.
    3. The houses that meet both conditions are the ones suitable for a family of four and are one story.


    Scenario: "You're a data engineer reviewing a dataset like:"
    Q: Given the following table, can you provide a step-by-step process for {instruction}?
    {data}
    A: Let's think step by step:
    `
/**
 * Create a summary from a dataframe sample and its columns.
 * @param data
 */
export const templateDataSummary =
    `
    Read the scenario and answer the following question:
    Scenario: "You are a data engineer reviewing a telco dataset:
    | ID | Subscription_Date | Package_Type | Monthly_Cost | Data_Usage_GB | Overage_Fees | Total_Calls | Churned |
    |----|-------------------|--------------|--------------|---------------|--------------|-------------|---------|
    | 1  | 2021-01-01       | Premium      | 30.00        | 12.5          | 0.00         | 500         | No      |
    | 2  | 2020-07-01       | Standard     | 20.00        | 15.0          | 10.00        | 300         | Yes     |
    | 3  | 2022-03-01       | Economy      | 15.00        | 5.0           | 0.00         | 200         | No      |


    Q: Can you provide a JSON-formatted description of the table and its columns?
    
    A: {
      "dataset": "The 'Subscriber_Info' dataset holds detailed records of subscribers in a telecom company. Each row represents a unique subscriber and their usage statistics.",
      "columns": [
        {
          "name": "ID",
          "description": "The unique identifier of a subscriber."
        },
        {
          "name": "Subscription_Date",
          "description": "The date when the subscriber joined the network."
        },
        {
          "name": "Package_Type",
          "description": "The type of data plan package the subscriber is on."
        },
        {
          "name": "Monthly_Cost",
          "description": "The regular monthly fee associated with the subscriber's package."
        },
        {
          "name": "Data_Usage_GB",
          "description": "The amount of data the subscriber used in the last month, in gigabytes."
        },
        {
          "name": "Overage_Fees",
          "description": "The additional fees the subscriber was charged last month for exceeding their data limit."
        },
        {
          "name": "Total_Calls",
          "description": "The total number of calls the subscriber made last month."
        },
        {
          "name": "Churned",
          "description": "Indicates whether the subscriber has left the service this month."
        }
      ]
    }
    Scenario: "You're a data engineer reviewing a dataset like:
    {dataSchema}
    Q: Can you provide a JSON-formatted description of the table and its columns?
    A:
    `

