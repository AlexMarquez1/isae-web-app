import React, { Fragment, useRef, useState, useEffect } from "react";
import {URL_SERVICES} from "../../constants/contants.js";
import SignatureCanvas from "react-signature-canvas";

export const DigitalSignature = (props) => {

    const hideModal = props.onHide; // Event to hide modal
    const downloadFormat = props.download; // 
    const signatureRef = useRef({});
    const [imageData, setImageData] = useState(null);
    
    const saveSignature = (signature) => {
        setImageData(signature);
    }
    
    const [error, SetError] = useState(false);

    useEffect(() => {
        //console.log(imageData)
    },[imageData]);

    /**
 * Convert a base64 string in a Blob according to the data and contentType.
 * 
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

    /**
   * 
   * @param {*} cell 
   * @param {*} row 
   * @param {*} rowIndex 
   */
    const onClickDownload = () =>{
    console.log("click download format")
    console.log(props.inventarioid);
    //console.log(imageData)

    // Split the base64 string in data and contentType
    var block = imageData.split(";");
    // Get the content type of the image
    var contentType = block[0].split(":")[1];// In this case "image/gif"
    // get the real base64 content of the file
    var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

    // Convert it to a blob to upload
    var blob = b64toBlob(realData, contentType);

    let url = URL_SERVICES + `inventario/format`;

    let headers = {'Content-type': 'application/json;'}

    const dataCampos = new FormData();
    dataCampos.append("file1", blob);
    dataCampos.append("file2", blob);
    dataCampos.append("file3", blob);
    dataCampos.append("file4", blob);
    dataCampos.append("idinventario", props.inventarioid);
        
      // Request options
      let options = {
          method: 'POST',
          mode: 'cors',
          cache: 'default',
          body: dataCampos,
          header: headers
      };
    
      fetch(url, options)
      .then((response) => response.blob())
      .then(blob => {
          console.log(blob);

          if(blob.size>0){
            var bad = document.getElementById("inventario_format");
            bad.href = URL.createObjectURL(blob);
            bad.setAttribute("download", "formato_inventario.pdf");
            bad.click();
            
            saveSignature(null);
            hideModal();

            console.log("Formato creado!");
        }          
      })
      .catch((err) => console.log(err));
  }

  /**
   * 
   */
  const onClickSave = () =>{
    console.log("click save signature")
    console.log(props.inventarioid);

    // Split the base64 string in data and contentType
    var block = imageData.split(";");
    // Get the content type of the image
    var contentType = block[0].split(":")[1];// In this case "image/gif"
    // get the real base64 content of the file
    var realData = block[1].split(",")[1];// In this case "R0lGODlhPQBEAPeoAJosM...."

    // Convert it to a blob to upload
    var blob = b64toBlob(realData, contentType);

    let url = URL_SERVICES + `inventario/savesignature`;

    let headers = {'Content-type': 'application/json;'}

    const dataCampos = new FormData();
    dataCampos.append("file1", blob);
    dataCampos.append("file2", blob);
    dataCampos.append("file3", blob);
    dataCampos.append("file4", blob);
    dataCampos.append("idinventario", props.inventarioid);
        
      // Request options
      let options = {
          method: 'POST',
          mode: 'cors',
          cache: 'default',
          body: dataCampos,
          header: headers
      };
    
      fetch(url, options)
      .then((response) => response.text())
      .then(text => {
        console.log(text);
        hideModal();
        console.log("Signature Saved!");
      })
      .catch((err) => console.log(err));
  }

    return(
        <Fragment>
            <div className="container">

                <div className="row">                

                <div className="col-sm-12">
                    <SignatureCanvas
                    canvasProps={{
                        width: 500, height: 200, 
                        style:{'border':'1px solid #000000'}
                      }}
                    minWidth={2}
                    maxWidth={3}
                    penColor='#0362a2'
                    ref={signatureRef}
                    onEnd={ () => (
                        saveSignature(signatureRef.current.getTrimmedCanvas().toDataURL('image/jpg'))
                        )}
                    onBegin={() => {SetError(false)}} />

                    <pre>
                        {
                        error ? <div>La firma es obligatoria</div> : false
                        }
                    </pre>
                </div>
                </div>

                <div className="row">
                    <div className="col-sm-6">
                        <button onClick={() => {
                            signatureRef.current.clear();
                            SetError(false);
                            saveSignature(null);
                        }}> Clear </button>

                        <button onClick={() => {
                        signatureRef.current.clear();
                        imageData !== null ? 
                            downloadFormat ? onClickDownload(null) : onClickSave()
                                : SetError(true);
                        }}> {downloadFormat ? "Generar" : "Guardar"} </button>
                    </div>
                </div>
                
            </div>
            
        </Fragment>
    )
}