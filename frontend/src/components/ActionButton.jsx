import {
  Group,
  Button,
} from "@mantine/core";

import {
  IconPlus,
  IconDownload,
} from "@tabler/icons-react";

import HeaderWithSearch from "./HeaderWithSearch";

const ActionButton = ({
  title,
  pagination,
  setPagination,

  showSearch = true,
  showAdd = false,
  showDownload = false,

  addLabel = "Add",
  downloadLabel = "Download",

  onAdd,
  onDownload,
}) => {
  return (
    <Group
      justify="space-between"
      mb="lg"
    >
      <HeaderWithSearch
        title={title}
        pagination={pagination}
        setPagination={setPagination}
        withSearch={showSearch}
      />

      <Group>
        {showDownload && (
          <Button
            variant="outline"
            leftSection={
              <IconDownload size={16} />
            }
            onClick={onDownload}
          >
            {downloadLabel}
          </Button>
        )}

        {showAdd && (
          <Button
            leftSection={
              <IconPlus size={16} />
            }
            onClick={onAdd}
          >
            {addLabel}
          </Button>
        )}
      </Group>
    </Group>
  );
};

export default ActionButton;