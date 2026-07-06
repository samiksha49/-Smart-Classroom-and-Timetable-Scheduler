import {
    AppShell,
    Burger,
    Group,
    NavLink,
    Text,
    Avatar,
    Stack,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import {
    IconHome,
    IconCalendarTime,
    IconUsers,
    IconSettings,
    IconLogout,
} from "@tabler/icons-react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { COLORS } from "../constants/colors";

import useAuthStore from "../store/auth.store";

const AppLayout = () => {
    const [opened, { toggle }] = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();

    const auth = useAuthStore(
        (state) => state.auth
    );

    const clearAuth = useAuthStore(
        (state) => state.clearAuth
    );

    const menus = [
        {
            label: "Dashboard",
            icon: IconHome,
            path: "/",
        },
        {
            label: "Leave Management",
            icon: IconCalendarTime,
            path: "/leave-management",
        },
        {
            label: "Users",
            icon: IconUsers,
            path: "/users",
        },
        {
            label: "Settings",
            icon: IconSettings,
            path: "/settings",
        },
    ];

    return (
        <AppShell
            header={{ height: 70 }}
            navbar={{
                width: 260,
                breakpoint: "sm",
                collapsed: {
                    mobile: !opened,
                },
            }}
            padding="lg"
        >
            {/* HEADER */}
            <AppShell.Header
                style={{
                    background: COLORS.WHITE,
                    borderBottom:
                        `1px solid ${COLORS.BORDER}`,
                }}
            >
                <Group
                    h="100%"
                    px="lg"
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
                        >
                            College Leave Management
                        </Text>
                    </Group>

                    <Group>
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
                                fw={600}
                                size="sm"
                            >
                                {
                                    auth?.user
                                        ?.name
                                }
                            </Text>

                            <Text
                                size="xs"
                                c="dimmed"
                            >
                                {
                                    auth?.user
                                        ?.role
                                }
                            </Text>
                        </div>
                    </Group>
                </Group>
            </AppShell.Header>

            {/* SIDEBAR */}
            <AppShell.Navbar
                p="md"
                style={{
                    background: COLORS.WHITE,
                    borderRight:
                        `1px solid ${COLORS.BORDER}`,
                }}
            >
                <Stack
                    justify="space-between"
                    h="100%"
                >
                    <Stack gap="xs">
                        {menus.map((menu) => (
                            <NavLink
                                key={menu.path}
                                label={menu.label}
                                leftSection={
                                    <menu.icon
                                        size={18}
                                    />
                                }
                                active={
                                    location.pathname ===
                                    menu.path
                                }
                                variant="filled"
                                color="blue"
                            />
                        ))}
                    </Stack>

                    <NavLink
                        label="Logout"
                        color="red"
                        leftSection={
                            <IconLogout size={18} />
                        }
                        onClick={() => {
                            navigate("/", { replace: true, });

                            clearAuth();
                        }}
                    />
                </Stack>
            </AppShell.Navbar>

            {/* MAIN */}
            <AppShell.Main
                bg={COLORS.BACKGROUND}
            >
                <Outlet />
            </AppShell.Main>
        </AppShell>
    );
};

export default AppLayout;