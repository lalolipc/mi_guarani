from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB = "guarani.db"

def get_db():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    return con

@app.route("/api/estudiantes", methods=["GET"])
def get_estudiantes():
    con = get_db()
    cur = con.cursor()
    cur.execute("SELECT * FROM estudiantes")
    data = [dict(row) for row in cur.fetchall()]
    con.close()
    return jsonify(data)

@app.route("/api/estudiantes", methods=["POST"])
def add_estudiante():
    data = request.json
    con = get_db()
    cur = con.cursor()
    cur.execute("INSERT INTO estudiantes (nombre, dni) VALUES (?, ?)", (data["nombre"], data["dni"]))
    con.commit()
    con.close()
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    app.run(debug=True)