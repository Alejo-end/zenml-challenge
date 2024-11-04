# ZenML Challenge

![Screenshot 2024-11-04 at 6 24 41](https://github.com/user-attachments/assets/55c9d5c6-0198-4662-9651-7c18117e054e)

This is a react app created using Vite!
To run this project use

`npm i`
`npm run dev`

## Questions

- What is an ideal way to visualize a stack and a stack component?
-- A/. To make stacks easy to view, each stack should display key information at a glance, like the stack name, a summary of its components (such as a count or type), and an icon or color that shows its category or status. Using a card layout for each stack allows users to quickly scan through multiple stacks while keeping important details visible. For the components within each stack, a collapsible or expandable layout would be ideal. Each component could be shown in a small card or list item with essential details like name, type, and status. This lets users open up each stack to view more detailed information on its components without losing track of the bigger picture.

- What is the easiest way to navigate these stacks and stack components when they are many of them?
- A/. I think is easier to use if we added filter and sorts or a deeper search that can check for the name, type, flavor or any other characteristic from the object being looked for.

- How does one showcase the connection between a stack and its stack components?
-- A/. I would use some visual aids to help the user navigate between the stacks and recognize familiar components (i.e. orchestators have an green border and name, while an artifact store as an orange border and name). also on a hierachical view with many components some lines or containers can help with segmentation of which components belong to which stack (this way also we can represent shared stack components being tied to multiple stacks for example.).

- In your role as the frontend developer, how can you construct a UI that's prepared for the future? For instance, if the API were to incorporate extra functionalities in the future, such as creating stacks and stack components, how much adjustment would the UI demand to seamlessly embrace these potential new features?
-- A/. I believe that a UI prepared for the future depends on multiple of factors. but for this specific case it could be relatively simple to add a button on top of the stacks and components columns that when is pressed opens a modal that provides with some inputs to gather data to send to the Create endpoint in either case. we could add a function that checks if new data is present and update the view when a new object is added.


### Total Time Estimate: 4.5h


