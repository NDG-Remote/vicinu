import frappe
from frappe.model.document import Document

@frappe.whitelist()
def add_taker_role_profile(doc, event):
    doc.role_profile_name = "Taker RP"

def create_taker_profile(doc, event):
    has_user_logged_in = doc.last_login
    if doc.has_value_changed("username") and has_user_logged_in:
        new_taker_profile = frappe.new_doc("Taker Profile")
        new_taker_profile.user = doc.name
        new_taker_profile.username = doc.username
        new_taker_profile.profile_image = doc.user_image
        new_taker_profile.save()

@frappe.whitelist()
def create_giver_profile(taker_profile, user, first_name, last_name, bio):
    profile_image = frappe.db.get_value("Taker Profile", {"user": user}, "profile_image")
    new_giver_profile = frappe.new_doc("Giver Profile")
    new_giver_profile.user = user
    new_giver_profile.taker_profile = taker_profile
    new_giver_profile.first_name = first_name
    new_giver_profile.last_name = last_name
    new_giver_profile.bio = bio
    new_giver_profile.profile_image = profile_image
    new_giver_profile.save()

#! Testing the Functionality in Frappe UI
@frappe.whitelist()
def create_offer(user, product, is_accessible, is_donation_required, description, is_unlimited, quantity, units):
    giver_profile = frappe.db.get_value("Giver Profile", {"user": user})
    new_offer = frappe.new_doc("Offer")
    new_offer.giver_profile = giver_profile
    new_offer.user = user
    new_offer.product = product
    new_offer.is_available = True
    new_offer.is_accessible = is_accessible
    new_offer.is_donation_required = is_donation_required
    new_offer.description = description
    new_offer.is_unlimited = is_unlimited
    new_offer.quantity = quantity
    new_offer.units = units
    # new_offer.location = location
    new_offer.save()

@frappe.whitelist()
def create_offer_chat(taker_user, giver_profile, offer):
    #! frappe.throw(f"{taker_user}")
    #! taker_profile = "TAK-User10-00015"
    taker_profile = frappe.db.get_value("Taker Profile", {"user": taker_user})
    # frappe.throw(f"{taker_profile}, {giver_profile}, {offer}")
    exists_chat = frappe.db.exists("Offer Chat", {"taker_profile": taker_profile, "giver_profile": giver_profile, "offer": offer})
    if exists_chat:
        frappe.throw(f"Chat already exists for this offer")
    else:
        new_offer_chat = frappe.new_doc("Offer Chat")
        new_offer_chat.taker_profile = taker_profile
        new_offer_chat.giver_profile = giver_profile
        new_offer_chat.offer = offer
        new_offer_chat.save()