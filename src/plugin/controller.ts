figma.showUI(__html__, { width: 300, height: 400 });

figma.ui.onmessage = msg => {
  if (msg.type === 'applyConfig') {
    const { rings, seed, gridSize, dotScale, padding } = msg.config;

    // Clear previous dots
    figma.currentPage.children.forEach(child => {
      if (child.type === 'FRAME' && child.name === 'Dots') {
        child.remove();
      }
    });

    let frame: FrameNode = figma.createFrame();
    frame.name = 'Dots';
    frame.fills = [{
      type: "SOLID",
      color: { r: .05, g: .05, b: .05 }
    }];

    let dots = [];

    var drawDot = function(x, y, size, fill) {
      var c = figma.createEllipse();
      c.resize(size, size);
      c.x = x - size / 2;
      c.y = y - size / 2;
      c.fills = fill;

      return c;
    };

    for (let i = 0; i < rings; i++) {
      const numDots = seed * i;
      const circumference = numDots * 2 * gridSize / 2;
      const radius = circumference / (2 * Math.PI);
      const angleIncrement = (2 * Math.PI) / numDots;

      for (let j = 0; j < numDots; j++) {
        const angle = j * angleIncrement;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        let c = drawDot(x, y, gridSize / 2 * dotScale, [{
          type: "SOLID",
          color: { r: .3, g: .3, b: .3 }
        }]);

        frame.appendChild(c);
        dots.push(c);
      }
    }

    let c = drawDot(0, 0, gridSize / 2 * dotScale, [{
      type: "SOLID",
      color: { r: .3, g: .3, b: .3 }
    }]);
    frame.appendChild(c);
    dots.push(c);

    let group = figma.group(dots, frame);
    frame.resize(group.width + padding * 2, group.height + padding * 2);
    group.x = padding;
    group.y = padding;

    figma.ungroup(group);
  }
};