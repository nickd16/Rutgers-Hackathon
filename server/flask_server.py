from flask import Flask, send_file, request, jsonify
from flask_cors import CORS
from threading import Thread
from diffusers import DiffusionPipeline, DPMSolverMultistepScheduler
import torch
import matplotlib.pyplot as plt
from sentence_transformers import SentenceTransformer, util
from flask_pymongo import PyMongo
from dotenv import load_dotenv
import os
import firebase_admin
from firebase_admin import credentials


def generate(prompt):
    prompts = ['high quality image of',
               'super realistic image of',
               'cartoony abstract image of',
               'high resolution picture of']

    for i in range(4):
        prompts[i] += prompt

    images = []
    for i in range(4):
        images.append((pipe(prompts[i], num_inference_steps=25)[0][0]))

    for i in range(4):
        images[i].save(f'generated_images/img_choice{i}.png')

def sim_score(s1, s2):
    e1 = model.encode(s1)
    e2 = model.encode(s2)
    return(util.cos_sim(e1, e2))

load_dotenv()
app = Flask(__name__)
CORS(app)
repo_id = "stabilityai/stable-diffusion-2"
pipe = DiffusionPipeline.from_pretrained(repo_id, torch_dtype=torch.float16, revision="fp16")
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
pipe = pipe.to("cuda")
model = SentenceTransformer('paraphrase-MiniLM-L6-v2').cuda()
mongo_uri = os.getenv("MONGO_URL")
app.config['MONGO_URI'] = mongo_uri
firebase_key = os.getenv("FIREBASE_KEY")
cred = credentials.Certificate("../../firebaseImagin.json")
firebase_admin.initialize_app(cred)


try:
    # Initialize Flask-PyMongo
    mongo = PyMongo(app)
except ConnectionError:
    print("Error: Failed to connect to MongoDB.")


@app.route("/")
def test():
    return "Hello World"
@app.route("/play/<string:a>", methods=["POST"])
def create(a):
    aWithSpaces = a.replace("-", " ")
    print(a)
    print(aWithSpaces)
    generate(aWithSpaces)
    return "Generating Images Complete"

@app.route("/generated_images/<path:image_filename>")
def serve_image(image_filename):
    return send_file(f"generated_images/{image_filename}")

@app.route("/compare/<string:a>/<string:b>", methods=["POST"])
def comparePrompts(a, b):
    text_spaces = a.replace("-", " ")
    guess_spaces = b.replace("-", " ")
    return str(sim_score(text_spaces, guess_spaces).item()) 

@app.route('/signup', methods=['POST'])
def signup():
    
    data = request.get_json()
    
    name = data.get('name')
    email = data.get('email')

    users_collection = mongo.db.users
    user_data = {
        'name' : name,
        'email': email,
        'average_score': 0,
        'wins': 0,
        'games_played': 0,
        'captions_guessed': 0
    }
    users_collection.insert_one(user_data)

    response_data = {
        'message': 'Signup successful',
        'name': name,
        'email': email,
        'average_score': 0,
        'wins': 0,
        'games_played': 0,
        'captions_guessed': 0
    }
    return jsonify(response_data), 200



if __name__ == '__main__':
    app.run(debug=True, port=5000)