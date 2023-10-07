from flask import Flask, send_file
from flask_cors import CORS
from threading import Thread
from diffusers import DiffusionPipeline, DPMSolverMultistepScheduler
import torch
import matplotlib.pyplot as plt
from sentence_transformers import SentenceTransformer, util

def generate(prompt):
    newPrompt = "generate me a high quality image of"
    newPrompt += prompt

    images = []
    for _ in range(4):
        images.append((pipe(newPrompt, num_inference_steps=25)[0][0]))

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

if __name__ == '__main__':
    app.run(debug=True, port=5000)