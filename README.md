# Trunchet Tiles

## Overview
Trunchet Tiles is an interactive web-based application that allows users to generate customizable geometric patterns using either square or circular tiles. The app is highly adaptable for both desktop and mobile devices, ensuring an optimal user experience across different platforms. The project combines creative coding techniques with user-friendly controls, offering a fun and intuitive interface for experimenting with tile-based designs.

---

## Features

### Tile Customization
- **Canvas Size Adjustment**: Dynamically resize the canvas to fit user preferences or screen dimensions.
- **Tile Size Adjustment**: Adjust the size of each individual tile for fine-grained control over the layout.
- **Shape Selection**: Toggle between circular and square tile patterns.

### Interactive Controls
- **Knob Controls**:
  - Allows precise adjustment of canvas and tile sizes.
  - Real-time visual feedback as users drag the knob.
- **Responsive Layout**:
  - Separate controls for mobile and desktop environments.
  - Mobile users can easily toggle between settings for canvas size, tile size, and tile shape.
- **Download Sketch**:
  - Export the current pattern as a high-quality PNG file.

### Geometric Design
- Randomized tile patterns with unique types (e.g., triangles for square tiles or arcs for circular tiles).
- Colorful designs with a palette of predefined colors.
- Smooth animations and interactions using p5.js for rendering.

### Responsive Design
- **Desktop Controls**: Simpler and more intuitive UI with dedicated sections for each functionality.
- **Mobile Controls**: Adaptive layout with toggleable menus to maximize usability on smaller screens.

---

## Technologies Used
- **Frontend Framework**: React.js
- **Graphics Library**: p5.js
- **State Management**: React Hooks
- **Responsive Design**: `react-responsive`
- **Styling**: Tailwind CSS

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/trunchet-tiles.git
   cd trunchet-tiles
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`.

---

## Usage
1. Use the knob controls to adjust canvas size and tile size.
2. Toggle between circular and square tiles for different patterns.
3. Experiment with various combinations and observe real-time updates.
4. Download your creations as PNG files for future use.

---

## Roadmap
- Add additional tile shapes.
- Include the ability to define custom color palettes.
- Implement saving/loading feature for design configurations.
- Enhance performance for larger canvas sizes.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Acknowledgments
Special thanks to the contributors and libraries that made this project possible:
- **p5.js** for its powerful and flexible drawing capabilities.
- **React** for managing the UI efficiently.
- **Tailwind CSS** for rapid styling.

---

Feel free to explore and contribute to Trunchet Tiles!
