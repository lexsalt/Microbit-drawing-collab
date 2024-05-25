# microbit-web-monitor

This folder contains the code and resources for the microbit-web-monitor project.

## Description

The microbit-web-monitor project is a web-based monitoring system for micro:bit devices. It allows you to remotely monitor and control micro:bit devices using a web browser.

## Features

- Real-time monitoring of micro:bit sensors and inputs
- Remote control of micro:bit outputs and actuators
- Web-based interface for easy access and usage

## Installation

# On the microbit:
serial.onDataReceived(serial.readString(), function () {
    serial.writeLine("received")
})
input.onButtonPressed(Button.A, function () {
    // serial.writeLine("a")
    serial.writeLine("a")
})
// input.onButtonPressed(Button.AB, function () {
// serial.writeLine("d")
// })
// input.onButtonPressed(Button.B, function () {
// serial.writeLine("b")
// })
// input.onGesture(Gesture.Shake, function () {
// serial.writeLine("s")
// })
// input.onLogoEvent(TouchButtonEvent.Pressed, function () {
// serial.writeLine("l")
// })
// input.calibrateCompass()
serial.redirectToUSB()
// basic.pause(200)
// basic.pause(200)
// serial.writeLine("t" + input.temperature())
// basic.pause(200)
// serial.writeLine("g" + input.lightLevel())
// basic.pause(200)
// serial.writeLine("x" + input.acceleration(Dimension.X))
// basic.pause(200)
// serial.writeLine("y" + input.acceleration(Dimension.Y))
// basic.pause(200)
// serial.writeLine("z" + input.acceleration(Dimension.Z))
// basic.pause(200)
// serial.writeLine("u" + input.soundLevel())
basic.forever(function () {
    // serial.writeLine("a")
    serial.writeLine("p" + input.rotation(Rotation.Pitch))
    // basic.pause(200)
    // serial.writeLine("w" + input.compassHeading())
    // basic.pause(200)
    serial.writeLine("r" + input.rotation(Rotation.Roll))
})

# On the computer

1. Clone this repository to your local machine.
2. Install the required dependencies by running `npm install`.
4. Configure port following the instructions on index.js.
4. Start the server by running `npm start`.

## Usage

1. Open your web browser and navigate to the URL where the server is running.
2. Follow the on-screen instructions to connect and monitor your micro:bit devices.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow the guidelines in [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](./LICENSE).

## Contact

If you have any questions or suggestions, please feel free to contact us at [email@example.com](mailto:email@example.com).
