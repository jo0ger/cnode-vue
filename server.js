var fs = require("fs"),
    path = require("path"),
    express = require("express"),
    favicon = require('serve-favicon');

var tpl = fs.readFileSync("./index.html", "utf-8"),
    createBundleRenderer = require("vue-server-renderer").createBundleRenderer,
    server = express();

var html = (function(){
    var tag = "{{APP}}",
        index = tpl.indexOf(tag);
    return {
        front: tpl.slice(0, index),
        behind: tpl.slice(index + tag.length)
    };
})();

server.use("/dist", express.static(path.resolve(__dirname, "./dist")));
server.use(favicon(path.resolve(__dirname, './src/assets/logo.png')));

var renderer = createBundleRenderer(fs.readFileSync(
    path.resolve(__dirname, "./dist/server-build.js")
), "utf-8");

server.get("*", function(req, res){
    let firstChunk = true,
        context = {
            url: req.url
        },
        renderStream = renderer.renderToStream(context);

    renderStream.on("data", function(chunk){
        if(firstChunk){
            res.write(html.front);
            firstChunk = false;
        }
        res.write(chunk);
    });

    renderStream.on("end", function(){
        res.end(html.behind);
    });

    renderStream.on("error", function(error){
        res.status(500).end("Server Error, Status : 500");
        console.error("render error: " + req.url);
        console.error("error: " + error);
    });

})

var port = process.env.PORT || 5555;
server.listen(port, function(){
    console.log("Server is listening at locahost:" + port);
})
