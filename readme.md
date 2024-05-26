# microbit-web-monitor

This folder contains the code and resources for the microbit-web-monitor project.

## Description

The microbit-web-monitor project is a web-based monitoring system for micro:bit devices. It allows you to remotely monitor and control micro:bit devices using a web browser.

## Features

- Real-time monitoring of micro:bit sensors and inputs
- Remote control of micro:bit outputs and actuators
- Web-based interface for easy access and usage

## Installation

## On the microbit receiver:
radio.onReceivedValue(function (name, value) {
    serial.writeLine("" + name + value)
})
radio.setGroup(99)
serial.redirectToUSB()

## On the microbit Emitter 1:
input.onButtonPressed(Button.A, function () {
    radio.sendValue("a", 0)
})
radio.setGroup(99)
basic.forever(function () {
    radio.sendValue("p", input.rotation(Rotation.Pitch))
    basic.pause(100)
    radio.sendValue("r", input.rotation(Rotation.Roll))
    basic.pause(100)
})

## On the microbit Emitter 2:
input.onButtonPressed(Button.A, function () {
    radio.sendValue("a", 0)
})
radio.setGroup(99)
basic.forever(function () {
    radio.sendValue("q", input.rotation(Rotation.Pitch))
    basic.pause(100)
    radio.sendValue("s", input.rotation(Rotation.Roll))
    basic.pause(100)
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
