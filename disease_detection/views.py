# path: disease_detection/views.py
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
import tensorflow as tf
import numpy as np
from PIL import Image
import io

# ✅ Preprocessing Function
def preprocess_image(image: Image.Image):
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0  # Normalize
    image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
    return image_array


# ✅ Prediction Function with Rejection Mechanism
def make_prediction(model_path, image_data, disease_classes):
    model = tf.keras.models.load_model(model_path)
    image = Image.open(io.BytesIO(image_data))
    processed_image = preprocess_image(image)

    predictions = model.predict(processed_image)
    max_confidence = float(np.max(predictions))
    predicted_class = disease_classes[np.argmax(predictions)]

    CONFIDENCE_THRESHOLD = 0.75  # Set the confidence threshold

    try:
        # Handle cases based on confidence level
        if max_confidence < CONFIDENCE_THRESHOLD:
            return {"disease": "Unrecognized. The image does not match any known disease. Please contact your nearest agricultural instructor.", "confidence": max_confidence,
                    "message": "The image does not match any known disease."}
        else:
            return {"disease": predicted_class, "confidence": max_confidence}
    except Exception as e:
        return {"error": f"Invalid input: {str(e)}"}

# --------------------------------
# ✅ Banana Prediction Endpoint
# --------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def predict_banana(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file uploaded"}, status=400)

    image_data = request.FILES['file'].read()
    disease_classes = ['Healthy', 'Panama Disease', 'Pestalotiopsis', 'Sigatoka Disease']
    model_path = "disease_detection/models/banana_model.h5"

    result = make_prediction(model_path, image_data, disease_classes)
    return JsonResponse(result)

# --------------------------------
# ✅ Mango Prediction Endpoint
# --------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def predict_mango(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file uploaded"}, status=400)

    image_data = request.FILES['file'].read()
    disease_classes = ['Anthracnose', 'Bacterial Canker', 'Cutting Weevil', 'Die Back', 'Gall Midge', 'Healthy', 'Powdery Mildew', 'Sooty Mould']
    model_path = "disease_detection/models/mango_model.h5"

    result = make_prediction(model_path, image_data, disease_classes)
    return JsonResponse(result)

# --------------------------------
# ✅ Papaya Prediction Endpoint
# --------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def predict_papaya(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file uploaded"}, status=400)

    image_data = request.FILES['file'].read()
    disease_classes = ['Anthracnose', 'Bacterial Spot', 'Curl', 'Healthy', 'Mealybug', 'Mite Disease', 'Mosaic', 'Ringspot']
    model_path = "disease_detection/models/papaya_model.h5"

    result = make_prediction(model_path, image_data, disease_classes)
    return JsonResponse(result)

# --------------------------------
# ✅ Snake Gourd Prediction Endpoint
# --------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def predict_snake_gourd(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file uploaded"}, status=400)

    image_data = request.FILES['file'].read()
    disease_classes = ['Healthy', 'Anthracnose', 'Yellow Leaf Disease']
    model_path = "disease_detection/models/snake_gourd_model.h5"

    result = make_prediction(model_path, image_data, disease_classes)
    return JsonResponse(result)

# --------------------------------
# ✅ Eggplant Prediction Endpoint
# --------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def predict_eggplant(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file uploaded"}, status=400)

    image_data = request.FILES['file'].read()
    disease_classes = ['Aphids', 'Cercospora Leaf Spot', 'Defect Eggplant', 'Flea Beetles', 'Fresh Eggplant', 'Fresh Eggplant Leaf', 'Leaf Wilt', 'Phytophthora Blight', 'Powdery Mildew', 'Tobacco Mosaic Virus', 'Yellow Disease']
    model_path = "disease_detection/models/eggplant_model.h5"

    result = make_prediction(model_path, image_data, disease_classes)
    return JsonResponse(result)

# --------------------------------
# ✅ Okra Prediction Endpoint
# --------------------------------
@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([MultiPartParser, FormParser])
def predict_okra(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file uploaded"}, status=400)

    image_data = request.FILES['file'].read()
    disease_classes = ['Downy Mildew', 'Healthy', 'Leaf Curly Virus']
    model_path = "disease_detection/models/okra_model.h5"

    result = make_prediction(model_path, image_data, disease_classes)
    return JsonResponse(result)
