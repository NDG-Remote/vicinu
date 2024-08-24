import frappe
from frappe.model.document import Document

@frappe.whitelist()
def add_giver_to_fav_list(giver_profile_username):
    list_owner_username = frappe.get_value("User", frappe.session.user, "username")
    # Check if your favorite list already exists
    existing_favorites_list = frappe.get_list("Favorites List Givers", f"FLG-{list_owner_username}")
    if not existing_favorites_list:
        favorites_list_givers = frappe.new_doc("Favorites List Givers")
        favorites_list_givers.taker_user_name = list_owner_username
        favorites_list_givers.insert()
    else:
        favorites_list_givers = frappe.get_doc("Favorites List Givers", f"FLG-{list_owner_username}")
    favorites_list_givers.append("givers", {
            "giver": f"GIV-{giver_profile_username}",
            "is_alert_enabled": True
        })
    favorites_list_givers.save()
