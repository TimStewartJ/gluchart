import os
import argparse
import pandas as pd
import numpy as np
import mlflow
import mlflow.sklearn
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import classification_report
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, Dropout, LSTM, Bidirectional
from keras.optimizers import Adam

def main():
    """Main function of the script."""

    # input and output arguments
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", type=str, help="path to input data")
    parser.add_argument("--train_start_date", type=str, required=False, default='2014-06-01')
    parser.add_argument("--test_start_date", type=str, required=False, default='2014-07-31')
    parser.add_argument("--test_end_date", type=str, required=False, default='2014-08-30')
    parser.add_argument("--n_estimators", required=False, default=100, type=int)
    parser.add_argument("--learning_rate", required=False, default=0.1, type=float)
    parser.add_argument("--registered_model_name", type=str, help="model name")
    args = parser.parse_args()
   
    # Start Logging
    mlflow.start_run()

    # enable autologging
    mlflow.sklearn.autolog()

    ###################
    #<prepare the data>
    ###################
    print(" ".join(f"{k}={v}" for k, v in vars(args).items()))

    print("input data:", args.data)

    date_header_name = 'LocalDtTm'
    
    glucose_df = pd.read_csv(args.data, parse_dates=[date_header_name], index_col=date_header_name)
    glucose_df.index.name = "Index"
    glucose_df.dropna(inplace=True)

    mlflow.log_metric("num_samples", glucose_df.shape[0])
    mlflow.log_metric("num_features", glucose_df.shape[1] - 1)

    train_df, test_df = glucose_df.loc[(glucose_df.index > args.train_start_date) & (glucose_df.index <= args.test_start_date)], glucose_df.loc[(glucose_df.index > args.test_start_date) & (glucose_df.index <= args.test_end_date)]
    ####################
    #</prepare the data>
    ####################

    ##################
    #<train the model>
    ##################
    # get just the CGM data in an array
    train_data = train_df.values
    valid_data = test_df.values

    # scale data
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_train = scaler.fit_transform(train_data)
    scaled_valid = scaler.fit_transform(valid_data)

    # the steps the algo looks at to make a prediction
    past_steps = 6
    # how many steps in the future the algo tries to make a prediction to
    future_steps = [1, 2, 3, 4, 5, 6]

    future_distance = future_steps[-1]
    total_steps = past_steps + future_distance
    total_step_count = past_steps + len(future_steps)

    x_train,y_train,x_test,y_test = [],[],[],[]
    for i in range(total_steps, train_df.shape[0]): # for the entire training set
        x_train.append(scaled_train[i-total_steps:i-future_distance]) # get all past readings (including all features)

        # put future readings in (only CGM)
        future_readings = []
        for future_dist in future_steps:
            future_readings.append(scaled_train[i-future_distance + future_dist,0])
        y_train.append(future_readings) 

    for i in range(total_steps, test_df.shape[0]):
        x_test.append(scaled_valid[i-total_steps:i-future_distance]) # get all past readings (including all features)

        future_readings = []
        for future_dist in future_steps:
            future_readings.append(scaled_valid[i-future_distance + future_dist,0])
        y_test.append(future_readings) # put future readings in (only CGM)

    # convert to ndarray
    x_train,y_train,x_test,y_test = np.array(x_train), np.array(y_train),np.array(x_test),np.array(y_test)

    print(x_train.shape, y_train.shape, x_test.shape, y_test.shape)

    print(f"Training with data of shape {x_train.shape}")

    model = Sequential()
    model.add(Bidirectional(LSTM(units=64, activation='relu', input_shape=(x_train.shape[1],x_train.shape[2]), return_sequences=True)))
    model.add(LSTM(units=32, activation='relu', return_sequences=False))
    model.add(Dropout(0.1))
    model.add(Dense(units=len(future_steps), activation='relu'))
    ADAM = Adam(0.001, beta_1=0.9, beta_2=0.999)
    model.compile(loss='mean_squared_error', optimizer=ADAM)
    y_pred = model.fit(x_train,y_train,epochs=100,batch_size=1024,validation_data=(x_test,y_test),shuffle=False)

    target_prediction = 5

    # print(classification_report(y_test[past_steps:,0,0], y_pred[:,target_prediction,-(past_steps)].reshape(-1,1)[:,0]))
    ###################
    #</train the model>
    ###################

    ##########################
    #<save and register model>
    ##########################
    # Registering the model to the workspace
    print("Registering the model via MLFlow")
    mlflow.sklearn.log_model(
        sk_model=model,
        registered_model_name=args.registered_model_name,
        artifact_path=args.registered_model_name,
    )

    # Saving the model to a file
    mlflow.sklearn.save_model(
        sk_model=model,
        path=os.path.join(args.registered_model_name, "trained_model"),
    )
    ###########################
    #</save and register model>
    ###########################
    
    # Stop Logging
    mlflow.end_run()

if __name__ == "__main__":
    main()
