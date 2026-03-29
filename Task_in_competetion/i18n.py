from locales.ua import translations as ua
from locales.en import translations as en

current_lang = "ua"

def t(key: str):
    if current_lang == "ua":
        return ua.get(key, key)
    else:
        return en.get(key, key)
