from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, classification_report
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)

# ✅ Connect to MongoDB
client = MongoClient("mongodb://user1:12345@localhost:27017/?authMechanism=DEFAULT")
db = client["ai-diet-planner"]

# ✅ Load dataset
df = pd.read_csv("data/ayurvedic_dosha_dataset.csv")

# ✅ Preprocess dataset
X = df.drop(columns=["Dosha"])  # Features
y = df["Dosha"]  # Target variable

# Convert categorical data to numerical (One-Hot Encoding)
X = pd.get_dummies(X)

# ✅ Encode target labels (Dosha)
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)  # "Kapha"=0, "Pitta"=1, "Vata"=2

# ✅ Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# ✅ Train optimized XGBoost model
model = XGBClassifier(n_estimators=300, max_depth=10, learning_rate=0.05, use_label_encoder=False, eval_metric='mlogloss')
model.fit(X_train, y_train)

# ✅ Save model and label encoder
joblib.dump(model, "dosha_classifier.pkl")
joblib.dump(label_encoder, "label_encoder.pkl")
joblib.dump(X_train.columns.tolist(), "selected_features.pkl")  # Save the full feature list

# ✅ Load trained model
dosha_model = joblib.load("dosha_classifier.pkl")
label_encoder = joblib.load("label_encoder.pkl")
selected_features = joblib.load("selected_features.pkl")  # Load full feature list

# ✅ Evaluate model
y_pred = dosha_model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"✅ Model Accuracy: {accuracy:.4f}")
print("✅ Classification Report:")
print(classification_report(y_test, y_pred))

@app.route("/generate_diet", methods=["POST"])
def generate_diet():
    user_answers = request.json
    user_df = pd.DataFrame([user_answers])

    # ✅ Ensure the input matches training features
    user_df_encoded = pd.get_dummies(user_df)

    # ✅ Align columns: Add missing columns & sort order
    for col in selected_features:
        if col not in user_df_encoded:
            user_df_encoded[col] = 0  # Add missing feature columns

    user_df_encoded = user_df_encoded[selected_features]  # Ensure correct feature order

    # ✅ Predict Dosha
    predicted_dosha_encoded = dosha_model.predict(user_df_encoded)[0]
    predicted_dosha = label_encoder.inverse_transform([predicted_dosha_encoded])[0]

    return jsonify({"dosha": predicted_dosha, "accuracy": accuracy})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
