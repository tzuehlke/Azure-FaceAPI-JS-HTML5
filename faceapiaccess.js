var FaceAnalyse = (function() {
    var faces;
    lastrequestcompleted = true;

    function buildParameter()
    {
        return {
            // Request parameters: https://docs.microsoft.com/en-us/rest/api/faceapi/face/detect-with-stream (or https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236)
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender,emotion",
			"recognitionModel": "recognition_04"
        };
    }

    return{
        getFaces : function(){
            return faces;
        },
        analyzeSnapshot : function(canvas, apiurl, apikey){
            if(!lastrequestcompleted) return;
        
            lastrequestcompleted = false;
            
            canvas.toBlob(function(blob){
                $.ajax({
                    url: apiurl + $.param(buildParameter()),
                    beforeSend: function(xhrObj){
                        // Request headers
                        xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",apikey);
                    },
                    type: "POST",
                    processData: false,
                    data: blob
                })
                .done(function(data) {
                    faces = data;
                    lastrequestcompleted = true;
                    console.log("success - faces retrieved: " + faces.length)
                })
                .fail(function() {
                    lastrequestcompleted = true;
                    console.log("error");
                });
            })
        }
    }
})();