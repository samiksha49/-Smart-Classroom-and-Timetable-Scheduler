import { Select } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

import { getMasterDropdownList } from "../services/master/master.service";

const SelectWithAPI = ({
    tableName,
    labelField,
    valueField = "id",
    value,
    setValue,
    label,
    placeholder,
    required = false,
    error,
    filterKey,
    filterValue,
}) => {

    const { data, isLoading } = useQuery({
        queryKey: [
            "master-select",
            tableName,
        ],

        queryFn: () =>
            getMasterDropdownList(
                tableName
            ),
    });

    let filteredData =
        data?.data || [];

    if (
        filterKey &&
        filterValue
    ) {

        filteredData =
            filteredData.filter(
                (item) =>
                    item[filterKey] ===
                    Number(filterValue)
            );
    }

    const options =
        filteredData.map(
            (item) => ({
                value: String(
                    item[valueField]
                ),

                label: String(
                    item[labelField]
                ),
            })
        );

    return (
        <Select
            label={label}
            placeholder={placeholder}
            value={
                value
                    ? String(value)
                    : null
            }
            data={options}
            searchable
            clearable
            withAsterisk={required}
            onChange={setValue}
            error={error}
            disabled={
                isLoading ||
                (filterKey &&
                    !filterValue)
            }
        />
    );
};

export default SelectWithAPI;