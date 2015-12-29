function barChart() {
    var width = 970,
        barHeight = 20,
        labelOffset = 5,
        value = function(d) {
            return d.value;
        },
        label = function(d) {
            return d.label;
        };

    function chart(selection) {
        selection.each(function(data) {

            var x = d3.scale.linear()
                .domain([0, d3.max(data, function(d) {
                    return value(d);
                })])
                .range([0, width]);

            var svg = d3.select(this).append("svg")
                .attr("width", width)
                .attr("height", barHeight * data.length);

            var bar = svg.selectAll("g")
                .data(data)
                .enter().append("g")
                .attr("transform", function(d, i) {
                    return "translate(0," + i * barHeight + ")";
                });

            // Bar
            bar.append("rect")
                .attr("width", function(d) {
                    return x(value(d));
                })
                .attr("height", barHeight - 1);

            // Label
            bar.append("text")
                .attr("class", "label")
                .attr("x", function(d) {
                    return labelOffset;
                })
                .attr("y", barHeight / 2)
                .attr("dy", ".35em")
                .text(function(d) {
                    return label(d);
                });

            // Count
            bar.append("text")
                .attr("class", "count")
                .attr("x", function(d) {
                    return x(value(d)) - labelOffset;
                })
                .attr("y", barHeight / 2)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function(d) {
                    return value(d);
                });

            bar.each(function() {
                var rect = d3.select(this).select("rect"),
                    label = d3.select(this).select("text.label"),
                    count = d3.select(this).select("text.count"),
                    barLength = rect.attr("width"),
                    labelLength = label.node().getComputedTextLength(),
                    countLength = count.node().getComputedTextLength();

                if (labelLength > barLength) {
                    label.attr("x", function(d) {
                        return x(value(d)) + labelOffset;
                    });
                    // http://stackoverflow.com/questions/24293880/svg-why-does-external-css-override-inline-style-for-text
                    // TODO: allow use of custom color
                    label.style("fill", "grey");
                }

                if (countLength + 2 * labelOffset > barLength) {
                    count.remove();
                }
            });
        });
    }

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;
        return chart;
    };

    chart.value = function(_value) {
        if (!arguments.length) return value;
        value = _value;
        return chart;
    };

    chart.label = function(value) {
        if (!arguments.length) return label;
        label = value;
        return chart;
    };

    return chart;
}