import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInput = {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
};

const PHInput = ({ type, name, label, placeholder, disabled }: TInput) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Input
              placeholder={placeholder && placeholder}
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
