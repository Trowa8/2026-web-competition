from nicegui import ui

def button(text: str, on_click=None, type: str = "primary"):
    color_map = {
        "primary": "bg-blue-500 hover:bg-blue-700 text-white",
        "secondary": "bg-gray-500 hover:bg-gray-700 text-white",
        "danger": "bg-red-500 hover:bg-red-700 text-white"
    }

    btn_class = f"px-4 py-2 rounded font-bold {color_map.get(type, color_map['primary'])}"

    return ui.button(text, on_click=on_click).classes(btn_class)
