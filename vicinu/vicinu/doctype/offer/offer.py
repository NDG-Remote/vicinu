# Copyright (c) 2024, Andrea N. Glaus aka NDG-Remote and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Offer(Document):
	def after_insert(self):
		self.add_to_giver_profile_cht()

	def on_trash(self):
		self.remove_from_giver_profile_cht()

	def add_to_giver_profile_cht(self):
		giver_profile = frappe.get_doc("Giver Profile", self.giver_profile)
		giver_profile.append("offers", {
			"offer": self.name,
			"product": self.product,
			"is_available": self.is_available
		})
		giver_profile.save()

	def remove_from_giver_profile_cht(self):
		giver_profile = frappe.get_doc("Giver Profile", self.giver_profile)
		for child in giver_profile.offers:
			if child.offer == self.name:
				child.delete()