import uvicorn
import os
from fastapi import FastAPI, responses, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cv2
import io
import predictor
import numpy as np
import pandas as pd
from PIL import Image
import torchvision.transforms.functional as TF
import torch
import cv2

app = FastAPI(title='Plant Disease Detection',
              description="API for detecting plant diseases", version="1.0", debug=True)


origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:5000",
    "http://127.0.0.1:5000",
    "http://192.168.1.41:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

diseaseInfoPath = os.path.dirname(os.getcwd()).replace(
    '\\', '/') + '/Plant-Disease-Detection-App/BackEnd/assets/disease_info.csv'
supplementInfoPath = os.path.dirname(os.getcwd()).replace(
    '\\', '/') + '/Plant-Disease-Detection-App/BackEnd/assets/supplement_info.csv'
modelPath = os.path.dirname(os.getcwd()).replace(
    '\\', '/') + '/Plant-Disease-Detection-App/BackEnd/assets/plant_disease_model_1_latest.pt'
diseaseInfo = pd.read_csv(diseaseInfoPath, encoding='cp1252')
supplementInfo = pd.read_csv(supplementInfoPath, encoding='cp1252')

model = predictor.CNN(39)
model.load_state_dict(torch.load(modelPath))
model.eval()


def prediction(image):
    # image = Image.open(image_path)
    image = image.resize((224, 224))
    input_data = TF.to_tensor(image)
    input_data = input_data.view((-1, 3, 224, 224))
    output = model(input_data)
    output = output.detach().numpy()
    index = np.argmax(output)
    return index

def load_image_into_numpy_array(data):
    npimg = np.frombuffer(data, np.uint8)
    frame = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    return cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)


@app.post('/detectDisease')
async def captiongen(file: UploadFile = File(...)):
    request_object_content = await file.read()
    image = Image.open(io.BytesIO(request_object_content))
    pred = prediction(image)
    title = diseaseInfo['disease_name'][pred]
    description = diseaseInfo['description'][pred]
    prevent = diseaseInfo['Possible Steps'][pred]
    image_url = diseaseInfo['image_url'][pred]
    supplement_name = supplementInfo['supplement name'][pred]
    supplement_image_url = supplementInfo['supplement image'][pred]
    supplement_buy_link = supplementInfo['buy link'][pred]
    return responses.JSONResponse(content={"title": title, "desc" : description, "prevention" : prevent, "image_url": image_url, "pred": int(pred), "sname": supplement_name, "simage": supplement_image_url, "buy_link": supplement_buy_link})


if __name__ == "__main__":
    uvicorn.run(app, port=5000)