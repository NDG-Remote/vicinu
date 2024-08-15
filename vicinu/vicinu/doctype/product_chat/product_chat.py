# Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ProductChat(Document):
    def before_naming(self):
        user_name = frappe.get_value("User", self.owner, "username")
        self.taker_user_name = user_name
