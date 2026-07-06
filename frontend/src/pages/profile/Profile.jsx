import {
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

import useAuthStore from "../../store/auth.store";
import { COLORS } from "../../constants/colors";
import { changePassword } from "../../services/auth/auth.service";
import FormBuilderModal from "../../components/FormBuilderModal";

const PASSWORD_FIELDS = [
  {
    name: "current_password",
    label: "Current Password",
    type: "password",
    required: true,
  },
  {
    name: "new_password",
    label: "New Password",
    type: "password",
    required: true,
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    type: "password",
    required: true,
  },
];

const ProfilePage = () => {
  const [opened, setOpened] = useState(false);

  const [passwordData, setPasswordData] = useState({});

  const auth = useAuthStore(
    (state) => state.auth
  );

  const user = auth?.user;

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (response) => {
      notifications.show({
        title: "Success",
        message: response?.data?.message || "Password changed successfully",
        color: "green",
      });
      setOpened(false);
      setPasswordData({});
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error?.response?.data?.message || "Failed to change password",
        color: "red",
      });
    },
  });

  const handleChangePassword = (values) => {
    if (values.new_password !== values.confirm_password) {
      notifications.show({
        title: "Error",
        message: "Passwords do not match",
        color: "red",
      });
      return;
    }

    changePasswordMutation.mutate({
      current_password: values.current_password,
      new_password: values.new_password,
    });
  };

  if (!user) {
    return (
      <Text>
        No profile data available
      </Text>
    );
  }

  return (
    <Box
      p="xl"
      style={{
        width: "100%",
      }}
    >
      <Paper
        shadow="xs"
        radius="md"
        withBorder
        p="xl"
        maw={900}
        mx="auto"
      >
        {/* Title */}
        <Title
          order={2}
          mb="xl"
          c={COLORS.primary}
        >
          My Profile
        </Title>

        {/* Profile Header */}
        <Group mb="xl">
          <Avatar
            size={80}
            radius="xl"
            color="blue"
          >
            {user?.name?.charAt(0)}
          </Avatar>

          <Stack gap={0}>
            <Text
              fw={700}
              size="xl"
            >
              {user?.name}
            </Text>

            <Text
              size="sm"
              c="dimmed"
            >
              {user?.role}
            </Text>

            <Text
              size="sm"
              c="dimmed"
            >
              {user?.email}
            </Text>
          </Stack>
        </Group>

        <Divider mb="xl" />

        {/* Details */}
        <Stack gap="md">
          <Group justify="space-between">
            <Text c="dimmed">
              User ID
            </Text>

            <Text fw={600}>
              {user?.id}
            </Text>
          </Group>

          <Divider />

          <Group justify="space-between">
            <Text c="dimmed">
              Name
            </Text>

            <Text fw={600}>
              {user?.name}
            </Text>
          </Group>

          <Divider />

          <Group justify="space-between">
            <Text c="dimmed">
              Email
            </Text>

            <Text fw={600}>
              {user?.email}
            </Text>
          </Group>

          <Divider />

          <Group justify="space-between">
            <Text c="dimmed">
              Role
            </Text>

            <Text fw={600}>
              {user?.role}
            </Text>
          </Group>

          <Group
            justify="flex-end"
            mt="xl"
          >
            <Button
              color={COLORS.primary}
              onClick={() =>
                setOpened(true)
              }
            >
              Change Password
            </Button>
          </Group>

          <FormBuilderModal
            opened={opened}
            onClose={() => {
              setOpened(false)
              setPasswordData({})
            }}
            title="Change Password"
            mode="edit"
            fields={PASSWORD_FIELDS}
            values={passwordData}
            setValues={setPasswordData}
            loading={
              changePasswordMutation.isPending
            }
            onSave={
              handleChangePassword
            }
          />
        </Stack>
      </Paper>
    </Box>
  );
};

export default ProfilePage;