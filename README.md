# Jazz

Jazz is a JavaScript library that leverages with a Language Learning Model (LLM) backend - GPT 3.5, to interact with data intuitively and effectively. This library streamlines data handling and interaction, making data analysis and data science tasks a breeze.

## Features


Jazz empowers users to perform a multitude of operations such as:

*   Summarizing data for dataframes and columns.
*   Answering questions about the data.
*   Conducting descriptive analysis.
*   Executing data transformations.
*   Creating effective data visualizations.
*   Crafting regular expressions (Regex).
*   Formatting data using 'Program By Example'.

## Why Jazz?


Jazz was built with the vision to simplify the interaction between data scientists and data analysts with their data. It leverages natural language processing capabilities to create a more intuitive and user-friendly data handling environment.

## How Jazz Works


Jazz works by accepting a user-defined prompt. This prompt is used to select an appropriate tool to handle the task at hand. Available tools are:

*   **Text to Expressions:** Generates regular expressions or date formats.
*   **Ask:** Answer questions about the data
*   **Code:** Performs data cleaning, joining, transformation, and formatting.
*   **Text:** Provides descriptions and insights about the data and columns.
*   **JSON:** Used for data visualization.

These tools return a response that is then sent to the user for further actions.

### About Prompts

The user-provided prompts are refined and enhanced using Jazz, which are then forwarded to the LLM. The method used for this enhancement is inspired by the research paper, "Boosting Theory-of-Mind Performance in Large Language Models via Prompting".

The enriched prompt can include a variety of elements such as the dataset, column names, statistics, and more, depending on the selected tool. You can read more about this method [here](https://arxiv.org/ftp/arxiv/papers/2304/2304.11490.pdf).

### Tools Workflow

Below is a brief overview of how each tool processes the prompts:

*   **Text to Expressions:** User Prompt -> Prompt Enhancement -> LLM -> Generated Expression (Regex, Date Format)
*   **Ask:** User Prompt -> Prompt Enhancement -> LLM -> Python Execution -> Error Handling (If applicable) -> Output Answer
*   **Code:** User Prompt -> Prompt Enhancement -> LLM -> Python Execution -> Error Handling (If applicable) -> Output Code
*   **Text:** User Prompt -> Prompt Enhancement -> LLM -> Output Text
*   **JSON:** User Prompt -> Prompt Enhancement -> LLM -> Output JSON

Welcome to the world of intuitive and natural data interaction with Jazz!
