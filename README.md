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


---

## Notes
- Flask runs in development mode
- All data is stored locally unless explicitly synced to the backend