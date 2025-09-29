import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';

function BudgetCharts({ mode = 'both' }) {
  const d3Ref = useRef(null);
  const pieRef = useRef(null);

  useEffect(() => {
    axios.get('/budget')
      .then((res) => {
        const items = res.data.myBudget || [];
        const labels = items.map(i => i.title);
        const values = items.map(i => i.budget);
        const colors = ['#ffcd56','#ff6384','#36a2eb','#fd6b19','#4bc0c0','#9966ff','#c9cbcf'];


        if (pieRef.current) {
          if (pieRef.current._chartInstance) {
            try { pieRef.current._chartInstance.destroy(); } catch (e) {}
          }
          const ctx = pieRef.current.getContext('2d');
          const chartInstance = new Chart(ctx, {
            type: 'pie',
            data: { labels, datasets: [{ data: values, backgroundColor: colors }] },
            options: { responsive: true, maintainAspectRatio: false }
          });
          pieRef.current._chartInstance = chartInstance;
        }

        const container = d3Ref.current;
        d3.select(container).selectAll('*').remove();
        const margin = { top: 10, right: 10, bottom: 40, left: 50 };
        const totalWidth = 500;
        const totalHeight = 260; 
        const width = totalWidth - margin.left - margin.right;
        const height = totalHeight - margin.top - margin.bottom;

        const svg = d3.select(container)
          .append('svg')
          .attr('width', totalWidth)
          .attr('height', totalHeight)
          .attr('viewBox', `0 0 ${totalWidth} ${totalHeight}`)
          .attr('preserveAspectRatio', 'xMidYMid meet');

        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand().domain(labels).range([0, width]).padding(0.1);
        const y = d3.scaleLinear().domain([0, d3.max(values) || 0]).nice().range([height, 0]);

        g.selectAll('rect')
          .data(items)
          .enter()
          .append('rect')
          .attr('x', d => x(d.title))
          .attr('y', d => y(d.budget))
          .attr('width', x.bandwidth())
          .attr('height', d => height - y(d.budget))
          .attr('fill', 'steelblue');

        g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x));
        g.append('g').call(d3.axisLeft(y));
      })
      .catch(err => {
        console.error('Failed to load budget', err);
      });
  }, []);

  return (
    <div className="budget-charts">
      <h2>Budget Charts</h2>

    

      <div className={`chart-container pie ${mode==='pie' || mode==='both' ? 'large' : ''} ${mode==='bar' && mode!=='both' ? 'hidden' : ''}`}>
        <canvas ref={pieRef} aria-label="Budget Pie Chart" role="img" />
      </div>

      <div className={`chart-container bar ${mode==='bar' || mode==='both' ? 'large' : ''} ${mode==='pie' && mode!=='both' ? 'hidden' : ''}`}>
        <div ref={d3Ref} />
      </div>
    </div>
  );
}

export default BudgetCharts;
