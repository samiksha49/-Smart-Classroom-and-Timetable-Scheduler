import {
    Modal,
    Grid,
    TextInput,
    Select,
    Button,
    Group,
    NumberInput,
    FileInput,
    PasswordInput,
    Switch,
} from "@mantine/core";

import { DateInput } from "@mantine/dates";
import { useState } from "react";
import SelectWithAPI from "./SelectWithAPI";

const FormBuilderModal = ({
    opened,
    onClose,
    title,
    mode = "add",
    fields = [],
    values = {},
    setValues,
    onSave,
    loading = false,
}) => {
    const [errors, setErrors] = useState({});
    const handleChange = (
        field,
        value
    ) => {
        setValues((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const validateForm = () => {
        const validationErrors = {};

        fields.forEach((field) => {
            if (
                field.required &&
                (
                    values[field.name] === undefined ||
                    values[field.name] === null ||
                    values[field.name] === ""
                )
            ) {
                validationErrors[field.name] =
                    `${field.label} is required`;
            }
        });

        setErrors(validationErrors);

        return (
            Object.keys(validationErrors)
                .length === 0
        );
    };

    const renderField = (field) => {
        switch (field.type) {
            case "password":
                return (
                    <PasswordInput
                        label={field.label}
                        placeholder={`Enter ${field.label}`}
                        value={
                            values[field.name] || ""
                        }
                        error={
                            errors?.[field.name]
                        }
                        required={
                            field.required
                        }
                        onChange={(e) =>
                            handleChange(
                                field.name,
                                e.target.value
                            )
                        }
                    />
                );

            case "select":

                if (field.tableName) {
                    return (
                        <SelectWithAPI
                            tableName={field.tableName}
                            labelField={field.labelField}
                            valueField={field.valueField}
                            label={field.label}
                            placeholder={`Select ${field.label}`}
                            value={values[field.name]}
                            required={field.required}
                            error={errors[field.name]}
                            filterKey={field.filterKey}
                            filterValue={
                                field.filterValue
                                    ? values[field.filterValue]
                                    : null
                            }
                            setValue={(value) =>
                                handleChange(
                                    field.name,
                                    value
                                )
                            }
                        />
                    );
                }

                return (
                    <Select
                        label={field.label}
                        placeholder={`Select ${field.label}`}
                        data={field.options || []}
                        value={values[field.name] || ""}
                        onChange={(value) =>
                            handleChange(
                                field.name,
                                value
                            )
                        }
                        error={errors[field.name]}
                        searchable
                    />
                );

            case "date":
                return (
                    <DateInput
                        label={field.label}
                        placeholder={`Select ${field.label}`}
                        value={
                            values[field.name] ||
                            null
                        }
                        clearable
                        error={errors[field.name]}
                        onChange={(value) =>
                            handleChange(
                                field.name,
                                value
                            )
                        }
                    />
                );

            case "number":
                return (
                    <NumberInput
                        label={field.label}
                        placeholder={`Enter ${field.label}`}
                        value={
                            values[field.name]
                        }
                        onChange={(value) =>
                            handleChange(
                                field.name,
                                value
                            )
                        }
                        error={errors[field.name]}
                        hideControls
                    />
                );

            case "file":
                return (
                    <FileInput
                        label={field.label}
                        placeholder={`Upload ${field.label}`}
                        value={
                            values[field.name] ||
                            null
                        }
                        onChange={(file) =>
                            handleChange(
                                field.name,
                                file
                            )
                        }
                        error={errors[field.name]}
                        clearable
                    />
                );

            case "email":
                return (
                    <TextInput
                        type="email"
                        label={field.label}
                        placeholder={`Enter ${field.label}`}
                        value={
                            values[field.name] || ""
                        }
                        onChange={(e) =>
                            handleChange(
                                field.name,
                                e.target.value
                            )
                        }
                        error={errors[field.name]}
                    />
                );

            case "switch":
                return (
                    <Group mt={28}>
                        <Switch
                            label={field.label}
                            checked={values[field.name] || false}
                            onLabel="ON"
                            offLabel="OFF"
                            size="md"
                            required={field.required}
                            onChange={(event) =>
                                handleChange(
                                    field.name,
                                    event.currentTarget.checked
                                )
                            }
                        />
                    </Group>
                );

            case "text":
            default:
                return (
                    <TextInput
                        label={field.label}
                        placeholder={`Enter ${field.label}`}
                        value={
                            values[field.name] || ""
                        }
                        error={errors[field.name]}
                        onChange={(e) =>
                            handleChange(
                                field.name,
                                e.target.value
                            )
                        }
                    />
                );
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={title}
            size="lg"
            centered
            closeOnClickOutside={false}
        >
            <Grid>
                {fields.map((field) => (
                    <Grid.Col
                        span={field.fullWidth ? 12 : 6}
                        key={field.name}
                    >
                        {renderField(field)}
                    </Grid.Col>
                ))}
            </Grid>

            <Group
                justify="flex-end"
                mt="xl"
            >
                <Button
                    variant="outline"
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    loading={loading}
                    onClick={() => {
                        if (validateForm()) {
                            onSave(values);
                        }
                    }}
                >
                    {mode === "edit"
                        ? "Update"
                        : "Save"}
                </Button>
            </Group>
        </Modal>
    );
};

export default FormBuilderModal;