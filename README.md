CanvasCraft

A simple and powerful React-based drawing application.

CanvasCraft is a lightweight React paint application that allows users to draw with brushes, create shapes, erase, undo/redo, switch themes, and save artwork as images.
It includes a clean UI, dark mode, toolbar actions, and responsive canvas sizing.

🚀 Features
🖌️ Drawing Tools

Brush

Eraser

Line

Rectangle

Circle

🧰 Advanced Controls

Undo / Redo

Clear Canvas

Change Color

Change Brush Size

Save as PNG / JPG

🌗 Dark Mode

Fully theme-supported (background, toolbar, canvas area)

💾 Export

Download your drawing in PNG or JPEG format.

📂 Project Structure
src/
├── App.jsx
├── Canvas.jsx
├── Menu.jsx
├── Main.jsx
├── App.css
├── styles.css
└── assets/ (optional icons or images)

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/canvascraft.git
cd canvascraft

2. Install dependencies
npm install

3. Run the development server
npm run dev

4. Build for production
npm run build

🧠 How It Works

Canvas.jsx
Handles all drawing logic including brush, shapes, undo/redo, and canvas rendering.

Menu.jsx
Provides UI controls for tools, colors, size, theme switch, and save.

App.jsx
Connects states (tool, size, color) with canvas actions using ref.

styles.css
Contains global styling and dark/light theme styles.

🎯 Future Improvements

Mobile drawing support

Layers

Text tool

Shape fill option

Custom brushes

📝 License

This project is free and open-source. You may modify and use it freely.
