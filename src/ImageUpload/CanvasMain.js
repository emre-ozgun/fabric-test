import React from "react";
import './CanvasMain.css';
import { fabric } from "fabric";
import CanvasParameters from "../Parameters/CanvasParameters";

const CanvasMain = () => {

  const [canvas, setCanvas] = React.useState("");
  const [doesCanvasHaveImg, setDoesCanvasHaveImg] = React.useState(null);
  const [imageDimensions, setImageDimensions] = React.useState(null);

  // TODO: implement user-selected font to textboxes...
  const [cardFont, setCardFont] = React.useState(null);

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        const img = new fabric.Image(image);
        setDoesCanvasHaveImg(true);
        setImageDimensions({ width: img.width, height: img.height });
        img.hasControls = false;
        img.hasBorders = false;
        img.lockMovementX = true;
        img.lockMovementY = true;
        img.hoverCursor = 'default';
        canvas.add(img);
        canvas.sendToBack(img);
        canvas.sendBackwards(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        // canvas.add(img).send.setActiveObject(img).renderAll();
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAddFormParameterToCanvas = (formParameterText, visible = true) => {
    const textObj = new fabric.Text(formParameterText, {
      textBackgroundColor: '#fff',
      fill: '#000',
      visible
    });
    canvas.add(textObj);
    canvas.bringToFront(textObj);
    canvas.bringForward(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();
  }

  const saveCanvasToDB = () => {
    const canvasSavedAsJSON = canvas.toJSON();
    localStorage.setItem('canvas', JSON.stringify(canvasSavedAsJSON));
    // API REQUEST -> redux -> save canvas to DB as JSON ! - Currently simulating with LS
  }

  // Load canvas from LocalStorage...
  const loadCanvasFromLS = () => {
    let canvasFromDB = localStorage.getItem('canvas');
    if (canvasFromDB !== undefined && canvasFromDB !== null) {
      const canvasParsed = JSON.parse(canvasFromDB);
      const newObjects = canvasParsed.objects.map(obj => {
        if(obj.type === 'image') {
          return {
            ...obj,
            hasControls: false,
            hasBorders: false,
            lockMovementX: true,
            lockMovementY: true,
            hoverCursor: 'default'
          }
        }
        return obj
      })
      const composedLoadedCanvas = {...canvasParsed, objects: newObjects};
      const imgFromLoadedCanvas = canvasParsed.objects.find(obj => obj.type === 'image');
      setImageDimensions({ width: imgFromLoadedCanvas.width, height: imgFromLoadedCanvas.height });
      setDoesCanvasHaveImg(true);
      canvas.loadFromJSON(composedLoadedCanvas);
      return true;
    }
    return false;
  }

  React.useLayoutEffect(() => {
    const initCanvas = () =>
      new fabric.Canvas("c", {
        height: 800,
        width: 800,
        preserveObjectStacking: true
      });
    setCanvas(initCanvas());
  }, []);

  React.useEffect(() => {
    if (canvas !== '' && doesCanvasHaveImg) {
      const unloadCallback = (event) => {
        event.preventDefault();
        event.returnValue = "";
        return "";
      };

      window.addEventListener("beforeunload", unloadCallback);
      return () => window.removeEventListener("beforeunload", unloadCallback);
    }
  }, [canvas, doesCanvasHaveImg]);


  React.useEffect(() => {
    if (imageDimensions && imageDimensions.width && imageDimensions.height) {
      canvas.setDimensions({ width: imageDimensions.width, height: imageDimensions.height });
    }
  }, [imageDimensions, canvas]);

  console.log(canvas);


  return (
    <main>
      <header>
        <h1>Fabric Image Test</h1>
        <br />
        <input
          type="file"
          name="myImage"
          accept="image/*"
          onChange={(e) => handleImageUpload(e)}
        />
        <button onClick={() => {
          if (canvas !== '') {
            window.location.reload();
          }
        }}>Reset</button>
      </header>
      <br />
      <section className="canvas-area">
        <canvas id="c" />
        <CanvasParameters handleAddFormParameterToCanvas={handleAddFormParameterToCanvas} />
      </section>
      <button onClick={() => saveCanvasToDB()}>Save Canvas</button>
      <button onClick={() => {
        localStorage.clear();
      }}>Clear canvas from LS</button>
      <section style={{ borderTop: "2px solid red" }}>
        <button onClick={() => loadCanvasFromLS()}>load canvas from LS</button>
      </section>
    </main>
  );
};

export default CanvasMain;
