# Gluchart: A glucose level prediction model

# Overview
Diabetes is a chronic condition that causes problems with the production of insulin, a hormone that our body uses to regulate our sugar levels. With little to no insulin
being produced in the pancreas, patients with diabetes must regulate their glucose levels by directly injecting insulin.

About two months ago, our friend and fellow Aggie, Aidan was diagnosed with Type I diabetes. Since then, he's told us about his struggles in self-administering insulin.
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

A key feature of this dataset was that it was data collected by a glucose monitor, which would be similar to data diabetes patients could easily upload from their devices in utilizing our model. By training our model on this dataset and confirming its efficacy, we wanted to prove that it would be expandable to other patients' data as well.

For access to this dataset, please follow the link: https://github.com/irinagain/Awesome-CGM/wiki/Anderson-(2016)

## Training
To train our model, we wrote the program in Python and conducted training on Google Colab. Once the model was finished, we could have it predict future values for validation.

## Verification
To ensure the validity of our predictions, we use the Clarke Error Grid Analysis (EGA), a widely accepted method developed in 1987 specifically for measuring the quality of blood glucose level predictions. In essence, EGA plots glucose predictions on a graph divided into five regions (Regions A through E). Region A represents accurate predictions, while regions B, C, D, and are increasingly "bad" prediction, with point E being a potentially dangerous misprediction.

For more information on the EGA, please consult the following resources:

NHS: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7196876/

Wikipedia: https://en.wikipedia.org/wiki/Clarke_Error_Grid

If we observe that the values our model predicted are mostly in Region A, it would provide strong evidence for the effectiveness of our model.

# Results and Interpretation
To test the accuracy of our model, we had it generate predictions for 30 minutes from a given point in the data set, assuming that no meals or insulin intake occurred.

The graph below displays the predicted values (red) overlaid on the actual values (black) from the data set:

![image](https://github.com/TimStewartJ/gluchart/assets/24793742/5ec62a28-92a9-44aa-9b89-3091ee338f71)

We also generated a Clark Error Grid for the predictions. Below is the Clark Grid along with a pie chart visualization.

![image](https://github.com/TimStewartJ/gluchart/assets/24793742/ad52000b-7c19-4348-b79d-b3b39f0db43f)
![image](https://github.com/TimStewartJ/gluchart/assets/24793742/8af71481-c5b0-4574-a858-a4da4ae0e407)

We see that 94.6 of our predictions are within Zone A, while close to none are in Zones C~E, indicating a high level of reliability and effectiveness for our model.

For increased time intervals into the future, however, the reliability of our model decreased. The following are the same graphs for a 1-hour prediction:

![image](https://github.com/TimStewartJ/gluchart/assets/24793742/7fea08b7-64cb-4900-b3eb-b1a4076065fe)

![image](https://github.com/TimStewartJ/gluchart/assets/24793742/94928a12-55d1-4ba3-93a2-beb76156e537)

![image](https://github.com/TimStewartJ/gluchart/assets/24793742/e006aaed-69ca-4259-b25c-a05b3fe1bbdf)

And the same, this time for a 2-hour prediction:

![image](https://github.com/TimStewartJ/gluchart/assets/24793742/3e8212e0-4111-4a56-bce1-60d2ef6d6935)

![image](https://github.com/TimStewartJ/gluchart/assets/24793742/1130d1e8-ca93-4897-b1ce-ec9491a9909b)

![image](https://github.com/TimStewartJ/gluchart/assets/24793742/418b4ac5-1e0d-4435-a6a0-53b608918f6d)

After trying various intervals, we concluded that our model was best when predicting up to an hour, with it being most reliable around the 30-minute mark.

# Conclusion & Going Forward
In conclusion, our LSTM was able to provide extremely reliable predictions up to 30 minutes, while giving reasonable estimates up to an hour. Having an effective model for short-term blood glucose level prediction helps patients better dose for insulin and reduce the risk of over or under injection

Using an LSTM model trained on data obtained from continuous glucose monitors, we were able to accurately predict glucose levels up to 30 minutes in the future.
By having a reliable prediction of glucose value in the short-term, patients can better dose for insulin and minimize the risks of over or under-injection, particularly in mealtime scenarios. After seeing how future glucose levels charted out, or how they would change based on a meal or an injection, users could adjust and plan to better ensure their health.

Here is what our friend Aidan had to say about Gluchart and his experiences with diabetes:

"Within the first few months after adopting this disability, no aspect generates more stress or hesitance than the frequent decision-making process which occurs on a daily basis. Being able to test the ramifications of your choices in real time not only offers a level of reliability which removes mental burden, but helps in teaching you how to best take care of yourself in an educated manner."


Going forward, our focus is on improving accuracy of predictions for longer time intervals in the future. One of the experiences Aidan shared with us was getting up in the middle of the night due to his blood glucose levels being dangerously low, and this highlights one of many scenarios where reliable long-term predictions of glucose levels would be valuable. Furthermore, we recognize the need to streamline the data input process for users. Currently, users have to input the data from their glucose monitors in the form of a .csv file upload. While companies such as dexcom provide a relatively simple process for exporting users’ data to .csv files, we think that a streamlined process that connects our model directly to monitors such as Dexcom or Fitbit would make our process seamless.

As it is, we hope that Gluchart will be able to serve as a valuable tool for assisting individuals of the Davis community and beyond in navigating diabetes and staying healthy.
