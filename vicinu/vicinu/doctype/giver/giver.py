# Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Giver(Document):
    def validate(self):
        user_email = frappe.get_value("User", self.owner, "email")
        user_name = frappe.get_value("User", self.owner, "username")
        self.user_email = user_email
        self.user_name = user_name


