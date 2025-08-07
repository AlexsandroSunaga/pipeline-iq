P = "/api/v1"


def test_health(client):
    r = client.get(f"{P}/health")
    assert r.status_code == 200
    assert r.json()["status"] == "ok"


def test_command_overview_seeded(client):
    r = client.get(f"{P}/command/overview")
    assert r.status_code == 200
    body = r.json()
    for key in ("connectors", "total_jobs", "warehouse_rows", "open_quality_issues"):
        assert key in body
    assert body["connectors"] >= 1


def test_connectors_and_schedules(client):
    assert client.get(f"{P}/connectors").status_code == 200
    assert isinstance(client.get(f"{P}/schedules").json(), list)


def test_jobs_list_and_invalid_source(client):
    assert isinstance(client.get(f"{P}/jobs").json(), list)
    assert client.post(f"{P}/jobs/not-a-source").status_code == 400
