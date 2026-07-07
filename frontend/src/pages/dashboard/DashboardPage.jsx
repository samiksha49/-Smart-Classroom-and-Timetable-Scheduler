import {
    Center,
    Stack,
    Text,
    Title,
} from "@mantine/core";

const DashboardPage = () => {
    return (
        <Center h="80vh">
            <Stack align="center" gap="sm">
                <Title order={2}>
                    🚧 Dashboard In Progress
                </Title>

                <Text c="dimmed" ta="center">
                    This dashboard is currently under development.
                    <br />
                    New features will be available soon.
                </Text>
            </Stack>
        </Center>
    );
};

export default DashboardPage;