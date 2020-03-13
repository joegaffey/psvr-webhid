# PSVR WebHID

An experiment with using the Playstation VR headset on the web via WebXR and the experimental WebHID protocol.
Inspired by [node-psvr](https://github.com/zigen/node-psvr/blob/master/lib/psvr.js) and [webpsvr](https://webpsvr.github.io/).

## Instructions

As of 12/03/20 this requires a Chromium based browser with experimental features enabled:

`chrome://flags/#enable-experimental-web-platform-features`

As of same date it unfortunately does *not* work hosted from Glitch.com due to web feature policy restrictions :(

To try this out install [Node.js](https://nodejs.org/en/), download this project to your own machine, connect your PSVR breakout box's via its USB connection and in your terminal run: 

`node server.js`

Then launch the browser to localhost at the port number shown in the terminal.

Hit the "Go" button and when prompted select the "PSVR Sensor" device and click "Connect". 

It doesn't do much just yet - so far it just pulls some sensor data from PSVR headset and puts it up on screen. 

When I get around to adding some visuals you should connect up the PSVR HDMI also like [this](http://i.imgur.com/WNT178M.jpg) for stereoscopic display.


## Next steps

Improve sensor data precision.

Implement a 3D scene with VR probably using Three.js or Aframe.

Bind the scene's camera controls to the headset orientation.