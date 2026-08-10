"""
Playwright end-to-end test for the NEO Gents affiliate page.

This script:
  1. Serves the built dist/ folder locally.
  2. Loads the affiliate page.
  3. Intercepts POST /api/affiliates/signup and returns a mock referral code.
  4. Fills and submits the signup form.
  5. Verifies the success state shows the referral code and shareable link.
  6. Checks that no console errors or failed network requests occurred.
  7. Verifies the hero copy and footer links.

Run with:
    python scripts/test-affiliate-page.py
"""

import http.server
import socketserver
import threading
import contextlib
from playwright.sync_api import sync_playwright, expect

PORT = 8765
DIST_DIR = "artifacts/neogents-dashboard-verticals/dist"


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def log_message(self, format, *args):
        pass


@contextlib.contextmanager
def local_server():
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), QuietHandler)
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{PORT}"
    finally:
        httpd.shutdown()


def run_test():
    errors = []
    failed_requests = []

    with local_server():
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            context = browser.new_context(viewport={"width": 1280, "height": 900})
            page = context.new_page()

            page.on("console", lambda msg: errors.append(msg) if msg.type == "error" else None)
            page.on("pageerror", lambda exc: errors.append(f"pageerror: {exc}"))
            page.on("requestfailed", lambda req: failed_requests.append(f"{req.method} {req.url} -> {req.failure().get('errorText')}"))

            # Mock the affiliate signup backend so we don't create real records.
            page.route("**/api/affiliates/signup", lambda route, request: (
                route.fulfill(
                    status=201,
                    content_type="application/json",
                    body='{"success": true, "affiliate": {"id": "aff-123", "name": "Test User", "email": "test@example.com", "referralCode": "TEST12", "status": "pending"}, "message": "Welcome to the team!"}'
                )
                if request.method == "POST"
                else route.continue_()
            ))

            page.goto(f"http://127.0.0.1:{PORT}/#/affiliates")
            page.wait_for_load_state("networkidle")

            # Hero copy should reflect the new brand framing.
            hero = page.locator("h1")
            expect(hero).to_contain_text("Earn Recurring Income")
            expect(hero).to_contain_text("By Sharing Real AI Leads")

            # Footer links should point to real hash routes, not href="#".
            terms_link = page.locator('footer a:has-text("Terms")')
            privacy_link = page.locator('footer a:has-text("Privacy")')
            expect(terms_link).to_have_attribute("href", "#/terms")
            expect(privacy_link).to_have_attribute("href", "#/privacy")

            # Fill and submit the signup form.
            page.locator('input[placeholder="Your full name"]').fill("Test User")
            page.locator('input[placeholder="Email address"]').fill("test@example.com")
            page.locator("select").select_option("social")
            page.locator('button:has-text("Get My Link")').click()

            # Success state should show the backend referral code and shareable link.
            success_heading = page.locator("text=You're In!")
            expect(success_heading).to_be_visible(timeout=10000)
            expect(page.locator('text=TEST12')).to_be_visible()
            expect(page.locator('text=Copy Link')).to_be_visible()

            browser.close()

    if errors:
        print("CONSOLE ERRORS:")
        for e in errors:
            print(f"  - {e}")
    if failed_requests:
        print("FAILED REQUESTS:")
        for r in failed_requests:
            print(f"  - {r}")

    if errors or failed_requests:
        raise AssertionError("Test failed: see errors above.")

    print("Affiliate page test passed.")


if __name__ == "__main__":
    run_test()
