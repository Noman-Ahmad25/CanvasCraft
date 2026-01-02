# CanvasCraft 🎨  
A React-based canvas drawing web application built with modern frontend tools.

## 📌 Overview
CanvasCraft is a fully responsive web application that allows users to draw freely on a canvas, create shapes, erase content, and export drawings as images. The project focuses on hands-on usage of React, HTML Canvas APIs, and modern frontend tooling.

---

## ✨ Features
- Freehand drawing on canvas  
- Shape drawing support  
- Eraser tool  
- Undo / Redo functionality  
- Dark / Light theme toggle  
- Image export functionality  
- Responsive design with mobile touch gesture support  

---

## 🛠 Tech Stack
- **Frontend:** React 19, Vite  
- **Canvas:** HTML Canvas API  
- **Styling:** CSS3  
- **Deployment:** Vercel  

---

## 🚀 Live Demo
👉 https://canvas-craft-nu.vercel.app/

---

## ⚙️ Installation & Setup


### 📂 Project Structure
```
src/
├── App.jsx
├── Canvas.jsx
├── Menu.jsx
├── Main.jsx
├── App.css
├── styles.css
└── assets/ (optional icons or images)
```

### 1. Clone the repository
```
git clone https://github.com/your-username/canvascraft.git
cd canvascraft
```
### 2. Install dependencies

```
npm install
```

### 3. Run the development server

```
npm run dev
```

### 4. Build for production
 ```
npm run build
```

---
## 🧠 How It Works

### Canvas.jsx
Handles all drawing logic including brush, shapes, undo/redo, and canvas rendering.

### Menu.jsx
Provides UI controls for tools, colors, size, theme switch, and save.

### App.jsx
Connects states (tool, size, color) with canvas actions using ref.

### styles.css
Contains global styling and dark/light theme styles.

--- 
## 📚 What I Learned

- Managing canvas state and redraw logic in React

- Implementing undo/redo functionality for canvas-based applications

- Handling mobile touch events for better usability

- Structuring a React project using Vite

- Deploying frontend applications using Vercel
---

## 🎯 Future Improvements

- Mobile drawing support
- Layers
- Text tool
- Shape fill option
- Custom brushes

 ---

## 📝 License
This project is free and open-source. You may modify and use it freely.

