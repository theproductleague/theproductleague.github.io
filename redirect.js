document.addEventListener('DOMContentLoaded', function() {
    var links = document.links;

    for (var i = 0, linksLength = links.length; i < linksLength; i++) {
       if (links[i].hostname === window.location.hostname) {
          links[i].pathname = links[i].pathname.replace(/\.html$/, '');
       }
    }
});

if (window.location.href.substr(-5) === ".html") {
    window.location = window.location.href.slice(0, -5);
}
