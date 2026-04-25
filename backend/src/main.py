from fastapi import FastAPI
from src.routers.auth import router as auth_router
from src.routers.user import router as user_router

app = FastAPI()
app.include_router(auth_router)
app.include_router(user_router)

@app.get("/server/healthcheck")
def get_healthcheck():
    return {"message": "all good"}