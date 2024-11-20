# Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Message(Document):
    def validate(self):
        self.set_datetime_field()

    def set_datetime_field(self):
        pass
