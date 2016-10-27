(function ($) {
    if(!$)
        return;

    $.fn.zoom = function(){
        console.log(this);
        var $this = $(this),
            $rootwidth = $(window).width(),
            $rootheight = $(window).height(),
            $width = $this.width(),
            $height = $this.height(),
            $top = $this.offset().top,
            $left = $this.offset().left,
            transX = $rootwidth / 2 - ($left + $width / 2),
            transY = $rootheight / 2 - ($top + $height / 2),
            edge = 32;

            if (!$this.data("zoom")) {
                $this.data("zoom", "in");
                $("#topic-detail").css({
                    overflow: "visible",
                    position: "relative",
                    zIndex: 1
                });
            }else{
                $this.removeData("zoom");
            }

            var complete = function(){
                $("#topic-detail").css("overflow", "hidden");
            };

            //如果放大
            if($this.data("zoom")){
                console.log($this.offset());
                console.log($this.width() + "---" + $this.height());
                console.log($(window).width() + "---" + $(window).height());
                //以width为主
                if($width / $height >= $rootwidth / $rootheight){
                    let ratio = ($rootwidth - edge * 2) / $width;
                        console.log(ratio);
                        console.log(transX + "---" + transY);
                    $this.css({
                        transform: "translate(" + transX + "px, " + transY + "px) scale(" + ratio + ")",
                        transition: "transform 300ms",
                        zIndex: 666,
                        cursor: "-webkit-zoom-out",
                        border: "2px solid #fff"
                    });
                    addOverlay();
                }
            }else{
                if($width / $height >= $rootwidth / $rootheight){
                    $this.css({
                        transform: "translate(" + (-transX) + "px, " + (-transY) + "px) scale(1)",
                        zIndex: 0,
                        cursor: "-webkit-zoom-in"
                    }, complete)
                }
            }
    };

    function imgZoom(){

    }

    function addOverlay() {
        if($(".zoom-overlay").length){
            $(".zoom-overlay").css({
                filter: "alpha(opacity=100)",
                opacity: 1
            })
            return;
        }
        var overlay = document.createElement("div");
        overlay.className = "zoom-overlay";
        document.body.appendChild(overlay);
        $(".zoom-overlay").css({
            zIndex: 420,
            background: "#fff",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            filter: "alpha(opacity=0)",
            opacity: 0,
            "-webkit-transition": "opacity 300ms",
            "-o-transition": "opacity 300ms",
            transition: "opacity 300ms"
        })

        $(".zoom-overlay").css({
            filter: "alpha(opacity=100)",
            opacity: 1
        })
    };

    function removeOverlay(){
        $(".zoom-overlay").css({
            filter: "alpha(opacity=0)",
            opacity: 0
        })
    }

})($)
