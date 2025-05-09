import { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';

function WordCloud({ words }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!words || words.length === 0) return;

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, [words]);

  useEffect(() => {
    if (!words || words.length === 0 || dimensions.width === 0) return;

    // Clear previous SVG
    d3.select(svgRef.current).selectAll("*").remove();

    // Filter and prepare words
    const processedWords = words
      .filter(word => word.text.length > 2)
      .map(word => ({
        text: word.text,
        size: 10 + (word.value * 6) // Scale font size
      }));

    // Cap to 100 words for performance
    const topWords = processedWords.slice(0, 100);

    // Create word cloud layout
    const layout = cloud()
      .size([dimensions.width, dimensions.height])
      .words(topWords)
      .padding(5)
      .rotate(() => 0)
      .font("Arial")
      .fontSize(d => d.size)
      .on("end", draw);

    layout.start();

    // Draw the word cloud
    function draw(words) {
      const svg = d3.select(svgRef.current)
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
        .append("g")
        .attr("transform", `translate(${dimensions.width / 2},${dimensions.height / 2})`);

      // Color scale
      const color = d3.scaleOrdinal(d3.schemeCategory10);

      svg.selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", d => `${d.size}px`)
        .style("font-family", "Arial")
        .style("fill", (d, i) => color(i % 10))
        .attr("text-anchor", "middle")
        .attr("transform", d => `translate(${d.x},${d.y}) rotate(${d.rotate})`)
        .text(d => d.text);
    }
  }, [words, dimensions]);

  if (!words || words.length === 0) {
    return <div className="text-center py-12 text-gray-500">No word data available</div>;
  }

  return (
    <div ref={containerRef} className="w-full h-full" style={{ minHeight: "300px" }}>
      <svg ref={svgRef} width="100%" height="100%"></svg>
    </div>
  );
}

export default WordCloud;