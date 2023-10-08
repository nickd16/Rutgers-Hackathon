from flask import Flask, send_file
from flask_cors import CORS
from threading import Thread
from diffusers import DiffusionPipeline, DPMSolverMultistepScheduler
import torch
import matplotlib.pyplot as plt
from sentence_transformers import SentenceTransformer, util

def generate(prompt):
    prompts = ['high quality image of',
               'super realistic image of',
               'cartoony abstract image of',
               'high resolution picture of']

    for i in range(4):
        prompts[i] += prompt

    images = []
    for i in range(4):
        images.append((pipe(prompts[i], num_inference_steps=1)[0][0]))

    for i in range(4):
        images[i].save(f'generated_images/img_choice{i}.png')

def sim_score(s1, s2):
    e1 = model.encode(s1)
    e2 = model.encode(s2)
    return(util.cos_sim(e1, e2))

app = Flask(__name__)
CORS(app)
repo_id = "stabilityai/stable-diffusion-2"
pipe = DiffusionPipeline.from_pretrained(repo_id, torch_dtype=torch.float16, revision="fp16")
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
pipe = pipe.to("cuda")
model = SentenceTransformer('paraphrase-MiniLM-L6-v2').cuda()


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

if __name__ == '__main__':
    app.run(debug=True, port=5000)