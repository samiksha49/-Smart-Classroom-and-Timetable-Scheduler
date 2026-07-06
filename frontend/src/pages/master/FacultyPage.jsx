import { useState } from "react";
import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import { notifications }
    from "@mantine/notifications";

import CommonTable from "../../components/table";
import ActionButton from "../../components/ActionButton";
import FormBuilderModal from "../../components/FormBuilderModal";

import {
    FACULTY_FORM_FIELDS,
} from "../../constants/masterHeaders";

import {
    FacultyTableColumns,
} from "../../constants/forms/tableHeader";

import {
    getFacultyList,
    createFaculty,
    updateFaculty,
} from "../../services/master/faculty.service";

const FacultyPage = () => {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();
    const [modalConfig, setModalConfig] =
        useState({
            opened: false,
            mode: "add",
            data: {},
        });

    const { data, isLoading } =
        useQuery({
            queryKey: ["faculties", page],
            queryFn: () => getFacultyList(page),
        });

    const addMutation =
        useMutation({
            mutationFn: createFaculty,

            onSuccess: () => {

                notifications.show({
                    color: "green",
                    message:
                        "Faculty created successfully",
                });

                queryClient.invalidateQueries({
                    queryKey: ["faculties"],
                });

                setModalConfig({
                    opened: false,
                    mode: "add",
                    data: {},
                });
            },

            onError: (error) => {

                notifications.show({
                    color: "red",
                    message:
                        error?.response?.data
                            ?.message ||
                        "Something went wrong",
                });
            },
        });

    const updateMutation =
        useMutation({
            mutationFn: ({ id, payload }) =>
                updateFaculty({
                    id,
                    payload,
                }),

            onSuccess: () => {

                notifications.show({
                    color: "green",
                    message:
                        "Faculty updated successfully",
                });

                queryClient.invalidateQueries({
                    queryKey: ["faculties"],
                });

                setModalConfig({
                    opened: false,
                    mode: "add",
                    data: {},
                });
            },
        });

    const handleSave = (values) => {

        if (
            modalConfig.mode === "edit"
        ) {

            updateMutation.mutate({
                id: values.id,
                payload: values,
            });

        } else {

            addMutation.mutate(values);
        }
    };

    return (
        <div
            style={{
                width: "100%",
                padding: "24px",
            }}
        >

            <ActionButton
                title="Faculty Master"
                showAdd
                showSearch={false}
                addLabel="Add Faculty"
                onAdd={() =>
                    setModalConfig({
                        opened: true,
                        mode: "add",
                        data: {
                            status: true,
                        },
                    })
                }
            />

            <CommonTable
                columns={FacultyTableColumns}
                data={data?.data || []}
                loading={isLoading}
                page={page}
                setPage={setPage}
                totalPages={
                    data?.metadata?.total_pages || 1
                }
                onRowClick={(row) =>
                    setModalConfig({
                        opened: true,
                        mode: "edit",
                        data: row,
                    })
                }
            />

            <FormBuilderModal
                opened={modalConfig.opened}
                title={
                    modalConfig.mode === "edit"
                        ? "Edit Faculty"
                        : "Add Faculty"
                }
                mode={modalConfig.mode}
                fields={FACULTY_FORM_FIELDS}
                values={modalConfig.data}
                setValues={(updater) =>
                    setModalConfig((prev) => ({
                        ...prev,
                        data:
                            typeof updater ===
                                "function"
                                ? updater(prev.data)
                                : updater,
                    }))
                }
                onClose={() =>
                    setModalConfig({
                        opened: false,
                        mode: "add",
                        data: {},
                    })
                }
                onSave={handleSave}
                loading={
                    addMutation.isPending ||
                    updateMutation.isPending
                }
            />
        </div>
    );
};

export default FacultyPage;