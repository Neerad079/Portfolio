import React, { useEffect, useRef } from 'react';

/**
 * CodexReveal / AsciiWaterReveal
 * Interactive 2D fluid wave equation rendered with ASCII matrix characters.
 * Replicated from https://framer.com/m/Codex-Reveal-4VqixY.js@PP1hjiE13JNQBBePrOXb
 */
export default function CodexReveal({
  fontSize = 13,
  density = 1,
  damping = 0.96,
  velocity = 0.48,
  maxOpacity = 0.35,
  enableScrollRipple = true,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let isSleeping = false;
    let idleFrames = 0;

    const colSpacing = (fontSize * 0.85) / density;
    const rowSpacing = (fontSize * 1.15) / density;

    let buffer1 = new Float32Array(0);
    let buffer2 = new Float32Array(0);

    // Pre-allocate color palette for maximum 60/120fps performance
    const alphaSteps = 14;
    const colorPalette = Array.from({ length: alphaSteps + 1 }, (_, i) => {
      const alpha = ((i / alphaSteps) * maxOpacity).toFixed(3);
      return `rgba(255, 255, 255, ${alpha})`;
    });

    const chars = ['\xb7', '.', '-', '~', '=', '+', 'x', '*', 'o'];
    const charsLen = chars.length - 1;

    function wakeUp() {
      idleFrames = 0;
      if (isSleeping) {
        isSleeping = false;
        render();
      }
    }

    function drop(x, y, radius, strength) {
      if (cols <= 0 || rows <= 0) return;
      const gridX = Math.floor(x / colSpacing);
      const gridY = Math.floor(y / rowSpacing);

      for (let r = -radius; r <= radius; r++) {
        for (let c = -radius; c <= radius; c++) {
          const nx = gridX + c;
          const ny = gridY + r;
          if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1) {
            const dist = c * c + r * r;
            const radSq = radius * radius;
            if (dist < radSq) {
              const index = ny * cols + nx;
              buffer1[index] += strength * (1 - dist / radSq);
            }
          }
        }
      }
      wakeUp();
    }

    function initBuffers() {
      const rect = container.getBoundingClientRect();
      width = canvas.width = Math.max(10, Math.floor(rect.width));
      height = canvas.height = Math.max(10, Math.floor(rect.height));

      cols = Math.ceil(width / colSpacing) + 2;
      rows = Math.ceil(height / rowSpacing) + 2;
      const size = cols * rows;

      buffer1 = new Float32Array(size);
      buffer2 = new Float32Array(size);

      // Initial soothing greeting ripple near the center of the hero
      const centerX = width * 0.45;
      const centerY = height * 0.35;
      drop(centerX, centerY, 5, 7);
      drop(centerX + 80, centerY + 40, 4, 5);

      wakeUp();
    }

    const resizeObserver = new ResizeObserver(() => initBuffers());
    resizeObserver.observe(container);
    initBuffers();

    const mouse = {
      x: -1,
      y: -1,
      prevX: -1,
      prevY: -1,
      isDown: false,
    };

    const handlePointerMove = (e) => {
      // Global window viewport coordinates matching fixed canvas
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (mouse.prevX === -1) {
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
      }

      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      const speedSq = dx * dx + dy * dy;

      if (speedSq > 2) {
        const speed = Math.sqrt(speedSq);
        const steps = Math.min(Math.floor(speed / 6), 8);
        const strength = Math.min(speed * 0.12, 3.5) * (mouse.isDown ? 1.8 : 1);
        const radius = mouse.isDown ? 3 : 2;

        for (let i = 0; i <= steps; i++) {
          const t = steps === 0 ? 0 : i / steps;
          drop(mouse.prevX + dx * t, mouse.prevY + dy * t, radius, strength);
        }
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    };

    const handlePointerDown = (e) => {
      mouse.isDown = true;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      drop(mouse.x, mouse.y, 5, 7.5);
    };

    const handlePointerUp = () => {
      mouse.isDown = false;
    };

    const handlePointerLeave = () => {
      mouse.prevX = -1;
      mouse.prevY = -1;
    };

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (!enableScrollRipple) return;
      const currentScrollY = window.scrollY;
      const scrollDiff = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      if (scrollDiff > 8) {
        const rippleX = mouse.x > 0 ? mouse.x : width * 0.5;
        const rippleY = mouse.y > 0 ? mouse.y : height * 0.4;
        const strength = Math.min(scrollDiff * 0.08, 2.2);
        drop(rippleX, rippleY, 3, strength);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    function render() {
      if (cols <= 0 || rows <= 0) return;

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      let activeCells = 0;

      // 1. WAVE EQUATION PHYSICS STEP
      for (let y = 1; y < rows - 1; y++) {
        const rowOffset = y * cols;
        for (let x = 1; x < cols - 1; x++) {
          const i = rowOffset + x;
          buffer2[i] =
            (buffer1[i - 1] + buffer1[i + 1] + buffer1[i - cols] + buffer1[i + cols]) * velocity -
            buffer2[i];
          buffer2[i] *= damping;
        }
      }

      // Buffer swap
      const temp = buffer1;
      buffer1 = buffer2;
      buffer2 = temp;

      // 2. RENDER ASCII GLYPHS
      for (let y = 1; y < rows - 1; y++) {
        const rowOffset = y * cols;
        const posY = y * rowSpacing;
        for (let x = 1; x < cols - 1; x++) {
          const i = rowOffset + x;
          const intensity = Math.abs(buffer1[i]);
          if (intensity > 0.008) {
            activeCells++;
            const posX = x * colSpacing;
            const charIndex = Math.min((intensity * 2.2) | 0, charsLen);
            const colorIndex = Math.min((intensity * 6) | 0, alphaSteps);
            ctx.fillStyle = colorPalette[colorIndex];
            ctx.fillText(chars[charIndex], posX, posY);
          }
        }
      }

      // 3. SLEEP / CPU CONSERVATION CHECK
      if (activeCells === 0 && !mouse.isDown) {
        idleFrames++;
        if (idleFrames > 30) {
          isSleeping = true;
          return;
        }
      } else {
        idleFrames = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [fontSize, density, damping, velocity, maxOpacity, enableScrollRipple]);

  return (
    <div
      ref={containerRef}
      className="codex-reveal-wrapper"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        userSelect: 'none',
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
