import { useState } from "react";

import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { notifications } from "@mantine/notifications";

import CommonTable from "../../components/table";
import ActionButton from "../../components/ActionButton";
import FormBuilderModal from "../../components/FormBuilderModal";

import {
    getFacultySubjectMappings,
    createFacultySubjectMapping,
} from "../../services/master/facultySubjectMapping.service";

import {
    FACULTY_SUBJECT_MAPPING_COLUMNS,
} from "../../constants/forms/tableHeader";

import {
    FACULTY_SUBJECT_MAPPING_FORM_FIELDS,
} from "../../constants/masterHeaders";

const FacultySubjectMappingPage = () => {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();
    const [modalConfig, setModalConfig] =
        useState({
            opened: false,
            mode: "add",
            data: {},
        });

    const {data, isLoading} = useQuery({
        queryKey: ["faculty-subject-mappings", page],
        queryFn: () => getFacultySubjectMappings(page),
    });

    const createMutation =
        useMutation({
            mutationFn:
                createFacultySubjectMapping,

            onSuccess: () => {

                notifications.show({
                    color: "green",
                    message:
                        "Mapping created successfully",
                });

                queryClient.invalidateQueries({
                    queryKey: [
                        "faculty-subject-mappings",
                    ],
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
                        error?.response?.data?.message ||
                        "Something went wrong",
                });
            },
        });

    const handleSave = (values) => {

        createMutation.mutate({
            faculty_id:
                Number(values.faculty_id),

            subject_id:
                Number(values.subject_id),
        });
    };

    return (
        <div
            style={{
                width: "100%",
                padding: "24px",
            }}
        >
            <ActionButton
                title="Faculty Subject Mapping"
                showAdd
                showSearch={false}
                showDownload={false}
                addLabel="Add Mapping"
                onAdd={() =>
                    setModalConfig({
                        opened: true,
                        mode: "add",
                        data: {},
                    })
                }
            />

            <CommonTable
                columns={FACULTY_SUBJECT_MAPPING_COLUMNS}
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
                title="Faculty Subject Mapping"
                mode={modalConfig.mode}
                fields={FACULTY_SUBJECT_MAPPING_FORM_FIELDS}
                values={modalConfig.data}
                setValues={(updater) =>
                    setModalConfig(
                        (prev) => ({
                            ...prev,
                            data:
                                typeof updater ===
                                    "function"
                                    ? updater(
                                        prev.data
                                    )
                                    : updater,
                        })
                    )
                }
                onClose={() =>
                    setModalConfig({
                        opened: false,
                        mode: "add",
                        data: {},
                    })
                }
                onSave={handleSave}
                loading={createMutation.isPending}
            />
        </div>
    );
};

export default FacultySubjectMappingPage;