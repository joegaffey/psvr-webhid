document.addEventListener("DOMContentLoaded", async () => {
  
  const minusButton = document.getElementById("minus");
  const plusButton = document.getElementById("plus");
  const muteButton = document.getElementById("mute");
  
  const consentButton = document.getElementById("allow");
  consentButton.addEventListener("click", async () => {
    try {
      await navigator.hid
        .requestDevice({ filters: [{ vendorId: 1356, productId: 2479, productName: "PS VR Sensor" }] })
        .then(device => {
          device.open().then(() => {
            console.log("Opened HID device");
            device.addEventListener("inputreport", handleInputReport);
          });
        });
    } catch (e) {
      console.log(e);
      alert(e.message);
    }
  });

  let yaw = 0, roll = 0, pitch = 0;
  const yawElem = document.querySelector("#yaw");
  const pitchElem = document.querySelector("#pitch");
  const rollElem = document.querySelector("#roll");

  function handleInputReport(ir) {
    // if(!window.sample)
    //   window.sample = ir; 
      
    // console.log(`${ir.data.buffer[0]} ${ir.data.buffer[0]} ${ir.data.buffer[2]} ${ir.data.buffer[3]}`);
    // Not quite there yet
    minusButton.style.borderColor = (ir.data.getInt8(0) > 0) ?  'red' : 'black';
    plusButton.style.borderColor = (ir.data.getInt8(7) > 0) ?  'red' : 'black';
    muteButton.style.borderColor = (ir.data.getInt8(10) > 0) ?  'red' : 'black';

    //Values taken from https://github.com/webpsvr/webpsvr.github.io/blob/master/lib/psvr.js
    let yawGyro0 = ir.data.getInt8(21),
      pitchGyro0 = ir.data.getInt8(23),
      rollGyro0 = ir.data.getInt8(25),
      yawGyro1 = ir.data.getInt8(37),
      pitchGyro1 = ir.data.getInt8(39),
      rollGyro1 = ir.data.getInt8(41);

    yaw += yawGyro0 + yawGyro1 + 1 ;
    roll += rollGyro0 + rollGyro1;
    pitch += pitchGyro0 + pitchGyro1;
  }

  setInterval(() => update(), 200);

  function update() {
    yawElem.innerHTML = Math.round(yaw * 0.00025 * 1000) / 1000;
    pitchElem.innerHTML = Math.round(pitch * 0.0025 * 1000) / 1000;
    rollElem.innerHTML = Math.round(roll * 0.00025 * 1000) / 1000;
  }
});
