import { useState } from "react";

import {
    Card,
    Button,
    Group,
    Title,
    Table,
    Text,
    Loader,
    Center,
} from "@mantine/core";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import SelectWithAPI from "../../components/SelectWithAPI";

import { notifications } from "@mantine/notifications";

import {
    generateTimetable,
    getTimetable,
} from "../../services/timetable/timetable.service";

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
];

const PERIODS = [1, 2, 3, 4, 5, 6, 7, 8]

const TimetablePage = () => {

    const [selectedBatch, setSelectedBatch] = useState(1);
    const queryClient = useQueryClient();

    const generateMutation = useMutation({
        mutationFn: generateTimetable,

        onSuccess: () => {

            notifications.show({
                color: "green",
                message:
                    "Timetable generated successfully",
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "timetable",
                    selectedBatch,
                ],
            });
        },

        onError: () => {
            notifications.show({
                color: "red",
                message:
                    "Failed to generate timetable",
            });
        },
    });

    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: [
            "timetable",
            selectedBatch,
        ],

        queryFn: () =>
            getTimetable(selectedBatch),

        enabled: !!selectedBatch,
    });

    const timetableMap = {};

    data?.data?.forEach((item) => {

        if (!timetableMap[item.day]) {
            timetableMap[item.day] = {};
        }

        timetableMap[item.day][item.period] =
            item;
    });

    return (
        <div style={{ padding: 24 }}>

            <Title order={2} mb="lg">
                Timetable Management
            </Title>

            <Card
                shadow="sm"
                withBorder
                mb="lg"
            >
                <Group justify="space-between" align="end">

                    <div style={{ width: 300 }}>

                        <SelectWithAPI
                            tableName="batches"
                            label="Select Batch"
                            labelField="display_name"
                            valueField="id"
                            value={selectedBatch}
                            setValue={(value) =>
                                setSelectedBatch(
                                    Number(value)
                                )
                            }
                        />

                    </div>

                    <Button
                        loading={
                            generateMutation.isPending
                        }
                        onClick={() =>
                            generateMutation.mutate()
                        }
                    >
                        Generate Timetable
                    </Button>

                </Group>
            </Card>

            {isLoading ? (

                <Center py="xl">
                    <Loader />
                </Center>

            ) : (

                <Table
                    striped
                    highlightOnHover
                    withTableBorder
                >

                    <Table.Thead>

                        <Table.Tr>

                            <Table.Th>
                                Day
                            </Table.Th>

                            {PERIODS.map((period) => (

                                <Table.Th key={period}>
                                    P{period}
                                </Table.Th>

                            ))}

                        </Table.Tr>

                    </Table.Thead>

                    <Table.Tbody>

                        {DAYS.map((day) => (

                            <Table.Tr key={day}>

                                <Table.Td>
                                    {day}
                                </Table.Td>

                                {PERIODS.map((period) => {

                                    const cell =
                                        timetableMap[day]?.[
                                        period
                                        ];

                                    return (

                                        <Table.Td
                                            key={period}
                                        >

                                            {cell ? (
                                                <>
                                                    <Text fw={600}>
                                                        {
                                                            cell.subject_name
                                                        }
                                                    </Text>

                                                    <Text size="sm">
                                                        {
                                                            cell.faculty_name
                                                        }
                                                    </Text>

                                                    <Text
                                                        size="xs"
                                                        c="dimmed"
                                                    >
                                                        {
                                                            cell.room_number
                                                        }
                                                    </Text>
                                                </>
                                            ) : (
                                                "-"
                                            )}

                                        </Table.Td>

                                    );
                                })}

                            </Table.Tr>

                        ))}

                    </Table.Tbody>

                </Table>

            )}

        </div>
    );
};

export default TimetablePage;