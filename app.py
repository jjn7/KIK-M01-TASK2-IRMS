from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import os

app = Flask(__name__, static_folder='static', template_folder='templates')
DB_PATH = os.path.join(os.path.dirname(__file__), 'recipes.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS recipes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            cookingTime INTEGER,
            ingredients TEXT,
            steps TEXT,
            image TEXT,
            createdAt TEXT
        )
    ''')
    conn.commit()
    conn.close()

@app.route("/api/recipes", methods=["GET"])
def get_all_recipes():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT * FROM recipes")
    rows = c.fetchall()
    conn.close()
    recipes = [
        {
            "id": row[0],
            "title": row[1],
            "cookingTime": row[2],
            "ingredients": eval(row[3]),
            "steps": eval(row[4]),
            "image": row[5],
            "createdAt": row[6]
        }
        for row in rows
    ]
    return jsonify(recipes)

@app.route("/api/recipes", methods=["POST"])
def add_recipe():
    data = request.get_json()
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        INSERT INTO recipes (title, cookingTime, ingredients, steps, image, createdAt)
        VALUES (?, ?, ?, ?, ?, ?)
    ''', (
        data.get("title"),
        data.get("cookingTime"),
        str(data.get("ingredients")),
        str(data.get("steps")),
        data.get("image"),
        data.get("createdAt")
    ))
    conn.commit()
    conn.close()
    return jsonify({"message": "Recipe added"}), 201

@app.route("/api/recipes/<int:recipe_id>", methods=["DELETE"])
def delete_recipe(recipe_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("DELETE FROM recipes WHERE id=?", (recipe_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Deleted"}), 200

@app.route("/api/recipes/<int:recipe_id>", methods=["PUT"])
def update_recipe(recipe_id):
    data = request.get_json()
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("""
        UPDATE recipes SET title=?, cookingTime=?, ingredients=?, steps=?, image=?, createdAt=?
        WHERE id=?
    """, (
        data.get("title"),
        data.get("cookingTime"),
        str(data.get("ingredients")),
        str(data.get("steps")),
        data.get("image"),
        data.get("createdAt"),
        recipe_id
    ))
    conn.commit()
    conn.close()
    return jsonify({"message": "Recipe updated"})

@app.route("/api/recipes/<int:recipe_id>", methods=["GET"])
def get_recipe(recipe_id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT * FROM recipes WHERE id=?", (recipe_id,))
    row = c.fetchone()
    conn.close()
    if row:
        recipe = {
            "id": row[0],
            "title": row[1],
            "cookingTime": row[2],
            "ingredients": eval(row[3]),
            "steps": eval(row[4]),
            "image": row[5],
            "createdAt": row[6]
        }
        return jsonify(recipe)
    return jsonify({"error": "Recipe not found"}), 404

@app.route("/")
def root():
    return send_from_directory("templates", "index.html")

@app.route("/<path:filename>")
def static_files(filename):
    if filename.endswith(".html"):
        return send_from_directory("templates", filename)
    return send_from_directory("static", filename)

if __name__ == "__main__":
    init_db()
    app.run(debug=True)