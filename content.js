// Listen for the inversion event from the popup
window.addEventListener("GeoGebraInversion", (event) => {
    const { center, circle } = event.detail;
  
    const inversionCircle = circle || `Circle(${center}, 1)`;
  
    ggbApplet.evalCommand("showPreImages = False");
    ggbApplet.evalCommand("SetConditionToShowObject(showPreImages, True)");
  
    const allObjects = ggbApplet.getAllObjectNames();
    const points = ggbApplet.getAllObjectNames("Point");
  
    points.forEach((point) => {
        const name = ggbApplet.evalCommandGetLabels(`Reflect(${point}, ${inversionCircle})`)
        ggbApplet.deleteObject(name)
        ggbApplet.evalCommand(
            `${name} = If(${point} != ${center}, If(Distance(${point}, ${center}) != Radius(${inversionCircle}), Reflect(${point}, ${inversionCircle})))`
        );
        ggbApplet.evalCommand(
            `If(${point} != ${center}, If(Distance(${point}, ${center}) != Radius(${inversionCircle}), SetConditionToShowObject(${point}, showPreImages)))`
        );
    });
  
    allObjects.forEach((object) => {
        if (!points.includes(object)) {
            const name = ggbApplet.evalCommandGetLabels(`Reflect(${object}, ${inversionCircle})`)
            ggbApplet.deleteObject(name)
            ggbApplet.evalCommand(
            `${name} = If(${object} != ${inversionCircle}, Reflect(${object}, ${inversionCircle}))`
            );
            ggbApplet.evalCommand(
            `If(${object} != ${inversionCircle}, SetConditionToShowObject(${object}, showPreImages))`
            );
        }
    });
    
    const intervalId = setInterval(() => {
        const button = document.querySelector("button.dialogTextButton");
        
        if (!button) {
            clearInterval(intervalId); // Stop the interval when button is not found
        } else {
            button.click(); // Click the button
        }
    }, 100); // Delay of 0.1 second between clicks

    alert("Inversion completed!");
});