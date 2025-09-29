import * as React from "react";
import * as CryptoJs from "crypto-js";
import { makeStyles, useId, Input, Label } from "@fluentui/react-components";

export interface IInputControlProps {
  IsPassword?: boolean;
  disabled?: boolean;
  fontSize?: number; // Font size for tree node labels (in px)
  label: string;
  secretKey: string;
  showOutputValues: boolean;
  onChangeEncrypted?: (encrypted: IOutputControlProps) => void;
}

export interface IOutputControlProps {
  encryptedText?: string;
  outputIV?: string;
  outputSalt?: string;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    width: "100%",
    maxWidth: "100%",
  },
  fullWidth: {
    width: "100%",
    boxSizing: "border-box",
  },
});

export const InputControl: React.FC<IInputControlProps> = ({
  IsPassword,
  disabled,
  fontSize,
  label,
  secretKey,
  showOutputValues,
  onChangeEncrypted,
}) => {
  const inputId = useId("input");
  const styles = useStyles();
  const [inputValue, setInputValue] = React.useState("");
  const [output, setOutput] = React.useState<IOutputControlProps>({
    encryptedText: "",
    outputIV: "",
    outputSalt: "",
  });

  const encrypt = (value: string): IOutputControlProps => {
    if (!value) return { encryptedText: "", outputIV: "", outputSalt: "" };
    const salt: CryptoJs.lib.WordArray = CryptoJs.lib.WordArray.random(128 / 8);
    const iv: CryptoJs.lib.WordArray = CryptoJs.lib.WordArray.random(128 / 8);
    const key: CryptoJs.lib.WordArray = CryptoJs.PBKDF2(secretKey, salt, {
      keySize: 256 / 32,
      iterations: 1000,
    });
    const encrypted: string = CryptoJs.AES.encrypt(value, key, {
      iv: iv,
      padding: CryptoJs.pad.Pkcs7,
      mode: CryptoJs.mode.CBC,
    }).ciphertext.toString(CryptoJs.enc.Base64);

    return {
      encryptedText: encrypted,
      outputIV: iv.toString(CryptoJs.enc.Base64),
      outputSalt: salt.toString(CryptoJs.enc.Base64),
    };
  };

  return (
    <div className={styles.root}>
      <Label
        htmlFor={inputId}
        style={fontSize ? { fontSize: fontSize } : undefined}
        disabled={disabled}
        className={styles.fullWidth}
      >
        {label}
      </Label>
      <Input
        id={inputId}
        disabled={disabled}
        type={IsPassword ? "password" : "text"}
        value={inputValue}
        className={styles.fullWidth}
        style={fontSize ? { fontSize: fontSize } : undefined}
        onChange={(e) => {
          const newValue = e.target.value;
          setInputValue(newValue);
          const encryptedOutput = encrypt(newValue);
          setOutput(encryptedOutput);
          if (onChangeEncrypted) {
            onChangeEncrypted(encryptedOutput);
          }
        }}
      />
      {showOutputValues && (
        <div
          style={{
            marginTop: "12px",
            fontSize: fontSize ?? "12px",
            wordBreak: "break-all",
          }}
        >
          <div>
            <strong>Encrypted Text:</strong> {output.encryptedText}
          </div>
          <div>
            <strong>IV:</strong> {output.outputIV}
          </div>
          <div>
            <strong>Salt:</strong> {output.outputSalt}
          </div>
        </div>
      )}
    </div>
  );
};
