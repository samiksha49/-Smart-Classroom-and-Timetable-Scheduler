from fastapi.responses import JSONResponse


class ApiResponse:
    @staticmethod
    def success(
        message="Success",
        data=None,
        metadata=None
    ):
        return {
            "status": True,
            "message": message,
            "data": data if data is not None else [],
            "metadata": metadata if metadata is not None else {}
        }

    @staticmethod
    def error(
        message="Something went wrong",
        status_code=400
    ):
        return JSONResponse(
            status_code=status_code,
            content={
                "status": False,
                "message": message,
                "data": [],
                "metadata": {}
            }
        )