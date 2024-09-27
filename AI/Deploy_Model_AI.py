import warnings
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
import cv2
import numpy as np
from keras.models import load_model
from joblib import load
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors


app = Flask(__name__)
CORS(app)
warnings.filterwarnings("ignore")


model_loaded_VGG16 = load_model("./model/VGG16_Plant_Diseases_v2.h5")
knn_recommend_loaded, y_recommend_loaded = load('./model/KNN_model_v3.pkl')


def get_index_to_class(index):
    index_to_class = {
        0: 'Táo Bệnh đốm vỏ táo',
        1: 'Táo Thối đen',
        2: 'Táo Bệnh gỉ sét táo',
        3: 'Táo Khỏe mạnh',
        4: 'Việt quất Khỏe mạnh',
        5: 'Anh đào Bệnh sương mốc',
        6: 'Anh đào Khỏe mạnh',
        7: 'Ngô Bệnh đốm lá Cercospora Bệnh đốm lá xám',
        8: 'Ngô Bệnh gỉ sắt',
        9: 'Ngô Bệnh thối lá phía bắc',
        10: 'Ngô Khỏe mạnh',
        11: 'Nho Bệnh thối đen',
        12: 'Nho Bệnh đen Esca (Đốm đen)',
        13: 'Nho Bệnh đốm lá (Isariopsis)',
        14: 'Nho Khỏe mạnh',
        15: 'Cam Bệnh lá vàng',
        16: 'Đào Bệnh đốm khuẩn',
        17: 'Đào Khỏe mạnh',
        18: 'Ớt chuông Bệnh đốm khuẩn',
        19: 'Ớt chuông Khỏe mạnh',
        20: 'Khoai tây Bệnh đốm sớm',
        21: 'Khoai tây Bệnh đốm muộn',
        22: 'Khoai tây Khỏe mạnh',
        23: 'Mâm xôi Khỏe mạnh',
        24: 'Đậu nành Khỏe mạnh',
        25: 'Bí Bệnh sương mốc',
        26: 'Dâu tây Bệnh đốm lá',
        27: 'Dâu tây Khỏe mạnh',
        28: 'Cà chua Bệnh đốm khuẩn',
        29: 'Cà chua Bệnh đốm sớm',
        30: 'Cà chua Bệnh đốm muộn',
        31: 'Cà chua Bệnh mốc lá',
        32: 'Cà chua Bệnh đốm lá Septoria',
        33: 'Cà chua Bệnh nhện vàng',
        34: 'Cà chua Bệnh đốm đích',
        35: 'Cà chua Virus vàng lá cà chua',
        36: 'Cà chua Virus khảm cà chua',
        37: 'Cà chua Khỏe mạnh'
    }
    return index_to_class[index]


# def get_plant_to_class(index):
#     index_to_class = {
#         0: 'lúa',
#         1: 'chuối',
#         2: 'xoài',
#         3: 'dưa hấu',
#         4: 'cam',
#         5: 'đu đủ',
#         6: 'dừa',
#         7: 'táo',
#         8: 'nho',
#         9: 'cà phê',
#     }
#     return index_to_class[index]

@app.route('/api/VGG16', methods=['POST'])
def predict_data_VGG16():
    try:
        height_image = 90
        width_image = 90
        # image_path = "./image_test_disease/test_img.jpg"
        # image = cv2.imread(image_path)
        image_request = request.files['photo']
        image = cv2.imdecode(np.fromstring(image_request.read(), np.uint8), cv2.IMREAD_COLOR)

        image = cv2.resize(image, (height_image, width_image))
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  
        image = image / 255.0 
        image = np.expand_dims(image, axis=0) 

        prediction = model_loaded_VGG16.predict(image)
        max_index = np.argmax(prediction[0])
        
        classname = get_index_to_class(max_index) 
        
        response_data = {
            "status": 200,
            "message": "Predict success",
            # "predict_code": int(max_index),
            "predictMessage": classname
        }
        
        return jsonify(response_data)
    except Exception as e:
        return jsonify({"status": 500, "error": str(e)})

@app.route('/api/recommend', methods=['POST'])
def predict_data_recommend():
    try:
        top_select = request.json['top_select']
        N = request.json['N']
        P = request.json['P']
        K = request.json['K']
        ph = request.json['ph']
        
        print(N, P,K,ph)
        
        df = pd.read_csv("./dataset/crop_recommendation_dataset.csv")
        X = df[['N', 'P', 'K', 'ph']].values
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)

        new_data = np.array([[N, P, K, ph]])
        new_data_scaled = scaler.transform(new_data)
        
        # Search for nearest neighboring points
        distances, indices = knn_recommend_loaded.kneighbors(new_data_scaled)
        nearest_crops = y_recommend_loaded[indices[0]] # get names of the plants
        nearest_distances = distances[0]
        result_df = pd.DataFrame({'Crop': nearest_crops, 'Distance': nearest_distances})

        # average score for each crop type
        mean_distances = result_df.groupby('Crop')['Distance'].mean().reset_index()
        # Sort by average distance from smallest to largest
        mean_distances = mean_distances.sort_values(by='Distance').head(top_select)
        
        recommendations = mean_distances.to_dict(orient='records')
        
        response_data = {
            "status": 200,
            "message": "Predict success",
            "labels": recommendations,
            # "probabilities": top_probabilities,
        }
        
        return jsonify(response_data)
    except Exception as e:
        return jsonify({"status": 500, "error": str(e)})
    
@app.route('/api/recommend/pretrain', methods=['POST'])
def pretrain_model_recommend():
    try:
        N = request.json['N']
        P = request.json['P']
        K = request.json['K']
        ph = request.json['ph']
        label = request.json['Label']
        
        print(N, P,K,ph, label)

        df = pd.read_csv("./dataset/crop_recommendation_dataset.csv")
        
        new_data = pd.DataFrame({
            'N': [N], 
            'P': [P], 
            'K': [K], 
            'temperature': [None], 
            'humidity': [None], 
            'ph': [ph], 
            'rainfall': [None], 
            'label': [label]
        })
        df = pd.concat([df, new_data], ignore_index=True)
        df.to_csv('./dataset/crop_recommendation_dataset.csv', index=False)
        
        X = df[['N', 'P', 'K', 'ph']].values
        y = df['label'].values
        
        scaler = StandardScaler()
        X_scaled = scaler.fit_transform(X)
        
        knn_model = NearestNeighbors(n_neighbors=200, metric='minkowski', algorithm='brute')
        knn_model.fit(X_scaled)
        
        joblib.dump((knn_model, y), './model/KNN_model_v3.pkl')
        
        response_data = {
            "status": 200,
            "message": "Pretrain success"
        }
        
        return jsonify(response_data)
    except Exception as e:
        return jsonify({"status": 500, "error": str(e)})

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000)
