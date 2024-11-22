# Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Message(Document):
    def validate(self):
        self.add_to_offer_chat_cht()

    def on_trash(self):
        self.delete_child_from_offer_chat()

    def add_to_offer_chat_cht(self):
        offer_chat = frappe.get_doc("Offer Chat", self.offer_chat)
        offer_chat.append("messages", {
            "message": self.name,
            "datetime": self.datetime,
            "message_owner": self.message_owner_taker_profile,
            "message_text": self.message_text
        })
        offer_chat.save()

    def delete_child_from_offer_chat(self):
        offer_chat = frappe.get_doc("Offer Chat", self.offer_chat)
        for child in offer_chat.messages:
            if child.message == self.name:
                child.delete()
        offer_chat.save()
