# Analysis on AI-Native aspect performance on this project

## The Complex and Large-Component Structure of Software 
Since many software products have several components to work correctly, AI can't give a finished product all at once from my experience. My project CoffeeJelly is a full-stack application consisting of a back-end data model, routes, front-end API communication, tailwind setup, and web viewpoints.  

What's more, a lot of the setup still needs to be done on the developer side regarding dependencies, environments, and such.  

It is possible that more advanced AI software tools would be able to export a fully working application faster, with more desirable features, but I wanted to stick with obtaining a feel for the full software itself, knowing most of the nooks and crannys of how it works. As such, I was only able to get to a working prototype with the main core feature displayed.

## Data Model
When prompting for an example data model to use, many of the issues I saw with the output were unnecessary parameters being included in certain calls. This could be because the AI believes it is better for the product in the future to have additional information ready for following development. For instance, assigning a course_id for each textbook could be useful if we want to track which textbooks are being used by certain courses.  

For now, I plan to just have the data model evolve as development continues.

## Generalization
While trying to cover all bases, AI will not focus directly on the most desired features by developers or clients unless specifically told. As such, generalized prompts would yield expansive information that might not be fully compatible with each other. During earlier development, set up with dependency and package installation gave a ton of issues due to problems with compatibility and version control that AI was unable to identify immediately. 