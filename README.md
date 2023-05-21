# Gluchart
A glucose level prediction model using a LSTM model.

# Overview
Diabetes is a chronic condition that causes problems with the production of insulin, a hormone that our body uses to regulate our sugar levels. With little to no insulin 
being produced in the pancrease, patients with diabetes must regulate their glucose levels by directly injecting insulin.

About two months ago, our friend and fellow Aggie Aidan was diagnosed with Type I diabetes. Since then, he's told us about his struggles in self-administering insulin.
He would inject insulin before a meal, only to find out shortly after that it was an insufficient dosage and have to self-administer again. Worse yet was when he would
overshoot and administer too much insulin, bringing his glucose levels to dangerously low levels that could induce a coma.

We wanted to create an application that could aid Aidan, fellow Aggies, and anyone adjusting to diabetes by showing their glucose levels ahead of time. If successful,
our application could guide people in dosing the correct amount of insulin.

# Goals
Create a glucose prediction model using machine learning that can accurately forecast a person's glucose levels given their current glucose level and an input of insulin/meal.

# Methods
Time series forecasting is a method that analyzes data points from the past to make predictions. The Long Short-Term Memory (LSTM) Neural Network is one of the most 
popular models used for time series forecasting, and is the model we will be implementing through python to make our prediction model.

## Data
We used the publicly available data set of patient's CGM (Continuous Glucode Monitoring--provided by devices that the patients wore), insulin intake, and meal values
from the 2016 research conducted by Dr. Stacy M. Anderson.
Link here: https://github.com/irinagain/Awesome-CGM/wiki/Anderson-(2016)

## Machine Learning
We consulted many online resources on time series prediction using LSTM in python. We found the below article to be the most useful:
https://joeng03.medium.com/uni-variate-multi-variate-and-multi-step-time-series-forecast-with-lstm-c3f8318adf68

Since our glucose levels are affected by multiple values (different types of insulin, meal values, etc.) , we must use a multivariate prediction model instead of a univariate model.

## Verification
But how do we know if our predictions are valid (other than that they "look good?"). 
The Clarke Error Grid Analysis (EGA), developed in 1987, is used to quantify clinical accuracy of glucose predictions. Many research papers we referenced used EGA to quantify the accuracy of their predictions.
To oversimplify, the more dots there are in region A in the graph, the better (regions B, C, D, and E less so--with point E being a particularly dangerous misprediction.)
More can be read about EGA here: https://en.wikipedia.org/wiki/Clarke_Error_Grid

# Results and Interpretation
We trained an LSTM model on the Anderson data to predict up to 30 minutes in the future. 
Here are the predictions (red) on top of the actual values (black):

![image](https://github.com/TimStewartJ/gluchart/assets/24793742/2ca9e9d6-e1ff-4734-8c10-9373fc01d9bc)

And here is the Clarke error grid, along with a pie chart with the percentages for each zone:
![image](https://github.com/TimStewartJ/gluchart/assets/24793742/72e6c267-4dfa-4066-8ab7-4627903a2154)
![image](https://github.com/TimStewartJ/gluchart/assets/24793742/affbd5b9-fcfa-46af-9d94-5e83e2dd4af2)






