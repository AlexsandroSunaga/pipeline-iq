"""CLI worker: fetch JSONPlaceholder posts and print row count (wire to API DB in production)."""
import httpx

def main() -> None:
    resp = httpx.get("https://jsonplaceholder.typicode.com/posts", timeout=30)
    resp.raise_for_status()
    posts = resp.json()
    print(f"Fetched {len(posts)} posts — ready for normalize/dedupe/load")

if __name__ == "__main__":
    main()
