import {
  Table,
  Pagination,
  Group,
  Badge,
  Text,
  Loader,
  Center,
} from "@mantine/core";

const CommonTable = ({
  columns = [],
  data = [],
  page,
  setPage,
  totalPages = 1,
  loading = false,
  onRowClick = () => { },
}) => {
  const renderCell = (
    row,
    column,
    index
  ) => {
    const value = row[column.accessor];
    switch (column.type) {

      case "serial":
        return (
          (((page ?? 1) - 1) * 10) +
          index +
          1
        );

      case "badge":
        return (
          <Badge
            variant="filled"
            color={
              column.badges?.[value]
                ?.color || "gray"
            }
          >
            {column.badges?.[value]
              ?.label || value}
          </Badge>
        );

      default:
        return row[column.accessor];
    }
  };

  return (
    <>
      <Table
        striped
        highlightOnHover
        withTableBorder
      >
        <Table.Thead>
          <Table.Tr >
            {columns.map(
              (column) => (
                <Table.Th
                  key={
                    column.accessor
                  }
                >
                  {
                    column.title
                  }
                </Table.Th>
              )
            )}
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {loading ? (
            <Table.Tr>
              <Table.Td
                colSpan={
                  columns.length
                }
              >
                <Center
                  py="xl"
                >
                  <Loader />
                </Center>
              </Table.Td>
            </Table.Tr>
          ) : data.length ===
            0 ? (
            <Table.Tr>
              <Table.Td
                colSpan={
                  columns.length
                }
              >
                <Center
                  py="xl"
                >
                  <Text
                    c="dimmed"
                  >
                    No records found
                  </Text>
                </Center>
              </Table.Td>
            </Table.Tr>
          ) : (
            data.map(
              (
                row,
                index
              ) => (
                <Table.Tr
                  key={
                    index
                  }
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    onRowClick?.(row)
                  }
                >
                  {columns.map(
                    (
                      column
                    ) => (
                      <Table.Td
                        key={
                          column.accessor
                        }
                      >
                        {renderCell(
                          row,
                          column,
                          index
                        )}
                      </Table.Td>
                    )
                  )}
                </Table.Tr>
              )
            )
          )}
        </Table.Tbody>
      </Table>

      {!loading && (
        <Group
          justify="flex-end"
          mt="md"
        >
          <Pagination
            total={
              totalPages
            }
            value={page}
            onChange={
              setPage
            }
          />
        </Group>
      )}
    </>
  );
};

export default CommonTable;