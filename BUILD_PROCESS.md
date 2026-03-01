## BUILD PROCESS
### How I Started
I began by carefully analyzing the problem statement to understand the true objective of the assignment. The requirement was not just to build a comparison tool, but to design a transparent, explainable Decision Companion System that demonstrates structured thinking. 

The first step was breaking down the system into core functional components:

- User inputs decision item
- User defines criteria and assigns weights
- User defines options
- User assigns scores to each option for each criterion
- System calculates weighted scores
- System compares options and shows the best choice

I then created a rough architecture showing frontend, backend, and database interaction.

### How My Thinking Evolved

My thinking evolved progressively as I designed and implemented the system to ensure accuracy, fairness, and proper user-specific decision management.

Stage 1: User authentication and identification  
- The process begins with the user logging into the system.  
- After successful login, the current user's details are stored in localStorage.  
- This allows the system to uniquely identify the user and associate all decisions with that specific user.  
- This also enables features like decision history.

Stage 2: Decision input collection  
- The user enters the decision item, criteria, criteria weights, options, and scores.
- Before proceeding, the system validates whether the sum of all criteria weights equals 100%.  
- This ensures that each criterion correctly represents its percentage influence on the decision.

Stage 3: Weight normalization  
- Once the total weight equals 100%, the weights are normalized to a scale of 0 to 1 using the formula:

  Normalized Weight = Weight / 100

- This normalization ensures mathematical consistency in weighted score calculation.

Stage 4: Score normalization with importance consideration  
- Each option is scored against each criterion.  
- I implemented score normalization to ensure fair comparison between criteria.

- Additionally, each criterion includes an importance type:

  • Higher is Better (Benefit criteria)  
    For example ,Price  
    Formula:
    Normalized Score = Actual Score / Maximum Score

  • Lower is Better (Cost criteria)
    Lower is Better" criteria refer to factors where smaller values are more desirable. These criteria usually represent costs, risks, time, or other negative factors. In decision-making, options with lower values in these criteria are considered better. 
    Example: Price
    If there are 3 house .Price of the first house is 50 Lakhs,price of second one is 39 Lakhs then the price of third one is 67 Lakhs.In this case lower price is more suitable.So Lwer is better
    Formula:
    Normalized Score = Minimum Score / Actual Score
  • Higher is Better (Benefit criteria)  
    For example: Salary, Performance, Rating  
    Formula:
    Normalized Score = Actual Score / Maximum Score

- This ensures that all normalized scores are converted to a common comparable scale.

Stage 5: Storing decision data in database  
- After normalization, all decision data is stored in the database, including:
  - User email
  - Decision item
  - Criteria
  - Weights
  - Options
  - Scores
  - Importance type (Higher is Better / Lower is Better)
  - Date of creation

- Storing user email ensures decisions are linked to the correct user.

Stage 6: Weighted score calculation  
- The system calculates the weighted score for each option using normalized weights and normalized scores.

  Weighted Score = Σ (Normalized Weight × Normalized Score)

Stage 7: Result display  
- The system displays the final result on the Result Page.  
- The option with the highest weighted score is identified as the best decision.  
- All option scores are displayed for comparison.

Stage 8: Edit functionality  
- I provided an Edit feature that allows users to modify previously entered decisions.  
- This improves flexibility and allows correction of mistakes without creating a new decision.

Stage 9: Decision history tracking  
- I implemented a History feature to allow users to view their previous decisions.  
- The system fetches history data using the stored user email.
- This ensures that users can only view their own decisions.

### Alternative approaches considered
During development, I considered several different approaches for evaluating and comparing decision options.

###### Approach 1: Simple Manual Comparison

In this approach, users would manually compare options based on their judgment without any mathematical calculation.

This approach was rejected because:
- It was subjective and depended entirely on user opinion
- It did not provide objective or measurable results
- It was difficult to compare multiple criteria accurately
- It did not support structured decision-making

###### Approach 2: Average Score Method

In this approach, each option would receive scores for each criterion, and the system would calculate the average score for each option.
  
Formula:
Average Score = Sum of Scores / Number of Criteria
  
This approach was rejected because:
  - It treats all criteria as equally important
  - It does not consider different importance levels of criteria
  - It produces inaccurate results when some criteria are more critical than others
  - It does not handle cost criteria (Lower is Better) properly


### Refactoring decisions

During development, I refactored the project to improve code quality and maintainability.

Refactoring steps included:

- Simplified the weighted score calculation logic.
- Organized backend routes for better structure.
- Separated frontend and backend into different folders.
- Removed unnecessary and unused code.
- Improved variable names for better readability.
- Enhanced input validation and handling.

These improvements made the system cleaner, more organized, and easier to maintain and extend.

### Mistakes and corrections

During development, I encountered several issues which were identified and corrected to improve system accuracy and reliability.

Mistakes included:

- Incorrect weight calculation.
- Total weight not properly normalized to 1.
- Errors in score normalization logic.
- Dynamic input fields not generating correctly.
- Decision data not storing properly in MongoDB.
- UI alignment and layout issues.

Corrections made:

- Added validation to ensure total weight equals 100% before normalization.
- Fixed weight and score normalization formulas.
- Improved dynamic input field generation logic.
- Debugged and corrected MongoDB schema and connection.
- Improved UI layout and component structure.

These corrections improved the accuracy, stability, and overall reliability of the system.


### What Changed During Development and Why

During the development process, several improvements were made to enhance the accuracy, usability, and maintainability of the system.

##### Added Decision History Feature  
Initially, the system only allowed users to create and edit current decisions. Later, a decision history feature was added to allow users to view their previous decisions.

Reason: This improvement allows users to track past decisions, view results.

##### Introduced Normalization for Accurate Comparison  
Earlier, scores and weights were used directly in calculations. Normalization was later introduced to convert weights and scores into a common scale.

Reason: Normalization ensures fair and accurate comparison between criteria, especially when using both "Higher is Better" and "Lower is Better" criteria. It improves the mathematical correctness of the weighted decision model.


##### Implemented Dynamic Input Generation  
Originally, input fields were static. Later, dynamic input generation was added to allow flexible numbers of criteria and options.

Reason: This makes the system scalable and adaptable to different types of decision problems.


##### Added Error Validation Before Calculation  
Validation checks were added before performing calculations, such as ensuring total weight equals 100%.

Reason: This prevents incorrect calculations and ensures reliable and accurate results.


