from pydantic import BaseModel


class GenerateTimetableRequest(BaseModel):
    batch_id: int