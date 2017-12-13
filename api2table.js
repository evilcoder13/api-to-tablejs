function GenerateTable(url, element, genTbl = false, renderDataTables = false) {
    $.getJSON(url, function(data) {
        if (data == null || data.length <= 0)
            return;
        if (!(data.constructor === Array))
            for (i in Object.keys(data)) {
                if (data[Object.keys(data)[i]].constructor === Array) {
                    data = data[Object.keys(data)[i]];
                    break;
                } else if (i == Object.keys(data).length) return;
            }
        var columns = Object.getOwnPropertyNames(data[0]);
        var table = null;
        if (genTbl) {
            table = $("<table></table>");
        } else
            table = element;
        //Generate header:
        var headerHtml = "";
        headerHtml += "<thead>\n<tr>\n";
        for (i in columns)
            headerHtml += "<th>" + columns[i] + "</th>\n";
        headerHtml += "</tr>\n</thead>\n";
        table.append(headerHtml);
        //End Generate header
        //Generate rows:
        var bodyHtml = "";
        bodyHtml += "<tbody>\n";
        $(data).each(function(k, v) {
            console.log(v);
            bodyHtml += "<tr>";
            for (i in columns)
                bodyHtml += "<td>" + v[columns[i]] + "</td>\n";
            bodyHtml += "</tr>";
        });
        bodyHtml += "</tbody>\n";
        table.append(bodyHtml);
        //End Generate rows
        if (genTbl)
            element.append(table);
        else
            element.replaceWith(table);
        if (renderDataTables)
            element.dataTable();
    });
}