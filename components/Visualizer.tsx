import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface VisualizerProps {
  isPlaying: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ isPlaying }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  // Fixed: Expected 1 arguments, but got 0. Added undefined as an initial value to satisfy TypeScript.
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 200;
    const height = 40;
    const barCount = 12;
    const barWidth = 6;
    const barPadding = 4;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const bars = svg.selectAll('rect')
      .data(d3.range(barCount))
      .enter()
      .append('rect')
      .attr('x', (d) => d * (barWidth + barPadding))
      .attr('width', barWidth)
      .attr('fill', '#3b82f6')
      .attr('rx', 3);

    const animate = () => {
      if (isPlaying) {
        bars.transition()
          .duration(300)
          .attr('y', () => height - Math.random() * height)
          .attr('height', () => Math.random() * height)
          .attr('fill', () => `hsl(${200 + Math.random() * 40}, 80%, 60%)`);
      } else {
        bars.transition()
          .duration(300)
          .attr('y', height - 4)
          .attr('height', 4)
          .attr('fill', '#3f3f46');
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying]);

  return <svg ref={svgRef} className="opacity-80" />;
};

export default Visualizer;