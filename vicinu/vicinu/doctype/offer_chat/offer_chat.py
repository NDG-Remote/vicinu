# Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class OfferChat(Document):
    def on_trash(self):
        self.delete_messages()

    def delete_messages(self):
        for message in self.messages:
            frappe.delete_doc("Message", message.message)
