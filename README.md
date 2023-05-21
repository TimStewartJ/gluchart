# Gluchart
A glucose level prediction model using a LSTM model.

# Overview
Diabetes is a chronic condition that causes problems with the production of insulin, a hormone that our body uses to regulate our sugar levels. With little to no insulin 
being produced in the pancrease, patients with diabetes must regulate their glucose levels by directly injecting insulin.

About two months ago, our friend and fellow Aggie Aidan was diagnosed with Type I diabetes. Since then, he's told us about his struggles in self-administering insulin.
He would inject insulin before a meal, only to find out shortly after that it was an insufficient dosage and have to self-administer again. Worse yet was when he would
overshoot and administer too much insulin, bringing his glucose levels to dangerously low levels that could induce a coma. Often he would have to anxiously sit and wait, hoping that his insulin levels would be back within a safe range after readjusting his dose.

We wanted to create an application that could aid Aidan, fellow Aggies, and anyone adjusting to diabetes by showing their glucose levels ahead of time. Our model would be trained on a user's data, and be able to predict their glucose for a set amount of time. If successful, it would enhance insulin dosing accuracies for patients and help them avoid having to readjust, ultimately improving their quality of life.

# Goals
The primary goal of this project is to create a glucose prediction model using machine learning that can accurately forecast a person's glucose levels given their current glucose level and an input of insulin or meal.

# Methods
For a machine learning algorithm to work, we need two key components: a data set for our model to train on, and an appropriate model for the data to be trained on. Once a model is trained and we verify its accuracy, the model can be used for any patient's data (provided that it is in the correct format) to generate a glucose level predictor personalized for them.

## Machine Learning Model
To predict future events using past data, we employed time series forecasting, a method of analyzes data points from the past to make predictions. We selected the the Long Short-Term Memory (LSTM) neural network, a widely accepted machine learning model for future data prediction.

We consulted various online resources on time series prediction using LSTM in python. We found the below article to be the most useful:
https://joeng03.medium.com/uni-variate-multi-variate-and-multi-step-time-series-forecast-with-lstm-c3f8318adf68

The resource provided guidance on developing a multivariate prediction model, which was necessary because glucose levels were dependent on multiple input points (different types of insulin, meal values, etc.)

## Data
To train our glucose prediction model, we utilized a publicly available dataset obtained from the 2016 research conducted by Dr. Stacy M. Anderson. 
The dataset consisted of glucose level, insulin intake, and meal values extracted from a glucose monitoring device (Dexcom in this case) attached to various patients' bloodstreams. We cleaned up the dataset to process it into a format that our model could use.

A key feature of this dataset was that it was data collected by a glucose monitor, which would be similiar to data diabetes patiends could easily upload from their devices in utilizing our model. By training our model on this dataset and confirming its efficacy, we wanted to prove that it would be expandable to other patients' data as well.

For access to this dataset, please follow the link: https://github.com/irinagain/Awesome-CGM/wiki/Anderson-(2016)

## Training
To train our model, we wrote the program in Python and conducted training on Google Colab. Once the model was finished, we could have it predict future values for validation.

## Verification
To ensure the validity of our predictions, we use the Clarke Error Grid Analysis (EGA), a widely accepted method developed in 1987 specifically for measuring the quality of blood glucose level predictions. In essense, EGA plots glucose predictions on a graph divided into five regions (Regions A through E). Region A represents accurate predictions, while regions B, C, D, and are increasingly "bad" prediction, with point E being a potentially dangerous misprediction.

For more information on the EGA, please consult the following resources
NHS: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7196876/

Wikipedia: https://en.wikipedia.org/wiki/Clarke_Error_Grid

If we observe that the values our model predicted are mostly in Region A, it would provide strong evidence for the effectiveness of our model.

# Results and Interpretation
Now let's see how we did!
This is what our model predicted would happen 30 minutes from now,  given that no meals/insulin intakes occurred.

The predictions (red) are on top of the actual values (black):

![image](https://github.com/TimStewartJ/gluchart/assets/24793742/2ca9e9d6-e1ff-4734-8c10-9373fc01d9bc)

And here is the Clarke error grid, along with a pie chart with the percentages for each zone:
![image](https://github.com/TimStewartJ/gluchart/assets/24793742/72e6c267-4dfa-4066-8ab7-4627903a2154)
![image](https://github.com/TimStewartJ/gluchart/assets/24793742/affbd5b9-fcfa-46af-9d94-5e83e2dd4af2)

We see that 95.5% of our predictions are within Zone A, while close to none are in Zones C~E, validating the quality and accuracy of our predictions!
The more farther into the future we tried to predict, the less accurate it was. Predicting two hours into the future, only around 50% of
our values were in Zone A, rendering our predictions less useful and more importantly, dangerous. After experimenting with various prediction intervals into the future, 
we concluded that we were most confident about the 30 minute predictions.

# Conclusion & Going Forward
Using an LSTM model trained on data obtained from continuous glucose monitors, we were able to accurately predict glucose levels up to 30 minutes in the future. 
By having a reliable prediction of glucose value in the short-term, patients can better dose for insulin and reduce the risk of over/underinjection, especially when they need to inject insulin before a meal.

Here is what our friend Aidan had to say about Gluchart:
"Within the first few months after adopting this disability, no aspect generates more stress or hesitance than the frequent decision-making process which occurs on a daily basis. Being able to test the ramifications of your choices in real time not only offers a level of reliability which removes mental burden, but helps in teaching you how to best take care of yourself in an educated manner."

Going forward, we want to make our model be able to predict more accurately for longer lengths of time in the future
For now,
Dexom connect feature talk abiut


