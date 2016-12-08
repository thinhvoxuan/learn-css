var PRODUCT_RATIO = 4/6;
var defaultColor = '#b05f5f';


$(function(){
    var cropper  = null;
    var updateZoomTo = function (valueZoom) {
        if (cropper) {
            cropper.zoomTo(valueZoom / 100);
            $('#sliderZoomValue').val(valueZoom)
        }
    }
    var updateRotateTo = function (valueRotate) {
        if (cropper) {
            cropper.rotateTo(valueRotate);
            $('#slideRotateValue').val(valueRotate);
        }
    }
    var triggerChangeRotate = function (valueRotate) {
        sliderRotate.setValue(valueRotate);
        updateRotateTo(valueRotate);
    }
    var triggerChangeZoom = function (valueZoom) {
        sliderZoom.setValue(valueZoom);
        updateZoomTo(valueZoom);
    }
    var sliderZoom = new Slider('#zoomImage');
    sliderZoom.on("slide", updateZoomTo);
    var sliderRotate = new Slider('#rotateImage');
    sliderRotate.on("slide", updateRotateTo);


    $('#slideRotateValue').keyup( function() {
        let value = $(this).val();
        if ( parseInt(value) < 0) value = 0;
        if (parseInt(value) > 360) value = 360
        triggerChangeRotate(value);
    })

    $('#sliderZoomValue').keyup(function() {
        let value = $(this).val();
        if ( parseInt(value) < minZoom) value = minZoom;
        if (parseInt(value) > 3000) value = 3000;
        triggerChangeZoom(value);
    })

    var triggerResizeEvent = function() {
        window.dispatchEvent(new Event('resize'));
        fullSelectCropBox();
    }

    var fullSelectCropBox = function () {
        if (cropper) {
            cropper.setCropBoxData({left: 0, top: 0})
            cropper.setCropBoxData(cropper.getContainerData())
            let canvasData = cropper.getCanvasData()
            let cropData = cropper.getCropBoxData()
            let widthRatio = cropData.width / canvasData.naturalWidth;
            let heightRatio = cropData.height / canvasData.naturalHeight;
            minZoom = Math.round(Math.max(widthRatio, heightRatio).toFixed(1) * 100);
            sliderZoom.setAttribute('min', minZoom)
            triggerChangeRotate(0);
            triggerChangeZoom(minZoom)
        }
    }

    let minZoom = 50;

    function loadImage() {
        imageOrientation();
        var image = document.getElementById('image-preview');
        if (!cropper) {
            cropper = new Cropper(image, {
                viewMode: 3,
                dragMode: 'move',
                background: false,
                minCropBoxWidth: '100%',
                minCropBoxHeight: '100%',
                cropBoxMovable: false,
                cropBoxResizable: false,
                toggleDragModeOnDblclick: false,
                zoomOnTouch: false,
                zoomOnWheel: false,
                checkCrossOrigin: false,
                crop: function(e) {
                    console.log(e.detail.x, e.detail.y, e.detail.width, e.detail.height, e.detail.rotate, e.detail.scaleX, e.detail.scaleY);
                },
                ready: function() {
                    fullSelectCropBox();
                }
            });
        } else {
            cropper.replace($(image).attr('src'))
        }
    }

    let imageOrientation = function () {
        let ratio = PRODUCT_RATIO;
        let value = $('input[name="Orientation"]:checked').val();
        let editCenter = $('.edit-center');

        let width;
        let height;
        if (value == 'Horizontal') {
            width = editCenter.width();
            height =  width * ratio;
        } else {
            height = editCenter.width();
            width = height * ratio;
        }
        let editReview = $('.edit-review');
        editReview.css('height', height);
        editReview.css('width', width);
        triggerResizeEvent()
        $('.option-content label:contains('+ value +')').click();
    }

    $('input[name="Orientation"]').change(function() {
        imageOrientation()
    })

    $('.option-content input[type=radio]').change(function() {
        let idInput = $(this).attr('id');
        let label = $("label[for=" + idInput + "]");
        if (label) {
            let html = $(label).html();
            if (html.indexOf("Vertical") != -1) {
                $("label[for=Orientation_Vertical]").click()
            }
            if (html.indexOf("Horizontal") != -1) {
                $("label[for=Orientation_Horizontal]").click()
            }
        }
    })

    loadImage();
})

$(function(){
    var colorPicker = $('#color-picker');
    colorPicker.colorpickerplus();
    colorPicker.on('changeColor', function(e, color){
        if(color==null) {
            $('.color-fill-icon', $(this)).addClass('colorpicker-color');
            $('.edit-review').css('border-color', '');
        } else {
            $('.color-fill-icon', $(this)).removeClass('colorpicker-color');
            $('.color-fill-icon', $(this)).css('background-color', color);
            $('.edit-review').css('border-color', color);
        }
    });
});


