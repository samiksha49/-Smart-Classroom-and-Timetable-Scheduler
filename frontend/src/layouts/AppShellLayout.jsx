import {
  AppShell,
  Burger,
  Group,
  Text,
  ScrollArea,
  Menu,
  Avatar,
  UnstyledButton,
  NavLink,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  IconChevronDown,
  IconChevronRight,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";

import { useState } from "react";

import useAuthStore from "../store/auth.store";
import { SIDEBAR_CONFIG } from "../constants/sidebar.config";
import { COLORS } from "../constants/colors";

const AppShellLayout = () => {
  const [opened, { toggle }] =
    useDisclosure();

  const [openedMenus, setOpenedMenus] =
    useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const auth = useAuthStore(
    (state) => state.auth
  );

  const clearAuth = useAuthStore(
    (state) => state.clearAuth
  );

  const role =
    auth?.user?.role?.toUpperCase();

  const menus =
    SIDEBAR_CONFIG[role] || [];

  const toggleMenu = (label) => {
    setOpenedMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/", {
      replace: true,
    });
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 260,
        breakpoint: "sm",
        collapsed: {
          mobile: !opened,
        },
      }}
    >
      {/* HEADER */}
      <AppShell.Header
        style={{
          background: COLORS.white,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <Group
          h="100%"
          px="md"
          justify="space-between"
        >
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            <Text
              fw={700}
              size="lg"
              c={COLORS.primary}
            >
              College Leave Management
            </Text>
          </Group>

          {/* PROFILE MENU */}
          <Menu
            withArrow
            shadow="md"
            width={180}
            position="bottom-end"
          >
            <Menu.Target>
              <UnstyledButton>
                <Group gap="xs">
                  <Avatar
                    radius="xl"
                    color="blue"
                  >
                    {auth?.user?.name?.charAt(
                      0
                    )}
                  </Avatar>

                  <div>
                    <Text
                      size="sm"
                      fw={600}
                    >
                      {auth?.user?.name}
                    </Text>

                    <Text
                      size="xs"
                      c="dimmed"
                    >
                      {auth?.user?.role}
                    </Text>
                  </div>

                  <IconChevronDown
                    size={16}
                  />
                </Group>
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <IconUser size={16} />
                }
                onClick={() =>
                  navigate("/profile")
                }
              >
                Profile
              </Menu.Item>

              <Menu.Divider />

              <Menu.Item
                color="red"
                leftSection={
                  <IconLogout size={16} />
                }
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </AppShell.Header>

      {/* SIDEBAR */}
      <AppShell.Navbar
        p="sm"
        style={{
          background:
            COLORS.white,
          borderRight: `1px solid ${COLORS.border}`,
        }}
      >
        <ScrollArea h="100%">
          {menus.map((menu) => {
            const Icon = menu.icon;

            const isChildActive =
              menu.children?.some(
                (child) =>
                  location.pathname === child.path
              ) || false;

            if (menu.children) {
              return (
                <NavLink
                  key={menu.label}
                  label={menu.label}
                  leftSection={<Icon size={18} />}
                  active={isChildActive}
                  opened={
                    openedMenus[menu.label] ??
                    isChildActive
                  }
                  rightSection={
                    <IconChevronRight
                      size={16}
                      style={{
                        transform:
                          (openedMenus[menu.label] ??
                            isChildActive)
                            ? "rotate(90deg)"
                            : "rotate(0deg)",
                        transition: "0.2s",
                      }}
                    />
                  }
                  onClick={() =>
                    toggleMenu(menu.label)
                  }
                  childrenOffset={28}
                  mb={4}
                >
                  {menu.children.map(
                    (child) => {
                      const ChildIcon =
                        child.icon;

                      return (
                        <NavLink
                          key={child.path}
                          label={child.label}
                          leftSection={
                            <ChildIcon size={16} />
                          }
                          active={
                            location.pathname ===
                            child.path
                          }
                          onClick={() =>
                            navigate(child.path)
                          }
                          color={COLORS.primary}
                        />
                      );
                    }
                  )}
                </NavLink>
              );
            }

            return (
              <NavLink
                key={menu.path}
                label={menu.label}
                leftSection={<Icon size={18} />}
                active={
                  location.pathname === menu.path
                }
                onClick={() =>
                  navigate(menu.path)
                }
                color={COLORS.primary}
                mb={4}
              />
            );
          })}
        </ScrollArea>
      </AppShell.Navbar>

      {/* MAIN CONTENT */}
      <AppShell.Main
        style={{
          background:
            COLORS.background,
          minHeight:
            "100vh",
        }}
      >
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppShellLayout;