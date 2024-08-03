import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type THSelectProps = {
  label: string;
  name: string;
  defaultValues?: string;
  isLoading?: boolean;
  disable?: boolean;
  options: {
    value: string;
    label: string;
    disable?: boolean;
  }[];
};

const PHSelect = ({
  defaultValues,
  name,
  label,
  options,
  isLoading,
  disable,
}: THSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            style={{ width: "100%" }}
            {...field}
            defaultValue={defaultValues}
            options={options}
            size="large"
            loading={isLoading}
            disabled={disable}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
