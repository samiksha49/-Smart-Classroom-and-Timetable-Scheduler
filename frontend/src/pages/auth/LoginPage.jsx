import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Divider,
    Paper,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import useAuthStore from "../../store/auth.store";
import { COLORS } from "../../constants/colors";
import { loginSchema } from "../../schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/auth/auth.service";
const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const navigate = useNavigate();

    const setAuth = useAuthStore(
        (state) => state.setAuth
    );

    const { mutate, isPending } = useMutation({
        mutationFn: loginUser,
        onSuccess: (response) => {
            notifications.show({
                title: COLORS.SUCCESS,
                message: response?.message || "Logged in successfully",
                color: "green",
            });
            setAuth(response);
            navigate("/");
        },
        onError: (error) => {
            notifications.show({
                title: "Login Failed",
                message:
                    error?.response?.data?.message ||
                    "Something went wrong",
                color: COLORS.ERROR,
            });
        },
    });

    const onSubmit = (data) => {
        const encryptedPayload = {
            // data: encryptData(
            //     JSON.stringify({
            //         email: data.email,
            //         password: data.password,
            //     })
            // ),

            email: data.email,
            password: data.password,
        };

        mutate(encryptedPayload);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                background: COLORS.BACKGROUND,
            }}
        >
            {/* LEFT SECTION */}
            <div
                style={{
                    background: COLORS.PRIMARY,
                    color: COLORS.WHITE,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "80px",
                }}
            >
                {/* TOP CIRCLE */}
                <div
                    style={{
                        position: "absolute",
                        width: "500px",
                        height: "500px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.05)",
                        top: "-120px",
                        right: "-120px",
                    }}
                />

                {/* BOTTOM CIRCLE */}
                <div
                    style={{
                        position: "absolute",
                        width: "300px",
                        height: "300px",
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.04)",
                        bottom: "-100px",
                        left: "-80px",
                    }}
                />

                <Stack
                    gap="xl"
                    style={{
                        position: "relative",
                        zIndex: 2,
                        maxWidth: "520px",
                    }}
                >
                    <Text
                        fw={700}
                        size="sm"
                        style={{
                            letterSpacing: "2px",
                            opacity: 0.9,
                        }}
                    >
                        SMART TIMETABLE GENERATOR
                    </Text>

                    <Title
                        order={1}
                        style={{
                            fontSize: "56px",
                            lineHeight: 1.1,
                            fontWeight: 700,
                        }}
                    >
                        Intelligent College Timetable Generator
                    </Title>

                    <Text
                        size="lg"
                        style={{
                            lineHeight: 1.8,
                            opacity: 0.85,
                        }}
                    >
                        Automatically generate conflict-free class schedules for departments,
                        faculties, batches, classrooms, and laboratories with intelligent
                        scheduling and workload optimization.
                    </Text>

                    <Divider
                        color="rgba(255,255,255,0.2)"
                    />

                    <Box>
                        <Text
                            size="sm"
                            mb="sm"
                            style={{
                                opacity: 0.8,
                            }}
                        >
                            FEATURES
                        </Text>

                        <Stack gap="xs">
                            <Text>• Automatic Timetable Generation</Text>
                            <Text>• Faculty & Classroom Conflict Detection</Text>
                            <Text>• Smart Laboratory Scheduling</Text>
                            <Text>• Workload Balancing & Constraint Validation</Text>
                        </Stack>
                    </Box>
                </Stack>
            </div>

            {/* RIGHT SECTION */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "40px",
                    background: COLORS.BACKGROUND,
                }}
            >
                <Paper
                    radius="xl"
                    p={40}
                    w={430}
                    style={{
                        background: COLORS.WHITE,
                        border: `1px solid ${COLORS.BORDER}`,
                        boxShadow:
                            "0 10px 30px rgba(0,0,0,0.08)",
                    }}
                >
                    <Stack gap="xl">
                        <div>
                            <Title
                                order={2}
                                mb={8}
                                style={{
                                    color: COLORS.TEXT_PRIMARY,
                                }}
                            >
                                Smart Timetable Generator
                            </Title>

                            <Text
                                c={COLORS.TEXT_SECONDARY}
                                size="sm"
                            >
                               Login to access the Smart Timetable Management System
                            </Text>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack gap="md">
                                <TextInput
                                    label="Email Address"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                    error={errors.email?.message}
                                />

                                <PasswordInput
                                    label="Password"
                                    placeholder="Enter your password"
                                    {...register("password")}
                                    error={errors.password?.message}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    mt="sm"
                                    loading={isPending}
                                    style={{
                                        background: COLORS.PRIMARY,
                                        height: "48px",
                                        fontWeight: 600,
                                    }}
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Paper>
            </div>
        </div>
    );
};

export default LoginPage;