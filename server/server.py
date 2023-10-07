from flask import Flask
from flask_cors import CORS
from threading import Thread
from diffusers import DiffusionPipeline, DPMSolverMultistepScheduler
import torch
import matplotlib.pyplot as plt

def generate(prompt):
    repo_id = "stabilityai/stable-diffusion-2"
    pipe = DiffusionPipeline.from_pretrained(repo_id, torch_dtype=torch.float16, revision="fp16")
    pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
    pipe = pipe.to("cuda")

    prompt += "generate me a high quality image of"

    images = []
    for _ in range(4):
        images.append((pipe(prompt, num_inference_steps=25)[0][0]))

    for i in range(4):
        images[i].save(f'generated_images/img_choice{i}.png')

app = Flask(__name__)
CORS(app)

@app.route("/play/<string:a>")
def create(a):
    generate(a)
    return {"generated_images/"}

if __name__ == '__main__':
    app.run(debug=True)