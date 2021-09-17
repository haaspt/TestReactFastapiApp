import pytest
from fastapi.testclient import TestClient
from api.api import app
from api.types import (
    TaskRequest,
    TaskInDB,
)

client = TestClient(app)


@pytest.fixture
def setup_sample_task() -> TaskInDB:
    sample_task_request = TaskRequest(text="Testing...", date="2021-01-01")
    response = client.post("/task/", json=sample_task_request.dict())
    return response.json()


def test_get_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"data": "Hello, world!"}


def test_get_tasks():
    response = client.get("/tasks/")
    assert response.status_code == 200
    data = response.json()
    assert (
        type(data) is list
    ), f"Expected response data to be a list, got {type(data)}: {data}."


def test_post_task():
    sample_task_request = TaskRequest(text="Testing...")
    response = client.post("/task/", json=sample_task_request.dict())
    assert response.status_code == 200


def test_get_task(setup_sample_task):
    response = client.get(f"/task/{setup_sample_task['id']}")
    assert response.status_code == 200
    assert response.json() == setup_sample_task

    # Test invalid response
    error_response = client.get("/tasks/10000")
    assert error_response.status_code == 404


def test_delete_task(setup_sample_task):
    response = client.delete(f"/task/{setup_sample_task['id']}")
    assert response.status_code == 200

    # Try to delete it again, should product an error
    error_response = client.get(f"/task/{setup_sample_task['id']}")
    assert error_response.status_code == 404
