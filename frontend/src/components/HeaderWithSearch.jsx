import { Group, Text, TextInput } from "@mantine/core";
import { useDebouncedCallback } from "@mantine/hooks";
import {
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";

const HeaderWithSearch = ({
  pagination,
  title,
  setPagination,
  withSearch = true,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(pagination?.search || "");
  }, [pagination?.search]);

  const changeValue = useDebouncedCallback(
    (searchValue) => {
      setPagination({
        ...pagination,
        page: 1,
        search: searchValue,
      });
    },
    500
  );

  const handleChange = (searchValue) => {
    setValue(searchValue);
    changeValue(searchValue);
  };

  return (
    <Group>
      <Text
        size="28px"
        fw={700}
      >
        {title}
      </Text>

      {withSearch && (
        <TextInput
          w={250}
          leftSection={
            <IconSearch size={16} />
          }
          placeholder="Search..."
          value={value}
          onChange={(e) =>
            handleChange(
              e.target.value
            )
          }
          rightSection={
            value ? (
              <IconX
                size={14}
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  setValue("");
                  setPagination({
                    ...pagination,
                    page: 1,
                    search: "",
                  });
                }}
              />
            ) : null
          }
        />
      )}
    </Group>
  );
};

export default HeaderWithSearch;