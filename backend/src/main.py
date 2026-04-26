from fastapi import FastAPI

app = FastAPI()


@app.get("/server/healthcheck")
def get_healthcheck():
    return {"message": "all good"}

