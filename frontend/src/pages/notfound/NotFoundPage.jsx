import {
    Button,
    Container,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import notFoundAnimation from "../../assets/lottie/404.json";

const NotFoundPage = () => {
    const navigate = useNavigate();
    return (
        <Container
            size="md"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Stack
                align="center"
                gap="md"
            >
                <div
                    style={{
                        width: 350,
                        maxWidth: "100%",
                    }}
                >
                    <Player
                        autoplay
                        loop
                        src={notFoundAnimation}
                        style={{ height: 300, width: 300 }}
                    />
                </div>

                <Title order={2}>
                    Page Not Found
                </Title>

                <Text
                    c="dimmed"
                    ta="center"
                >
                    The page you're looking for doesn't exist
                    or may have been moved.
                </Text>

                <Button
                    onClick={() =>
                        navigate("/")
                    }
                >
                    Back to Dashboard
                </Button>
            </Stack>
        </Container>
    );
};

export default NotFoundPage;