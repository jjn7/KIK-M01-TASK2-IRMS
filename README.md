## 📁 Project Structure

```
project-folder/
├── app.py                      # Flask backend
├── recipes.db                  # SQLite database
├── templates/                 
│   ├── index.html
│   ├── login.html
│   ├── profile.html
│   ├── profile_saved.html
│   ├── recipe.html
│   ├── recipes.html
│   └── add_edit_recipe.html
├── static/
│   ├── style.css
│   ├── script.js
│   ├── addEditRecipe.js
│   ├── adjustIngredients.js
│   ├── header.html
│   ├── footer.html
│   └── images/
│       └── logo.png, ...
```

---

## 🚀 Getting Started

### 1. Clone or Download the Repository

```bash
git clone https://github.com/jjn7/KIK-webdev-task2.git
cd "KIK Course\KIK-webdev-task2\TASK 2.2 - PART 2\IRMS"
```
Or download ZIP and extract.

### 2. Install Python Requirements

No external dependencies needed other than Python 3.
If you don’t have Flask:
```bash
pip install flask

// for Python3 + 

pip3 install flask
```

### 3. Run the Application

```bash
python app.py
```

Visit: [http://localhost:5000](http://localhost:5000)



## 🧠 Features
- LocalStorage + SQLite hybrid
- Dynamic recipe editing and preview
- Profile with saved recipes
- Responsive layout with filters and search
- Image upload preview
- Dynamic header/footer loading

---

## 📦 Syncing Local to Server
- Use the **"Sync to Server"** button on `recipes.html` to upload all `localStorage` recipes to the SQLite DB

---

## ⚠️ Notes
- Flask runs in development mode
- All data is stored locally unless explicitly synced to the backend
- You can wipe `recipes.db` to reset the backend