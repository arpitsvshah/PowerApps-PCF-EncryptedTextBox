# PowerApps PCF EncryptedTextBox

This project provides a PowerApps Component Framework (PCF) control for an encrypted text box, built with React, Fluent UI, and CryptoJS. It allows you to securely capture and encrypt user input, with flexible configuration via manifest properties.

![alt text](https://arpitshah.me/wp-content/uploads/2025/09/ReactFluent-EncryptDecrypt.png)

Encrpted TextBox - [text](https://github.com/arpitsvshah/PowerApps-PCF-EncryptedTextBox)
Decrypted Textbox - [text](https://github.com/arpitsvshah/PowerApps-PCF-DecryptedTextBox)

## Features

- **React-based**: Modern, maintainable UI using React.
- **Fluent UI**: Consistent styling with Microsoft's Fluent UI components.
- **CryptoJS**: Secure AES encryption of input values.
- **Configurable**: Control properties are declared in `ControlManifest.Input.xml` for easy customization.

---

## Components

### 1. `InputControl.tsx`

A reusable React component that renders a label and an input field. It supports:

- Password masking (via `IsPassword` prop)
- Custom font size
- Disabled state
- Real-time encryption of input using a provided secret key
- Display of encrypted output, IV, and salt (for debugging/demo)

**Props:**

- `IsPassword` (boolean): If true, input is masked as a password.
- `disabled` (boolean): Disables the input.
- `fontSize` (number): Font size for label and input.
- `label` (string): Label text.
- `secretKey` (string): Secret key for encryption.
- `showOutputValues` (boolean): Show encrypted output, IV, and salt below the input.
- `onChangeEncrypted` (function): Callback to send encrypted output to parent.

### 2. `index.ts`

Implements the PCF control logic, wiring up the React component to the PowerApps framework. Handles:

- Passing manifest properties to `InputControl`
- Receiving encrypted output and exposing it via `getOutputs()`

---

## Usage Instructions

### 1. Install Dependencies

```
npm install
```

### 2. Build the PCF Control

```
npm run build
```

### 3. Start the PCF Test Harness

```
npm start
```

### 4. Add to PowerApps

- Import the built control into your PowerApps environment.
- Configure the properties in the app designer as needed.

---

## Manifest Properties (`ControlManifest.Input.xml`)

Declare the following properties in your manifest to configure the control:

- `IsPassword` (Boolean): Show input as password (default: true)
- `label` (String): Label for the input
- `disabled` (Boolean): Disable the input
- `fontSize` (Whole Number): Font size for label/input
- `secretKey` (String): Secret key for encryption
- `showOutputValues` (Boolean): Show encrypted output values
- `encryptedText` (String, Output): The encrypted value
- `OutputIV` (String, Output): The IV used for encryption
- `OutputSalt` (String, Output): The salt used for key derivation

Example snippet:

```xml
<Property name="IsPassword" display-name="Is Password" type="TwoOptions" />
<Property name="label" display-name="Label" type="SingleLine.Text" />
<Property name="disabled" display-name="Disabled" type="TwoOptions" />
<Property name="fontSize" display-name="Font Size" type="Whole.None" />
<Property name="secretKey" display-name="Secret Key" type="SingleLine.Text" />
<Property name="showOutputValues" display-name="Show Output Values" type="TwoOptions" />
<Property name="encryptedText" display-name="Encrypted Text" type="SingleLine.Text" usage="output" />
<Property name="OutputIV" display-name="Output IV" type="SingleLine.Text" usage="output" />
<Property name="OutputSalt" display-name="Output Salt" type="SingleLine.Text" usage="output" />
```

---

## How Encryption Works

- User input is encrypted in real time using AES (CBC mode) with a key derived from the provided secret key, a random salt, and IV.
- The encrypted value, IV, and salt are output for use in your app or backend.

---

## Customization

- You can further style the component by editing `InputControl.tsx` and using Fluent UI theming.
- Adjust encryption parameters in the `encrypt` function as needed for your security requirements.

---

## Dependencies

- [React 16.14.0](https://reactjs.org/)
- [Fluent UI v9](https://react.fluentui.dev/)
- [CryptoJS](https://github.com/brix/crypto-js)

## License

MIT
See [LICENSE](LICENSE) for details.
