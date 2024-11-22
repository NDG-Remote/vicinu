
def after_install():
    frappe.db.set_value("Website Settings", "disable_signup", 0)