def pagination_metadata(
    page: int,
    page_size: int,
    total_records: int
):
    return {
        "page": page,
        "page_size": page_size,
        "total_records": total_records,
        "total_pages": (
            total_records + page_size - 1
        ) // page_size
        if page_size > 0
        else 1
    }