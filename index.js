module.exports = canvasLinearLineChart;

// var elem = document.createElement('canvas');
// canvasLinearLineChart(elem, 200, [[0, 0], [20, 5]], [10, 5]);

//=elem

function canvasLinearLineChart(c, width, data, marker) {
  width = width * 2;
  var height = 30 * 2;
  var chartHeight = 14 * 2;
  c.width = width;
  c.height = height;
  c.style.width = width/2 + 'px';
  c.style.height = height/2 + 'px';

  var margin = 8;

  var ctx = c.getContext('2d');
  ctx.fillStyle = 'transparent';
  ctx.fillRect(0, 0, width, height);

  // draw 20 x axis ticks
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  for (var i = 0; i < 21; i++) {
    ctx.fillRect(xScale(i), 0, 4, chartHeight + margin);
  }

  function xScale(_) {
    return ~~(((_ / 20) * (width - margin*2)) + margin);
  }

  // draw the data line
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 10;
  ctx.moveTo(0, 18);
  ctx.lineTo(xScale(21), 18);
  ctx.stroke();

  if (marker) {
    ctx.fillStyle = '#ddd';
    ctx.fillRect(xScale(marker[0]), 0, 3, chartHeight + margin);
  }

  ctx.fillStyle = '#fff';
  ctx.lineWidth = 4;
  data.forEach(function(data, i) {
    ctx.beginPath();
    ctx.strokeStyle = '#777';
    var r = 5;
    if (data[2] && data[2].focus) {
      ctx.strokeStyle = '#ddd';
      r = 6;
    }
    if (!data[2] || !data[2].end) ctx.arc(xScale(data[0]), 18, r, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  });


  if (marker) {
    var xAnchor = xScale(marker[0]);
    var labelWidth = marker[1].length * 12;
    var labelWidthH = labelWidth / 2;

    if (xAnchor < labelWidthH) xAnchor = labelWidthH;
    if (xAnchor > (width - labelWidthH)) xAnchor = width - labelWidthH;
    ctx.fillStyle = '#ddd';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('' + marker[1], xAnchor, chartHeight + 26);
  }
}
