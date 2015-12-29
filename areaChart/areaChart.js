function areaChart() {
    var margin = {
            top: 20,
            right: 20,
            bottom: 30,
            left: 50
        },
        width = 960 - margin.right - margin.left,
        height = 480 - margin.top - margin.bottom,
        xValue = function(d) {
            return d.x;
        },
        yValue = function(d) {
            return d.y;
        },
        yAxisLabel = "";

    function chart(selection) {
        selection.each(function(data) {
            d3.select(this).select("svg").remove();

            var x = d3.time.scale()
                .range([0, width])
                .domain(d3.extent(data, function(d) {
                    return xValue(d);
                }));

            var y = d3.scale.linear()
                .range([height, 0])
                .domain([0, d3.max(data, function(d) {
                    return yValue(d);
                })]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient("bottom");

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient("left");

            var area = d3.svg.area()
                .x(function(d) {
                    return x(xValue(d));
                })
                .y0(height)
                .y1(function(d) {
                    return y(yValue(d));
                });

            var svg = d3.select(this).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            svg.append("path")
                .datum(data)
                .attr("class", "area")
                .attr("d", area);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text(yAxisLabel);
        });
    }

    chart.margin = function(value) {
        if (!arguments.length) return margin;
        margin = value;
        return chart;
    };

    chart.width = function(value) {
        if (!arguments.length) return width + margin.right + margin.left;
        width = value - margin.right - margin.left;
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height - margin.top - margin.bottom;
        height = value - margin.top - margin.bottom;
        return chart;
    };

    chart.xValue = function(value) {
        if (!arguments.length) return xValue;
        xValue = value;
        return chart;
    };

    chart.yValue = function(value) {
        if (!arguments.length) return yValue;
        yValue = value;
        return chart;
    };

    chart.yAxisLabel = function(value) {
        if (!arguments.length) return yAxisLabel;
        yAxisLabel = value;
        return chart;
    };

    return chart;
}