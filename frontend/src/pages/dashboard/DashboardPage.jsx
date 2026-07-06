import {
    Card,
    Grid,
    Group,
    Stack,
    Text,
    Title,
} from "@mantine/core";

const DashboardPage = () => {
    return (
        <Stack gap="lg" p="xl">
            {/* PAGE HEADER */}
            <div>
                <Title order={2}>
                    Dashboard
                </Title>

                <Text c="dimmed">
                    Welcome back to your leave management dashboard.
                </Text>
            </div>

            {/* STATS */}
            <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card
                        shadow="sm"
                        radius="lg"
                        padding="lg"
                    >
                        <Group justify="space-between">
                            <div>
                                <Text
                                    size="sm"
                                    c="dimmed"
                                >
                                    Total Leaves
                                </Text>

                                <Title order={2}>
                                    24
                                </Title>
                            </div>
                        </Group>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card
                        shadow="sm"
                        radius="lg"
                        padding="lg"
                    >
                        <Group justify="space-between">
                            <div>
                                <Text
                                    size="sm"
                                    c="dimmed"
                                >
                                    Pending Approvals
                                </Text>

                                <Title order={2}>
                                    8
                                </Title>
                            </div>
                        </Group>
                    </Card>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                    <Card
                        shadow="sm"
                        radius="lg"
                        padding="lg"
                    >
                        <Group justify="space-between">
                            <div>
                                <Text
                                    size="sm"
                                    c="dimmed"
                                >
                                    Approved Leaves
                                </Text>

                                <Title order={2}>
                                    16
                                </Title>
                            </div>
                        </Group>
                    </Card>
                </Grid.Col>
            </Grid>

            {/* RECENT ACTIVITY */}
            <Card
                shadow="sm"
                radius="lg"
                padding="lg"
            >
                <Stack>
                    <Title order={4}>
                        Recent Activity
                    </Title>

                    <Text c="dimmed">
                        No recent activity available.
                    </Text>
                </Stack>
            </Card>
        </Stack>
    );
};

export default DashboardPage;