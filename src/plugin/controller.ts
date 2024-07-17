figma.showUI(__html__, { width: 240, height: 388 });

figma.ui.onmessage = msg => {
  if (msg.type === 'applyConfig') {
    const { rings, seed, gridSize, dotScale, padding, dotColor, frameColor } = msg.config;

    let frame: FrameNode | null = null;
    let isNewFrame = false;
    let resizeFrame = false;

    // Check if a suitable frame is selected
    if (figma.currentPage.selection.length > 0) {
      const selectedNode = figma.currentPage.selection[0];
      if (selectedNode.type === 'FRAME') {
        if (selectedNode.name.includes('Dots') || selectedNode.children.some(child => child.name === 'Dots')) {
          frame = selectedNode;
        } else {
          // If the selected frame doesn't have "Dots", create a new "Dots" frame inside it
          frame = figma.createFrame();
          frame.name = 'Dots';
          frame.fills = [];
          selectedNode.appendChild(frame);
          resizeFrame = true;
        }
      }
    }

    // If no suitable frame is selected, create a new one
    if (!frame) {
      frame = figma.createFrame();
      frame.name = 'Dots';
      frame.fills = [{ type: "SOLID", color: frameColor }];
      isNewFrame = true;
      resizeFrame = true;
      
      // Position the new frame 40px away from the last frame
      const frames = figma.currentPage.findAll(node => node.type === 'FRAME') as FrameNode[];
      if (frames.length > 0) {
        const lastFrame = frames.reduce((maxFrame, currentFrame) => 
          currentFrame.x + currentFrame.width > maxFrame.x + maxFrame.width ? currentFrame : maxFrame
        );
        frame.x = lastFrame.x + lastFrame.width + 40;
        frame.y = lastFrame.y;
      }
    } else {
      // Clear previous dots if updating the selected frame
      frame.children.forEach(child => {
        if (child.type === 'RECTANGLE') {
          child.remove();
        }
      });
    }

    let dots = [];

    // Function to draw a dot
    const drawDot = (x, y, size, fill) => {
      const c = figma.createRectangle();
      c.resize(size, size);
      c.cornerRadius = size / 2;
      c.x = x - size / 2;
      c.y = y - size / 2;
      c.fills = fill;

      return c;
    };

    // Generate dots
    for (let i = 0; i < rings; i++) {
      const numDots = seed * i;
      const circumference = numDots * 2 * gridSize / 2;
      const radius = circumference / (2 * Math.PI);
      const angleIncrement = (2 * Math.PI) / numDots;

      for (let j = 0; j < numDots; j++) {
        const angle = j * angleIncrement;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        const c = drawDot(x, y, gridSize / 2 * dotScale, [{ type: "SOLID", color: dotColor }]);
        frame.appendChild(c);
        dots.push(c);
      }
    }

    // Draw the central dot
    const c = drawDot(0, 0, gridSize / 2 * dotScale, [{ type: "SOLID", color: dotColor }]);
    frame.appendChild(c);
    dots.push(c);

    // Group the dots and adjust frame size if it's a new frame
    if (resizeFrame) {
      const group = figma.group(dots, frame);
      frame.resize(group.width + padding * 2, group.height + padding * 2);
      group.x = padding;
      group.y = padding;
      figma.ungroup(group);
    }

    // Select the frame
    figma.currentPage.selection = [frame];

    // Zoom into and select the frame only if it's newly created
    if (isNewFrame) {
      figma.viewport.scrollAndZoomIntoView([frame]);
    }
  }
};
