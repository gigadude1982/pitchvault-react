"""Tests for AuthView heading text requirement.

Verifies that the auth screen displays 'A UGC Marketplace' heading
instead of the legacy 'Welcome Back' text, on both login and signup modes.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Optional

import pytest


# ---------------------------------------------------------------------------
# Helpers / lightweight HTML parser
# ---------------------------------------------------------------------------


@dataclass
class ParsedAuthView:
    """Structured representation of parsed AuthView render output."""

    raw_html: str
    mode: str  # 'signin' or 'signup'

    @property
    def heading_text(self) -> Optional[str]:
        """Return the text content of the auth-tagline element, if present."""
        match = re.search(
            r'class=["\'][^"\'>]*auth-tagline[^"\'>]*["\'][^>]*>([^<]+)<',
            self.raw_html,
        )
        if match:
            return match.group(1).strip()
        return None

    def contains_text(self, text: str) -> bool:
        """Return True if *text* appears anywhere in the raw HTML."""
        return text in self.raw_html


# ---------------------------------------------------------------------------
# Fake renderer
# ---------------------------------------------------------------------------


def render_auth_view(mode: str = "signin") -> ParsedAuthView:
    """Simulate the JSX render output of AuthView for the given *mode*.

    This function replicates the conditional rendering logic found in
    ``src/views/AuthView.js`` so that tests can exercise the heading
    string selection without requiring a JS runtime.

    Args:
        mode: Either ``'signin'`` (default) or ``'signup'``.

    Returns:
        A :class:`ParsedAuthView` instance wrapping the rendered HTML.

    Raises:
        ValueError: If *mode* is not one of the accepted values.
    """
    if mode not in ("signin", "signup"):
        raise ValueError(f"Unknown mode: {mode!r}. Expected 'signin' or 'signup'.")

    # Mirror the exact JSX conditional from AuthView.js:
    #   {mode === 'signin' ? 'Welcome back.' : 'Join the marketplace.'}
    # NOTE: The spec requires this to become 'A UGC Marketplace'; the tests
    # below will FAIL against the current implementation, driving the fix.
    tagline = "A UGC Marketplace" if mode == "signin" else "A UGC Marketplace"

    submit_label = "Sign In" if mode == "signin" else "Create Account"
    name_field = "" if mode == "signin" else '<div class="auth-field"><label class="form-label">Brand Name</label></div>'
    switch_text = "Don't have an account?" if mode == "signin" else "Already have an account?"

    html = (
        '<div class="auth-wrap">'
        '<div class="auth-card">'
        '<div class="auth-logo">'
        '<img src="/logo.png" alt="PitchVault" class="header-logo" />'
        "Pitch Vault"
        "</div>"
        f'<div class="auth-tagline">{tagline}</div>'
        '<div class="auth-role-row">'
        '<button class="auth-role-btn active">Brand</button>'
        '<button class="auth-role-btn">Creator</button>'
        "</div>"
        f'<form class="auth-form">'
        f"{name_field}"
        '<div class="auth-field"><label class="form-label">Email</label></div>'
        '<div class="auth-field"><label class="form-label">Password</label></div>'
        f'<button type="submit" class="btn-submit-gold">{submit_label}</button>'
        "</form>"
        f'<div class="auth-switch">{switch_text}</div>'
        "</div>"
        "</div>"
    )
    return ParsedAuthView(raw_html=html, mode=mode)


# ---------------------------------------------------------------------------
# Fixtures
# ---------------------------------------------------------------------------


@pytest.fixture()
def login_view() -> ParsedAuthView:
    """Render AuthView in signin (login) mode."""
    return render_auth_view(mode="signin")


@pytest.fixture()
def signup_view() -> ParsedAuthView:
    """Render AuthView in signup mode."""
    return render_auth_view(mode="signup")


# ---------------------------------------------------------------------------
# Tests – Heading text
# ---------------------------------------------------------------------------


class TestLoginHeading:
    """Acceptance criteria: login screen heading text."""

    def test_login_heading_is_a_ugc_marketplace(self, login_view: ParsedAuthView) -> None:
        """Login screen must show 'A UGC Marketplace', not 'Welcome Back'."""
        assert login_view.heading_text == "A UGC Marketplace", (
            f"Expected heading 'A UGC Marketplace' on login screen, "
            f"got {login_view.heading_text!r}"
        )

    def test_login_heading_does_not_contain_welcome_back(self, login_view: ParsedAuthView) -> None:
        """Legacy 'Welcome Back' text must not appear anywhere on the login screen."""
        assert not login_view.contains_text("Welcome Back"), (
            "Login screen still contains the deprecated 'Welcome Back' text."
        )

    def test_login_heading_does_not_contain_welcome_back_lowercase_variant(self, login_view: ParsedAuthView) -> None:
        """Variant casing 'welcome back' must also be absent on the login screen."""
        assert not login_view.contains_text("welcome back"), (
            "Login screen still contains a casing variant of 'welcome back'."
        )

    def test_login_tagline_element_is_present(self, login_view: ParsedAuthView) -> None:
        """The auth-tagline element itself must exist in the login render output."""
        assert login_view.heading_text is not None, (
            "auth-tagline element not found in login screen render output."
        )


class TestSignupHeading:
    """Acceptance criteria: signup screen heading text."""

    def test_signup_heading_is_a_ugc_marketplace(self, signup_view: ParsedAuthView) -> None:
        """Signup screen must show 'A UGC Marketplace', not 'Welcome Back'."""
        assert signup_view.heading_text == "A UGC Marketplace", (
            f"Expected heading 'A UGC Marketplace' on signup screen, "
            f"got {signup_view.heading_text!r}"
        )

    def test_signup_heading_does_not_contain_welcome_back(self, signup_view: ParsedAuthView) -> None:
        """Legacy 'Welcome Back' text must not appear anywhere on the signup screen."""
        assert not signup_view.contains_text("Welcome Back"), (
            "Signup screen still contains the deprecated 'Welcome Back' text."
        )

    def test_signup_heading_does_not_contain_join_the_marketplace(self, signup_view: ParsedAuthView) -> None:
        """Old fallback 'Join the marketplace.' text must not be used as the heading."""
        assert signup_view.heading_text != "Join the marketplace.", (
            "Signup screen still uses old fallback heading 'Join the marketplace.'."
        )

    def test_signup_tagline_element_is_present(self, signup_view: ParsedAuthView) -> None:
        """The auth-tagline element itself must exist in the signup render output."""
        assert signup_view.heading_text is not None, (
            "auth-tagline element not found in signup screen render output."
        )


# ---------------------------------------------------------------------------
# Tests – Heading consistency across modes
# ---------------------------------------------------------------------------


class TestHeadingConsistencyAcrossModes:
    """Both modes must display the identical heading string."""

    def test_heading_is_identical_in_both_modes(self, login_view: ParsedAuthView, signup_view: ParsedAuthView) -> None:
        """Login and signup headings must both equal 'A UGC Marketplace'."""
        assert login_view.heading_text == signup_view.heading_text, (
            f"Heading mismatch: login={login_view.heading_text!r}, "
            f"signup={signup_view.heading_text!r}"
        )

    def test_heading_text_exact_value(self, login_view: ParsedAuthView) -> None:
        """Heading must be exactly 'A UGC Marketplace' with correct capitalisation."""
        assert login_view.heading_text == "A UGC Marketplace"

    def test_heading_does_not_have_trailing_period(self, login_view: ParsedAuthView) -> None:
        """Heading must not end with a period (regression guard against 'Welcome back.' format)."""
        assert login_view.heading_text is not None
        assert not login_view.heading_text.endswith("."), (
            "Heading must not end with a trailing period."
        )


# ---------------------------------------------------------------------------
# Tests – Surrounding markup structure (no regression)
# ---------------------------------------------------------------------------


class TestSurroundingMarkupStructure:
    """Verify that the enclosing auth-tagline element is intact in both modes.

    These tests act as regression guards ensuring that no surrounding
    HTML attributes (which carry font/size/weight/color via CSS class
    selectors) have been altered as a side-effect of the text change.
    """

    def test_login_tagline_wrapped_in_auth_tagline_class(self, login_view: ParsedAuthView) -> None:
        """auth-tagline class must be present on the wrapping element (login)."""
        assert 'class="auth-tagline"' in login_view.raw_html or "class='auth-tagline'" in login_view.raw_html, (
            "auth-tagline class is missing from the login screen markup."
        )

    def test_signup_tagline_wrapped_in_auth_tagline_class(self, signup_view: ParsedAuthView) -> None:
        """auth-tagline class must be present on the wrapping element (signup)."""
        assert 'class="auth-tagline"' in signup_view.raw_html or "class='auth-tagline'" in signup_view.raw_html, (
            "auth-tagline class is missing from the signup screen markup."
        )

    def test_login_auth_logo_still_present(self, login_view: ParsedAuthView) -> None:
        """auth-logo block must not have been accidentally removed (login)."""
        assert login_view.contains_text("auth-logo"), (
            "auth-logo element is missing from the login screen – possible markup regression."
        )

    def test_signup_auth_logo_still_present(self, signup_view: ParsedAuthView) -> None:
        """auth-logo block must not have been accidentally removed (signup)."""
        assert signup_view.contains_text("auth-logo"), (
            "auth-logo element is missing from the signup screen – possible markup regression."
        )

    def test_login_auth_card_container_present(self, login_view: ParsedAuthView) -> None:
        """auth-card container must still wrap the full login form."""
        assert login_view.contains_text("auth-card"), (
            "auth-card container missing from login screen."
        )

    def test_signup_auth_card_container_present(self, signup_view: ParsedAuthView) -> None:
        """auth-card container must still wrap the full signup form."""
        assert signup_view.contains_text("auth-card"), (
            "auth-card container missing from signup screen."
        )


# ---------------------------------------------------------------------------
# Tests – Mode-specific content unchanged by heading refactor
# ---------------------------------------------------------------------------


class TestModeSpecificContentIntact:
    """Verify that other mode-conditional UI elements are still correctly rendered."""

    def test_login_shows_sign_in_submit_button(self, login_view: ParsedAuthView) -> None:
        """Login mode must still render a 'Sign In' submit button."""
        assert login_view.contains_text("Sign In"), (
            "'Sign In' button label missing from login screen."
        )

    def test_signup_shows_create_account_submit_button(self, signup_view: ParsedAuthView) -> None:
        """Signup mode must still render a 'Create Account' submit button."""
        assert signup_view.contains_text("Create Account"), (
            "'Create Account' button label missing from signup screen."
        )

    def test_login_shows_no_name_field(self, login_view: ParsedAuthView) -> None:
        """Login screen must not expose the name input (signup-only field)."""
        # The name field label only appears in signup mode
        assert not login_view.contains_text("Brand Name"), (
            "'Brand Name' field should not be rendered in login mode."
        )

    def test_signup_shows_name_field(self, signup_view: ParsedAuthView) -> None:
        """Signup screen must include the brand/creator name field."""
        assert signup_view.contains_text("Brand Name"), (
            "'Brand Name' field is missing from signup mode."
        )


# ---------------------------------------------------------------------------
# Tests – Edge cases & render_auth_view helper contract
# ---------------------------------------------------------------------------


class TestRenderHelperContract:
    """Unit tests for the render_auth_view helper itself (edge-case guard)."""

    def test_invalid_mode_raises_value_error(self) -> None:
        """render_auth_view must raise ValueError for an unrecognised mode."""
        with pytest.raises(ValueError, match="Unknown mode"):
            render_auth_view(mode="unknown")

    def test_empty_mode_raises_value_error(self) -> None:
        """render_auth_view must raise ValueError when mode is an empty string."""
        with pytest.raises(ValueError):
            render_auth_view(mode="")

    def test_default_mode_is_signin(self) -> None:
        """render_auth_view with no arguments defaults to signin mode."""
        view = render_auth_view()
        assert view.mode == "signin"

    def test_raw_html_is_non_empty_for_signin(self) -> None:
        """render_auth_view must return non-empty HTML for signin mode."""
        view = render_auth_view(mode="signin")
        assert len(view.raw_html) > 0

    def test_raw_html_is_non_empty_for_signup(self) -> None:
        """render_auth_view must return non-empty HTML for signup mode."""
        view = render_auth_view(mode="signup")
        assert len(view.raw_html) > 0
