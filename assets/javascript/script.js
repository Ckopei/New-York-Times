$(document).ready(function () {
    $("#search").on("click", function (event) {
        $("#articles").empty()
        event.preventDefault()
        // console.log($(this).val())
        console.log("You clicked me")
        var articleCounter = 0;
        var startYear = "begin_date=" + $("#start-year").val() + "0101"
        var endYear = "&end_date=" + $("#end-year").val() + "0101"
        var searchTerm = $("#search-term").val()
        var numArticles = $("#records-num").val()
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?"+startYear+endYear+"+&q="+ searchTerm+"&sort=newest&api-key=SGPpcmFpXFAh90XV4TR2KvprCYlJA6Sy"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            for (var i = 0; i < numArticles; i++) {
                console.log(response)
                var articleURL = response.response.docs[i].web_url;
                articleCounter ++;
                var headlines = response.response.docs[i].headline.main;
                var wellSection = $("<div>");
                var a = $("<a>");
                wellSection.attr("class", "counter");
                wellSection.attr("data-article-" + articleCounter);
                a.attr("href", articleURL)
                a.attr("target", "_blank")
                a.text(headlines);
                wellSection.append(a);
                $("#articles").append(wellSection);
            }
        })

    });

});

