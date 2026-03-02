## Decision Companion System

The Decision Companion System helps users make better decisions by allowing them to compare multiple options based on defined criteria and assigned importance weights. It evaluates each option using a structured and explainable scoring method, ranks the alternatives, and clearly explains why a particular option is recommended.
#### Live Link : https://decision-companion-system-frontend.onrender.com/

### Understanding of the problem

Many people struggle to make effective decisions when multiple options and factors are involved, often relying on intuition rather than structured analysis, which can lead to confusion or poor outcomes. The problem therefore requires designing and building a Decision Companion System that helps users make structured and rational decisions by evaluating multiple options against clearly defined criteria with varying levels of importance. Instead of a hard-coded or static comparison, the system must dynamically process user inputs, allow users to define criteria and assign weights, compare alternatives, and automatically calculate a ranked recommendation using logical evaluation methods such as weighted scoring. A key requirement is explainability—the reasoning behind the ranking must be transparent and understandable, ensuring the system provides a clear, logical, and non–black-box approach to decision-making.

### Assumptions made

* Users can clearly define their decision problem.
* Criteria can be quantified or scored numerically.
* Users can assign weights to reflect priorities.
* Higher weighted criteria have greater influence on final ranking.
* The weights sum to 100%, each weight directly represents its percentage influence on the final decision, ensuring that the relative importance of each criterion is clearly reflected in the final score.
* The Percentage Weights are normalized to sum to 1, and the scores for each option against each criterion are scaled appropriately to ensure fair comparison and accurate reflection of each criterion’s importance in the final decision.
* Criteria can be categorized into two types:
  * **Higher is Better** (e.g., performance, battery life, ratings)
  * **Lower is Better** (e.g., price, cost, risk, delivery time)
* For "Lower is Better" criteria, the system normalizes or inversely scores values so that lower numeric values result in higher contribution to final score.
* Changing inputs or weights should immediately affect the outcome.

### Why the solution is structured this way

The system is structured using a weighted scoring approach because it provides a clear, transparent, and mathematically explainable method for multi-criteria decision-making.

The formula


**Total Score=∑(Normalized Score×Weight)**

ensures that each criterion contributes proportionally to the final result based on its assigned importance. Although users typically assign weights as percentages that sum to 100%, these weights are internally normalized so that their total equals 1. This normalization ensures mathematical consistency, simplifies computation, and maintains proportional influence in the final score calculation.

The architecture is divided into core components to maintain separation of concerns:
* **Input Module** provide interaction with the user
* **Evaluation Engine** handles normalization of weights, scoring of options against each criterion, and ranking logic, ensuring the decision computation remains deterministic and testable.
* **Explanation Generator** ensures transparency by clearly communicating how and why a particular ranking was produced.
* **Dynamic Update Handling** guarantees that any change in inputs or weights immediately reflects in the results, satisfying the requirement that the system must not be static.

### Design Decisions and trade-offs

#### Decision Model Selection

I chose the Weighted Score Model because it provides a balanced way to compare options based on importance.

##### Trade-off:
It requires users to assign weights carefully.

#### Using MongoDB

MongoDB was selected because:
* It stores data in JSON format
* Flexible schema
* Easy integration with Node.js

##### Trade-off:
Requires validation to ensure structured data.

#### Dynamic Input Generation

Input fields are generated dynamically based on user input.

##### Benefit:
Flexible system for different decision types.

##### Trade-off:
Requires additional validation logic.

### Edge cases considered
* The total weight is not 100%
* Empty input fields
* Invalid numerical value
* Recalculation errors
* Missing criteria score
* Database connection errors

### How to run the project

##### STEP 1
Clone the GitHub Repository:
git clone https://github.com/kavyamolps/Decision_Companion_System.git

##### STEP 2
Navigate to project folder
cd Decision_Companion_System

##### STEP 3
Open the folder "Decision_companion_System" in the Visual Studio Code

##### STEP 4
Open the terminal in vscode and navigate to dcs_backend folder (For navigation type:cd dcs_backend)

Install the following one by one:

* npm install
* npm install -g nodemon

##### STEP 5
Run the server (index.js)
For this type:
* nodemon index.js

##### STEP 6
Open another new terminal in vscode and navigate to dcs_frontend folder (for navigation type:cd dcs_frontend)

##### STEP 7
Run the Frontend

For this type:
* npm run dev

##### STEP 8
Create an account and then login to access the Home page. Enter the Decision details.After submitting it will return the best option.


The Decision Companion System is now live. You can explore and test decisions using the link below:
#### Live Link : https://decision-companion-system-frontend.onrender.com/

### What improvements can be made when more time is given

* Add Edit and Delete functionality for the history section, allowing users to modify or remove previously saved decisions.
* Pie chart based score analysis
