import os
import logging
import json
import numpy as np
import joblib
from sklearn.preprocessing import MinMaxScaler


def init():
    """
    This function is called when the container is initialized/started, typically after create/update of the deployment.
    You can write the logic here to perform init operations like caching the model in memory
    """
    global model
    # AZUREML_MODEL_DIR is an environment variable created during deployment.
    # It is the path to the model folder (./azureml-models/$MODEL_NAME/$VERSION)
    # Please provide your model's folder name if there is one
    model_path = os.path.join(
        os.getenv("AZUREML_MODEL_DIR"), "glucose_defaults_model", "model.pkl"
    )
    # deserialize the model file back into a sklearn model
    model = joblib.load(model_path)
    logging.info("Init complete")


def run(raw_data):
    """
    This function is called for every invocation of the endpoint to perform the actual scoring/prediction.
    In the example we extract the data from the json input and call the scikit-learn model's predict()
    method and return the result back
    """
    logging.info("model 1: request received")
    data = json.loads(raw_data)["data"]
    data = np.array(data)
    logging.info(data)

    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data)
    logging.info(scaled_data)

    # the steps the algo looks at to make a prediction
    past_steps = 6

    input_data = []
    for i in range(past_steps, scaled_data.shape[0]):
        input_data.append(scaled_data[i-past_steps:i])
    input_data = np.array(input_data)

    logging.info(input_data)

    result = model.predict(input_data)
    logging.info("Request processed")

    logging.info(result)

    input_CGM = data[:,0]
    result = (result * ( input_CGM.max() - input_CGM.min() )) + input_CGM.min()

    logging.info(result)

    return result.tolist()